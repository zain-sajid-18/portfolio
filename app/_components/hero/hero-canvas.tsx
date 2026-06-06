'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += delta * 0.1;
      wireframeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group>
      {/* Main Globe */}
      <mesh ref={meshRef} scale={1.6}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#0f4c75"
          metalness={0.3}
          roughness={0.6}
          emissive="#071b2e"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Wireframe Overlay */}
      <mesh ref={wireframeRef} scale={1.65}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color="#5be0ad"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Orbiting points */}
      {Array.from({ length: 60 }).map((_, i) => {
        const angle = (i / 60) * Math.PI * 2;
        const radius = 1.3 + (i % 3) * 0.15;
        const y = (Math.random() - 0.5) * 0.8;
        return (
          <OrbitingPoint
            key={i}
            angleOffset={angle}
            radius={radius}
            y={y}
            speed={0.2 + (i % 4) * 0.05}
          />
        );
      })}
    </group>
  );
}

function OrbitingPoint({
  angleOffset,
  radius,
  y,
  speed,
}: {
  angleOffset: number;
  radius: number;
  y: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const angle = state.clock.elapsedTime * speed + angleOffset;
      ref.current.position.x = Math.cos(angle) * radius;
      ref.current.position.z = Math.sin(angle) * radius;
      ref.current.position.y = y;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.015, 8, 8]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  );
}

function Lights() {
  return (
    <>
      <pointLight position={[5, 3, 5]} color="#74a7ff" intensity={3} distance={20} />
      <pointLight position={[-5, -3, 5]} color="#5be0ad" intensity={2} distance={15} />
      <ambientLight color="#ffffff" intensity={0.5} />
    </>
  );
}

function BackgroundStars() {
  const stars = useRef<THREE.Points>(null);

  useEffect(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    if (stars.current && stars.current.geometry) {
      stars.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
    }
  }, []);

  return (
    <points ref={stars}>
      <bufferGeometry />
      <pointsMaterial
        color="#ffffff"
        size={0.02}
        transparent
        opacity={0.7}
      />
    </points>
  );
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <BackgroundStars />
        <Globe />
        <Lights />
      </Canvas>
    </div>
  );
}
