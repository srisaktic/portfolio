import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  Database,
  GraduationCap,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Play,
  Send,
  Sparkles,
  X,
} from 'lucide-react';

const projects = [
  {
    number: '01', title: 'Finance AI Research Assistant', type: 'Full deployment',
    description: 'A research copilot that combines SEC 10-K filings, earnings transcripts, and live market context to help teams move from questions to defensible insights.',
    stack: ['Agentic RAG', 'Gemini', 'Qdrant', 'Voyage Embeddings', 'Reranking', 'FastAPI', 'Docker'], outcome: 'Agentic RAG with grounded, source-aware retrieval',
    link: 'https://finance-ai-ui-vercel.vercel.app/', github: 'https://github.com/srisaktic/finance-ai-assistant', accent: 'gold',
  },
  {
    number: '02', title: 'Multimodal Phishing Detection', type: 'Classification system',
    description: 'An ensemble that reads email text and visual layout together, catching the signals traditional text-only filters miss.',
    stack: ['Multimodal ML', 'BERT', 'CNNs', 'TensorFlow', 'Scikit-learn', 'Ensemble Learning'], outcome: 'Email + URL + image classification with ensemble fusion',
    link: 'https://phishguard-ai-tau-one.vercel.app/', github: 'https://github.com/srisaktic/phishguard-ai', accent: 'teal',
  },
  {
    number: '03', title: 'Used Car Price Prediction', type: 'Regression model',
    description: 'A production-minded prediction app that turns messy vehicle listings into clear, useful pricing guidance for buyers and sellers.',
    stack: ['Regression', 'XGBoost', 'Scikit-learn', 'FastAPI', 'Docker', 'AWS EC2'], outcome: 'Approximately 90% R-squared on held-out data',
    link: 'https://bmw-price-predictor-rhbypw6b6qntxdt9cszde8.streamlit.app/', github: 'https://github.com/srisaktic/bmw-price-predictor', accent: 'blue',
  },
  {
    number: '04', title: 'House Price EDA — Boston Housing', type: 'Exploratory data analysis',
    description: 'An end-to-end EDA on 506 homes to uncover what actually drives price — cleaning outliers, engineering features, and visualizing relationships across a 12-chart dashboard.',
    stack: ['EDA', 'Feature Engineering', 'Pandas', 'Seaborn', 'Correlation Analysis', 'Outlier Detection'], outcome: 'Rooms and neighborhood status are the strongest price drivers',
    link: '', github: 'https://github.com/srisaktic/house-price-eda-analysis', accent: 'green',
  },
];

const experience = [
  {
    period: 'June 2026 — Present', role: 'Software Engineer', company: 'Nestlé', location: 'VA, USA', logo: 'NE', color: '#e0ae47',
    description: 'Supporting data science and demand-forecasting workflows through data analysis, pipeline development, data validation, and production model-output checks, while collaborating closely with data scientists.',
  },
  {
    period: 'August 2025 — May 2026', role: 'AI / Machine Learning Engineer', company: 'AIONIX11', location: 'CT, USA', logo: 'AX', color: '#4fd8cf',
    description: 'Built end-to-end machine learning solutions, covering data preparation, model development and evaluation, API integration, Docker deployment, AWS, and CI/CD workflows.',
  },
  {
    period: 'February 2022 — May 2023', role: 'Associate Software Engineer', company: 'Hexaware Technologies Ltd', location: 'Chennai, India', logo: 'HX', color: '#8fd1a4',
    description: 'Developed and supported Python backend applications using REST APIs and SQL, working across application development, database integration, testing, and production support and supporting CI/CD releases.',
  },
];

const education = [
  {
    degree: 'M.S. in Data Science', school: 'New York Institute of Technology (NYIT)', location: 'New York, USA', period: '2023 — 2025', color: '#4fd8cf',
    detail: 'Coursework in machine learning, deep learning, NLP, and data engineering. Capstone focused on applied AI systems.',
  },
  {
    degree: 'B.E. in Electronics & Communication Engineering', school: 'KCG College of Technology', location: 'Chennai, India', period: '2018 — 2022', color: '#e0ae47',
    detail: 'Foundation in engineering, mathematics, and programming that led into software engineering and data science.',
  },
];

