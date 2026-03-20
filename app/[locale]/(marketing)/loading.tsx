import React from 'react'

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #0f0f17 0%, #0a0a12 100%)',
      }}
    >
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.92); }
          50%      { opacity: 1;   transform: scale(1.08); }
        }
        @keyframes textFade {
          0%, 100% { opacity: 0.6; }
          50%      { opacity: 1; }
        }
        @keyframes typing {
          from { width: 0; }
          to   { width: 7ch; }
        }

        .loader-ring {
          animation: spin 1.6s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }
        .pulse-ring {
          animation: pulse 2.4s ease-in-out infinite;
        }
        .loading-text {
          animation: textFade 3s ease-in-out infinite;
        }
        .typing {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid #a78bfa;
          animation: 
            typing 3.2s steps(7) infinite,
            textFade 3s ease-in-out infinite;
        }
      `}</style>

      <div className="relative w-28 h-28">

        {/* Large faint pulse background */}
        <div
          className="absolute inset-0 pulse-ring rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)',
          }}
        />

        {/* Main spinning ring */}
        <div
          className="loader-ring absolute inset-0"
          style={{
            border: '3px solid transparent',
            borderTopColor: '#a78bfa',
            borderRightColor: '#a78bfa88',
            borderRadius: '50%',
          }}
        />

        {/* Inner glowing core */}
        <div
          className="absolute inset-[38%] rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #c4b5fd, #7c3aed 60%, #4c1d95 100%)',
            boxShadow: '0 0 32px 8px rgba(139,92,246,0.45), inset 0 0 12px rgba(255,255,255,0.15)',
          }}
        />

      </div>

      <div className="mt-10 flex flex-col items-center gap-2">
        <div
          className="typing text-[#a78bfa] font-mono text-sm tracking-wider uppercase font-light"
          style={{ fontFamily: "'JetBrains Mono', 'DM Mono', monospace" }}
        >
          loading...
        </div>

        <div className="loading-text text-xs text-zinc-500 font-light tracking-widest mt-1">
          please wait
        </div>
      </div>

      {/* Optional: tiny orbiting accent dots (uncomment if you want more motion) */}
      {/* 
      <div className="absolute w-3 h-3 rounded-full bg-purple-400/60 blur-sm"
        style={{ animation: 'orbit 3.8s linear infinite', transform: 'translateX(80px)' }} />
      */}
    </div>
  )
}