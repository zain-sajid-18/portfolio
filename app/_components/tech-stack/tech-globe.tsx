'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { techGlobeItems } from '@/app/_lib/data';

interface ItemProps {
  name: string;
  color: string;
  position: THREE.Vector3;
}

function TechWord({ name, color, position }: ItemProps) {
  const textRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (textRef.current) {
      // Make text look at camera (billboard effect)
      textRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.34}
      color={hovered ? '#ffffff' : color}
      font="/fonts/GeistMonoVF.woff" // fallback or local font path
      anchorX="center"
      anchorY="middle"
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {name}
    </Text>
  );
}

function Cloud({ count = 4 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 3.6;

  // Distribute items evenly over a sphere using Fibonacci lattice
  const words = useMemo(() => {
    const temp: ItemProps[] = [];
    const N = techGlobeItems.length;
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      temp.push({
        name: techGlobeItems[i].name,
        color: techGlobeItems[i].color,
        position: new THREE.Vector3(x, y, z),
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {words.map((word, index) => (
        <TechWord key={index} {...word} />
      ))}
    </group>
  );
}

export function TechGlobe() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: 450,
        position: 'relative',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Cloud />
      </Canvas>
    </div>
  );
}
