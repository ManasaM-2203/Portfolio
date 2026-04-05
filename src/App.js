import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// ── IMPORTANT: Place these files in your /src/assets/ folder ──
// profile.jpeg, oracle_cert.png, deloitte_cert.png, microsoft_cert.png, cil_cert.png, ibm_cert.png
// Then update the import paths below:
import profilePhoto from "./assets/profile.jpeg";
import oracleCert   from "./assets/oracle_cert.png";   // convert pdf→png or use jpg screenshot
import deloitteCert from "./assets/deloitte_cert.png";
import microsoftCert from "./assets/microsoft_cert.png";
import cilCert      from "./assets/cil_cert.png";
import ibmCert      from "./assets/ibm_cert.png";
import resumePDF    from "./assets/Manasa_M_Resume-4.pdf";
import jpMorganCert from "./assets/JP Morgan.png";

const NAV_LINKS = ["About", "Skills", "Experience", "Education", "Projects", "Certifications", "Contact"];

const SKILLS = {
  Languages: ["Python", "C++", "JavaScript"],
  "AI/ML": ["scikit-learn", "PyTorch", "Pandas", "NumPy", "Matplotlib", "RAG", "Whisper", "Transformers"],
  Frameworks: ["Flask", "Node.js", "React.js", "Express.js"],
  Databases: ["MongoDB", "MySQL"],
  "Tools & Platforms": ["Git", "Docker", "Kubernetes", "FastAPI", "Jupyter", "Colab", "AWS EC2", "Figma"],
};

const EXPERIENCE = [
  {
    company: "Desh AI Labs",
    role: "AI Intern",
    period: "Sep 2025 – Oct 2025",
    stack: "AWS EC2 · Python · Matcha TTS",
    points: [
      "Deployed Matcha TTS on AWS EC2, optimizing text-to-speech pipelines and audio preprocessing for production-grade performance.",
      "Implemented multiprocessing to improve audio generation throughput and scalability across concurrent requests.",
      "Designed Figma dashboard UI prototypes for an AI-based calling system, improving usability and operator workflow clarity.",
    ],
  },
];

const EDUCATION = [
  {
    institution: "Dayananda Sagar College of Engineering",
    degree: "B.E. in Artificial Intelligence & Machine Learning",
    period: "2023 – 2027",
    score: "CGPA: 9.4 / 10",
  },
  {
    institution: "Vidyaniketan PU College",
    degree: "PUC – PCMC (Karnataka State Board)",
    period: "2021 – 2023",
    score: "97.6%",
  },
  {
    institution: "VSSIPS",
    degree: "SSLC – Class 10 (CBSE)",
    period: "2019 – 2021",
    score: "95.6%",
  },
];

