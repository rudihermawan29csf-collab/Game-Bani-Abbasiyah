
import React, { useState, useEffect } from 'react';
import { ScreenState, UserProfile, Difficulty, Question } from './types';
import { 
  LEVEL_CONFIGS, CHARACTERS, GAME_DATA 
} from './constants';
import { TacticalButton, Panel, RankBadge, HealthBar } from './components/UI';
import { UniversalLevelEngine } from './components/GameLevels';
import { Shield, ChevronLeft, Star, Award, Lock, Play, Skull, ScrollText, Target, Crosshair, Swords, Brain, Zap, Loader2, MapPin, RefreshCw, History } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from './audio';

// --- HELPERS ---

const TypewriterText = ({ text, className = "" }: { text: string, className?: string }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setDisplayText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 30); // Speed of typing
    
    return () => clearInterval(timer);
  }, [text]);

  return (
    <p className={className}>
      {displayText}
      <span className="animate-pulse ml-1 text-yellow-500">_</span>
    </p>
  );
};

// --- SUB-COMPONENTS ---

const TitleScreen = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* 1. BACKGROUND IMAGE - Fixed Link */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
        style={{ backgroundImage: "url('https://iili.io/fcTZCa2.jpg')" }} 
      ></div>
      
      {/* 2. OVERLAY TRANSPARANSI 60% (bg-black/60) */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      
      {/* Decorative Scanlines */}
      <div className="scanlines"></div>
      
      {/* Decorative Particles/Smoke */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] mix-blend-overlay animate-[spin_60s_linear_infinite]"></div>

      {/* 3. MAIN CONTENT */}
      <div className="z-20 text-center space-y-6 p-4 flex flex-col items-center h-full justify-center relative w-full">
        <div className="flex-grow flex flex-col justify-center items-center w-full max-w-4xl">
            
            {/* Top Tag */}
            <div className="flex items-center gap-2 mb-4 animate-in slide-in-from-top-10 fade-in duration-1000">
                <div className="h-px w-12 bg-yellow-500"></div>
                <span className="text-yellow-400 font-mono tracking-[0.3em] text-xs md:text-sm drop-shadow-md">MISSION START</span>
                <div className="h-px w-12 bg-yellow-500"></div>
            </div>

            {/* Game Logo Text with GLITCH EFFECT & SHINE */}
            <div className="relative mb-2">
                <h1 
                    className="text-6xl md:text-9xl font-ops animate-shine glitch-text drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] leading-none tracking-tighter"
                    data-text="JEJAK"
                >
                  JEJAK
                </h1>
            </div>

            <h1 
                className="text-3xl md:text-6xl font-ops animate-shine drop-shadow-lg glitch-text leading-tight"
                data-text="AL-MUJADILAH: 11"
            >
              AL-MUJADILAH: 11
            </h1>
            
            <div className="mt-8 transform -skew-x-12 bg-slate-900/80 border-l-4 border-yellow-500 px-8 py-2 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-yellow-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                 <p className="text-slate-200 tracking-[0.5em] text-xs md:text-lg font-mono">
                    OPERATION: KNOWLEDGE & FAITH
                </p>
            </div>
            
            <div className="mt-20 relative group hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-yellow-500 blur-xl opacity-30 group-hover:opacity-60 transition-opacity rounded-full animate-pulse"></div>
                <TacticalButton onClick={() => { sfx.init(); sfx.click(); onStart(); }} className="scale-125 border-yellow-400 text-xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500">
                    MULAI MISI
                </TacticalButton>
            </div>
        </div>

        {/* SPONSORSHIP FOOTER */}
        <div className="w-full max-w-2xl border-t border-slate-700/50 bg-black/80 backdrop-blur-md p-4 rounded-t-xl flex items-center justify-center gap-6 animate-in slide-in-from-bottom-5 fade-in duration-1000 border-x border-slate-700/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
            <div className="text-right">
                <p className="text-slate-400 text-[10px] font-mono mb-1 tracking-widest">DIDUKUNG OLEH:</p>
                <h3 className="text-white font-bold text-sm md:text-base font-ops tracking-wide leading-none">MGMP PAI SMP dan KEMENAG<br/>KABUPATEN MOJOKERTO</h3>
            </div>
            <div className="h-10 w-px bg-slate-600"></div>
            {/* Fixed Logo Link */}
            <img 
                src="https://iili.io/fcTD21f.png" 
                alt="Logo Kemenag" 
                className="h-14 w-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform"
            />
        </div>
      </div>
    </div>
  );
};

