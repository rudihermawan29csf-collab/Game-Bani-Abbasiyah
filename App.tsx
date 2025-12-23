
import React, { useState, useEffect, useRef } from 'react';
import { ScreenState, UserProfile, Difficulty, Question, GalleryItem, LevelType } from './types';
import { 
  LEVEL_CONFIGS, CHARACTERS, GAME_DATA, RANDOM_BACKGROUNDS, GALLERY_DATA 
} from './constants';
import { TacticalButton, Panel, RankBadge, HealthBar } from './components/UI';
import { UniversalLevelEngine } from './components/GameLevels';
import { Shield, ChevronLeft, Star, Award, Lock, Play, Skull, ScrollText, Target, Crosshair, Swords, Brain, Zap, Loader2, RefreshCw, Radio, FileText, ChevronRight, GraduationCap, Image as ImageIcon, Volume2, Pause, SkipForward, SkipBack, Info, Fingerprint, FileCheck, CheckCircle2, School, MousePointer2, Clock, AlertTriangle, XCircle, RotateCcw, MessageSquareQuote } from 'lucide-react';
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
    }, 20); // Faster typewriter
    
    return () => clearInterval(timer);
  }, [text]);

  return (
    <p className={className}>
      {displayText}
      <span className="animate-pulse ml-1 text-yellow-500">_</span>
    </p>
  );
};

const BackgroundPreloader = () => (
  <div className="fixed opacity-0 pointer-events-none -z-50 w-0 h-0 overflow-hidden">
    {RANDOM_BACKGROUNDS.map((url, i) => (
      <img key={i} src={url} alt="preload" />
    ))}
  </div>
);

const GlobalFooter = () => (
  <div className="fixed bottom-0 right-0 z-[100] flex items-center gap-1.5 px-3 py-1 bg-black/80 backdrop-blur-sm border-t border-l border-slate-700/50 rounded-tl-lg pointer-events-none pb-safe pr-safe">
    <div className="text-right">
      <p className="text-slate-400 text-[6px] md:text-[8px] leading-tight font-mono uppercase">Didukung Oleh:</p>
      <h3 className="text-white font-medium text-[8px] md:text-[10px] leading-tight uppercase font-ops">MGMP PAI SMP & Kemenag Kab. Mojokerto</h3>
    </div>
    <div className="h-4 md:h-5 w-px bg-slate-600"></div>
    <img src="https://iili.io/fcTD21f.png" alt="Logo" className="h-5 md:h-7 w-auto drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]" />
  </div>
);

// --- GALLERY COMPONENT ---

const GalleryScreen = ({ onBack }: { onBack: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  
  const currentItem = GALLERY_DATA[currentIndex];

  useEffect(() => {
    sfx.stopBGM();
    const softBgm = new Audio('https://upload.wikimedia.org/wikipedia/commons/e/e8/Oud_improvisation.ogg');
    softBgm.loop = true;
    softBgm.volume = 0.3;
    softBgm.play().catch(() => console.log("Auto-play blocked"));
    bgmRef.current = softBgm;

    return () => {
      softBgm.pause();
    };
  }, []);

  const nextItem = () => {
    sfx.click(); // Standard click first
    sfx.playOud();
    setCurrentIndex((prev) => (prev + 1) % GALLERY_DATA.length);
  };

  const prevItem = () => {
    sfx.click(); // Standard click first
    sfx.playOud();
    setCurrentIndex((prev) => (prev - 1 + GALLERY_DATA.length) % GALLERY_DATA.length);
  };

  return (
    <div className="h-[100dvh] w-full bg-slate-950 flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm scale-110 transition-all duration-1000" style={{ backgroundImage: `url('${currentItem.image}')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/90"></div>

        <div className="z-30 w-full px-3 py-2 md:px-4 md:py-3 flex justify-between items-center bg-black/60 backdrop-blur-md border-b border-white/10 shrink-0 pt-safe">
            <button onClick={() => { sfx.click(); onBack(); }} className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-full transition-all font-ops text-xs md:text-sm uppercase border border-transparent hover:border-slate-500">
                <ChevronLeft size={16} /> <span className="hidden sm:inline">Kembali</span>
            </button>
            <div className="flex gap-1">
                {GALLERY_DATA.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-4 md:w-6 bg-yellow-500 shadow-[0_0_8px_yellow]' : 'w-1.5 md:w-2 bg-slate-600'}`}></div>
                ))}
            </div>
        </div>

        <div className="flex-grow flex flex-col items-center justify-start p-4 overflow-y-auto gap-4 z-20 scrollbar-hide pb-24">
            <div className="w-full aspect-video max-h-[30vh] relative shrink-0 group rounded-xl overflow-hidden border-2 border-yellow-500/30 shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none"></div>
                 <img src={currentItem.image} alt={currentItem.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute bottom-3 left-3 z-20 bg-black/80 backdrop-blur px-3 py-1 border border-yellow-500/50 rounded text-yellow-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon size={12} /> {currentItem.category}
                 </div>
            </div>
            <div className="w-full flex flex-col gap-2">
                <div>
                     <div className="flex items-center gap-2 mb-1 opacity-70">
                        <div className="h-px w-6 bg-yellow-500"></div>
                        <span className="text-yellow-500 font-mono text-[10px] uppercase tracking-widest">DATA_ARCHIVE_0{currentIndex + 1}</span>
                     </div>
                     <h2 className="text-2xl md:text-4xl font-ops text-white uppercase leading-none tracking-tight text-fire drop-shadow-md">{currentItem.title}</h2>
                </div>
                <Panel className="border-l-2 md:border-l-4 border-yellow-500 bg-slate-900/60 backdrop-blur-md p-4 shadow-lg">
                    <TypewriterText text={currentItem.description} className="text-slate-300 text-xs md:text-base leading-relaxed italic font-serif" />
                </Panel>
            </div>
        </div>

        <div className="z-30 w-full bg-black/80 backdrop-blur-xl border-t border-white/10 p-3 shrink-0 flex items-center justify-center absolute bottom-0 pb-safe">
             <div className="flex gap-4 w-full max-w-lg">
                 <button onClick={prevItem} className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700 hover:border-yellow-500 rounded transition-all active:scale-95 flex justify-center items-center gap-2 group">
                    <SkipBack size={18} className="group-hover:-translate-x-1 transition-transform" /> <span className="font-ops tracking-wider text-sm">PREV</span>
                 </button>
                 <button onClick={nextItem} className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700 hover:border-yellow-500 rounded transition-all active:scale-95 flex justify-center items-center gap-2 group">
                    <span className="font-ops tracking-wider text-sm">NEXT</span> <SkipForward size={18} className="group-hover:translate-x-1 transition-transform" />
                 </button>
             </div>
        </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const TitleScreen = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
        style={{ backgroundImage: "url('https://iili.io/fcTZCa2.jpg')" }} 
      ></div>
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="scanlines"></div>
      
      <div className="z-20 text-center space-y-6 p-4 flex flex-col items-center h-full justify-center relative w-full pt-safe pb-safe">
        <div className="flex-grow flex flex-col justify-center items-center w-full max-w-4xl">
            <div className="flex items-center gap-2 mb-4 animate-in slide-in-from-top-10 fade-in duration-1000">
                <div className="h-px w-8 md:w-12 bg-yellow-500"></div>
                <span className="text-yellow-400 font-mono tracking-[0.3em] text-[10px] md:text-sm drop-shadow-md uppercase">Top Secret Intel</span>
                <div className="h-px w-8 md:w-12 bg-yellow-500"></div>
            </div>

            <div className="relative mb-2">
                <h1 className="text-5xl md:text-8xl font-ops animate-shine glitch-text drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] leading-none tracking-tighter" data-text="JEJAK">JEJAK</h1>
            </div>

            <h1 className="text-3xl md:text-6xl font-ops animate-shine drop-shadow-lg glitch-text leading-tight px-4" data-text="BANI ABBASIYAH">BANI ABBASIYAH</h1>
            
            <div className="mt-8 transform -skew-x-12 bg-slate-900/80 border-l-4 border-yellow-500 px-6 py-2 relative overflow-hidden group max-w-[80%]">
                 <div className="absolute inset-0 bg-yellow-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                 <p className="text-slate-200 tracking-[0.3em] text-xs md:text-lg font-mono">OPERATION: GOLDEN AGE</p>
            </div>
            
            <div className="mt-16 md:mt-20 relative group hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-yellow-500 blur-xl opacity-30 group-hover:opacity-60 transition-opacity rounded-full animate-pulse"></div>
                <TacticalButton onClick={() => { sfx.init(); sfx.click(); onStart(); }} className="scale-110 md:scale-125 border-yellow-400 text-lg md:text-xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500">
                    INISIASI MISI
                </TacticalButton>
            </div>
        </div>

        <div className="w-full max-w-2xl border-t border-slate-700/50 bg-black/80 backdrop-blur-md p-3 md:p-4 rounded-t-xl flex items-center justify-center gap-4 md:gap-6 animate-in slide-in-from-bottom-5 fade-in duration-1000 border-x border-slate-700/50 relative overflow-hidden mb-6 md:mb-0">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
            <div className="text-right">
                <p className="text-slate-400 text-[8px] md:text-[10px] font-mono mb-1 tracking-widest uppercase">Didukung Oleh:</p>
                <h3 className="text-white font-medium text-[9px] md:text-sm font-ops tracking-wide leading-tight uppercase">MGMP PAI SMP & Kemenag<br/>Kab. Mojokerto</h3>
            </div>
            <div className="h-8 md:h-10 w-px bg-slate-600"></div>
            <img src="https://iili.io/fcTD21f.png" alt="Logo Kemenag" className="h-8 md:h-14 w-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
  );
};

