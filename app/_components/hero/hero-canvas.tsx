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
      globe: 0x0d9488,
      globeAlt: 0x0ea5e9,
      glow: 0x2563eb,
      marker: 0xe11d48,
      stars: 0x475569,
      starOpacity: 0.5,
      globeOpacity: 0.95,
      globeSize: 0.08,
      blending: THREE.NormalBlending as THREE.Blending,
      atmosOuter: 0x22d3ee,
      atmosInner: 0x14b8a6,
    };
  }
  return {
    globe: 0x34d399,
    globeAlt: 0x60a5fa,
    glow: 0x818cf8,
    marker: 0xfb7185,
    stars: 0xffffff,
    starOpacity: 0.55,
    globeOpacity: 0.9,
    globeSize: 0.07,
    blending: THREE.AdditiveBlending as THREE.Blending,
    atmosOuter: 0x67e8f9,
    atmosInner: 0x34d399,
  };
}

/* ─────────────────────────────────────────────
   ENHANCED STATIC FALLBACK (CSS globe)
   Used when reduced-motion, mobile, or canvas fails
───────────────────────────────────────────── */
function StaticGlobe() {
  const theme = getTheme();
  const isLight = theme === 'light';
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div
        className="relative w-[min(420px,90vw)] aspect-square rounded-full"
        style={{
          background: isLight
            ? 'radial-gradient(circle at 35% 30%, rgba(20,184,166,0.55) 0%, rgba(37,99,235,0.28) 30%, rgba(15,23,42,0.92) 68%, #020617 100%)'
            : 'radial-gradient(circle at 35% 30%, rgba(52,211,153,0.45) 0%, rgba(96,165,250,0.22) 32%, transparent 65%)',
          boxShadow: isLight
            ? '0 0 90px rgba(20,184,166,0.35), inset 0 0 60px rgba(37,99,235,0.25), 0 0 140px rgba(37,99,235,0.12)'
            : '0 0 120px rgba(52,211,153,0.18), inset 0 0 80px rgba(129,140,248,0.12), 0 0 180px rgba(96,165,250,0.08)',
        }}
      >
        {/* Atmosphere outer ring */}
        <div
          className="absolute -inset-4 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${isLight ? 'rgba(34,211,238,0.35)' : 'rgba(103,232,249,0.28)'}, transparent 30%, ${isLight ? 'rgba(20,184,166,0.3)' : 'rgba(52,211,153,0.22)'} 55%, transparent 80%, ${isLight ? 'rgba(37,99,235,0.35)' : 'rgba(129,140,248,0.28)'})`,
            filter: 'blur(14px)',
            opacity: 0.75,
            animation: 'spin-slow 40s linear infinite',
          }}
        />

        {/* Continent-like grid pattern overlays */}
        <div
          className="absolute inset-[8%] rounded-full"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 18% 10% at 28% 38%, ${isLight ? 'rgba(20,184,166,0.55)' : 'rgba(52,211,153,0.45)'} 0%, transparent 70%),
              radial-gradient(ellipse 22% 14% at 62% 32%, ${isLight ? 'rgba(37,99,235,0.5)' : 'rgba(96,165,250,0.38)'} 0%, transparent 72%),
              radial-gradient(ellipse 14% 18% at 46% 64%, ${isLight ? 'rgba(20,184,166,0.5)' : 'rgba(52,211,153,0.4)'} 0%, transparent 70%),
              radial-gradient(ellipse 16% 10% at 74% 68%, ${isLight ? 'rgba(34,211,238,0.45)' : 'rgba(103,232,249,0.35)'} 0%, transparent 72%)
            `,
            animation: 'spin-slow 60s linear infinite',
          }}
        />

        {/* Latitude lines */}
        {[0.2, 0.4, 0.6, 0.8].map((t, i) => (
          <div
            key={`lat-${i}`}
            className="absolute left-1/2 -translate-x-1/2 rounded-full border"
            style={{
              top: `${t * 100}%`,
              width: `${(1 - Math.abs(t - 0.5) * 1.8) * 100}%`,
              height: 0,
              borderColor: isLight ? 'rgba(34,211,238,0.18)' : 'rgba(103,232,249,0.15)',
              transform: `translateX(-50%) perspective(600px) rotateX(72deg)`,
              transformOrigin: 'center',
            }}
          />
        ))}

        {/* Meridian lines */}
        {[0.15, 0.35, 0.5, 0.65, 0.85].map((t, i) => (
          <div
            key={`lon-${i}`}
            className="absolute top-1/2 left-1/2 rounded-full border"
            style={{
              width: '84%',
              height: '84%',
              transform: `translate(-50%,-50%) rotateY(${i * 36}deg)`,
              borderColor: isLight ? 'rgba(20,184,166,0.14)' : 'rgba(52,211,153,0.12)',
              clipPath: 'inset(45% 0 45% 0)',
            }}
          />
        ))}

        {/* Inner sphere gradient */}
        <div
          className="absolute inset-[10%] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.14), transparent 40%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Spinning outer decorative orbit rings */}
        <div
          className="absolute inset-[-14%] rounded-full border-2 animate-[spin-slow_25s_linear_infinite]"
          style={{
            borderColor: isLight ? 'rgba(37,99,235,0.22)' : 'rgba(96,165,250,0.18)',
            transform: 'perspective(800px) rotateX(68deg) rotateZ(0deg)',
            boxShadow: `0 0 30px ${isLight ? 'rgba(37,99,235,0.15)' : 'rgba(96,165,250,0.1)'}`,
          }}
        >
          {/* Satellite dots on this ring */}
          <div
            className="absolute left-1/2 top-0 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: isLight ? '#f59e0b' : '#fbbf24',
              boxShadow: `0 0 12px ${isLight ? '#f59e0b' : '#fbbf24'}`,
            }}
          />
        </div>
        <div
          className="absolute inset-[-7%] rounded-full border animate-[spin-slow_38s_linear_infinite_reverse]"
          style={{
            borderColor: isLight ? 'rgba(20,184,166,0.22)' : 'rgba(52,211,153,0.18)',
            transform: 'perspective(800px) rotateX(56deg) rotateY(20deg)',
          }}
        >
          <div
            className="absolute left-0 top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: isLight ? '#e11d48' : '#fb7185',
              boxShadow: `0 0 10px ${isLight ? '#e11d48' : '#fb7185'}`,
            }}
          />
        </div>
        <div
          className="absolute inset-[-18%] rounded-full border animate-[spin-slow_50s_linear_infinite]"
          style={{
            borderColor: isLight ? 'rgba(236,72,153,0.18)' : 'rgba(244,114,182,0.14)',
            transform: 'perspective(800px) rotateX(78deg) rotateY(-15deg)',
          }}
        />

        {/* Lahore marker with pulsing rings */}
        <div className="absolute" style={{ top: '38%', left: '58%' }}>
          <div className="relative w-4 h-4">
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                background: isLight ? 'rgba(225,29,72,0.35)' : 'rgba(251,113,133,0.35)',
              }}
            />
            <div
              className="absolute inset-[20%] rounded-full animate-pulse"
              style={{
                background: isLight ? '#e11d48' : '#fb7185',
                boxShadow: `0 0 18px ${isLight ? '#e11d48' : '#fb7185'}, 0 0 40px ${isLight ? 'rgba(225,29,72,0.5)' : 'rgba(251,113,133,0.4)'}`,
              }}
            />
          </div>
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[9px] font-mono font-bold"
            style={{
              background: isLight ? 'rgba(15,23,42,0.9)' : 'rgba(0,0,0,0.7)',
              border: `1px solid ${isLight ? 'rgba(225,29,72,0.4)' : 'rgba(251,113,133,0.4)'}`,
              color: isLight ? '#fecdd3' : '#fecdd3',
            }}
          >
            Lahore
          </div>
        </div>

        {/* Floating ambient particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`p-${i}`}
            className="absolute rounded-full"
            style={{
              width: seeded(i, 3.14) * 3 + 1,
              height: seeded(i, 3.14) * 3 + 1,
              top: `${seeded(i, 2.71) * 100}%`,
              left: `${seeded(i, 1.61) * 100}%`,
              background: i % 3 === 0 ? (isLight ? '#22d3ee' : '#67e8f9') : i % 3 === 1 ? (isLight ? '#14b8a6' : '#34d399') : (isLight ? '#fbbf24' : '#fde047'),
              opacity: 0.35 + seeded(i, 5.55) * 0.4,
              animation: `float ${3 + seeded(i, 9.9) * 4}s ease-in-out ${seeded(i, 7.7) * 2}s infinite`,
              boxShadow: `0 0 ${4 + seeded(i, 6.2) * 6}px currentColor`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function getCanvasMode() {
  if (typeof window === 'undefined') return { reduced: true, mobile: true };
  const isMobile = window.innerWidth < 768;
  return { reduced: prefersReducedMotion(), mobile: isMobile };
}

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mode, setMode] = useState(getCanvasMode);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const onResize = () => setMode(getCanvasMode());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (mode.reduced || mode.mobile || failed || !mountRef.current) return;

    const mount = mountRef.current;
    let disposed = false;

    try {
      const colors = getColors(theme);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / Math.max(1, mount.clientHeight), 0.1, 200);
      camera.position.z = 7.8;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(Math.max(1, mount.clientWidth), Math.max(1, mount.clientHeight));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // ── Main globe: two layers for depth and color variation ──
      const EARTH_R = 2.2;

      function buildSpherePoints(count: number, r: number, salt1: number, salt2: number) {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const c1 = new THREE.Color(colors.globe);
        const c2 = new THREE.Color(colors.globeAlt);
        for (let i = 0; i < count; i++) {
          const phi = Math.acos(2 * seeded(i, salt1) - 1);
          const theta = 2 * Math.PI * seeded(i, salt2);
          pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
          pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          pos[i * 3 + 2] = r * Math.cos(phi);
          // blend color by latitude for visual variation
          const latT = Math.abs(Math.cos(phi));
          const mix = c1.clone().lerp(c2, latT * (0.3 + seeded(i, 1.11) * 0.4));
          col[i * 3]     = mix.r;
          col[i * 3 + 1] = mix.g;
          col[i * 3 + 2] = mix.b;
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        g.setAttribute('color', new THREE.BufferAttribute(col, 3));
        return g;
      }

      const earthGeo1 = buildSpherePoints(5200, EARTH_R, 12.9898, 78.233);
      const earthMat1 = new THREE.PointsMaterial({
        size: colors.globeSize,
        transparent: true,
        opacity: colors.globeOpacity,
        sizeAttenuation: true,
        blending: colors.blending,
        depthWrite: false,
        vertexColors: true,
      });
      const earth = new THREE.Points(earthGeo1, earthMat1);
      scene.add(earth);

      // outer sparse layer: slightly larger radius, bigger points
      const earthGeo2 = buildSpherePoints(1400, EARTH_R * 1.02, 44.55, 66.77);
      const earthMat2 = new THREE.PointsMaterial({
        size: colors.globeSize * 1.45,
        transparent: true,
        opacity: Math.min(1, colors.globeOpacity * 0.55),
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true,
      });
      const earthOuter = new THREE.Points(earthGeo2, earthMat2);
      scene.add(earthOuter);

      // ── Atmosphere halo: sprite-like backside sphere shader ──
      const atmosGeo = new THREE.SphereGeometry(EARTH_R * 1.16, 64, 64);
      const atmosMat = new THREE.ShaderMaterial({
        uniforms: {
          cInner: { value: new THREE.Color(colors.atmosInner) },
          cOuter: { value: new THREE.Color(colors.atmosOuter) },
          p:      { value: 3.0 },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPos;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vPos = mv.xyz;
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPos;
          uniform vec3 cInner;
          uniform vec3 cOuter;
          uniform float p;
          void main() {
            vec3 viewDir = normalize(-vPos);
            float rim = 1.0 - max(0.0, dot(viewDir, vNormal));
            rim = pow(rim, p);
            vec3 col = mix(cInner, cOuter, rim);
            gl_FragColor = vec4(col, rim * 0.85);
          }
        `,
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
      scene.add(atmosphere);

      // ── Starfield: two layers with depth parallax ──
      function buildStars(count: number, spread: number, size: number, opacity: number) {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          pos[i * 3]     = (seeded(i, 45.164 + spread) - 0.5) * spread;
          pos[i * 3 + 1] = (seeded(i, 91.542 + spread) - 0.5) * (spread * 0.75);
          pos[i * 3 + 2] = (seeded(i, 33.891 + spread) - 0.5) * (spread * 0.6) - spread * 0.15;
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        return new THREE.Points(
          g,
          new THREE.PointsMaterial({
            color: colors.stars,
            size,
            transparent: true,
            opacity,
            sizeAttenuation: false,
            depthWrite: false,
          })
        );
      }
      const starsFar  = buildStars(900, 30, 0.7,  colors.starOpacity * 0.7);
      const starsNear = buildStars(350, 18, 1.25, colors.starOpacity);
      scene.add(starsFar);
      scene.add(starsNear);

      // ── Orbit rings (tilted ellipses of points) ──
      function buildOrbit(radiusX: number, radiusY: number, tilt: number, count: number, color: number) {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2;
          const x = Math.cos(a) * radiusX;
          const y = Math.sin(a) * radiusY * 0.15;
          const z = Math.sin(a) * radiusX;
          // tilt around X axis
          const cy = Math.cos(tilt), sy = Math.sin(tilt);
          const y2 = y * cy - z * sy;
          const z2 = y * sy + z * cy;
          pos[i * 3]     = x;
          pos[i * 3 + 1] = y2;
          pos[i * 3 + 2] = z2;
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        return new THREE.Points(
          g,
          new THREE.PointsMaterial({
            color,
            size: colors.globeSize * 0.65,
            transparent: true,
            opacity: 0.75,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
      }
      const ring1 = buildOrbit(EARTH_R * 1.42, EARTH_R * 1.42,  0.32,  260, colors.globeAlt);
      const ring2 = buildOrbit(EARTH_R * 1.62, EARTH_R * 1.62, -0.58,  320, colors.atmosOuter);
      const ring3 = buildOrbit(EARTH_R * 1.85, EARTH_R * 1.85,  0.92,  380, colors.glow);
      scene.add(ring1);
      scene.add(ring2);
      scene.add(ring3);

      // ── Satellites on orbits (big glowing points) ──
      const satColors = [colors.marker, 0xfbbf24, colors.atmosOuter, colors.glow];
      const satellites: { mesh: THREE.Mesh; ring: number; phase: number; r: number; speed: number }[] = [];
      for (let i = 0; i < 5; i++) {
        const sat = new THREE.Mesh(
          new THREE.SphereGeometry(0.055, 16, 16),
          new THREE.MeshBasicMaterial({ color: satColors[i % satColors.length] })
        );
        scene.add(sat);
        const ringIndex = i % 3;
        const r = EARTH_R * (1.42 + ringIndex * 0.22);
        satellites.push({
          mesh: sat,
          ring: ringIndex,
          phase: (i / 5) * Math.PI * 2,
          r,
          speed: 0.18 + (i % 3) * 0.08,
        });
        // satellite light
        const sl = new THREE.PointLight(satColors[i % satColors.length], 1.2, 2.5);
        sat.add(sl);
      }

      // ── Connection arcs (curves between random surface points) ──
      const arcGroup = new THREE.Group();
      scene.add(arcGroup);
      const ARC_COUNT = 7;
      const arcs: { line: THREE.Line; t: number; speed: number }[] = [];
      function buildArc(src: THREE.Vector3, dst: THREE.Vector3, color: number) {
        const steps = 60;
        const pos = new Float32Array((steps + 1) * 3);
        const axis = new THREE.Vector3().crossVectors(src, dst).normalize();
        const angle = src.angleTo(dst);
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          // interpolate rotation + lift
          const q = new THREE.Quaternion().setFromAxisAngle(axis, angle * t);
          const lifted = src.clone().multiplyScalar(1 + Math.sin(t * Math.PI) * 0.38);
          lifted.applyQuaternion(q);
          pos[s * 3]     = lifted.x;
          pos[s * 3 + 1] = lifted.y;
          pos[s * 3 + 2] = lifted.z;
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const mat = new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        return new THREE.Line(g, mat);
      }
      function randomSurfacePoint(r: number, salt: number) {
        const phi = Math.acos(2 * seeded(salt, 9.1) - 1);
        const theta = 2 * Math.PI * seeded(salt, 4.7);
        return new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        );
      }
      for (let a = 0; a < ARC_COUNT; a++) {
        const p1 = randomSurfacePoint(EARTH_R, a * 13 + 1);
        const p2 = randomSurfacePoint(EARTH_R, a * 17 + 5);
        const arc = buildArc(p1, p2, a % 2 === 0 ? colors.globeAlt : colors.glow);
        arcGroup.add(arc);
        arcs.push({ line: arc, t: Math.random() * 4, speed: 0.12 + Math.random() * 0.18 });
      }

      // ── Marker: Lahore ──
      const markerPos = lahoreMarkerPosition(EARTH_R);
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.075, 20, 20),
        new THREE.MeshBasicMaterial({ color: colors.marker })
      );
      marker.position.copy(markerPos);
      scene.add(marker);

      // Marker ripple rings
      const ripples: THREE.Mesh[] = [];
      for (let r = 0; r < 3; r++) {
        const rippleGeo = new THREE.RingGeometry(EARTH_R * 1.005, EARTH_R * 1.008, 64);
        const rippleMat = new THREE.MeshBasicMaterial({
          color: colors.marker,
          transparent: true,
          opacity: 0.6,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const ripple = new THREE.Mesh(rippleGeo, rippleMat);
        ripple.position.copy(markerPos).multiplyScalar(1.001);
        ripple.lookAt(new THREE.Vector3(0, 0, 0));
        ripple.scale.setScalar(0.2 + r * 0.1);
        arcGroup.add(ripple);
        ripples.push(ripple);
      }

      const markerLight = new THREE.PointLight(colors.marker, 2.6, 3.2);
      markerLight.position.copy(markerPos);
      scene.add(markerLight);

      // ── Lights ──
      const keyLight = new THREE.PointLight(colors.glow, theme === 'light' ? 3.6 : 3.2, 28);
      keyLight.position.set(6, 4, 6);
      scene.add(keyLight);

      const fillLight = new THREE.PointLight(colors.globe, theme === 'light' ? 2.4 : 1.8, 20);
      fillLight.position.set(-5, -3, 4);
      scene.add(fillLight);

      scene.add(new THREE.AmbientLight(0xffffff, theme === 'light' ? 0.65 : 0.45));

      // ── Animation loop ──
      let rafId = 0;
      const start = performance.now();
      let pointerX = 0;
      let pointerY = 0;
      let targetRotY = 0;
      let targetRotX = 0;
      let baseRotY = 0;

      const onPointerMove = (e: PointerEvent) => {
        const rect = mount.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        pointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointerY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      };
      mount.addEventListener('pointermove', onPointerMove);

      // gentle scroll parallax
      let scrollT = 0;
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight || 1;
        scrollT = Math.min(1, Math.max(0, window.scrollY / max));
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      const animate = (now: number) => {
        if (disposed) return;
        const t = (now - start) / 1000;
        const delta = 0.016;

        targetRotY = pointerX * 0.55;
        targetRotX = pointerY * 0.22;

        baseRotY += delta * 0.08;

        const combinedY = targetRotY + baseRotY - scrollT * 1.2;
        const combinedX = targetRotX + Math.sin(t * 0.3) * 0.06 + scrollT * 0.3;

        earth.rotation.y      += (combinedY - earth.rotation.y)     * 0.035;
        earth.rotation.x      += (combinedX - earth.rotation.x)     * 0.03;
        earthOuter.rotation.y  = earth.rotation.y * 1.05;
        earthOuter.rotation.x  = earth.rotation.x;
        ring1.rotation.z += delta * 0.12;
        ring2.rotation.z -= delta * 0.09;
        ring3.rotation.z += delta * 0.07;
        atmosphere.rotation.y = earth.rotation.y * 0.3;
        starsFar.rotation.y  -= delta * 0.008;
        starsFar.rotation.x  += delta * 0.003;
        starsNear.rotation.y += delta * 0.015;
        starsNear.rotation.x -= delta * 0.006;

        // satellites
        for (const s of satellites) {
          const a = s.phase + t * s.speed * (s.ring % 2 === 0 ? 1 : -1);
          const tilt = s.ring === 0 ? 0.32 : s.ring === 1 ? -0.58 : 0.92;
          const x = Math.cos(a) * s.r;
          const y = Math.sin(a) * s.r * 0.15;
          const z = Math.sin(a) * s.r;
          const cy = Math.cos(tilt), sy = Math.sin(tilt);
          s.mesh.position.set(x, y * cy - z * sy, y * sy + z * cy);
          s.mesh.scale.setScalar(1 + Math.sin(t * 3 + s.phase) * 0.25);
        }

        // marker pulse
        const pulse = 1 + Math.sin(t * 3.5) * 0.3;
        marker.scale.setScalar(pulse);

        // ripples
        for (let r = 0; r < ripples.length; r++) {
          const phase = ((t * 0.6 + r * 0.33) % 1);
          const s = 0.2 + phase * 2.2;
          ripples[r].scale.setScalar(s);
          (ripples[r].material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.55 * (1 - phase));
        }

        // arcs visibility cycling
        for (const a of arcs) {
          a.t += delta * a.speed;
          const phase = (Math.sin(a.t) + 1) * 0.5; // 0..1
          (a.line.material as THREE.LineBasicMaterial).opacity = phase * 0.75;
        }

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };
      rafId = requestAnimationFrame(animate);

      // ── Resize ──
      const onResize = () => {
        if (!mount.clientWidth || !mount.clientHeight) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener('resize', onResize);

      // ── Visibility pause / resume (save GPU) ──
      const onVis = () => { if (document.hidden) cancelAnimationFrame(rafId); else rafId = requestAnimationFrame(animate); };
      document.addEventListener('visibilitychange', onVis);

      // cleanup
      const cleanup = () => {
        disposed = true;
        cancelAnimationFrame(rafId);
        mount.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('scroll', onScroll);
        document.removeEventListener('visibilitychange', onVis);
        earthGeo1.dispose(); earthMat1.dispose();
        earthGeo2.dispose(); earthMat2.dispose();
        atmosGeo.dispose(); atmosMat.dispose();
        starsFar.geometry.dispose(); (starsFar.material as THREE.Material).dispose();
        starsNear.geometry.dispose(); (starsNear.material as THREE.Material).dispose();
        ring1.geometry.dispose(); (ring1.material as THREE.Material).dispose();
        ring2.geometry.dispose(); (ring2.material as THREE.Material).dispose();
        ring3.geometry.dispose(); (ring3.material as THREE.Material).dispose();
        for (const s of satellites) { s.mesh.geometry.dispose(); (s.mesh.material as THREE.Material).dispose(); }
        for (const a of arcs) { a.line.geometry.dispose(); (a.line.material as THREE.Material).dispose(); }
        for (const r of ripples) { r.geometry.dispose(); (r.material as THREE.Material).dispose(); }
        (marker.geometry as THREE.BufferGeometry).dispose(); (marker.material as THREE.Material).dispose();
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
      return cleanup;
    } catch (err) {
      console.warn('[HeroCanvas] failed to init, falling back to static', err);
      queueMicrotask(() => setFailed(true));
      return undefined;
    }
  }, [mode.reduced, mode.mobile, theme, failed]);

  if (mode.reduced || mode.mobile || failed) return <StaticGlobe />;

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ willChange: 'transform' }}
    />
  );
}
