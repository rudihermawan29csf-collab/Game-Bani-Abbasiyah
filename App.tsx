
import React, { useState, useEffect, useRef } from 'react';
import { ScreenState, UserProfile, Difficulty, Question, GalleryItem } from './types';
import { 
  LEVEL_CONFIGS, CHARACTERS, GAME_DATA, RANDOM_BACKGROUNDS, GALLERY_DATA 
} from './constants';
import { TacticalButton, Panel, RankBadge, HealthBar } from './components/UI';
import { UniversalLevelEngine } from './components/GameLevels';
import { Shield, ChevronLeft, Star, Award, Lock, Play, Skull, ScrollText, Target, Crosshair, Swords, Brain, Zap, Loader2, RefreshCw, Radio, FileText, ChevronRight, GraduationCap, Image as ImageIcon, Volume2, Pause, SkipForward, SkipBack, Info } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from './audio';
import { GoogleGenAI, Modality } from "@google/genai";

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
    }, 30);
    
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
  <div className="fixed bottom-1 right-1 z-[100] flex items-center gap-1.5 px-2 py-1 bg-black/60 backdrop-blur-sm border border-slate-700/50 rounded-sm pointer-events-none md:bottom-2 md:right-2">
    <div className="text-right">
      <p className="text-slate-400 text-[6px] md:text-[8px] leading-tight font-mono uppercase">Didukung Oleh:</p>
      <h3 className="text-white font-medium text-[7px] md:text-[9px] leading-tight uppercase font-ops">MGMP PAI SMP & Kemenag Kab. Mojokerto</h3>
    </div>
    <div className="h-3 md:h-4 w-px bg-slate-600"></div>
    <img src="https://iili.io/fcTD21f.png" alt="Logo" className="h-4 md:h-6 w-auto drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]" />
  </div>
);

// --- GALLERY COMPONENT ---