const skills = [
  { icon: Code2, label: 'Languages & Data', value: 'Python, SQL, Java, Pandas, NumPy, PostgreSQL' },
  { icon: Sparkles, label: 'Machine Learning', value: 'Scikit-learn, XGBoost, TensorFlow/Keras, Hugging Face, NLP, Computer Vision, MLflow, SHAP' },
  { icon: Bot, label: 'GenAI & Agentic AI', value: 'LLMs, RAG, AI Agents, Gemini, Qdrant, Voyage Embeddings, Reranking, Tool Calling' },
  { icon: Database, label: 'Backend, Cloud & MLOps', value: 'FastAPI, REST APIs, Docker, AWS, GitHub Actions, CI/CD, Git' },
];

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out will-change-transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty('--spot-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--spot-y', `${event.clientY}px`);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const handleCardTilt = (event: ReactMouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };
  const resetCardTilt = (event: ReactMouseEvent<HTMLElement>) => {
    event.currentTarget.style.transform = '';
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState('sending');
    setErrorMessage('');

    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const message = String(form.get('message') ?? '').trim();

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? 'Request failed');
      }

      setSubmitState('sent');
      (event.target as HTMLFormElement).reset();
    } catch {
      setSubmitState('error');
      setErrorMessage('Something went wrong. Please try again or email me directly.');
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070b12] text-[#eef3f6]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '37px 37px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
          }}
        />
        <div className="absolute -left-24 top-[-10%] h-[32rem] w-[32rem] animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(224,174,71,0.18),transparent_65%)] blur-3xl" />
        <div className="absolute -right-32 top-[18%] h-[36rem] w-[36rem] animate-float-slower rounded-full bg-[radial-gradient(circle,rgba(44,141,137,0.2),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-[-15%] left-[28%] h-[30rem] w-[30rem] animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(143,209,164,0.14),transparent_65%)] blur-3xl" />
        <div className="ambient-sweep" />
        <div
          className="absolute inset-0 hidden opacity-80 lg:block"
          style={{
            background:
              'radial-gradient(480px circle at var(--spot-x, 50%) var(--spot-y, 20%), rgba(255,255,255,0.05), transparent 70%)',
          }}
        />
      </div>

      <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6 lg:top-6 lg:px-10">
        <div className="relative mx-auto max-w-[1200px] rounded-2xl border border-white/10 bg-[#0a1018]/85 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#e0ae47]/60 to-transparent" />
          <nav className="flex items-center justify-between gap-6 px-5 py-4 lg:px-8" aria-label="Main navigation">
            <a href="#top" className="group flex items-center gap-3" onClick={closeMenu}>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#e0ae47] text-base font-bold text-[#070b12] shadow-[0_0_0_4px_rgba(224,174,71,0.15)] transition-transform group-hover:rotate-12">SK</span>
              <span className="hidden text-base font-semibold tracking-[0.2em] sm:block">SRI SAKTICHARAN</span>
            </a>
            <button className="rounded-lg p-2 text-[#eef3f6] md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div className={`${menuOpen ? 'absolute left-0 right-0 top-full flex rounded-b-2xl border-x border-b border-white/10 bg-[#0a1018] px-6 py-6 shadow-xl' : 'hidden'} flex-col gap-5 text-base font-semibold md:static md:flex md:flex-row md:items-center md:gap-9 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
              <a href="#about" onClick={closeMenu} className="nav-link">About</a>
              <a href="#work" onClick={closeMenu} className="nav-link">Projects</a>
              <a href="#experience" onClick={closeMenu} className="nav-link">Experience</a>
              <a href="#education" onClick={closeMenu} className="nav-link">Education</a>
              <a href="#skills" onClick={closeMenu} className="nav-link">Skills</a>
              <a href="#contact" onClick={closeMenu} className="btn-shine rounded-full bg-[#e0ae47] px-6 py-3.5 text-center text-[#070b12] transition hover:bg-[#4fd8cf] hover:text-[#070b12]">Let's talk <ArrowUpRight className="ml-1 inline" size={16} /></a>
            </div>
          </nav>
        </div>
      </header>

      <main id="top" className="relative pt-28 lg:pt-32">
      <section className="relative mx-auto grid max-w-[1440px] items-center gap-16 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-12 lg:pt-20">
        <div className="relative order-1 mx-auto w-full max-w-md animate-fade-in lg:mx-0 lg:max-w-none">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(79,216,207,0.32),transparent_60%)] blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[24rem] -translate-x-[65%] -translate-y-[40%] rounded-full bg-[radial-gradient(circle,rgba(79,216,207,0.22),transparent_60%)] blur-3xl" />
          <img
            src="/hero-photo.png"
            alt="Sri Sakticharan"
            className="animate-glow-pulse relative mx-auto w-full max-w-[290px] sm:max-w-[350px] lg:max-w-[450px]" />
        </div>

        <Reveal className="order-2 text-center lg:text-left" delay={0}>
          <p className="mb-7 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#4fd8cf] lg:justify-start">
            <span className="h-px w-9 bg-[#4fd8cf]" /> AI / ML ENGINEER &amp; DATA SCIENTIST
          </p>
          <h1 className="text-shine-reveal font-display text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[5.4rem]">
            I build <em className="font-serif font-normal text-[#4fd8cf]">useful</em> intelligence.
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-white/60 lg:mx-0">
            AI / ML engineer and data scientist who can take a model from raw data through to deployment with CI/CD. My projects are proof: each one runs end-to-end, from pipeline to live demo.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a href="#work" className="btn-shine group rounded-full bg-[#e0ae47] px-6 py-4 text-sm font-bold text-[#070b12] transition hover:-translate-y-1 hover:bg-[#4fd8cf]">Explore my work <ArrowDownRight className="ml-3 inline transition-transform group-hover:translate-x-1 group-hover:translate-y-1" size={17} /></a>
            <a href="https://github.com/srisaktic" target="_blank" rel="noreferrer" className="btn-shine rounded-full border border-white/20 px-6 py-4 text-sm font-bold text-white transition hover:border-white hover:bg-white/10">GitHub <Github className="ml-2 inline" size={16} /></a>
          </div>
          <div className="relative mx-auto mt-10 max-w-md lg:mx-0">
            <div className="relative rounded-[2rem] bg-[#102b36] p-7 text-white shadow-2xl shadow-black/40 sm:p-9">
              <div className="mb-6 flex items-center justify-between"><span className="text-xs uppercase tracking-[0.22em] text-[#e0ae47]">Currently</span><span className="flex items-center gap-2 text-xs text-white/60"><span className="h-2 w-2 animate-pulse rounded-full bg-[#8fd1a4]" /> Open to opportunities</span></div>
              <p className="font-display text-2xl leading-tight">Making data feel less like a problem and more like a possibility.</p>
              <div className="mt-6 flex items-center gap-2 text-sm text-white/60"><MapPin size={16} className="text-[#e0ae47]" /> New York City</div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="about" className="relative bg-white/[0.03]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#070b12] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070b12] to-transparent" />
        <div className="relative mx-auto max-w-[820px] px-6 py-16 lg:px-12">
          <Reveal><p className="section-kicker">01 / About</p><h2 className="section-title">Building intelligent systems.<br /><span>From data to deployment.</span></h2></Reveal>
          <Reveal delay={100} className="mt-8">
            <p className="text-lg leading-8 text-white/75">I’m an AI/ML Engineer with a software engineering foundation, experienced across data analysis, machine learning, and production workflows. My journey has evolved from backend engineering to applied ML, and I currently support data science and forecasting workflows at Nestlé.</p>
            <p className="mt-5 leading-7 text-white/55">I build end-to-end ML and GenAI systems spanning classification, regression, multimodal ML, RAG, and AI assistants — working with LLMs, vector databases, APIs, Docker, cloud deployment, and CI/CD. I’m currently expanding deeper into RAG and agentic AI systems.</p>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 sm:grid-cols-4">
              <div><p className="stat-number">2+</p><p className="stat-label">years in tech</p></div>
              <div><p className="stat-number">ML + GenAI</p><p className="stat-label">core focus</p></div>
              <div><p className="stat-number">M.S.</p><p className="stat-label">Data Science</p></div>
              <div><p className="stat-number">End-to-End</p><p className="stat-label">ML systems</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-[1440px] px-6 py-14 lg:px-12 lg:py-20">
        <Reveal className="mb-8 flex items-end justify-between gap-6">
          <div><p className="section-kicker">02 / Selected work</p><h2 className="section-title">Things I’ve<br /><span>made useful.</span></h2></div>
          <a href="https://github.com/srisaktic" target="_blank" rel="noreferrer" className="hidden items-center gap-2 text-sm font-bold text-white transition hover:text-[#4fd8cf] md:flex">More on GitHub <ArrowUpRight size={16} /></a>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <Reveal key={project.number} delay={index * 120}>
            <article
              className={`project-card ${project.accent}`}
              onMouseMove={handleCardTilt}
              onMouseLeave={resetCardTilt}
            >
              <div className="flex items-start justify-between">
                <span className="project-number">{project.number}</span>
                <a href={project.link || project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} ${project.link ? 'demo' : 'code'}`} className="grid h-9 w-9 place-items-center rounded-full border border-current/20 transition hover:rotate-45 hover:bg-white/20">
                  <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="mt-8 flex flex-1 flex-col">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] opacity-65">{project.type}</p>
                <h3 className="font-display text-2xl font-semibold leading-tight">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 opacity-80">{project.description}</p>
                <p className="mt-4 flex items-start gap-2 border-t border-current/15 pt-4 text-sm font-semibold"><Check size={17} className="mt-0.5 shrink-0" /> {project.outcome}</p>
                <div className="mt-4 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="rounded-full border border-current/20 px-2.5 py-1 text-[11px] font-semibold">{item}</span>)}</div>
                <div className="mt-auto flex gap-3 pt-5">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-current/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition hover:bg-current/20">
                      <Play size={15} /> Live demo
                    </a>
                  )}
                  <a href={project.github} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-current/20 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition hover:bg-current/15">
                    <Github size={15} /> Code
                  </a>
                </div>
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="experience" className="relative bg-white/[0.03]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#070b12] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070b12] to-transparent" />
        <div className="relative mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal>
              <p className="section-kicker text-[#e0ae47]">03 / Experience</p>
              <h2 className="section-title text-white">Where I’ve<br /><span className="text-[#8fd1a4]">learned by doing.</span></h2>
              <p className="mt-7 max-w-xs leading-7 text-white/60">A career built across software, machine learning, and the space where both become products.</p>
            </Reveal>
            <div className="grid gap-5">
              {experience.map((item, index) => (
                <Reveal key={item.company} delay={index * 100}>
                  <div className="rounded-2xl border border-white/10 bg-[#0a1018] p-6 sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-sm font-bold" style={{ backgroundColor: item.color, color: '#102b36' }}>{item.logo}</span>
                        <div>
                          <h3 className="font-display text-xl font-semibold text-white">{item.company}</h3>
                          <p className="mt-0.5 text-sm font-semibold" style={{ color: item.color }}>{item.role}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/60">{item.period}</span>
                        <span className="flex items-center gap-1 text-xs text-white/40"><MapPin size={12} /> {item.location}</span>
                      </div>
                    </div>
                    <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-7 text-white/65">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="relative bg-white/[0.03]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#070b12] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070b12] to-transparent" />
        <div className="relative mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal>
              <p className="section-kicker">04 / Education</p>
              <h2 className="section-title">Built on<br /><span>strong foundations.</span></h2>
            </Reveal>
            <div className="relative">
              <div className="absolute bottom-2 left-[23px] top-2 w-px bg-white/10" />
              <div className="space-y-9">
                {education.map((item, index) => (
                  <Reveal key={item.degree} delay={index * 100} className="relative flex gap-6">
                    <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-4 border-[#0d141d]" style={{ backgroundColor: item.color }}>
                      <GraduationCap size={19} className="text-[#102b36]" />
                    </span>
                    <div className="flex-1 pb-1 pt-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="font-display text-xl font-semibold text-white">{item.degree}</h3>
                        <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/40">{item.period}</span>
                      </div>
                      <p className="mt-1 text-sm font-semibold" style={{ color: item.color }}>{item.school} · {item.location}</p>
                      <p className="mt-3 text-sm leading-7 text-white/60">{item.detail}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal><p className="section-kicker">05 / Toolkit</p><h2 className="section-title">Built on a<br /><span>wide foundation.</span></h2></Reveal>
          <div className="grid gap-5">
            {skills.map(({ icon: Icon, label, value }, index) => (
              <Reveal key={label} delay={index * 100} className="flex gap-5 border-b border-white/10 pb-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#16324a] text-[#4fd8cf]"><Icon size={20} /></div>
                <div><p className="font-bold text-white">{label}</p><p className="mt-1 text-sm leading-6 text-white/55">{value}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-[#e0ae47]">
        <div className="overflow-hidden border-b border-[#102b36]/15 bg-[#102b36] py-3">
          <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center gap-10 pr-10">
                {['Open to AI/ML roles', 'GenAI & Agentic AI', 'Data Science', "Let’s build something great"].map((t) => (
                  <span key={t} className="flex items-center gap-10 text-xs font-bold uppercase tracking-[0.3em] text-[#e0ae47]/90">
                    {t}<span className="h-1 w-1 rounded-full bg-[#4fd8cf]" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-[#102b36]/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <Reveal>
              <p className="section-kicker text-[#102b36]/65">06 / Contact</p>
              <h2 className="section-title text-[#102b36]">Let’s build something<br /><span className="text-white">that matters.</span></h2>
              <p className="mt-7 max-w-md leading-7 text-[#102b36]/70">I’m open to AI/ML, Data Science, and GenAI opportunities where I can build, learn, and create meaningful impact. If you think I’d be a good fit for your team or project, I’d love to hear from you.</p>
              <div className="mt-9 flex flex-col">
                <a href="mailto:sri.sakticharan.kumar@gmail.com" className="group flex items-center justify-between gap-4 border-b border-[#102b36]/15 py-3.5 text-sm font-semibold text-[#102b36] transition hover:border-[#102b36]/40">
                  <span className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#102b36]/10 transition group-hover:bg-[#102b36] group-hover:text-[#e0ae47]"><Mail size={15} /></span> sri.sakticharan.kumar@gmail.com</span>
                  <ArrowUpRight size={16} className="shrink-0 opacity-40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </a>
                <a href="https://www.linkedin.com/in/sri-sakticharan" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 border-b border-[#102b36]/15 py-3.5 text-sm font-semibold text-[#102b36] transition hover:border-[#102b36]/40">
                  <span className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#102b36]/10 transition group-hover:bg-[#102b36] group-hover:text-[#e0ae47]"><Linkedin size={15} /></span> linkedin.com/in/sri-sakticharan</span>
                  <ArrowUpRight size={16} className="shrink-0 opacity-40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </a>
                <a href="https://github.com/srisaktic" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 border-b border-[#102b36]/15 py-3.5 text-sm font-semibold text-[#102b36] transition hover:border-[#102b36]/40">
                  <span className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#102b36]/10 transition group-hover:bg-[#102b36] group-hover:text-[#e0ae47]"><Github size={15} /></span> github.com/srisaktic</span>
                  <ArrowUpRight size={16} className="shrink-0 opacity-40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={120}>
            <form onSubmit={handleSubmit} className="relative">
              <div className="grid gap-7">
                <label className="group block">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#102b36]/50">Your name</span>
                  <input name="name" required placeholder="Jane Smith" className="mt-2 w-full border-b-2 border-[#102b36]/20 bg-transparent pb-3 font-display text-2xl font-semibold text-[#102b36] outline-none transition placeholder:text-[#102b36]/30 focus:border-[#102b36]" />
                </label>
                <label className="group block">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#102b36]/50">Your email</span>
                  <input name="email" type="email" required placeholder="jane@company.com" className="mt-2 w-full border-b-2 border-[#102b36]/20 bg-transparent pb-3 font-display text-2xl font-semibold text-[#102b36] outline-none transition placeholder:text-[#102b36]/30 focus:border-[#102b36]" />
                </label>
                <label className="group block">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#102b36]/50">Your message</span>
                  <textarea name="message" required rows={2} placeholder="Tell me about the role, opportunity, or project..." className="mt-2 w-full resize-none border-b-2 border-[#102b36]/20 bg-transparent pb-3 text-lg leading-8 text-[#102b36] outline-none transition placeholder:text-[#102b36]/30 focus:border-[#102b36]" />
                </label>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                {submitState === 'sent' ? (
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#102b36]"><Check size={16} /> Thanks! I’ll get back to you soon.</p>
                ) : submitState === 'error' ? (
                  <p className="text-sm font-semibold text-red-700">{errorMessage}</p>
                ) : (
                  <p className="text-sm text-[#102b36]/50">I read every message personally.</p>
                )}
                <button type="submit" disabled={submitState === 'sending'} className="group flex shrink-0 items-center gap-3 rounded-full bg-[#102b36] py-2 pl-6 pr-2 text-sm font-bold text-white transition hover:bg-white hover:text-[#102b36] disabled:opacity-60">
                  {submitState === 'sending' ? 'Sending' : 'Send message'}
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 transition group-hover:bg-[#102b36]/10">
                    {submitState === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </span>
                </button>
              </div>
            </form>
            </Reveal>
          </div>
        </div>
      </section>
      </main>
      <footer className="bg-[#102b36] text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-6 py-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between lg:px-12">
          <p>© 2026 Sri Sakticharan Nirmal Kumar</p>
          <div className="flex items-center gap-5">
            <a href="https://github.com/srisaktic" target="_blank" rel="noreferrer" className="transition hover:text-[#e0ae47]"><Github size={18} /></a>
            <a href="https://www.linkedin.com/in/sri-sakticharan" target="_blank" rel="noreferrer" className="transition hover:text-[#e0ae47]"><Linkedin size={18} /></a>
            <a href="#about" className="transition hover:text-[#e0ae47]">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
