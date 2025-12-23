
import React, { useState, useEffect } from 'react';
import { sfx } from '../audio';
import { Heart } from 'lucide-react';

export const WeaponOverlay = () => {
  const [isFiring, setIsFiring] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [sway, setSway] = useState(0); // Horizontal movement
  const [shotTraces, setShotTraces] = useState<{id: number, x: number, y: number, angle: number}[]>([]);

  useEffect(() => {
    const handleFire = (e: any) => {
      setIsFiring(true);
      sfx.shoot();
      
      // Calculate shot trace data
      if (e.detail && e.detail.x !== undefined) {
        const targetX = e.detail.x;
        const targetY = e.detail.y;
        const startX = window.innerWidth / 2 + sway; // Account for gun sway
        const startY = window.innerHeight; 
        
        // Recoil effect on rotation
        setRotation(prev => prev + (Math.random() * 2 - 1));

        // Add trace
        const dx = targetX - startX;
        const dy = targetY - startY;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

        const newTrace = { id: Date.now(), x: targetX, y: targetY, angle };
        setShotTraces(prev => [...prev, newTrace]);
        
        setTimeout(() => {
            setShotTraces(prev => prev.filter(t => t.id !== newTrace.id));
        }, 80);
      }

      setTimeout(() => setIsFiring(false), 50); 
    };

    window.addEventListener('weapon-fire', handleFire);
    return () => window.removeEventListener('weapon-fire', handleFire);
  }, [sway]); // Depend on sway to fire from correct X position

  // Mouse tracking for rotation AND horizontal sway
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isFiring) {
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight; 
          
          // Rotation Logic
          const dx = e.clientX - centerX;
          const dy = e.clientY - centerY;
          let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
          deg = Math.max(-60, Math.min(60, deg)); // Clamp rotation
          setRotation(deg);

          // Sway Logic (Move gun left/right based on mouse X)
          // Max sway is 100px left or right
          const swayAmount = (dx / centerX) * 80; 
          setSway(swayAmount);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isFiring]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
        {/* SHOT TRACES */}
        {shotTraces.map(trace => {
             const startX = window.innerWidth / 2 + sway; // Trace starts from gun tip
             const startY = window.innerHeight;
             const dx = trace.x - startX;
             const dy = trace.y - startY;
             const length = Math.sqrt(dx * dx + dy * dy);
             const angle = Math.atan2(dy, dx) * (180 / Math.PI);

             return (
                <div key={trace.id} 
                     className="absolute origin-left animate-out fade-out duration-75"
                     style={{
                        left: startX,
                        top: startY,
                        width: length,
                        height: '3px',
                        transform: `rotate(${angle}deg)`,
                        zIndex: 40
                     }}
                >
                    <div className="w-full h-full bg-yellow-200 shadow-[0_0_8px_rgba(250,204,21,0.9)] rounded-full opacity-80"></div>
                </div>
             );
        })}

        {/* GUN CONTAINER */}
        <div className="absolute bottom-0 left-0 w-full h-0 flex justify-center items-end">
            <div 
                className="relative flex flex-col items-center origin-bottom transition-transform duration-75 ease-out will-change-transform"
                style={{ 
                    transform: `translateX(${sway}px) rotate(${rotation}deg)`, 
                    marginBottom: '-40px' // Tuck bottom slightly offscreen
                }}
            >
                {/* TACTICAL LASER - Follows gun movement */}
                <div className="absolute bottom-32 left-[18px] w-[1px] h-[150vh] border-l border-red-500/40 border-dashed pointer-events-none origin-bottom z-0 opacity-50 mix-blend-screen" />

                {/* Gun Body + Arms Container */}
                <div className={`relative flex flex-col items-center origin-bottom z-20 transition-all duration-[40ms] ease-out ${isFiring ? 'translate-y-4 scale-95' : 'translate-y-0 scale-100'}`}>
                    
                    {/* MUZZLE FLASH - Scaled Down */}
                    {isFiring && (
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-50">
                             <div className="w-10 h-24 bg-yellow-100 blur-sm clip-flash mix-blend-screen animate-ping"></div>
                             <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-20 bg-orange-500 blur-xl opacity-40 rounded-full"></div>
                        </div>
                    )}

                    {/* COMPOSITE SVG: ARMS + GUN (FPS VIEW) */}
                    <svg width="240" height="220" viewBox="0 0 200 180" className="drop-shadow-2xl filter brightness-[0.85] contrast-[1.1]">
                        <defs>
                            <linearGradient id="sleeveColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3f4c6b" /> {/* Navy/Tactical Blue-Grey */}
                                <stop offset="100%" stopColor="#1e293b" />
                            </linearGradient>
                            <linearGradient id="gloveColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#333" />
                                <stop offset="100%" stopColor="#000" />
                            </linearGradient>
                            <linearGradient id="skinColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#d4a373" />
                                <stop offset="100%" stopColor="#a97142" />
                            </linearGradient>
                            <linearGradient id="gunMetal" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#0f172a" />
                                <stop offset="50%" stopColor="#334155" />
                                <stop offset="100%" stopColor="#0f172a" />
                            </linearGradient>
                        </defs>

                        {/* --- LEFT ARM (Holding Handguard) --- */}
                        <path d="M 0 180 L 60 100 L 85 110 L 40 180 Z" fill="url(#sleeveColor)" />
                        {/* Left Hand/Glove under barrel */}
                        <ellipse cx="80" cy="95" rx="12" ry="14" fill="url(#gloveColor)" transform="rotate(-20 80 95)" />
                        <circle cx="82" cy="90" r="10" fill="url(#gloveColor)" /> {/* Thumb */}

                        {/* --- RIGHT ARM (Holding Grip) --- */}
                        <path d="M 200 180 L 130 130 L 150 120 L 220 180 Z" fill="url(#sleeveColor)" />
                        {/* Right Hand/Glove on grip */}
                        <ellipse cx="125" cy="135" rx="14" ry="16" fill="url(#gloveColor)" transform="rotate(30 125 135)" />
                        <path d="M 120 125 L 125 110 L 135 115 L 130 130 Z" fill="url(#gloveColor)" /> {/* Trigger finger */}


                        {/* --- THE WEAPON (AR-15 Style - Compact View) --- */}
                        <g transform="translate(85, 0) scale(0.7)">
                            {/* Barrel */}
                            <rect x="15" y="0" width="10" height="180" fill="#111" />
                            
                            {/* Muzzle Brake */}
                            <rect x="12" y="-10" width="16" height="20" fill="#222" rx="2" />
                            
                            {/* Handguard (Rail) */}
                            <rect x="5" y="40" width="30" height="100" fill="#2d3748" rx="2" stroke="#111" />
                            <line x1="20" y1="40" x2="20" y2="140" stroke="#000" strokeWidth="2" opacity="0.5" />
                            {/* Vents */}
                            <circle cx="12" cy="60" r="3" fill="#000" opacity="0.7"/>
                            <circle cx="12" cy="80" r="3" fill="#000" opacity="0.7"/>
                            <circle cx="12" cy="100" r="3" fill="#000" opacity="0.7"/>
                            <circle cx="28" cy="60" r="3" fill="#000" opacity="0.7"/>
                            <circle cx="28" cy="80" r="3" fill="#000" opacity="0.7"/>
                            <circle cx="28" cy="100" r="3" fill="#000" opacity="0.7"/>

                            {/* Laser Box (PEQ) Side */}
                            <rect x="35" y="50" width="10" height="25" fill="#1a202c" rx="1" />
                            <circle cx="40" cy="55" r="2" fill="red" className="animate-pulse" />

                            {/* Upper Receiver Body */}
                            <rect x="0" y="140" width="40" height="80" fill="url(#gunMetal)" rx="4" />
                            <line x1="20" y1="140" x2="20" y2="220" stroke="#000" strokeWidth="1" opacity="0.3"/>

                            {/* Optic (Red Dot) */}
                            <g transform="translate(5, 150)">
                                <rect x="0" y="0" width="30" height="30" fill="#1e1e1e" rx="4" />
                                <circle cx="15" cy="15" r="10" fill="#000" stroke="#333" strokeWidth="2" />
                                <circle cx="15" cy="15" r="3" fill="red" opacity="0.8" />
                                <rect x="-2" y="10" width="4" height="10" fill="#333" /> {/* Mount Knob */}
                            </g>
                        </g>
                    </svg>

                </div>
            </div>
        </div>
        
        <style>{`
            .clip-flash {
                clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            }
        `}</style>
    </div>
  );
};

