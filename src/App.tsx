import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
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
    stack: ['Python', 'FastAPI', 'Gemini', 'Docker', 'React'], outcome: 'Multi-agent RAG workflow with source-aware answers',
    link: 'https://finance-ai-ui-vercel.vercel.app/', github: 'https://github.com/srisaktic/finance-ai-assistant', accent: 'gold',
  },
  {
    number: '02', title: 'Multimodal Phishing Detection', type: 'Classification system',
    description: 'An ensemble that reads email text and visual layout together, catching the signals traditional text-only filters miss.',
    stack: ['Python', 'TensorFlow', 'Hugging Face', 'Streamlit', 'Flask'], outcome: 'Text + screenshot classification with a live demo',
    link: 'https://phishguard-ai-tau-one.vercel.app/', github: 'https://github.com/srisaktic/phishguard-ai', accent: 'teal',
  },
  {
    number: '03', title: 'Used Car Price Prediction', type: 'Regression model',
    description: 'A production-minded prediction app that turns messy vehicle listings into clear, useful pricing guidance for buyers and sellers.',
    stack: ['Python', 'Scikit-learn', 'XGBoost', 'FastAPI', 'AWS EC2'], outcome: 'Approximately 90% R-squared on held-out data',
    link: 'https://bmw-price-predictor-rhbypw6b6qntxdt9cszde8.streamlit.app/', github: 'https://github.com/srisaktic/bmw-price-predictor', accent: 'blue',
  },
];

const experience = [
  {
    period: 'June 2026 — Present', role: 'Software Engineer', company: 'Nestlé', location: 'VA, USA',
    description: 'Supporting data science and demand-forecasting workflows through data analysis, pipeline development, data validation, and production model-output checks, while collaborating closely with data scientists.',
  },
  {
    period: 'August 2025 — May 2026', role: 'AI / Machine Learning Engineer', company: 'AIONIX11', location: 'CT, USA',
    description: 'Built end-to-end machine learning solutions, covering data preparation, model development and evaluation, API integration, Docker deployment, AWS, and CI/CD workflows.',
  },
  {
    period: 'February 2022 — May 2023', role: 'Associate Software Engineer', company: 'Hexaware Technologies Ltd', location: 'Chennai, India',
    description: 'Worked on backend software development and production support, using Java, Spring Boot, REST APIs, and SQL to build, maintain, and troubleshoot enterprise applications.',
  },
];

const education = [
  {
    degree: 'M.S. in Data Science', school: 'New York Institute of Technology (NYIT)', location: 'New York, USA', period: '2023 — 2025',
    detail: 'Coursework in machine learning, deep learning, NLP, and data engineering. Capstone focused on applied AI systems.',
  },
  {
    degree: 'B.E. in Electronics & Communication Engineering', school: 'KCG College of Technology', location: 'Chennai, India', period: '2018 — 2022',
    detail: 'Foundation in engineering, mathematics, and programming that led into software engineering and data science.',
  },
];

