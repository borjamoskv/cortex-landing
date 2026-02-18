
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const commands = [
  { cmd: 'cortex start', output: '⚡ CORTEX v4.0.0-alpha initialized\n🧠 Memory Engine: ONLINE\n🛡️ Ledger: VERIFIED (SHA-256)\n📍 Local Server: http://localhost:8000' },
  { cmd: 'cortex memory add "Project CORTEX launch is Go"', output: '✅ Fact stored: ID #1024\n🔗 Hash: 8facc...39a1\n⚠️  Graph Updated: "Project CORTEX" -> "Launch"' },
  { cmd: 'cortex status', output: '🟢 HEALTH: 100%\n📊 Facts: 14,203\n📉 Storage: 42MB (Compact)\n🔒 Encryption: AES-256' },
];

export default function Terminal() {
  const [lines, setLines] = useState([]);
  const [currentCmdIndex, setCurrentCmdIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentCmdIndex >= commands.length) return;

    const targetCmd = commands[currentCmdIndex].cmd;

    if (isTyping) {
      if (currentText.length < targetCmd.length) {
        // Typing effect
        const timeout = setTimeout(() => {
          setCurrentText(targetCmd.slice(0, currentText.length + 1));
        }, 50 + Math.random() * 50);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing command
        setIsTyping(false);
        const timeout = setTimeout(() => {
            setLines(prev => [
                ...prev, 
                { type: 'cmd', content: targetCmd }, 
                { type: 'output', content: commands[currentCmdIndex].output }
            ]);
            setCurrentText('');
            setCurrentCmdIndex(prev => prev + 1);
            setIsTyping(true);
        }, 600);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentText, isTyping, currentCmdIndex]);

  return (
    <section className="py-24 bg-[#050505] flex justify-center items-center px-4 relative">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-[#111] to-transparent opacity-50 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-[#0A0A0A] rounded-lg border border-[#333] shadow-2xl overflow-hidden font-mono text-sm md:text-base relative z-10"
      >
        
        {/* Window Controls */}
        <div className="bg-[#111] px-4 py-3 flex items-center gap-2 border-b border-[#222]">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
          <div className="ml-auto text-gray-500 text-xs tracking-wider">borja@moskv-1:~</div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 h-[400px] overflow-y-auto custom-scrollbar text-gray-300 space-y-4 font-mono">
            {lines.map((line, i) => (
                <div key={i} className={`${line.type === 'cmd' ? 'text-white' : 'text-gray-400 pl-4 border-l-2 border-[#222] ml-1'}`}>
                    {line.type === 'cmd' ? (
                        <div className="flex items-start gap-2">
                            <span className="text-[#CCFF00] shrink-0">➜</span>
                            <span>{line.content}</span>
                        </div>
                    ) : (
                        <pre className="whitespace-pre-wrap font-mono text-xs md:text-sm leading-relaxed text-[#888]">{line.content}</pre>
                    )}
                </div>
            ))}

            {/* Current Typing Line */}
            {currentCmdIndex < commands.length && (
                <div className="flex items-start gap-2 text-white">
                    <span className="text-[#CCFF00] shrink-0">➜</span>
                    <span>
                        {currentText}
                        <span className="animate-pulse w-2 h-4 bg-[#CCFF00] inline-block align-middle ml-1"></span>
                    </span>
                </div>
            )}
            
             {currentCmdIndex >= commands.length && (
                <div className="flex items-start gap-2 text-white">
                    <span className="text-[#CCFF00] shrink-0">➜</span>
                    <span className="animate-pulse w-2 h-4 bg-[#CCFF00] inline-block align-middle ml-1"></span>
                </div>
            )}
        </div>
        
        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
      </motion.div>
    </section>
  );
}