export const RankBadge = ({ rank }: { rank: string }) => {
  let color = "text-slate-400 border-slate-400";
  if (rank.includes("Penjelajah") || rank.includes("Cendekiawan")) color = "text-yellow-400 border-yellow-400";
  return <div className={`border px-2 py-0.5 font-ops text-[10px] uppercase ${color}`}>{rank}</div>;
};

export const HealthBar = ({ hp, maxHp }: { hp: number, maxHp: number }) => {
  const pct = (hp / maxHp) * 100;
  return (
    <div className="flex items-center gap-2">
      <Heart className={hp < 40 ? 'text-red-500 animate-pulse' : 'text-green-500'} size={14} fill="currentColor" />
      <div className="w-24 md:w-40 h-2 bg-slate-900 border border-slate-700 overflow-hidden">
        <div className={`h-full transition-all duration-500 ${hp < 40 ? 'bg-red-600' : 'bg-green-500'}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export const TacticalButton = ({ children, onClick, variant = 'primary', className = '', disabled = false }: any) => {
  const styles = {
    primary: "bg-yellow-500 hover:bg-yellow-400 text-black border-yellow-200",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white border-slate-600",
    danger: "bg-red-600 hover:bg-red-500 text-white border-red-400",
    success: "bg-green-600 hover:bg-green-500 text-white border-green-400",
  };
  return (
    <button 
      disabled={disabled}
      onClick={(e) => { 
        sfx.click(); 
        onClick && onClick(e); 
      }}
      className={`relative font-ops px-4 py-2 border-b-4 clip-button transition-all active:translate-y-1 disabled:opacity-50 ${styles[variant as keyof typeof styles]} ${className}`}
    >
      {children}
    </button>
  );
};

export const Panel = ({ children, className = '' }: { children?: React.ReactNode, className?: string }) => (
  <div className={`bg-slate-900/90 border border-slate-700 backdrop-blur-md p-6 clip-diagonal ${className}`}>
    {children}
  </div>
);
