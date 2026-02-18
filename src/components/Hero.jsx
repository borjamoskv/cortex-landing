
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function ParticleField({ count = 400 }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        const t = Math.random() * 100;
        const factor = 20 + Math.random() * 100;
        const speed = 0.01 + Math.random() / 200;
        const xFactor = -50 + Math.random() * 100;
        const yFactor = -50 + Math.random() * 100;
        const zFactor = -50 + Math.random() * 100;
        temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
        let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
        t = particle.t += speed / 2;
        const a = Math.cos(t) + Math.sin(t * 1) / 10;
        const b = Math.sin(t) + Math.cos(t * 2) / 10;
        const s = Math.cos(t);

        dummy.position.set(
            (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
            (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
            (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
        );
        dummy.scale.set(s, s, s);
        dummy.rotation.set(s * 5, s * 5, s * 5);
        dummy.updateMatrix();

        mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <meshBasicMaterial color="#CCFF00" wireframe transparent opacity={0.4} />
    </instancedMesh>
  );
}

export default function Hero() {
  return (
    <div className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-center font-sans">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 70], fov: 75 }}>
           <ParticleField count={800} />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-4xl px-6 text-center pt-20">
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-400 font-light mb-8 italic"
        >
            "Cualquiera puede agitar los brazos."
        </motion.p>
        
        <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-6 text-white leading-tight"
        >
            FLOTAR ES <br/>
            <span className="text-[#CCFF00] drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]">PODER</span>
        </motion.h1>

         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 3 }}
            className="mt-12 space-y-6 text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-light"
        >
            <p>
                Flotar requiere una sofisticación emocional que la mayoría no tiene.
                Es la capacidad de tolerar la quietud mientras el mundo se mueve.
            </p>
            <p className="text-gray-300">
                Tus competidores nadan frenéticamente hacia la nube. <br/>
                Regalando sus datos. Perdiendo soberanía.
            </p>
            <p className="pt-8 text-white font-medium text-xl border-t border-[#333] mt-8 inline-block px-8">
                Cuando baja la marea, ganan los que flotan.
            </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 5.5 }}
            className="mt-16"
        >
             <code className="bg-[#111] border border-[#333] px-6 py-4 rounded-lg text-[#CCFF00] font-mono text-sm shadow-2xl hover:border-[#CCFF00] transition-colors cursor-pointer">
                pip install cortex-memory
             </code>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-600"
      >
        <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
      </motion.div>
    </div>
  );
}
