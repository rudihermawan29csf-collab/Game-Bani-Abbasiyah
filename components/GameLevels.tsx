
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Question, UserProfile, LevelType } from '../types';
import { WeaponOverlay } from './UI';
import { sfx } from '../audio';
import { 
  CheckCircle2, XCircle, Timer as TimerIcon, 
  Zap, Crosshair, Skull, Disc, Target, Move
} from 'lucide-react';

const TopHUD = ({ user, score, timeLeft }: { user: UserProfile, score: number, timeLeft: number }) => (
    <div className="absolute top-0 left-0 right-0 z-40 flex justify-between items-start pointer-events-none pt-safe px-2 md:px-4 mt-2">
        <div className="bg-black/85 border-l-2 md:border-l-4 border-lime-500 p-1.5 md:p-3 backdrop-blur-md shadow-[0_0_15px_rgba(132,204,22,0.3)] clip-diagonal-right">
            <div className="text-[7px] md:text-[10px] text-slate-500 font-mono flex items-center gap-2">
                <span className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></span>
                AGENT_{user.username.toUpperCase().substring(0,8)}
            </div>
            <div className="text-sm md:text-3xl font-ops text-lime-400 tracking-widest">{score.toString().padStart(6, '0')}</div>
        </div>
        <div className={`bg-black/85 border-r-2 md:border-r-4 ${timeLeft < 10 ? 'border-red-500 animate-pulse' : 'border-cyan-500'} p-1.5 md:p-3 backdrop-blur-md text-right shadow-[0_0_15px_rgba(6,182,212,0.3)] clip-diagonal-left`}>
            <div className="text-[7px] md:text-[10px] text-slate-500 font-mono flex items-center justify-end gap-1">
                <TimerIcon size={8} /> TIME
            </div>
            <div className={`text-sm md:text-3xl font-ops ${timeLeft < 10 ? 'text-red-500' : 'text-cyan-400'} font-mono`}>00:{timeLeft.toString().padStart(2, '0')}</div>
        </div>
    </div>
);