const LoginScreen = ({ onLogin }: { onLogin: (name: string) => void }) => {
  const [name, setName] = useState('');
  return (
    <div className="h-[100dvh] w-full flex items-center justify-center bg-slate-900 relative overflow-hidden">
      {/* Background Image - Login Screen - Opacity 50% */}
      <div className="absolute inset-0 bg-cover bg-center z-0 opacity-50" 
           style={{ backgroundImage: "url('https://iili.io/fcu0G2t.jpg')" }}>
      </div>
      
      <div className="absolute inset-0 opacity-10 z-0" 
           style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      
      <Panel className="w-full max-w-md mx-4 z-10">
        <h2 className="text-2xl font-ops text-yellow-500 mb-6 text-center">IDENTITAS PENJELAJAH</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-slate-400 text-sm mb-1 ml-1 font-mono">NAMA AGEN</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-800 border-2 border-slate-600 p-3 text-white focus:border-yellow-500 focus:outline-none font-ops uppercase text-xl"
              placeholder="MASUKKAN NAMA..."
              autoFocus
            />
          </div>
          <TacticalButton onClick={() => onLogin(name)} className="w-full">
            AKSES DATABASE
          </TacticalButton>
        </div>
      </Panel>
    </div>
  );
};

const DifficultySelectScreen = ({ onSelect }: { onSelect: (diff: Difficulty) => void }) => {
    return (
        <div className="h-[100dvh] w-full bg-slate-900 flex flex-col items-center justify-center p-4">
             <div className="max-w-4xl w-full">
                <h2 className="text-4xl font-ops text-white mb-8 text-center">PILIH TINGKAT OPERASI</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto max-h-[80vh] p-2">
                    {/* EASY */}
                    <button 
                        onClick={() => onSelect(Difficulty.EASY)}
                        className="bg-slate-800 border-2 border-green-600 hover:bg-slate-700 hover:scale-105 transition-all p-6 rounded-lg group relative overflow-hidden min-h-[300px] flex flex-col justify-between"
                    >
                        <div className="absolute inset-0 bg-green-900/10 group-hover:bg-green-900/20 transition-colors"></div>
                        <div className="text-center">
                             <Shield size={48} className="mx-auto text-green-500 mb-4" />
                             <h3 className="text-2xl font-ops text-green-500">PEMULA</h3>
                             <div className="text-slate-400 text-sm font-mono mt-2">TINGKAT MUDAH</div>
                        </div>
                        <p className="text-slate-300 text-sm text-center">Pengenalan konsep dasar & fakta sederhana.</p>
                        <div className="bg-green-900/40 py-2 text-center text-green-400 font-ops text-sm border border-green-700">
                             MULAI MISI
                        </div>
                    </button>

                    {/* MEDIUM */}
                    <button 
                        onClick={() => onSelect(Difficulty.MEDIUM)}
                        className="bg-slate-800 border-2 border-yellow-600 hover:bg-slate-700 hover:scale-105 transition-all p-6 rounded-lg group relative overflow-hidden min-h-[300px] flex flex-col justify-between"
                    >
                        <div className="absolute inset-0 bg-yellow-900/10 group-hover:bg-yellow-900/20 transition-colors"></div>
                        <div className="text-center">
                             <Swords size={48} className="mx-auto text-yellow-500 mb-4" />
                             <h3 className="text-2xl font-ops text-yellow-500">MENENGAH</h3>
                             <div className="text-slate-400 text-sm font-mono mt-2">TINGKAT SEDANG</div>
                        </div>
                        <p className="text-slate-300 text-sm text-center">Pemahaman konsep & hubungan sebab-akibat.</p>
                        <div className="bg-yellow-900/40 py-2 text-center text-yellow-400 font-ops text-sm border border-yellow-700">
                             MULAI MISI
                        </div>
                    </button>

                    {/* HARD */}
                    <button 
                        onClick={() => onSelect(Difficulty.HARD)}
                        className="bg-slate-800 border-2 border-red-600 hover:bg-slate-700 hover:scale-105 transition-all p-6 rounded-lg group relative overflow-hidden min-h-[300px] flex flex-col justify-between"
                    >
                        <div className="absolute inset-0 bg-red-900/10 group-hover:bg-red-900/20 transition-colors"></div>
                        <div className="text-center">
                             <Brain size={48} className="mx-auto text-red-500 mb-4" />
                             <h3 className="text-2xl font-ops text-red-500">MAHIR</h3>
                             <div className="text-slate-400 text-sm font-mono mt-2">TINGKAT SULIT</div>
                        </div>
                        <p className="text-slate-300 text-sm text-center">Analisis tingkat tinggi (HOTS), refleksi & keputusan.</p>
                        <div className="bg-red-900/40 py-2 text-center text-red-400 font-ops text-sm border border-red-700">
                             MULAI MISI
                        </div>
                    </button>
                </div>
             </div>
        </div>
    );
}

