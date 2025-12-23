
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Question, UserProfile, LevelType } from '../types';
import { WeaponOverlay } from './UI';
import { sfx } from '../audio';
import { 
  CheckCircle2, XCircle, Timer as TimerIcon, 
  Zap, Radio, Flame, Cpu, ArrowRight, GripVertical
} from 'lucide-react';

const TopHUD = ({ user, score, timeLeft }: { user: UserProfile, score: number, timeLeft: number }) => (
    <div className="absolute top-2 left-2 right-2 md:top-4 md:left-4 md:right-4 z-40 flex justify-between items-start pointer-events-none">
        <div className="bg-black/85 border-l-2 md:border-l-4 border-lime-500 p-1.5 md:p-3 backdrop-blur-md shadow-[0_0_15px_rgba(132,204,22,0.3)]">
            <div className="text-[7px] md:text-[10px] text-slate-500 font-mono">USER_{user.username.toUpperCase()}</div>
            <div className="text-sm md:text-3xl font-ops text-lime-400">{score.toString().padStart(6, '0')}</div>
        </div>
        <div className={`bg-black/85 border-r-2 md:border-r-4 ${timeLeft < 10 ? 'border-red-500 animate-pulse' : 'border-cyan-500'} p-1.5 md:p-3 backdrop-blur-md text-right shadow-[0_0_15px_rgba(6,182,212,0.3)]`}>
            <div className="text-[7px] md:text-[10px] text-slate-500 font-mono flex items-center justify-end gap-1">
                <TimerIcon size={8} /> SYNC_CLOCK
            </div>
            <div className={`text-sm md:text-3xl font-ops ${timeLeft < 10 ? 'text-red-500' : 'text-cyan-400'}`}>00:{timeLeft.toString().padStart(2, '0')}</div>
        </div>
    </div>
);