// --- RESTORED 3D ASSET: SKULL ENEMY ---
const SkullEnemy = ({ isActive, isCorrect, isWrong, tilt }: { isActive: boolean, isCorrect: boolean, isWrong: boolean, tilt: number }) => {
    const themeColor = isCorrect ? 'text-green-400' : isWrong ? 'text-red-500' : 'text-lime-400';
    const borderColor = isCorrect ? 'border-green-400' : isWrong ? 'border-red-500' : 'border-lime-500';
    const glowColor = isCorrect ? 'shadow-[0_0_30px_rgba(74,222,128,0.8)]' : isWrong ? 'shadow-[0_0_30px_rgba(239,68,68,0.8)]' : 'shadow-[0_0_20px_rgba(163,230,53,0.6)]';

    return (
        <div className="relative flex flex-col items-center justify-center transition-all duration-300 transform-gpu"
             style={{ 
                transform: `rotateY(${tilt}deg) rotateX(${tilt/2}deg)`,
                perspective: '800px',
                transformStyle: 'preserve-3d'
             }}>
            {/* Energy Aura */}
            <div className={`absolute -z-20 w-16 h-16 md:w-24 md:h-24 rounded-full blur-2xl animate-pulse transition-colors duration-500 ${isCorrect ? 'bg-green-500/40' : isWrong ? 'bg-red-500/40' : 'bg-lime-500/20'}`}></div>
            
            {/* Tech Wings */}
            <div className="absolute -z-10 flex gap-6 md:gap-10 opacity-90 transition-transform duration-500" style={{ transform: 'translateZ(-10px)' }}>
                <div className={`w-8 h-12 md:w-12 md:h-20 bg-slate-900/80 clip-wing-left transform -rotate-12 border-l-2 ${borderColor} ${glowColor}`}></div>
                <div className={`w-8 h-12 md:w-12 md:h-20 bg-slate-900/80 clip-wing-right transform rotate-12 border-r-2 ${borderColor} ${glowColor}`}></div>
            </div>

            {/* Rotating Shield Ring */}
            <div className={`absolute -inset-4 border border-dashed rounded-full ${borderColor} opacity-40 animate-[spin_4s_linear_infinite]`} style={{ transform: 'translateZ(10px)' }}></div>

            {/* Main Body */}
            <div className={`relative w-16 h-16 md:w-24 md:h-24 bg-gradient-to-b from-slate-800 to-black border-2 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 ${borderColor} ${glowColor}`} 
                 style={{ transform: 'translateZ(20px)' }}>
                
                {/* Face/Icon */}
                {isCorrect ? (
                    <CheckCircle2 className="text-green-400 animate-bounce w-10 h-10 md:w-14 md:h-14 drop-shadow-[0_0_10px_currentColor]" />
                ) : isWrong ? (
                    <XCircle className="text-red-500 animate-pulse w-10 h-10 md:w-14 md:h-14 drop-shadow-[0_0_10px_currentColor]" />
                ) : (
                    <div className="relative group-hover:scale-110 transition-transform">
                        <Skull className={`${themeColor} w-8 h-8 md:w-12 md:h-12 opacity-80`} strokeWidth={1.5} />
                        <div className="absolute top-0 left-0 w-full h-full animate-ping opacity-20 bg-lime-400 rounded-full"></div>
                    </div>
                )}
                
                {/* Health/Status Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 md:h-2 bg-slate-900">
                    <div className={`h-full ${isCorrect ? 'bg-green-500' : isWrong ? 'bg-red-500' : 'bg-lime-500'} w-[80%]`}></div>
                </div>
            </div>
        </div>
    );
};

// --- FLOATING TEXT COMPONENT ---
const FloatingText = ({ items }: { items: { id: number, x: number, y: number, text: string }[] }) => {
    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {items.map(item => (
                <div 
                    key={item.id}
                    className="absolute text-yellow-400 font-ops text-4xl md:text-6xl font-bold animate-float-up text-shadow-glow"
                    style={{ left: item.x, top: item.y }}
                >
                    {item.text}
                </div>
            ))}
            <style>{`
                @keyframes floatUp {
                    0% { transform: translate(-50%, 0) scale(0.5); opacity: 0; }
                    20% { transform: translate(-50%, -20px) scale(1.2); opacity: 1; }
                    100% { transform: translate(-50%, -100px) scale(1); opacity: 0; }
                }
                .animate-float-up {
                    animation: floatUp 1s ease-out forwards;
                }
                .text-shadow-glow {
                    text-shadow: 0 0 10px rgba(250, 204, 21, 0.8), 0 0 20px rgba(250, 204, 21, 0.5);
                }
            `}</style>
        </div>
    );
};

// --- VERSE ASSEMBLER COMPONENT ---
const VerseAssembler = ({ question, onComplete }: { question: Question, onComplete: (score: number) => void }) => {
    const [scrambled, setScrambled] = useState<string[]>([]);
    const [assembled, setAssembled] = useState<string[]>([]);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        const parts = [...question.options].sort(() => Math.random() - 0.5);
        setScrambled(parts);
        setAssembled([]);
        setTimeLeft(60);
    }, [question]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) { clearInterval(timer); checkAnswer(true); return 0; }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [assembled]);

    const handleSelect = (part: string) => {
        setAssembled([...assembled, part]);
        setScrambled(scrambled.filter(s => s !== part));
        sfx.click();
    };

    const handleDeselect = (part: string) => {
        setScrambled([...scrambled, part]);
        setAssembled(assembled.filter(s => s !== part));
        sfx.click();
    };

    const checkAnswer = (timeout = false) => {
        setIsChecking(true);
        const isCorrect = assembled.join('') === question.options.join('');
        // Fixed score: 20 points per question logic (scaled for single assembler game if needed, keeping 100 for assembler for now or 20)
        // Since Assembler is usually a single "level", let's make it 100 to pass immediately if correct.
        const score = isCorrect ? 100 : 0; 
        
        if (isCorrect) sfx.win();
        else sfx.error();

        setTimeout(() => {
            onComplete(score);
        }, 2000);
    };

    useEffect(() => {
        if (scrambled.length === 0 && assembled.length > 0 && !isChecking) {
            checkAnswer();
        }
    }, [scrambled, assembled]);

    return (
        <div className="flex flex-col items-center justify-start pt-20 md:pt-24 w-full h-full p-2 md:p-4 relative z-50">
            <div className="absolute top-20 right-4 md:right-10 text-cyan-400 font-ops text-xl md:text-2xl border border-cyan-500/30 px-3 py-1 bg-black/50 backdrop-blur rounded flex items-center gap-2">
                <TimerIcon size={16} /> {timeLeft}s
            </div>
            
            <h2 className="text-xl md:text-4xl font-ops text-yellow-500 mb-2 text-center uppercase drop-shadow-[0_0_10px_rgba(234,179,8,0.5)] tracking-widest mt-6">
                SUSUN AYAT
            </h2>
            <p className="text-slate-400 font-mono mb-4 text-xs md:text-base text-center">Urutkan potongan ayat dengan benar.</p>

            {/* DROP ZONE */}
            <div className="w-full max-w-5xl min-h-[100px] bg-slate-900/80 border-2 border-dashed border-slate-600 rounded-xl p-4 flex flex-wrap gap-2 justify-center items-center mb-6 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] backdrop-blur transition-all">
                {assembled.map((part, idx) => (
                    <button key={idx} onClick={() => !isChecking && handleDeselect(part)} className="relative bg-gradient-to-b from-yellow-600 to-yellow-800 text-white font-serif text-base md:text-3xl px-3 py-2 md:px-6 md:py-3 rounded shadow-lg hover:scale-105 transition-transform animate-in zoom-in duration-300 border border-yellow-400/50 flex items-center gap-2">
                        <Move size={12} className="opacity-50" /> {part}
                    </button>
                ))}
                {assembled.length === 0 && (
                    <div className="flex flex-col items-center text-slate-500 animate-pulse">
                        <Target size={30} className="mb-2 opacity-30" />
                        <span className="italic font-mono tracking-widest text-xs">TAP FRAGMEN DI BAWAH...</span>
                    </div>
                )}
            </div>

            {/* SOURCE ZONE */}
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center max-w-5xl">
                {scrambled.map((part, idx) => (
                    <button key={idx} onClick={() => !isChecking && handleSelect(part)} className="bg-slate-800 border-2 border-slate-600 text-cyan-400 font-serif text-base md:text-3xl px-3 py-2 md:px-6 md:py-3 rounded shadow hover:bg-slate-700 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_15px_cyan] transition-all active:scale-95">
                        {part}
                    </button>
                ))}
            </div>

            {isChecking && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
                    <div className="text-center p-8 border-4 border-white bg-black">
                        <div className="text-4xl md:text-7xl font-ops uppercase mb-4 animate-bounce drop-shadow-[0_0_20px_currentColor]">
                            {assembled.join('') === question.options.join('') ? <span className="text-green-500">AYAT SEMPURNA</span> : <span className="text-red-500">URUTAN SALAH</span>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const UniversalLevelEngine = ({ data, user, levelId, levelType, onComplete, onDamage }: any) => {
  const [qIndex, setQIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [floatingScores, setFloatingScores] = useState<{id: number, x: number, y: number, text: string}[]>([]);
  
  // RAPID FIRE STATES
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  
  // Mouse Parallax State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const currentQ = data[qIndex];
  const timerRef = useRef<any>(null);

  // Parallax Effect Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        setMousePos({
            x: (e.clientX / window.innerWidth - 0.5) * 15, 
            y: (e.clientY / window.innerHeight - 0.5) * 15
        });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const layouts = useMemo(() => {
    if (!currentQ?.options) return [];
    return currentQ.options.map((_: any, i: number) => {
        if (levelType === LevelType.VOCAB_MATCH) {
             return { x: 50, y: 35 + (i * 12), delay: i * 50 }; 
        }
        // Classic "Enemy" layout - Adjusted for Mobile Viewport to prevent overflow
        const col = i % 2;
        const row = Math.floor(i / 2);
        
        // Spread logic: If col 0 -> 25%, if col 1 -> 75%
        // Add randomness but constrain it
        const baseX = col === 0 ? 25 : 75;
        const randomX = (Math.random() * 10 - 5);
        
        // Y Position needs to be lower to clear the text box
        const baseY = row === 0 ? 45 : 65; // row 0 at 45%, row 1 at 65%
        const randomY = (Math.random() * 8 - 4);

        return {
            x: Math.max(15, Math.min(85, baseX + randomX)), // Clamp between 15% and 85%
            y: baseY + randomY,
            delay: i * 100 
        };
    });
  }, [qIndex, levelType, currentQ]);

  useEffect(() => {
    if (levelType === LevelType.VERSE_ASSEMBLE) return;

    setTimeLeft(30);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
        setTimeLeft(p => {
            if (p <= 1) { handleAnswer(-1); return 0; }
            return p - 1;
        });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [qIndex, levelType]);

  const handleLevelComplete = (addedScore: number) => {
      // NOTE: This function is deprecated for internal logic, logic moved to handleAnswer timeout
      // But keeping it for VerseAssembler callback
      const finalScore = totalScore + addedScore;
      onComplete(finalScore);
  };

  const handleGlobalClick = (e: React.MouseEvent) => {
      if (levelType !== LevelType.RAPID_FIRE) return;
      if (isTransitioning) return;

      // Visual firing effect for background clicks (misses/just shooting)
      // This makes the game feel responsive even when not clicking an option
      window.dispatchEvent(new CustomEvent('weapon-fire', { 
          detail: { x: e.clientX, y: e.clientY } 
      }));
  };

  const handleAnswer = (idx: number, e?: React.MouseEvent) => {
    if (e) {
        e.stopPropagation(); // Prevent the global background click handler from firing double shots
    }
    
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSelectedIndex(idx);
    clearInterval(timerRef.current);
    
    // FIRE WEAPON EVENT WITH COORDINATES
    let clickX = window.innerWidth / 2;
    let clickY = window.innerHeight / 2;

    if (levelType === LevelType.RAPID_FIRE) {
        if (e) {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            clickX = rect.left + rect.width / 2;
            clickY = rect.top + rect.height / 2;
            window.dispatchEvent(new CustomEvent('weapon-fire', { detail: { x: clickX, y: clickY } }));
        } else {
            // Fallback if no event (e.g. timeout)
            window.dispatchEvent(new CustomEvent('weapon-fire', { detail: { x: clickX, y: clickY } }));
        }
    }
    
    const isCorrect = idx === currentQ.correctIndex;
    let scoreGain = 0;

    if (isCorrect) {
        sfx.hit();
        // FIXED SCORE: 20 points per question
        scoreGain = 20;
        
        // Trigger Floating Text
        const newFloat = { id: Date.now(), x: clickX, y: clickY, text: "+20" };
        setFloatingScores(prev => [...prev, newFloat]);
        setTimeout(() => {
             setFloatingScores(prev => prev.filter(f => f.id !== newFloat.id));
        }, 1000);

    } else {
        sfx.error();
        onDamage({ question: currentQ.text, correct: currentQ.options[currentQ.correctIndex] });
    }

    // UPDATE SCORE STATE IMMEDIATELY FOR UI
    // We calculate the *next* total score here to avoid stale state in the timeout
    const updatedTotalScore = totalScore + scoreGain;
    setTotalScore(updatedTotalScore);

    setTimeout(() => {
        setIsTransitioning(false);
        setSelectedIndex(null);
        
        if (qIndex < data.length - 1) {
            setQIndex(prev => prev + 1);
        } else {
            // PASS THE CALCULATED SCORE DIRECTLY TO AVOID STALE STATE
            onComplete(updatedTotalScore); 
        }
    }, 1200);
  };

  if (levelType === LevelType.VERSE_ASSEMBLE) {
      return (
          <>
            <TopHUD user={user} score={totalScore} timeLeft={0} />
            <VerseAssembler question={currentQ} onComplete={handleLevelComplete} />
          </>
      );
  }

  return (
    <div 
        className="relative w-full h-full flex flex-col overflow-hidden perspective-container cursor-crosshair"
        onClick={handleGlobalClick}
    >
        {levelType === LevelType.RAPID_FIRE && <WeaponOverlay />}
        <TopHUD user={user} score={totalScore} timeLeft={timeLeft} />
        <FloatingText items={floatingScores} />

        {/* COMPACT TACTICAL QUESTION PANEL - MOVED TO TOP */}
        <div className="absolute top-16 md:top-24 left-0 right-0 z-40 px-2 flex flex-col items-center pointer-events-none mt-2">
            <div className="w-full max-w-3xl bg-slate-950/95 border-b-2 border-lime-600 p-2 md:p-4 relative shadow-[0_5px_20px_rgba(0,0,0,0.9)] pointer-events-auto clip-diagonal-bottom">
                
                <div className="flex flex-row gap-4 items-center">
                    <div className="hidden md:flex flex-col items-center justify-center p-2 border border-slate-700 bg-slate-900 w-16 h-16 shrink-0">
                        <Zap className="text-lime-500 animate-pulse mb-1" size={20} />
                        <div className="text-[8px] font-mono text-lime-600 uppercase text-center leading-none">DATA<br/>STREAM</div>
                    </div>

                    <div className="flex-grow w-full text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                             <span className="bg-lime-600 text-black px-1.5 py-0.5 text-[8px] md:text-[9px] font-bold uppercase rounded-sm">PRIORITY: HIGH</span>
                             <span className="text-[8px] md:text-[9px] font-mono text-slate-500">PKT {qIndex + 1}/{data.length}</span>
                        </div>
                        <h2 className="text-sm md:text-xl font-bold text-white leading-snug font-sans tracking-wide">
                            {currentQ.text}
                        </h2>
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex gap-0.5 mt-2">
                    {data.map((_: any, i: number) => (
                        <div key={i} className={`h-1 flex-grow transition-all ${i <= qIndex ? 'bg-lime-500 shadow-[0_0_5px_lime]' : 'bg-slate-800'}`}></div>
                    ))}
                </div>
            </div>
        </div>

        {/* BATTLEFIELD - ENEMIES / ANSWERS */}
        <div className="absolute inset-0 z-20 pointer-events-none" style={{ perspective: '1000px' }}>
            {currentQ.options.map((opt: string, idx: number) => {
                const layout = layouts[idx];
                const isSelected = selectedIndex === idx;
                const isCorrect = idx === currentQ.correctIndex;
                const reveal = isTransitioning;
                
                // Opacity logic
                const opacity = reveal && !isSelected && !isCorrect ? 0 : 1;

                return (
                    <div key={idx} 
                         className="absolute pointer-events-auto w-40 -ml-20 md:w-auto md:ml-0 transition-all duration-500 ease-out"
                         style={{ 
                            left: `${layout.x}%`, 
                            top: `${layout.y}%`,
                            opacity: opacity,
                            transform: `translateZ(0px)`,
                            animation: !reveal ? `float 6s ease-in-out infinite ${layout.delay}ms` : 'none'
                         }}>
                        
                        <div className="flex flex-col items-center group cursor-pointer" onClick={(e) => { sfx.click(); handleAnswer(idx, e); }}>
                             
                             {levelType === LevelType.VOCAB_MATCH ? (
                                /* VOCAB MATCH STYLE */
                                <div className={`relative w-full max-w-lg p-2 md:p-4 border-l-4 md:border-l-8 backdrop-blur-md transition-all duration-300 shadow-xl
                                    ${!reveal ? 'bg-slate-900/90 border-cyan-500 hover:scale-105' : ''}
                                    ${reveal && isCorrect ? 'bg-green-900/90 border-green-400 scale-110' : ''}
                                    ${reveal && isSelected && !isCorrect ? 'bg-red-900/90 border-red-500 scale-95 animate-shake' : ''}
                                `}>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-black/50 p-1 md:p-2 rounded border border-white/20 font-bold font-mono text-sm md:text-xl">{String.fromCharCode(65+idx)}</div>
                                        <div className="text-white font-serif text-sm md:text-2xl italic">{opt}</div>
                                        {reveal && isCorrect && <CheckCircle2 className="ml-auto text-green-400" size={24}/>}
                                        {reveal && isSelected && !isCorrect && <XCircle className="ml-auto text-red-500" size={24}/>}
                                    </div>
                                </div>
                             ) : (
                                /* CLASSIC TACTICAL ENEMY STYLE */
                                <>
                                    <div className={`
                                        mb-4 px-2 py-1 md:px-4 md:py-2 transition-all duration-300 relative
                                        bg-black/80 border-l-2 md:border-l-4 backdrop-blur-sm shadow-lg
                                        ${!reveal ? 'border-lime-500 group-hover:bg-lime-900/40 group-hover:scale-105' : ''}
                                        ${reveal && isCorrect ? 'border-green-400 bg-green-900/50 scale-110' : ''}
                                        ${reveal && isSelected && !isCorrect ? 'border-red-500 bg-red-900/50 scale-90' : ''}
                                    `}>
                                        <div className={`font-ops text-xs md:text-lg uppercase tracking-wider text-center ${reveal && isCorrect ? 'text-green-400' : 'text-white'}`}>
                                            {opt}
                                        </div>
                                    </div>

                                    <SkullEnemy 
                                        isActive={!isTransitioning} 
                                        isCorrect={reveal && isCorrect}
                                        isWrong={reveal && isSelected && !isCorrect}
                                        tilt={(mousePos.x + mousePos.y) / 2} // Simple tilt
                                    />
                                </>
                             )}
                        </div>
                    </div>
                );
            })}
        </div>

        <style>{`
            .clip-wing-left { clip-path: polygon(0 0, 100% 20%, 100% 100%, 20% 80%); }
            .clip-wing-right { clip-path: polygon(0 20%, 100% 0, 80% 80%, 0 100%); }
            .clip-diagonal-bottom { clip-path: polygon(0 0, 100% 0, 100% 85%, 95% 100%, 5% 100%, 0 85%); }
            @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        `}</style>
    </div>
  );
};
