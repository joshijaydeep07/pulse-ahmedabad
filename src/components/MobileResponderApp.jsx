import React from 'react';
import {
  HeartPulse, ShieldAlert, Award, CheckCircle2, Volume2, VolumeX,
  Navigation, Lock, Unlock, Zap, Ambulance, Play, Square, BellRing,
  Crosshair
} from 'lucide-react';
import { MULTILINGUAL_GUIDES } from '../data/ahmedabadData';
import { formatTime } from '../utils/geo';

export default function MobileResponderApp({
  mobileState,
  activeEmergency,
  activeResponderRole,
  setActiveResponderRole,
  cabinetUnlocked,
  shocksDelivered,
  cprSeconds,
  metronomeRunning,
  setMetronomeRunning,
  audioMuted,
  setAudioMuted,
  cprBeatPulse,
  selectedLang,
  setSelectedLang,
  responderEtaSec,
  ambulanceEtaSec,
  progressPct,
  onAcceptMission,
  onUnlockCabinet,
  onArriveAtScene,
  onDeliverShock,
  onParamedicHandoff,
  onResetSimulation,
  onTriggerEmergency,
  onSpeakGuidance,
  currentMobileResponder,
  aeds,
  userGpsLocation,
  onDetectGpsLocation,
  gpsLoading
}) {
  const guide = MULTILINGUAL_GUIDES[selectedLang] || MULTILINGUAL_GUIDES.gu;

  // ECG Sound-Wave Bars Array for Option D visualizer
  const soundWaveHeights = [18, 36, 12, 48, 62, 28, 55, 32, 70, 42, 22, 50, 30, 16];

  return (
    <div className="flex flex-col items-center justify-start h-full">
      {/* Role Switcher Pill Above Phone Frame */}
      <div className="w-full max-w-[390px] mb-2.5 bg-slate-900 border border-slate-800 rounded-xl p-2 flex items-center justify-between shadow-md">
        <span className="text-[11px] font-semibold text-slate-400 pl-1">Simulate Responder Role:</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveResponderRole('AED_RUNNER')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
              activeResponderRole === 'AED_RUNNER'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            ⚡ AED Runner
          </button>
          <button
            onClick={() => setActiveResponderRole('DIRECT_CPR')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
              activeResponderRole === 'DIRECT_CPR'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🫀 Direct CPR
          </button>
        </div>
      </div>

      {/* Smartphone Hardware Frame */}
      <div className="w-full max-w-[390px] bg-slate-950 border-[6px] border-slate-800 rounded-[2.4rem] shadow-2xl overflow-hidden flex flex-col min-h-[670px] relative">
        {/* Top Phone Speaker & Status Bar */}
        <div className="bg-slate-900 px-5 pt-2.5 pb-2 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-extrabold tracking-tight text-white">PULSE-AMC</span>
          </div>
          <div className="w-16 h-1.5 bg-slate-800 rounded-full" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAudioMuted(!audioMuted)}
              title={audioMuted ? 'Unmute Siren & 110 BPM Metronome' : 'Mute Audio'}
              className="text-slate-400 hover:text-white cursor-pointer transition"
            >
              {audioMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              5G • GPS
            </span>
          </div>
        </div>

        {/* STATE 1: STANDBY MODE */}
        {mobileState === 'STANDBY' && (
          <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              {/* Verified Responder Identity Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-900/60 border border-emerald-500/30 rounded-2xl p-4 shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> AMC Verified Responder
                    </span>
                    <h4 className="text-base font-bold text-white mt-1.5">{currentMobileResponder.name}</h4>
                    <p className="text-xs text-slate-400">{currentMobileResponder.role}</p>
                  </div>
                  <div className="bg-slate-800/90 border border-slate-700 rounded-xl px-2.5 py-1.5 text-center">
                    <p className="text-[10px] text-slate-400">Missions</p>
                    <p className="text-sm font-black text-emerald-400">{currentMobileResponder.missions}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
                  <span>Cert: <strong className="font-mono text-white">{currentMobileResponder.certId}</strong></span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> On-Duty Patrol
                  </span>
                </div>
              </div>

              {/* Good Samaritan Legal Shield Badge (Localized) */}
              <div className="bg-sky-950/30 border border-sky-500/30 rounded-xl p-3 flex items-start gap-2.5">
                <Award className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-sky-200">{guide.goodSamaritanTitle}</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                    {guide.goodSamaritanText}
                  </p>
                </div>
              </div>

              {/* Live GPS Status Card (Option B) */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Live Device Geolocation</p>
                  <p className="text-xs font-semibold text-white mt-0.5">
                    {userGpsLocation ? `${userGpsLocation.lat.toFixed(4)}°N, ${userGpsLocation.lng.toFixed(4)}°E` : 'Ahmedabad Central Zone'}
                  </p>
                </div>
                <button
                  onClick={onDetectGpsLocation}
                  disabled={gpsLoading}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1 transition cursor-pointer ${
                    userGpsLocation
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-sky-300 hover:bg-slate-700'
                  }`}
                >
                  <Crosshair className={`w-3 h-3 ${gpsLoading ? 'animate-spin text-amber-400' : ''}`} />
                  {gpsLoading ? 'Locating...' : userGpsLocation ? 'Updated' : 'Locate Me'}
                </button>
              </div>

              {/* Nearest AEDs List */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Nearest Public AED Cabinets (Ahmedabad)
                </p>
                <div className="space-y-2">
                  {aeds.slice(0, 3).map((aed) => (
                    <div
                      key={aed.id}
                      className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between shadow-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                          AED
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white truncate max-w-[190px]">{aed.name}</p>
                          <p className="text-[10px] text-slate-400">
                            {aed.brand} • Battery {aed.battery}%
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono bg-slate-800 text-emerald-400 px-2 py-0.5 rounded border border-slate-700">
                        READY
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick SOS Test Button inside Mobile App */}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => onTriggerEmergency()}
                className="w-full bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/50 text-rose-300 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
              >
                <BellRing className="w-4 h-4 animate-bounce" /> Simulate Incoming 108 Cardiac Alert
              </button>
            </div>
          </div>
        )}

        {/* STATE 2: INCOMING CRITICAL SOS DISPATCH ALERT */}
        {mobileState === 'RINGING' && activeEmergency && (
          <div className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-rose-950/60 via-slate-950 to-slate-950">
            <div className="space-y-3 text-center pt-2">
              <div className="w-16 h-16 rounded-full bg-rose-600/30 border-2 border-rose-500 flex items-center justify-center mx-auto animate-bounce shadow-lg shadow-rose-600/40">
                <ShieldAlert className="w-9 h-9 text-rose-400" />
              </div>
              <span className="inline-block text-[11px] font-black uppercase tracking-widest bg-rose-600 text-white px-3 py-0.5 rounded-full animate-pulse shadow-md">
                108 CRITICAL CARDIAC ARREST ALERT
              </span>
              <h3 className="text-lg font-black text-white leading-tight">
                {activeEmergency.landmark.name}
              </h3>
              <p className="text-xs text-rose-200">
                Victim Unconscious • Not Breathing • Golden 4-Min Window
              </p>

              {/* Assigned Role Box */}
              <div
                className={`rounded-2xl p-3.5 text-left border ${
                  activeResponderRole === 'AED_RUNNER'
                    ? 'bg-amber-950/40 border-amber-500/60 shadow-lg shadow-amber-950/20'
                    : 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                    YOUR ASSIGNED VECTOR ROLE
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    {activeResponderRole === 'AED_RUNNER'
                      ? `${activeEmergency.secondaryResponder.totalRunnerDist}m Total`
                      : `${activeEmergency.primaryResponder.distToVictim}m Direct`}
                  </span>
                </div>
                <p className="text-sm font-extrabold text-white mt-1">
                  {activeResponderRole === 'AED_RUNNER'
                    ? '⚡ FETCH NEAREST AED & PROCEED TO VICTIM'
                    : '🫀 PROCEED DIRECTLY TO VICTIM FOR HANDS-ONLY CPR'}
                </p>
                {activeResponderRole === 'AED_RUNNER' && (
                  <p className="text-xs text-amber-200 mt-1">
                    Pickup Cabinet: <strong>{activeEmergency.targetAed.name}</strong>
                  </p>
                )}
              </div>

              {/* Time Advantage Comparison */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Your Walking ETA</p>
                  <p className="text-lg font-black text-emerald-400">{formatTime(responderEtaSec)}</p>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">108 Ambulance ETA</p>
                  <p className="text-lg font-black text-rose-400">{formatTime(ambulanceEtaSec)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-3">
              <button
                onClick={onAcceptMission}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-sm py-3.5 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" /> ACCEPT MISSION &amp; UNLOCK AED
              </button>
              <button
                onClick={onResetSimulation}
                className="w-full bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs py-2 rounded-xl cursor-pointer"
              >
                Decline (Pass to Next Responder)
              </button>
            </div>
          </div>
        )}

        {/* STATE 3: EN-ROUTE & SMART AED CABINET OTP UNLOCK */}
        {mobileState === 'EN_ROUTE' && activeEmergency && (
          <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              {/* Turn-by-Turn Navigation Header */}
              <div className="bg-emerald-950/50 border border-emerald-500/40 rounded-xl p-3 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-6 h-6 text-emerald-400 animate-pulse" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-emerald-300">Turn-by-Turn Emergency Route</p>
                    <p className="text-xs font-bold text-white">{activeEmergency.landmark.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black font-mono text-emerald-400">{formatTime(responderEtaSec)}</p>
                  <p className="text-[10px] text-slate-400">{progressPct}% complete</p>
                </div>
              </div>

              {/* Smart AED Cabinet OTP / QR Unlock Box */}
              <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-3.5 space-y-2.5 shadow-lg shadow-amber-950/10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                    AMC IoT Smart AED Cabinet
                  </span>
                  <span className="text-xs font-mono text-slate-400">{activeEmergency.targetAed.id}</span>
                </div>

                <p className="text-xs font-bold text-white">{activeEmergency.targetAed.name}</p>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase text-slate-400 font-semibold">Dynamic Cabinet PIN</p>
                    <p className="text-2xl font-mono font-black tracking-widest text-amber-400">
                      {activeEmergency.targetAed.dynamicOtp}
                    </p>
                  </div>
                  <button
                    onClick={onUnlockCabinet}
                    disabled={cabinetUnlocked}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      cabinetUnlocked
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                    }`}
                  >
                    {cabinetUnlocked ? (
                      <>
                        <Unlock className="w-4 h-4" /> Cabinet Open
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" /> Tap to Unlock
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  {cabinetUnlocked
                    ? '✅ Solenoid Lock Released! Retrieve AED & proceed directly to victim.'
                    : 'Enter 4-digit PIN on AMC Kiosk keypad or tap above to trigger IoT relay unlock.'}
                </p>
              </div>

              {/* Victim Pre-Arrival Triage Notes */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 text-xs space-y-1">
                <p className="font-bold text-slate-200">108 Dispatch Clinical Note:</p>
                <p className="text-slate-400 text-[11px]">
                  • Male (~54 yrs), collapsed near {activeEmergency.landmark.name}.
                </p>
                <p className="text-slate-400 text-[11px]">
                  • Companion responder ({activeEmergency.primaryResponder.name}) also alerted.
                </p>
              </div>
            </div>

            <button
              onClick={onArriveAtScene}
              className="w-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs py-3.5 rounded-xl shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <HeartPulse className="w-4 h-4" /> ARRIVED AT SCENE → START 110 BPM CPR
            </button>
          </div>
        )}

        {/* STATE 4: LIVE 110 BPM CPR METRONOME & MULTILINGUAL VOICE ASSIST */}
        {mobileState === 'CPR_ACTIVE' && (
          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
            {/* Top Clinical Rhythm Metronome Card with Option D Animated ECG / Soundwaves */}
            <div className="bg-slate-900 border border-rose-500/40 rounded-2xl p-3 text-center relative overflow-hidden shadow-lg shadow-rose-950/20">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-bold text-rose-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" /> LIVE CPR METRONOME
                </span>
                <span className="font-mono text-slate-300">
                  CPR Time: <strong>{formatTime(cprSeconds)}</strong>
                </span>
              </div>

              {/* Pulsing 110 BPM Heart Visualizer & Beat Indicator */}
              <div className="my-2 flex items-center justify-center gap-4">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-150 ${
                    cprBeatPulse
                      ? 'scale-125 bg-rose-600 text-white shadow-lg shadow-rose-500/60'
                      : 'scale-95 bg-rose-950/80 text-rose-400 border border-rose-500/40'
                  }`}
                >
                  <HeartPulse className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-black text-white leading-none">110 BPM</p>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                    2 Inches Depth • Full Recoil
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <button
                      onClick={() => setMetronomeRunning(!metronomeRunning)}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer transition ${
                        metronomeRunning
                          ? 'bg-rose-600 text-white'
                          : 'bg-emerald-500 text-slate-950'
                      }`}
                    >
                      {metronomeRunning ? (
                        <>
                          <Square className="w-3 h-3" /> Pause Tone
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3" /> Start Tone
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => onSpeakGuidance(selectedLang)}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition"
                    >
                      <Volume2 className="w-3 h-3" /> Voice Guide
                    </button>
                  </div>
                </div>
              </div>

              {/* Option D: Real-Time Sound Wave / ECG Visualizer Bars */}
              <div className="h-6 flex items-end justify-center gap-1 px-4 my-1">
                {soundWaveHeights.map((h, idx) => {
                  const animatedHeight = metronomeRunning
                    ? cprBeatPulse
                      ? Math.min(24, Math.max(4, Math.round(h * 0.4)))
                      : Math.min(24, Math.max(3, Math.round(h * 0.18)))
                    : 3;
                  return (
                    <div
                      key={idx}
                      className={`w-1.5 rounded-full transition-all duration-150 ${
                        cprBeatPulse ? 'bg-rose-500 shadow-sm shadow-rose-400' : 'bg-slate-700'
                      }`}
                      style={{ height: `${animatedHeight}px` }}
                    />
                  );
                })}
              </div>

              <div className="bg-rose-950/60 border border-rose-500/30 rounded-lg py-1 px-2 text-[11px] font-bold text-rose-200">
                {guide.banner}
              </div>
            </div>

            {/* Language Switcher Tabs (Gujarati / Hindi / English) */}
            <div className="flex items-center justify-between gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              {Object.keys(MULTILINGUAL_GUIDES).map((langKey) => (
                <button
                  key={langKey}
                  onClick={() => {
                    setSelectedLang(langKey);
                    onSpeakGuidance(langKey);
                  }}
                  className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    selectedLang === langKey
                      ? 'bg-emerald-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {MULTILINGUAL_GUIDES[langKey].langName}
                </button>
              ))}
            </div>

            {/* Step-by-Step Clinical Instructions in Selected Language */}
            <div className="space-y-1.5 overflow-y-auto max-h-40 pr-0.5">
              {guide.steps.map((st, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-2 text-left shadow-sm"
                >
                  <p className="text-[11px] font-bold text-emerald-400">{st.title}</p>
                  <p className="text-[11px] text-slate-300 leading-snug">{st.desc}</p>
                </div>
              ))}
            </div>

            {/* AED Shock Delivery & 108 Paramedic Handoff Controls */}
            <div className="space-y-1.5 pt-1 border-t border-slate-800">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onDeliverShock}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] py-2.5 rounded-xl flex items-center justify-center gap-1 shadow cursor-pointer transition"
                >
                  <Zap className="w-4 h-4" /> Log AED Shock ({shocksDelivered})
                </button>
                <button
                  onClick={onParamedicHandoff}
                  className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-[11px] py-2.5 rounded-xl flex items-center justify-center gap-1 shadow cursor-pointer transition"
                >
                  <Ambulance className="w-4 h-4" /> 108 Handoff
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STATE 5: INCIDENT RESOLVED / ROSC HANDOFF SUMMARY */}
        {mobileState === 'RESOLVED' && (
          <div className="p-5 flex-1 flex flex-col justify-between text-center">
            <div className="space-y-3 pt-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                GOLDEN 4-MINUTE SAVE VERIFIED
              </span>
              <h3 className="text-lg font-black text-white">108 Paramedic Handoff Complete</h3>
              <p className="text-xs text-slate-400">
                Patient transferred to SVP Hospital Cardiac ICU with Return of Spontaneous Circulation (ROSC).
              </p>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 text-left space-y-2 text-xs shadow-md">
                <div className="flex justify-between">
                  <span className="text-slate-400">Time Saved Before 108 Arrival:</span>
                  <span className="font-bold text-emerald-400">7 mins 15 secs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">110 BPM CPR Duration:</span>
                  <span className="font-bold text-white">{formatTime(cprSeconds)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Biphasic AED Shocks Delivered:</span>
                  <span className="font-bold text-amber-400">{shocksDelivered} Shocks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">AMC Good Samaritan Honour:</span>
                  <span className="font-bold text-sky-400">+500 Seva Points</span>
                </div>
              </div>
            </div>

            <button
              onClick={onResetSimulation}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs py-3 rounded-xl cursor-pointer transition shadow-lg shadow-emerald-500/20"
            >
              Return to On-Duty Patrol Standby
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
