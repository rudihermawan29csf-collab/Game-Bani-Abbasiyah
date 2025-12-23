
import React, { useState, useEffect } from 'react';
import { sfx } from '../audio';
import { Heart } from 'lucide-react';

export const WeaponOverlay = () => {
  const [isFiring, setIsFiring] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleFire = () => {
      setIsFiring(true);
      setTimeout(() => setIsFiring(false), 100);
    };
    window.addEventListener('weapon-fire', handleFire);
    return () => window.removeEventListener('weapon-fire', handleFire);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight; 
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      deg = Math.max(-80, Math.min(80, deg));
      setRotation(deg);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed bottom-0 left-1/2 z-50 pointer-events-none -translate-x-1/2 h-0 flex justify-center items-end">
        <div 
            className="relative flex flex-col items-center origin-bottom transition-transform duration-75 ease-out"
            style={{ transform: `rotate(${rotation}deg)`, marginBottom: '-20px' }}
        >
            {/* THIN LASER SIGHT - Precise 1px width */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[1px] h-[150vh] bg-gradient-to-t from-red-600 via-red-500/50 to-transparent pointer-events-none mix-blend-screen origin-bottom z-0"
                 style={{ boxShadow: '0 0 3px #ff0000', opacity: 0.8 }} 
            />

            <div className={`relative flex flex-col items-center transition-transform duration-75 origin-bottom z-10 ${isFiring ? 'translate-y-4 scale-95' : 'translate-y-0'}`}>
                {isFiring && (
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-40 h-1 bg-white blur-sm z-40 shadow-[0_0_20px_white] animate-pulse" />
                )}

                <div className="relative scale-75 md:scale-100">
                    <div className="flex flex-col items-center relative z-20">
                        {/* Rail Gun Barrel */}
                        <div className="w-1.5 h-16 bg-slate-900 border-x border-cyan-500/50"></div>
                        <div className="w-10 h-28 bg-gradient-to-b from-slate-800 to-black border-x-4 border-slate-700 flex justify-center relative">
                            <div className="w-6 h-full bg-slate-900/50 border-x border-cyan-900/30"></div>
                            <div className="absolute top-4 w-8 h-1 bg-cyan-400 shadow-[0_0_5px_cyan]"></div>
                            <div className="absolute top-10 w-8 h-1 bg-cyan-400 shadow-[0_0_5px_cyan]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
      onClick={() => { sfx.click(); onClick && onClick(); }}
      className={`relative font-ops px-4 py-2 border-b-4 clip-button transition-all active:translate-y-1 disabled:opacity-50 ${styles[variant as keyof typeof styles]} ${className}`}
    >
      {children}
    </button>
  );
};

{/* Fix: changed children to be optional to resolve "missing children" TS errors in usage files */}
export const Panel = ({ children, className = '' }: { children?: React.ReactNode, className?: string }) => (
  <div className={`bg-slate-900/90 border border-slate-700 backdrop-blur-md p-6 clip-diagonal ${className}`}>
    {children}
  </div>
);