const LoginScreen = ({ onLogin }: { onLogin: (name: string, school: string) => void }) => {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  
  const handleInput = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    sfx.tick(); // Added sound effect when typing
  };

  return (
    <div className="h-[100dvh] w-full flex items-center justify-center bg-slate-900 relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-cover bg-center z-0 opacity-50" style={{ backgroundImage: "url('https://iili.io/fcu0G2t.jpg')" }}></div>
      <Panel className="w-full max-w-md z-10 border-t-4 border-t-yellow-500 shadow-2xl bg-slate-950/90 backdrop-blur-xl p-6">
        <div className="flex justify-center mb-4">
            <Fingerprint className="text-yellow-500 w-12 h-12 animate-pulse" />
        </div>
        <h2 className="text-2xl font-ops text-yellow-500 mb-6 text-center tracking-wider">IDENTITAS PENJELAJAH</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-slate-400 text-xs mb-1 ml-1 font-mono uppercase tracking-widest flex items-center gap-2">
                <Target size={12} /> Nama Agen
            </label>
            <input type="text" value={name} onChange={(e) => handleInput(setName, e.target.value)} className="w-full bg-slate-800 border-2 border-slate-600 p-3 text-white focus:border-yellow-500 focus:outline-none font-ops uppercase text-lg rounded-sm" placeholder="MASUKAN KODE NAMA..." autoFocus />
          </div>
          <div>
            <label className="block text-slate-400 text-xs mb-1 ml-1 font-mono uppercase tracking-widest flex items-center gap-2">
                <School size={12} /> Asal Sekolah
            </label>
            <input type="text" value={school} onChange={(e) => handleInput(setSchool, e.target.value)} className="w-full bg-slate-800 border-2 border-slate-600 p-3 text-white focus:border-yellow-500 focus:outline-none font-ops uppercase text-lg rounded-sm" placeholder="NAMA MARKAS / SEKOLAH..." />
          </div>
          <TacticalButton onClick={() => onLogin(name, school)} className="w-full mt-4 py-3 text-lg" disabled={!name || !school}>
             AKSES DATABASE
          </TacticalButton>
        </div>
      </Panel>
    </div>
  );
};

