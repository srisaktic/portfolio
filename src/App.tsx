import { FormEvent, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
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
    points: ['Collaborate with data scientists on a demand-forecasting project, translating feature requirements into reliable data pipelines and validating input datasets with Pandas.', 'Run sanity checks and range validation on model outputs before production release, flagging anomalies to maintain prediction reliability.', 'Ship FastAPI endpoints that serve model predictions to downstream planning systems, with request validation and error handling.'],
  },
  {
    period: 'August 2025 — May 2026', role: 'AI / Machine Learning Engineer', company: 'Axionlix', location: 'CT, USA',
    points: ['Built an end-to-end churn prediction pipeline for a retail e-commerce client, identifying at-risk customers and automating supervised model training.', 'Built a CI/CD pipeline that ran unit tests, linting, and engineering standards checks across AWS and Docker deployments.', 'Benchmarked Logistic Regression, Random Forest, and XGBoost, selecting XGBoost after handling class imbalance with weighted training.'],
  },
  {
    period: 'February 2022 — May 2023', role: 'Associate Software Engineer', company: 'Hexaware Technologies Ltd', location: 'Chennai, India',
    points: ['Developed and maintained backend application modules using Java, Spring Boot, REST APIs, and SQL.', 'Reduced response times by approximately 25% through query optimization and delivered 30+ JUnit test cases while resolving SonarQube findings.'],
  },
];

const education = [
  {
    degree: 'M.S. in Data Science', school: 'New York Institute of Technology (NYIT)', location: 'New York, USA', period: '2023 — 2025',
    detail: 'Coursework in machine learning, deep learning, NLP, and data engineering. Capstone focused on applied AI systems.',
  },
  {
    degree: 'B.E. in Electronics & Communication Engineering', school: 'KCG College of Technology', location: 'Chennai, India', period: '2017 — 2021',
    detail: 'Foundation in engineering, mathematics, and programming that led into software engineering and data science.',
  },
];

