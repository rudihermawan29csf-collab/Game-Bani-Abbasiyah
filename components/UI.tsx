
import React, { useState, useEffect } from 'react';
import { sfx } from '../audio';
import { Heart } from 'lucide-react';

interface TacticalButtonProps {
  children?: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'danger' | 'success'; 
  disabled?: boolean;
  className?: string;
}

export const TacticalButton: React.FC<TacticalButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  className = ''
}) => {
  const baseStyles = "relative font-ops text-lg tracking-wider uppercase px-8 py-3 clip-button transition-all duration-200 active:scale-95 border-l-4 select-none cursor-[url('https://cdn.custom-cursor.com/db/cursor/32/Crosshair_Red.png'),_crosshair]";
  
  const variants = {
    primary: "bg-yellow-500 hover:bg-yellow-400 text-black border-white shadow-[0_0_15px_rgba(234,179,8,0.5)]",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white border-yellow-500",
    danger: "bg-red-600 hover:bg-red-500 text-white border-red-300 shadow-[0_0_15px_rgba(220,38,38,0.5)]",
    success: "bg-green-600 hover:bg-green-500 text-white border-green-300 shadow-[0_0_15px_rgba(22,163,74,0.5)]",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed grayscale";

  const handleClick = () => {
    if (!disabled) {
      // Trigger global fire event for WeaponOverlay
      const event = new CustomEvent('weapon-fire');
      window.dispatchEvent(event);

      if (variant === 'primary' || variant === 'danger' || variant === 'secondary') {
         sfx.shoot();
      } else {
         sfx.click();
      }
      if (onClick) onClick();
    }
  };

  return (
    <button 
      onClick={handleClick} 
      disabled={disabled}
      className={`${baseStyles} ${disabled ? disabledStyles : variants[variant]} ${className}`}
      onMouseEnter={() => !disabled && sfx.click()}
    >
      {children}
      {!disabled && variant === 'primary' && (
        <span className="absolute top-0 right-0 w-2 h-2 bg-white animate-pulse" />
      )}
    </button>
  );
};

export const Panel = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`bg-slate-900/60 border border-slate-700 backdrop-blur-sm relative p-6 clip-diagonal shadow-lg ${className}`}>
    <div className="absolute top-0 left-0 w-20 h-1 bg-yellow-500" />
    <div className="absolute bottom-0 right-0 w-20 h-1 bg-yellow-500" />
    {children}
  </div>
);

export const RankBadge = ({ rank }: { rank: string }) => {
  let color = "text-slate-400 border-slate-400";
  if (rank.includes("Gold") || rank.includes("Sergeant")) color = "text-yellow-400 border-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]";
  if (rank.includes("Diamond") || rank.includes("Commander")) color = "text-cyan-400 border-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]";
  
  return (
    <div className={`border-2 px-3 py-1 font-ops text-sm uppercase tracking-widest ${color}`}>
      {rank}
    </div>
  );
};

