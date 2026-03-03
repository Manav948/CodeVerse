"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CodeVerseHero() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 25);
    camera.rotation.x = -0.25;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Geometry
    const geometry = new THREE.PlaneGeometry(100, 100, 150, 150);

    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FF474C"),
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -3;
    scene.add(plane);

    // Lights (soft glow effect)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      const positions = geometry.attributes.position;

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);

        const wave =
          Math.sin(x * 0.25 + time) * 0.7 +
          Math.cos(y * 0.25 + time) * 0.7;

        positions.setZ(i, wave);
      }

      positions.needsUpdate = true;

      // Smooth camera motion
      camera.position.x = Math.sin(time * 0.1) * 2;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);

      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden text-white">
      <div
        ref={mountRef}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: "none" }}
      />
      <div className="absolute top-0 left-0 w-125 h-125 bg-cyan-500/20 rounded-full blur-[120px] z-10" />
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-purple-500/20 rounded-full blur-[120px] z-10" />
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/70 to-black z-20" />

      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-6">

        <span className="px-4 py-1 text-sm bg-cyan-500/10 text-white rounded-full border border-red-400 backdrop-blur-md tracking-wide">
          The Developer Public Workspace
        </span>

        <h1 className="mt-8 text-5xl md:text-7xl font-bold leading-tight tracking-tight">
          Create. Share.
          <br />
          <span className="bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Build Your Code Identity.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-gray-400 text-lg leading-relaxed">
          Publish technical posts, showcase reusable snippets,
          ask meaningful questions, and manage development tasks —
          all in one focused ecosystem designed for modern developers.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <span>• Write & Share Posts</span>
          <span>• Save & Reuse Snippets</span>
          <span>• Ask & Answer Questions</span>
          <span>• Track Development Tasks</span>
        </div>

        <div className="mt-12 flex gap-6 flex-wrap justify-center">
          <button className="px-8 py-3 bg-red-500/60 hover:bg-red-600/60 rounded-xl font-semibold shadow-lg shadow-red-500/60 transition">
            Start Building →
          </button>

          <button className="px-8 py-3 border border-gray-700 rounded-xl backdrop-blur-md hover:border-red-400 transition">
            Explore Features
          </button>
        </div>

      </div>
    </section>
  );
}