const GalleryScreen = ({ onBack }: { onBack: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioCache, setAudioCache] = useState<Record<string, AudioBuffer>>({});
  const [loadingAudio, setLoadingAudio] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  
  const currentItem = GALLERY_DATA[currentIndex];

  // Initialize Audio Context and BGM
  useEffect(() => {
    sfx.stopBGM();
    // Authentic Oud / Arabian Music (Royalty Free from Wikimedia Commons)
    const softBgm = new Audio('https://upload.wikimedia.org/wikipedia/commons/e/e8/Oud_improvisation.ogg');
    softBgm.loop = true;
    softBgm.volume = 0.3;
    softBgm.play().catch(() => console.log("Auto-play blocked"));
    bgmRef.current = softBgm;

    if (!audioContextRef.current) {
       const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
       if (AudioContextClass) audioContextRef.current = new AudioContextClass({ sampleRate: 24000 });
    }
    
    return () => {
      softBgm.pause();
      if (currentSourceRef.current) currentSourceRef.current.stop();
    };
  }, []);

  // PRE-FETCH AUDIO LOGIC (NO DELAY)
  useEffect(() => {
    const fetchAudio = async () => {
        const id = currentItem.id;
        // If already cached or currently fetching this exact item (simple check), skip
        if (audioCache[id]) return;

        setLoadingAudio(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-tts",
                contents: [{ parts: [{ text: `Bacakan dengan intonasi bercerita yang tenang: ${currentItem.title}. ${currentItem.description}` }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
                },
            });

            const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current) {
                const audioData = atob(base64Audio);
                const arrayBuffer = new ArrayBuffer(audioData.length);
                const view = new Uint8Array(arrayBuffer);
                for (let i = 0; i < audioData.length; i++) view[i] = audioData.charCodeAt(i);

                const dataInt16 = new Int16Array(arrayBuffer);
                const buffer = audioContextRef.current.createBuffer(1, dataInt16.length, 24000);
                const channelData = buffer.getChannelData(0);
                for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;

                setAudioCache(prev => ({ ...prev, [id]: buffer }));
            }
        } catch (e) {
            console.error("Audio pre-fetch failed", e);
        } finally {
            setLoadingAudio(false);
        }
    };
    
    fetchAudio();
  }, [currentIndex, currentItem, audioCache]);

  const handleSpeak = () => {
    if (isSpeaking) {
      if (currentSourceRef.current) {
        currentSourceRef.current.stop();
        setIsSpeaking(false);
      }
      return;
    }

    const buffer = audioCache[currentItem.id];
    if (buffer && audioContextRef.current) {
        setIsSpeaking(true);
        const source = audioContextRef.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContextRef.current.destination);
        source.onended = () => setIsSpeaking(false);
        currentSourceRef.current = source;
        source.start();
    }
  };

  const nextItem = () => {
    if (currentSourceRef.current) { currentSourceRef.current.stop(); setIsSpeaking(false); }
    setCurrentIndex((prev) => (prev + 1) % GALLERY_DATA.length);
  };

  const prevItem = () => {
    if (currentSourceRef.current) { currentSourceRef.current.stop(); setIsSpeaking(false); }
    setCurrentIndex((prev) => (prev - 1 + GALLERY_DATA.length) % GALLERY_DATA.length);
  };

  const isAudioReady = !!audioCache[currentItem.id];

  return (
    <div className="h-[100dvh] w-full bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm scale-110 transition-all duration-1000" style={{ backgroundImage: `url('${currentItem.image}')` }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
      
      <div className="z-20 w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-center h-full max-h-[85vh]">
        {/* Visual Content */}
        <div className="w-full lg:w-1/2 h-[40vh] lg:h-full max-h-[500px] relative group flex-shrink-0">
          <div className="absolute -inset-2 bg-yellow-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <img src={currentItem.image} alt={currentItem.title} className="w-full h-full object-cover border-2 border-yellow-500/50 rounded-lg shadow-2xl relative z-10" />
          <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 border border-yellow-500/30 rounded text-yellow-500 font-mono text-xs uppercase tracking-widest">
            {currentItem.category}
          </div>
        </div>

        {/* Textual Info */}
        <div className="w-full lg:w-1/2 flex flex-col h-full lg:justify-center overflow-y-auto lg:overflow-visible">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-px w-8 bg-yellow-500"></div>
            <span className="text-yellow-500 font-mono text-xs uppercase tracking-widest">Visual Archive {String(currentIndex + 1).padStart(2, '0')}/{GALLERY_DATA.length}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-ops text-white mb-6 uppercase tracking-tight leading-none text-fire drop-shadow-lg">{currentItem.title}</h2>
          
          <Panel className="border-l-4 border-yellow-500 bg-slate-900/60 mb-8 backdrop-blur-xl shadow-2xl">
            <TypewriterText text={currentItem.description} className="text-slate-200 text-lg md:text-2xl leading-relaxed italic font-serif" />
          </Panel>

          <div className="flex flex-col md:flex-row gap-4 items-center mt-auto pb-4 lg:pb-0">
            <TacticalButton 
                onClick={handleSpeak} 
                disabled={!isAudioReady && !isSpeaking}
                className={`flex items-center justify-center gap-3 px-6 py-4 w-full md:w-auto transition-all duration-300 ${isSpeaking ? 'bg-red-600 border-red-400 animate-pulse' : isAudioReady ? 'bg-yellow-600 border-yellow-400 hover:scale-105' : 'bg-slate-700 border-slate-500 opacity-70'}`}
            >
              {isSpeaking ? <Pause size={24} /> : !isAudioReady ? <Loader2 size={24} className="animate-spin" /> : <Volume2 size={24} />}
              <span className="text-lg">{isSpeaking ? 'Hentikan Narasi' : !isAudioReady ? 'Memuat Suara...' : 'Dengarkan Narasi'}</span>
            </TacticalButton>
            
            <div className="flex gap-2 w-full md:w-auto ml-auto justify-center">
              <button onClick={prevItem} className="p-4 bg-slate-800 border-2 border-slate-600 text-white hover:bg-slate-700 hover:border-yellow-500 rounded-lg transition-all active:scale-95">
                <SkipBack size={28} />
              </button>
              <button onClick={nextItem} className="p-4 bg-slate-800 border-2 border-slate-600 text-white hover:bg-slate-700 hover:border-yellow-500 rounded-lg transition-all active:scale-95">
                <SkipForward size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation & Controls */}
      <button onClick={onBack} className="absolute top-4 left-4 z-30 flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-black/40 px-4 py-2 rounded-full border border-slate-700 backdrop-blur-md font-ops uppercase text-sm hover:bg-red-900/50 hover:border-red-500">
        <ChevronLeft size={20} /> Kembali ke Markas
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 p-2 bg-black/40 rounded-full backdrop-blur-sm">
        {GALLERY_DATA.map((_, i) => (
          <div key={i} className={`h-1.5 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-8 bg-yellow-500 shadow-[0_0_10px_yellow]' : 'w-2 bg-slate-600'}`}></div>
        ))}
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
      
      <div className="z-20 text-center space-y-6 p-4 flex flex-col items-center h-full justify-center relative w-full">
        <div className="flex-grow flex flex-col justify-center items-center w-full max-w-4xl">
            <div className="flex items-center gap-2 mb-4 animate-in slide-in-from-top-10 fade-in duration-1000">
                <div className="h-px w-12 bg-yellow-500"></div>
                <span className="text-yellow-400 font-mono tracking-[0.3em] text-xs md:text-sm drop-shadow-md uppercase">Top Secret Intel</span>
                <div className="h-px w-12 bg-yellow-500"></div>
            </div>

            <div className="relative mb-2">
                <h1 className="text-6xl md:text-9xl font-ops animate-shine glitch-text drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] leading-none tracking-tighter" data-text="JEJAK">JEJAK</h1>
            </div>

            <h1 className="text-4xl md:text-7xl font-ops animate-shine drop-shadow-lg glitch-text leading-tight" data-text="BANI ABBASIYAH">BANI ABBASIYAH</h1>
            
            <div className="mt-8 transform -skew-x-12 bg-slate-900/80 border-l-4 border-yellow-500 px-8 py-2 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-yellow-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                 <p className="text-slate-200 tracking-[0.5em] text-sm md:text-lg font-mono">OPERATION: GOLDEN AGE</p>
            </div>
            
            <div className="mt-20 relative group hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-yellow-500 blur-xl opacity-30 group-hover:opacity-60 transition-opacity rounded-full animate-pulse"></div>
                <TacticalButton onClick={() => { sfx.init(); sfx.click(); onStart(); }} className="scale-125 border-yellow-400 text-xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500">
                    INISIASI MISI
                </TacticalButton>
            </div>
        </div>

        <div className="w-full max-w-2xl border-t border-slate-700/50 bg-black/80 backdrop-blur-md p-4 rounded-t-xl flex items-center justify-center gap-6 animate-in slide-in-from-bottom-5 fade-in duration-1000 border-x border-slate-700/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
            <div className="text-right">
                <p className="text-slate-400 text-[10px] font-mono mb-1 tracking-widest uppercase">Didukung Oleh:</p>
                <h3 className="text-white font-medium text-[10px] md:text-sm font-ops tracking-wide leading-tight uppercase">MGMP PAI SMP & Kemenag<br/>Kab. Mojokerto</h3>
            </div>
            <div className="h-10 w-px bg-slate-600"></div>
            <img src="https://iili.io/fcTD21f.png" alt="Logo Kemenag" className="h-10 md:h-14 w-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
  );
};

