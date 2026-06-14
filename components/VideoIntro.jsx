'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/VideoIntro.module.css';

const CinematicLayer = dynamic(() => import('./CinematicLayer'), { ssr: false });

export default function VideoIntro({ videoSrc = '/hero-video.mp4' }) {
  const videoRef    = useRef(null);
  const bgVideoRef  = useRef(null);
  const heroRef     = useRef(null);
  const contentRef  = useRef(null);
  const [muted,   setMuted]   = useState(true);
  const [playing, setPlaying] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const [loaded,  setLoaded]  = useState(false);

  useEffect(() => {
    const run = async () => {
      const { gsap } = await import('gsap');
      const tl = gsap.timeline({ delay: 0.4 });
      tl.fromTo(heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: 'power2.out' }
      );
      if (contentRef.current) {
        const els = contentRef.current.querySelectorAll('[data-anim]');
        tl.fromTo(els,
          { opacity: 0, y: 36, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.3, stagger: 0.15, ease: 'power3.out' },
          '-=1'
        );
      }
    };
    run();
  }, [loaded]);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4500);
    return () => clearTimeout(t);
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    setShowHint(false);
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    const bg = bgVideoRef.current;
    if (!v) return;
    if (v.paused) {
      if (v.ended) { v.currentTime = 0; }
      v.play();
      if (bg) {
        if (bg.ended) { bg.currentTime = 0; }
        bg.play();
      }
      setPlaying(true);
    }
    else {
      v.pause();
      bg?.pause();
      setPlaying(false);
    }
  }, []);

  const handleEnded = useCallback(() => {
    setPlaying(false);
    bgVideoRef.current?.pause();
  }, []);

  const scrollToNext = useCallback(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
      ?? window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>

      {/* Ambient blurred BG */}
      <div className={styles.ambientLayer}>
        <video ref={bgVideoRef} className={styles.bgVideo}
          src={videoSrc} autoPlay muted playsInline aria-hidden="true" />
        <div className={styles.ambientBlur} />
      </div>

      {/* Gradient overlays */}
      <div className={styles.gradOverlay} />
      <div className={styles.gradBottom} />
      <div className={styles.gradSides} />

      {/* Three.js particles */}
      <CinematicLayer />

      {/* Foreground video */}
      <div className={styles.videoWrap}>
        <video ref={videoRef} className={styles.mainVideo}
          src={videoSrc} autoPlay muted={muted} playsInline
          onCanPlay={() => setLoaded(true)}
          onEnded={handleEnded} />
        <div className={styles.videoVignette} />
      </div>

      {/* ── Portfolio content ── */}
      <div ref={contentRef} className={styles.content}>

        <div data-anim className={styles.statusBadge}>
          <span className={styles.statusDot} />
          Available for opportunities · 2025
        </div>

        <span data-anim className={styles.tagline}>
          CSE STUDENT · COMPETITIVE PROGRAMMER · FULL STACK
        </span>

        <div className={styles.nameBlock}>
          <h1 data-anim className={styles.firstName}>VIGNESH</h1>
          <h1 data-anim className={styles.lastName}>S</h1>
        </div>

        <p data-anim className={styles.role}>
          Building real-world web solutions &amp; scalable systems.<br/>
          1500+ problems solved across LeetCode, CodeChef &amp; GFG.
        </p>

        <div data-anim className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statNum}>1500+</span>
            <span className={styles.statLabel}>Problems Solved</span>
          </div>
          <div className={styles.statDiv} />
          <div className={styles.stat}>
            <span className={styles.statNum}>1419</span>
            <span className={styles.statLabel}>CodeChef Rating</span>
          </div>
          <div className={styles.statDiv} />
          <div className={styles.stat}>
            <span className={styles.statNum}>150+</span>
            <span className={styles.statLabel}>Contests</span>
          </div>
        </div>

        <div data-anim className={styles.tags}>
          {['Python','C++','Java','React','Node.js','MySQL'].map((t, i) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>

      </div>



      {/* Scroll indicator */}
      <button className={styles.scrollBtn} onClick={scrollToNext} aria-label="Scroll down">
        <span className={styles.scrollLabel}>EXPLORE</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollPulse} />
        </div>
      </button>

    </section>
  );
}
