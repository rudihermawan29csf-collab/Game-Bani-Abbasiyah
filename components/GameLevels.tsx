
import React, { useState, useEffect, useRef } from 'react';
import { Question, UserProfile } from '../types';
import { CHARACTERS } from '../constants';
import { Panel, WeaponOverlay } from './UI';
import { sfx } from '../audio';
import { 
  DoorOpen, DoorClosed, BookOpen, FlaskConical, Crown, Wind, 
  AlertTriangle, Lightbulb, Star, ShieldAlert, Skull, 
  Sparkles, Cog, History, Scroll, Package, Box
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- HUD COMPONENT ---

const TopRightHUD = ({ user, currentScore }: { user: UserProfile, currentScore: number }) => {
    const char = CHARACTERS.find(c => c.id === user.characterId) || CHARACTERS[0];
    
    return (
        <div className="absolute top-2 right-2 md:top-4 md:right-4 z-50 flex items-center gap-3 animate-in fade-in slide-in-from-right-10 pointer-events-none">
            <div className="text-right">
                <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded border-l-4 border-yellow-500">
                     <div className="text-yellow-400 font-ops text-xl md:text-2xl tracking-widest drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]">{currentScore} PTS</div>
                     <div className="text-[10px] md:text-xs text-slate-400 font-mono tracking-widest">RANK: {user.rank.toUpperCase()}</div>
                </div>
            </div>
            <div className="relative">
                <img 
                    src={char.image} 
                    alt="Agent" 
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] bg-slate-800 object-cover"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 text-[10px] text-black font-bold px-1.5 py-0.5 rounded border border-white">
                    ONLINE
                </div>
            </div>
        </div>
    );
};

// --- UNIVERSAL LEVEL ENGINE ---

interface LevelEngineProps {
  data: Question[];
  user: UserProfile;
  levelId?: number; 
  onComplete: (score: number) => void;
  onDamage: (mistake: { question: string, correct: string }) => void; // Updated signature
}

