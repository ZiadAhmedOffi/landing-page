import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Blocks,
  Building2,
  ChevronRight,
  Globe2,
  LineChart,
  LockKeyhole,
  Menu,
  Radar,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { ScreenshotFrame } from './components/ScreenshotFrame';

const navItems = [
  { label: 'Platform', href: '#platform' },
  { label: 'Operations', href: '#operations' },
  { label: 'Trust', href: '#trust' },
  { label: 'Momentum', href: '#momentum' },
];

const servicePillars = [
  {
    icon: Radar,
    title: 'Portfolio intelligence',
    description:
      'Bring private equity, real estate, and investor reporting into one operating view with live portfolio signals.',
  },
  {
    icon: Building2,
    title: 'Asset operations',
    description:
      'Track projects, financing structures, distributions, and jurisdiction-specific rules without spreadsheet sprawl.',
  },
  {
    icon: ShieldCheck,
    title: 'Institutional governance',
    description:
      'Maintain approval trails, investor logs, and role-based controls suitable for operators, auditors, and partners.',
  },
];

const operatingModel = [
  {
    title: 'Capture',
    body: 'Centralize portfolio, cap table, and real estate workflows from fragmented systems into one operational record.',
  },
  {
    title: 'Interpret',
    body: 'Transform activity into executive dashboards, predictive signals, and partner-ready reporting.',
  },
  {
    title: 'Act',
    body: 'Coordinate capital decisions, distributions, and asset-level follow-through from the same platform.',
  },
];

const trustSignals = [
  'Role-based access across operators, finance teams, and investors',
  'Audit-friendly event history for ownership and capital movement',
  'Multi-entity structure for funds, SPVs, and real estate programs',
  'Partner-ready reporting for board updates and investor review',
];

const momentumStats = [
  { value: 'Multi-asset', label: 'Coverage across private equity, real estate, and investor operations' },
  { value: 'Live', label: 'Performance visibility without waiting for static reporting cycles' },
  { value: 'Unified', label: 'Workflow from acquisition model to investor distribution record' },
];

const screenshotShowcase = [
  {
    label: 'Executive Suite',
    title: 'Portfolio command center',
    description: 'High-level portfolio visibility, operating metrics, and investor-facing summaries in one executive view.',
    src: '/screenshots/executive-suit.png',
    aspectRatio: 'aspect-[16/11]',
  },
  {
    label: 'Growth Analytics',
    title: 'Performance and forecasting',
    description: 'Historical growth, projected performance, and asset momentum presented in a format leaders can scan quickly.',
    src: '/screenshots/portfolio-growth.png',
    aspectRatio: 'aspect-[16/11]',
  },
  {
    label: 'Real Estate',
    title: 'Asset and jurisdiction workflows',
    description: 'Property-level planning, financing structure visibility, and operational tracking for real asset portfolios.',
    src: '/screenshots/real-estate.png',
    aspectRatio: 'aspect-[16/11]',
  },
  {
    label: 'Investor Ledger',
    title: 'Ownership and distribution records',
    description: 'Investor activity, cap table visibility, and payout history with the operational trail behind each movement.',
    src: '/screenshots/investor-log.png',
    aspectRatio: 'aspect-[16/11]',
  },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'border-b border-slate-200/80 bg-white/85 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-3 text-slate-950">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 shadow-[0_18px_40px_rgba(15,23,42,0.15)]">
            <LineChart className="h-5 w-5 text-cyan-300" />
          </div>
          <div className="min-w-0">
            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500">Finance Remade</div>
            <div className="truncate text-sm font-semibold text-slate-950">Investment Operating System</div>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950">
            Partner Brief
          </button>
          <button className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">
            Request Intro
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 lg:hidden"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-b border-slate-200 bg-white lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-slate-700"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-3">
                <button className="rounded-full border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
                  Partner Brief
                </button>
                <button className="rounded-full bg-slate-950 px-4 py-3 text-sm font-medium text-white">
                  Request Intro
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-600">
      <span className="h-2 w-2 rounded-full bg-cyan-400" />
      {children}
    </div>
  );
}

