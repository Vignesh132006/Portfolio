'use client';
import { useEffect, useRef } from 'react';

export default function CinematicLayer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let active = true;
    let animId;
    let renderer, scene, camera, particles, geo;
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    let onMouse, onResize;

    const init = async () => {
      const THREE = await import('three');
      if (!active) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      const COUNT = 200;
      const positions = new Float32Array(COUNT * 3);
      const colors    = new Float32Array(COUNT * 3);
      const phases    = new Float32Array(COUNT);

      const orange  = new THREE.Color(0xff8c42);
      const white   = new THREE.Color(0xfff6ee);
      const blue    = new THREE.Color(0x4488ff);
      const amber   = new THREE.Color(0xffb347);

      for (let i = 0; i < COUNT; i++) {
        positions[i*3]   = (Math.random() - 0.5) * 18;
        positions[i*3+1] = (Math.random() - 0.5) * 11;
        positions[i*3+2] = (Math.random() - 0.5) * 9 - 2;
        const r = Math.random();
        const c = r < 0.35 ? orange : r < 0.6 ? white : r < 0.8 ? amber : blue;
        colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
        phases[i] = Math.random() * Math.PI * 2;
      }

      geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

      // Soft bokeh disc texture
      const bSize = 64;
      const bc = document.createElement('canvas');
      bc.width = bc.height = bSize;
      const bx = bc.getContext('2d');
      const gr = bx.createRadialGradient(bSize/2,bSize/2,0,bSize/2,bSize/2,bSize/2);
      gr.addColorStop(0,   'rgba(255,255,255,1)');
      gr.addColorStop(0.25,'rgba(255,255,255,0.7)');
      gr.addColorStop(0.6, 'rgba(255,255,255,0.15)');
      gr.addColorStop(1,   'rgba(255,255,255,0)');
      bx.fillStyle = gr; bx.fillRect(0,0,bSize,bSize);
      const tex = new THREE.CanvasTexture(bc);

      const mat = new THREE.PointsMaterial({
        size: 0.13, vertexColors: true, map: tex,
        transparent: true, opacity: 0.5,
        blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
      });

      particles = new THREE.Points(geo, mat);
      scene.add(particles);

      onMouse = e => {
        mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
        mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('mousemove', onMouse);
      window.addEventListener('resize', onResize);

      const pos = geo.attributes.position.array;
      let t = 0;
      const tick = () => {
        if (!active) return;
        animId = requestAnimationFrame(tick);
        t += 0.006;
        for (let i = 0; i < COUNT; i++) {
          pos[i*3+1] += Math.sin(t + phases[i]) * 0.0018;
          pos[i*3]   += Math.cos(t * 0.7 + phases[i]) * 0.001;
        }
        geo.attributes.position.needsUpdate = true;
        targetX += (mouseX * 0.35 - targetX) * 0.04;
        targetY += (mouseY * 0.25 - targetY) * 0.04;
        camera.position.x = targetX;
        camera.position.y = targetY;
        camera.lookAt(scene.position);
        particles.rotation.y = t * 0.01;
        particles.rotation.x = Math.sin(t * 0.05) * 0.04;
        renderer.render(scene, camera);
      };
      tick();
    };

    init();
    return () => {
      active = false;
      cancelAnimationFrame(animId);
      if (onMouse) window.removeEventListener('mousemove', onMouse);
      if (onResize) window.removeEventListener('resize', onResize);
      if (geo) geo.dispose();
      if (renderer) { renderer.dispose(); renderer.forceContextLoss(); }
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position:'absolute', inset:0, width:'100%', height:'100%',
      pointerEvents:'none', zIndex:3, mixBlendMode:'screen',
    }}/>
  );
}
