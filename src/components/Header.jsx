import React from 'react';
import { HeartPulse, Layers, Monitor, Smartphone, Zap, Code2, Crosshair } from 'lucide-react';

export default function Header({
  viewMode,
  setViewMode,
  aedsCount,
  onOpenBackendModal,
  onDetectGpsLocation,
  gpsLoading,
  userGpsLocation
}) {
  return (
    <header className="bg-slate-900/95 border-b border-slate-800 px-4 py-3 sticky top-0 z-30 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand Title & Hackathon Problem ID Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center shadow-lg shadow-rose-600/30">
            <HeartPulse className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                PULSE-AHMEDABAD
              </h1>
              <span className="text-[10px] font-mono font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full">
                PS000319 • AMC Healthtech
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Tech-Enabled Citizen First Responder &amp; IoT Public AED Network — Ahmedabad Municipal Corporation
            </p>
          </div>
        </div>

        {/* GPS Locator & Multi-View Switcher for Hackathon Live Demo */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Real GPS Location Button */}
          {onDetectGpsLocation && (
            <button
              onClick={onDetectGpsLocation}
              disabled={gpsLoading}
              title={userGpsLocation ? `Detected: ${userGpsLocation.lat.toFixed(4)}°N, ${userGpsLocation.lng.toFixed(4)}°E` : "Detect real device GPS in Ahmedabad"}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition cursor-pointer ${
                userGpsLocation
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Crosshair className={`w-3.5 h-3.5 ${gpsLoading ? 'animate-spin text-amber-400' : userGpsLocation ? 'text-emerald-400' : 'text-sky-400'}`} />
              <span className="hidden md:inline">
                {gpsLoading ? 'Acquiring GPS...' : userGpsLocation ? 'Live GPS Active' : 'Detect My GPS'}
              </span>
            </button>
          )}

          {/* View Modes Tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('SPLIT')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'SPLIT'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Split-Screen Demo</span>
            </button>
            <button
              onClick={() => setViewMode('COMMAND')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'COMMAND'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>108 Command</span>
            </button>
            <button
              onClick={() => setViewMode('MOBILE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'MOBILE'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Responder App</span>
            </button>
            <button
              onClick={() => setViewMode('REGISTRY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'REGISTRY'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>AED Registry ({aedsCount})</span>
            </button>
            <button
              onClick={onOpenBackendModal}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-sky-300 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Backend Code</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
