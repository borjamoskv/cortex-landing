import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Line } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Network({ count = 100 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ccff00"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      <Connections points={points} />
    </group>
  );
}

function Connections({ points }: { points: Float32Array }) {
  const ref = useRef<THREE.LineSegments>(null!);
  
  const lines = useMemo(() => {
    const l: number[] = [];
    const count = points.length / 3;
    
    // Naive connection logic: connect close points
    for (let i = 0; i < count; i++) {
      const x1 = points[i * 3];
      const y1 = points[i * 3 + 1];
      const z1 = points[i * 3 + 2];
      
      // Connect to 2 nearest neighbors (simplified)
      let connections = 0;
      for (let j = i + 1; j < count; j++) {
        if (connections >= 2) break;
        
        const x2 = points[j * 3];
        const y2 = points[j * 3 + 1];
        const z2 = points[j * 3 + 2];
        
        const dist = Math.sqrt(
          Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
        );
        
        if (dist < 3.5) {
            l.push(x1, y1, z1);
            l.push(x2, y2, z2);
            connections++;
        }
      }
    }
    return new Float32Array(l);
  }, [points]);

    useFrame((state) => {
    if (ref.current) {
        ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
        ref.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
    });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={lines.length / 3}
          array={lines}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        attach="material"
        color="#6600ff"
        transparent
        opacity={0.2}
        linewidth={1}
      />
    </lineSegments>
  );
}

export default function MemoryGraph() {
  return (
    <div className="w-full h-full absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.5} />
        <Network />
      </Canvas>
    </div>
  );
}