function HeroShowcase() {
  const [active, setActive] = useState(0);
  const items = useMemo(() => screenshotShowcase, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % items.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [items.length]);

  return (
    <div className="relative mx-auto w-full max-w-[48rem] lg:max-w-none">
      <div className="absolute -left-8 top-12 h-40 w-40 rounded-full bg-cyan-200/35 blur-3xl" />
      <div className="absolute -right-4 bottom-10 h-48 w-48 rounded-full bg-slate-200/80 blur-3xl" />

      <div className="relative z-10 rounded-[2rem] border border-slate-200 bg-white/88 p-4 shadow-[0_32px_80px_rgba(15,23,42,0.12)] backdrop-blur lg:p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={items[active].label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-3 rounded-[1.5rem] bg-slate-950 p-4 text-white md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <div className="text-xs uppercase tracking-[0.24em] text-cyan-200">{items[active].label}</div>
                <div className="mt-2 text-2xl font-semibold">{items[active].title}</div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{items[active].description}</p>
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-cyan-100">
                <Sparkles className="h-3.5 w-3.5" />
                Product preview
              </div>
            </div>

            <ScreenshotFrame
              label={items[active].label}
              src={items[active].src}
              alt={items[active].description}
              aspectRatio={items[active].aspectRatio}
            />
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(index)}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                index === active
                  ? 'border-slate-950 bg-slate-950 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-inherit/70">{item.label}</div>
              <div className="mt-2 text-sm font-semibold">{item.title}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 70]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.35]);

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-[#f7fafc] text-slate-950 selection:bg-slate-950 selection:text-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-28 lg:px-8 lg:pb-28 lg:pt-36">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_34%),radial-gradient(circle_at_85%_15%,_rgba(14,165,233,0.10),_transparent_24%),linear-gradient(180deg,_#ffffff_0%,_#f7fafc_50%,_#eef4f8_100%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.84fr)_minmax(32rem,1.16fr)] lg:items-center">
            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-2xl">
              <SectionLabel>Investor-grade platform overview</SectionLabel>
              <h1 className="max-w-[12ch] text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Operating infrastructure for complex investment businesses.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                Finance Remade gives investors and strategic partners a clean view of how capital, assets, and governance
                are coordinated across the platform.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                  Schedule a walkthrough
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950">
                  Review partner materials
                </button>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {momentumStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.05)] backdrop-blur">
                    <div className="text-xl font-semibold text-slate-950">{stat.value}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <HeroShowcase />
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-950 px-6 py-4 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 text-sm text-slate-300 md:grid-cols-4 md:items-center">
            <div className="font-medium text-white">Built for investor confidence and operating depth.</div>
            <div className="flex items-center gap-2">
              <Blocks className="h-4 w-4 text-cyan-300" />
              Multi-asset visibility
            </div>
            <div className="flex items-center gap-2">
              <LockKeyhole className="h-4 w-4 text-cyan-300" />
              Controlled governance
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-cyan-300" />
              Cross-border workflows
            </div>
          </div>
        </section>

        <section id="platform" className="px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <SectionLabel>Platform overview</SectionLabel>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                The services that matter most to investors and strategic partners.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Finance Remade presents the business at the right altitude: what the platform covers, where it creates
                leverage, and why its operating model is difficult to replicate.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {servicePillars.map((pillar, index) => (
                <motion.article
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_45px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                    <pillar.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">{pillar.title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{pillar.description}</p>
                  <button className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-950">
                    Explore capability
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </motion.article>
              ))}
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_20px_45px_rgba(15,23,42,0.06)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Featured workflow</div>
                    <div className="mt-1 text-2xl font-semibold text-slate-950">Executive dashboard</div>
                  </div>
                  <div className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">Primary view</div>
                </div>
                <ScreenshotFrame
                  label="Executive Suite"
                  src="/screenshots/executive-suit.png"
                  alt="Executive dashboard overview for portfolio performance."
                  aspectRatio="aspect-[16/10]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.08 }}
                className="rounded-[2rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_20px_45px_rgba(15,23,42,0.12)]"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Why this matters</div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">Let the interface prove the platform depth.</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Investors should see product substance early. Larger screenshots create that signal faster than abstract
                  claims alone.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    'Show the portfolio command center above the fold',
                    'Use supporting screenshots to explain workflows',
                    'Keep motion focused on transitions, not decoration',
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="operations" className="bg-slate-950 px-6 py-20 text-white lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <SectionLabel>Operating model</SectionLabel>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                One system connecting portfolio oversight, asset execution, and investor communication.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Finance Remade links daily execution with board-level visibility so operating teams, finance leaders, and
                investors are working from the same source of truth.
              </p>
              <div className="mt-10 space-y-5">
                {operatingModel.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5"
                  >
                    <div className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300">{item.title}</div>
                    <p className="mt-3 text-base leading-7 text-slate-300">{item.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55 }}
              className="grid gap-5"
            >
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4">
                <ScreenshotFrame
                  label="Portfolio Growth"
                  src="/screenshots/portfolio-growth.png"
                  alt="Performance analytics view with portfolio growth metrics."
                />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4">
                  <ScreenshotFrame
                    label="Real Estate"
                    src="/screenshots/real-estate.png"
                    alt="Real estate operations and cash flow planning."
                    aspectRatio="aspect-[5/4]"
                  />
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4">
                  <ScreenshotFrame
                    label="Investor Log"
                    src="/screenshots/investor-log.png"
                    alt="Investor ledger and ownership activity."
                    aspectRatio="aspect-[5/4]"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="trust" className="px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
              <div className="max-w-2xl">
                <SectionLabel>Trust architecture</SectionLabel>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Governance and reporting designed to make due diligence easier.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Governance needs to be visible, legible, and built into the workflow. The platform keeps oversight close to
                the underlying operational record.
              </p>
              </div>
              <div className="grid gap-4">
                {trustSignals.map((signal, index) => (
                  <motion.div
                    key={signal}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    className="flex items-start gap-4 rounded-[1.5rem] border border-slate-200 bg-white px-5 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.04)]"
                  >
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 text-cyan-700">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <p className="text-base leading-7 text-slate-700">{signal}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="momentum" className="px-6 pb-20 lg:px-8 lg:pb-28">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,_#0f172a,_#111827_58%,_#083344)] px-6 py-10 text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)] lg:px-10 lg:py-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <SectionLabel>Partner momentum</SectionLabel>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                A landing page that sells the shape of the business before the first meeting.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Present the platform with a high-level operating narrative, richer motion, clearer service framing, and
                credible product visuals for investor and partner conversations.
              </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <button className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-100">
                  Book partner review
                </button>
                <button className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                  Open executive demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