const LoginScreen = ({ onLogin }: { onLogin: (name: string) => void }) => {
  const [name, setName] = useState('');
  return (
    <div className="h-[100dvh] w-full flex items-center justify-center bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center z-0 opacity-50" style={{ backgroundImage: "url('https://iili.io/fcu0G2t.jpg')" }}></div>
      <Panel className="w-full max-w-md mx-4 z-10">
        <h2 className="text-2xl font-ops text-yellow-500 mb-6 text-center">IDENTITAS PENJELAJAH</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-slate-400 text-sm mb-1 ml-1 font-mono uppercase">Nama Agen</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-800 border-2 border-slate-600 p-3 text-white focus:border-yellow-500 focus:outline-none font-ops uppercase text-xl" placeholder="Masukan Nama..." autoFocus />
          </div>
          <TacticalButton onClick={() => onLogin(name)} className="w-full">AKSES DATABASE</TacticalButton>
        </div>
      </Panel>
    </div>
  );
};

const DifficultySelectScreen = ({ onSelect, onGallery }: { onSelect: (diff: Difficulty) => void, onGallery: () => void }) => {
    return (
        <div className="h-[100dvh] w-full bg-slate-900 flex flex-col items-center justify-center p-3 md:p-4 overflow-hidden relative">
             <div className="absolute inset-0 bg-cover bg-center z-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://iili.io/fcuagyJ.jpg')" }}></div>
             <div className="max-w-6xl w-full flex flex-col items-center z-10">
                <h2 className="text-2xl md:text-4xl font-ops text-white mb-4 md:mb-8 text-center uppercase tracking-tight drop-shadow-lg">Pilih Tingkat Operasi</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4 w-full max-h-[85vh] overflow-y-auto p-1 scrollbar-hide">
                    {/* Mode Easy */}
                    <button onClick={() => onSelect(Difficulty.EASY)} className="bg-slate-800/80 border-2 border-green-600 hover:bg-slate-700 hover:scale-[1.02] transition-all p-3 md:p-4 rounded-lg group relative overflow-hidden flex flex-col justify-between backdrop-blur-sm min-h-[120px]">
                        <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2">
                             <Shield className="text-green-500 mb-0 shrink-0" size={32} />
                             <div className="text-left md:text-center">
                                <h3 className="text-lg md:text-xl font-ops text-green-500 uppercase">PEMULA</h3>
                                <p className="text-slate-400 text-[10px] md:text-xs mt-1 leading-tight">Mengenal tokoh & peristiwa dasar.</p>
                             </div>
                        </div>
                        <div className="hidden md:block bg-green-900/40 py-1.5 mt-3 text-center text-green-400 font-ops text-xs border border-green-700 uppercase">MULAI MISI</div>
                    </button>

                    {/* Mode Medium */}
                    <button onClick={() => onSelect(Difficulty.MEDIUM)} className="bg-slate-800/80 border-2 border-yellow-600 hover:bg-slate-700 hover:scale-[1.02] transition-all p-3 md:p-4 rounded-lg group relative overflow-hidden flex flex-col justify-between backdrop-blur-sm min-h-[120px]">
                        <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2">
                             <Swords className="text-yellow-500 mb-0 shrink-0" size={32} />
                             <div className="text-left md:text-center">
                                <h3 className="text-lg md:text-xl font-ops text-yellow-500 uppercase">MENENGAH</h3>
                                <p className="text-slate-400 text-[10px] md:text-xs mt-1 leading-tight">Analisis sejarah & pembangunan peradaban.</p>
                             </div>
                        </div>
                        <div className="hidden md:block bg-yellow-900/40 py-1.5 mt-3 text-center text-yellow-400 font-ops text-xs border border-yellow-700 uppercase">MULAI MISI</div>
                    </button>

                    {/* Mode Hard */}
                    <button onClick={() => onSelect(Difficulty.HARD)} className="bg-slate-800/80 border-2 border-red-600 hover:bg-slate-700 hover:scale-[1.02] transition-all p-3 md:p-4 rounded-lg group relative overflow-hidden flex flex-col justify-between backdrop-blur-sm min-h-[120px]">
                        <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2">
                             <Brain className="text-red-500 mb-0 shrink-0" size={32} />
                             <div className="text-left md:text-center">
                                <h3 className="text-lg md:text-xl font-ops text-red-500 uppercase">MAHIR</h3>
                                <p className="text-slate-400 text-[10px] md:text-xs mt-1 leading-tight">Uji wawasan kritis & sains Abbasiyah.</p>
                             </div>
                        </div>
                        <div className="hidden md:block bg-red-900/40 py-1.5 mt-3 text-center text-red-400 font-ops text-xs border border-red-700 uppercase">MULAI MISI</div>
                    </button>

                    {/* Mode Integrasi Sikap */}
                    <button onClick={() => onSelect(Difficulty.ETHICS)} className="bg-slate-800/80 border-2 border-cyan-500 hover:bg-slate-700 hover:scale-[1.02] transition-all p-3 md:p-4 rounded-lg group relative overflow-hidden flex flex-col justify-between backdrop-blur-sm min-h-[120px]">
                        <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2">
                             <GraduationCap className="text-cyan-400 mb-0 shrink-0" size={32} />
                             <div className="text-left md:text-center">
                                <h3 className="text-lg md:text-xl font-ops text-cyan-400 uppercase">ADAB & SIKAP</h3>
                                <p className="text-slate-400 text-[10px] md:text-xs mt-1 leading-tight">Nilai Karakter Abbasiyah dan implementasi karakter.</p>
                             </div>
                        </div>
                        <div className="hidden md:block bg-cyan-900/40 py-1.5 mt-3 text-center text-cyan-400 font-ops text-xs border border-cyan-700 uppercase">MULAI OPERASI</div>
                    </button>

                    {/* Gallery Mode - NEW! */}
                    <button onClick={onGallery} className="bg-slate-800/80 border-2 border-orange-500 hover:bg-slate-700 hover:scale-[1.02] transition-all p-3 md:p-4 rounded-lg group relative overflow-hidden flex flex-col justify-between backdrop-blur-sm min-h-[120px] shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                        <div className="absolute top-0 right-0 bg-orange-500 text-black text-[8px] font-bold px-2 py-0.5 font-mono">NON-COMBAT</div>
                        <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2">
                             <ImageIcon className="text-orange-400 mb-0 shrink-0" size={32} />
                             <div className="text-left md:text-center">
                                <h3 className="text-lg md:text-xl font-ops text-orange-400 uppercase">ARSIP VISUAL</h3>
                                <p className="text-slate-400 text-[10px] md:text-xs mt-1 leading-tight">Visualisasi AI, Tokoh, & Kemajuan Abbasiyah.</p>
                             </div>
                        </div>
                        <div className="hidden md:block bg-orange-900/40 py-1.5 mt-3 text-center text-orange-400 font-ops text-xs border border-orange-700 uppercase">BUKA ARSIP</div>
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
            <div className="relative z-10 w-full flex flex-col items-center flex-grow overflow-y-auto p-3 pb-20">
                <h2 className="text-2xl md:text-4xl font-ops text-white mb-6 mt-6 text-center shrink-0 uppercase">Pilih Peran Operasi</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl w-full px-2">
                    {CHARACTERS.map(char => (
                        <button key={char.id} onClick={() => onSelect(char.id)} className="bg-slate-800/90 border-2 border-slate-600 hover:border-yellow-500 hover:bg-slate-700/90 transition-all p-4 rounded-lg flex flex-col items-center group relative overflow-hidden backdrop-blur-sm min-h-[160px]">
                            <img src={char.image} alt={char.name} className="w-16 h-16 md:w-32 md:h-32 mb-2 md:mb-4 drop-shadow-lg filter grayscale group-hover:grayscale-0 transition-all object-contain" />
                            <h3 className="text-base md:text-xl font-ops text-yellow-500 leading-tight uppercase">{char.name}</h3>
                            <div className="text-slate-400 text-[10px] md:text-sm font-mono leading-tight uppercase mb-2">{char.role}</div>
                            <div className="mt-auto bg-black/40 px-2 py-1 rounded text-[9px] md:text-xs text-green-400 border border-green-900 w-full text-center">PERK: {char.perk}</div>
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
            <div className="bg-black/90 px-4 py-2 border-b border-slate-700 flex justify-between items-center z-50 shadow-xl h-14 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 border-2 border-yellow-500 p-0.5 bg-slate-800">
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
                <button onClick={onLogout} className="text-slate-500 hover:text-white transition-colors flex items-center gap-2">
                    <Radio size={14} className="animate-pulse" />
                    <span className="font-ops text-xs uppercase">Putus Kontak</span>
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
                <div className="absolute inset-0 z-20">
                    {LEVEL_CONFIGS.map((level, i) => {
                        const pos = nodes[i];
                        const isLocked = i > user.levelProgress;
                        const isCompleted = i < user.levelProgress;
                        const isCurrent = i === user.levelProgress;
                        return (
                            <div key={level.id} className="absolute -translate-x-1/2 -translate-y-1/2 group" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
                                <button onClick={() => !isLocked && onStartLevel(level.id)} disabled={isLocked} className={`relative flex items-center justify-center transition-all duration-300 ${isLocked ? 'scale-75 opacity-50 grayscale' : 'hover:scale-125'}`}>
                                    {isCurrent && <div className="absolute inset-0 scale-[2.5] bg-lime-500/20 rounded-full animate-ping"></div>}
                                    <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center shadow-lg backdrop-blur-sm z-30 transition-colors ${isCompleted ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500' : isCurrent ? 'bg-lime-500/30 border-lime-400 text-lime-400 animate-pulse' : 'bg-slate-800/80 border-slate-600 text-slate-600'}`}>
                                        {isLocked ? <Lock size={16} /> : isCompleted ? <Star size={18} fill="currentColor" /> : <Crosshair size={22} />}
                                    </div>
                                </button>
                            </div>
                        );
                    })}
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
                if (prev >= 100) { clearInterval(interval); return 100; }
                return Math.min(100, prev + Math.random() * 8 + 2);
            });
        }, 80);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => { if (progress === 100) setTimeout(onComplete, 600); }, [progress, onComplete]);
    return (
        <div className="h-[100dvh] w-full bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
             <div className="w-full max-w-lg z-20">
                 <div className="flex justify-between items-end mb-3"><span className="text-lime-500 font-ops text-5xl">{Math.floor(progress)}%</span></div>
                 <div className="h-6 bg-slate-900 border-2 border-slate-700 w-full rounded-sm overflow-hidden p-1">
                     <div className="h-full bg-lime-500 transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
                 </div>
             </div>
        </div>
    );
};

