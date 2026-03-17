import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScanningOverlayProps {
  isVisible: boolean;
  logoSrc: string;
  onComplete: () => void;
  title?: string;
  variant?: 'hacking' | 'training';
}

// Background for Hacking (Matrix Rain)
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const characters = "01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100;
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-20 pointer-events-none" />;
};

// Background for Training (Blueprint Grid)
const BlueprintGrid = () => {
  return (
    <div className="fixed inset-0 z-0 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 opacity-20" 
           style={{ 
             backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
             backgroundSize: '40px 40px' 
           }} 
      />
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: `linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)`,
             backgroundSize: '200px 200px' 
           }} 
      />
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 bg-blue-500/5 radial-gradient"
      />
    </div>
  );
};

const ScanningOverlay = ({ isVisible, logoSrc, onComplete, title, variant = 'hacking' }: ScanningOverlayProps) => {
  const [progress, setProgress] = useState(0);
  const isTraining = variant === 'training';

  useEffect(() => {
    if (isVisible) {
      setProgress(0);
      const startTime = Date.now();
      const duration = 5000;
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(currentProgress);
        if (elapsed >= duration) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden font-mono"
        >
          {isTraining ? <BlueprintGrid /> : <MatrixRain />}
          
          <div className="relative z-10 w-full max-w-2xl h-screen flex flex-col items-center justify-center">
            
            {isTraining ? (
              // --- BOOTCAMP TRAINING UI ('Constructor' Style) ---
              <div className="relative w-full max-w-md flex flex-col items-center">
                
                {/* Assembling Rings */}
                <div className="relative mb-16">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-40px] border border-blue-500/20 rounded-full border-dashed"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-20px] border-2 border-cyan-500/10 rounded-full border-dotted"
                  />
                  
                  {/* Progress Ring */}
                  <svg className="absolute inset-[-60px] w-[calc(100%+120px)] h-[calc(100%+120px)] -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="48%"
                      fill="none"
                      stroke="rgba(34, 211, 238, 0.05)"
                      strokeWidth="2"
                    />
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="48%"
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="2"
                      strokeDasharray="1000"
                      animate={{ strokeDashoffset: 1000 - (progress * 10) }}
                      className="drop-shadow-[0_0_8px_#22d3ee]"
                    />
                  </svg>

                  <motion.div
                    animate={{ scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative z-10 bg-slate-900/50 p-8 rounded-full backdrop-blur-sm border border-cyan-500/20 shadow-[0_0_50px_rgba(34,211,238,0.1)]"
                  >
                    <img 
                      src={logoSrc} 
                      alt="Bootcamp Logo" 
                      className="w-40 h-40 md:w-48 md:h-48 object-contain opacity-90"
                    />
                  </motion.div>
                </div>

                {/* Floating Stats */}
                <div className="absolute top-0 left-[-100px] text-cyan-500/60 text-[10px] space-y-2 hidden md:block">
                  <p>COORD_X: {progress.toFixed(2)}</p>
                  <p>COORD_Y: {(100-progress).toFixed(2)}</p>
                  <p>STATUS: OPTIMIZING</p>
                </div>
                <div className="absolute bottom-1/2 right-[-100px] text-cyan-500/60 text-[10px] space-y-2 hidden md:block">
                  <p>LOAD: {progress > 50 ? 'HIGH' : 'STABLE'}</p>
                  <p>BUFF: SYNC_DATA</p>
                  <p>MEM: OK</p>
                </div>

                <div className="w-full text-center space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-cyan-400 text-xl font-bold tracking-[0.2em] animate-pulse">
                      {title || "INITIALIZING ACADEMY UPLINK"}
                    </h2>
                    <div className="h-[1px] w-48 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-[10px] text-cyan-500/80">
                    <div className="p-3 bg-cyan-950/20 border border-cyan-500/10 rounded-lg">
                      <p className="opacity-50 mb-1 uppercase">Syllabus Sync</p>
                      <p className="font-bold text-cyan-300">{progress > 40 ? 'COMPLETED' : 'SYNCHRONIZING...'}</p>
                    </div>
                    <div className="p-3 bg-cyan-950/20 border border-cyan-500/10 rounded-lg">
                      <p className="opacity-50 mb-1 uppercase">Lab Provision</p>
                      <p className="font-bold text-cyan-300">{progress > 80 ? 'AUTHORIZED' : 'PENDING...'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // --- HACKATHON HACKING UI (Stayed as requested) ---
              <div className="relative flex flex-col items-center">
                <div className="relative mb-8 group">
                  <motion.div
                    animate={{ filter: ["drop-shadow(0 0 10px rgba(0, 255, 0, 0.2))", "drop-shadow(0 0 20px rgba(34, 197, 94, 0.4))", "drop-shadow(0 0 10px rgba(0, 255, 0, 0.2))"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="relative z-10"
                  >
                    <img src={logoSrc} alt="Hacking Logo" className="w-40 h-40 md:w-56 md:h-56 object-contain" />
                  </motion.div>
                  <motion.div
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-[-20%] right-[-20%] h-[3px] bg-green-500 z-20 shadow-[0_0_20px_#00ff00, 0_0_10px_#00ff00] opacity-90"
                  />
                  <div className="absolute -inset-4 border border-green-500/20 rounded-lg animate-pulse" />
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500" />
                </div>

                <div className="space-y-4 w-full max-w-sm mx-auto bg-black/80 border border-green-500/40 p-6 shadow-[0_0_30px_rgba(0,255,0,0.15)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-green-500" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-green-500" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-green-500" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-green-500" />
                  <div className="flex justify-between items-end mb-1">
                    <div className="flex flex-col items-start translate-y-2">
                      <span className="text-green-500 text-[10px] tracking-widest uppercase opacity-70">System Breach</span>
                      <span className="text-green-500 text-xs tracking-tighter uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        {title || "INITIALIZING BREACH..."}
                      </span>
                    </div>
                    <span className="text-green-400 font-bold text-2xl tabular-nums drop-shadow-[0_0_8px_#00ff00]">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-3 w-full bg-green-950/50 overflow-hidden border border-green-500/20 p-[2px]">
                    <motion.div className="h-full bg-green-500 shadow-[0_0_15px_#00ff00]" initial={{ width: "0%" }} animate={{ width: `${progress}%` }} transition={{ ease: "linear" }} />
                  </div>
                  <div className="text-[9px] font-mono text-green-500/90 text-left h-24 overflow-hidden mt-4 space-y-1 bg-black/40 p-3 border border-green-500/10">
                    <p className={progress > 10 ? "text-green-400" : "opacity-30"}>[0.12s] {">"} ATTEMPTING HANDSHAKE... OK</p>
                    <p className={progress > 30 ? "text-green-400" : "opacity-30"}>[0.45s] {">"} BYPASSING AUTH_GATEWAY... SUCCESS</p>
                    <p className={progress > 50 ? "text-green-400" : "opacity-30"}>[1.22s] {">"} ESCALATING PRIVILEGES... ROOT_ACCESS</p>
                    <p className={progress > 70 ? "text-green-400" : "opacity-30"}>[1.89s] {">"} EXTRACTING DATABASE_SCHEMA... 82%</p>
                    <p className={progress > 90 ? "text-green-400" : "opacity-30"}>[2.54s] {">"} FINALIZING SECURE_TUNNEL... DONE</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Global UI Overlays */}
          <div className="fixed inset-0 pointer-events-none z-[111] opacity-10" 
               style={{ 
                 backgroundImage: `linear-gradient(rgba(18, 16, 16, 0) 50%, ${isTraining ? 'rgba(34, 211, 238, 0.1)' : 'rgba(34, 197, 94, 0.1)'} 50%)`, 
                 backgroundSize: "100% 4px" 
               }} 
          />
          <div className="fixed inset-0 pointer-events-none z-[112] shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScanningOverlay;
