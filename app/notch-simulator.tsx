"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { Play, SkipForward, SkipBack, Pause, Heart, Volume2, Home, Inbox, Settings, Battery, Zap } from "lucide-react";

const SONGS = [
  {
    title: "Snow Painting the View",
    artist: "Brilliant Supervision",
    lyrics: "No lyrics found",
    color: "#D48C44",
    coverGradient: "from-[#D48C44] via-[#A67C7C] to-[#8B5A5A]"
  },
  {
    title: "Midnight Stroll",
    artist: "Luna Vale",
    lyrics: "No lyrics found",
    color: "#C9A87C",
    coverGradient: "from-[#C9A87C] via-[#8B5A5A] to-[#6B4444]"
  },
  {
    title: "Neon Dreams",
    artist: "Lila Vega",
    lyrics: "No lyrics found",
    color: "#FF6F61",
    coverGradient: "from-[#FF6F61] via-[#FF9980] to-[#FFB3A7]"
  },
  {
    title: "Echoes of Fire",
    artist: "Iron Hollow",
    lyrics: "No lyrics found",
    color: "#8B0000",
    coverGradient: "from-[#8B0000] via-[#A52A2A] to-[#D2691E]"
  },
  {
    title: "Velocity",
    artist: "J-Know",
    lyrics: "No lyrics found",
    color: "#1E90FF",
    coverGradient: "from-[#1E90FF] via-[#63B8FF] to-[#B0E0E6]"
  },
  {
    title: "Starlight Drift",
    artist: "Nova Pulse",
    lyrics: "No lyrics found",
    color: "#4B0082",
    coverGradient: "from-[#4B0082] via-[#7B68EE] to-[#9370DB]"
  },
  {
    title: "Paper Planes & Promises",
    artist: "Coral Skies",
    lyrics: "No lyrics found",
    color: "#FF7F50",
    coverGradient: "from-[#FF7F50] via-[#FFB347] to-[#FFD700]"
  },
  {
    title: "Velvet Touch",
    artist: "Sienna Ray",
    lyrics: "No lyrics found",
    color: "#800020",
    coverGradient: "from-[#800020] via-[#C71585] to-[#FF69B4]"
  },
  {
    title: "City Lights & Shadows",
    artist: "The Blue Note Collective",
    lyrics: "No lyrics found",
    color: "#4682B4",
    coverGradient: "from-[#4682B4] via-[#5F9EA0] to-[#B0C4DE]"
  },
  {
    title: "Crimson Horizon",
    artist: "Solar Drift",
    lyrics: "No lyrics found",
    color: "#DC143C",
    coverGradient: "from-[#DC143C] via-[#FF6347] to-[#FF8C00]"
  },
  {
    title: "Digital Mirage",
    artist: "Pixel Wave",
    lyrics: "No lyrics found",
    color: "#00CED1",
    coverGradient: "from-[#00CED1] via-[#20B2AA] to-[#40E0D0]"
  },
  {
    title: "Moonlit Cascade",
    artist: "Aurora Sky",
    lyrics: "No lyrics found",
    color: "#6A5ACD",
    coverGradient: "from-[#6A5ACD] via-[#836FFF] to-[#B0C4DE]"
  },
  {
    title: "Whispering Pines",
    artist: "Eden Falls",
    lyrics: "No lyrics found",
    color: "#228B22",
    coverGradient: "from-[#228B22] via-[#32CD32] to-[#ADFF2F]"
  },
  {
    title: "Solar Flare",
    artist: "Luminous Arc",
    lyrics: "No lyrics found",
    color: "#FFD700",
    coverGradient: "from-[#FFD700] via-[#FFA500] to-[#FF8C00]"
  },
  {
    title: "Frosted Glass",
    artist: "Crystal Echo",
    lyrics: "No lyrics found",
    color: "#B0E0E6",
    coverGradient: "from-[#B0E0E6] via-[#AFEEEE] to-[#87CEEB]"
  },
  {
    title: "Electric Rain",
    artist: "Neon Horizon",
    lyrics: "No lyrics found",
    color: "#00BFFF",
    coverGradient: "from-[#00BFFF] via-[#1E90FF] to-[#4682B4]"
  },
  {
    title: "Golden Dusk",
    artist: "Twilight Ember",
    lyrics: "No lyrics found",
    color: "#FFA07A",
    coverGradient: "from-[#FFA07A] via-[#FF7F50] to-[#FF6347]"
  },
  {
    title: "Silent Reverie",
    artist: "Opal Sky",
    lyrics: "No lyrics found",
    color: "#9370DB",
    coverGradient: "from-[#9370DB] via-[#8A2BE2] to-[#6A5ACD]"
  },
  {
    title: "Crimson Tide",
    artist: "Red Horizon",
    lyrics: "No lyrics found",
    color: "#B22222",
    coverGradient: "from-[#B22222] via-[#DC143C] to-[#FF4500]"
  }
];

