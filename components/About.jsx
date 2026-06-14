'use client';
import { useEffect, useRef } from 'react';
import styles from '../styles/About.module.css';

const projects = [
  {
    title: 'E-Commerce Website',
    role: 'Frontend Developer',
    desc: 'Apple AirPods store built with HTML, CSS & JavaScript. Responsive design with product listings, cart UI, and smooth navigation.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    icon: '🛒',
  },
  {
    title: 'Traffic Detection & Classification',
    role: 'Deep Neural Network',
    desc: 'Real-time traffic analysis system using Python and deep neural networks, achieving high-accuracy detection and classification.',
    tags: ['Python', 'Deep Learning', 'Computer Vision'],
    icon: '🚦',
  },
  {
    title: 'Version Control System',
    role: 'Full Stack Developer',
    desc: 'Custom VCS built with Python & MySQL featuring file tracking, version history, commit management, rollback, and automated backups.',
    tags: ['Python', 'MySQL', 'Full Stack'],
    icon: '🔧',
  },
];

const skills = ['C', 'Python', 'C++', 'Java', 'HTML', 'CSS', 'JavaScript', 'Git', 'GitHub', 'VS Code', 'DSA', 'OOP', 'OS'];
const certs = [
  'NPTEL Java Certification — 67%',
  'Foundation of Python — Infosys Springboard',
  'Foundation of Java — Infosys Springboard',
  'Web Development (HTML & CSS) — Infosys Springboard',
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let active = true;
    let ctx;
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (!active) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const cards = sectionRef.current?.querySelectorAll('[data-reveal]');
        if (!cards) return;
        gsap.fromTo(cards,
          { opacity: 0, y: 50, filter: 'blur(8px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 1, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
      }, sectionRef);
    };
    run();
    return () => {
      active = false;
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className={styles.wrapper}>

      {/* About */}
      <section id="about" className={styles.section}>
        <div className={styles.inner}>
          <span data-reveal className={styles.eyebrow}>ABOUT</span>
          <h2 data-reveal className={styles.heading}>
            Code is my<br/><em>craft.</em>
          </h2>
          <p data-reveal className={styles.body}>
            I'm Vignesh S, a Computer Science & Engineering student at KIT — Kalaignarkarunanidhi
            Institute of Technology (CGPA 7.95). Passionate about competitive programming,
            full-stack development, and building tools that solve real problems.
            Currently interning at LearnLogicify Technologies as a Full Stack Developer.
          </p>

          {/* Stats */}
          <div data-reveal className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statBig}>1500+</span>
              <span className={styles.statSub}>Problems Solved</span>
              <span className={styles.statMeta}>LeetCode · CodeChef · GFG</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statBig}>1419</span>
              <span className={styles.statSub}>CodeChef Rating</span>
              <span className={styles.statMeta}>Competitive Programming</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statBig}>150+</span>
              <span className={styles.statSub}>Contests</span>
              <span className={styles.statMeta}>Weekly Participation</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statBig}>7.95</span>
              <span className={styles.statSub}>CGPA</span>
              <span className={styles.statMeta}>B.E. CSE · 2023–2027</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <span data-reveal className={styles.eyebrow}>SKILLS</span>
          <h2 data-reveal className={styles.heading}>Tech stack.</h2>
          <div data-reveal className={styles.skillsWrap}>
            {skills.map(s => (
              <span key={s} className={styles.skillPill}>{s}</span>
            ))}
          </div>
          <div data-reveal className={styles.softSkills}>
            {['Team Management','Problem Solving','Leadership','Communication'].map(s => (
              <div key={s} className={styles.softPill}>
                <span className={styles.softDot}/>
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <span data-reveal className={styles.eyebrow}>EXPERIENCE</span>
          <h2 data-reveal className={styles.heading}>Where I've<br/>worked.</h2>
          <div data-reveal className={styles.expCard}>
            <div className={styles.expLeft}>
              <span className={styles.expRole}>Full Stack Developer</span>
              <span className={styles.expCompany}>LearnLogicify Technologies</span>
              <span className={styles.expType}>Internship</span>
            </div>
            <div className={styles.expRight}>
              <span className={styles.expDate}>02 Jun – 28 Jun 2025</span>
              <span className={styles.expLoc}>Tamil Nadu, India</span>
              <ul className={styles.expList}>
                <li>Developed full-stack features integrating frontend UI with backend APIs</li>
                <li>Managed databases, performed testing &amp; optimised application performance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <span data-reveal className={styles.eyebrow}>PROJECTS</span>
          <h2 data-reveal className={styles.heading}>Things I've<br/>built.</h2>
          <div className={styles.projectsGrid}>
            {projects.map(p => (
              <div key={p.title} data-reveal className={styles.projectCard}>
                <span className={styles.projectIcon}>{p.icon}</span>
                <div>
                  <span className={styles.projectRole}>{p.role}</span>
                  <h3 className={styles.projectTitle}>{p.title}</h3>
                  <p className={styles.projectDesc}>{p.desc}</p>
                  <div className={styles.projectTags}>
                    {p.tags.map(t => <span key={t} className={styles.projectTag}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <span data-reveal className={styles.eyebrow}>CERTIFICATIONS</span>
          <h2 data-reveal className={styles.heading}>Credentials.</h2>
          <div data-reveal className={styles.certList}>
            {certs.map(c => (
              <div key={c} className={styles.certItem}>
                <span className={styles.certIcon}>✦</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <span data-reveal className={styles.eyebrow}>CONTACT</span>
          <h2 data-reveal className={styles.heading}>Let's connect.</h2>
          <div data-reveal className={styles.contactGrid}>
            <a href="mailto:kit27.cse62@gmail.com" className={styles.contactCard}>
              <span className={styles.contactIcon}>✉</span>
              <span className={styles.contactLabel}>Email</span>
              <span className={styles.contactVal}>kit27.cse62@gmail.com</span>
            </a>
            <a href="tel:9489251910" className={styles.contactCard}>
              <span className={styles.contactIcon}>☎</span>
              <span className={styles.contactLabel}>Phone</span>
              <span className={styles.contactVal}>+91 9489251910</span>
            </a>
            <a href="https://leetcode.com/u/vickysaravanan/" target="_blank" rel="noreferrer" className={styles.contactCard}>
              <span className={styles.contactIcon}>⌨</span>
              <span className={styles.contactLabel}>LeetCode</span>
              <span className={styles.contactVal}>vickysaravanan</span>
            </a>
            <a href="https://www.codechef.com/users/vignesh062" target="_blank" rel="noreferrer" className={styles.contactCard}>
              <span className={styles.contactIcon}>🏆</span>
              <span className={styles.contactLabel}>CodeChef</span>
              <span className={styles.contactVal}>vignesh062</span>
            </a>
            <a href="https://github.com/Vignesh132006" target="_blank" rel="noreferrer" className={styles.contactCard}>
              <span className={styles.contactIcon}>⬡</span>
              <span className={styles.contactLabel}>GitHub</span>
              <span className={styles.contactVal}>Vignesh132006</span>
            </a>
            <div className={styles.contactCard}>
              <span className={styles.contactIcon}>📍</span>
              <span className={styles.contactLabel}>Location</span>
              <span className={styles.contactVal}>Coimbatore, Tamil Nadu</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