const LevelIntroScreen = ({ levelId, user, onStart }: { levelId: number, user: UserProfile, onStart: () => void }) => {
  const level = LEVEL_CONFIGS.find(l => l.id === levelId);
  if (!level) return null;
  return (
      <div className="h-[100dvh] w-full flex items-center justify-center relative overflow-hidden bg-black">
           <div className="absolute inset-0 bg-cover bg-center transition-all opacity-60" style={{ backgroundImage: `url('${level.image}')` }}></div>
           <div className="relative z-20 max-w-2xl w-full p-6 text-center">
              <h1 className="text-5xl md:text-8xl font-ops text-yellow-500 mb-3 uppercase">{level.title}</h1>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 uppercase tracking-widest">{level.subtitle}</h2>
              <Panel className="mb-10"><TypewriterText text={level.description} className="text-lime-400 font-bold text-xl md:text-2xl font-mono" /></Panel>
              <TacticalButton onClick={onStart} className="px-16 py-5 text-2xl uppercase tracking-widest">Luncurkan</TacticalButton>
           </div>
      </div>
  );
};

const GameplayScreen = ({ levelId, user, onAbort, onComplete, bgImage }: { levelId: number, user: UserProfile, onAbort: () => void, onComplete: (score: number, remainingHp: number) => void, bgImage: string }) => {
  const [hp, setHp] = useState(100);
  const [isLevelFinished, setIsLevelFinished] = useState(false);
  const [finalGameScore, setFinalGameScore] = useState(0);
  const [randomizedData, setRandomizedData] = useState<Question[]>([]);

  useEffect(() => {
    const rawData = GAME_DATA[user.difficulty][levelId] || [];
    setRandomizedData([...rawData].sort(() => Math.random() - 0.5));
  }, [levelId, user.difficulty]);

  const handleLevelComplete = (score: number) => { sfx.stopBGM(); setFinalGameScore(score); setIsLevelFinished(true); };
  const handleDamage = () => setHp(prev => Math.max(0, prev - 20));

  if (isLevelFinished) {
      return (
        <div className="h-[100dvh] w-full bg-slate-950 flex items-center justify-center p-4">
            <Panel className="text-center w-full max-w-md z-10 border-lime-500">
                <h2 className="text-4xl font-ops text-white mb-2 uppercase">MISI SELESAI</h2>
                <TacticalButton onClick={() => onComplete(finalGameScore, hp)} className="w-full py-5 text-2xl">AKSES EVALUASI</TacticalButton>
            </Panel>
        </div>
      );
  }

  return (
      <div className="h-[100dvh] w-full relative flex flex-col overflow-hidden bg-slate-950">
          <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale-[50%]" style={{ backgroundImage: `url('${bgImage}')` }}></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="bg-black/90 p-3 border-b border-slate-700 flex justify-between items-center h-14 shrink-0">
                <button onClick={onAbort} className="flex items-center text-slate-400 uppercase text-xs font-ops"><ChevronLeft size={16} /> Abort</button>
                <HealthBar hp={hp} maxHp={100} />
            </div>
            <div className="flex-grow p-0 md:p-4 overflow-hidden relative">
                {randomizedData.length > 0 && <UniversalLevelEngine data={randomizedData} user={user} levelId={levelId} onComplete={handleLevelComplete} onDamage={handleDamage} />}
            </div>
          </div>
      </div>
  );
};