export const HealthBar = ({ hp, maxHp }: { hp: number, maxHp: number }) => {
  const pct = Math.max(0, (hp / maxHp) * 100);
  
  return (
    <div className="flex items-center gap-2">
      <Heart className={`${hp < 30 ? 'text-red-500 animate-pulse' : 'text-green-500'} fill-current`} />
      <div className="w-48 h-4 bg-slate-800 border border-slate-600 skew-x-[-15deg] overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${hp < 30 ? 'bg-red-600' : 'bg-green-500'}`} 
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-ops text-white">{hp}/{maxHp}</span>
    </div>
  );
};

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
      const centerY = window.innerHeight; // Pivot at bottom center
      
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      
      // Calculate angle in degrees
      // atan2(0, -1) (Up) is -90deg. We want that to be 0deg.
      let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      
      // Clamp rotation for realism (can't shoot backwards easily)
      deg = Math.max(-75, Math.min(75, deg));
      
      setRotation(deg);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed bottom-0 left-1/2 z-50 pointer-events-none -translate-x-1/2 h-0 flex justify-center items-end visible">
        <div 
            className="relative flex flex-col items-center origin-bottom transition-transform duration-75 ease-out"
            style={{ 
                transform: `rotate(${rotation}deg)`,
                marginBottom: '-50px' // Move down so arm starts off screen
            }}
        >
            {/* LASER SIGHT - UPDATED: BIGGER & BRIGHTER NEON */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-2 h-[150vh] bg-gradient-to-t from-red-600 via-red-500 to-white pointer-events-none mix-blend-screen origin-bottom z-0"
                 style={{ 
                   boxShadow: '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 40px #ff0000',
                   opacity: 0.9
                 }} 
            />

            {/* CHARACTER ARM & WEAPON CONTAINER */}
            <div className={`relative flex flex-col items-center transition-transform duration-75 origin-bottom z-10 ${isFiring ? 'translate-y-4' : 'translate-y-0'}`}>
                
                {/* Muzzle Flash */}
                {isFiring && (
                    <>
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-300 rounded-full blur-xl opacity-90 animate-ping mix-blend-screen z-40" />
                    <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full blur-md z-40 shadow-[0_0_20px_cyan]" />
                    </>
                )}

                {/* THE WEAPON + HAND COMPOSITION */}
                <div className="relative">
                    
                    {/* 1. GUN BARREL & SIGHTS - UPDATED COLORS */}
                    <div className="flex flex-col items-center relative z-20">
                        {/* Sight */}
                        <div className="w-1.5 h-8 bg-cyan-900 border border-cyan-400 shadow-[0_0_5px_cyan]"></div>
                        
                        {/* Barrel */}
                        <div className="w-14 h-24 bg-gradient-to-b from-slate-700 to-slate-900 border-x-2 border-cyan-500 flex justify-center relative shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                            <div className="w-8 h-full bg-slate-800 border-x border-cyan-900/50"></div>
                            {/* Vent holes - Bright Pink Neon */}
                            <div className="absolute top-4 w-10 h-1.5 bg-pink-500 shadow-[0_0_5px_#ec4899] animate-pulse"></div>
                            <div className="absolute top-8 w-10 h-1.5 bg-pink-500 shadow-[0_0_5px_#ec4899] animate-pulse"></div>
                            <div className="absolute top-12 w-10 h-1.5 bg-pink-500 shadow-[0_0_5px_#ec4899] animate-pulse"></div>
                        </div>
                    </div>

                    {/* 2. MAIN BODY & GRIP - UPDATED COLORS */}
                    <div className="relative z-20 -mt-1">
                         {/* Main Receiver */}
                         <div className="w-32 h-32 bg-gradient-to-b from-indigo-900 to-slate-900 rounded-t-lg border-2 border-cyan-400 shadow-xl relative overflow-hidden">
                             {/* Side energy panel */}
                             <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_lime] border border-white"></div>
                             
                             {/* Decorative Lines */}
                             <div className="absolute top-10 right-4 w-20 h-1.5 bg-orange-500 shadow-[0_0_8px_orange]"></div>
                             <div className="absolute top-14 right-4 w-16 h-1.5 bg-orange-500 shadow-[0_0_8px_orange]"></div>
                             
                             {/* Sci-fi texture */}
                             <div className="absolute bottom-2 left-2 right-2 h-8 border-t border-cyan-500/30 flex justify-between items-end px-2 pb-1">
                                <div className="w-1 h-3 bg-cyan-500"></div>
                                <div className="w-1 h-3 bg-cyan-500"></div>
                                <div className="w-1 h-3 bg-cyan-500"></div>
                             </div>
                         </div>
                    </div>

                    {/* 3. GLOVED HAND (Holding the gun) */}
                    <div className="absolute top-32 left-1/2 -translate-x-1/2 w-32 h-20 z-30 flex justify-center gap-1">
                        <div className="w-6 h-16 bg-neutral-800 rounded-full border border-cyan-900/50 transform -rotate-12 translate-y-2 shadow-lg"></div> {/* Index */}
                        <div className="w-6 h-16 bg-neutral-800 rounded-full border border-cyan-900/50 transform -rotate-6 translate-y-4 shadow-lg"></div> {/* Middle */}
                        <div className="w-6 h-16 bg-neutral-800 rounded-full border border-cyan-900/50 transform rotate-0 translate-y-5 shadow-lg"></div> {/* Ring */}
                        <div className="w-6 h-14 bg-neutral-800 rounded-full border border-cyan-900/50 transform rotate-6 translate-y-4 shadow-lg"></div>  {/* Pinky */}
                    </div>

                    {/* Thumb (Back) */}
                    <div className="absolute top-40 left-0 w-10 h-16 bg-neutral-800 rounded-full border border-cyan-900/50 transform -rotate-45 z-30"></div>

                    {/* 4. ARM / SLEEVE - UPDATED COLORS */}
                    <div className="absolute top-40 left-1/2 -translate-x-1/2 w-44 h-96 bg-slate-900 border-x-4 border-cyan-700 z-10 rounded-t-3xl shadow-2xl flex justify-center">
                         {/* High tech sleeve pattern */}
                         <div className="w-24 h-full bg-slate-800/50 border-x border-slate-700"></div>
                         
                         {/* Watch / Wristband */}
                         <div className="absolute top-10 w-full h-10 bg-black border-y-2 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)] flex items-center justify-center">
                              <div className="w-16 h-6 bg-green-900/30 border border-green-500 rounded text-[10px] text-green-400 font-mono flex items-center justify-center animate-pulse tracking-widest">
                                  {isFiring ? 'ENGAGED' : 'ARMED'}
                              </div>
                         </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  );
};
