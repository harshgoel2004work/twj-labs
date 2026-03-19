import React from 'react'

const Loading = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center' style={{
      background: '#08060f',
      fontFamily: "'DM Mono', monospace",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&display=swap');

        @keyframes orbit {
          from { transform: rotate(0deg) translateX(32px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(32px) rotate(-360deg); }
        }
        @keyframes orbit-reverse {
          from { transform: rotate(0deg) translateX(52px) rotate(0deg); }
          to   { transform: rotate(-360deg) translateX(52px) rotate(360deg); }
        }
        @keyframes orbit-slow {
          from { transform: rotate(45deg) translateX(72px) rotate(-45deg); }
          to   { transform: rotate(405deg) translateX(72px) rotate(-405deg); }
        }
        @keyframes pulse-core {
          0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(139,92,246,0.6); }
          50% { transform: scale(1.15); opacity: 0.8; box-shadow: 0 0 0 12px rgba(139,92,246,0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ring-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ring-rotate-rev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }

        .orbit-dot-1 {
          animation: orbit 1.4s linear infinite;
        }
        .orbit-dot-2 {
          animation: orbit-reverse 2s linear infinite;
        }
        .orbit-dot-3 {
          animation: orbit-slow 2.8s linear infinite;
        }
        .core {
          animation: pulse-core 2s ease-in-out infinite;
        }
        .cursor {
          animation: blink 1s step-end infinite;
        }
        .label {
          animation: fadeIn 0.8s ease forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }
        .ring-1 {
          animation: ring-rotate 3s linear infinite;
        }
        .ring-2 {
          animation: ring-rotate-rev 4s linear infinite;
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>

        {/* Orbital system */}
        <div style={{ position: 'relative', width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          {/* Outer ring */}
          <div className="ring-2" style={{
            position: 'absolute',
            width: '152px', height: '152px',
            border: '1px solid rgba(139,92,246,0.12)',
            borderRadius: '50%',
            borderTopColor: 'rgba(167,139,250,0.35)',
          }} />

          {/* Mid ring */}
          <div className="ring-1" style={{
            position: 'absolute',
            width: '112px', height: '112px',
            border: '1px solid rgba(99,102,241,0.12)',
            borderRadius: '50%',
            borderBottomColor: 'rgba(99,102,241,0.4)',
            borderLeftColor: 'rgba(99,102,241,0.4)',
          }} />

          {/* Inner ring */}
          <div style={{
            position: 'absolute',
            width: '72px', height: '72px',
            border: '1px solid rgba(139,92,246,0.15)',
            borderRadius: '50%',
          }} />

          {/* Orbiting dot 1 — closest, fast */}
          <div className="orbit-dot-1" style={{
            position: 'absolute',
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: '#a78bfa',
            boxShadow: '0 0 10px 3px rgba(167,139,250,0.7)',
          }} />

          {/* Orbiting dot 2 — mid, reverse */}
          <div className="orbit-dot-2" style={{
            position: 'absolute',
            width: '4px', height: '4px',
            borderRadius: '50%',
            background: 'rgba(99,102,241,0.9)',
            boxShadow: '0 0 8px 2px rgba(99,102,241,0.5)',
          }} />

          {/* Orbiting dot 3 — far, slow */}
          <div className="orbit-dot-3" style={{
            position: 'absolute',
            width: '3px', height: '3px',
            borderRadius: '50%',
            background: 'rgba(167,139,250,0.4)',
          }} />

          {/* Core */}
          <div className="core" style={{
            width: '12px', height: '12px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #c4b5fd, #6366f1)',
          }} />
        </div>

        {/* Text */}
        <div className="label" style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '11px',
            letterSpacing: '0.25em',
            color: 'rgba(167,139,250,0.45)',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            loading
            <span className="cursor" style={{ color: 'rgba(167,139,250,0.9)' }}>_</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Loading