const CharacterSelectScreen = ({ onSelect }: { onSelect: (charId: string) => void }) => {
    return (
        <div className="h-[100dvh] w-full bg-slate-900 flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center z-0 opacity-50 fixed" 
                style={{ backgroundImage: "url('https://iili.io/fcuctVV.jpg')" }}>
            </div>
            
            <div className="relative z-10 w-full flex flex-col items-center flex-grow overflow-y-auto p-3 pb-20">
                <h2 className="text-xl md:text-4xl font-ops text-white mb-2 mt-2 text-center shrink-0">PILIH PERAN</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 max-w-6xl w-full">
                    {CHARACTERS.map(char => (
                        <button 
                            key={char.id}
                            onClick={() => onSelect(char.id)}
                            className="bg-slate-800/90 border-2 border-slate-600 hover:border-yellow-500 hover:bg-slate-700/90 transition-all p-2 rounded-lg flex flex-col items-center group relative overflow-hidden backdrop-blur-sm min-h-[140px]"
                        >
                            <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <img 
                                src={char.image} 
                                alt={char.name} 
                                className="w-12 h-12 md:w-32 md:h-32 mb-1 md:mb-4 drop-shadow-lg filter grayscale group-hover:grayscale-0 transition-all object-contain"
                            />
                            <h3 className="text-xs md:text-xl font-ops text-yellow-500 leading-tight">{char.name}</h3>
                            <div className="text-slate-400 text-[9px] md:text-sm font-mono leading-tight">{char.role}</div>
                            <div className="mt-1 bg-black/40 px-1 py-0.5 rounded text-[8px] md:text-xs text-green-400 border border-green-900 w-full truncate">
                                PERK: {char.perk}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const MapScreen = ({ user, onLogout, onStartLevel }: { user: UserProfile, onLogout: () => void, onStartLevel: (id: number) => void }) => {
    const char = CHARACTERS.find(c => c.id === user.characterId) || CHARACTERS[0];
    const diffColor = user.difficulty === Difficulty.HARD ? 'text-red-500' : user.difficulty === Difficulty.MEDIUM ? 'text-yellow-500' : 'text-green-500';

    return (
  <div className="h-[100dvh] w-full bg-slate-900 flex flex-col overflow-hidden">
    {/* Top Bar */}
    <div className="bg-slate-950 px-3 py-2 border-b border-slate-700 flex justify-between items-center z-10 shadow-lg shrink-0 h-14">
      <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-800 border border-yellow-500 rounded overflow-hidden">
             <img src={char.image} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
              <h3 className="font-ops text-white leading-none text-xs md:text-lg">{user.username}</h3>
              <div className="flex gap-2 text-[9px] items-center">
                  <RankBadge rank={user.rank} />
                  <span className={`font-ops ${diffColor} border border-current px-1 rounded hidden md:inline-block`}>{user.difficulty}</span>
              </div>
          </div>
      </div>
      <button className="text-slate-400 hover:text-white flex items-center gap-2 text-[10px] md:text-sm" onClick={onLogout}>
           <span className="font-ops">KELUAR</span>
      </button>
    </div>

    {/* Map Content - Compact Grid */}
    <div className="flex-grow relative w-full flex flex-col min-h-0">
       <div className="absolute inset-0 bg-cover bg-center opacity-50 fixed" style={{ backgroundImage: "url('https://iili.io/fcuagyJ.jpg')" }}></div>
       
       <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col h-full overflow-y-auto p-2 scrollbar-hide">
           {/* Levels Grid - Very Compact for mobile */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 pb-20">
              {LEVEL_CONFIGS.map((level, index) => {
                  const isLocked = index > user.levelProgress;
                  const isCompleted = index < user.levelProgress;
                  const isCurrent = index === user.levelProgress;
                  
                  return (
                      <div 
                          key={level.id} 
                          className={`relative group transition-all duration-300 w-full flex flex-col ${isCurrent ? 'z-20 scale-[1.02] md:scale-105' : 'z-10'} ${isLocked ? 'opacity-80 grayscale' : 'opacity-100'}`}
                      >
                          {isCurrent && (
                            <div className="absolute -top-2 md:-top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce flex flex-col items-center pointer-events-none">
                                <div className="bg-green-600 text-white text-[8px] font-bold px-1.5 rounded mb-0.5 shadow border border-green-400 whitespace-nowrap hidden md:block">
                                    LOKASI
                                </div>
                                <MapPin className="text-green-500 fill-green-500 drop-shadow-[0_0_5px_lime]" size={16} />
                            </div>
                          )}

                          <Panel className={`flex flex-col justify-between h-full min-h-[90px] md:min-h-[180px] p-2 md:p-4 ${isCurrent ? 'border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)] bg-slate-800' : 'bg-slate-900'}`}>
                              <div className="flex justify-between items-start mb-0.5">
                                  <div className="text-[8px] md:text-xs font-mono text-slate-500">MISI 0{level.id}</div>
                                  <div className="bg-slate-900 border border-slate-600 p-0.5 md:p-1 rounded-full">
                                      {isLocked ? <Lock size={8} className="text-slate-500"/> : isCompleted ? <Star size={8} className="text-yellow-500 fill-yellow-500"/> : <Play size={8} className="text-green-500 fill-green-500 animate-pulse"/>}
                                  </div>
                              </div>
                              
                              <div className="flex-grow flex flex-col justify-center my-0.5">
                                  <h4 className="text-yellow-500 font-ops text-[10px] md:text-lg leading-none mb-0.5 line-clamp-2">{level.title}</h4>
                                  <h5 className="text-white text-[8px] md:text-xs font-bold leading-tight line-clamp-2 opacity-80">{level.subtitle}</h5>
                              </div>

                              <div className="mt-1">
                                <TacticalButton 
                                    onClick={() => { !isLocked && onStartLevel(level.id) }} 
                                    disabled={isLocked}
                                    variant={isCurrent ? 'primary' : 'secondary'}
                                    className="w-full text-[8px] md:text-xs py-1 md:py-1.5 px-1 md:px-2"
                                >
                                    {isLocked ? 'TERKUNCI' : 'MULAI'}
                                </TacticalButton>
                              </div>
                          </Panel>
                      </div>
                  );
              })}
           </div>
       </div>
    </div>
  </div>
    );
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const increment = Math.random() * 5 + 1; // Random increment
                if (prev % 10 < 5) sfx.playTone(800 + prev * 5, 'square', 0.05, 0.05);
                return Math.min(100, prev + increment);
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            sfx.playTone(1500, 'sine', 0.5, 0.2); // Complete sound
            setTimeout(onComplete, 500);
        }
    }, [progress, onComplete]);

    return (
        <div className="h-[100dvh] w-full bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
             <div className="absolute inset-0 bg-cover bg-center z-0 opacity-50" 
                  style={{ backgroundImage: "url('https://iili.io/fcuaBXp.jpg')" }}>
             </div>
             <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[length:30px_30px] z-10"></div>
             
             <div className="w-full max-w-lg z-20">
                 <div className="flex justify-between items-end mb-2">
                     <span className="text-green-500 font-mono animate-pulse">ESTABLISHING UPLINK...</span>
                     <span className="text-green-500 font-ops text-4xl">{Math.floor(progress)}%</span>
                 </div>
                 <div className="h-4 bg-slate-900 border border-slate-700 w-full rounded-sm overflow-hidden p-0.5">
                     <div 
                        className="h-full bg-green-500 transition-all duration-100 ease-linear shadow-[0_0_15px_lime]"
                        style={{ width: `${progress}%` }}
                     ></div>
                 </div>
                 <div className="mt-4 flex gap-4 text-xs font-mono text-slate-500">
                     <div className="flex items-center gap-2">
                         <Loader2 className="animate-spin" size={12}/>
                         LOADING ASSETS
                     </div>
                 </div>
             </div>
        </div>
    );
};

const LevelIntroScreen = ({ levelId, user, onStart }: { levelId: number, user: UserProfile, onStart: () => void }) => {
  const level = LEVEL_CONFIGS.find(l => l.id === levelId);
  const char = CHARACTERS.find(c => c.id === user.characterId) || CHARACTERS[0];
  
  if (!level) return null;

  return (
      <div className="h-[100dvh] w-full flex items-center justify-center relative overflow-hidden bg-black">
           <div 
             className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform hover:scale-105 opacity-55"
             style={{ backgroundImage: `url('${level.image}')` }}
           >
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent"></div>
           </div>

           <div className="absolute top-24 right-4 md:right-10 z-10 hidden md:block animate-in fade-in zoom-in duration-700">
              <img 
                src={char.image} 
                alt="Character" 
                className="h-[30vh] w-auto object-contain drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] filter brightness-110 contrast-125 opacity-90"
              />
           </div>

           <div className="relative z-20 max-w-2xl w-full p-6 md:ml-20 md:mr-auto">
              <div className="mb-4 flex items-center gap-2">
                 <Target className="text-red-500 animate-pulse" />
                 <span className="text-red-500 font-mono tracking-[0.2em] text-sm">MISSION BRIEFING // LEVEL 0{levelId}</span>
              </div>
              
              <h1 className="text-4xl md:text-8xl font-ops text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 drop-shadow-sm leading-none mb-2">
                {level.title}
              </h1>
              <h2 className="text-xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wider pl-1 border-l-4 border-white">
                {level.subtitle}
              </h2>
              
              <div className="bg-slate-900/70 border border-slate-600 backdrop-blur-md p-6 rounded-r-2xl rounded-bl-2xl relative mb-8 clip-diagonal shadow-2xl">
                 <div className="absolute -top-2 left-0 w-10 h-1 bg-yellow-500"></div>
                 <TypewriterText text={level.description} className="text-green-400 font-bold text-lg md:text-xl leading-relaxed font-mono drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                 
                 <div className="mt-4 flex gap-4 text-xs font-mono text-slate-400">
                    <span className="bg-black/40 px-2 py-1 rounded border border-slate-700">TARGET: {level.maxScore} PTS</span>
                    <span className="bg-black/40 px-2 py-1 rounded border border-slate-700">INTEL: CLASSIFIED</span>
                 </div>
              </div>
              
              <div className="flex gap-4 items-center">
                 <TacticalButton onClick={() => { sfx.click(); onStart(); }} className="px-8 md:px-12 py-3 md:py-4 text-lg md:text-xl bg-yellow-600 hover:bg-yellow-500 text-black shadow-[0_0_30px_rgba(234,179,8,0.4)]">
                    DEPLOY NOW
                 </TacticalButton>
                 <div className="h-px flex-grow bg-slate-700 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                 </div>
              </div>
           </div>
           
           <div className="absolute bottom-10 left-10 flex gap-2 opacity-50">
               <Crosshair className="text-white" />
               <div className="h-20 w-px bg-white/30"></div>
               <div className="text-[10px] font-mono text-slate-400 writing-vertical-lr">
                   COORDINATES: {Math.random().toFixed(4)} N, {Math.random().toFixed(4)} E
               </div>
           </div>
      </div>
  );
};

const GameplayScreen = ({ levelId, user, onAbort, onComplete }: { levelId: number, user: UserProfile, onAbort: () => void, onComplete: (score: number, remainingHp: number) => void }) => {
  const [hp, setHp] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);
  const [randomizedData, setRandomizedData] = useState<Question[]>([]);
  const [sessionMistakes, setSessionMistakes] = useState<{question: string, correct: string}[]>([]);

  useEffect(() => {
    const rawData = GAME_DATA[user.difficulty][levelId] || [];
    const shuffledQuestions = [...rawData].sort(() => Math.random() - 0.5);
    const fullyRandomized = shuffledQuestions.map(q => {
        const correctText = q.options[q.correctIndex];
        const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
        const newCorrectIndex = shuffledOptions.indexOf(correctText);
        return {
            ...q,
            options: shuffledOptions,
            correctIndex: newCorrectIndex
        };
    });
    setRandomizedData(fullyRandomized);
  }, [levelId, user.difficulty]);

  const handleDamage = (mistake: { question: string, correct: string }) => {
      setSessionMistakes(prev => [...prev, mistake]);
      setHp(prev => {
          const newHp = Math.max(0, prev - 20); 
          if (newHp === 0) {
              sfx.stopBGM();
              setIsGameOver(true);
          }
          return newHp;
      });
  };

  const handleLevelComplete = (finalScore: number) => {
      sfx.stopBGM();
      onComplete(finalScore + (hp * 2), hp);
  };

  if (isGameOver) {
      return (
          <div className="h-[100dvh] w-full bg-red-950 flex items-center justify-center p-4">
              <Panel className="text-center border-red-500 w-full max-w-2xl max-h-[90vh] flex flex-col">
                  <div className="flex-shrink-0">
                      <Skull size={60} className="mx-auto text-red-500 mb-2 animate-pulse" />
                      <h2 className="text-4xl font-ops text-white mb-2">MISI GAGAL</h2>
                      <p className="text-red-300 mb-4 text-sm font-mono tracking-wide">KESEHATAN HABIS. SEJARAH TERTUTUP.</p>
                  </div>
                  <div className="flex-grow overflow-hidden bg-black/50 border border-red-900 rounded p-4 mb-6 flex flex-col">
                      <div className="flex items-center gap-2 mb-3 border-b border-red-800 pb-2">
                          <ScrollText className="text-red-400" size={16} />
                          <h3 className="text-red-400 font-ops text-lg">ANALISA KEGAGALAN</h3>
                      </div>
                      <div className="overflow-y-auto pr-2 space-y-3 flex-grow text-left custom-scrollbar">
                          {sessionMistakes.length > 0 ? (
                              sessionMistakes.map((m, idx) => (
                                  <div key={idx} className="bg-red-950/30 p-2 rounded border-l-2 border-red-600">
                                      <p className="text-slate-300 text-xs md:text-sm font-bold mb-1">Q: {m.question}</p>
                                      <p className="text-green-400 text-xs font-mono">A: {m.correct}</p>
                                  </div>
                              ))
                          ) : (
                              <p className="text-slate-500 text-center italic text-xs">Data tidak tersedia...</p>
                          )}
                      </div>
                  </div>
                  <div className="flex-shrink-0">
                      <TacticalButton variant="danger" onClick={onAbort} className="w-full">
                          KEMBALI KE MARKAS
                      </TacticalButton>
                  </div>
              </Panel>
          </div>
      );
  }

  return (
      <div className="h-[100dvh] w-full relative flex flex-col overflow-hidden bg-slate-950">
          <div 
             className="absolute inset-0 bg-cover bg-center transition-all duration-1000 opacity-45"
             style={{ 
                 backgroundImage: "url('https://iili.io/fcudHle.jpg')" 
             }}
          ></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="bg-slate-950/80 p-3 border-b border-slate-700 flex justify-between items-center shadow-lg backdrop-blur-md h-14 shrink-0">
                <button onClick={() => { sfx.stopBGM(); onAbort(); }} className="flex items-center text-slate-400 hover:text-white transition-colors">
                    <ChevronLeft /> BATAL
                </button>
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <HealthBar hp={hp} maxHp={100} />
                </div>
                <div className="w-20"></div> 
            </div>
            
            <div className="flex-grow p-2 md:p-8 overflow-hidden relative">
                {randomizedData.length > 0 && (
                    <UniversalLevelEngine 
                        data={randomizedData} 
                        user={user} 
                        levelId={levelId}
                        onComplete={handleLevelComplete} 
                        onDamage={handleDamage} 
                    />
                )}
            </div>
          </div>
      </div>
  );
};

const EvaluationScreen = ({ score, isPerfect, onContinue, onRetry }: { score: number, isPerfect: boolean, onContinue: () => void, onRetry: () => void }) => {
  const stars = score > 1000 ? 3 : score > 500 ? 2 : 1;
  useEffect(() => {
      if (score > 500) sfx.win();
  }, [score]);

  return (
    <div className="h-[100dvh] w-full bg-slate-900 flex items-center justify-center p-4">
        <Panel className="max-w-md w-full text-center py-10 relative overflow-visible">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                 <Award size={80} className={`text-yellow-500 fill-yellow-500 drop-shadow-[0_0_20px_rgba(234,179,8,0.8)] ${!isPerfect && 'grayscale opacity-50'}`} />
            </div>
            <h2 className="text-4xl font-ops text-white mt-8 mb-2">
                {isPerfect ? "MISI SEMPURNA" : "MISI SELESAI"}
            </h2>
            <div className="text-7xl font-ops text-yellow-400 mb-6 tracking-tighter drop-shadow-md">
                {score} <span className="text-2xl text-slate-500">PTS</span>
            </div>
            <div className="flex justify-center gap-4 mb-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className={`transform transition-all duration-500 ${i <= stars ? 'scale-110' : 'opacity-30'}`}>
                        <Star size={40} className={`${i <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700'}`} />
                    </div>
                ))}
            </div>
            <div className="space-y-3">
                <TacticalButton onClick={onContinue} className="w-full">
                    LANJUT
                </TacticalButton>
                <TacticalButton onClick={onRetry} variant="secondary" className="w-full">
                    ULANGI MISI
                </TacticalButton>
            </div>
        </Panel>
    </div>
  );
};