// --- NEW COMPONENT: MISSION OBJECTIVE ---
const MissionObjectiveScreen = ({ onNext }: { onNext: () => void }) => {
    return (
        <div className="h-[100dvh] w-full flex items-center justify-center bg-black relative overflow-hidden p-3 md:p-4">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')] opacity-20"></div>
             
             <div className="max-w-2xl w-full bg-slate-900/90 border border-slate-600 relative overflow-hidden flex flex-col h-[85vh] md:max-h-[80vh] rounded-lg shadow-2xl">
                 {/* Header */}
                 <div className="bg-yellow-600 p-3 flex justify-between items-center shrink-0">
                     <span className="font-ops text-black text-sm md:text-lg uppercase tracking-widest flex items-center gap-2">
                         <FileText size={16} /> MISSION BRIEFING
                     </span>
                     <div className="flex gap-1">
                         <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                         <div className="w-2 h-2 rounded-full bg-red-500"></div>
                     </div>
                 </div>

                 <div className="p-4 md:p-6 overflow-y-auto flex-grow scrollbar-hide">
                     <h2 className="text-xl md:text-3xl font-ops text-white mb-4 md:mb-6 text-center border-b border-slate-700 pb-4">
                         PROTOKOL OPERASI: <span className="text-yellow-500 block md:inline mt-1 md:mt-0">BANI ABBASIYAH</span>
                     </h2>

                     <div className="space-y-4 md:space-y-6">
                         <div className="flex gap-3 md:gap-4">
                             <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 bg-blue-900/50 border border-blue-500 flex items-center justify-center rounded text-blue-400 font-bold font-ops text-lg md:text-xl">01</div>
                             <div>
                                 <h3 className="text-blue-400 font-bold uppercase mb-0.5 md:mb-1 font-ops text-sm md:text-base">TARGET UTAMA</h3>
                                 <p className="text-slate-300 text-xs md:text-base leading-relaxed">
                                     Memahami semangat <span className="text-white font-bold">KEILMUAN</span> yang menjadi pondasi utama kejayaan peradaban Islam.
                                 </p>
                             </div>
                         </div>

                         <div className="flex gap-3 md:gap-4">
                             <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 bg-green-900/50 border border-green-500 flex items-center justify-center rounded text-green-400 font-bold font-ops text-lg md:text-xl">02</div>
                             <div>
                                 <h3 className="text-green-400 font-bold uppercase mb-0.5 md:mb-1 font-ops text-sm md:text-base">INTELIJEN SEJARAH</h3>
                                 <p className="text-slate-300 text-xs md:text-base leading-relaxed">
                                     Mengidentifikasi sejarah berdirinya <span className="text-white font-bold">Bani Abbasiyah</span> dan faktor kemajuan peradaban Islam (The Golden Age).
                                 </p>
                             </div>
                         </div>

                         <div className="flex gap-3 md:gap-4">
                             <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 bg-purple-900/50 border border-purple-500 flex items-center justify-center rounded text-purple-400 font-bold font-ops text-lg md:text-xl">03</div>
                             <div>
                                 <h3 className="text-purple-400 font-bold uppercase mb-0.5 md:mb-1 font-ops text-sm md:text-base">PROFIL TOKOH</h3>
                                 <p className="text-slate-300 text-xs md:text-base leading-relaxed">
                                     Menganalisis peran ilmuwan muslim seperti <span className="text-white font-bold">Al-Khawarizmi, Ibnu Sina,</span> dan para khalifah dalam pengembangan ilmu pengetahuan.
                                 </p>
                             </div>
                         </div>
                     </div>

                     <div className="mt-6 md:mt-8 bg-slate-800 p-3 border-l-4 border-yellow-500 text-[10px] md:text-sm text-slate-400 font-mono">
                         <Info size={14} className="inline mr-2 mb-1" />
                         CATATAN: Kegagalan dalam misi ini akan mengakibatkan hilangnya sejarah emas peradaban. Tetap fokus, Agen.
                     </div>
                 </div>

                 <div className="p-4 bg-black/50 border-t border-slate-700 flex justify-center shrink-0">
                     <TacticalButton onClick={onNext} className="w-full md:w-auto px-8 py-3 text-base md:text-lg animate-pulse">
                         TERIMA MISI
                     </TacticalButton>
                 </div>
             </div>
        </div>
    );
};

