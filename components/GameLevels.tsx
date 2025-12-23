import React, { useState, useEffect, useRef } from 'react';
import { Question, UserProfile } from '../types';
import { CHARACTERS } from '../constants';
import { WeaponOverlay } from './UI';
import { sfx } from '../audio';
import { 
  DoorOpen, BookOpen, FlaskConical, Cog, Wind, 
  AlertTriangle, Package, ShieldAlert, Target,
  CheckCircle2, XCircle, Timer as TimerIcon
} from 'lucide-react';

const TopRightHUD = ({ user, currentScore, timeLeft }: { user: UserProfile, currentScore: number, timeLeft: number }) => {
    const char = CHARACTERS.find(c => c.id === user.characterId) || CHARACTERS[0];
    const isUrgent = timeLeft <= 10;
    
    return (
        <div className="absolute top-2 right-2 md:top-4 md:right-4 z-50 flex items-center gap-2 pointer-events-none">
            <div className="text-right flex flex-col gap-1">
                <div className="bg-black/60 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1 rounded border-l-4 border-yellow-500 shadow-lg">
                     <div className="text-yellow-400 font-ops text-lg md:text-2xl tracking-widest drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]">{currentScore}</div>
                </div>
                <div className={`bg-black/60 backdrop-blur-sm px-2 py-1 rounded border-l-4 ${isUrgent ? 'border-red-500 animate-pulse' : 'border-cyan-500'} shadow-lg flex items-center gap-2`}>
                     <TimerIcon size={14} className={isUrgent ? 'text-red-500' : 'text-cyan-400'} />
                     <div className={`font-ops text-sm md:text-lg tracking-widest ${isUrgent ? 'text-red-500' : 'text-cyan-400'}`}>00:{timeLeft.toString().padStart(2, '0')}</div>
                </div>
            </div>
            <div className="relative">
                <img 
                    src={char.image} 
                    alt="Agent" 
                    className="w-8 h-8 md:w-16 md:h-16 rounded-full border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] bg-slate-800 object-cover"
                />
            </div>
        </div>
    );
};

interface LevelEngineProps {
  data: Question[];
  user: UserProfile;
  levelId?: number; 
  onComplete: (score: number) => void;
  onDamage: (mistake: { question: string, correct: string }) => void;
}

