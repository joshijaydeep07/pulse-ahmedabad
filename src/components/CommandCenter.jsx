import React from 'react';
import {
  HeartPulse, ShieldCheck, Clock, Zap, Stethoscope, PhoneCall,
  BellRing, RefreshCw, Flame, Navigation, Radio, Activity,
  Crosshair
} from 'lucide-react';
import { AHMEDABAD_LANDMARKS, AED_DESERT_ZONES } from '../data/ahmedabadData';
import { formatTime } from '../utils/geo';

export default function CommandCenter({
  aeds,
  responders,
  selectedLandmarkId,
  setSelectedLandmarkId,
  showDesertHeatmap,
  setShowDesertHeatmap,
  activeEmergency,
  onTriggerEmergency,
  onResetSimulation,
  ambulanceEtaSec,
  responderEtaSec,
  incidentLogs,
  cabinetUnlocked,
  userGpsLocation,
  onDetectGpsLocation,
  gpsLoading
}) {

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Top KPI Bar */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between shadow-lg shadow-slate-950/40">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">108 CAD Status</p>
            <p className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
              {activeEmergency ? (
                <span className="text-rose-500 animate-pulse flex items-center gap-1.5">
                  <Radio className="w-4 h-4" /> SCA DISPATCH ACTIVE
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> SYSTEM ARMED
                </span>
              )}
            </p>
          </div>
          <div className={`p-2.5 rounded-lg ${activeEmergency ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
            <HeartPulse className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between shadow-lg shadow-slate-950/40">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Citizen Responder ETA</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-xl font-black text-emerald-400">
                {activeEmergency ? formatTime(responderEtaSec) : '01:45 Avg'}
              </span>
              <span className="text-xs text-slate-400">vs 108 ({formatTime(ambulanceEtaSec)})</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between shadow-lg shadow-slate-950/40">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Public AED Network</p>
            <p className="text-lg font-bold text-white mt-0.5">
              {aeds.filter((a) => a.status === 'READY').length}/{aeds.length}{' '}
              <span className="text-xs font-normal text-emerald-400">IoT Online</span>
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Zap className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between shadow-lg shadow-slate-950/40">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Verified Responders</p>
            <p className="text-lg font-bold text-white mt-0.5">
              {responders.length} Active{' '}
              <span className="text-xs font-normal text-sky-400">(&lt;500m radius)</span>
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400">
            <Stethoscope className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Emergency Trigger Bar */}
      <div className="bg-slate-900/95 border border-rose-500/30 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-lg shadow-rose-950/20">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">108 Emergency CAD Simulator</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                Click Map or Select Landmark
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Trigger Sudden Cardiac Arrest (SCA) to compute real-time Dual-Vector Haversine routes
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Landmark Dropdown */}
          <select
            value={selectedLandmarkId}
            onChange={(e) => setSelectedLandmarkId(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-rose-500"
          >
            {AHMEDABAD_LANDMARKS.map((lm) => (
              <option key={lm.id} value={lm.id}>
                📍 {lm.name} ({lm.zone})
              </option>
            ))}
          </select>

          {/* Option B: Use Real GPS Coordinates */}
          <button
            onClick={onDetectGpsLocation}
            disabled={gpsLoading}
            className={`px-3 py-2 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition cursor-pointer ${
              userGpsLocation
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Use live browser geolocation coordinates"
          >
            <Crosshair className={`w-3.5 h-3.5 ${gpsLoading ? 'animate-spin text-amber-400' : userGpsLocation ? 'text-emerald-400' : 'text-sky-400'}`} />
            {gpsLoading ? 'Locating...' : userGpsLocation ? 'GPS Located' : 'Use My GPS'}
          </button>

          {/* Trigger 108 SOS Button */}
          <button
            onClick={() => onTriggerEmergency()}
            className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-md shadow-rose-600/30 flex items-center gap-1.5 transition cursor-pointer"
          >
            <BellRing className="w-4 h-4 animate-bounce" />
            TRIGGER 108 CARDIAC SOS
          </button>

          {activeEmergency && (
            <button
              onClick={onResetSimulation}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium px-3 py-2 rounded-lg border border-slate-700 flex items-center gap-1 transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Interactive Ahmedabad Geospatial Tactical Map */}
      <div className="relative bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex-1 min-h-[420px] shadow-inner">
        {/* Map Overlay Controls */}
        <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-2">
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-lg px-3 py-1.5 text-[11px] font-medium text-slate-300 flex items-center gap-2 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            AHMEDABAD GEO-GRID (23.0225° N, 72.5714° E)
          </div>

          <button
            onClick={() => setShowDesertHeatmap(!showDesertHeatmap)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition flex items-center gap-1.5 cursor-pointer shadow-md ${
              showDesertHeatmap
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            {showDesertHeatmap ? 'Hide AED Desert Heatmap' : 'Show AED Desert Heatmap'}
          </button>

          {userGpsLocation && (
            <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-lg px-2.5 py-1 text-[11px] font-medium text-emerald-300 flex items-center gap-1.5">
              <Crosshair className="w-3 h-3 text-emerald-400" />
              Live User GPS: {userGpsLocation.lat.toFixed(4)}°, {userGpsLocation.lng.toFixed(4)}°
            </div>
          )}
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-3 left-3 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg px-3 py-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-300 shadow-md">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block border border-white/40" /> Public AED ({aeds.length})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-400 inline-block border border-white/40" /> Verified Responder ({responders.length})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block border border-white/40" /> Cardiac Victim
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-1 bg-emerald-400 inline-block rounded-full" /> Vector 1 (Direct CPR)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-1 bg-amber-400 inline-block rounded-full" /> Vector 2 (AED Runner)
          </span>
        </div>

        {/* SVG Tactical City Map of Ahmedabad */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full min-h-[420px] select-none"
        >
          <defs>
            <pattern id="tacticalGrid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(51, 65, 85, 0.32)" strokeWidth="0.2" />
            </pattern>
            <radialGradient id="desertGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.55)" />
              <stop offset="60%" stopColor="rgba(239, 68, 68, 0.25)" />
              <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
            </radialGradient>
            <radialGradient id="sosPulseGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(244, 63, 94, 0.65)" />
              <stop offset="100%" stopColor="rgba(244, 63, 94, 0)" />
            </radialGradient>
          </defs>

          {/* Tactical Background Grid */}
          <rect x="0" y="0" width="100" height="100" fill="url(#tacticalGrid)" />

          {/* SP Ring Road (Ahmedabad Outer Beltway) */}
          <ellipse
            cx="50"
            cy="52"
            rx="42"
            ry="39"
            fill="none"
            stroke="rgba(71, 85, 105, 0.45)"
            strokeWidth="0.7"
            strokeDasharray="2,1"
          />

          {/* SG Highway Corridor */}
          <path
            d="M 16 5 Q 15 50 18 95"
            fill="none"
            stroke="rgba(100, 116, 139, 0.45)"
            strokeWidth="1.1"
          />

          {/* Ashram Road & East-West Metro Corridor */}
          <path
            d="M 8 44 Q 48 48 92 50"
            fill="none"
            stroke="rgba(100, 116, 139, 0.4)"
            strokeWidth="0.8"
          />

          {/* Sabarmati River Flowing North-to-South through Ahmedabad */}
          <path
            d="M 54 0 C 52 24, 48 42, 50 56 C 52 72, 46 86, 44 100"
            fill="none"
            stroke="rgba(14, 165, 233, 0.28)"
            strokeWidth="4.2"
          />
          <path
            d="M 54 0 C 52 24, 48 42, 50 56 C 52 72, 46 86, 44 100"
            fill="none"
            stroke="rgba(56, 189, 248, 0.55)"
            strokeWidth="1.1"
          />
          <text x="51.5" y="23" fill="rgba(56, 189, 248, 0.55)" fontSize="2.1" fontWeight="bold" transform="rotate(86 51.5,23)">
            SABARMATI RIVERFRONT
          </text>

          {/* AED Desert Heatmap Overlay (When Enabled) */}
          {showDesertHeatmap &&
            AED_DESERT_ZONES.map((dz) => (
              <g key={dz.id}>
                <circle cx={dz.x} cy={dz.y} r={dz.r} fill="url(#desertGrad)" />
                <circle
                  cx={dz.x}
                  cy={dz.y}
                  r={dz.r}
                  fill="none"
                  stroke="rgba(245, 158, 11, 0.7)"
                  strokeWidth="0.35"
                  strokeDasharray="1,1"
                />
                <text x={dz.x} y={dz.y - 1} textAnchor="middle" fill="#fcd34d" fontSize="2.1" fontWeight="bold">
                  ⚠️ AED DESERT: {dz.name}
                </text>
                <text x={dz.x} y={dz.y + 2.2} textAnchor="middle" fill="#fde68a" fontSize="1.8">
                  {dz.casesPerYear} SCA/yr • 108 ETA: {dz.avg108Eta}
                </text>
              </g>
            ))}

          {/* User's Live Real GPS Marker (Option B) */}
          {userGpsLocation && (
            <g>
              <circle
                cx={userGpsLocation.x}
                cy={userGpsLocation.y}
                r="4.5"
                fill="none"
                stroke="#10b981"
                strokeWidth="0.4"
                className="animate-pulse"
              />
              <circle
                cx={userGpsLocation.x}
                cy={userGpsLocation.y}
                r="1.8"
                fill="#10b981"
                stroke="#ffffff"
                strokeWidth="0.4"
              />
              <text
                x={userGpsLocation.x}
                y={userGpsLocation.y - 2.6}
                textAnchor="middle"
                fill="#34d399"
                fontSize="1.9"
                fontWeight="bold"
              >
                YOU ARE HERE
              </text>
            </g>
          )}

          {/* Active Emergency Dual-Vector Routing Lines (Option D Animated) */}
          {activeEmergency && (
            <g>
              {/* Expanding 500m Geo-Fence Radar Ring */}
              <circle
                cx={activeEmergency.landmark.x}
                cy={activeEmergency.landmark.y}
                r="14"
                fill="url(#sosPulseGrad)"
              />
              <circle
                cx={activeEmergency.landmark.x}
                cy={activeEmergency.landmark.y}
                r="12"
                fill="none"
                stroke="rgba(244, 63, 94, 0.6)"
                strokeWidth="0.4"
                strokeDasharray="1.5,1"
                className="animate-pulse"
              />

              {/* VECTOR 1: Primary Responder -> Direct to Victim (Emerald Animated Dash Flow) */}
              <line
                x1={activeEmergency.primaryResponder.x}
                y1={activeEmergency.primaryResponder.y}
                x2={activeEmergency.landmark.x}
                y2={activeEmergency.landmark.y}
                stroke="#10b981"
                strokeWidth="1.1"
                strokeDasharray="2,1"
                className="animate-route-flow"
              />

              {/* VECTOR 2A: Secondary Responder -> Nearest Public AED (Amber Animated Dash Flow) */}
              <line
                x1={activeEmergency.secondaryResponder.x}
                y1={activeEmergency.secondaryResponder.y}
                x2={activeEmergency.targetAed.x}
                y2={activeEmergency.targetAed.y}
                stroke="#f59e0b"
                strokeWidth="1.1"
                strokeDasharray="2,1"
                className="animate-route-flow"
              />

              {/* VECTOR 2B: Nearest Public AED -> Victim (Amber Bright Line) */}
              <line
                x1={activeEmergency.targetAed.x}
                y1={activeEmergency.targetAed.y}
                x2={activeEmergency.landmark.x}
                y2={activeEmergency.landmark.y}
                stroke="#fbbf24"
                strokeWidth="1.3"
                strokeDasharray="2,0.8"
                className="animate-route-flow"
              />

              {/* VECTOR 3: 108 GVK EMRI Ambulance Route (Sky Blue Dashed Line) */}
              <line
                x1={activeEmergency.ambulanceStartX}
                y1={activeEmergency.ambulanceStartY}
                x2={activeEmergency.landmark.x}
                y2={activeEmergency.landmark.y}
                stroke="#38bdf8"
                strokeWidth="0.6"
                strokeDasharray="1,1.5"
              />
            </g>
          )}

          {/* Ahmedabad Landmarks (Clickable to Trigger Cardiac Arrest) */}
          {AHMEDABAD_LANDMARKS.map((lm) => {
            const isTarget = activeEmergency?.landmark?.id === lm.id;
            return (
              <g
                key={lm.id}
                onClick={() => {
                  setSelectedLandmarkId(lm.id);
                  onTriggerEmergency(lm);
                }}
                className="cursor-pointer group"
              >
                <circle
                  cx={lm.x}
                  cy={lm.y}
                  r={isTarget ? 3.0 : 1.6}
                  fill={isTarget ? '#f43f5e' : '#64748b'}
                  stroke="#0f172a"
                  strokeWidth="0.4"
                />
                <text
                  x={lm.x}
                  y={lm.y + 3.8}
                  textAnchor="middle"
                  fill={isTarget ? '#fda4af' : '#94a3b8'}
                  fontSize={isTarget ? '2.4' : '1.85'}
                  fontWeight={isTarget ? 'bold' : 'normal'}
                >
                  {lm.name.split(' (')[0]}
                </text>
              </g>
            );
          })}

          {/* Public AED Nodes */}
          {aeds.map((aed) => {
            const isAssignedAed = activeEmergency?.targetAed?.id === aed.id;
            return (
              <g key={aed.id}>
                {isAssignedAed && (
                  <circle
                    cx={aed.x}
                    cy={aed.y}
                    r="3.6"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="0.6"
                    className="animate-ping"
                  />
                )}
                <rect
                  x={aed.x - 1.3}
                  y={aed.y - 1.3}
                  width="2.6"
                  height="2.6"
                  rx="0.5"
                  fill={aed.status === 'READY' ? (isAssignedAed ? '#f59e0b' : '#10b981') : '#ef4444'}
                  stroke="#020617"
                  strokeWidth="0.35"
                />
                <text
                  x={aed.x}
                  y={aed.y + 0.5}
                  textAnchor="middle"
                  fill="#020617"
                  fontSize="1.6"
                  fontWeight="bold"
                >
                  ⚡
                </text>
              </g>
            );
          })}

          {/* Verified Citizen Responders */}
          {responders.map((rsp) => {
            const isPrimary = activeEmergency?.primaryResponder?.id === rsp.id;
            const isRunner = activeEmergency?.secondaryResponder?.id === rsp.id;
            return (
              <g key={rsp.id}>
                {(isPrimary || isRunner) && (
                  <circle
                    cx={rsp.x}
                    cy={rsp.y}
                    r="3.4"
                    fill="none"
                    stroke={isPrimary ? '#10b981' : '#f59e0b'}
                    strokeWidth="0.6"
                    className="animate-pulse"
                  />
                )}
                <circle
                  cx={rsp.x}
                  cy={rsp.y}
                  r={isPrimary || isRunner ? '2.0' : '1.3'}
                  fill={isPrimary ? '#10b981' : isRunner ? '#f59e0b' : '#38bdf8'}
                  stroke="#0f172a"
                  strokeWidth="0.35"
                />
                {(isPrimary || isRunner) && (
                  <text
                    x={rsp.x}
                    y={rsp.y - 2.7}
                    textAnchor="middle"
                    fill={isPrimary ? '#6ee7b7' : '#fcd34d'}
                    fontSize="2.0"
                    fontWeight="bold"
                  >
                    {isPrimary ? `CPR: ${rsp.name}` : `AED RUNNER: ${rsp.name}`}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Dual-Vector Dispatch Breakdown & Live Telemetry Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Dual-Vector Assignment Cards */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-lg shadow-slate-950/40">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-emerald-400" />
              Dual-Vector Haversine Dispatch Assignment
            </h3>
            {activeEmergency && (
              <span className="text-[11px] font-mono bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">
                {activeEmergency.incidentId}
              </span>
            )}
          </div>

          {!activeEmergency ? (
            <div className="h-28 flex flex-col items-center justify-center text-center border border-dashed border-slate-800 rounded-lg p-4">
              <p className="text-xs text-slate-400">
                No active Sudden Cardiac Arrest dispatch. Select an Ahmedabad landmark above or click{' '}
                <strong className="text-rose-400">Trigger 108 Cardiac SOS</strong> to compute real-time Dual-Vector routes.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Vector 1 Card: Direct CPR */}
              <div className="bg-slate-950/90 border border-emerald-500/40 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    VECTOR 1 • DIRECT CPR
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {activeEmergency.primaryResponder.distToVictim}m
                  </span>
                </div>
                <p className="text-sm font-bold text-white mt-1.5">{activeEmergency.primaryResponder.name}</p>
                <p className="text-[11px] text-slate-400">{activeEmergency.primaryResponder.role}</p>
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Cert: {activeEmergency.primaryResponder.certId}</span>
                  <span className="text-emerald-400 font-semibold">
                    ETA: {activeEmergency.primaryResponder.etaSeconds}s
                  </span>
                </div>
              </div>

              {/* Vector 2 Card: AED Runner */}
              <div className="bg-slate-950/90 border border-amber-500/40 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    VECTOR 2 • AED RUNNER
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {activeEmergency.secondaryResponder.totalRunnerDist}m
                  </span>
                </div>
                <p className="text-sm font-bold text-white mt-1.5">{activeEmergency.secondaryResponder.name}</p>
                <p className="text-[11px] text-amber-300/90 truncate">
                  Via: {activeEmergency.targetAed.name}
                </p>
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded">
                    Cabinet OTP: {activeEmergency.targetAed.dynamicOtp}
                  </span>
                  <span className="text-amber-400 font-semibold">
                    {cabinetUnlocked ? '🔓 UNLOCKED' : '🔒 LOCKED'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Incident Timeline Feed */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex flex-col shadow-lg shadow-slate-950/40">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-sky-400" />
            Live Dispatch &amp; Telemetry Feed
          </h3>
          <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1 text-[11px] font-mono">
            {incidentLogs.map((log, i) => (
              <div
                key={i}
                className={`px-2 py-1 rounded border-l-2 ${
                  log.type === 'critical'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                    : log.type === 'warning'
                      ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                      : log.type === 'success'
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/60 border-slate-700 text-slate-300'
                }`}
              >
                <span className="text-slate-500 mr-1.5">[{log.time}]</span>
                {log.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
