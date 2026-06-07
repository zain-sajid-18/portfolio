'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/app/_components/providers/theme-provider';
import { prefersReducedMotion } from '@/app/_lib/utils';

function seeded(i: number, salt: number) {
  const x = Math.sin(i * salt) * 10000;
  return x - Math.floor(x);
}

function lahoreMarkerPosition(r = 2.25) {
  const lat = (31.52 * Math.PI) / 180;
  const lon = (74.35 * Math.PI) / 180;
  return new THREE.Vector3(
    r * Math.cos(lat) * Math.cos(lon),
    r * Math.sin(lat),
    r * Math.cos(lat) * Math.sin(lon)
  );
}

function getTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function getColors(theme: 'light' | 'dark') {
  if (theme === 'light') {
    return {
      globe: 0x2dd4bf,
      glow: 0x60a5fa,
      marker: 0xf43f5e,
      stars: 0x94a3b8,
      starOpacity: 0.55,
      globeOpacity: 0.95,
      globeSize: 0.016,
      blending: THREE.NormalBlending as THREE.Blending,
    };
  }
  return {
    globe: 0x5be0ad,
    glow: 0x74a7ff,
    marker: 0xff4d6d,
    stars: 0xffffff,
    starOpacity: 0.45,
    globeOpacity: 0.85,
    globeSize: 0.014,
    blending: THREE.AdditiveBlending as THREE.Blending,
  };
}

function StaticGlobe() {
  const theme = getTheme();
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div
        className="w-[min(420px,90vw)] aspect-square rounded-full relative"
        style={{
          background:
            theme === 'light'
              ? 'radial-gradient(circle at 40% 35%, rgba(45,212,191,0.5), rgba(15,23,42,0.9) 55%)'
              : 'radial-gradient(circle at 40% 35%, rgba(91,224,173,0.35), transparent 55%)',
          boxShadow:
            theme === 'light'
              ? '0 0 60px rgba(45,212,191,0.35), inset 0 0 40px rgba(96,165,250,0.15)'
              : '0 0 80px rgba(91,224,173,0.15), inset 0 0 60px rgba(116,167,255,0.08)',
        }}
      >
        <div
          className="absolute inset-[8%] rounded-full border border-[var(--accent-green)]/30"
          style={{ animation: 'spin-slow 30s linear infinite' }}
        />
        <div className="absolute top-[38%] left-[58%] w-2.5 h-2.5 rounded-full bg-[#ff4d6d] shadow-[0_0_14px_#ff4d6d]" />
      </div>
    </div>
  );
}

function getCanvasMode() {
  if (typeof window === 'undefined') return { reduced: true, mobile: true };
  return { reduced: prefersReducedMotion(), mobile: window.innerWidth < 768 };
}

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mode, setMode] = useState(getCanvasMode);

  useEffect(() => {
    const onResize = () => setMode(getCanvasMode());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (mode.reduced || mode.mobile || !mountRef.current) return;

    const mount = mountRef.current;
    const colors = getColors(theme);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const earthPositions = new Float32Array(4200 * 3);
    for (let i = 0; i < 4200; i++) {
      const phi = Math.acos(2 * seeded(i, 12.9898) - 1);
      const theta = 2 * Math.PI * seeded(i, 78.233);
      const r = 2.2;
      earthPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      earthPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      earthPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const earthGeo = new THREE.BufferGeometry();
    earthGeo.setAttribute('position', new THREE.BufferAttribute(earthPositions, 3));
    const earthMat = new THREE.PointsMaterial({
      color: colors.globe,
      size: colors.globeSize,
      transparent: true,
      opacity: colors.globeOpacity,
      sizeAttenuation: true,
      blending: colors.blending,
      depthWrite: false,
    });
    const earth = new THREE.Points(earthGeo, earthMat);
    scene.add(earth);

    const starPositions = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      starPositions[i * 3] = (seeded(i, 45.164) - 0.5) * 18;
      starPositions[i * 3 + 1] = (seeded(i, 91.542) - 0.5) * 14;
      starPositions[i * 3 + 2] = (seeded(i, 33.891) - 0.5) * 12 - 4;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({
        color: colors.stars,
        size: 0.012,
        transparent: true,
        opacity: colors.starOpacity,
      })
    );
    scene.add(stars);

    const markerPos = lahoreMarkerPosition();
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 16, 16),
      new THREE.MeshBasicMaterial({ color: colors.marker })
    );
    marker.position.copy(markerPos);
    scene.add(marker);

    const keyLight = new THREE.PointLight(colors.glow, theme === 'light' ? 3 : 2.5, 25);
    keyLight.position.set(6, 4, 6);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(colors.globe, theme === 'light' ? 1.8 : 1.2, 18);
    fillLight.position.set(-5, -3, 4);
    scene.add(fillLight);

    const markerLight = new THREE.PointLight(colors.marker, 2.5, 3);
    markerLight.position.copy(markerPos);
    scene.add(markerLight);
    scene.add(new THREE.AmbientLight(0xffffff, theme === 'light' ? 0.55 : 0.35));

    let rafId = 0;
    const start = performance.now();
    let pointerX = 0;
    let pointerY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    mount.addEventListener('pointermove', onPointerMove);

    const animate = (now: number) => {
      const t = (now - start) / 1000;
      const delta = 0.016;
      targetRotY = pointerX * 0.4;
      targetRotX = pointerY * 0.15;
      earth.rotation.y += (targetRotY - earth.rotation.y) * 0.04 + delta * 0.12;
      earth.rotation.x += (targetRotX - earth.rotation.x) * 0.04;
      stars.rotation.y -= delta * 0.015;
      marker.scale.setScalar(1 + Math.sin(t * 3) * 0.25);
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onResize = () => {
      if (!mount.clientWidth || !mount.clientHeight) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      mount.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      earthGeo.dispose();
      earthMat.dispose();
      starGeo.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [mode.reduced, mode.mobile, theme]);

  if (mode.reduced || mode.mobile) return <StaticGlobe />;

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}