const skills = [
  { icon: Code2, label: 'Languages & Packages', value: 'Python, Java, SQL, MySQL, PostgreSQL, R, NumPy, Pandas, Matplotlib, Seaborn' },
  { icon: Sparkles, label: 'AI & Machine Learning', value: 'Scikit-learn, XGBoost, TensorFlow, Keras, Hugging Face, BERT, NLP, CNNs, Random Forest' },
  { icon: Database, label: 'Backend, APIs & DevOps', value: 'FastAPI, REST APIs, Flask, Spring Boot, Docker, AWS (EC2, Lambda, S3), CI/CD' },
];

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
    <div className="min-h-screen overflow-hidden bg-[#f5f7f4] text-[#102b36]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_85%_12%,rgba(224,174,71,0.13),transparent_28%),radial-gradient(circle_at_5%_55%,rgba(44,141,137,0.08),transparent_26%)]" />
      <header className="sticky top-0 z-50 border-b border-[#102b36]/10 bg-[#f5f7f4]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8" aria-label="Main navigation">
          <a href="#top" className="group flex items-center gap-3" onClick={closeMenu}>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#102b36] text-sm font-bold text-[#e0ae47] transition-transform group-hover:rotate-12">SK</span>
            <span className="hidden text-sm font-semibold tracking-[0.18em] sm:block">SRI SAKTICHARAN</span>
          </a>
          <button className="rounded-lg p-2 md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className={`${menuOpen ? 'absolute left-0 right-0 top-full flex border-b border-[#102b36]/10 bg-[#f5f7f4] px-6 py-6 shadow-xl' : 'hidden'} flex-col gap-5 text-sm font-semibold md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
            <a href="#about" onClick={closeMenu} className="nav-link">About</a>
            <a href="#work" onClick={closeMenu} className="nav-link">Projects</a>
            <a href="#experience" onClick={closeMenu} className="nav-link">Experience</a>
            <a href="#education" onClick={closeMenu} className="nav-link">Education</a>
            <a href="#contact" onClick={closeMenu} className="rounded-full bg-[#e0ae47] px-5 py-3 text-center text-[#102b36] transition hover:bg-[#102b36] hover:text-white">Let's talk <ArrowUpRight className="ml-1 inline" size={15} /></a>
          </div>
        </nav>
      </header>

      <main id="top" className="relative">
        <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:px-8 lg:pt-28">
          <div className="animate-fade-up">
            <p className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#2c8d89]"><span className="h-px w-9 bg-[#2c8d89]" /> AI / ML ENGINEER & DATA SCIENTIST</p>
            <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-[6.4rem]">I build <em className="font-serif font-normal text-[#2c8d89]">useful</em> intelligence.</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-[#49606a]">AI / ML engineer and data scientist who can take a model from raw data through to deployment with CI/CD. My projects are proof: each one runs end-to-end, from pipeline to live demo.</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#work" className="group rounded-full bg-[#102b36] px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#2c8d89]">Explore my work <ArrowDownRight className="ml-3 inline transition-transform group-hover:translate-x-1 group-hover:translate-y-1" size={17} /></a>
              <a href="https://github.com/srisaktic" target="_blank" rel="noreferrer" className="rounded-full border border-[#102b36]/20 px-6 py-4 text-sm font-bold transition hover:border-[#102b36] hover:bg-[#102b36] hover:text-white">GitHub <Github className="ml-2 inline" size={16} /></a>
            </div>
          </div>
          <div className="relative animate-fade-in lg:pb-3">
            <div className="absolute -right-5 -top-8 h-28 w-28 rounded-full border border-[#e0ae47]/60" />
            <div className="relative rounded-[2rem] bg-[#102b36] p-7 text-white shadow-2xl shadow-[#102b36]/15 sm:p-9">
              <div className="mb-16 flex items-center justify-between"><span className="text-xs uppercase tracking-[0.22em] text-[#e0ae47]">Currently</span><span className="flex items-center gap-2 text-xs text-white/60"><span className="h-2 w-2 animate-pulse rounded-full bg-[#8fd1a4]" /> Open to opportunities</span></div>
              <p className="font-display text-3xl leading-tight">Making data feel less like a problem and more like a possibility.</p>
              <div className="mt-10 flex items-center gap-2 text-sm text-white/60"><MapPin size={16} className="text-[#e0ae47]" /> New York City · open to remote</div>
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-[#102b36]/10 bg-white/60">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
            <div><p className="section-kicker">01 / About</p><h2 className="section-title">Curious by nature.<br /><span>Precise by craft.</span></h2></div>
            <div className="max-w-2xl">
              <p className="text-xl leading-9 text-[#36505b]">I am an AI / ML Engineer and Data Scientist with 2+ years of experience across backend software engineering and applied machine learning, backed by an M.S. in Data Science from NYIT.</p>
              <p className="mt-6 leading-8 text-[#60757c]">My work spans the full ML lifecycle: from data exploration and feature engineering through model training, evaluation, and deployment with CI/CD. I have deployed projects on free hosting platforms for live demos, and I have hands-on AWS EC2 experience from running production workloads during a six-month free tier period. My projects below are samples of what I can deliver end-to-end.</p>
              <div className="mt-9 grid grid-cols-2 gap-6 border-t border-[#102b36]/10 pt-7 sm:grid-cols-4">
                <div><p className="stat-number">2+</p><p className="stat-label">years experience</p></div>
                <div><p className="stat-number">3</p><p className="stat-label">deployed projects</p></div>
                <div><p className="stat-number">M.S.</p><p className="stat-label">Data Science</p></div>
                <div><p className="stat-number">CI/CD</p><p className="stat-label">pipeline experience</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div><p className="section-kicker">02 / Selected work</p><h2 className="section-title">Things I’ve<br /><span>made useful.</span></h2></div>
            <a href="https://github.com/srisaktic" target="_blank" rel="noreferrer" className="hidden items-center gap-2 text-sm font-bold transition hover:text-[#2c8d89] md:flex">More on GitHub <ArrowUpRight size={16} /></a>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.number} className={`project-card ${project.accent}`}>
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
            ))}
          </div>
        </section>

        <section id="experience" className="bg-[#102b36] text-white">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="section-kicker text-[#e0ae47]">03 / Experience</p>
                <h2 className="section-title text-white">Where I’ve<br /><span className="text-[#8fd1a4]">learned by doing.</span></h2>
                <p className="mt-7 max-w-xs leading-7 text-white/60">A career built across software, machine learning, and the space where both become products.</p>
              </div>
              <div>
                {experience.map((item, index) => (
                  <div key={item.company} className="timeline-item">
                    <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
                      <div>
                        <h3 className="font-display text-2xl font-semibold">{item.role}</h3>
                        <p className="mt-1 text-sm text-[#e0ae47]">{item.company} · {item.location}</p>
                      </div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/45">{item.period}</p>
                    </div>
                    <ul className="space-y-3 text-sm leading-7 text-white/65">
                      {item.points.map((point) => <li key={point} className="flex gap-3"><ChevronRight className="mt-1 shrink-0 text-[#8fd1a4]" size={16} />{point}</li>)}
                    </ul>
                    {index < experience.length - 1 && <div className="my-10 h-px bg-white/10" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="border-y border-[#102b36]/10 bg-white/60">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="section-kicker">04 / Education</p>
                <h2 className="section-title">Built on<br /><span>strong foundations.</span></h2>
              </div>
              <div>
                {education.map((item, index) => (
                  <div key={item.degree} className="timeline-item">
                    <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
                      <div>
                        <h3 className="font-display text-2xl font-semibold">{item.degree}</h3>
                        <p className="mt-1 flex items-center gap-2 text-sm text-[#2c8d89]"><GraduationCap size={16} /> {item.school} · {item.location}</p>
                      </div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#60757c]">{item.period}</p>
                    </div>
                    <p className="text-sm leading-7 text-[#60757c]">{item.detail}</p>
                    {index < education.length - 1 && <div className="my-10 h-px bg-[#102b36]/10" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div><p className="section-kicker">05 / Toolkit</p><h2 className="section-title">Built on a<br /><span>wide foundation.</span></h2></div>
            <div className="grid gap-5">
              {skills.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-5 border-b border-[#102b36]/10 pb-5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e5f0ed] text-[#2c8d89]"><Icon size={20} /></div>
                  <div><p className="font-bold">{label}</p><p className="mt-1 text-sm leading-6 text-[#667b82]">{value}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#e0ae47]">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="section-kicker text-[#102b36]/65">06 / Contact</p>
                <h2 className="section-title text-[#102b36]">Have a problem<br /><span className="text-white">worth solving?</span></h2>
                <p className="mt-7 max-w-sm leading-7 text-[#102b36]/70">Tell me a little about it. I’ll get back to you by email.</p>
                <div className="mt-9 flex flex-col gap-3 text-sm font-semibold">
                  <a href="mailto:sri.sakticharan.kumar@gmail.com" className="contact-link"><Mail size={17} /> sri.sakticharan.kumar@gmail.com</a>
                  <a href="https://www.linkedin.com/in/sri-sakticharan" target="_blank" rel="noreferrer" className="contact-link"><Linkedin size={17} /> linkedin.com/in/sri-sakticharan</a>
                  <a href="https://github.com/srisaktic" target="_blank" rel="noreferrer" className="contact-link"><Github size={17} /> github.com/srisaktic</a>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="rounded-[1.5rem] bg-white/90 p-6 shadow-xl shadow-[#8b651b]/10 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="field-label">Your name<input name="name" required placeholder="Jane Smith" className="field-input" /></label>
                  <label className="field-label">Your email<input name="email" type="email" required placeholder="jane@company.com" className="field-input" /></label>
                </div>
                <label className="field-label mt-5">What can I help with?<textarea name="message" required rows={4} placeholder="A quick note about the role or project..." className="field-input resize-none" /></label>
                <button type="submit" disabled={submitState === 'sending'} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#102b36] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#2c8d89] disabled:opacity-60">
                  {submitState === 'sending' ? (<><Loader2 size={16} className="animate-spin" /> Sending...</>) : submitState === 'sent' ? (<><Check size={16} /> Message sent!</>) : (<>Send a message <Send size={16} /></>)}
                </button>
                {submitState === 'sent' && <p className="mt-3 text-center text-sm font-semibold text-[#2c8d89]">Thanks! I’ll get back to you soon.</p>}
                {submitState === 'error' && <p className="mt-3 text-center text-sm font-semibold text-red-600">{errorMessage}</p>}
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#102b36] text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between lg:px-8">
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