// --- 3D ASSETS ---
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
            <div className={`absolute -z-20 w-12 h-12 md:w-20 md:h-20 rounded-full blur-2xl animate-pulse transition-colors duration-500 ${isCorrect ? 'bg-green-500/40' : isWrong ? 'bg-red-500/40' : 'bg-lime-500/30'}`}></div>
            <div className="absolute -z-10 flex gap-4 md:gap-8 opacity-90 transition-transform duration-500" style={{ transform: 'translateZ(-10px)' }}>
                <div className={`w-8 h-12 md:w-16 md:h-20 bg-slate-900/60 clip-wing-left transform -rotate-12 border-l-[3px] md:border-l-4 ${borderColor} ${glowColor}`}></div>
                <div className={`w-8 h-12 md:w-16 md:h-20 bg-slate-900/60 clip-wing-right transform rotate-12 border-r-[3px] md:border-r-4 ${borderColor} ${glowColor}`}></div>
            </div>
            <div className={`absolute -inset-3 md:-inset-6 border-[1px] md:border-2 rounded-full ${borderColor} opacity-60 animate-[spin_8s_linear_infinite]`} style={{ transform: 'translateZ(15px)' }}>
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 md:w-2 h-1 md:h-2 rounded-full ${isCorrect ? 'bg-green-400' : 'bg-lime-400'} shadow-[0_0_10px_white]`}></div>
            </div>
            <div className={`relative w-14 h-14 md:w-24 md:h-24 bg-gradient-to-br from-slate-800 via-slate-900 to-black border-[2px] md:border-[3px] rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 ${borderColor} ${glowColor}`} 
                 style={{ transform: 'translateZ(30px)' }}>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-30"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute inset-0 flex flex-col items-center pt-1 md:pt-2">
                    <Cpu className={`${themeColor} animate-pulse mb-[-2px] md:mb-[-4px] z-20 drop-shadow-[0_0_8px_currentColor]`} size={16} />
                    <div className="w-10 h-8 md:w-16 md:h-12 bg-slate-800 rounded-t-full border-x border-slate-600 relative z-10 shadow-inner flex items-center justify-center">
                        <div className="w-6 h-1 bg-cyan-400/30 rounded-full animate-pulse"></div>
                    </div>
                    <div className="w-full h-8 md:h-14 bg-slate-950 border-t border-slate-700 flex flex-col items-center justify-center gap-1">
                        <div className="flex gap-2 md:gap-4">
                            <div className={`w-2 h-1.5 md:w-4 md:h-2.5 rounded-full animate-[pulse_0.5s_infinite] ${isWrong ? 'bg-red-500 shadow-[0_0_12px_red]' : 'bg-cyan-500 shadow-[0_0_12px_cyan]'}`}></div>
                            <div className={`w-2 h-1.5 md:w-4 md:h-2.5 rounded-full animate-[pulse_0.5s_infinite] ${isWrong ? 'bg-red-500 shadow-[0_0_12px_red]' : 'bg-cyan-500 shadow-[0_0_12px_cyan]'}`}></div>
                        </div>
                        <div className={`h-0.5 w-8 md:w-12 rounded-full ${isCorrect ? 'bg-green-500' : 'bg-lime-500'} animate-pulse`}></div>
                    </div>
                </div>
            </div>
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
        // Scramble the options
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
    };

    const handleDeselect = (part: string) => {
        setScrambled([...scrambled, part]);
        setAssembled(assembled.filter(s => s !== part));
    };

    const checkAnswer = (timeout = false) => {
        setIsChecking(true);
        const isCorrect = assembled.join('') === question.options.join('');
        const score = isCorrect ? 1000 + (timeLeft * 10) : 0;
        
        if (isCorrect) sfx.win();
        else sfx.error();

        setTimeout(() => {
            onComplete(score);
        }, 2000);
    };

    // Auto check if all parts used
    useEffect(() => {
        if (scrambled.length === 0 && assembled.length > 0 && !isChecking) {
            checkAnswer();
        }
    }, [scrambled, assembled]);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-4 relative z-50">
            <div className="absolute top-4 right-4 text-cyan-400 font-ops text-2xl">{timeLeft}s</div>
            
            <h2 className="text-xl md:text-3xl font-ops text-yellow-500 mb-8 text-center uppercase drop-shadow-lg">{question.text}</h2>

            {/* DROP ZONE */}
            <div className="w-full max-w-4xl min-h-[120px] bg-slate-900/80 border-2 border-dashed border-slate-600 rounded-xl p-4 flex flex-wrap gap-2 justify-center items-center mb-8 shadow-inner transition-all duration-300">
                {assembled.map((part, idx) => (
                    <button key={idx} onClick={() => !isChecking && handleDeselect(part)} className="bg-gradient-to-b from-lime-600 to-lime-800 text-white font-serif text-lg md:text-2xl px-4 py-2 rounded shadow-lg hover:scale-105 active:scale-95 transition-transform animate-in zoom-in duration-200">
                        {part}
                    </button>
                ))}
                {assembled.length === 0 && <span className="text-slate-500 italic">Ketuk potongan kata di bawah untuk menyusun ayat...</span>}
            </div>

            {/* SOURCE ZONE */}
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl">
                {scrambled.map((part, idx) => (
                    <button key={idx} onClick={() => !isChecking && handleSelect(part)} className="bg-slate-800 border border-slate-600 text-cyan-400 font-serif text-lg md:text-2xl px-4 py-2 rounded shadow hover:bg-slate-700 hover:border-cyan-400 hover:text-white transition-all active:scale-95">
                        {part}
                    </button>
                ))}
            </div>

            {isChecking && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in">
                    <div className="text-4xl md:text-6xl font-ops text-white uppercase animate-bounce">
                        {assembled.join('') === question.options.join('') ? <span className="text-green-500">SEMPURNA!</span> : <span className="text-red-500">KURANG TEPAT</span>}
                    </div>
                </div>
            )}
        </div>
    );
};

export const UniversalLevelEngine = ({ data, user, levelId, levelType, onComplete, onDamage }: any) => {
  const [qIndex, setQIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  
  // RAPID FIRE STATES
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const currentQ = data[qIndex];
  const timerRef = useRef<any>(null);

  // Layouts for Rapid Fire / Vocab Match
  const layouts = useMemo(() => {
    if (!currentQ?.options) return [];
    return currentQ.options.map((_: any, i: number) => {
        // Different layouts for Vocab Match to focus on text
        if (levelType === LevelType.VOCAB_MATCH) {
             return { x: 50, y: 30 + (i * 15), tilt: 0 }; // Stacked center
        }
        // Scattered for Rapid Fire
        const quadrantX = i % 2 === 0 ? 15 : 65; 
        const quadrantY = i < 2 ? 20 : 50; 
        return {
            x: quadrantX + Math.random() * 10,
            y: quadrantY + Math.random() * 5,
            tilt: (Math.random() - 0.5) * 15
        };
    });
  }, [qIndex, levelType, currentQ]);

  // Timer Logic
  useEffect(() => {
    if (levelType === LevelType.VERSE_ASSEMBLE) return; // Assembler has internal timer

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
      const finalScore = totalScore + addedScore;
      setTotalScore(finalScore);
      if (qIndex < data.length - 1) {
          setQIndex(qIndex + 1);
      } else {
          onComplete(finalScore);
      }
  };

  const handleAnswer = (idx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSelectedIndex(idx);
    clearInterval(timerRef.current);
    
    const isCorrect = idx === currentQ.correctIndex;
    let scoreGain = 0;

    if (isCorrect) {
        sfx.hit();
        scoreGain = 100 + timeLeft * 5;
        setTotalScore(s => s + scoreGain);
    } else {
        sfx.error();
        onDamage({ question: currentQ.text, correct: currentQ.options[currentQ.correctIndex] });
    }

    if (levelType === LevelType.RAPID_FIRE) window.dispatchEvent(new CustomEvent('weapon-fire'));

    setTimeout(() => {
        setIsTransitioning(false);
        setSelectedIndex(null);
        handleLevelComplete(0); // Score already added
    }, 1500);
  };

  // --- RENDERERS ---

  if (levelType === LevelType.VERSE_ASSEMBLE) {
      return (
          <>
            <TopHUD user={user} score={totalScore} timeLeft={0} />
            <VerseAssembler question={currentQ} onComplete={handleLevelComplete} />
          </>
      );
  }

  // STANDARD & VOCAB MATCH RENDERER
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
        {levelType === LevelType.RAPID_FIRE && <WeaponOverlay />}
        <TopHUD user={user} score={totalScore} timeLeft={timeLeft} />

        {/* BATTLEFIELD / OPTION FIELD */}
        <div className="absolute inset-0 z-20 pointer-events-none" style={{ perspective: '1200px' }}>
            {currentQ.options.map((opt: string, idx: number) => {
                const layout = layouts[idx];
                const isSelected = selectedIndex === idx;
                const isCorrect = idx === currentQ.correctIndex;
                const reveal = isTransitioning;

                return (
                    <div key={idx} className="absolute pointer-events-auto transition-all duration-700 w-64 -ml-32 md:w-auto md:ml-0"
                         style={{ left: `${layout.x}%`, top: `${layout.y}%`, transformStyle: 'preserve-3d' }}>
                        
                        <div className="flex flex-col items-center group">
                             {/* Vocab Match specific styling */}
                             {levelType === LevelType.VOCAB_MATCH ? (
                                <button 
                                    onClick={() => handleAnswer(idx)}
                                    disabled={isTransitioning}
                                    className={`w-full max-w-sm bg-slate-900/90 border-2 ${reveal ? (isCorrect ? 'border-green-500 bg-green-900/40' : isSelected ? 'border-red-500' : 'border-slate-700') : 'border-slate-600 hover:border-cyan-400 hover:scale-105'} p-4 rounded-lg backdrop-blur shadow-xl transition-all flex items-center gap-4`}
                                >
                                    <div className={`w-8 h-8 rounded flex items-center justify-center font-bold ${reveal && isCorrect ? 'bg-green-500 text-black' : 'bg-slate-800 text-slate-400'}`}>
                                        {String.fromCharCode(65+idx)}
                                    </div>
                                    <div className="text-left font-sans text-lg text-slate-200">{opt}</div>
                                    {reveal && isCorrect && <CheckCircle2 className="text-green-500 ml-auto" />}
                                    {reveal && isSelected && !isCorrect && <XCircle className="text-red-500 ml-auto" />}
                                </button>
                             ) : (
                                /* Rapid Fire 3D Target Styling */
                                <>
                                    <div className={`mb-4 px-3 py-1 md:px-5 md:py-2 transition-all duration-300 relative
                                        bg-black/90 border-l-[3px] md:border-l-4 border-lime-500 backdrop-blur-md shadow-[0_0_20px_rgba(163,230,53,0.3)]
                                        ${reveal && !isSelected && !isCorrect ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}
                                    `}>
                                        <div className={`
                                            font-ops text-[11px] md:text-sm uppercase tracking-tighter whitespace-nowrap drop-shadow-[0_0_5px_rgba(0,0,0,1)]
                                            ${reveal ? (isCorrect ? 'text-green-400' : 'text-red-500') : 'text-lime-gradient'}
                                        `}>
                                            {opt}
                                        </div>
                                        {reveal && isCorrect && <CheckCircle2 className="absolute -right-7 top-1/2 -translate-y-1/2 text-green-400 animate-bounce" size={18} />}
                                        {reveal && isSelected && !isCorrect && <XCircle className="absolute -right-7 top-1/2 -translate-y-1/2 text-red-500 animate-shake" size={18} />}
                                    </div>

                                    <button 
                                        onClick={() => handleAnswer(idx)} 
                                        disabled={isTransitioning}
                                        className={`transition-all duration-300 ${reveal && !isSelected && !isCorrect ? 'opacity-0 translate-y-20' : 'hover:scale-110 active:scale-95'}`}
                                    >
                                        <SkullEnemy 
                                            isActive={!isTransitioning} 
                                            isCorrect={reveal && isCorrect} 
                                            isWrong={reveal && isSelected && !isCorrect} 
                                            tilt={layout.tilt}
                                        />
                                    </button>
                                </>
                             )}
                        </div>
                    </div>
                );
            })}
        </div>

        {/* BOTTOM QUESTION PANEL */}
        <div className="absolute bottom-24 md:bottom-20 left-0 right-0 z-40 p-4 md:p-6 flex flex-col items-center pointer-events-none">
            <div className="w-full max-w-2xl bg-slate-950/95 border-t-[3px] md:border-t-4 border-lime-600 p-3 md:p-6 rounded-2xl shadow-[0_-20px_70px_rgba(0,0,0,1)] backdrop-blur-2xl pointer-events-auto">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-0.5 bg-lime-600 rounded">
                        <Zap className="text-white animate-pulse" size={10} />
                    </div>
                    <span className="font-mono text-[6px] md:text-[8px] text-lime-400 tracking-[0.1em] uppercase font-bold opacity-70">INTEL_DB // SEC_0{levelId}</span>
                </div>
                <div className="bg-slate-900 border-2 border-slate-700/80 p-4 md:p-6 rounded-xl relative overflow-hidden shadow-inner ring-1 ring-lime-500/20">
                    <div className="absolute top-0 left-0 h-1 bg-slate-800 w-full">
                        <div className="h-full bg-lime-500 shadow-[0_0_15px_#84cc16] transition-all duration-700" style={{ width: `${(qIndex / data.length) * 100}%` }}></div>
                    </div>
                    <h2 className="text-sm md:text-2xl font-bold text-white text-center leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {currentQ.text}
                    </h2>
                </div>
                <div className="mt-2 flex justify-between items-center px-1">
                    <div className="flex gap-1">
                        {[...Array(data.length)].map((_, i) => (
                            <div key={i} className={`h-1 w-4 md:w-6 rounded-full transition-all duration-300 ${i <= qIndex ? 'bg-lime-500 shadow-[0_0_5px_lime]' : 'bg-slate-800'}`}></div>
                        ))}
                    </div>
                    <div className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-widest">MSG_{qIndex + 1}/{data.length}</div>
                </div>
            </div>
        </div>

        <style>{`
            .text-lime-gradient {
                background: linear-gradient(to bottom, #bef264 0%, #84cc16 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .clip-wing-left { clip-path: polygon(0 0, 100% 20%, 100% 100%, 20% 80%); }
            .clip-wing-right { clip-path: polygon(0 20%, 100% 0, 80% 80%, 0 100%); }
            @keyframes animate-shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-6px); }
                75% { transform: translateX(6px); }
            }
            .animate-shake { animation: animate-shake 0.2s infinite; }
        `}</style>
    </div>
  );
};