const EvaluationScreen = ({ score, onContinue }: { score: number, onContinue: () => void }) => {
  return (
    <div className="h-[100dvh] w-full bg-slate-900 flex items-center justify-center p-4">
        <Panel className="max-w-md w-full text-center py-12">
            <Award size={100} className="text-yellow-500 mx-auto mb-6" />
            <h2 className="text-5xl font-ops text-white mb-4 uppercase">HASIL MISI</h2>
            <div className="text-8xl font-ops text-yellow-400 mb-8">{score}</div>
            <TacticalButton onClick={onContinue} className="w-full py-4 text-xl">LANJUTKAN</TacticalButton>
        </Panel>
    </div>
  );
};

const RewardScreen = ({ user, onRestart }: { user: UserProfile, onRestart: () => void }) => {
    return (
  <div className="min-h-[100dvh] w-full bg-slate-950 flex flex-col items-center justify-center p-4">
      <Panel className="max-w-4xl w-full border-yellow-500 p-12 text-center">
          <h1 className="text-7xl font-ops text-yellow-500 mb-4 uppercase">Misi Tuntas!</h1>
          <Award size={80} className="text-white mx-auto mb-6" />
          <div className="text-5xl md:text-8xl text-yellow-400 font-ops mb-8">{user.score}</div>
          <TacticalButton onClick={onRestart} className="w-full py-4 text-lg">ULANGI OPERASI</TacticalButton>
      </Panel>
  </div>
    );
};