const PROJECTS = [
  {
    name: "Autonomous Agentic AI Ops Analyst",
    subtitle: "Predictive Infrastructure Intelligence System",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    stack: [
      "Python",
      "Flask",
      "React.js",
      "LangChain",
      "Ollama",
      "RAG",
      "Isolation Forest",
      "TF-IDF",
      "ESP32",
      "MongoDB"
    ],
    github: "https://github.com/your-repo-link", // update this
    description:
      "An intelligent agentic AI system designed to monitor IT infrastructure in real time, detect anomalies, and predict system failures before they occur. The system ingests logs and live metrics from distributed nodes, applies TF-IDF and Isolation Forest for anomaly detection, and uses ML-based risk scoring with projected crash-time prediction. Integrated with a RAG pipeline (LangChain + Ollama), it generates human-like diagnostic insights and recommended actions. Supports multi-node monitoring, OTP-based admin takeover, and real-time alert escalation, acting as an autonomous AI operations analyst.",
  },
  {
    name: "Planova",
    subtitle: "Project Management System",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    stack: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "Ollama", "RAG"],
    live: "https://planova-pms.netlify.app/",
    github: "https://github.com/ManasaM-2203/Planova-PMS",
    description: "A full-stack project management platform built for academic environments, enabling students and faculty to track project progress, assign tasks, and collaborate seamlessly. Features role-based dashboards, JWT-secured APIs, real-time updates, and an integrated AI evaluation engine powered by a local LLM (Ollama + RAG) that auto-generates progress insights.",
  },
  {
    name: "Insight Meet",
    subtitle: "AI-Powered Meeting Summarizer",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&q=80",
    stack: ["React.js", "Flask", "Whisper", "Transformers", "ChromaDB"],
    github: "https://github.com/ManasaM-2203/InsightMeet",
    description: "An intelligent meeting assistant that transforms audio and video recordings into structured, speaker-wise summaries. Powered by OpenAI Whisper for transcription and transformer-based models for summarization. Includes a semantic Q&A layer using ChromaDB vector embeddings, allowing users to query meeting content with natural language.",
  },
  {
    name: "Brain Tumour Detection",
    subtitle: "Medical Imaging Deep Learning",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
    stack: ["PyTorch", "FastAPI", "React.js", "U-Net", "ResNet34", "NumPy", "scikit-learn"],
    github: "https://github.com/ManasaM-2203/Brain_tumour_detection",
    description: "An end-to-end deep learning pipeline for automated brain tumor detection from MRI scans. Uses a U-Net architecture with ResNet34 encoder for precise pixel-level tumor segmentation. The model was trained on medical imaging datasets and deployed via a FastAPI backend with an interactive React.js frontend for real-time inference.",
  },
];

const CERTS = [
  {
    title: "CIL – Dynamic Skills Integrated Program",
    issuer: "Centre for Innovation & Leadership, DSCE",
    detail: "Resume Building, SWOT Analysis, GD, Personal Interview Skills & Self-Assessment · 2023–2027",
    image: cilCert,
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle University · Valid until Aug 2027",
    image: oracleCert,
  },
  {
    title: "What Is Generative AI?",
    issuer: "Microsoft · LinkedIn Learning · Dec 2024",
    image: microsoftCert,
  },
  {
    title: "Technology Job Simulation",
    issuer: "Deloitte Australia via Forage · Jun 2025",
    image: deloitteCert,
  },
  {
    title: "Getting Started with Artificial Intelligence",
    issuer: "IBM SkillsBuild · Jul 10, 2025",
    detail: "Verify: credly.com/badges/79b9e9bd-c723-4b88-b6a3-de440d9c71df",
    image: ibmCert,
    verify: "https://www.credly.com/badges/79b9e9bd-c723-4b88-b6a3-de440d9c71df",
  },
  {
    title: "Software Engineering Job Simulation",
    issuer: "JPMorgan Chase & Co. via Forage · Mar 2026",
    image: jpMorganCert,
  }
];