const RewardScreen = ({ user, onReturn, onRestart }: { user: UserProfile, onReturn: () => void, onRestart: () => void }) => {
    const char = CHARACTERS.find(c => c.id === user.characterId) || CHARACTERS[0];
    let title = "PENJAGA ILMU";
    let desc = "Anda telah menyelesaikan perjalanan, namun masih banyak ilmu yang perlu digali.";
    
    if (user.score > 6000) {
        title = "ULAMA MUDA";
        desc = "Luar biasa! Pengetahuan Anda tentang ayat ini sangat mendalam. Teruslah mengamalkannya.";
    } else if (user.score > 4000) {
        title = "SANTRI TELADAN";
        desc = "Hebat! Anda memahami adab dan ilmu dengan baik.";
    } else {
        title = "PEMBELAJAR SEJATI";
        desc = "Bagus! Anda memahami pentingnya ilmu dalam mengangkat derajat manusia.";
    }

    return (
  <div className="h-[100dvh] w-full bg-gradient-to-b from-yellow-900 via-slate-900 to-black flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-black/80 border-4 border-yellow-500 p-8 md:p-12 text-center relative clip-diagonal shadow-[0_0_50px_rgba(234,179,8,0.3)]">
          <h1 className="text-5xl md:text-7xl font-ops text-yellow-500 mb-4 tracking-wider drop-shadow-[0_5px_0px_#854d0e] animate-bounce">
              MISI TUNTAS!
          </h1>
          <div className="flex flex-col items-center justify-center mb-6">
              <ScrollText size={60} className="text-white mb-2" />
              <h2 className="text-3xl text-white font-ops tracking-widest text-center uppercase text-green-400">{title}</h2>
          </div>
          <div className="bg-slate-800/80 p-8 border border-yellow-600/30 mb-8 rounded-lg backdrop-blur mx-auto max-w-2xl transform rotate-1 hover:rotate-0 transition-transform">
              <p className="text-slate-300 italic text-xl mb-6 font-serif leading-relaxed">
                  "{desc}"
              </p>
              <div className="w-full h-px bg-yellow-500/50 mb-6"></div>
              <div className="grid grid-cols-2 gap-8 text-left items-center">
                  <div className="flex flex-col items-center">
                      <img src={char.image} alt="Avatar" className="w-24 h-24 rounded border-2 border-yellow-500 mb-2" />
                      <div className="text-xl text-white font-ops">{user.username}</div>
                  </div>
                  <div className="text-right">
                       <div className="text-xs text-slate-500 font-ops">TOTAL SKOR AKHIR</div>
                       <div className="text-5xl text-yellow-400 font-ops">{user.score}</div>
                  </div>
              </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <TacticalButton onClick={onRestart} className="px-8 py-3 text-lg border-green-500 bg-slate-800 hover:bg-slate-700 text-white" variant="secondary">
               <RefreshCw size={20} className="inline mr-2" />
               ULANGI OPERASI
            </TacticalButton>
            <TacticalButton onClick={onReturn} className="px-8 py-3 text-lg">
               KEMBALI KE LOBI
            </TacticalButton>
          </div>
      </div>
  </div>
    );
};