export const UniversalLevelEngine: React.FC<LevelEngineProps> = ({ data, user, levelId = 1, onComplete, onDamage }) => {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [lastAddedScore, setLastAddedScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const currentQ = data[qIndex];
  const progress = ((qIndex) / data.length) * 100;
  // Fix: Used ReturnType<typeof setInterval> instead of NodeJS.Timeout to fix "Cannot find namespace 'NodeJS'" error
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // --- TIMER LOGIC ---
  useEffect(() => {
    // Reset timer when question changes
    setTimeLeft(60);
    if (timerRef.current) clearInterval(timerRef.current);

    if (!isTransitioning) {
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    handleTimeOut();
                    return 0;
                }
                const newTime = prev - 1;
                // Play ticking sound
                sfx.tick(newTime <= 10);
                return newTime;
            });
        }, 1000);
    }

    return () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [qIndex, isTransitioning]);

  const handleTimeOut = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowFeedback('wrong');
    sfx.error();

    const correctAnswerText = currentQ.options[currentQ.correctIndex];
    onDamage({ question: currentQ.text + " (TIMEOUT)", correct: correctAnswerText });

    setTimeout(() => {
        if (qIndex < data.length - 1) {
            setQIndex(prev => prev + 1);
        } else {
            onComplete(score);
        }
    }, 1500);
  };

  useEffect(() => {
    setSelectedIndex(null);
    setShowFeedback(null);
    setIsTransitioning(false);
  }, [qIndex]);

  const getThemeIcon = (id: number) => {
    switch(id) {
        case 1: return DoorOpen;
        case 2: return BookOpen;
        case 3: return FlaskConical;
        case 4: return Cog;
        case 5: return Wind;
        case 6: return AlertTriangle;
        case 7: return Package;
        default: return ShieldAlert;
    }
  };

  const ThemeIcon = getThemeIcon(levelId);

  const handleAnswer = (index: number) => {
    if (isTransitioning) return;
    
    // Stop timer
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Trigger Audio
    sfx.click();

    // Visual Fire Effect
    const event = new CustomEvent('weapon-fire');
    window.dispatchEvent(event);

    setSelectedIndex(index);
    setIsTransitioning(true);

    if (index === currentQ.correctIndex) {
      setShowFeedback('correct');
      sfx.hit(); 
      
      const difficultyMultiplier = user.difficulty === 'HARD' ? 300 : user.difficulty === 'MEDIUM' ? 200 : 100;
      // Bonus points for speed
      const timeBonus = Math.floor(timeLeft * 2);
      const basePoints = difficultyMultiplier + timeBonus;
      
      setScore(prev => prev + basePoints);
      setLastAddedScore(basePoints);
      setShowScorePopup(true);

      setTimeout(() => {
        setShowScorePopup(false);
        if (qIndex < data.length - 1) {
            setQIndex(prev => prev + 1);
        } else {
            onComplete(score + basePoints);
        }
      }, 1500);

    } else {
      setShowFeedback('wrong');
      sfx.error(); 
      
      const correctAnswerText = currentQ.options[currentQ.correctIndex];
      onDamage({ question: currentQ.text, correct: correctAnswerText });
      
      setTimeout(() => {
         if (qIndex < data.length - 1) {
             setQIndex(prev => prev + 1);
         } else {
             onComplete(score);
         }
      }, 1500);
    }
  };

  if (!currentQ) return <div className="text-white text-center">Loading Data...</div>;

  return (
    <div className={`relative w-full h-full flex flex-col justify-between max-w-5xl mx-auto transition-colors duration-300 ${timeLeft <= 10 && !isTransitioning ? 'timer-urgent' : ''}`}>
      <WeaponOverlay />
      <TopRightHUD user={user} currentScore={score} timeLeft={timeLeft} />

      {showScorePopup && (
         <div className="absolute top-1/4 left-1/2 -translate-x-1/2 z-[60] animate-bounce pointer-events-none">
             <div className="text-4xl md:text-7xl font-ops text-yellow-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] stroke-black">
                 +{lastAddedScore}
             </div>
         </div>
      )}

      <div className="relative z-30 w-full mt-8 md:mt-16 mb-2 animate-in slide-in-from-top-5 duration-500">
          <div className="bg-slate-900/80 border-2 border-slate-600 p-3 md:p-8 rounded-xl shadow-2xl relative overflow-hidden backdrop-blur-md min-h-[100px] md:min-h-[160px] flex items-center justify-center text-center">
              <div className="absolute top-0 left-0 h-1 bg-slate-700 w-full">
                  <div className="h-full bg-yellow-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
              
              <div className="relative z-10 w-full">
                  <div className="flex justify-center mb-1 text-slate-400 items-center gap-2">
                       <Target size={12} className="animate-pulse" />
                       <span className="font-mono text-[10px] md:text-xs tracking-widest uppercase">TARGET {qIndex + 1}/{data.length}</span>
                  </div>
                  <h2 className="text-base md:text-3xl font-bold text-white leading-tight drop-shadow-md px-4">
                      {currentQ.text}
                  </h2>
              </div>

              <ThemeIcon className="absolute top-2 left-2 text-slate-700/50 w-6 h-6 md:w-16 md:h-16" />
              <ThemeIcon className="absolute bottom-2 right-2 text-slate-700/50 w-6 h-6 md:w-16 md:h-16 transform rotate-180" />
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 relative z-30 pb-16 md:pb-0 overflow-y-auto max-h-[60vh] md:max-h-none scrollbar-hide px-1">
          {currentQ.options.map((option, idx) => {
              const isSelected = selectedIndex === idx;
              const isCorrect = idx === currentQ.correctIndex;
              
              let btnStyle = "border-slate-500 hover:border-yellow-400 bg-slate-800/90";
              let icon = null;

              if (isTransitioning) {
                  if (isSelected && isCorrect) {
                      btnStyle = "border-green-500 bg-green-900/90 shadow-[0_0_20px_lime]";
                      icon = <CheckCircle2 className="text-green-400 w-5 h-5 md:w-6 md:h-6 shrink-0" />;
                  } else if (isSelected && !isCorrect) {
                      btnStyle = "border-red-500 bg-red-900/90 shadow-[0_0_20px_red]";
                      icon = <XCircle className="text-red-400 w-5 h-5 md:w-6 md:h-6 shrink-0" />;
                  } else if (!isSelected && isCorrect && showFeedback) {
                      btnStyle = "border-green-500 bg-green-900/40 opacity-70";
                  } else {
                      btnStyle = "opacity-50 grayscale";
                  }
              }

              return (
                  <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={isTransitioning}
                      className={`
                          relative group w-full 
                          p-2 md:p-6 
                          border-2 rounded-lg 
                          flex items-center justify-between gap-2 md:gap-3
                          transition-all duration-200 
                          active:scale-95
                          min-h-[50px] md:min-h-[80px] h-auto
                          ${btnStyle}
                      `}
                  >
                      <div className={`
                          w-6 h-6 md:w-8 md:h-8 rounded bg-slate-900 border border-slate-600 
                          flex items-center justify-center font-ops text-slate-500 shrink-0
                          text-xs md:text-base
                          ${isSelected ? 'bg-yellow-500 text-black border-yellow-500' : ''}
                      `}>
                          {String.fromCharCode(65 + idx)}
                      </div>

                      <span className={`
                          flex-grow text-left font-bold leading-tight whitespace-normal break-words
                          text-[11px] sm:text-xs md:text-lg lg:text-xl
                          ${isSelected ? 'text-white' : 'text-slate-200'}
                      `}>
                          {option}
                      </span>

                      {icon && <div className="animate-in zoom-in spin-in-90 duration-300">{icon}</div>}
                  </button>
              );
          })}
      </div>
    </div>
  );
};