// ── Hooks ──────────────────────────────────────────────────────
function useCounter(target, duration = 1200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── TypeWriter ─────────────────────────────────────────────────
function TypeWriter({ texts, speed = 80, pause = 1800 }) {
  const [displayed, setDisplayed] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[textIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setTextIdx(i => (i + 1) % texts.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);
  return <span className="typewriter">{displayed}<span className="cursor">|</span></span>;
}

// ── StatCard ───────────────────────────────────────────────────
function StatCard({ value, label, suffix = "", start }) {
  const count = useCounter(value, 1200, start);
  return (
    <div className="stat-card">
      <span className="stat-number">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

// ── Lightbox ───────────────────────────────────────────────────
function Lightbox({ src, title, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-box" onClick={e => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>✕</button>
        <img src={src} alt={title} className="lightbox-img" />
        <p className="lightbox-title">{title}</p>
      </div>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null); // { src, title }
  const [statsRef, statsInView] = useInView(0.3);

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 120;
      for (const id of NAV_LINKS) {
        const el = document.getElementById(id.toLowerCase());
        if (el && el.offsetTop <= scrollY && el.offsetTop + el.offsetHeight > scrollY) {
          setActiveSection(id);
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Lightbox */}
      {lightbox && <Lightbox src={lightbox.src} title={lightbox.title} onClose={() => setLightbox(null)} />}

      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="nav-logo" onClick={() => scrollTo("about")}>MM</div>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map(link => (
            <li key={link}>
              <button className={activeSection === link ? "active" : ""} onClick={() => scrollTo(link)}>{link}</button>
            </li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* ── Hero ── */}
      <section id="about" className="hero">
        <div className="hero-bg-grid" />
        <div className="hero-glow" />
        <div className="hero-layout">
          {/* Left: text */}
          <div className="hero-content">
            <p className="hero-greeting">Hello, I'm</p>
            <h1 className="hero-name">Manasa M</h1>
            <h2 className="hero-role">
              <TypeWriter texts={["AI/ML Engineer", "Full-Stack Developer"]} />
            </h2>
            <p className="hero-bio">
              B.E. in Artificial Intelligence &amp; Machine Learning @ DSCE · CGPA 9.4<br />
              Building intelligent systems that bridge research and real-world impact.
            </p>
            <p className="hero-about">
              I'm a 3rd-year B.E. student specializing in AI &amp; ML at Dayananda Sagar College of Engineering,
              passionate about building intelligent, real-world systems. I enjoy working across the full stack —
              from training deep learning models to shipping production-ready web apps. I've interned at Desh AI Labs,
              built projects spanning NLP, computer vision, and generative AI, and I'm always looking for the next
              challenging problem to solve.
            </p>
            <div className="hero-stats" ref={statsRef}>
            <StatCard value={PROJECTS.length} label="Projects Built" start={statsInView} />
            <StatCard value={CERTS.length} label="Certifications" start={statsInView} />
            <StatCard value={9} label="CGPA" suffix=".4" start={statsInView} />
            <StatCard value={EXPERIENCE.length} label="Internship" start={statsInView} />
            </div>
            <div className="hero-cta">
              <a href="mailto:manasa.m120405@gmail.com?subject=Hiring Inquiry" className="btn-hire">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z"/></svg>
                Hire Me
              </a>
              <a href={resumePDF} download="Manasa_M_Resume-4.pdf" className="btn-download">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download CV
              </a>
            </div>
          </div>

          {/* Right: photo */}
          <div className="hero-photo-wrap">
            <div className="hero-photo-ring" />
            <div className="hero-photo-ring hero-photo-ring-2" />
            <img src={profilePhoto} alt="Manasa M" className="hero-photo" />
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="section">
        <div className="section-inner">
          <SectionHeading label="What I work with" title="Skills" />
          <div className="skills-grid">
            {Object.entries(SKILLS).map(([cat, items]) => (
              <SkillCard key={cat} category={cat} items={items} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="section section-dark">
        <div className="section-inner">
          <SectionHeading label="Where I've worked" title="Experience" />
          <div className="timeline">
            {EXPERIENCE.map((exp, i) => <ExperienceCard key={i} {...exp} />)}
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" className="section">
        <div className="section-inner">
          <SectionHeading label="Academic Background" title="Education" />
          <div className="edu-list">
            {EDUCATION.map((e, i) => (
              <EducationCard key={i} {...e} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="section">
        <div className="section-inner">
          <SectionHeading label="Things I've built" title="Projects" />
          <div className="projects-grid">
            {PROJECTS.map((p, i) => <ProjectCard key={i} {...p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section id="certifications" className="section section-dark">
        <div className="section-inner">
          <SectionHeading label="What I've earned" title="Certifications" />
          <div className="certs-grid">
            {CERTS.map((c, i) => (
              <CertCard key={i} {...c} index={i} onView={() => setLightbox({ src: c.image, title: c.title })} verify={c.verify} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="contact-section">
        <h2 className="contact-title">Get in Touch</h2>
        <div className="contact-icons">
          <a href="https://github.com/ManasaM-2203" target="_blank" rel="noreferrer" className="contact-icon-btn" title="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/manasa-m-80a2682a1/" target="_blank" rel="noreferrer" className="contact-icon-btn" title="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="tel:7338541456" className="contact-icon-btn" title="Phone">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.92 2.18 2 2 0 012.92 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          </a>
          <a href="mailto:manasa.m120405@gmail.com" className="contact-icon-btn" title="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
          </a>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} <strong>Manasa M</strong> · Portfolio</p>
      </footer>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────
function SectionHeading({ label, title }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`section-heading ${inView ? "visible" : ""}`}>
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
      <div className="section-line" />
    </div>
  );
}

function SkillCard({ category, items }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`skill-card ${inView ? "visible" : ""}`}>
      <h3 className="skill-cat">{category}</h3>
      <div className="skill-tags">
        {items.map(item => <span key={item} className="skill-tag">{item}</span>)}
      </div>
    </div>
  );
}

function ExperienceCard({ company, role, period, stack, points }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`exp-card ${inView ? "visible" : ""}`}>
      <div className="exp-dot" />
      <div className="exp-content">
        <div className="exp-header">
          <div>
            <h3 className="exp-company">{company}</h3>
            <p className="exp-role">{role}</p>
          </div>
          <span className="exp-period">{period}</span>
        </div>
        <p className="exp-stack">{stack}</p>
        <ul className="exp-points">
          {points.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>
    </div>
  );
}

function ProjectCard({ name, subtitle, image, stack, live, github, description, index }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`project-card ${inView ? "visible" : ""}`} style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="project-img-wrap">
        {/* Background image */}
        <img src={image} alt={name} className="project-img" />

        {/* Top: always visible — title */}
        <div className="project-title-bar">
          <h3 className="project-img-name">{name}</h3>
          <p className="project-img-sub">{subtitle}</p>
        </div>

        {/* Hover overlay — slides up with description + buttons */}
        <div className="project-hover-overlay">
          <p className="project-hover-desc">{description}</p>
          <div className="project-stack project-stack-light">
            {stack.map(s => <span key={s}>{s}</span>)}
          </div>
          <div className="project-img-actions">
            {github && (
              <a href={github} target="_blank" rel="noreferrer" className="project-btn project-btn-solid">
                Source Code
              </a>
            )}
            {live && (
              <a href={live} target="_blank" rel="noreferrer" className="project-btn project-btn-outline">
                Live ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CertCard({ title, issuer, detail, image, verify, index, onView }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`cert-card ${inView ? "visible" : ""}`} style={{ animationDelay: `${index * 0.08}s` }}>
      {/* Certificate image preview */}
      <div className="cert-img-wrap" onClick={onView}>
        <img src={image} alt={title} className="cert-img" />
        <div className="cert-img-overlay">
          <span>View Certificate</span>
        </div>
      </div>
      {/* Text info */}
      <div className="cert-info">
        <h3 className="cert-title">{title}</h3>
        <p className="cert-issuer">{issuer}</p>
        {detail && <p className="cert-detail">{detail}</p>}
        <div className="cert-actions">
          <button className="cert-view-btn" onClick={onView}>View ↗</button>
          {verify && <a href={verify} target="_blank" rel="noreferrer" className="cert-verify-btn">Verify ✓</a>}
        </div>
      </div>
    </div>
  );
}

function EducationCard({ institution, degree, period, score, index }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`edu-card ${inView ? "visible" : ""}`} style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="edu-left">
        <h3 className="edu-institution">{institution}</h3>
        <p className="edu-degree">{degree}</p>
      </div>
      <div className="edu-right">
        <span className="edu-period">{period}</span>
        <span className="edu-score">{score}</span>
      </div>
    </div>
  );
}