const App = () => {
  const [screen, setScreen] = useState<ScreenState>(ScreenState.TITLE);
  const [user, setUser] = useState<UserProfile>({
    username: 'Pelajar',
    rank: 'Pemula',
    score: 0,
    levelProgress: 0,
    characterId: 'c1',
    difficulty: Difficulty.EASY // Default
  });
  const [currentLevelId, setCurrentLevelId] = useState<number>(0);
  const [tempScore, setTempScore] = useState(0);
  const [isLastRunPerfect, setIsLastRunPerfect] = useState(false);

  const login = (name: string) => {
    setUser({ ...user, username: name || 'Pelajar' });
    setScreen(ScreenState.DIFFICULTY_SELECT); 
  };
  const selectDifficulty = (diff: Difficulty) => {
      setUser({ ...user, difficulty: diff });
      setScreen(ScreenState.CHARACTER_SELECT);
  };
  const selectCharacter = (charId: string) => {
      setUser({ ...user, characterId: charId });
      setScreen(ScreenState.MAP);
  };
  const startLevel = (levelId: number) => {
    setCurrentLevelId(levelId);
    setScreen(ScreenState.LEVEL_INTRO);
  };
  const startLoading = () => {
    setScreen(ScreenState.LOADING);
  };
  const beginGameplay = () => {
    sfx.playBGM();
    setScreen(ScreenState.GAMEPLAY);
  };
  const finishLevel = (score: number, remainingHp: number) => {
    setTempScore(score);
    const perfectRun = remainingHp === 100;
    setIsLastRunPerfect(perfectRun);
    setScreen(ScreenState.EVALUATION);
    const nextProgress = Math.max(user.levelProgress, currentLevelId);
    let newRank = user.rank;
    if (nextProgress >= 2) newRank = "Penjelajah";
    if (nextProgress >= 4) newRank = "Cendekiawan";
    if (nextProgress >= 6) newRank = "Master";
    if (nextProgress === 7) newRank = "Legenda";
    setUser(prev => ({
        ...prev,
        score: prev.score + score,
        levelProgress: nextProgress,
        rank: newRank
    }));
  };
  const handleReturnFromEvaluation = () => {
    if (currentLevelId === 7) {
      setScreen(ScreenState.REWARD);
      confetti({
        particleCount: 300,
        spread: 120,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FCD34D', '#10B981']
      });
      sfx.win(); 
    } else {
      setScreen(ScreenState.MAP);
    }
  };
  const handleRetryLevel = () => {
      startLoading();
  }
  const restartGame = () => {
      setUser(prev => ({
          ...prev,
          lastScore: prev.score,
          score: 0,
          levelProgress: 0,
          rank: 'Pemula'
      }));
      setScreen(ScreenState.MAP);
  };
  const logout = () => {
      sfx.stopBGM();
      setScreen(ScreenState.TITLE);
  };

  switch (screen) {
    case ScreenState.TITLE: return <TitleScreen onStart={() => setScreen(ScreenState.LOGIN)} />;
    case ScreenState.LOGIN: return <LoginScreen onLogin={login} />;
    case ScreenState.DIFFICULTY_SELECT: return <DifficultySelectScreen onSelect={selectDifficulty} />;
    case ScreenState.CHARACTER_SELECT: return <CharacterSelectScreen onSelect={selectCharacter} />;
    case ScreenState.MAP: return <MapScreen user={user} onLogout={logout} onStartLevel={startLevel} />;
    case ScreenState.LEVEL_INTRO: return <LevelIntroScreen levelId={currentLevelId} user={user} onStart={startLoading} />;
    case ScreenState.LOADING: return <LoadingScreen onComplete={beginGameplay} />;
    case ScreenState.GAMEPLAY: return <GameplayScreen levelId={currentLevelId} user={user} onAbort={() => setScreen(ScreenState.MAP)} onComplete={finishLevel} />;
    case ScreenState.EVALUATION: return <EvaluationScreen score={tempScore} isPerfect={isLastRunPerfect} onContinue={handleReturnFromEvaluation} onRetry={handleRetryLevel} />;
    case ScreenState.REWARD: return <RewardScreen user={user} onReturn={() => setScreen(ScreenState.MAP)} onRestart={restartGame} />;
    default: return <TitleScreen onStart={() => setScreen(ScreenState.LOGIN)} />;
  }
};

export default App;