// --- NEW COMPONENT: GAME TUTORIAL ---
const GameTutorialScreen = ({ onNext }: { onNext: () => void }) => {
    return (
        <div className="h-[100dvh] w-full flex items-center justify-center bg-slate-900 relative overflow-hidden p-3 md:p-4">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            
            <div className="max-w-4xl w-full flex flex-col h-[90vh] md:h-auto">
                <h2 className="text-2xl md:text-5xl font-ops text-center text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-4 shrink-0">
                    MANUAL OPERASI
                </h2>

                <div className="flex-grow overflow-y-auto scrollbar-hide grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 pb-4">
                    {/* Card 1 */}
                    <Panel className="flex flex-col items-center text-center gap-2 md:gap-3 border-cyan-500/50 bg-slate-900/80 p-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-cyan-900/30 flex items-center justify-center border-2 border-cyan-400 shadow-[0_0_15px_cyan]">
                            <MousePointer2 className="text-cyan-400 w-6 h-6 md:w-8 md:h-8 animate-bounce" />
                        </div>
                        <h3 className="font-ops text-cyan-400 text-lg md:text-xl uppercase">EKSEKUSI DATA</h3>
                        <p className="text-slate-300 text-[10px] md:text-xs leading-relaxed">
                            Tap atau Klik pada jawaban yang benar untuk menghancurkan target. Kecepatan dan ketepatan adalah kunci.
                        </p>
                    </Panel>

                    {/* Card 2 */}
                    <Panel className="flex flex-col items-center text-center gap-2 md:gap-3 border-red-500/50 bg-slate-900/80 p-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-900/30 flex items-center justify-center border-2 border-red-500 shadow-[0_0_15px_red]">
                            <AlertTriangle className="text-red-500 w-6 h-6 md:w-8 md:h-8 animate-pulse" />
                        </div>
                        <h3 className="font-ops text-red-500 text-lg md:text-xl uppercase">HINDARI BAHAYA</h3>
                        <p className="text-slate-300 text-[10px] md:text-xs leading-relaxed">
                            Jawaban salah akan mengurangi HP (Health Point) Anda. Jika HP habis, misi gagal dan Anda harus mengulang.
                        </p>
                    </Panel>

                    {/* Card 3 */}
                    <Panel className="flex flex-col items-center text-center gap-2 md:gap-3 border-yellow-500/50 bg-slate-900/80 p-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-yellow-900/30 flex items-center justify-center border-2 border-yellow-400 shadow-[0_0_15px_yellow]">
                            <Clock className="text-yellow-400 w-6 h-6 md:w-8 md:h-8 animate-[spin_3s_linear_infinite]" />
                        </div>
                        <h3 className="font-ops text-yellow-400 text-lg md:text-xl uppercase">MANAJEMEN WAKTU</h3>
                        <p className="text-slate-300 text-[10px] md:text-xs leading-relaxed">
                            Setiap level memiliki batas waktu. Jawab secepat mungkin untuk mendapatkan BONUS SKOR yang besar.
                        </p>
                    </Panel>
                </div>

                <div className="flex justify-center mt-2 shrink-0 pb-safe">
                    <button onClick={onNext} className="group relative px-6 py-3 md:px-8 md:py-4 bg-transparent overflow-hidden rounded-lg w-full md:w-auto text-center">
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-600 to-lime-600 opacity-80 group-hover:opacity-100 transition-opacity clip-button"></div>
                        <div className="absolute inset-0 border-2 border-white/20 clip-button"></div>
                        <span className="relative flex items-center justify-center gap-3 text-white font-ops text-xl md:text-2xl tracking-widest uppercase">
                            <Crosshair className="group-hover:rotate-90 transition-transform" /> SIAP OPERASI
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const DifficultySelectScreen = ({ onSelect, onGallery }: { onSelect: (diff: Difficulty) => void, onGallery: () => void }) => {
    return (
        <div className="h-[100dvh] w-full bg-slate-900 flex flex-col items-center justify-center p-2 md:p-4 overflow-hidden relative">
             <div className="absolute inset-0 bg-cover bg-center z-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://iili.io/fcuagyJ.jpg')" }}></div>
             <div className="max-w-6xl w-full flex flex-col items-center z-10 h-full justify-center">
                <h2 className="text-2xl md:text-4xl font-ops text-white mb-4 md:mb-8 text-center uppercase tracking-tight drop-shadow-lg shrink-0">Pilih Tingkat Operasi</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4 w-full overflow-y-auto p-1 scrollbar-hide pb-20">
                    {/* Mode Easy */}
                    <button onClick={() => { sfx.click(); onSelect(Difficulty.EASY); }} className="bg-slate-800/80 border-2 border-green-600 hover:bg-slate-700 hover:scale-[1.02] transition-all p-3 md:p-4 rounded-lg group relative overflow-hidden flex flex-row md:flex-col justify-between items-center backdrop-blur-sm min-h-[80px] md:min-h-[120px]">
                        <div className="flex flex-row md:flex-col items-center gap-3 md:gap-2 flex-grow">
                             <Shield className="text-green-500 mb-0 shrink-0 w-6 h-6 md:w-8 md:h-8" />
                             <div className="text-left md:text-center">
                                <h3 className="text-lg md:text-xl font-ops text-green-500 uppercase leading-none mb-1">PEMULA</h3>
                                <p className="text-slate-400 text-[10px] md:text-xs leading-tight">Mengenal tokoh & peristiwa dasar.</p>
                             </div>
                        </div>
                        <div className="hidden md:block bg-green-900/40 py-1.5 mt-3 text-center text-green-400 font-ops text-xs border border-green-700 uppercase w-full">MULAI MISI</div>
                        <ChevronRight className="md:hidden text-green-500" size={20} />
                    </button>

                    {/* Mode Medium */}
                    <button onClick={() => { sfx.click(); onSelect(Difficulty.MEDIUM); }} className="bg-slate-800/80 border-2 border-yellow-600 hover:bg-slate-700 hover:scale-[1.02] transition-all p-3 md:p-4 rounded-lg group relative overflow-hidden flex flex-row md:flex-col justify-between items-center backdrop-blur-sm min-h-[80px] md:min-h-[120px]">
                        <div className="flex flex-row md:flex-col items-center gap-3 md:gap-2 flex-grow">
                             <Swords className="text-yellow-500 mb-0 shrink-0 w-6 h-6 md:w-8 md:h-8" />
                             <div className="text-left md:text-center">
                                <h3 className="text-lg md:text-xl font-ops text-yellow-500 uppercase leading-none mb-1">MENENGAH</h3>
                                <p className="text-slate-400 text-[10px] md:text-xs leading-tight">Analisis sejarah & pembangunan peradaban.</p>
                             </div>
                        </div>
                        <div className="hidden md:block bg-yellow-900/40 py-1.5 mt-3 text-center text-yellow-400 font-ops text-xs border border-yellow-700 uppercase w-full">MULAI MISI</div>
                        <ChevronRight className="md:hidden text-yellow-500" size={20} />
                    </button>

                    {/* Mode Hard */}
                    <button onClick={() => { sfx.click(); onSelect(Difficulty.HARD); }} className="bg-slate-800/80 border-2 border-red-600 hover:bg-slate-700 hover:scale-[1.02] transition-all p-3 md:p-4 rounded-lg group relative overflow-hidden flex flex-row md:flex-col justify-between items-center backdrop-blur-sm min-h-[80px] md:min-h-[120px]">
                        <div className="flex flex-row md:flex-col items-center gap-3 md:gap-2 flex-grow">
                             <Brain className="text-red-500 mb-0 shrink-0 w-6 h-6 md:w-8 md:h-8" />
                             <div className="text-left md:text-center">
                                <h3 className="text-lg md:text-xl font-ops text-red-500 uppercase leading-none mb-1">MAHIR</h3>
                                <p className="text-slate-400 text-[10px] md:text-xs leading-tight">Uji wawasan kritis & sains Abbasiyah.</p>
                             </div>
                        </div>
                        <div className="hidden md:block bg-red-900/40 py-1.5 mt-3 text-center text-red-400 font-ops text-xs border border-red-700 uppercase w-full">MULAI MISI</div>
                        <ChevronRight className="md:hidden text-red-500" size={20} />
                    </button>

                    {/* Mode Integrasi Sikap */}
                    <button onClick={() => { sfx.click(); onSelect(Difficulty.ETHICS); }} className="bg-slate-800/80 border-2 border-cyan-500 hover:bg-slate-700 hover:scale-[1.02] transition-all p-3 md:p-4 rounded-lg group relative overflow-hidden flex flex-row md:flex-col justify-between items-center backdrop-blur-sm min-h-[80px] md:min-h-[120px]">
                        <div className="flex flex-row md:flex-col items-center gap-3 md:gap-2 flex-grow">
                             <GraduationCap className="text-cyan-400 mb-0 shrink-0 w-6 h-6 md:w-8 md:h-8" />
                             <div className="text-left md:text-center">
                                <h3 className="text-lg md:text-xl font-ops text-cyan-400 uppercase leading-none mb-1">ADAB & SIKAP</h3>
                                <p className="text-slate-400 text-[10px] md:text-xs leading-tight">Misi Khusus: Keteladanan Tokoh & Integrasi Karakter.</p>
                             </div>
                        </div>
                        <div className="hidden md:block bg-cyan-900/40 py-1.5 mt-3 text-center text-cyan-400 font-ops text-xs border border-cyan-700 uppercase w-full">MULAI OPERASI</div>
                        <ChevronRight className="md:hidden text-cyan-400" size={20} />
                    </button>

                    {/* Gallery Mode */}
                    <button onClick={() => { sfx.click(); onGallery(); }} className="bg-slate-800/80 border-2 border-orange-500 hover:bg-slate-700 hover:scale-[1.02] transition-all p-3 md:p-4 rounded-lg group relative overflow-hidden flex flex-row md:flex-col justify-between items-center backdrop-blur-sm min-h-[80px] md:min-h-[120px] shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                        <div className="absolute top-0 right-0 bg-orange-500 text-black text-[8px] font-bold px-2 py-0.5 font-mono">NON-COMBAT</div>
                        <div className="flex flex-row md:flex-col items-center gap-3 md:gap-2 flex-grow">
                             <ImageIcon className="text-orange-400 mb-0 shrink-0 w-6 h-6 md:w-8 md:h-8" />
                             <div className="text-left md:text-center">
                                <h3 className="text-lg md:text-xl font-ops text-orange-400 uppercase leading-none mb-1">ARSIP VISUAL</h3>
                                <p className="text-slate-400 text-[10px] md:text-xs leading-tight">Visualisasi AI, Tokoh, & Kemajuan Abbasiyah.</p>
                             </div>
                        </div>
                        <div className="hidden md:block bg-orange-900/40 py-1.5 mt-3 text-center text-orange-400 font-ops text-xs border border-orange-700 uppercase w-full">BUKA ARSIP</div>
                        <ChevronRight className="md:hidden text-orange-400" size={20} />
                    </button>
                </div>
             </div>
        </div>
    );
}