export const UniversalLevelEngine: React.FC<LevelEngineProps> = ({ data, user, levelId = 1, onComplete, onDamage }) => {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Track hidden options (wrong answers that have been shot)
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);

  // New state for score animation
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [lastAddedScore, setLastAddedScore] = useState(0);

  const currentQ = data[qIndex];
  const progress = ((qIndex) / data.length) * 100;

  // Reset hidden options when question changes
  useEffect(() => {
    setHiddenIndices([]);
  }, [qIndex]);

  // --- ANIMATION STYLES INJECTION ---
  const animationStyles = `
    @keyframes dropDown {
        0% { transform: translateY(-150px); opacity: 0; }
        10% { opacity: 1; }
        100% { transform: translateY(90vh); opacity: 1; } 
    }
    @keyframes flyRight {
        0% { transform: translateX(-100%) translateY(0); opacity: 0; }
        10% { opacity: 1; }
        50% { transform: translateX(50vw) translateY(-20px); }
        100% { transform: translateX(100vw) translateY(0); opacity: 1; }
    }
    @keyframes spinWheel {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    @keyframes balloonFloat {
        0% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(0) translateX(0); }
        75% { transform: translateY(20px) translateX(-10px); }
        100% { transform: translateY(0) translateX(0); }
    }
    @keyframes tankAdvance {
        0% { transform: scale(0.5) translateY(-50px); opacity: 0.5; }
        100% { transform: scale(1.2) translateY(80vh); opacity: 1; }
    }
    @keyframes hoverBox {
        0% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-30px) rotate(5deg); }
        100% { transform: translateY(0) rotate(0deg); }
    }
    @keyframes shatterGlass {
        0% { transform: scale(1) rotate(0deg); opacity: 1; }
        20% { transform: scale(1.1) rotate(-10deg); }
        50% { transform: scale(0.9) rotate(45deg) translateY(20px); opacity: 0.8; }
        100% { transform: scale(0.5) rotate(90deg) translateY(50px); opacity: 0; }
    }
    @keyframes floatScore {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        50% { transform: translate(-50%, -150%) scale(1.5); opacity: 1; }
        100% { transform: translate(-50%, -200%) scale(1); opacity: 0; }
    }
  `;

  // --- THEME CONFIGURATION ---
  const getTheme = (id: number) => {
    switch(id) {
        case 1: return { name: 'Gate', icon: DoorOpen, color: 'text-stone-300', accent: 'border-stone-500' };
        case 2: return { name: 'Library', icon: BookOpen, color: 'text-amber-200', accent: 'border-amber-500' };
        case 3: return { name: 'Lab', icon: FlaskConical, color: 'text-cyan-400', accent: 'border-cyan-500' };
        case 4: return { name: 'Palace', icon: Cog, color: 'text-yellow-500', accent: 'border-yellow-500' };
        case 5: return { name: 'City', icon: Wind, color: 'text-emerald-400', accent: 'border-emerald-500' };
        case 6: return { name: 'Ruins', icon: AlertTriangle, color: 'text-red-500', accent: 'border-red-600' };
        case 7: return { name: 'Legacy', icon: Package, color: 'text-indigo-300', accent: 'border-indigo-500' };
        default: return { name: 'Base', icon: ShieldAlert, color: 'text-white', accent: 'border-slate-500' };
    }
  };

  const theme = getTheme(levelId);
  const ThemeIcon = theme.icon;

  const handleAnswer = (index: number) => {
    if (isTransitioning || hiddenIndices.includes(index)) return;
    
    // Fire weapon effect global event
    const event = new CustomEvent('weapon-fire');
    window.dispatchEvent(event);
    sfx.shoot();

    setSelectedIndex(index);

    if (index === currentQ.correctIndex) {
      // CORRECT
      setIsTransitioning(true); // Lock interactions
      setShowFeedback('correct');
      sfx.hit();
      
      if(levelId === 1) sfx.playTone(100, 'sawtooth', 0.5, 0.5); 
      if(levelId === 2) sfx.playNoise(0.2); 
      if(levelId === 3) sfx.playTone(1500, 'square', 0.1, 0.2); 
      if(levelId === 5) sfx.playTone(600, 'sine', 0.1, 0.1); 

      const basePoints = user.difficulty === 'HARD' ? 300 : user.difficulty === 'MEDIUM' ? 200 : 100;
      setScore(prev => prev + basePoints);
      
      // TRIGGER SCORE POPUP
      setLastAddedScore(basePoints);
      setShowScorePopup(true);

      setTimeout(() => {
        setShowScorePopup(false);
        nextQuestion();
      }, 1500);
    } else {
      // WRONG
      setShowFeedback('wrong');
      sfx.error();
      if(levelId === 3) sfx.playTone(100, 'sawtooth', 0.3, 0.3); 
      if(levelId === 6) sfx.playTone(50, 'sawtooth', 0.5, 0.5); 
      
      // Calculate correct answer string
      const correctAnswerText = currentQ.options[currentQ.correctIndex];
      onDamage({ question: currentQ.text, correct: correctAnswerText }); 
      
      // Shake/Red Effect, then Hide
      setTimeout(() => {
        setHiddenIndices(prev => [...prev, index]);
        setShowFeedback(null);
        setSelectedIndex(null);
      }, 500);
    }
  };

  const nextQuestion = () => {
    setShowFeedback(null);
    setSelectedIndex(null);
    setIsTransitioning(false);

    if (qIndex < data.length - 1) {
      setQIndex(prev => prev + 1);
    } else {
      onComplete(score);
    }
  };

  // --- RENDERERS FOR EACH LEVEL ---

  const renderVisuals = () => {
    return (
      <div className="relative w-full h-full overflow-hidden">
        <style>{animationStyles}</style>
        
        {currentQ.options.map((option, idx) => {
          // If this option is in hiddenIndices, render invisible or don't render interactive
          const isHidden = hiddenIndices.includes(idx);
          if (isHidden) return null; // Remove entirely or use opacity-0

          const isSelected = selectedIndex === idx;
          const isCorrect = idx === currentQ.correctIndex;
          
          // Base interaction state
          let interactionState = "";
          if (showFeedback && isSelected) {
             interactionState = showFeedback === 'correct' ? "scale-110 brightness-125 z-50" : "ring-4 ring-red-500 shake";
          } else if (showFeedback === 'correct' && !isSelected) {
             interactionState = "opacity-30 blur-sm";
          }

          // Positioning Logic (distribute options evenly)
          const leftPos = `${(idx * (100 / currentQ.options.length)) + 5}%`;
          const widthClass = `${90 / currentQ.options.length}%`;
          
          // Delay stagger
          const delay = `${idx * 0.5}s`;

          // --- LEVEL 1: GERBANG (Falling from Top) ---
          if (levelId === 1) {
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={isTransitioning}
                className={`absolute -top-40 transition-all duration-500 group ${interactionState}`}
                style={{ 
                    left: leftPos, 
                    width: widthClass,
                    maxWidth: '180px',
                    animation: isTransitioning ? 'none' : `dropDown ${15 + idx}s linear infinite`,
                    animationDelay: delay
                }}
              >
                 {/* CHANGED: High contrast Wood Door instead of Dark Stone */}
                 <div className="relative bg-amber-800 border-4 border-amber-950 rounded-t-full h-40 flex flex-col items-center justify-end overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.8)] ring-2 ring-amber-600">
                     {/* Door Texture */}
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-40 mix-blend-multiply"></div>
                     <div className="absolute inset-0 border-b-8 border-black/50"></div>
                     
                     {/* The Door Icons */}
                     <div className="mb-2 transition-all duration-700 relative z-10">
                        {isSelected && showFeedback === 'correct' ? (
                            <DoorOpen size={48} className="text-white drop-shadow-[0_0_15px_white]" />
                        ) : (
                            <DoorClosed size={48} className="text-amber-200 group-hover:text-white drop-shadow-md" />
                        )}
                     </div>

                     <div className="bg-black/80 w-full p-2 text-center border-t-2 border-amber-500 relative z-10">
                         <span className="text-amber-100 font-bold text-xs md:text-sm leading-tight line-clamp-2 font-serif">{option}</span>
                     </div>

                     {/* Open Effect */}
                     {isSelected && showFeedback === 'correct' && (
                         <div className="absolute inset-0 bg-yellow-400/50 animate-ping z-20"></div>
                     )}
                 </div>
              </button>
            );
          }

          // --- LEVEL 2: BUKU (Flying Left to Right) ---
          if (levelId === 2) {
             return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={isTransitioning}
                className={`absolute transition-all duration-300 group ${interactionState}`}
                style={{ 
                    top: `${(idx * 15) + 20}%`,
                    width: '100px', // Fixed small width for book proportion
                    height: '130px',
                    animation: isTransitioning ? 'none' : `flyRight ${12 + (idx * 2)}s linear infinite`,
                    animationDelay: `${idx * 2}s` // Stagger start
                }}
              >
                 {/* Book Shape: Vertical Rectangle with spine on left */}
                 <div className="w-full h-full bg-[#8B4513] rounded-r-md rounded-l-sm border-l-4 border-[#5D2906] relative shadow-lg flex flex-col items-center justify-center p-2 transform hover:scale-105 transition-transform">
                    {/* Cover detail */}
                    <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(90deg,rgba(0,0,0,0.2)_0%,rgba(255,255,255,0.1)_10%,transparent_20%)] pointer-events-none"></div>
                    <div className="absolute top-2 bottom-2 right-2 w-1 bg-[#5D2906]/50"></div>
                    
                    {/* Decorative gold element */}
                    <div className="w-8 h-8 rounded-full border border-yellow-500/50 flex items-center justify-center mb-1">
                        <BookOpen className="text-yellow-500/80" size={16} />
                    </div>
                    
                    {/* Text */}
                    <div className="text-amber-100 font-serif leading-tight text-[10px] text-center font-bold break-words w-full overflow-hidden line-clamp-3">
                        {option}
                    </div>
                     
                    {/* Pages glow effect on correct */}
                    {isSelected && showFeedback === 'correct' && (
                         <div className="absolute inset-0 bg-yellow-500/20 animate-pulse rounded-r-md"></div>
                    )}
                 </div>
              </button>
             );
          }

          // --- LEVEL 3: GELAS LAB (Static & Shatter Effect) ---
          if (levelId === 3) {
             return (
               <button
                 key={idx}
                 onClick={() => handleAnswer(idx)}
                 disabled={isTransitioning}
                 className={`absolute transition-all duration-300 group ${isSelected ? '' : interactionState}`}
                 style={{ 
                     left: leftPos, 
                     top: '40%', // Static position
                     width: widthClass,
                     maxWidth: '120px',
                 }}
               >
                  <div className="flex flex-col items-center">
                      <div className="relative h-16 w-16 flex items-center justify-center">
                          {isSelected && showFeedback === 'correct' ? (
                              <div className="relative animate-[shatterGlass_0.5s_forwards]">
                                   <FlaskConical size={50} className="text-cyan-400 opacity-50" />
                                   <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full animate-ping delay-75"></div>
                                   <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                                   <div className="absolute -bottom-4 left-0 w-full h-2 bg-cyan-500 blur-sm scale-x-150"></div>
                              </div>
                          ) : (
                              // NORMAL STATE
                              <div className={`relative group-hover:scale-110 transition-transform ${isSelected && showFeedback === 'wrong' ? 'animate-pulse text-red-500' : ''}`}>
                                <FlaskConical size={50} className={`text-cyan-400 drop-shadow-[0_0_10px_cyan]`} />
                                {/* Liquid level */}
                                <div className="absolute bottom-2 left-3 right-3 h-5 bg-cyan-500/50 rounded-b-full animate-pulse"></div>
                              </div>
                          )}
                      </div>
                      
                      <div className={`mt-2 bg-slate-900/80 px-2 py-1 rounded border border-cyan-500 text-cyan-100 text-xs font-mono text-center shadow-lg backdrop-blur-md w-full transition-opacity duration-200 ${isSelected && showFeedback === 'correct' ? 'opacity-0' : 'opacity-100'}`}>
                          {option}
                      </div>
                  </div>
               </button>
             );
          }

          // --- LEVEL 4: RODA (Spinning) ---
          if (levelId === 4) {
             return (
               <button
                 key={idx}
                 onClick={() => handleAnswer(idx)}
                 disabled={isTransitioning}
                 className={`absolute transition-all duration-300 group ${interactionState}`}
                 style={{ 
                     left: `${(idx * 22) + 5}%`, // Spaced horizontally
                     top: '40%', 
                     width: '120px',
                     height: '120px'
                 }}
               >
                   <div 
                        className="w-full h-full relative flex items-center justify-center rounded-full border-4 border-yellow-700 bg-yellow-950 shadow-2xl"
                        style={{ animation: `spinWheel ${8 + idx}s linear infinite` }}
                   >
                       {/* Spokes */}
                       <div className="absolute inset-0 border-t-2 border-b-2 border-yellow-800 rotate-45"></div>
                       <div className="absolute inset-0 border-t-2 border-b-2 border-yellow-800 -rotate-45"></div>
                       <div className="absolute inset-0 border-4 border-dashed border-yellow-600 rounded-full"></div>
                   </div>
                   
                   {/* Text Overlay (Static relative to button) */}
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <div className="bg-black/80 rounded-full w-20 h-20 flex items-center justify-center border-2 border-yellow-500 z-10 p-1">
                           <span className="text-yellow-100 text-[10px] font-bold text-center leading-tight line-clamp-3">{option}</span>
                       </div>
                   </div>
               </button>
             );
          }

          // --- LEVEL 5: BALON UDARA (Floating) ---
          if (levelId === 5) {
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={isTransitioning}
                  className={`absolute transition-all duration-500 group ${interactionState}`}
                  style={{ 
                      left: leftPos,
                      top: `${15 + (idx * 15)}%`, // Staggered heights
                      width: widthClass,
                      maxWidth: '100px',
                      animation: `balloonFloat ${6 + idx}s ease-in-out infinite`
                  }}
                >
                    <div className="flex flex-col items-center">
                        {/* Balloon Shape */}
                        <div className={`w-16 h-20 rounded-t-full rounded-b-xl bg-gradient-to-br ${['from-red-500 to-orange-600', 'from-blue-500 to-indigo-600', 'from-green-500 to-emerald-600', 'from-purple-500 to-pink-600'][idx % 4]} shadow-xl flex items-center justify-center p-1 border-2 border-white/20 relative overflow-hidden`}>
                             <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(transparent_90%,rgba(0,0,0,0.2)_100%)] bg-[length:100%_10px]"></div>
                             <span className="text-white font-bold text-[10px] text-center drop-shadow-md z-10 leading-none">{option}</span>
                             {/* Gloss */}
                             <div className="absolute top-2 right-2 w-3 h-6 bg-white/30 rounded-full rotate-12 filter blur-sm"></div>
                        </div>
                        {/* Basket */}
                        <div className="w-0.5 h-3 bg-stone-400"></div>
                        <div className="w-6 h-4 bg-amber-800 rounded-sm border border-amber-600 flex items-center justify-center">
                             <div className="w-4 h-0.5 bg-black/30"></div>
                        </div>
                    </div>
                </button>
              );
          }

          // --- LEVEL 6: TANK (Advancing Top to Bottom) ---
          if (levelId === 6) {
              return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={isTransitioning}
                    className={`absolute -top-32 transition-all group ${interactionState}`}
                    style={{ 
                        left: leftPos,
                        width: widthClass,
                        maxWidth: '120px',
                        animation: isTransitioning ? 'none' : `tankAdvance ${25 - idx}s linear infinite`, // Slower
                        animationDelay: delay
                    }}
                  >
                      <div className="flex flex-col items-center">
                          {/* Turret */}
                          <div className="w-12 h-14 bg-stone-700 rounded-t-lg border-2 border-stone-600 relative z-10 flex items-center justify-center shadow-lg">
                              <div className="w-1.5 h-8 bg-black absolute -bottom-6"></div> {/* Gun barrel pointing down */}
                              <span className="text-[10px] font-mono text-red-400 font-bold bg-black/80 px-1 text-center leading-tight">{option}</span>
                          </div>
                          {/* Body */}
                          <div className="w-20 h-10 bg-stone-800 rounded-lg border-4 border-stone-900 -mt-1 relative z-0 shadow-xl">
                               {/* Treads */}
                               <div className="absolute -left-1.5 top-0 h-full w-3 bg-stone-900 border-r border-stone-600"></div>
                               <div className="absolute -right-1.5 top-0 h-full w-3 bg-stone-900 border-l border-stone-600"></div>
                          </div>
                      </div>
                  </button>
              );
          }

          // --- LEVEL 7: KOTAK KAYU MISTERIUS (Floating/Hovering) ---
          if (levelId === 7) {
              return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={isTransitioning}
                    className={`absolute transition-all duration-700 group ${interactionState}`}
                    style={{ 
                        left: leftPos,
                        top: `${25 + (idx % 2 * 20)}%`, // Zigzag height
                        width: '100px',
                        height: '100px',
                        animation: `hoverBox ${4 + idx}s ease-in-out infinite`
                    }}
                  >
                      <div className="relative w-full h-full flex items-center justify-center">
                          {/* Glow behind */}
                          <div className="absolute inset-0 bg-indigo-500/30 blur-xl rounded-full animate-pulse"></div>
                          
                          {/* The Box */}
                          <div className="bg-[#5d4037] w-20 h-20 border-4 border-[#3e2723] shadow-2xl flex items-center justify-center relative transform rotate-45 group-hover:rotate-0 transition-transform duration-500">
                              <div className="absolute inset-0 border-2 border-[#8d6e63] m-1"></div>
                              <Package size={32} className="text-[#d7ccc8]" />
                          </div>
                          
                          {/* Label */}
                          <div className="absolute -bottom-6 bg-black/60 px-2 py-0.5 rounded text-indigo-200 text-[10px] font-bold whitespace-nowrap border border-indigo-500/50 backdrop-blur-md">
                              {option}
                          </div>
                      </div>
                  </button>
              );
          }

          // Default fallback (should not happen given levelId 1-7 logic)
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full relative w-full overflow-hidden">
      <WeaponOverlay />
      
      <TopRightHUD user={user} currentScore={score} />

      {/* SCORE POPUP ANIMATION */}
      {showScorePopup && (
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[100]">
             <span className="font-ops text-5xl md:text-7xl text-green-400 drop-shadow-[0_0_20px_lime] animate-[floatScore_1s_ease-out_forwards] stroke-black stroke-2">
                +{lastAddedScore}
             </span>
         </div>
      )}

      {/* QUESTION DISPLAY CONTAINER - Compact & Top Aligned */}
      <div className="flex-none pt-12 pb-2 z-30 px-4 w-full pointer-events-none">
         <Panel className="max-w-2xl mx-auto text-center transform transition-all duration-500 pointer-events-auto py-2 px-4 bg-slate-900/90 backdrop-blur-md border-slate-600 shadow-2xl">
            <div className="flex flex-col items-center">
                {/* Header Row: Icon + Progress */}
                <div className="flex items-center gap-3 mb-1 opacity-80">
                     <div className={`p-1 rounded-full bg-slate-800 border ${theme.accent}`}>
                        <ThemeIcon size={16} className={theme.color} />
                    </div>
                    {/* Small Progress Bar */}
                    <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-500 ${theme.color.replace('text', 'bg')}`} 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
                
                {/* Question Text - Smaller & Compact */}
                <h2 className={`text-lg md:text-2xl font-ops leading-tight ${theme.color} drop-shadow-md`}>
                    {currentQ.text}
                </h2>
            </div>
         </Panel>
      </div>

      {/* VISUAL INTERACTIVE AREA - Full Remaining Height */}
      <div className="flex-grow relative w-full perspective-1000 overflow-hidden">
          {/* Specific atmospherics based on level */}
          {levelId === 1 && <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-stone-900 via-stone-800/50 to-transparent pointer-events-none z-10"></div>} {/* Fog */}
          {levelId === 4 && <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] pointer-events-none"></div>} {/* Vignette */}
          {levelId === 6 && <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay animate-pulse pointer-events-none"></div>} {/* Red Alert */}
          {levelId === 7 && <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-[pulse_4s_infinite]"></div>} {/* Stars */}

          {renderVisuals()}
      </div>

    </div>
  );
};