export const NotchSimulator = memo(() => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [progress, setProgress] = useState(35);
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());

  const currentSong = SONGS[currentSongIndex];

  const totalSeconds = 242; // 4:02

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (now.getMinutes() !== currentDate.getMinutes() || now.getHours() !== currentDate.getHours()) {
        setCurrentDate(now);
      }
    }, 30000); 
    return () => clearInterval(timer);
  }, [currentDate]);

  useEffect(() => {
    if (!isPlaying) return;
    const incrementPerSecond = 100 / totalSeconds;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + incrementPerSecond;
        return next >= 100 ? 0 : next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, totalSeconds]);

  const calendarDays = useMemo(() => {
    const date = currentDate.getDate();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = [];
    
    for (let i = -2; i <= 3; i++) {
      const d = new Date(currentDate);
      d.setDate(date + i);
      result.push({
        day: days[d.getDay()],
        date: d.getDate(),
        isToday: i === 0
      });
    }
    return result;
  }, [currentDate]);

  const monthName = useMemo(() => currentDate.toLocaleString('default', { month: 'short' }), [currentDate]);
  const year = useMemo(() => currentDate.getFullYear(), [currentDate]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const currentSeconds = useMemo(() => Math.floor((progress / 100) * totalSeconds), [progress, totalSeconds]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const togglePlaying = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(prev => !prev);
  }, []);
  
  const nextSong = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSongIndex(prev => (prev + 1) % SONGS.length);
  }, []);

  const prevSong = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSongIndex(prev => (prev - 1 + SONGS.length) % SONGS.length);
  }, []);

  const toggleHeart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHeartFilled(prev => !prev);
  }, []);

  return (
    <div className="flex justify-center w-full py-8 relative z-50">
      <motion.div 
        className="relative"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative w-[900px] h-[280px] bg-gradient-to-b from-[#1A1616] to-[#121010] rounded-t-[20px] p-[8px] shadow-2xl shadow-black/60">
          <div className="absolute inset-0 rounded-t-[20px] border border-white/[0.03]" />
          <div className="relative w-full h-full bg-[#0A0808] rounded-t-[12px] overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A1414] via-[#121010] to-[#0A0808]" />
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#8B5A5A]/15 blur-[80px] rounded-full" />
              <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#9b2635]/10 blur-[60px] rounded-full" />
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#6B4444]/10 blur-[50px] rounded-full" />
            </div>

            <div className="absolute top-0 left-0 right-0 h-[44px] bg-black/60 backdrop-blur-sm flex items-center justify-between px-4 text-white/90 text-[13px] font-medium z-10">
              <div className="flex items-center gap-5">
                <div className="w-[10px] h-[10px] bg-white/80 rounded-sm" />
                <span className="text-white/90">Finder</span>
                <span className="text-white/50">File</span>
                <span className="text-white/50">Edit</span>
                <span className="text-white/50">View</span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-[13px] text-white/80">
                  {currentDate.toLocaleTimeString("en-US", { 
                    hour: "numeric", 
                    minute: "2-digit",
                    hour12: true 
                  })}
                </span>
              </div>
            </div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
              <motion.div
                className="bg-black flex items-center overflow-hidden text-white cursor-pointer relative"
                style={{
                  borderBottomLeftRadius: isHovered ? 24 : 14,
                  borderBottomRightRadius: isHovered ? 24 : 14,
                  boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(139,90,90,0.08)' : 'none',
                  willChange: "width, height, box-shadow"
                }}
                animate={{
                  width: isHovered ? 850 : 200,
                  height: isHovered ? 260 : 38,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 40,
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <AnimatePresence mode="wait">
                  {!isHovered ? (
                    <motion.div
                      key="compact"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <div className="w-3 h-3 rounded-full bg-[#0a0a0a] border border-zinc-700/50 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.05, duration: 0.2 }}
                      className="w-full h-full flex flex-col"
                    >
                      <div className="flex items-center justify-between px-6 py-4 text-white/80">
                        <div className="flex items-center gap-6">
                          <div className="w-8 h-8 rounded-lg bg-[#333]/50 flex items-center justify-center hover:bg-[#444]/50 transition-colors">
                            <Home size={18} fill="white" className="text-white" />
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-transparent flex items-center justify-center hover:bg-[#333]/30 transition-colors">
                            <Inbox size={18} className="text-white/60" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Settings size={18} className="text-white/60" />
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">80%</span>
                            <div className="relative">
                                <Battery size={24} className="text-white/60" />
                                <div className="absolute inset-0 flex items-center left-1/8">
                                    <Zap size={10} fill="white" className="text-white ml-0.5" />
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 flex items-center px-6 pb-4 gap-6">
                        <div className="relative shrink-0 group">
                            <motion.div 
                                key={currentSong.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className={`w-[140px] h-[140px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br ${currentSong.coverGradient}`}
                            >
                                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                                    <Volume2 size={40} />
                                </div>
                                <div className="absolute inset-0 bg-black/10" />
                            </motion.div>
                            <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#0A0808] rounded-full flex items-center justify-center z-10">
                                 <div className="w-6 h-6 bg-[#1DB954] rounded-full flex items-center justify-center">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 17.3c-.2.3-.6.4-.9.2-2.5-1.5-5.7-1.9-9.4-1-1-.4-.2-.8-.2-1.2.2-.3.6-.4.9-.2 2.8.8 6.2 1.3 9 2.8.3.2.4.6.2.9zm1.1-2.9c-.3.4-.8.5-1.2.3-3-1.8-7.6-2.4-11.1-1.3-.4.1-.9-.1-1-.5-.1-.4.1-.9.5-1 4-1.2 9.1-.6 12.5 1.5.4.2.5.7.3 1.1zm.1-3C15.2 9.4 8.8 9.2 5.1 10.3c-.6.2-1.2-.1-1.4-.7-.2-.6.1-1.2.7-1.4 4.2-1.3 11.2-1.1 15.4 1.4.5.3.7 1 .4 1.5-.3.5-1 .7-1.5.4z"/>
                                    </svg>
                                 </div>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center min-w-0 gap-1">
                            <motion.div
                                key={currentSong.title + "info"}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-xl font-bold text-white truncate">{currentSong.title}</h3>
                                <p className="text-base font-medium truncate" style={{ color: currentSong.color }}>{currentSong.artist}</p>
                                <p className="text-xs text-white/40 truncate mb-3">{currentSong.lyrics}</p>
                            </motion.div>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-1">
                                <motion.div 
                                    className="h-full rounded-full"
                                    style={{ width: `${progress}%`, backgroundColor: currentSong.color }}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] text-white/30 mb-3">
                                <span>{formatTime(currentSeconds)}</span>
                                <span>{formatTime(totalSeconds)}</span>
                            </div>
                            <div className="flex items-center gap-6">
                                 <button onClick={prevSong} className="text-white/70 hover:text-white transition-colors">
                                    <SkipBack size={24} fill="currentColor" />
                                 </button>
                                 <button onClick={togglePlaying} className="text-white hover:scale-105 transition-transform">
                                    {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" />}
                                 </button>
                                 <button onClick={nextSong} className="text-white/70 hover:text-white transition-colors">
                                    <SkipForward size={24} fill="currentColor" />
                                 </button>
                                 <button onClick={toggleHeart} className={`ml-auto transition-colors ${isHeartFilled ? 'text-[#8B5A5A]' : 'text-white/30 hover:text-white/50'}`}>
                                    <Heart size={20} fill={isHeartFilled ? "currentColor" : "none"} />
                                 </button>
                            </div>
                        </div>
                        <div className="w-px h-32 bg-white/10 mx-2" />

                        <div className="w-[280px] flex flex-col h-full justify-center">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex flex-col leading-tight">
                                    <span className="text-lg font-bold text-white">{monthName}</span>
                                    <span className="text-base text-white/40">{year}</span>
                                </div>
                                <div className="flex gap-3 text-xs text-white/40">
                                    {calendarDays.map((d, i) => (
                                        <div key={i} className={`flex flex-col items-center gap-1 ${d.isToday ? 'text-white' : ''}`}>
                                            <span>{d.day}</span>
                                            <span className={`flex items-center justify-center w-7 h-7 rounded-full text-sm ${d.isToday ? 'bg-[#1A73E8] font-bold text-white' : ''}`}>
                                                {d.date}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                 <div className="flex gap-3 items-start">
                                    <div className="w-1 h-8 bg-[#E69F55] rounded-full shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white">Co-operative work term ends</span>
                                        <span className="text-xs text-white/40">All-day</span>
                                    </div>
                                 </div>
                                 <div className="flex gap-3 items-start">
                                    <div className="w-1 h-8 bg-[#E69F55] rounded-full shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white">Final examination</span>
                                        <span className="text-xs text-white/40">All-day</span>
                                    </div>
                                 </div>
                            </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
            <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
              <motion.p 
                className="text-[#A89B91]/50 text-sm font-medium tracking-wide"
                animate={{ opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                Hover the notch to see the magic
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});
NotchSimulator.displayName = 'NotchSimulator';