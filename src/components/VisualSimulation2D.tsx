import React from 'react';
import { motion } from 'motion/react';

interface VisualSimulationProps {
  angle: number;
}

export const VisualSimulation2D: React.FC<VisualSimulationProps> = ({ angle }) => {
  const hairs = Array.from({ length: 10 });
  
  // Refined Logic based on "add thisss" block:
  // 0°: Perpendicular (Vertical)
  // 0° -> 20°: Bending down. At 20°, hairs lie flat along surface.
  // 20° -> 30°: Hairs remain flat (Strong Grip).
  // 30° -> 60°: Gradually lift. Tips "peel off".
  // 70° -> 90°: Full detachment with visible gap.
  
  const getHairPath = (idx: number) => {
    const xBase = 60 + idx * 50;
    const yBase = 150;
    const L = 80; // Total length
    
    let xMid, yMid, xTip, yTip;

    if (angle <= 20) {
      // 0 to 20: Transition from vertical to flat
      const p = angle / 20;
      xMid = xBase + (L/2 * p);
      yMid = yBase - (L/2 * (1 - p));
      xTip = xBase + (L * p);
      yTip = yBase - (L * (1 - p));
      return `M ${xBase} ${yBase} L ${xMid} ${yMid} L ${xTip} ${yTip}`;
    } else if (angle <= 35) {
      // 20 to 35: Flat on surface (Strong Grip)
      xMid = xBase + L/2;
      yMid = yBase;
      xTip = xBase + L;
      yTip = yBase;
      return `M ${xBase} ${yBase} L ${xMid} ${yMid} L ${xTip} ${yTip}`;
    } else {
      // 35 to 90: Peeling and Detaching
      const p = (angle - 35) / 55; // 0 to 1
      
      // Peeling effect: mid point lifts slower than tip
      xMid = (xBase + L/2) - (L/4 * p);
      yMid = yBase - (L/2 * p);
      
      // Tip point lifts and moves away
      xTip = (xBase + L) - (L/2 * p);
      // Add a gap for detachment (angle > 60)
      const gap = angle > 60 ? (angle - 60) * 0.5 : 0;
      yTip = yBase - (L * p) - gap;

      return `M ${xBase} ${yBase} L ${xMid} ${yMid} L ${xTip} ${yTip}`;
    }
  };

  const getTipPos = (idx: number) => {
    const xBase = 60 + idx * 50;
    const yBase = 150;
    const L = 80;
    
    if (angle <= 20) {
      const p = angle / 20;
      return { x: xBase + (L * p), y: yBase - (L * (1 - p)) };
    } else if (angle <= 35) {
      return { x: xBase + L, y: yBase };
    } else {
      const p = (angle - 35) / 55;
      const gap = angle > 60 ? (angle - 60) * 0.5 : 0;
      return { x: (xBase + L) - (L/2 * p), y: yBase - (L * p) - gap };
    }
  };

  // Visual Cues
  const isAttached = angle < 45;
  const isTransition = angle >= 45 && angle < 70;
  const isDetached = angle >= 70;
  
  const glowOpacity = angle < 35 ? 0.6 : angle < 70 ? (70 - angle) / 100 : 0;
  const glowColor = angle < 45 ? '#10b981' : '#fbbf24';

  return (
    <div className="w-full bg-slate-900 rounded-2xl p-8 border border-slate-700 overflow-hidden shadow-2xl">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex flex-col">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Microscopic Simulation</h4>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isAttached ? 'bg-brand-primary' : isTransition ? 'bg-yellow-400' : 'bg-red-500'}`}></div>
            <span className="text-sm font-bold text-white">
              {isAttached ? 'STRONG ATTACHMENT' : isTransition ? 'PEELING / TRANSITION' : 'FULL DETACHMENT'}
            </span>
          </div>
        </div>
        <div className="flex gap-4 bg-slate-800 p-2 rounded-lg border border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
            <span className="text-[10px] text-slate-300 uppercase font-bold">Grip</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-[10px] text-slate-300 uppercase font-bold">Detach</span>
          </div>
        </div>
      </div>
      
      <svg viewBox="0 0 600 250" className="w-full h-auto">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Wall Surface */}
        <rect x="0" y="150" width="600" height="100" fill="#1e293b" />
        <line x1="0" y1="150" x2="600" y2="150" stroke="#475569" strokeWidth="2" />
        
        {/* Hairs */}
        {hairs.map((_, i) => {
          const tip = getTipPos(i);
          const xBase = 60 + i * 50;
          const path = getHairPath(i);
          
          return (
            <g key={i}>
              {/* Contact points (dots) - only visible when attached */}
              {angle < 60 && (
                <motion.circle
                  cx={xBase + (angle < 20 ? (angle/20)*40 : 40)}
                  cy={150}
                  r={3}
                  fill="#10b981"
                  initial={false}
                  animate={{ 
                    opacity: angle < 40 ? 1 : (60 - angle) / 20,
                    scale: angle < 40 ? 1 : 0.5
                  }}
                />
              )}

              {/* Glow effect on contact area */}
              {angle < 70 && (
                <motion.path
                  d={path}
                  fill="none"
                  stroke={glowColor}
                  strokeWidth="10"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  initial={false}
                  animate={{
                    opacity: glowOpacity,
                  }}
                />
              )}
              
              {/* Hair stem */}
              <motion.path
                d={path}
                fill="none"
                stroke={isAttached ? "#10b981" : isTransition ? "#fbbf24" : "#ef4444"}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{ d: path }}
              />
              
              {/* Tip point */}
              <motion.circle
                cx={tip.x}
                cy={tip.y}
                r={5}
                fill={isAttached ? "#34d399" : isTransition ? "#fcd34d" : "#f87171"}
                initial={false}
                animate={{ cx: tip.x, cy: tip.y }}
              />
            </g>
          );
        })}
      </svg>
      
      <div className="mt-6 p-4 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-300 leading-relaxed">
        <p className="font-bold text-brand-accent mb-1 uppercase tracking-wider">Simulation Feedback:</p>
        {angle === 0 ? (
          "INITIAL STATE: Hairs are perpendicular. Minimal van der Waals interaction."
        ) : angle <= 20 ? (
          `ATTACHMENT PHASE: At ${angle}°, hairs are bending to maximize surface contact. Tips are sticking.`
        ) : angle <= 35 ? (
          "STRONG GRIP ZONE: Maximum contact area achieved. The system is locked."
        ) : angle <= 60 ? (
          `PEELING PHASE: At ${angle}°, shear force is lifting the hairs. Contact points are detaching.`
        ) : (
          `DETACHMENT: At ${angle}°, the hairs have cleared the surface. Adhesion is zero.`
        )}
      </div>
    </div>
  );
};
