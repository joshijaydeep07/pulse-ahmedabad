import React from 'react';
import { Code2, Copy, Check, X } from 'lucide-react';
import { BACKEND_CODE_SNIPPET } from '../data/ahmedabadData';

export default function BackendCodeModal({ isOpen, onClose, copiedCode, onCopy }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-sky-400" />
            <h3 className="text-sm font-bold text-white">
              Production Backend Engine (Node.js + Socket.io + MySQL 8.0 ST_Distance_Sphere)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onCopy}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition"
            >
              {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedCode ? 'Copied to Clipboard!' : 'Copy Server Code'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer transition"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="p-4 overflow-y-auto font-mono text-xs bg-slate-950 text-emerald-300 leading-relaxed">
          <pre className="whitespace-pre-wrap">{BACKEND_CODE_SNIPPET}</pre>
        </div>
      </div>
    </div>
  );
}