const skills = [
  { icon: Code2, label: 'Languages & Packages', value: 'Python, Java, SQL, MySQL, PostgreSQL, R, NumPy, Pandas, Matplotlib, Seaborn' },
  { icon: Sparkles, label: 'AI & Machine Learning', value: 'Scikit-learn, XGBoost, TensorFlow, Keras, Hugging Face, BERT, NLP, CNNs, Random Forest' },
  { icon: Database, label: 'Backend, APIs & DevOps', value: 'FastAPI, REST APIs, Flask, Spring Boot, Docker, AWS (EC2, Lambda, S3), CI/CD' },
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

      <header className="relative z-50 border-b border-white/10 bg-[#070b12]/90 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#e0ae47]/60 to-transparent" />
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-5 lg:px-16" aria-label="Main navigation">
          <a href="#top" className="group flex items-center gap-3" onClick={closeMenu}>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#e0ae47] text-base font-bold text-[#070b12] shadow-[0_0_0_4px_rgba(224,174,71,0.15)] transition-transform group-hover:rotate-12">SK</span>
            <span className="hidden text-base font-semibold tracking-[0.2em] sm:block">SRI SAKTICHARAN</span>
          </a>
          <button className="rounded-lg p-2 text-[#eef3f6] md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className={`${menuOpen ? 'absolute left-0 right-0 top-full flex border-b border-white/10 bg-[#0a1018] px-6 py-6 shadow-xl' : 'hidden'} flex-col gap-5 text-base font-semibold md:static md:flex md:flex-row md:items-center md:gap-9 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
            <a href="#about" onClick={closeMenu} className="nav-link">About</a>
            <a href="#work" onClick={closeMenu} className="nav-link">Projects</a>
            <a href="#experience" onClick={closeMenu} className="nav-link">Experience</a>
            <a href="#education" onClick={closeMenu} className="nav-link">Education</a>
            <a href="#skills" onClick={closeMenu} className="nav-link">Skills</a>
            <a href="#contact" onClick={closeMenu} className="btn-shine rounded-full bg-[#e0ae47] px-6 py-3.5 text-center text-[#070b12] transition hover:bg-[#4fd8cf] hover:text-[#070b12]">Let's talk <ArrowUpRight className="ml-1 inline" size={16} /></a>
          </div>
        </nav>
      </header>

      <main id="top" className="relative">
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

      <section id="about" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:px-12">
          <Reveal><p className="section-kicker">01 / About</p><h2 className="section-title">Building intelligent systems.<br /><span>From data to deployment.</span></h2></Reveal>
          <Reveal delay={100} className="max-w-2xl">
            <p className="text-xl leading-9 text-white/75">I’m an AI/ML Engineer with a software engineering foundation, experienced across data analysis, machine learning, and production workflows. My journey has evolved from backend engineering to applied ML, and I currently support data science and forecasting workflows at Nestlé.</p>
            <p className="mt-6 leading-8 text-white/55">I build end-to-end ML and GenAI systems spanning classification, regression, multimodal ML, RAG, and AI assistants — working with LLMs, vector databases, APIs, Docker, cloud deployment, and CI/CD. I’m currently expanding deeper into RAG and agentic AI systems.</p>
            <div className="mt-9 grid grid-cols-2 gap-6 border-t border-white/10 pt-7 sm:grid-cols-4">
              <div><p className="stat-number">2+</p><p className="stat-label">years in tech</p></div>
              <div><p className="stat-number">ML + GenAI</p><p className="stat-label">core focus</p></div>
              <div><p className="stat-number">M.S.</p><p className="stat-label">Data Science</p></div>
              <div><p className="stat-number">End-to-End</p><p className="stat-label">ML systems</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
        <Reveal className="mb-12 flex items-end justify-between gap-6">
          <div><p className="section-kicker">02 / Selected work</p><h2 className="section-title">Things I’ve<br /><span>made useful.</span></h2></div>
          <a href="https://github.com/srisaktic" target="_blank" rel="noreferrer" className="hidden items-center gap-2 text-sm font-bold text-white transition hover:text-[#4fd8cf] md:flex">More on GitHub <ArrowUpRight size={16} /></a>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.number} delay={index * 120}>
            <article
              className={`project-card ${project.accent}`}
              onMouseMove={handleCardTilt}
              onMouseLeave={resetCardTilt}
            >
              <div className="flex items-start justify-between">
                <span className="project-number">{project.number}</span>
                <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} demo`} className="grid h-11 w-11 place-items-center rounded-full border border-current/20 transition hover:rotate-45 hover:bg-white/20">
                  <ArrowUpRight size={19} />
                </a>
              </div>
              <div className="mt-24">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] opacity-65">{project.type}</p>
                <h3 className="font-display text-3xl font-semibold leading-tight">{project.title}</h3>
                <p className="mt-5 text-sm leading-7 opacity-80">{project.description}</p>
                <p className="mt-6 flex items-start gap-2 border-t border-current/15 pt-5 text-sm font-semibold"><Check size={17} className="mt-0.5 shrink-0" /> {project.outcome}</p>
                <div className="mt-6 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="rounded-full border border-current/20 px-3 py-1 text-[11px] font-semibold">{item}</span>)}</div>
                <div className="mt-7 flex gap-3">
                  <a href={project.link} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-current/10 px-4 py-3 text-xs font-bold uppercase tracking-wider transition hover:bg-current/20">
                    <Play size={15} /> Live demo
                  </a>
                  <a href={project.github} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-current/20 px-4 py-3 text-xs font-bold uppercase tracking-wider transition hover:bg-current/15">
                    <Github size={15} /> Code
                  </a>
                </div>
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="experience" className="bg-[#102b36] text-white">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal>
              <p className="section-kicker text-[#e0ae47]">03 / Experience</p>
              <h2 className="section-title text-white">Where I’ve<br /><span className="text-[#8fd1a4]">learned by doing.</span></h2>
              <p className="mt-7 max-w-xs leading-7 text-white/60">A career built across software, machine learning, and the space where both become products.</p>
            </Reveal>
            <div>
              {experience.map((item, index) => (
                <Reveal key={item.company} delay={index * 100} className="timeline-item">
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl font-semibold">{item.role}</h3>
                      <p className="mt-1 text-sm text-[#e0ae47]">{item.company} · {item.location}</p>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/45">{item.period}</p>
                  </div>
                  <p className="text-sm leading-7 text-white/65">{item.description}</p>
                  {index < experience.length - 1 && <div className="my-10 h-px bg-white/10" />}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal>
              <p className="section-kicker">04 / Education</p>
              <h2 className="section-title">Built on<br /><span>strong foundations.</span></h2>
            </Reveal>
            <div>
              {education.map((item, index) => (
                <Reveal key={item.degree} delay={index * 100} className="timeline-item">
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl font-semibold">{item.degree}</h3>
                      <p className="mt-1 flex items-center gap-2 text-sm text-[#4fd8cf]"><GraduationCap size={16} /> {item.school} · {item.location}</p>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/50">{item.period}</p>
                  </div>
                  <p className="text-sm leading-7 text-white/55">{item.detail}</p>
                  {index < education.length - 1 && <div className="my-10 h-px bg-white/10" />}
                </Reveal>
              ))}
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

      <section id="contact" className="bg-[#e0ae47]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <Reveal>
              <p className="section-kicker text-[#102b36]/65">06 / Contact</p>
              <h2 className="section-title text-[#102b36]">Let’s build something<br /><span className="text-white">that matters.</span></h2>
              <p className="mt-7 max-w-md leading-7 text-[#102b36]/70">I’m open to AI/ML, Data Science, and GenAI opportunities where I can build, learn, and create meaningful impact. If you think I’d be a good fit for your team or project, I’d love to hear from you.</p>
              <div className="mt-9 flex flex-col gap-3 text-sm font-semibold text-[#102b36]">
                <a href="mailto:sri.sakticharan.kumar@gmail.com" className="contact-link"><Mail size={17} /> sri.sakticharan.kumar@gmail.com</a>
                <a href="https://www.linkedin.com/in/sri-sakticharan" target="_blank" rel="noreferrer" className="contact-link"><Linkedin size={17} /> linkedin.com/in/sri-sakticharan</a>
                <a href="https://github.com/srisaktic" target="_blank" rel="noreferrer" className="contact-link"><Github size={17} /> github.com/srisaktic</a>
              </div>
            </Reveal>
            <Reveal delay={120}>
            <form onSubmit={handleSubmit} className="rounded-[1.5rem] bg-white/90 p-6 shadow-xl shadow-[#8b651b]/10 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="field-label">Your name<input name="name" required placeholder="Jane Smith" className="field-input" /></label>
                <label className="field-label">Your email<input name="email" type="email" required placeholder="jane@company.com" className="field-input" /></label>
              </div>
              <label className="field-label mt-5">Your message<textarea name="message" required rows={4} placeholder="Tell me about the role, opportunity, or project..." className="field-input resize-none" /></label>
              <button type="submit" disabled={submitState === 'sending'} className="btn-shine mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#102b36] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#2c8d89] disabled:opacity-60">
                {submitState === 'sending' ? (<><Loader2 size={16} className="animate-spin" /> Sending...</>) : submitState === 'sent' ? (<><Check size={16} /> Message sent!</>) : (<>Send a message <Send size={16} /></>)}
              </button>
              {submitState === 'sent' && <p className="mt-3 text-center text-sm font-semibold text-[#2c8d89]">Thanks! I’ll get back to you soon.</p>}
              {submitState === 'error' && <p className="mt-3 text-center text-sm font-semibold text-red-600">{errorMessage}</p>}
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
