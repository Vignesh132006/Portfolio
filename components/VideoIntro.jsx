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
  const [playing, setPlaying] = useState(false);
  const [entered, setEntered] = useState(false);
  const [loaded,  setLoaded]  = useState(false);

  useEffect(() => {
    const run = async () => {
      const { gsap } = await import('gsap');
      gsap.fromTo(heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.out' }
      );
    };
    run();
  }, []);

  const handleEnter = useCallback(async () => {
    const v = videoRef.current;
    const bg = bgVideoRef.current;
    if (v) {
      v.muted = false;
      v.play().catch(e => console.log("Video play failed:", e));
    }
    if (bg) {
      bg.muted = true;
      bg.play().catch(e => console.log("BG play failed:", e));
    }
    setPlaying(true);
    setMuted(false);

    const { gsap } = await import('gsap');
    
    // Fade out splash overlay
    gsap.to('#splash', {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => {
        setEntered(true);
      }
    });

    // Stagger reveal main portfolio header and details
    if (contentRef.current) {
      const els = contentRef.current.querySelectorAll('[data-anim]');
      gsap.fromTo(els,
        { opacity: 0, y: 36, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.3, stagger: 0.15, ease: 'power3.out' }
      );
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
          src={videoSrc} muted playsInline aria-hidden="true" />
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
          src={videoSrc} muted={muted} playsInline
          onCanPlay={() => setLoaded(true)}
          onEnded={handleEnded} />
        <div className={styles.videoVignette} />
      </div>

      {/* ── Portfolio content ── */}
      <div ref={contentRef} className={styles.content} style={{ opacity: entered || playing ? 1 : 0 }}>

        <div data-anim className={styles.statusBadge}>
          <span className={styles.statusDot} />
          Available for opportunities · 2026
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
            <span className={styles.statNum}>1549</span>
            <span className={styles.statLabel}>LeetCode Rating</span>
          </div>
          <div className={styles.statDiv} />
          <div className={styles.stat}>
            <span className={styles.statNum}>1419</span>
            <span className={styles.statLabel}>CodeChef Rating</span>
          </div>
          <div className={styles.statDiv} />
          <div className={styles.stat}>
            <span className={styles.statNum}>150+</span>
            <span className={styles.statLabel}>Overall Contest</span>
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

      {/* Splash Screen */}
      {!entered && (
        <div id="splash" className={styles.splashOverlay}>
          <div className={styles.splashGlass}>
            <span className={styles.splashEyebrow}>CINEMATIC PORTFOLIO</span>
            <h1 className={styles.splashTitle}>VIGNESH S</h1>
            <p className={styles.splashDesc}>
              CSE Student · Competitive Programmer · Full Stack
            </p>
            <button className={styles.enterBtn} onClick={handleEnter}>
              <span className={styles.enterBtnText}>ENTER EXPERIENCE</span>
              <span className={styles.enterBtnArrow}>→</span>
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
