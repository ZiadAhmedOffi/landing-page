import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Blocks,
  Building2,
  ChevronRight,
  FileSearch,
  Globe2,
  Landmark,
  LockKeyhole,
  Menu,
  Radar,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';
import { ScreenshotFrame } from './components/ScreenshotFrame';
import aafaqLogo from './assets/aafaq-logo.png';

const DEMO_REQUEST_EMAIL = 'ziadahmedoffi@gmail.com';

function promptForDemoRequest(sourceLabel: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const submittedEmail = window.prompt('Enter your email so we can prepare the application demo request:');
  const email = submittedEmail?.trim();

  if (!email) {
    return;
  }

  const isLikelyEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isLikelyEmail) {
    window.alert('Please enter a valid email address.');
    return;
  }

  const subject = encodeURIComponent('Application demo request');
  const body = encodeURIComponent(
    [
      'Hello,',
      '',
      'There is a new request for an application demo.',
      `Requester email: ${email}`,
      `CTA source: ${sourceLabel}`,
      '',
      'Please follow up with the requester to continue the conversation.',
    ].join('\n'),
  );

  window.location.href = `mailto:${DEMO_REQUEST_EMAIL}?subject=${subject}&body=${body}`;
}

const navItems = [
  { label: 'Thesis', href: '#thesis' },
  { label: 'Capabilities', href: '#platform' },
  { label: 'Model', href: '#operations' },
  { label: 'Trust', href: '#trust' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Outlook', href: '#momentum' },
];

const servicePillars = [
  {
    icon: Radar,
    slug: 'portfolio-intelligence',
    title: 'Portfolio intelligence',
    description:
      'Bring private equity, real estate, and investor reporting into one operating view with live portfolio signals.',
    importance:
      'Investment teams move slower when portfolio performance, asset exposure, and investor updates live in separate systems. Portfolio intelligence matters because leadership needs a current view of performance, risk, and capital posture before making decisions.',
    challenge:
      'The application addresses the disconnect between underlying portfolio activity and the executive view by structuring updates, transactions, and operating metrics into a shared model instead of a reporting layer patched together at the end of the month.',
    approach: [
      'Capture portfolio events, ownership changes, and operating metrics in one structured system.',
      'Normalize inputs across private equity, real estate, and investor reporting workflows so leadership can compare performance without manual reconciliation.',
      'Surface executive dashboards, trend views, and portfolio summaries directly from the live operating record.',
    ],
    automation: [
      'Automated rollups from asset-level activity into portfolio-level visibility.',
      'Recurring investor summary preparation from the same dataset used by operators.',
      'Exception highlighting for drift, lagging assets, and reporting gaps.',
    ],
    outcomes: [
      'Faster portfolio reviews',
      'Cleaner investor communication',
      'Less spreadsheet stitching across funds and assets',
    ],
    supportingView: {
      label: 'Executive Suite',
      title: 'Portfolio command center',
      description: 'A single workspace for performance visibility, cross-asset comparisons, and investor-facing summaries.',
      src: '/screenshots/executive-suit.png',
      aspectRatio: 'aspect-[16/10]',
    },
  },
  {
    icon: Building2,
    slug: 'asset-operations',
    title: 'Asset operations',
    description:
      'Track projects, financing structures, distributions, and jurisdiction-specific rules without spreadsheet sprawl.',
    importance:
      'Asset operations are where execution risk accumulates. Teams need a system that keeps projects, financing, distributions, and asset-specific obligations connected so operational follow-through does not depend on fragmented trackers.',
    challenge:
      'The application approaches this by turning each asset into an operating record with linked workflows, status updates, and financial context, making it easier to coordinate execution across teams and jurisdictions.',
    approach: [
      'Maintain structured records for each asset, project, and financing arrangement.',
      'Track milestones, approvals, and obligations in context instead of across disconnected tools.',
      'Connect property operations and distribution workflows back to the broader investment structure.',
    ],
    automation: [
      'Workflow-driven status tracking for projects and assets.',
      'Reminder and follow-through support around financing, distributions, and jurisdiction-specific tasks.',
      'Automatic propagation of asset updates into portfolio and reporting views.',
    ],
    outcomes: [
      'More reliable execution',
      'Reduced manual coordination',
      'Clearer visibility into asset-level progress and blockers',
    ],
    supportingView: {
      label: 'Real Estate',
      title: 'Asset and jurisdiction workflows',
      description: 'A product view focused on property records, financing structures, and operational progress.',
      src: '/screenshots/real-estate.png',
      aspectRatio: 'aspect-[16/10]',
    },
  },
  {
    icon: ShieldCheck,
    slug: 'institutional-governance',
    title: 'Institutional governance',
    description:
      'Maintain approval trails, investor logs, and role-based controls suitable for operators, auditors, and partners.',
    importance:
      'Governance is what makes an investment platform credible at scale. Operators, finance teams, and investors need to trust the record behind approvals, capital movements, and reporting decisions.',
    challenge:
      'The application is being built to keep governance close to operational activity, so controls, logs, and reporting evidence are generated as teams work rather than reconstructed after the fact.',
    approach: [
      'Attach permissions, ownership context, and event history to the same workflows that drive execution.',
      'Keep investor records, approvals, and distribution history in an auditable operational timeline.',
      'Support multi-entity structures so governance reflects how funds, SPVs, and assets are actually organized.',
    ],
    automation: [
      'Automatic event logging for ownership and capital movement.',
      'Approval traceability tied to the relevant asset, fund, or investor action.',
      'Partner-ready reporting support generated from the governed system of record.',
    ],
    outcomes: [
      'Stronger audit readiness',
      'More trustworthy investor reporting',
      'Reduced control gaps between teams',
    ],
    supportingView: {
      label: 'Investor Ledger',
      title: 'Ownership and distribution records',
      description: 'A view centered on investor activity, payout history, and the operational trail behind each movement.',
      src: '/screenshots/investor-log.png',
      aspectRatio: 'aspect-[16/10]',
    },
  },
];

function getCapabilitySlugFromHash(hash: string) {
  const match = hash.match(/^#capability\/([^/?]+)/);
  return match?.[1] ?? null;
}

function setCapabilityHash(slug: string) {
  if (typeof window === 'undefined') {
    return;
  }

  window.location.hash = `capability/${slug}`;
}

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
  { value: 'One system', label: 'A single operational record for capital, assets, and investor workflows' },
  { value: 'Operator-first', label: 'Built around daily execution instead of a reporting layer added later' },
  { value: 'Audit-aware', label: 'Governance, approvals, and reporting designed into the workflow foundation' },
];

const reviewSignals = [
  {
    icon: FileSearch,
    label: 'Problem',
    title: 'Private market operations still run across too many disconnected tools.',
    body: 'Capital activity, asset execution, and investor reporting are often managed across spreadsheets, inboxes, and point solutions that do not share context.',
  },
  {
    icon: Workflow,
    label: 'Solution',
    title: 'Afaq-Capital turns those workflows into one operating system.',
    body: 'The product combines portfolio visibility, asset operations, governance, and investor reporting in a single application so the record used for execution is the same record used for oversight.',
  },
  {
    icon: Landmark,
    label: 'Why now',
    title: 'Institutional expectations are rising faster than internal tooling quality.',
    body: 'Investment teams need tighter controls, faster reporting, and more operational clarity across increasingly complex structures, but most internal processes have not caught up.',
  },
  {
    icon: Rocket,
    label: 'Product wedge',
    title: 'The wedge is operational depth, not surface-level financial dashboards.',
    body: 'This is positioned as workflow infrastructure for firms managing complex assets and investor obligations, which creates stronger product stickiness than lightweight analytics alone.',
  },
];

const roadmapPhases = [
  {
    phase: 'Phase 1',
    title: 'Unify the operating record',
    body: 'Consolidate portfolio, investor, and asset workflows into a single application layer that teams can use daily.',
  },
  {
    phase: 'Phase 2',
    title: 'Automate oversight and reporting',
    body: 'Generate executive views, investor updates, and compliance-supporting records directly from operational activity.',
  },
  {
    phase: 'Phase 3',
    title: 'Expand decision support',
    body: 'Use the structured operational record to surface predictive signals, execution bottlenecks, and portfolio-wide recommendations.',
  },
];

const reviewerTakeaways = [
  'A clear operational pain point with expensive fragmentation',
  'A product wedge tied to real daily workflows rather than passive analytics',
  'A credible path from execution tooling to higher-value automation and insight',
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

const platformCardShowcase = [
  {
    label: 'Equity Fund',
    title: 'Fund-level card',
    description: 'A compact fund summary view for ownership structure, status, and portfolio context.',
    detail: 'Use this view to establish how the platform frames ownership, fund identity, and portfolio-level status in a concise record.',
    src: '/screenshots/equity_fund_card.png',
    aspectRatio: 'aspect-[5/7]',
  },
  {
    label: 'Real Estate Card',
    title: 'Asset snapshot',
    description: 'A quick property card for reviewing asset identity, progress, and operating context.',
    detail: 'This card shows how asset-level information can stay legible for teams reviewing property status without opening a full workspace.',
    src: '/screenshots/real_estate_card.png',
    aspectRatio: 'aspect-[11/12]',
  },
];

const operationsShowcase = [
  {
    label: 'Investor Dashboard',
    title: 'Dashboard in operating context',
    description: 'The investor dashboard fits here because it shows how reporting is generated from live operating workflows rather than from a separate static layer.',
    badge: 'Active development',
    src: '/screenshots/investor_dash.png',
    aspectRatio: 'aspect-[16/9]',
  },
  {
    label: 'Portfolio Growth',
    title: 'Performance analytics',
    description: 'This view reinforces the interpretation layer of the operating model by turning live data into a clear performance and forecasting narrative.',
    badge: 'Live metrics',
    src: '/screenshots/portfolio-growth.png',
    aspectRatio: 'aspect-[16/10]',
  },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleRequestIntro = () => {
    setMobileOpen(false);
    promptForDemoRequest('Navbar request intro');
  };

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
          <img src={aafaqLogo} alt="AFAQ-Capital logo" className="h-9 w-auto sm:h-10" />
          <div className="hidden min-w-0 sm:block">
            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500">Afaq-Capital</div>
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
          <button
            type="button"
            onClick={handleRequestIntro}
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
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
                <button
                  type="button"
                  onClick={handleRequestIntro}
                  className="rounded-full bg-slate-950 px-4 py-3 text-sm font-medium text-white"
                >
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

function CapabilityPage({
  capability,
}: {
  capability: (typeof servicePillars)[number];
}) {
  const Icon = capability.icon;

  return (
    <main className="px-6 pb-20 pt-28 lg:px-8 lg:pb-28 lg:pt-36">
      <section className="mx-auto max-w-7xl">
        <a href="#platform" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950">
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to platform overview
        </a>

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionLabel>Capability page</SectionLabel>
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-50 text-cyan-700">
              <Icon className="h-6 w-6" />
            </div>
            <h1 className="mt-6 max-w-[14ch] text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              {capability.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{capability.description}</p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">{capability.importance}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => promptForDemoRequest(`${capability.title} capability page`)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Request application demo
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#momentum"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
              >
                Review application positioning
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Supporting product view
                </div>
                <div className="mt-1 text-2xl font-semibold text-slate-950">{capability.supportingView.title}</div>
              </div>
              <div className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">
                {capability.supportingView.label}
              </div>
            </div>
            <ScreenshotFrame
              label={capability.supportingView.label}
              src={capability.supportingView.src}
              alt={capability.supportingView.description}
              aspectRatio={capability.supportingView.aspectRatio}
            />
            <p className="mt-4 text-sm leading-6 text-slate-600">{capability.supportingView.description}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_45px_rgba(15,23,42,0.05)]">
          <SectionLabel>Why it matters</SectionLabel>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Importance in the application</h2>
          <p className="mt-5 text-base leading-7 text-slate-600">{capability.challenge}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {capability.outcomes.map((outcome) => (
              <div key={outcome} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700">
                {outcome}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_20px_45px_rgba(15,23,42,0.12)]">
          <SectionLabel>Automation focus</SectionLabel>
          <h2 className="text-3xl font-semibold tracking-tight text-white">What the platform automates</h2>
          <div className="mt-6 space-y-3">
            {capability.automation.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-6 text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_45px_rgba(15,23,42,0.05)]">
        <SectionLabel>How it works</SectionLabel>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">How the application goes about achieving it</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {capability.approach.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Step {index + 1}</div>
              <p className="mt-3 text-base leading-7 text-slate-700">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const items = useMemo(() => screenshotShowcase, []);

  useEffect(() => {
    if (isZoomed) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % items.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [isZoomed, items.length]);

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
              onZoomChange={setIsZoomed}
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

function RotatingShowcase({
  items,
  theme = 'light',
  interval = 3200,
  imageAspectClass,
}: {
  items: {
    label: string;
    title: string;
    description: string;
    src: string;
    aspectRatio: string;
    badge?: string;
    detail?: string;
  }[];
  theme?: 'light' | 'dark';
  interval?: number;
  imageAspectClass?: string;
}) {
  const [active, setActive] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (isZoomed) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % items.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval, isZoomed, items.length]);

  const activeItem = items[active];
  const isDark = theme === 'dark';

  return (
    <div className="grid gap-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28 }}
          className={`rounded-[2rem] border p-4 shadow-[0_20px_45px_rgba(15,23,42,0.06)] ${
            isDark ? 'border-cyan-300/15 bg-cyan-300/5' : 'border-slate-200 bg-white'
          }`}
        >
          <ScreenshotFrame
            label={activeItem.label}
            src={activeItem.src}
            alt={activeItem.description}
            aspectRatio={imageAspectClass ?? activeItem.aspectRatio}
            onZoomChange={setIsZoomed}
          />
        </motion.div>
      </AnimatePresence>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => {
          const activeCard = index === active;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(index)}
              className={`rounded-[1.5rem] border px-5 py-5 text-left transition ${
                isDark
                  ? activeCard
                    ? 'border-cyan-300/40 bg-white/10 text-white shadow-[0_18px_40px_rgba(8,145,178,0.12)]'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/7'
                  : activeCard
                    ? 'border-slate-950 bg-slate-950 text-white shadow-[0_18px_40px_rgba(15,23,42,0.12)]'
                    : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className={`text-[0.68rem] font-semibold uppercase tracking-[0.22em] ${activeCard ? 'text-inherit/75' : isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                  {item.label}
                </div>
                {item.badge ? (
                  <div
                    className={`rounded-full px-2.5 py-1 text-[0.68rem] font-medium ${
                      activeCard
                        ? isDark
                          ? 'bg-amber-400/10 text-amber-200'
                          : 'bg-cyan-100 text-cyan-800'
                        : isDark
                          ? 'bg-white/5 text-slate-400'
                          : 'bg-slate-200/80 text-slate-500'
                    }`}
                  >
                    {item.badge}
                  </div>
                ) : null}
              </div>
              <div className="mt-3 text-lg font-semibold sm:text-xl">{item.title}</div>
              <p className={`mt-3 text-sm leading-6 ${activeCard ? 'text-inherit/80' : isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {item.description}
              </p>
              {item.detail ? (
                <p className={`mt-3 text-sm leading-6 ${activeCard ? 'text-inherit/70' : isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {item.detail}
                </p>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PlatformSupportingViews() {
  const [active, setActive] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (isZoomed) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % platformCardShowcase.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [isZoomed]);

  const activeItem = platformCardShowcase[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_0.7fr] lg:items-start">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Supporting views</div>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
          Compact interfaces that explain the platform breadth.
        </h3>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
          These smaller cards give visitors a cleaner read on how fund and asset records are structured without
          overpowering the main platform story.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {platformCardShowcase.map((item, index) => {
            const activeCard = index === active;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setActive(index)}
                className={`rounded-[1.5rem] border px-5 py-5 text-left transition ${
                  activeCard
                    ? 'border-slate-950 bg-slate-950 text-white shadow-[0_18px_40px_rgba(15,23,42,0.12)]'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className={`text-[0.68rem] font-semibold uppercase tracking-[0.22em] ${activeCard ? 'text-inherit/75' : 'text-slate-400'}`}>
                  {item.label}
                </div>
                <div className="mt-3 text-lg font-semibold sm:text-xl">{item.title}</div>
                <p className={`mt-3 text-sm leading-6 ${activeCard ? 'text-inherit/80' : 'text-slate-600'}`}>
                  {item.description}
                </p>
                <p className={`mt-3 text-sm leading-6 ${activeCard ? 'text-inherit/70' : 'text-slate-500'}`}>
                  {item.detail}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.label}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.28 }}
          className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_20px_45px_rgba(15,23,42,0.06)] lg:sticky lg:top-28"
        >
          <ScreenshotFrame
            label={activeItem.label}
            src={activeItem.src}
            alt={activeItem.description}
            aspectRatio="aspect-[4/3]"
            onZoomChange={setIsZoomed}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 70]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.35]);
  const [activeCapabilitySlug, setActiveCapabilitySlug] = useState<string | null>(() =>
    typeof window === 'undefined' ? null : getCapabilitySlugFromHash(window.location.hash),
  );

  useEffect(() => {
    const onHashChange = () => {
      const capabilitySlug = getCapabilitySlugFromHash(window.location.hash);
      setActiveCapabilitySlug(capabilitySlug);

      if (capabilitySlug) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const activeCapability = servicePillars.find((pillar) => pillar.slug === activeCapabilitySlug) ?? null;

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-[#f7fafc] text-slate-950 selection:bg-slate-950 selection:text-white">
      <Navbar />

      {activeCapability ? (
        <CapabilityPage capability={activeCapability} />
      ) : (
      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-28 lg:px-8 lg:pb-28 lg:pt-36">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_34%),radial-gradient(circle_at_85%_15%,_rgba(14,165,233,0.10),_transparent_24%),linear-gradient(180deg,_#ffffff_0%,_#f7fafc_50%,_#eef4f8_100%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.84fr)_minmax(32rem,1.16fr)] lg:items-center">
            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-4">
                <img src={aafaqLogo} alt="AFAQ-Capital logo" className="h-12 w-auto sm:h-14" />
                <div className="hidden text-left sm:block">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-400">Brand mark</div>
                  <div className="mt-1 text-sm font-medium text-slate-600">Application concept and operating platform</div>
                </div>
              </div>
              <SectionLabel>Product overview</SectionLabel>
              <h1 className="max-w-[13ch] text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Operating software for complex private market workflows.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                Afaq-Capital is building an application for firms that manage capital, assets, investor relationships,
                and governance across fragmented systems. The goal is to replace scattered operating workflows with one
                structured platform that scales with institutional expectations.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => promptForDemoRequest('Hero schedule walkthrough')}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Request product walkthrough
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => promptForDemoRequest('Hero partner materials')}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                >
                  Request intro
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
            <div className="font-medium text-white">Built for operational depth, investor trust, and institutional scale.</div>
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

        <section id="thesis" className="px-6 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <SectionLabel>Product thesis</SectionLabel>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                The core idea behind the platform, explained clearly.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Afaq-Capital is not just presenting analytics. It is building workflow infrastructure for private market
                firms that need one reliable system for execution, reporting, and governance.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {reviewSignals.map((signal, index) => (
                <motion.article
                  key={signal.label}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_45px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                      <signal.icon className="h-5 w-5" />
                    </div>
                    <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      {signal.label}
                    </div>
                  </div>
                  <h3 className="mt-6 max-w-[20ch] text-2xl font-semibold tracking-tight text-slate-950">
                    {signal.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{signal.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="platform" className="px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <SectionLabel>Platform overview</SectionLabel>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                The core capabilities that make the product strategically valuable.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                The application is strongest where operational complexity is highest: portfolio visibility, asset execution,
                and institutional governance. These are the layers that are painful to coordinate manually and hard to replace
                once embedded.
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
                  <button
                    type="button"
                    onClick={() => setCapabilityHash(pillar.slug)}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-950"
                  >
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
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">The product value is in the operating layer.</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  The application is meant to become system-of-record infrastructure, not just presentation software. The
                  visual story needs to reinforce that depth without feeling heavy or overexplained.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    'Lead with execution workflows rather than generic analytics claims',
                    'Use screenshots to prove product depth and operational specificity',
                    'Keep the story focused on scalability, controls, and automation',
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-[2rem] border border-slate-200 bg-slate-50/80 p-6 shadow-[0_20px_45px_rgba(15,23,42,0.04)]"
              >
                <PlatformSupportingViews />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="operations" className="bg-slate-950 px-6 py-20 text-white lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <SectionLabel>Operating model</SectionLabel>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                A workflow stack connecting portfolio oversight, asset execution, and investor communication.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                The operating model shows how the company moves from fragmented internal processes to durable software
                infrastructure. Execution data is captured once, interpreted centrally, and reused across management,
                reporting, and governance workflows.
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
              <RotatingShowcase items={operationsShowcase} theme="dark" imageAspectClass="aspect-[16/9]" />
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
                  Governance is treated as a product layer, not an afterthought.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Strong investment software has to satisfy operators and oversight at the same time. Afaq-Capital is being
                  shaped so permissions, reporting history, and investor-facing records are built into the same workflows used
                  every day by the team.
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

        <section id="roadmap" className="px-6 pb-20 lg:px-8 lg:pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <div className="max-w-2xl">
                <SectionLabel>Platform roadmap</SectionLabel>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  A credible progression from workflow software to intelligence layer.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  The sequencing matters. The product starts by becoming useful in the daily workflow, then automates
                  oversight and reporting, and only then expands into higher-value decision support.
                </p>
                <div className="mt-8 space-y-3">
                  {reviewerTakeaways.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm leading-6 text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                {roadmapPhases.map((phase, index) => (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(240,249,255,0.95))] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">{phase.phase}</div>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{phase.title}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-600">{phase.body}</p>
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
                <SectionLabel>Application outlook</SectionLabel>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                An application designed to unify operations, reporting, and governance.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Afaq-Capital is being developed to give investment teams one structured environment for portfolio
                visibility, asset execution, investor communication, and institutional controls. The next step is a live
                walkthrough for anyone who wants to evaluate how the application is taking shape in more detail.
              </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <button
                  type="button"
                  onClick={() => promptForDemoRequest('Momentum application demo')}
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
                >
                  Request application demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      )}
    </div>
  );
}
