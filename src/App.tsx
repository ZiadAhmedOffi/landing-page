import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  TrendingUp, 
  ChevronRight, 
  ArrowRight,
  Menu,
  X,
  Globe,
  Shield,
  Zap,
  Layers,
  BarChart3,
  Users
} from 'lucide-react';
import { ScreenshotFrame } from './components/ScreenshotFrame';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 180 }}
            className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200"
          >
            <TrendingUp className="text-white w-7 h-7" />
          </motion.div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">Investment Intelligence Tool</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-10">
          {['Intelligence', 'Performance', 'Global Scale', 'Governance'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`} 
              className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <button className="text-sm font-bold text-slate-900 hover:opacity-70 transition-opacity">Log in</button>
          <button className="px-8 py-3.5 text-sm font-bold text-white bg-slate-900 rounded-2xl hover:bg-brand-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
            Request Demo
          </button>
        </div>

        <button className="lg:hidden p-2 text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white border-b border-slate-100 absolute w-full left-0 top-full"
          >
            <div className="px-8 py-12 flex flex-col gap-8">
              {['Intelligence', 'Performance', 'Global Scale', 'Governance'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-slate-900">
                  {item}
                </a>
              ))}
              <hr className="border-slate-100" />
              <button className="w-full py-5 text-center font-black bg-slate-900 text-white rounded-2xl text-xl">Request Demo</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ badge, title, subtitle, centered = false }: { badge: string; title: string | ReactNode; subtitle: string | ReactNode; centered?: boolean }) => (
  <div className={`mb-20 ${centered ? 'text-center' : ''}`}>
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
      {badge}
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-8 leading-[1.05]"
    >
      {title}
    </motion.h2>
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-xl text-slate-500 max-w-3xl leading-relaxed mx-auto"
    >
      {subtitle}
    </motion.p>
  </div>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen bg-[#fdfdfd] overflow-x-hidden selection:bg-slate-900 selection:text-white">
      <Navbar />

      {/* Hero Section: Visionary & High-Level */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 px-8 overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-slate-900 leading-[0.85] mb-8">
              PRECISION <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500">INTELLIGENCE.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 leading-relaxed mb-10 max-w-3xl mx-auto font-medium">
              Unified asset management for institutional private equity and global real estate. Transform complex data into strategic alpha with radical clarity.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-12 py-6 bg-slate-900 text-white font-black rounded-2xl hover:bg-brand-600 transition-all shadow-2xl shadow-slate-300 flex items-center justify-center gap-3 group text-lg">
                Request Executive Access <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="px-12 py-6 bg-white text-slate-900 font-black rounded-2xl border-2 border-slate-100 hover:border-slate-900 transition-all flex items-center justify-center gap-3 text-lg">
                View Vision
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-200/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-200/30 blur-[120px] rounded-full" />
        </div>
      </section>

      {/* Strategic Intelligence Section */}
      <section id="intelligence" className="py-32 px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            badge="Decision Intelligence"
            title="Strategic Clarity, Empowered by Data."
            subtitle="Stop managing spreadsheets. Start managing strategy. Investment Intelligence Tool provides the executive lens required for complex multi-asset portfolios."
            centered
          />
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Zap, title: 'Speed to Insight', desc: 'Real-time growth tracking and predictive analytics across thousands of concurrent positions.' },
              { icon: Layers, title: 'Architectural Depth', desc: 'Unified accounting for Private Equity, Venture Debt, and usufruct Real Estate.' },
              { icon: Shield, title: 'Institutional Trust', desc: 'Immutable investor logs and cryptographically verified capital movements.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 rounded-[2.5rem] bg-slate-50 hover:bg-slate-900 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-10 shadow-lg group-hover:rotate-12 transition-transform duration-500">
                  <item.icon className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-white mb-4 transition-colors">{item.title}</h3>
                <p className="text-slate-500 group-hover:text-slate-400 leading-relaxed font-medium transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Performance: The Executive Dashboard */}
      <section id="performance" className="py-32 px-8 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
            <div>
              <SectionHeading 
                badge="Predictive Growth"
                title="Visualize the Future of Your Assets."
                subtitle="Track every dimension of portfolio growth and leverage historical data to project future performance. Investment Intelligence Tool provides the clarity needed to anticipate market shifts."
              />
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <div className="text-4xl font-black text-slate-900">Live</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Historical Tracking</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-slate-900">AI</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Predictive Analytics</div>
                </div>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed italic border-l-4 border-slate-900 pl-6">
                "The ability to see historical growth alongside projected performance has completely changed our investment strategy."
              </p>
            </div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <ScreenshotFrame 
                label="Growth & Prediction Engine"
                src="/screenshots/portfolio-growth.png"
                alt="Visual representation of historical portfolio growth and future performance projections."
              />
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-400/20 rounded-full blur-3xl" />
            </motion.div>
          </div>

          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200">
            <ScreenshotFrame 
              label="The Executive Suite"
              src="/screenshots/executive-suit.png"
              alt="The comprehensive dashboard showing multi-asset performance."
            />
          </div>
        </div>
      </section>

      {/* Global Scale: Real Estate Deep-Dive */}
      <section id="global-scale" className="py-32 px-8 bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-32">
            <SectionHeading 
              badge="Global Operations"
              title={<span className="text-white">Seamless Scale Across <br />Borders & Asset Classes.</span>}
              subtitle={<span className="text-slate-400 max-w-4xl">From usufruct allocation in the Middle East to jurisdiction-aware taxation in Europe. Manage a truly global portfolio from a single, unified command center.</span>}
              centered
            />
          </div>
          
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-32">
            <div className="lg:col-span-7">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/50 border border-white/5">
                <ScreenshotFrame 
                  label="Jurisdiction Engine"
                  src="/screenshots/real-estate.png"
                  alt="Real estate portfolio tracking with multi-currency and multi-tax logic."
                />
              </div>
            </div>
            <div className="lg:col-span-5 space-y-12">
              {[
                { title: 'Taxation Intelligence', desc: 'Automated rules for Acquisition, Income, and Disposal across global fiscal territories.' },
                { title: 'Construction Lifecycle', desc: 'Link off-plan milestones directly to payment schedules and projected cashflow impact.' },
                { title: 'Unified Capital', desc: 'Manage Murabaha, Mezzanine, and Conventional debt structures in one ledger.' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex gap-8"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white mb-3 tracking-tight">{item.title}</h4>
                    <p className="text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Background Animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-900/20 via-transparent to-transparent" />
        </div>
      </section>

      {/* Investor Management: Cap Table & Distributions */}
      <section id="governance" className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-12">
                <div className="flex gap-10">
                  <div className="shrink-0 w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center shadow-sm">
                    <Users className="w-10 h-10 text-slate-900" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Real-time Cap Tables</h4>
                    <p className="text-slate-500 leading-relaxed font-medium">Live ownership tracking that adjusts instantly with every capital call, secondary transfer, and reinvestment action.</p>
                  </div>
                </div>
                <div className="flex gap-10">
                  <div className="shrink-0 w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center shadow-sm">
                    <BarChart3 className="w-10 h-10 text-slate-900" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Automated Dividends</h4>
                    <p className="text-slate-500 leading-relaxed font-medium">Instantaneous waterfall calculations and automated payouts, ensuring every investor receives their exact pro-rata share.</p>
                  </div>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-16 px-10 py-5 bg-slate-50 text-slate-900 font-black rounded-2xl flex items-center gap-4 group hover:bg-slate-900 hover:text-white transition-all duration-300"
              >
                Explore Investor Suite <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeading 
                badge="Capital Dynamics"
                title="Precision Investor Management."
                subtitle="Eliminate the manual burden of cap table maintenance. Investment Intelligence Tool dynamically calculates ownership and automates distributions across dozens of LPs."
              />
              <div className="relative mt-12 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 rotate-1 lg:rotate-2 hover:rotate-0 transition-transform duration-700">
                <ScreenshotFrame 
                  label="Investor Ledger"
                  src="/screenshots/investor-log.png"
                  alt="Comprehensive view of the investor cap table with real-time ownership breakdown and automated dividend distribution logs."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive CTA */}
      <footer className="bg-slate-900 pt-48 pb-16 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-48">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-5xl md:text-8xl font-black text-white mb-12 tracking-tighter max-w-5xl leading-[0.9]"
            >
              INVEST WITH <br />
              <span className="text-brand-400">UNMATCHED CLARITY.</span>
            </motion.h2>
            <div className="flex flex-col sm:flex-row gap-8">
              <button className="px-16 py-8 bg-brand-500 text-white font-black rounded-3xl hover:bg-brand-400 transition-all shadow-[0_20px_50px_rgba(14,_165,_233,_0.3)] active:scale-95 text-2xl">
                Request a Demo
              </button>
              <button className="px-16 py-8 bg-white/5 text-white font-black rounded-3xl border-2 border-white/10 hover:bg-white/10 transition-all text-2xl">
                Talk to Strategy
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-20 border-t border-white/10 pt-20 text-slate-500">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-10 text-white">
                <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-black tracking-tighter">Investment Intelligence Tool</span>
              </div>
              <p className="max-w-sm text-lg leading-relaxed font-medium">The institutional standard for alternative investment performance and precision intelligence.</p>
            </div>
            <div>
              <h4 className="text-white font-black mb-10 uppercase tracking-widest text-sm">Capabilities</h4>
              <ul className="space-y-6 font-bold text-lg">
                <li className="hover:text-white transition-colors cursor-pointer">Private Equity</li>
                <li className="hover:text-white transition-colors cursor-pointer">Real Estate Suite</li>
                <li className="hover:text-white transition-colors cursor-pointer">Venture Debt</li>
                <li className="hover:text-white transition-colors cursor-pointer">LP Governance</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black mb-10 uppercase tracking-widest text-sm">Trust</h4>
              <ul className="space-y-6 font-bold text-lg">
                <li className="hover:text-white transition-colors cursor-pointer">Audit Logs</li>
                <li className="hover:text-white transition-colors cursor-pointer">DPoP Security</li>
                <li className="hover:text-white transition-colors cursor-pointer">Data Residency</li>
                <li className="hover:text-white transition-colors cursor-pointer">Compliance</li>
              </ul>
            </div>
          </div>
          <div className="mt-40 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm font-bold text-slate-600">© 2026 Investment Intelligence Tool. All rights reserved.</p>
            <div className="flex gap-10 text-sm font-bold text-slate-600">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
              <span className="hover:text-white transition-colors cursor-pointer">Ethics</span>
            </div>
          </div>
        </div>
        
        {/* Animated Background Logo */}
        <div className="absolute bottom-[-10%] right-[-5%] text-white/5 font-black text-[30rem] leading-none select-none pointer-events-none tracking-tighter">
          FR
        </div>
      </footer>
    </div>
  );
}