const App = () => {
  const [screen, setScreen] = useState<ScreenState>(ScreenState.TITLE);
  const [user, setUser] = useState<UserProfile>({
    username: 'Pelajar', rank: 'Pemula', score: 0, levelProgress: 0, characterId: 'c1', difficulty: Difficulty.EASY
  });
  const [currentLevelId, setCurrentLevelId] = useState<number>(0);
  const [tempScore, setTempScore] = useState(0);
  const [selectedBg, setSelectedBg] = useState<string>(RANDOM_BACKGROUNDS[0]);

  const login = (name: string) => { setUser({ ...user, username: name || 'Pelajar' }); setScreen(ScreenState.DIFFICULTY_SELECT); };
  const selectDifficulty = (diff: Difficulty) => { setUser({ ...user, difficulty: diff }); setScreen(ScreenState.CHARACTER_SELECT); };
  const selectCharacter = (charId: string) => { setUser({ ...user, characterId: charId }); setScreen(ScreenState.MAP); };
  const startLevel = (levelId: number) => { setCurrentLevelId(levelId); setSelectedBg(RANDOM_BACKGROUNDS[Math.floor(Math.random() * RANDOM_BACKGROUNDS.length)]); setScreen(ScreenState.LEVEL_INTRO); };
  const startLoading = () => setScreen(ScreenState.LOADING);
  const beginGameplay = () => { sfx.playBGM(); setScreen(ScreenState.GAMEPLAY); };
  
  const finishLevel = (score: number, remainingHp: number) => {
    setTempScore(score);
    const nextProgress = Math.max(user.levelProgress, currentLevelId);
    setUser(prev => ({ ...prev, score: prev.score + score, levelProgress: nextProgress }));
    setScreen(ScreenState.EVALUATION);
  };

  const handleReturnFromEvaluation = () => {
    if (currentLevelId === 7) { setScreen(ScreenState.REWARD); confetti({ particleCount: 400 }); }
    else setScreen(ScreenState.MAP);
  };

  const logout = () => { sfx.stopBGM(); setScreen(ScreenState.TITLE); };

  const renderScreen = () => {
    switch (screen) {
      case ScreenState.TITLE: return <TitleScreen onStart={() => setScreen(ScreenState.LOGIN)} />;
      case ScreenState.LOGIN: return <LoginScreen onLogin={login} />;
      case ScreenState.DIFFICULTY_SELECT: return <DifficultySelectScreen onSelect={selectDifficulty} onGallery={() => setScreen(ScreenState.GALLERY)} />;
      case ScreenState.CHARACTER_SELECT: return <CharacterSelectScreen onSelect={selectCharacter} />;
      case ScreenState.MAP: return <MapScreen user={user} onLogout={logout} onStartLevel={startLevel} />;
      case ScreenState.LEVEL_INTRO: return <LevelIntroScreen levelId={currentLevelId} user={user} onStart={startLoading} />;
      case ScreenState.LOADING: return <LoadingScreen onComplete={beginGameplay} />;
      case ScreenState.GAMEPLAY: return <GameplayScreen levelId={currentLevelId} user={user} bgImage={selectedBg} onAbort={() => setScreen(ScreenState.MAP)} onComplete={finishLevel} />;
      case ScreenState.EVALUATION: return <EvaluationScreen score={tempScore} onContinue={handleReturnFromEvaluation} />;
      case ScreenState.REWARD: return <RewardScreen user={user} onRestart={() => setScreen(ScreenState.MAP)} />;
      case ScreenState.GALLERY: return <GalleryScreen onBack={() => setScreen(ScreenState.DIFFICULTY_SELECT)} />;
      default: return <TitleScreen onStart={() => setScreen(ScreenState.LOGIN)} />;
    }
  };

  return (
    <div className="relative w-full h-full">
      {renderScreen()}
      <BackgroundPreloader />
      {screen !== ScreenState.TITLE && <GlobalFooter />}
    </div>
  );
};

export default App;
