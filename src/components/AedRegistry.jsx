import React from 'react';
import { Zap, Lock, Unlock, Code2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { AED_DESERT_ZONES } from '../data/ahmedabadData';

export default function AedRegistry({ aeds, onOpenBackendModal }) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            AMC Public AED IoT Smart Cabinet Registry &amp; Predictive Maintenance
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time battery telemetry, electrode pad expiry alerts, and dynamic OTP solenoid lock status across Ahmedabad
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenBackendModal}
            className="bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition"
          >
            <Code2 className="w-4 h-4" /> View Node.js + MySQL Spatial Backend Code
          </button>
        </div>
      </div>

      {/* AED Units Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 bg-slate-950/60">
                <th className="py-3 px-4">AED Cabinet ID</th>
                <th className="py-3 px-4">Ahmedabad Landmark</th>
                <th className="py-3 px-4">Hardware Model</th>
                <th className="py-3 px-4">Battery %</th>
                <th className="py-3 px-4">Pad Expiry</th>
                <th className="py-3 px-4">Smart Lock</th>
                <th className="py-3 px-4">IoT Heartbeat</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-xs">
              {aeds.map((aed) => (
                <tr key={aed.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">{aed.id}</td>
                  <td className="py-3 px-4 font-semibold text-white">{aed.name}</td>
                  <td className="py-3 px-4 text-slate-300">{aed.brand}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${aed.battery > 70 ? 'bg-emerald-400' : 'bg-rose-500'}`}
                          style={{ width: `${aed.battery}%` }}
                        />
                      </div>
                      <span className="font-mono text-slate-300">{aed.battery}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">{aed.padsExpiry}</td>
                  <td className="py-3 px-4">
                    {aed.locked ? (
                      <span className="inline-flex items-center gap-1 text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                        <Lock className="w-3 h-3 text-amber-400" /> Armed (OTP: {aed.cabinetOtp})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold border border-emerald-500/40">
                        <Unlock className="w-3 h-3" /> Deployed
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400">{aed.lastPing}</td>
                  <td className="py-3 px-4">
                    {aed.status === 'READY' ? (
                      <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full inline-flex items-center gap-1 border border-emerald-500/30">
                        <ShieldCheck className="w-3 h-3" /> OPERATIONAL
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full inline-flex items-center gap-1 border border-rose-500/30">
                        <AlertTriangle className="w-3 h-3" /> MAINTENANCE ALERT
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AED Desert Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {AED_DESERT_ZONES.map((dz) => (
          <div
            key={dz.id}
            className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-4 flex flex-col justify-between shadow-lg shadow-amber-950/10"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                AI-Identified AED Desert
              </span>
              <h4 className="text-sm font-bold text-white mt-2">{dz.name}</h4>
              <p className="text-xs text-slate-400 mt-1">
                Historical Cardiac Arrests: <strong className="text-rose-400">{dz.casesPerYear}/yr</strong> • Avg 108 ETA: <strong className="text-amber-300">{dz.avg108Eta}</strong>
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 font-semibold">Recommended: Install 3 Smart Kiosks</span>
              <span className="font-mono text-slate-400">Priority #1</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

