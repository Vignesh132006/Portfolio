'use client';
import { useEffect, useRef } from 'react';
import styles from '../styles/About.module.css';

const projects = [
  {
    title: 'E-Commerce Website',
    role: 'Frontend Developer',
    desc: 'An immersive Apple AirPods clone featuring high-fidelity animations, interactive product showcases, and a fully functional shopping cart UI. Designed as a seamless, high-performance web experience.',
    details: [
      'Built custom micro-animations using modern CSS transitions and interactive GSAP effects for realistic page transitions.',
      'Designed a responsive mobile-first UI with product grid systems, dynamic filters, and real-time cart subtotal calculations.',
      'Leveraged browser localStorage API to persist shopping cart items seamlessly across browser sessions.'
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Responsive Design'],
    icon: '🛒',
    github: 'https://github.com/Vignesh132006/AirPods-Store-Clone',
  },
  {
    title: 'Traffic Detection & Classification',
    role: 'Deep Neural Network',
    desc: 'A computer vision pipeline designed for real-time tracking, detection, and classification of vehicle classes in urban traffic environments. Powered by custom deep neural network models.',
    details: [
      'Trained deep learning architectures (YOLO/SSD) on customized traffic datasets to achieve high precision in multi-class vehicle detection.',
      'Implemented OpenCV tracking algorithms to monitor vehicular density and compute speed calculations across multiple lanes.',
      'Designed an administrative analytics dashboard to visualize peak traffic hours and classification statistics.'
    ],
    tags: ['Python', 'Deep Learning', 'Computer Vision', 'OpenCV', 'TensorFlow'],
    icon: '🚦',
    github: 'https://github.com/Vignesh132006/Traffic-Detection-Classification',
    link: 'https://huggingface.co/spaces/vignesh132006/Traffic_Analytics',
  },
  {
    title: 'Version Control System',
    role: 'Full Stack Developer',
    desc: 'A custom, lightweight version control CLI tool that replicates core Git functionalities for tracking, managing, and backing up source files. Integrates file compression and database tracking.',
    details: [
      'Developed hashing and compression algorithms to store historical snapshots and track line-by-line code changes.',
      'Engineered commit, rollback, and status commands using Python, storing file metadata in a MySQL database.',
      'Built automated daily remote backups to ensure repository persistence and fault-tolerant version tracking.'
    ],
    tags: ['Python', 'MySQL', 'System Design', 'File Compression', 'Git Core'],
    icon: '🔧',
    github: 'https://github.com/Vignesh132006/Version-Control-System-CLI',
  },
];

const skillsGrouped = [
  {
    category: 'Languages',
    items: ['C', 'C++', 'Java', 'Python'],
  },
  {
    category: 'Web',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express'],
  },
  {
    category: 'Database',
    items: ['MySQL', 'MongoDB'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'VS Code'],
  },
];
const certs = [
  {
    name: 'NPTEL Java Certification — 67%',
    link: 'https://drive.google.com/file/d/1K9dZ43lXQZ-HUexUjdX127Ru__GzvfKU/view?usp=sharing',
  },
  {
    name: 'Foundation of Python — Infosys Springboard',
    link: 'https://drive.google.com/file/d/1NOaLm8wETeVE5HvCn1LX-Ko6mnDIyqaX/view?usp=sharing',
  },
  {
    name: 'Foundation of Java — Infosys Springboard',
    link: 'https://drive.google.com/file/d/1HqtFn2xmXDAdlmTPf44CcozAkwg9AHgR/view?usp=sharing',
  },
  {
    name: 'Web Development (HTML & CSS) — Infosys Springboard',
    link: 'https://drive.google.com/file/d/1OQcL7VWlPawJynZFF80nsM1ngiscwsD7/view?usp=sharing',
  },
  {
    name: 'JavaScript — Infosys Springboard',
    link: 'https://drive.google.com/file/d/1vlkJuzf-dQosqiFrsza6wk-ADYf4yFqc/view?usp=sharing',
  },
  {
    name: 'React Web Developer Certification — Infosys Springboard',
    link: 'https://drive.google.com/file/d/1Xz6ASTKglsFN44bFtvDRW-5AoATHg3b4/view?usp=sharing',
  },
  {
    name: 'Linux Fundamentals — Red Hat',
    link: 'https://drive.google.com/file/d/1kDDcNLa4wZtU7QNsHb_zt2hjN91-ypA6/view?usp=sharing',
  },
  {
    name: 'SQL Basic — HackerRank',
    link: 'https://drive.google.com/file/d/1x_08RPlic6ZMLRNCn7KjFNHfYOCktMGr/view',
  },
  {
    name: 'Agent AI Workshop',
    link: 'https://drive.google.com/file/d/11DgP2CN4Co0OefF1eUEkLPXnNT_0YtYe/view?usp=sharing',
  },
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
              <span className={styles.statBig}>1549</span>
              <span className={styles.statSub}>LeetCode Rating</span>
              <span className={styles.statMeta}>Competitive Programming</span>
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
          <div data-reveal className={styles.skillsGroupedContainer}>
            {skillsGrouped.map((group) => (
              <div key={group.category} className={styles.skillGroup}>
                <h3 className={styles.skillGroupTitle}>{group.category}</h3>
                <div className={styles.skillsWrap}>
                  {group.items.map(s => (
                    <span key={s} className={styles.skillPill}>{s}</span>
                  ))}
                </div>
              </div>
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
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className={styles.expType}>Internship</span>
                <a
                  href="https://drive.google.com/file/d/1YVCpCGXd1uYed38m2jLwWxAsejjox47I/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.certLink}
                >
                  Certificate ↗
                </a>
              </div>
            </div>
            <div className={styles.expRight}>
              <span className={styles.expDate}>02 Jun – 28 Jun 2025</span>
              <span className={styles.expLoc}>Tamil Nadu, India</span>
              <ul className={styles.expList}>
                <li>Designed and implemented responsive frontend interfaces, successfully connecting them with backend RESTful APIs.</li>
                <li>Managed and optimized database schemas and queries in MySQL, reducing query response times and enhancing page loading speed.</li>
                <li>Conducted system integration testing, automated key workflow validations, and optimized overall frontend bundles.</li>
                <li>Collaborated on building secure authentication flows and resolved critical performance bottlenecks in dev/prod builds.</li>
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
                  <ul className={styles.projectList}>
                    {p.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                  <div className={styles.projectTags}>
                    {p.tags.map(t => <span key={t} className={styles.projectTag}>{t}</span>)}
                  </div>
                  <div className={styles.projectLinks}>
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.projectLink}
                      >
                        GitHub Code ↗
                      </a>
                    )}
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.projectLink}
                      >
                        {p.title === 'Traffic Detection & Classification' ? 'Hugging Face Space ↗' : 'Live Demo ↗'}
                      </a>
                    )}
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
              <div key={c.name} className={styles.certItem}>
                <span className={styles.certIcon}>✦</span>
                <span>{c.name}</span>
                {c.link && (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.certLink}
                  >
                    Certificate ↗
                  </a>
                )}
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
            <a href="https://www.linkedin.com/in/vignesh132006" target="_blank" rel="noreferrer" className={styles.contactCard}>
              <span className={styles.contactIcon}>💼</span>
              <span className={styles.contactLabel}>LinkedIn</span>
              <span className={styles.contactVal}>vignesh132006</span>
            </a>
            <a href="https://github.com/Vignesh132006" target="_blank" rel="noreferrer" className={styles.contactCard}>
              <span className={styles.contactIcon}>⬡</span>
              <span className={styles.contactLabel}>GitHub</span>
              <span className={styles.contactVal}>Vignesh132006</span>
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
            <a href="tel:9489251910" className={styles.contactCard}>
              <span className={styles.contactIcon}>☎</span>
              <span className={styles.contactLabel}>Phone</span>
              <span className={styles.contactVal}>+91 9489251910</span>
            </a>
            <div className={styles.contactCard}>
              <span className={styles.contactIcon}>📍</span>
              <span className={styles.contactLabel}>Location</span>
              <span className={styles.contactVal}>Coimbatore, Tamil Nadu</span>
            </div>
            <a href="/resume.pdf" download className={styles.contactCard}>
              <span className={styles.contactIcon}>📄</span>
              <span className={styles.contactLabel}>Resume</span>
              <span className={styles.contactVal}>Download PDF</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
