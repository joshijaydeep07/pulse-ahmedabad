import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import CommandCenter from './components/CommandCenter';
import MobileResponderApp from './components/MobileResponderApp';
import AedRegistry from './components/AedRegistry';
import BackendCodeModal from './components/BackendCodeModal';

import {
  AHMEDABAD_LANDMARKS,
  INITIAL_AEDS,
  INITIAL_RESPONDERS,
  BACKEND_CODE_SNIPPET
} from './data/ahmedabadData';

import {
  calculateHaversineMeters,
  calculateEtaSeconds,
  projectGpsToTacticalMap
} from './utils/geo';

import {
  playSirenTone,
  playMetronomeClick,
  playShockDischargeTone,
  speakClinicalGuidance,
  cancelSpeechGuidance
} from './utils/audio';

import { syncChannel } from './utils/syncChannel';

export default function App() {
  // Navigation & View Mode ('SPLIT' | 'COMMAND' | 'MOBILE' | 'REGISTRY')
  const [viewMode, setViewMode] = useState('SPLIT');
  const [showBackendModal, setShowBackendModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Map & Ecosystem State
  const [aeds, setAeds] = useState(INITIAL_AEDS);
  const [responders] = useState(INITIAL_RESPONDERS);
  const [selectedLandmarkId, setSelectedLandmarkId] = useState('LM-01');
  const [showDesertHeatmap, setShowDesertHeatmap] = useState(false);

  // Active Cardiac Emergency State
  const [activeEmergency, setActiveEmergency] = useState(null);
  // Mobile App State ('STANDBY' | 'RINGING' | 'EN_ROUTE' | 'CPR_ACTIVE' | 'RESOLVED')
  const [mobileState, setMobileState] = useState('STANDBY');
  const [activeResponderRole, setActiveResponderRole] = useState('AED_RUNNER'); // 'DIRECT_CPR' or 'AED_RUNNER'
  const [cabinetUnlocked, setCabinetUnlocked] = useState(false);
  const [shocksDelivered, setShocksDelivered] = useState(0);
  const [incidentLogs, setIncidentLogs] = useState([
    { time: '14:20:05', text: 'AMC 108 CAD Link & IoT Smart AED Telemetry Online (10/10 Cabinets Synced)', type: 'info' },
    { time: '14:21:12', text: '8 Verified Citizen First Responders active in Ahmedabad Geo-Grid', type: 'success' }
  ]);

  // CPR Metronome & Audio State
  const [metronomeRunning, setMetronomeRunning] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [cprBeatPulse, setCprBeatPulse] = useState(false);
  const [cprSeconds, setCprSeconds] = useState(0);
  const [selectedLang, setSelectedLang] = useState('gu'); // Default to Gujarati for maximum local impact
  const [ambulanceEtaSec, setAmbulanceEtaSec] = useState(540); // 9 mins (540s)
  const [responderEtaSec, setResponderEtaSec] = useState(105); // 1m 45s (105s)
  const [progressPct, setProgressPct] = useState(0);

  // Option B: Real Live GPS Location State
  const [userGpsLocation, setUserGpsLocation] = useState(null);
  const [gpsLoading, setGpsLoading] = useState(false);

  // Helper to get formatted timestamp
  const getNowTime = () => {
    const d = new Date();
    return d.toTimeString().split(' ')[0];
  };

  const addLog = useCallback((text, type = 'info') => {
    setIncidentLogs((prev) => [{ time: getNowTime(), text, type }, ...prev.slice(0, 18)]);
  }, []);

  // --------------------------------------------------------------------------
  // OPTION B: DETECT LIVE BROWSER GEOLOCATION
  // --------------------------------------------------------------------------
  const detectLiveGpsLocation = useCallback(() => {
    if (!navigator.geolocation) {
      addLog('Geolocation not supported by this browser. Using Ahmedabad Central Grid.', 'warning');
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const projected = projectGpsToTacticalMap(latitude, longitude);

        const gpsLoc = {
          lat: latitude,
          lng: longitude,
          x: projected.x,
          y: projected.y
        };

        setUserGpsLocation(gpsLoc);
        setGpsLoading(false);

        // Find closest AED to live GPS
        const closestAed = [...aeds].sort((a, b) => {
          const d1 = calculateHaversineMeters(latitude, longitude, a.lat, a.lng);
          const d2 = calculateHaversineMeters(latitude, longitude, b.lat, b.lng);
          return d1 - d2;
        })[0];

        const distMeters = calculateHaversineMeters(latitude, longitude, closestAed.lat, closestAed.lng);

        addLog(
          `GPS Acquired: ${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E (Nearest AED: ${closestAed.name} - ${distMeters}m away)`,
          'success'
        );
      },
      (error) => {
        setGpsLoading(false);
        console.warn('Geolocation error:', error);
        addLog(`GPS Warning: ${error.message}. Using default Ahmedabad central coordinates.`, 'warning');
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  }, [aeds, addLog]);

  // --------------------------------------------------------------------------
  // TRIGGER CARDIAC EMERGENCY DISPATCH (DUAL-VECTOR HAVERSINE DISPATCH)
  // --------------------------------------------------------------------------
  const triggerCardiacEmergency = useCallback((landmarkObj = null, isRemoteSync = false) => {
    let target = landmarkObj;
    if (!target) {
      // If user has live GPS and no landmark clicked, allow using live GPS as victim point
      if (userGpsLocation && selectedLandmarkId === 'GPS') {
        target = {
          id: 'LM-GPS',
          name: 'My Live GPS Location',
          zone: 'Ahmedabad Live GPS',
          lat: userGpsLocation.lat,
          lng: userGpsLocation.lng,
          x: userGpsLocation.x,
          y: userGpsLocation.y
        };
      } else {
        target = AHMEDABAD_LANDMARKS.find((l) => l.id === selectedLandmarkId) || AHMEDABAD_LANDMARKS[0];
      }
    }

    // 1. Rank all Responders by Haversine distance to Victim
    const rankedResponders = responders
      .map((r) => ({
        ...r,
        distToVictim: calculateHaversineMeters(target.lat, target.lng, r.lat, r.lng)
      }))
      .sort((a, b) => a.distToVictim - b.distToVictim);

    // 2. Rank all Operational AEDs by Haversine distance to Victim
    const rankedAeds = aeds
      .filter((a) => a.status === 'READY')
      .map((a) => ({
        ...a,
        distToVictim: calculateHaversineMeters(target.lat, target.lng, a.lat, a.lng)
      }))
      .sort((a, b) => a.distToVictim - b.distToVictim);

    const primaryResponder = rankedResponders[0]; // Direct-to-Victim CPR
    const secondaryResponder = rankedResponders[1] || rankedResponders[0]; // AED Runner
    const nearestAed = rankedAeds[0];

    // Calculate AED runner total path (Responder -> AED -> Victim)
    const runnerToAedDist = calculateHaversineMeters(
      secondaryResponder.lat,
      secondaryResponder.lng,
      nearestAed.lat,
      nearestAed.lng
    );
    const totalRunnerDist = runnerToAedDist + nearestAed.distToVictim;

    // Generate Dynamic 4-Digit Smart Cabinet OTP
    const dynamicOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const emergencyPayload = {
      incidentId: `INC-AMC-${Math.floor(10000 + Math.random() * 90000)}`,
      landmark: target,
      triggeredAt: getNowTime(),
      primaryResponder: {
        ...primaryResponder,
        etaSeconds: calculateEtaSeconds(primaryResponder.distToVictim)
      },
      secondaryResponder: {
        ...secondaryResponder,
        runnerToAedDist,
        totalRunnerDist,
        etaSeconds: calculateEtaSeconds(totalRunnerDist, 3.8, 65)
      },
      targetAed: {
        ...nearestAed,
        dynamicOtp
      },
      ambulanceStartX: 92,
      ambulanceStartY: 16
    };

    setActiveEmergency(emergencyPayload);
    setMobileState('RINGING');
    setCabinetUnlocked(false);
    setShocksDelivered(0);
    setMetronomeRunning(false);
    setCprSeconds(0);
    setAmbulanceEtaSec(540); // 9m 00s
    setResponderEtaSec(emergencyPayload.primaryResponder.etaSeconds);
    setProgressPct(5);

    playSirenTone(audioMuted);
    addLog(`CRITICAL 108 SCA ALERT at ${target.name} (${target.id})`, 'critical');
    addLog(
      `Dual-Vector Dispatch: ${primaryResponder.name} (${primaryResponder.distToVictim}m -> Direct CPR) & ${secondaryResponder.name} (${totalRunnerDist}m -> Fetch ${nearestAed.id})`,
      'warning'
    );

    // Cross-tab sync
    if (!isRemoteSync) {
      syncChannel.broadcast('TRIGGER_SOS', { target });
    }
  }, [aeds, responders, selectedLandmarkId, userGpsLocation, audioMuted, addLog]);

  // --------------------------------------------------------------------------
  // CITIZEN MOBILE RESPONDER ACTIONS
  // --------------------------------------------------------------------------
  const handleAcceptMission = useCallback((isRemoteSync = false) => {
    if (!activeEmergency) return;
    setMobileState('EN_ROUTE');
    setProgressPct(35);
    addLog(
      `Responder Accepted Mission! Smart Cabinet OTP [${activeEmergency.targetAed.dynamicOtp}] generated for ${activeEmergency.targetAed.id}`,
      'success'
    );
    if (!isRemoteSync) {
      syncChannel.broadcast('ACCEPT_MISSION');
    }
  }, [activeEmergency, addLog]);

  const handleUnlockCabinet = useCallback((isRemoteSync = false) => {
    if (!activeEmergency) return;
    setCabinetUnlocked(true);
    setProgressPct(70);
    setAeds((prev) =>
      prev.map((item) =>
        item.id === activeEmergency.targetAed.id ? { ...item, locked: false } : item
      )
    );
    playSirenTone(audioMuted);
    addLog(
      `IoT Smart Cabinet UNLOCKED: ${activeEmergency.targetAed.name} by ${activeEmergency.secondaryResponder.name}`,
      'success'
    );
    if (!isRemoteSync) {
      syncChannel.broadcast('UNLOCK_CABINET');
    }
  }, [activeEmergency, audioMuted, addLog]);

  const handleArriveAtScene = useCallback((isRemoteSync = false) => {
    setMobileState('CPR_ACTIVE');
    setMetronomeRunning(true);
    setProgressPct(100);
    setResponderEtaSec(0);
    addLog(
      `GOLDEN 4-MINUTE SAVE: Citizen Responder on scene! 110 BPM CPR & AED Protocol Initiated (7m 15s ahead of 108 Ambulance).`,
      'success'
    );
    speakClinicalGuidance(selectedLang, audioMuted);
    if (!isRemoteSync) {
      syncChannel.broadcast('ARRIVE_SCENE');
    }
  }, [selectedLang, audioMuted, addLog]);

  const handleDeliverShock = useCallback((isRemoteSync = false) => {
    setShocksDelivered((prev) => {
      const nextShock = prev + 1;
      playShockDischargeTone(audioMuted);
      addLog(
        `Biphasic AED Shock #${nextShock} (150 Joules) delivered via ${activeEmergency?.targetAed?.id}. Resuming 110 BPM compressions.`,
        'critical'
      );
      return nextShock;
    });
    if (!isRemoteSync) {
      syncChannel.broadcast('DELIVER_SHOCK');
    }
  }, [activeEmergency, audioMuted, addLog]);

  const handleParamedicHandoff = useCallback((isRemoteSync = false) => {
    setMetronomeRunning(false);
    setMobileState('RESOLVED');
    cancelSpeechGuidance();
    addLog(
      `108 Ambulance Paramedic Handoff Complete (${cprSeconds}s CPR, ${shocksDelivered} AED Shocks). ROSC (Spontaneous Circulation) achieved!`,
      'success'
    );
    if (!isRemoteSync) {
      syncChannel.broadcast('PARAMEDIC_HANDOFF');
    }
  }, [cprSeconds, shocksDelivered, addLog]);

  const resetSimulation = useCallback((isRemoteSync = false) => {
    setMetronomeRunning(false);
    cancelSpeechGuidance();
    setActiveEmergency(null);
    setMobileState('STANDBY');
    setCabinetUnlocked(false);
    setShocksDelivered(0);
    setCprSeconds(0);
    setProgressPct(0);
    setAeds(INITIAL_AEDS);
    addLog('Simulation Reset. All Ahmedabad AED Smart Cabinets armed and online.', 'info');
    if (!isRemoteSync) {
      syncChannel.broadcast('RESET');
    }
  }, [addLog]);

  // --------------------------------------------------------------------------
  // CROSS-TAB / MULTI-WINDOW EVENT SUBSCRIPTION (BONUS FEATURE)
  // --------------------------------------------------------------------------
  useEffect(() => {
    const unsubscribe = syncChannel.subscribe((msg) => {
      if (!msg || !msg.type) return;
      switch (msg.type) {
        case 'TRIGGER_SOS':
          triggerCardiacEmergency(msg.payload?.target, true);
          break;
        case 'ACCEPT_MISSION':
          handleAcceptMission(true);
          break;
        case 'UNLOCK_CABINET':
          handleUnlockCabinet(true);
          break;
        case 'ARRIVE_SCENE':
          handleArriveAtScene(true);
          break;
        case 'DELIVER_SHOCK':
          handleDeliverShock(true);
          break;
        case 'PARAMEDIC_HANDOFF':
          handleParamedicHandoff(true);
          break;
        case 'RESET':
          resetSimulation(true);
          break;
        default:
          break;
      }
    });

    return () => unsubscribe();
  }, [
    triggerCardiacEmergency,
    handleAcceptMission,
    handleUnlockCabinet,
    handleArriveAtScene,
    handleDeliverShock,
    handleParamedicHandoff,
    resetSimulation
  ]);

  // --------------------------------------------------------------------------
  // 110 BPM CLINICAL METRONOME INTERVAL (~545.45ms per beat)
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!metronomeRunning) {
      return;
    }
    const intervalMs = Math.round((60 / 110) * 1000); // 545ms
    const timer = setInterval(() => {
      setCprBeatPulse((prev) => !prev);
      playMetronomeClick(audioMuted);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [metronomeRunning, audioMuted]);

  // Periodic Siren Beep while Mobile State is RINGING
  useEffect(() => {
    if (mobileState !== 'RINGING') return;
    const timer = setInterval(() => {
      playSirenTone(audioMuted);
    }, 1800);
    return () => clearInterval(timer);
  }, [mobileState, audioMuted]);

  // Live Countdown Timer for Ambulance & Responder ETAs + CPR Duration
  useEffect(() => {
    if (!activeEmergency || mobileState === 'RESOLVED') return;
    const timer = setInterval(() => {
      setAmbulanceEtaSec((prev) => (prev > 0 ? prev - 1 : 0));
      if (mobileState === 'RINGING' || mobileState === 'EN_ROUTE') {
        setResponderEtaSec((prev) => (prev > 0 ? prev - 1 : 0));
        setProgressPct((prev) => (prev < 92 ? prev + 2 : prev));
      }
      if (mobileState === 'CPR_ACTIVE') {
        setCprSeconds((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [activeEmergency, mobileState]);

  // Copy Backend Code Helper
  const handleCopyBackendCode = () => {
    navigator.clipboard.writeText(BACKEND_CODE_SNIPPET);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Currently selected responder details for Mobile App header
  const currentMobileResponder = useMemo(() => {
    if (!activeEmergency) return INITIAL_RESPONDERS[1]; // Default Riya Patel, RN
    return activeResponderRole === 'DIRECT_CPR'
      ? activeEmergency.primaryResponder
      : activeEmergency.secondaryResponder;
  }, [activeEmergency, activeResponderRole]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Navigation Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        aedsCount={aeds.length}
        onOpenBackendModal={() => setShowBackendModal(true)}
        onDetectGpsLocation={detectLiveGpsLocation}
        gpsLoading={gpsLoading}
        userGpsLocation={userGpsLocation}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4">
        {viewMode === 'SPLIT' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-8">
              <CommandCenter
                aeds={aeds}
                responders={responders}
                selectedLandmarkId={selectedLandmarkId}
                setSelectedLandmarkId={setSelectedLandmarkId}
                showDesertHeatmap={showDesertHeatmap}
                setShowDesertHeatmap={setShowDesertHeatmap}
                activeEmergency={activeEmergency}
                onTriggerEmergency={triggerCardiacEmergency}
                onResetSimulation={resetSimulation}
                ambulanceEtaSec={ambulanceEtaSec}
                responderEtaSec={responderEtaSec}
                incidentLogs={incidentLogs}
                cabinetUnlocked={cabinetUnlocked}
                userGpsLocation={userGpsLocation}
                onDetectGpsLocation={detectLiveGpsLocation}
                gpsLoading={gpsLoading}
              />
            </div>
            <div className="lg:col-span-4">
              <MobileResponderApp
                mobileState={mobileState}
                activeEmergency={activeEmergency}
                activeResponderRole={activeResponderRole}
                setActiveResponderRole={setActiveResponderRole}
                cabinetUnlocked={cabinetUnlocked}
                shocksDelivered={shocksDelivered}
                cprSeconds={cprSeconds}
                metronomeRunning={metronomeRunning}
                setMetronomeRunning={setMetronomeRunning}
                audioMuted={audioMuted}
                setAudioMuted={setAudioMuted}
                cprBeatPulse={cprBeatPulse}
                selectedLang={selectedLang}
                setSelectedLang={setSelectedLang}
                responderEtaSec={responderEtaSec}
                ambulanceEtaSec={ambulanceEtaSec}
                progressPct={progressPct}
                onAcceptMission={handleAcceptMission}
                onUnlockCabinet={handleUnlockCabinet}
                onArriveAtScene={handleArriveAtScene}
                onDeliverShock={handleDeliverShock}
                onParamedicHandoff={handleParamedicHandoff}
                onResetSimulation={resetSimulation}
                onTriggerEmergency={triggerCardiacEmergency}
                onSpeakGuidance={(lang) => speakClinicalGuidance(lang, audioMuted)}
                currentMobileResponder={currentMobileResponder}
                aeds={aeds}
                userGpsLocation={userGpsLocation}
                onDetectGpsLocation={detectLiveGpsLocation}
                gpsLoading={gpsLoading}
              />
            </div>
          </div>
        )}

        {viewMode === 'COMMAND' && (
          <div className="max-w-6xl mx-auto">
            <CommandCenter
              aeds={aeds}
              responders={responders}
              selectedLandmarkId={selectedLandmarkId}
              setSelectedLandmarkId={setSelectedLandmarkId}
              showDesertHeatmap={showDesertHeatmap}
              setShowDesertHeatmap={setShowDesertHeatmap}
              activeEmergency={activeEmergency}
              onTriggerEmergency={triggerCardiacEmergency}
              onResetSimulation={resetSimulation}
              ambulanceEtaSec={ambulanceEtaSec}
              responderEtaSec={responderEtaSec}
              incidentLogs={incidentLogs}
              cabinetUnlocked={cabinetUnlocked}
              userGpsLocation={userGpsLocation}
              onDetectGpsLocation={detectLiveGpsLocation}
              gpsLoading={gpsLoading}
            />
          </div>
        )}

        {viewMode === 'MOBILE' && (
          <div className="py-4 flex justify-center">
            <MobileResponderApp
              mobileState={mobileState}
              activeEmergency={activeEmergency}
              activeResponderRole={activeResponderRole}
              setActiveResponderRole={setActiveResponderRole}
              cabinetUnlocked={cabinetUnlocked}
              shocksDelivered={shocksDelivered}
              cprSeconds={cprSeconds}
              metronomeRunning={metronomeRunning}
              setMetronomeRunning={setMetronomeRunning}
              audioMuted={audioMuted}
              setAudioMuted={setAudioMuted}
              cprBeatPulse={cprBeatPulse}
              selectedLang={selectedLang}
              setSelectedLang={setSelectedLang}
              responderEtaSec={responderEtaSec}
              ambulanceEtaSec={ambulanceEtaSec}
              progressPct={progressPct}
              onAcceptMission={handleAcceptMission}
              onUnlockCabinet={handleUnlockCabinet}
              onArriveAtScene={handleArriveAtScene}
              onDeliverShock={handleDeliverShock}
              onParamedicHandoff={handleParamedicHandoff}
              onResetSimulation={resetSimulation}
              onTriggerEmergency={triggerCardiacEmergency}
              onSpeakGuidance={(lang) => speakClinicalGuidance(lang, audioMuted)}
              currentMobileResponder={currentMobileResponder}
              aeds={aeds}
              userGpsLocation={userGpsLocation}
              onDetectGpsLocation={detectLiveGpsLocation}
              gpsLoading={gpsLoading}
            />
          </div>
        )}

        {viewMode === 'REGISTRY' && (
          <AedRegistry
            aeds={aeds}
            onOpenBackendModal={() => setShowBackendModal(true)}
          />
        )}
      </main>

      {/* Modal: Production Node.js + MySQL Spatial Backend Code */}
      <BackendCodeModal
        isOpen={showBackendModal}
        onClose={() => setShowBackendModal(false)}
        copiedCode={copiedCode}
        onCopy={handleCopyBackendCode}
      />
    </div>
  );
}