const CharacterSelectScreen = ({ onSelect }: { onSelect: (charId: string) => void }) => {
    return (
        <div className="h-[100dvh] w-full bg-slate-900 flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center z-0 opacity-50 fixed" style={{ backgroundImage: "url('https://iili.io/fcuctVV.jpg')" }}></div>
            <div className="relative z-10 w-full flex flex-col items-center flex-grow overflow-y-auto p-3 pb-24 pt-safe">
                <h2 className="text-2xl md:text-4xl font-ops text-white mb-6 mt-4 text-center shrink-0 uppercase">Pilih Peran Operasi</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-6xl w-full px-1">
                    {CHARACTERS.map(char => (
                        <button key={char.id} onClick={() => { sfx.click(); onSelect(char.id); }} className="bg-slate-800/90 border-2 border-slate-600 hover:border-yellow-500 hover:bg-slate-700/90 transition-all p-3 md:p-4 rounded-lg flex flex-col items-center group relative overflow-hidden backdrop-blur-sm min-h-[150px]">
                            <img src={char.image} alt={char.name} className="w-16 h-16 md:w-32 md:h-32 mb-2 md:mb-4 drop-shadow-lg filter grayscale group-hover:grayscale-0 transition-all object-contain" />
                            <h3 className="text-sm md:text-xl font-ops text-yellow-500 leading-tight uppercase mb-1">{char.name}</h3>
                            <div className="text-slate-400 text-[10px] md:text-sm font-mono leading-tight uppercase mb-2">{char.role}</div>
                            <div className="mt-auto bg-black/40 px-2 py-1 rounded text-[8px] md:text-xs text-green-400 border border-green-900 w-full text-center">PERK: {char.perk}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const MapScreen = ({ user, onLogout, onStartLevel }: { user: UserProfile, onLogout: () => void, onStartLevel: (id: number) => void }) => {
    const char = CHARACTERS.find(c => c.id === user.characterId) || CHARACTERS[0];
    const diffColor = user.difficulty === Difficulty.HARD ? 'text-red-500' : user.difficulty === Difficulty.MEDIUM ? 'text-yellow-500' : user.difficulty === Difficulty.ETHICS ? 'text-cyan-400' : 'text-green-500';

    const nodes = [
        { x: 15, y: 75 }, { x: 30, y: 50 }, { x: 20, y: 25 }, { x: 50, y: 15 }, { x: 80, y: 25 }, { x: 70, y: 55 }, { x: 85, y: 80 }
    ];

    return (
        <div className="h-[100dvh] w-full bg-slate-950 flex flex-col overflow-hidden">
            <div className="bg-black/90 px-4 py-2 border-b border-slate-700 flex justify-between items-center z-50 shadow-xl h-14 md:h-16 shrink-0 pt-safe">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-yellow-500 p-0.5 bg-slate-800">
                        <img src={char.image} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="font-ops text-white text-sm md:text-base leading-none uppercase">{user.username}</h3>
                        <div className="flex gap-2 items-center">
                            <RankBadge rank={user.rank} />
                            <span className={`font-mono text-[8px] md:text-[10px] ${diffColor} font-bold`}>{user.difficulty}</span>
                        </div>
                    </div>
                </div>
                <button onClick={() => { sfx.click(); onLogout(); }} className="text-slate-500 hover:text-white transition-colors flex items-center gap-2">
                    <Radio size={14} className="animate-pulse" />
                    <span className="font-ops text-xs uppercase hidden md:inline">Putus Kontak</span>
                </button>
            </div>
            <div className="flex-grow relative w-full overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-cover bg-center opacity-30 brightness-50" style={{ backgroundImage: "url('https://iili.io/fcuagyJ.jpg')" }}></div>
                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-visible">
                    {nodes.slice(0, -1).map((node, i) => {
                        const next = nodes[i + 1];
                        return <line key={i} x1={`${node.x}%`} y1={`${node.y}%`} x2={`${next.x}%`} y2={`${next.y}%`} stroke={i < user.levelProgress ? '#facc15' : '#334155'} strokeWidth={i === user.levelProgress - 1 ? "4" : "2"} strokeDasharray={i < user.levelProgress ? "0" : "8,8"} className={i === user.levelProgress - 1 ? "animate-path-dash" : ""} />;
                    })}
                </svg>
                <div className="absolute inset-0 z-20 mb-16">
                    {LEVEL_CONFIGS.map((level, i) => {
                        const pos = nodes[i];
                        const isLocked = i > user.levelProgress;
                        const isCompleted = i < user.levelProgress;
                        const isCurrent = i === user.levelProgress;
                        return (
                            <div key={level.id} className="absolute -translate-x-1/2 -translate-y-1/2 group" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
                                <button onClick={() => { if(!isLocked) { sfx.click(); onStartLevel(level.id); }}} disabled={isLocked} className={`relative flex items-center justify-center transition-all duration-300 ${isLocked ? 'scale-75 opacity-50 grayscale' : 'hover:scale-125'}`}>
                                    {isCurrent && <div className="absolute inset-0 scale-[2.5] bg-lime-500/20 rounded-full animate-ping"></div>}
                                    <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center shadow-lg backdrop-blur-sm z-30 transition-colors ${isCompleted ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500' : isCurrent ? 'bg-lime-500/30 border-lime-400 text-lime-400 animate-pulse' : 'bg-slate-800/80 border-slate-600 text-slate-600'}`}>
                                        {isLocked ? <Lock size={16} /> : isCompleted ? <Star size={18} fill="currentColor" /> : <Crosshair size={22} />}
                                    </div>
                                    {isCurrent && <div className="absolute top-full mt-2 bg-black/80 text-lime-400 text-[10px] font-ops px-2 py-1 rounded border border-lime-500 whitespace-nowrap z-50 animate-bounce">{level.title}</div>}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// --- RESTORED BRIEFING SCREEN (DOSSIER STYLE) ---
const LevelIntroScreen = ({ levelId, user, onStart }: { levelId: number, user: UserProfile, onStart: () => void }) => {
  const level = LEVEL_CONFIGS.find(l => l.id === levelId);
  if (!level) return null;
  return (
      <div className="h-[100dvh] w-full flex items-center justify-center relative overflow-hidden bg-black p-3 md:p-4">
           {/* Background Texture */}
           <div className="absolute inset-0 bg-cover bg-center transition-all opacity-40 blur-sm" style={{ backgroundImage: `url('${level.image}')` }}></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
           
           {/* Briefing Dossier - Mobile Optimized */}
           <div className="relative z-20 max-w-3xl w-full h-[85vh] md:max-h-[80vh] bg-slate-900/90 border-2 border-slate-600 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col overflow-hidden rounded-sm">
                {/* Header */}
                <div className="bg-yellow-600 p-3 flex justify-between items-center border-b-4 border-black shrink-0">
                     <span className="font-ops text-black text-xs md:text-xl uppercase tracking-widest flex items-center gap-2"><Lock size={14} className="md:w-[18px]" /> TOP SECRET</span>
                     <span className="font-mono text-black text-[10px] md:text-xs font-bold">AUTH: {user.username.toUpperCase()}</span>
                </div>
                
                {/* Scrollable Content for Mobile */}
                <div className="p-4 md:p-8 flex flex-col gap-4 relative overflow-y-auto flex-grow scrollbar-hide">
                     {/* Stamps */}
                     <div className="absolute top-4 right-4 md:top-10 md:right-10 border-4 border-red-500/30 text-red-500/30 font-ops text-xl md:text-4xl uppercase -rotate-12 p-2 pointer-events-none">CONFIDENTIAL</div>

                     <div className="flex flex-col md:flex-row gap-4 border-b border-slate-700 pb-4">
                        <div className="w-full md:w-1/3 shrink-0">
                             <div className="w-full h-32 md:h-auto aspect-video md:aspect-square bg-black border border-slate-600 relative overflow-hidden">
                                 <img src={level.image} className="w-full h-full object-cover grayscale opacity-70" alt="Mission" />
                                 <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]"></div>
                             </div>
                             <div className="mt-1 md:mt-2 text-[9px] md:text-[10px] font-mono text-yellow-500 uppercase tracking-widest text-center">Sat-Img: {level.title}</div>
                        </div>
                        <div className="w-full md:w-2/3 flex flex-col justify-center">
                            <h4 className="text-slate-500 font-mono text-[10px] md:text-xs uppercase mb-0.5">Mission Objective:</h4>
                            <h1 className="text-2xl md:text-5xl font-ops text-white uppercase leading-none mb-1 md:mb-2">{level.title}</h1>
                            <h2 className="text-sm md:text-2xl font-bold text-yellow-500 uppercase tracking-widest mb-2 md:mb-4">{level.subtitle}</h2>
                        </div>
                     </div>
                     
                     {/* UPDATED FONT SIZE HERE */}
                     <div className="font-mono text-green-400 text-xl md:text-4xl leading-relaxed">
                        <span className="text-slate-500 mr-2">{'>'}</span>
                        <TypewriterText text={level.description} />
                     </div>
                </div>

                {/* Footer Actions */}
                <div className="bg-black/50 p-3 md:p-4 border-t border-slate-700 flex justify-end shrink-0">
                     <TacticalButton onClick={onStart} className="w-full md:w-auto px-6 md:px-12 py-3 md:py-4 text-base md:text-xl uppercase tracking-widest border-l-4 md:border-l-8 border-yellow-500 animate-pulse">
                        INITIATE MISSION
                     </TacticalButton>
                </div>
           </div>
      </div>
  );
};

const GameplayScreen = ({ levelId, user, onAbort, onComplete, bgImage }: { levelId: number, user: UserProfile, onAbort: () => void, onComplete: (score: number, remainingHp: number, isSuccess: boolean) => void, bgImage: string }) => {
  const [hp, setHp] = useState(100);
  const [isLevelFinished, setIsLevelFinished] = useState(false);
  const [finalGameScore, setFinalGameScore] = useState(0);
  const [randomizedData, setRandomizedData] = useState<Question[]>([]);
  const [hasFailed, setHasFailed] = useState(false);
  
  const currentLevelConfig = LEVEL_CONFIGS.find(l => l.id === levelId);

  useEffect(() => {
    const rawData = GAME_DATA[user.difficulty][levelId] || [];
    
    // 1. Shuffle Questions
    const shuffledQuestions = [...rawData].sort(() => Math.random() - 0.5);

    // 2. Shuffle Options within each question
    const processedData = shuffledQuestions.map(q => {
        // Pair options with their original correctness
        const optionsWithKey = q.options.map((opt, index) => ({
            text: opt,
            isCorrect: index === q.correctIndex
        }));

        // Shuffle the options array
        const shuffledOptions = optionsWithKey.sort(() => Math.random() - 0.5);

        // Find the new correct index
        const newCorrectIndex = shuffledOptions.findIndex(o => o.isCorrect);

        return {
            ...q,
            options: shuffledOptions.map(o => o.text),
            correctIndex: newCorrectIndex
        };
    });

    setRandomizedData(processedData);
  }, [levelId, user.difficulty]);

  // Monitor HP for Game Over
  useEffect(() => {
      if (hp <= 0 && !hasFailed && !isLevelFinished) {
          setHasFailed(true);
          sfx.error();
          sfx.stopBGM();
      }
  }, [hp, hasFailed, isLevelFinished]);

  const handleLevelComplete = (score: number) => { 
      sfx.stopBGM(); 
      setFinalGameScore(score); 
      setIsLevelFinished(true); 
  };
  
  const handleDamage = () => setHp(prev => Math.max(0, prev - 20));

  if (hasFailed) {
      return (
        <div className="h-[100dvh] w-full bg-slate-950 flex items-center justify-center p-4">
            <Panel className="text-center w-full max-w-md z-10 border-red-500 animate-in zoom-in duration-300">
                <div className="flex justify-center mb-4">
                    <XCircle className="text-red-500 w-20 h-20 animate-pulse" />
                </div>
                <h2 className="text-4xl font-ops text-white mb-2 uppercase tracking-widest text-red-500">MISSION FAILED</h2>
                <div className="h-1 w-24 bg-red-500 mx-auto mb-6"></div>
                <p className="text-slate-300 font-mono mb-6">Sinyal kehidupan agen hilang. Operasi dibatalkan.</p>
                <TacticalButton onClick={() => onComplete(0, 0, false)} className="w-full py-5 text-2xl bg-red-600 hover:bg-red-500 border-red-400">REPORT FAILURE</TacticalButton>
            </Panel>
        </div>
      );
  }

  if (isLevelFinished) {
      return (
        <div className="h-[100dvh] w-full bg-slate-950 flex items-center justify-center p-4">
            <Panel className="text-center w-full max-w-md z-10 border-lime-500 animate-in zoom-in duration-300">
                <div className="flex justify-center mb-4">
                    <CheckCircle2 className="text-lime-500 w-20 h-20 animate-bounce" />
                </div>
                <h2 className="text-4xl font-ops text-white mb-2 uppercase tracking-widest">MISSION ACCOMPLISHED</h2>
                <div className="h-1 w-24 bg-lime-500 mx-auto mb-6"></div>
                <TacticalButton onClick={() => onComplete(finalGameScore, hp, true)} className="w-full py-5 text-2xl">GENERATE REPORT</TacticalButton>
            </Panel>
        </div>
      );
  }

  return (
      <div className="h-[100dvh] w-full relative flex flex-col overflow-hidden bg-slate-950">
          <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale-[50%]" style={{ backgroundImage: `url('${bgImage}')` }}></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="bg-black/90 p-2 md:p-3 border-b border-slate-700 flex justify-between items-center h-14 shrink-0 shadow-lg z-50 pt-safe">
                <button onClick={() => { sfx.click(); onAbort(); }} className="flex items-center text-slate-400 hover:text-red-400 uppercase text-xs font-ops gap-1 transition-colors"><ChevronLeft size={16} /> ABORT</button>
                <HealthBar hp={hp} maxHp={100} />
            </div>
            <div className="flex-grow overflow-hidden relative">
                {randomizedData.length > 0 && (
                    <UniversalLevelEngine 
                        data={randomizedData} 
                        user={user} 
                        levelId={levelId} 
                        levelType={currentLevelConfig?.type || LevelType.RAPID_FIRE}
                        onComplete={handleLevelComplete} 
                        onDamage={handleDamage} 
                    />
                )}
            </div>
          </div>
      </div>
  );
};

// --- RESTORED EVALUATION SCREEN (INTEL REPORT STYLE) ---
const EvaluationScreen = ({ score, percentage, isSuccess, onContinue, onRetry }: { score: number, percentage: number, isSuccess: boolean, onContinue: () => void, onRetry: () => void }) => {
    // Pesan Motivasi untuk yang Gagal
    const FAILURE_QUOTES = [
        "Kegagalan adalah guru terbaik. Analisis kesalahanmu dan bangkit kembali.",
        "Sejarah tidak ditulis oleh mereka yang mudah menyerah. Coba lagi, Agen!",
        "Fokusmu terganggu. Tarik napas, dan ulangi misi dengan strategi baru.",
        "Bani Abbasiyah mencapai kejayaan melalui ketekunan. Tiru semangat mereka!",
        "Jangan biarkan satu kekalahan menghentikan pencarian ilmu. Ulangi operasi!",
        "Ilmuwan besar seperti Al-Biruni tak pernah lelah mencoba. Kamu pasti bisa!",
        "Kekalahan hari ini adalah kemenangan hari esok yang tertunda. Semangat!"
    ];

    // Pesan Pujian untuk yang Sukses
    const SUCCESS_QUOTES = [
        "Kerja luar biasa, Agen. Data sejarah berhasil diamankan dengan sempurna.",
        "Analisis taktis yang brilian! Peradaban semakin terang berkat usahamu.",
        "Kemampuanmu setara dengan cendekiawan Bayt al-Hikmah. Pertahankan!",
        "Misi selesai tanpa cela. Markas besar bangga padamu.",
        "Wawasanmu tajam seperti pedang Damaskus. Lanjutkan ke sektor berikutnya."
    ];

    const [message] = useState(() => isSuccess 
        ? SUCCESS_QUOTES[Math.floor(Math.random() * SUCCESS_QUOTES.length)]
        : FAILURE_QUOTES[Math.floor(Math.random() * FAILURE_QUOTES.length)]
    );

    return (
    <div className="h-[100dvh] w-full bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* BG Tech */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
        
        <div className="max-w-xl w-full bg-white text-black p-1 shadow-2xl rotate-1 relative animate-in zoom-in-95 duration-500">
            {/* Paper Clip Visual */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-12 bg-gray-400 rounded-full border-4 border-gray-600 z-50"></div>

            <div className="border-4 border-double border-slate-800 p-4 md:p-8 flex flex-col gap-4 bg-slate-50 relative">
                {/* Stamps */}
                {isSuccess ? (
                     <div className="absolute bottom-20 right-4 md:bottom-10 md:right-10 border-8 border-green-600 text-green-600 font-ops text-4xl md:text-6xl uppercase -rotate-12 p-2 md:p-4 opacity-50 mix-blend-multiply pointer-events-none animate-in zoom-in duration-1000 delay-500">APPROVED</div>
                ) : (
                     <div className="absolute bottom-20 right-4 md:bottom-10 md:right-10 border-8 border-red-600 text-red-600 font-ops text-4xl md:text-6xl uppercase -rotate-12 p-2 md:p-4 opacity-50 mix-blend-multiply pointer-events-none animate-in zoom-in duration-1000 delay-500">REJECTED</div>
                )}
                
                <div className="flex justify-between items-end border-b-2 border-black pb-4 mt-4">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-ops uppercase tracking-tighter">INTEL REPORT</h1>
                        <p className="font-mono text-[10px] md:text-xs text-slate-600 uppercase">CLASSIFICATION: TOP SECRET // EYES ONLY</p>
                    </div>
                    <Fingerprint className="text-slate-800 w-12 h-12 md:w-16 md:h-16 opacity-20" />
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-dotted border-slate-400 pb-2">
                        <span className="font-mono font-bold uppercase text-sm">MISSION STATUS</span>
                        <span className={`font-ops text-lg md:text-xl ${isSuccess ? 'text-green-700' : 'text-red-600'}`}>
                            {isSuccess ? 'SUCCESSFUL' : 'FAILED'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-dotted border-slate-400 pb-2">
                        <span className="font-mono font-bold uppercase text-sm">INTEL GATHERED</span>
                        <span className="font-ops text-lg md:text-xl">{percentage}%</span>
                    </div>
                    
                    {/* COMMANDER NOTE SECTION */}
                    <div className={`p-4 border-l-4 ${isSuccess ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'} relative mt-2`}>
                        <div className="absolute -top-3 left-4 bg-white px-2 text-[10px] font-bold font-ops uppercase tracking-widest border border-slate-200 text-slate-500 flex items-center gap-1">
                             <MessageSquareQuote size={12} /> COMMANDER'S NOTE
                        </div>
                        <p className={`font-serif italic text-sm md:text-lg leading-relaxed ${isSuccess ? 'text-green-800' : 'text-red-800'}`}>
                            "{message}"
                        </p>
                    </div>

                    <div className="bg-slate-200 p-4 border border-slate-400 mt-2">
                        <span className="font-mono text-xs block text-slate-500 mb-1">TOTAL PERFORMANCE SCORE</span>
                        <div className="text-5xl md:text-6xl font-ops text-slate-900">{score}</div>
                    </div>
                </div>

                <div className="mt-2 pt-4 border-t-2 border-black flex justify-center z-10">
                    {isSuccess ? (
                        <button onClick={() => { sfx.click(); onContinue(); }} className="bg-black text-white font-ops text-lg md:text-xl px-6 md:px-8 py-3 hover:bg-slate-800 transition-colors uppercase tracking-widest flex items-center gap-2 w-full md:w-auto justify-center shadow-lg hover:shadow-xl hover:-translate-y-1">
                            <FileCheck size={20} /> File & Continue
                        </button>
                    ) : (
                        <button onClick={() => { sfx.click(); onRetry(); }} className="bg-red-700 text-white font-ops text-lg md:text-xl px-6 md:px-8 py-3 hover:bg-red-800 transition-colors uppercase tracking-widest flex items-center gap-2 w-full md:w-auto justify-center shadow-lg hover:shadow-xl hover:-translate-y-1">
                            <RotateCcw size={20} /> RETRY MISSION
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

// --- APP COMPONENT ---

const App = () => {
  const [screen, setScreen] = useState<ScreenState>(ScreenState.TITLE);
  const [user, setUser] = useState<UserProfile>({
    username: '',
    school: '',
    rank: 'REKRUT',
    score: 0,
    levelProgress: 0, // UPDATED: Starts at 0
    difficulty: Difficulty.EASY
  });
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [gameResult, setGameResult] = useState<{score: number, hp: number, isSuccess: boolean} | null>(null);

  const calculateRank = (score: number) => {
      if (score > 8000) return "CENDEKIAWAN UTAMA";
      if (score > 5000) return "PENJELAJAH ILMU";
      if (score > 2000) return "PENCARI FAKTA";
      return "REKRUT";
  };

  const handleLogin = (name: string, school: string) => {
    setUser(prev => ({ ...prev, username: name, school }));
    setScreen(ScreenState.MISSION);
  };

  const handleGameplayComplete = (score: number, remainingHp: number, isSuccess: boolean) => {
    // FIX: Score is just the score from GameLevels (20 pts per question)
    // We do NOT add remainingHp * 10 if we want a clean 0-100 scale based on 5 questions.
    const finalScore = score; 

    // Dynamic Calculation of Total Questions for Percentage
    const currentLevelData = GAME_DATA[user.difficulty][currentLevelId];
    const totalQuestions = currentLevelData ? currentLevelData.length : 5; // Default to 5 if not found
    const maxPossibleScore = totalQuestions * 20;

    // Calculate strict percentage
    // If user gets all right: 100 / 100 * 100 = 100%
    const percentage = Math.min(100, Math.round((finalScore / maxPossibleScore) * 100)); 
    
    // SUCCESS LOGIC: Must be alive AND have gathered at least 80% intel
    const effectiveSuccess = isSuccess && percentage >= 80;

    setGameResult({ score: finalScore, hp: remainingHp, isSuccess: effectiveSuccess });
    
    if (effectiveSuccess) {
      if (currentLevelId === LEVEL_CONFIGS.length) {
        confetti({
          particleCount: 200,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#fbbf24', '#f59e0b', '#d97706']
        });
      }

      setUser(prev => ({
        ...prev,
        score: prev.score + finalScore,
        // UPDATED: Logic to ensure level progress always moves forward based on ID completed
        levelProgress: Math.max(prev.levelProgress, currentLevelId),
        rank: calculateRank(prev.score + finalScore)
      }));
    }
    setScreen(ScreenState.EVALUATION);
  };

  return (
    <>
      <BackgroundPreloader />
      
      {screen === ScreenState.TITLE && <TitleScreen onStart={() => setScreen(ScreenState.LOGIN)} />}
      
      {screen === ScreenState.LOGIN && <LoginScreen onLogin={handleLogin} />}
      
      {screen === ScreenState.MISSION && <MissionObjectiveScreen onNext={() => setScreen(ScreenState.TUTORIAL)} />}
      
      {screen === ScreenState.TUTORIAL && <GameTutorialScreen onNext={() => setScreen(ScreenState.DIFFICULTY_SELECT)} />}
      
      {screen === ScreenState.DIFFICULTY_SELECT && (
        <DifficultySelectScreen 
          onSelect={(diff) => {
            setUser(prev => ({ ...prev, difficulty: diff }));
            setScreen(ScreenState.CHARACTER_SELECT);
          }}
          onGallery={() => setScreen(ScreenState.GALLERY)}
        />
      )}

      {screen === ScreenState.GALLERY && <GalleryScreen onBack={() => setScreen(ScreenState.DIFFICULTY_SELECT)} />}
      
      {screen === ScreenState.CHARACTER_SELECT && (
        <CharacterSelectScreen 
          onSelect={(charId) => {
            setUser(prev => ({ ...prev, characterId: charId }));
            setScreen(ScreenState.MAP);
          }}
        />
      )}
      
      {screen === ScreenState.MAP && (
        <MapScreen 
          user={user} 
          onLogout={() => setScreen(ScreenState.TITLE)}
          onStartLevel={(id) => {
            setCurrentLevelId(id);
            setScreen(ScreenState.LEVEL_INTRO);
          }}
        />
      )}
      
      {screen === ScreenState.LEVEL_INTRO && (
        <LevelIntroScreen 
          levelId={currentLevelId} 
          user={user} 
          onStart={() => {
            setScreen(ScreenState.GAMEPLAY);
            sfx.playBGM();
          }}
        />
      )}
      
      {screen === ScreenState.GAMEPLAY && (
        <GameplayScreen 
          levelId={currentLevelId} 
          user={user}
          onAbort={() => {
            sfx.stopBGM();
            setScreen(ScreenState.MAP);
          }}
          onComplete={handleGameplayComplete}
          bgImage={LEVEL_CONFIGS.find(l => l.id === currentLevelId)?.image || ""}
        />
      )}
      
      {screen === ScreenState.EVALUATION && gameResult && (
        <EvaluationScreen 
          score={gameResult.score}
          // Pass the pre-calculated strict percentage
          percentage={Math.min(100, Math.round((gameResult.score / ((GAME_DATA[user.difficulty][currentLevelId]?.length || 5) * 20)) * 100))}
          isSuccess={gameResult.isSuccess}
          onContinue={() => {
            sfx.stopBGM();
            setScreen(ScreenState.MAP);
          }}
          onRetry={() => {
            setScreen(ScreenState.LEVEL_INTRO);
          }}
        />
      )}

      <GlobalFooter />
    </>
  );
};

export default App;
