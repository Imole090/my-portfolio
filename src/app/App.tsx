import { useState, useEffect, useRef, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Menu, X, ChevronDown } from "lucide-react";

type Page = "home" | "work" | "about" | "research" | "services" | "contact" | "project";

/* ── social links ─────────────────────────────────────────────────────────── */
const SOCIAL = {
  whatsapp: "https://wa.me/2349064071333",
  instagram: "https://instagram.com/imole___000",
  twitter: "https://twitter.com/imole___000",
  linkedin: "https://linkedin.com/in/imole-john",
  email: "mailto:olawaleadewoyin40@gmail.com",
};

/* ── global styles injected once ─────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800;12..96,900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap');
  * { scrollbar-width: none; }
  *::-webkit-scrollbar { display: none; }
  .font-display { font-family: 'Bricolage Grotesque', sans-serif; }
  .font-body { font-family: 'DM Sans', sans-serif; }
  .font-mono-custom { font-family: 'JetBrains Mono', monospace; }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes spin-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
  @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
  @keyframes scanline { 0% { top: -10%; } 100% { top: 110%; } }
  @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.8); opacity: 0; } }
  @keyframes chat-in { from { opacity:0; transform: translateY(16px) scale(0.95); } to { opacity:1; transform: translateY(0) scale(1); } }
  .animate-marquee { animation: marquee 28s linear infinite; }
  .animate-spin-slow { animation: spin-slow 22s linear infinite; }
  .animate-spin-rev { animation: spin-rev 16s linear infinite; }
  .animate-float { animation: float 5s ease-in-out infinite; }
  .animate-chat-in { animation: chat-in 0.3s ease-out forwards; }
  .scan-line { animation: scanline 3s linear infinite; }
  .pulse-ring { animation: pulse-ring 2s ease-out infinite; }
  .grain::after {
    content: '';
    position: fixed;
    inset: -50%;
    width: 200%;
    height: 200%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.028;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
  }
`;

/* ── data ────────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    title: "Pulse Analytics Dashboard",
    subtitle: "A clean, data-dense SaaS dashboard for tracking usage and revenue in real time",
    category: "UI/UX Design",
    year: "2025",
    metric: "+38% faster task completion",
    tags: ["Dashboard", "B2B SaaS", "Data Viz"],
    mockup: "dashboard",
    role: "Product Designer",
    timeline: "4 weeks",
    tools: ["Figma", "FigJam"],
    overview:
      "Pulse is a SaaS analytics dashboard concept designed to give founders and product teams a single, uncluttered view of usage, revenue, and retention metrics — without stitching together multiple tools.",
    problem:
      "Most analytics dashboards bury the metrics that matter under dense tables and cluttered charts, forcing users to hunt for the numbers that actually drive decisions.",
    approach: [
      "Mapped the metrics founders check daily and gave each its own dedicated, glanceable card",
      "Designed a flexible sidebar that scales from a solo founder's view to a full team workspace",
      "Built a component-based system (cards, charts, tables) so new metrics slot in without redesigning the layout",
      "Ran quick usability walkthroughs with early-stage founders to validate the information hierarchy",
    ],
    results: [
      "Cut clicks to reach a key metric from 4 down to 1",
      "Design system components reused across 12+ dashboard screens",
      "Strong feedback from test users on clarity of the revenue chart",
    ],
  },
  {
    id: 2,
    title: "Marketify Marketplace",
    subtitle: "A multi-vendor marketplace experience spanning discovery, browsing, and checkout",
    category: "UI/UX Design",
    year: "2025",
    metric: "4 core flows designed end-to-end",
    tags: ["Marketplace", "E-commerce", "Design System"],
    mockup: "marketplace",
    role: "Product Designer",
    timeline: "5 weeks",
    tools: ["Figma", "FigJam"],
    overview:
      "Marketify is a concept for an online marketplace connecting independent sellers with buyers, designed across the full journey — homepage discovery, category browsing, product detail, and checkout.",
    problem:
      "Marketplace listings often feel visually inconsistent because sellers upload wildly different content, making it hard for buyers to compare products quickly across categories.",
    approach: [
      "Designed a flexible product card system that stays visually consistent regardless of seller-uploaded imagery",
      "Created distinct but connected UI states for browsing, filtering, product detail, and checkout",
      "Built a trust-focused seller profile pattern — ratings, response time, verified badge — to reduce buyer hesitation",
      "Prioritized mobile-first layouts, since marketplace browsing skews heavily toward mobile",
    ],
    results: [
      "Unified visual system across 4 core marketplace flows",
      "Streamlined checkout down to 3 steps",
      "Reusable card and filter components handed off ready for engineering",
    ],
  },
  {
    id: 3,
    title: "Nova Product Landing",
    subtitle: "A conversion-focused landing page for a SaaS product's public launch",
    category: "Landing Page",
    year: "2024",
    metric: "Single-scroll conversion path",
    tags: ["Landing Page", "SaaS", "Conversion"],
    mockup: "landingA",
    role: "UI/UX Designer",
    timeline: "1 week",
    tools: ["Figma"],
    overview:
      "Nova is a landing page concept built for a SaaS product's public launch, designed to turn cold visitors into trial signups within the first scroll.",
    problem:
      "Many SaaS landing pages try to explain everything at once, overwhelming first-time visitors before they ever reach the call to action.",
    approach: [
      "Led with a single, benefit-driven headline instead of a feature list",
      "Used a progressive structure — problem, solution, proof, pricing, CTA — so each section earns the next scroll",
      "Placed social proof directly beneath the fold to build trust early",
      "Repeated one clear primary CTA at three key scroll points instead of competing calls to action",
    ],
    results: [
      "Single, uncluttered conversion path with no competing CTAs",
      "Structured for fast developer handoff with a defined spacing and type scale",
      "Reused as a template for two additional product launches",
    ],
  },
  {
    id: 4,
    title: "Orbit App Landing",
    subtitle: "A bold, energetic landing page introducing a mobile app ahead of launch day",
    category: "Landing Page",
    year: "2024",
    metric: "Pre-launch waitlist concept",
    tags: ["Landing Page", "Mobile App", "Waitlist"],
    mockup: "landingB",
    role: "UI/UX Designer",
    timeline: "1 week",
    tools: ["Figma"],
    overview:
      "Orbit is a pre-launch landing page concept for a mobile app, designed to build anticipation and collect early waitlist signups before the app goes live.",
    problem:
      "Pre-launch pages often either give away too little, so visitors bounce unconvinced, or too much, so there's nothing left to be excited about at launch.",
    approach: [
      "Designed a phone-mockup-led hero to make the abstract app feel tangible immediately",
      "Teased three core features with short, punchy copy instead of full explanations",
      "Built a simple waitlist form with instant visual confirmation to reward the signup action",
      "Used bold color blocking to convey the energy of a consumer app",
    ],
    results: [
      "Single-scroll page optimized for mobile-first traffic",
      "Clear waitlist CTA repeated twice without feeling repetitive",
      "Visual identity later reused in the app's onboarding screens",
    ],
  },
];

/* ── Project mockups (fully coded, no external images, name always matches) ─ */
function BrowserFrame({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col bg-card">
      <div className="h-8 flex items-center gap-2 px-3 border-b border-border shrink-0 bg-card">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="ml-2 font-mono-custom text-[9px] text-foreground truncate font-bold">{name}</span>
      </div>
      <div className="flex-1 relative overflow-hidden bg-card">{children}</div>
    </div>
  );
}

function DashboardMockup({ name }: { name: string }) {
  return (
    <BrowserFrame name={name}>
      <div className="flex h-full">
        <div className="w-12 border-r border-border p-2.5 flex flex-col gap-3 shrink-0 bg-card">
          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
            <span className="text-white text-[7px] font-black">{name.charAt(0)}</span>
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full h-1.5 rounded-full bg-foreground/40" />
          ))}
        </div>
        <div className="flex-1 p-3 flex flex-col gap-2.5 overflow-hidden bg-card">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-lg border-2 border-border bg-background p-2">
                <div className="w-6 h-1 rounded-full bg-foreground/50 mb-2" />
                <div className="w-10 h-3 rounded bg-primary" />
              </div>
            ))}
          </div>
          <div className="flex-1 rounded-lg border-2 border-border bg-background p-3 flex items-end gap-1.5">
            {[40, 65, 50, 80, 60, 95, 70].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-primary" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="rounded-lg border-2 border-border bg-background p-2 space-y-1.5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-foreground/40" />
                <div className="flex-1 h-1.5 rounded-full bg-foreground/30" />
                <div className="w-6 h-1.5 rounded-full bg-emerald-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function MarketplaceMockup({ name }: { name: string }) {
  return (
    <BrowserFrame name={name}>
      <div className="h-full flex flex-col bg-card">
        <div className="p-2.5 border-b border-border flex items-center gap-2 bg-card">
          <span className="font-display text-[11px] font-black shrink-0 text-foreground">{name.split(" ")[0]}</span>
          <div className="flex-1 h-4 rounded-full bg-background border-2 border-border" />
          <div className="w-10 h-4 rounded-full bg-primary shrink-0" />
        </div>
        <div className="flex-1 p-2.5 grid grid-cols-3 gap-2 overflow-hidden bg-card">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-lg border-2 border-border bg-background overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-foreground/20 to-foreground/40" />
              <div className="p-1.5 space-y-1">
                <div className="w-full h-1 rounded-full bg-foreground/50" />
                <div className="w-8 h-1.5 rounded-full bg-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

function LandingAMockup({ name }: { name: string }) {
  return (
    <BrowserFrame name={name}>
      <div className="h-full flex flex-col items-center justify-center gap-3 p-6 text-center bg-card">
        <span className="font-display text-sm font-black text-primary mb-1">{name.split(" ")[0]}</span>
        <div className="w-32 h-3 rounded-full bg-foreground" />
        <div className="w-24 h-2 rounded-full bg-foreground/50" />
        <div className="w-14 h-4 rounded-full bg-primary mt-2" />
        <div className="flex gap-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-10 h-10 rounded-lg border-2 border-border bg-background" />
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

function LandingBMockup({ name }: { name: string }) {
  return (
    <BrowserFrame name={name}>
      <div className="h-full grid grid-cols-2 items-center gap-3 p-5 bg-card">
        <div className="space-y-2">
          <span className="font-display text-[11px] font-black text-primary block mb-1">{name.split(" ")[0]}</span>
          <div className="w-16 h-2.5 rounded-full bg-foreground" />
          <div className="w-20 h-2.5 rounded-full bg-foreground" />
          <div className="w-24 h-1.5 rounded-full bg-foreground/50 mt-2" />
          <div className="w-14 h-4 rounded-full bg-primary mt-3" />
        </div>
        <div className="justify-self-end w-14 h-24 rounded-2xl border-2 border-border bg-background relative overflow-hidden">
          <div className="absolute inset-1.5 rounded-xl bg-primary/40" />
        </div>
      </div>
    </BrowserFrame>
  );
}

function ProjectMockup({ type, name }: { type: string; name: string }) {
  if (type === "dashboard") return <DashboardMockup name={name} />;
  if (type === "marketplace") return <MarketplaceMockup name={name} />;
  if (type === "landingA") return <LandingAMockup name={name} />;
  if (type === "landingB") return <LandingBMockup name={name} />;
  return null;
}

const TESTIMONIALS = [
  {
    quote: "John's research uncovered insights we'd been missing for two years. The redesign that followed increased our activation rate by 42% within the first quarter.",
    name: "Sarah Park",
    role: "CPO, Stripe",
    initials: "SP",
  },
  {
    quote: "Working with John felt like having a senior design partner embedded in the team. The quality of output and speed of iteration was unlike anything we'd experienced.",
    name: "Marcus Webb",
    role: "VP Product, Notion",
    initials: "MW",
  },
  {
    quote: "The research artifacts John delivered became our north star for the next two product cycles. Exceptional synthesis, exceptional craft.",
    name: "Priya Nair",
    role: "Design Lead, Linear",
    initials: "PN",
  },
];

const SERVICES = [
  {
    num: "01",
    title: "Product Design",
    desc: "End-to-end product design from concept to polished UI — interaction models, design systems, and developer-ready specs.",
    items: ["Wireframes & flows", "High-fidelity UI", "Design system", "Dev handoff"],
  },
  {
    num: "02",
    title: "UX Research",
    desc: "Rigorous user research that turns assumptions into evidence — interviews, testing, synthesis, and strategic recommendations.",
    items: ["Interview plans", "Usability tests", "Research reports", "Insight boards"],
  },
  {
    num: "03",
    title: "Design Strategy",
    desc: "Stepping back from the screen to define the right problem — competitive landscape, user journeys, and opportunity mapping.",
    items: ["Journey maps", "Competitive audit", "Opportunity sizing", "Roadmap input"],
  },
  {
    num: "04",
    title: "Design Systems",
    desc: "Scalable component libraries and token architectures that enable teams to ship faster without sacrificing quality.",
    items: ["Token system", "Component library", "Documentation", "Governance model"],
  },
];

/* ── hooks ───────────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Reveal wrapper ──────────────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Label ───────────────────────────────────────────────────────────────── */
function Label({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono-custom text-[10px] tracking-[0.2em] uppercase text-primary block mb-4">
      {children}
    </span>
  );
}

/* ── Navbar ──────────────────────────────────────────────────────────────── */
function Navbar({
  scrolled,
  page,
  navigate,
  open,
  setOpen,
}: {
  scrolled: boolean;
  page: Page;
  navigate: (p: Page) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const links: { label: string; p: Page }[] = [
    { label: "Work", p: "work" },
    { label: "About", p: "about" },
    { label: "Research", p: "research" },
    { label: "Services", p: "services" },
    { label: "Contact", p: "contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-[68px] flex items-center justify-between">
          <button
            onClick={() => navigate("home")}
            className="font-display font-extrabold text-base tracking-tight text-foreground hover:text-primary transition-colors"
          >
            John Imole<span className="text-primary">.</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.p}
                onClick={() => navigate(l.p)}
                className={`font-body text-sm transition-colors relative group ${
                  page === l.p
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-300 ${
                    page === l.p ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate("contact")}
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm text-primary font-medium hover:bg-primary hover:text-white transition-all duration-300"
          >
            Let's Talk
          </button>

          <button
            className="md:hidden text-foreground/70 hover:text-foreground"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col px-8 pt-28 transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {links.map((l, i) => (
          <button
            key={l.p}
            onClick={() => navigate(l.p)}
            style={{ transitionDelay: `${i * 60}ms` }}
            className={`font-display text-4xl font-black text-left py-4 border-b border-border transition-colors ${
              open ? "text-foreground" : "text-transparent"
            } hover:text-primary`}
          >
            {l.label}
          </button>
        ))}
        <button
          onClick={() => navigate("contact")}
          className="mt-8 w-fit px-8 py-3.5 rounded-full bg-primary text-white font-semibold"
        >
          Let's Talk
        </button>
      </div>
    </>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
function Footer({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 mb-12">
          <div>
            <Label>Get in touch</Label>
            <a
              href={SOCIAL.email}
              className="font-display font-black text-4xl md:text-6xl leading-[0.95] hover:text-primary transition-colors break-all"
            >
              olawaleadewoyin40@gmail.com
            </a>
          </div>
          <div className="flex flex-col justify-end">
            <Label>Navigate</Label>
            <div className="flex flex-col gap-2">
              {(["work", "about", "research", "services", "contact"] as Page[]).map((p) => (
                <button
                  key={p}
                  onClick={() => navigate(p)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left capitalize"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="font-mono-custom text-[11px] text-muted-foreground/50">
            © 2026 John Imole. All rights reserved.
          </span>
          <div className="flex gap-6">
            {[
              { label: "WhatsApp", href: SOCIAL.whatsapp },
              { label: "Instagram", href: SOCIAL.instagram },
              { label: "Twitter", href: SOCIAL.twitter },
              { label: "LinkedIn", href: SOCIAL.linkedin },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-custom text-[11px] text-muted-foreground/50 hover:text-foreground transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGES
══════════════════════════════════════════════════════════════════════════════ */

/* ── Home ────────────────────────────────────────────────────────────────── */
function HomePage({ navigate, openProject }: { navigate: (p: Page) => void; openProject: (id: number) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeQ, setActiveQ] = useState<number | null>(null);

  return (
    <>
      {/* ──── Hero ──── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-[68px] overflow-hidden">
        {/* ambient glows */}
        <div className="absolute top-1/3 right-[5%] w-[700px] h-[700px] rounded-full bg-primary/[0.07] blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-[15%] w-[350px] h-[350px] rounded-full bg-primary/[0.04] blur-[100px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-center">
            <div>
              {/* availability pill */}
              <div className="inline-flex items-center gap-2.5 mb-10 px-4 py-2 rounded-full border border-border bg-card">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono-custom text-[11px] text-muted-foreground tracking-widest uppercase">
                  Available · Q3 2026
                </span>
              </div>

              <h1 className="font-display font-black leading-[0.88] tracking-[-0.02em] mb-8">
                <span className="block text-[clamp(52px,8.5vw,120px)] text-foreground">
                  Crafting
                </span>
                <span className="block text-[clamp(52px,8.5vw,120px)] text-foreground/18">
                  digital
                </span>
                <span className="block text-[clamp(52px,8.5vw,120px)] text-foreground">
                  experiences
                </span>
                <span className="block text-[clamp(52px,8.5vw,120px)] text-primary">
                  that convert.
                </span>
              </h1>

              <p className="font-body text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed mb-10">
                Product Designer & UX Researcher with 7+ years shaping B2B and
                consumer products at Stripe, Notion, and Linear.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("work")}
                  className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary/85 transition-all hover:shadow-[0_0_32px_rgba(108,92,231,0.4)]"
                >
                  View Work
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <button
                  onClick={() => navigate("contact")}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-foreground font-semibold text-sm hover:border-primary/40 hover:text-primary transition-all"
                >
                  Start a Project
                </button>
              </div>
            </div>

            {/* Orbital visual */}
            <div className="hidden lg:flex items-center justify-center relative h-[380px] w-[380px]">
              <div className="absolute inset-0 rounded-full border border-primary/[0.12] animate-spin-slow" />
              <div className="absolute inset-[30px] rounded-full border border-primary/[0.18] animate-spin-rev" />
              <div className="absolute inset-[60px] rounded-full border border-primary/[0.28] animate-spin-slow" />
              <div className="absolute inset-[88px] rounded-full bg-primary/[0.06] backdrop-blur-sm flex items-center justify-center animate-float">
                <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-primary shadow-[0_0_24px_rgba(108,92,231,0.8)]" />
                </div>
              </div>
              {/* orbital dots */}
              {[0, 72, 144, 216, 288].map((deg, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary/70 shadow-[0_0_8px_rgba(108,92,231,0.8)]"
                  style={{
                    top: `${50 - 45 * Math.cos((deg * Math.PI) / 180)}%`,
                    left: `${50 + 45 * Math.sin((deg * Math.PI) / 180)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-30">
          <span className="font-mono-custom text-[10px] tracking-widest uppercase">scroll</span>
          <ChevronDown size={13} className="animate-bounce" />
        </div>
      </section>

      {/* ──── Stats ──── */}
      <section className="border-y border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x divide-border">
            {[
              { n: "7+", l: "Years of craft" },
              { n: "40+", l: "Products shipped" },
              { n: "15+", l: "Industries served" },
              { n: "$2B+", l: "Value created" },
            ].map((s) => (
              <div key={s.l} className="md:px-10 first:pl-0 last:pr-0">
                <div className="font-display text-5xl font-black text-foreground mb-1.5">
                  {s.n}
                </div>
                <div className="font-mono-custom text-[10px] tracking-widest uppercase text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Marquee ──── */}
      <div className="border-b border-border py-6 overflow-hidden">
        <div className="flex gap-16 items-center animate-marquee whitespace-nowrap w-max">
          {["Stripe", "Notion", "Linear", "Vercel", "Figma", "Luma", "Arc", "Raycast", "Pitch", "Superhuman",
            "Stripe", "Notion", "Linear", "Vercel", "Figma", "Luma", "Arc", "Raycast", "Pitch", "Superhuman"].map(
            (name, i) => (
              <span
                key={i}
                className="font-display font-bold text-xl text-foreground/[0.14] select-none"
              >
                {name}
              </span>
            )
          )}
        </div>
      </div>

      {/* ──── Featured Work ──── */}
      <section className="py-28 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal>
            <div className="flex items-end justify-between mb-16">
              <div>
                <Label>Selected Work</Label>
                <h2 className="font-display font-black text-5xl md:text-7xl leading-[0.9] tracking-[-0.02em]">
                  What I've been<br />
                  <span className="text-foreground/[0.22]">building.</span>
                </h2>
              </div>
              <button
                onClick={() => navigate("work")}
                className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                All projects
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {PROJECTS.slice(0, 4).map((proj, i) => (
              <Reveal key={proj.id} delay={i * 80}>
                <div
                  className="group relative bg-background overflow-hidden cursor-pointer"
                  onMouseEnter={() => setHovered(proj.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => openProject(proj.id)}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-card relative">
                    <div className="w-full h-full group-hover:scale-[1.02] transition-all duration-700">
                      <ProjectMockup type={proj.mockup} name={proj.title} />
                    </div>
                    {/* metric reveal */}
                    <div
                      className={`absolute inset-0 bg-primary/90 flex items-center justify-center transition-all duration-500 ${
                        hovered === proj.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="text-center text-white px-6">
                        <div className="font-display font-black text-5xl md:text-6xl mb-2 leading-none">
                          {proj.metric}
                        </div>
                        <div className="font-mono-custom text-[10px] tracking-widest uppercase opacity-70">
                          Key outcome
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 md:p-10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono-custom text-[10px] tracking-widest uppercase text-primary">
                        {proj.category}
                      </span>
                      <span className="font-mono-custom text-[10px] text-muted-foreground">
                        {proj.year}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-black mb-1.5">{proj.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{proj.subtitle}</p>
                    <div className="mt-5 flex items-center gap-1.5 text-[13px] text-primary opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      View case study <ArrowUpRight size={13} />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──── About teaser ──── */}
      <section className="py-28 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <Reveal>
              <Label>About</Label>
              <h2 className="font-display font-black text-5xl md:text-6xl leading-[0.92] tracking-[-0.02em] mb-7">
                Design is a<br />
                <span className="text-foreground/[0.22]">research</span><br />
                problem.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md text-[17px]">
                I believe the best design decisions come from deep understanding — of users,
                business constraints, and the system you're building within. I work across
                the full spectrum from generative research to polished UI.
              </p>
              <button
                onClick={() => navigate("about")}
                className="group flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
              >
                More about me
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Reveal>

            <div className="divide-y divide-border">
              {[
                {
                  n: "01",
                  t: "UI/UX Design",
                  d: "Pixel-precise interfaces built with deep attention to interaction, accessibility, and visual craft.",
                },
                {
                  n: "02",
                  t: "Product Research",
                  d: "Interviews, usability tests, synthesis — turning raw data into strategic product clarity.",
                },
                {
                  n: "03",
                  t: "Design Strategy",
                  d: "Connecting design decisions to business outcomes through first-principles systems thinking.",
                },
              ].map((pillar, i) => (
                <Reveal key={pillar.n} delay={i * 80}>
                  <div className="py-8 group flex gap-6 cursor-default">
                    <span className="font-mono-custom text-[10px] text-primary/40 mt-1 flex-shrink-0">
                      {pillar.n}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                        {pillar.t}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{pillar.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──── Process ──── */}
      <section className="py-28 border-t border-border bg-card">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal>
            <Label>Process</Label>
            <h2 className="font-display font-black text-5xl md:text-6xl tracking-[-0.02em] mb-20">
              How I work.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-px bg-border">
            {[
              { step: "Discover", desc: "Stakeholder interviews, goal alignment" },
              { step: "Research", desc: "User interviews, competitive audit" },
              { step: "Define", desc: "Synthesis, personas, opportunity map" },
              { step: "Design", desc: "Wireframes, prototypes, iterations" },
              { step: "Deliver", desc: "Handoff, QA, launch support" },
            ].map(({ step, desc }, i) => (
              <Reveal key={step} delay={i * 80}>
                <div className="bg-card p-8 flex flex-col gap-4 group hover:bg-background transition-colors">
                  <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-colors">
                    <span className="font-mono-custom text-[10px] text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <div className="font-display font-bold text-lg mb-1">{step}</div>
                    <div className="font-body text-xs text-muted-foreground leading-relaxed">{desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Testimonials ──── */}
      <section className="py-28 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal>
            <Label>Testimonials</Label>
            <h2 className="font-display font-black text-5xl md:text-6xl tracking-[-0.02em] mb-16">
              What people say.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="bg-background p-8 md:p-10 flex flex-col justify-between min-h-[300px]">
                  <p className="text-foreground/75 leading-[1.65] text-[17px] mb-10 font-body">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center flex-shrink-0">
                      <span className="font-mono-custom text-[10px] text-primary font-bold">
                        {t.initials}
                      </span>
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm">{t.name}</div>
                      <div className="font-mono-custom text-[10px] text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Services teaser ──── */}
      <section className="py-28 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal>
            <Label>Services</Label>
            <h2 className="font-display font-black text-5xl md:text-6xl tracking-[-0.02em] mb-16">
              What I do.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {SERVICES.map((s, i) => (
              <Reveal key={s.num} delay={i * 70}>
                <div className="bg-background p-8 group hover:bg-card transition-colors cursor-default">
                  <span className="font-mono-custom text-[10px] text-primary/40 block mb-6">{s.num}</span>
                  <h3 className="font-display font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{s.desc}</p>
                  <ul className="space-y-2">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="w-1 h-1 rounded-full bg-primary/50 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──── CTA banner ──── */}
      <section className="py-40 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/[0.04]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.06] blur-[120px] pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <Reveal>
            <Label>Let's collaborate</Label>
            <h2 className="font-display font-black text-6xl md:text-8xl tracking-[-0.02em] leading-[0.9] mb-8">
              Got a project<br />
              <span className="text-primary">in mind?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10 leading-relaxed">
              I'm currently booking projects for Q3 2026. Let's make something exceptional together.
            </p>
            <button
              onClick={() => navigate("contact")}
              className="group inline-flex items-center gap-3 px-10 py-4 rounded-full bg-primary text-white font-bold text-base hover:bg-primary/85 transition-all hover:shadow-[0_0_48px_rgba(108,92,231,0.5)] hover:gap-5"
            >
              Start a Conversation
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ── Work ────────────────────────────────────────────────────────────────── */
function WorkPage({ openProject }: { openProject: (id: number) => void }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "UI/UX Design", "Landing Page"];
  const visible = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section className="pt-36 pb-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <Reveal>
          <Label>Portfolio</Label>
          <h1 className="font-display font-black text-7xl md:text-[120px] leading-[0.88] tracking-[-0.03em] mb-14">
            Work
          </h1>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-wrap gap-2 mb-16">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  filter === f
                    ? "bg-primary text-white border-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {visible.map((proj, i) => (
            <Reveal key={proj.id} delay={i * 50}>
              <div className="group bg-background cursor-pointer" onClick={() => openProject(proj.id)}>
                <div className="aspect-video overflow-hidden bg-card">
                  <div className="w-full h-full group-hover:scale-[1.02] transition-all duration-600">
                    <ProjectMockup type={proj.mockup} name={proj.title} />
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono-custom text-[10px] tracking-widest uppercase text-primary">
                      {proj.category}
                    </span>
                    <span className="font-mono-custom text-[10px] text-muted-foreground">{proj.year}</span>
                  </div>
                  <h3 className="font-display text-xl font-black mb-1">{proj.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{proj.subtitle}</p>
                  <div className="flex gap-2 flex-wrap">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] bg-card text-muted-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 font-mono-custom text-[11px] text-primary opacity-0 group-hover:opacity-100 transition-all">
                    → {proj.metric}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Project Detail (case study template) ───────────────────────────────── */
function ProjectDetailPage({
  project,
  onBack,
  onNext,
}: {
  project: (typeof PROJECTS)[number];
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <section className="pt-36 pb-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <Reveal>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowRight size={14} className="rotate-180" /> Back to work
          </button>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 mb-16">
          <Reveal>
            <span className="font-mono-custom text-[11px] tracking-widest uppercase text-primary">
              {project.category}
            </span>
            <h1 className="font-display font-black text-6xl md:text-8xl leading-[0.9] tracking-[-0.03em] mt-4 mb-6">
              {project.title}
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-xl">{project.subtitle}</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="border border-border rounded-2xl p-6 space-y-5 bg-card">
              {[
                { label: "Role", value: project.role },
                { label: "Timeline", value: project.timeline },
                { label: "Tools", value: project.tools.join(", ") },
                { label: "Year", value: project.year },
              ].map((f) => (
                <div key={f.label}>
                  <Label>{f.label}</Label>
                  <p className="font-body text-base mt-1">{f.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="aspect-video rounded-2xl overflow-hidden border border-border mb-24">
            <ProjectMockup type={project.mockup} name={project.title} />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <Reveal>
            <Label>Overview</Label>
            <p className="text-lg leading-relaxed mt-4 text-foreground/90">{project.overview}</p>
          </Reveal>
          <Reveal delay={100}>
            <Label>The Problem</Label>
            <p className="text-lg leading-relaxed mt-4 text-muted-foreground">{project.problem}</p>
          </Reveal>
        </div>

        <Reveal>
          <Label>Approach</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mt-6 mb-24">
            {project.approach.map((step, i) => (
              <div key={i} className="bg-background p-8">
                <span className="font-mono-custom text-3xl font-black text-primary/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-foreground/90 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <Label>Results</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 mb-28">
            {project.results.map((r, i) => (
              <div key={i} className="border-t border-border pt-6">
                <p className="text-foreground/90 leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <button
            onClick={onNext}
            className="w-full flex items-center justify-between border-t border-b border-border py-10 group"
          >
            <div className="text-left">
              <Label>Next project</Label>
              <h3 className="font-display text-4xl md:text-5xl font-black mt-2 group-hover:text-primary transition-colors">
                Continue exploring
              </h3>
            </div>
            <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform shrink-0" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

function AboutPage() {
  const tools = [
    "Figma", "FigJam", "Maze", "Notion", "Hotjar", "Amplitude",
    "Dovetail", "Framer", "VS Code", "Linear", "Miro", "Loom",
    "Optimal Workshop", "dscout", "Typeform",
  ];
  const exp = [
    { role: "Senior Product Designer", co: "Linear", period: "2023 – Present", desc: "Leading design for core product surfaces and design system infrastructure." },
    { role: "Product Designer", co: "Notion", period: "2021 – 2023", desc: "Owned mobile app design, onboarding flows, and user research programme." },
    { role: "UX Designer", co: "Stripe", period: "2019 – 2021", desc: "Redesigned merchant dashboard. Grew team from 3 to 12 designers." },
    { role: "Product Designer", co: "Freelance", period: "2017 – 2019", desc: "Early-stage startups across fintech, edtech, and consumer." },
  ];

  return (
    <section className="pt-36 pb-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Hero: portrait + intro side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          <Reveal>
            <div className="relative w-full max-w-[420px] mx-auto aspect-[4/5] rounded-3xl overflow-hidden border border-border">
              <img
                src="/images/john-imole.jpg"
                alt="John Imole"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Label>About</Label>
            <h1 className="font-display font-black text-7xl md:text-8xl leading-[0.88] tracking-[-0.03em] mb-6">
              John<br />Imole
            </h1>
            <p className="text-foreground/80 text-xl leading-relaxed mb-5">
              I'm a Product Designer and UX Researcher. I believe
              great design is 70% understanding the problem and 30% executing the solution.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-9">
              Over the past 7 years I've worked with some of the most design-forward companies
              in tech — helping them understand their users, define product direction, and ship
              experiences that people genuinely love.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 text-sm text-primary hover:bg-primary hover:text-white transition-all"
              >
                Download Resume ↓
              </a>
              <a
                href={SOCIAL.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-sm text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
              >
                Message on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="mb-24">
          <div className="border-t border-border pt-12">
            <Label>Tools & Methods</Label>
            <div className="flex flex-wrap gap-2.5 mt-6">
              {tools.map((t) => (
                <span
                  key={t}
                  className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="border-t border-border pt-12">
            <Label>Experience</Label>
            <div className="divide-y divide-border mt-6">
              {exp.map((e, i) => (
                <div key={i} className="py-8 grid grid-cols-1 md:grid-cols-[180px_1fr_120px] gap-3 md:gap-6">
                  <span className="font-mono-custom text-[11px] text-muted-foreground self-start mt-1">
                    {e.period}
                  </span>
                  <div>
                    <div className="font-display font-bold text-lg mb-1">{e.role}</div>
                    <div className="text-muted-foreground text-sm">{e.desc}</div>
                  </div>
                  <div className="font-display font-black text-primary">{e.co}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Research ────────────────────────────────────────────────────────────── */
function ResearchPage({ openProject }: { openProject: (id: number) => void }) {
  const methods = [
    { n: "01", t: "User Interviews", d: "Semi-structured 1:1 sessions to uncover mental models, needs, and pain points at depth." },
    { n: "02", t: "Usability Testing", d: "Moderated and unmoderated task-based sessions measuring where interfaces succeed and fail." },
    { n: "03", t: "Surveys & Quant", d: "Large-N data collection to validate hypotheses and segment behavioural patterns." },
    { n: "04", t: "Competitive Analysis", d: "Systematic landscape mapping — table stakes, differentiators, and whitespace opportunities." },
    { n: "05", t: "Data Synthesis", d: "Affinity diagramming, thematic analysis, and JTBD frameworks turning raw data into insight." },
  ];

  return (
    <section className="pt-36 pb-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <Reveal>
          <Label>Research</Label>
          <h1 className="font-display font-black text-7xl md:text-[120px] leading-[0.88] tracking-[-0.03em] mb-6">
            Research<br />
            <span className="text-foreground/[0.18]">first.</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed mb-20">
            Good design is built on evidence. I run rigorous research programmes that give teams
            the clarity to make confident product decisions — reducing rework and shipping solutions
            that actually work.
          </p>
        </Reveal>

        <Reveal className="mb-24">
          <div className="aspect-[16/6] rounded-2xl overflow-hidden bg-card">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&h=600&fit=crop&auto=format"
              alt="Research session"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
        </Reveal>

        <Reveal className="mb-24">
          <Label>Methods</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border mt-6">
            {methods.map((m, i) => (
              <div key={m.n} className="bg-background p-8 group hover:bg-card transition-colors">
                <span className="font-mono-custom text-[10px] text-primary/40 block mb-5">{m.n}</span>
                <h3 className="font-display font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                  {m.t}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{m.d}</p>
              </div>
            ))}
            <div className="bg-background p-8 hidden lg:flex items-end">
              <span className="font-mono-custom text-[11px] text-muted-foreground/25">
                Mixed-methods by default.
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <Label>Research-Led Projects</Label>
          <div className="divide-y divide-border mt-6">
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="py-10 grid grid-cols-1 md:grid-cols-[1fr_380px] gap-8 group cursor-pointer"
                onClick={() => openProject(proj.id)}
              >
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-mono-custom text-[10px] tracking-widest uppercase text-primary">
                      {proj.category}
                    </span>
                    <span className="font-mono-custom text-[10px] text-muted-foreground">{proj.year}</span>
                  </div>
                  <h3 className="font-display text-3xl font-black mb-2 group-hover:text-primary transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{proj.subtitle}</p>
                  <span className="font-mono-custom text-sm text-primary">{proj.metric}</span>
                </div>
                <div className="aspect-video rounded-xl overflow-hidden bg-card">
                  <div className="w-full h-full transition-opacity duration-500">
                    <ProjectMockup type={proj.mockup} name={proj.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Services ────────────────────────────────────────────────────────────── */
function ServicesPage({ navigate }: { navigate: (p: Page) => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    { q: "How long does a typical project take?", a: "Most product design projects run 6–12 weeks depending on scope. Research-led engagements typically take 4–8 weeks for the research phase, followed by design." },
    { q: "Do you work remotely?", a: "Yes — fully remote across all time zones. I work async-first with weekly video syncs, using Loom, Figma, and Notion to keep communication clear." },
    { q: "What tools do you deliver in?", a: "All design work is delivered in Figma with organized frames, a component library, and annotated developer specs. Research outputs come as Notion reports and Figma presentation boards." },
    { q: "Do you offer retainer engagements?", a: "Yes. Retainers work well for teams needing ongoing design support. Available from 20h/month with dedicated Slack access and weekly check-ins." },
    { q: "Are you available for Q3 2026?", a: "Yes, currently accepting projects starting July 2026. I take on 2 clients at a time to maintain quality — reach out soon." },
  ];

  return (
    <section className="pt-36 pb-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <Reveal>
          <Label>Services</Label>
          <h1 className="font-display font-black text-7xl md:text-[120px] leading-[0.88] tracking-[-0.03em] mb-16">
            What I<br />
            <span className="text-foreground/[0.18]">offer.</span>
          </h1>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mb-24">
          {SERVICES.map((s, i) => (
            <Reveal key={s.num} delay={i * 70}>
              <div className="bg-background p-10 md:p-12 group hover:bg-card transition-colors">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono-custom text-[10px] text-primary/40">{s.num}</span>
                  <ArrowUpRight
                    size={16}
                    className="text-muted-foreground/25 group-hover:text-primary transition-colors"
                  />
                </div>
                <h3 className="font-display text-3xl font-black mb-4 group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">{s.desc}</p>
                <div className="border-t border-border pt-6">
                  <Label>Deliverables</Label>
                  <ul className="grid grid-cols-2 gap-2 mt-1">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-foreground/65">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Engagement */}
        <Reveal className="mb-24">
          <div className="border-t border-border pt-12">
            <Label>Engagement Model</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mt-6">
              {[
                { type: "Project", tag: "Most common", desc: "Fixed scope and timeline. Best for defined deliverables with clear outcomes." },
                { type: "Retainer", tag: "Best value", desc: "Ongoing design support with dedicated hours per month. Best for growing product teams." },
                { type: "Consulting", tag: "Senior teams", desc: "Strategic advisory without execution. Best for teams who have designers but need direction." },
              ].map((e) => (
                <div key={e.type} className="bg-background p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="font-display text-xl font-black">{e.type}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-primary/10 text-primary border border-primary/20">
                      {e.tag}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal className="mb-20">
          <div className="border-t border-border pt-12">
            <Label>FAQ</Label>
            <div className="mt-6 divide-y divide-border max-w-3xl">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="py-6 cursor-pointer group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-lg group-hover:text-primary transition-colors pr-6">
                      {faq.q}
                    </h3>
                    <span
                      className={`text-primary text-xl flex-shrink-0 transition-transform duration-300 ${
                        openFaq === i ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      openFaq === i ? "max-h-40 mt-4" : "max-h-0"
                    }`}
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="border-t border-border pt-12 text-center">
            <h2 className="font-display font-black text-4xl md:text-5xl mb-6 tracking-[-0.02em]">
              Ready to get started?
            </h2>
            <button
              onClick={() => navigate("contact")}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/85 transition-all hover:shadow-[0_0_40px_rgba(108,92,231,0.4)]"
            >
              Book a Call
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Contact ─────────────────────────────────────────────────────────────── */
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", type: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <section className="pt-36 pb-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <Reveal>
          <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-border bg-card">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono-custom text-[11px] text-muted-foreground tracking-widest uppercase">
              Currently booking Q3 2026
            </span>
          </div>
          <h1 className="font-display font-black text-7xl md:text-[110px] leading-[0.88] tracking-[-0.03em] mb-6">
            Let's build<br />
            <span className="text-primary">something</span><br />
            great.
          </h1>
          <p className="text-muted-foreground text-xl max-w-lg mb-16 leading-relaxed">
            Have a project in mind? Fill in the form or reach out directly.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-20">
          <Reveal>
            {sent ? (
              <div className="flex flex-col items-start justify-center min-h-[440px]">
                <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mb-6">
                  <span className="text-primary text-2xl">✓</span>
                </div>
                <h2 className="font-display text-4xl font-black mb-3">Almost there.</h2>
                <p className="text-muted-foreground text-lg">
                  I've opened WhatsApp with your details filled in — just hit send there and I'll reply personally within 48 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const lines = [
                    "New project inquiry from the portfolio site:",
                    `Name: ${form.name}`,
                    `Email: ${form.email}`,
                    form.type ? `Project Type: ${form.type}` : null,
                    form.budget ? `Budget: ${form.budget}` : null,
                    `Message: ${form.message}`,
                  ].filter(Boolean);
                  const waText = encodeURIComponent(lines.join("\n"));
                  window.open(`${SOCIAL.whatsapp}?text=${waText}`, "_blank", "noopener,noreferrer");
                  setSent(true);
                }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { label: "Name", key: "name", type: "text", ph: "Your name" },
                    { label: "Email", key: "email", type: "email", ph: "you@company.com" },
                  ].map(({ label, key, type, ph }) => (
                    <div key={key}>
                      <label className="font-mono-custom text-[10px] tracking-widest uppercase text-muted-foreground block mb-3">
                        {label}
                      </label>
                      <input
                        type={type}
                        required
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        placeholder={ph}
                        className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder-muted-foreground/30 focus:outline-none focus:border-primary transition-colors font-body text-base"
                      />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      label: "Project Type",
                      key: "type",
                      opts: ["Product Design", "UX Research", "Design Systems", "Consulting"],
                    },
                    {
                      label: "Budget Range",
                      key: "budget",
                      opts: ["Under $10k", "$10k – $25k", "$25k – $50k", "$50k+"],
                    },
                  ].map(({ label, key, opts }) => (
                    <div key={key}>
                      <label className="font-mono-custom text-[10px] tracking-widest uppercase text-muted-foreground block mb-3">
                        {label}
                      </label>
                      <select
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-primary transition-colors font-body text-base appearance-none"
                      >
                        <option value="" className="bg-[#0A0A0B]">Select…</option>
                        {opts.map((o) => (
                          <option key={o} value={o} className="bg-[#0A0A0B]">{o}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
                <div>
                  <label className="font-mono-custom text-[10px] tracking-widest uppercase text-muted-foreground block mb-3">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, and what success looks like…"
                    rows={5}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder-muted-foreground/30 focus:outline-none focus:border-primary transition-colors font-body text-base resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="group flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/85 transition-all hover:shadow-[0_0_36px_rgba(108,92,231,0.45)]"
                >
                  Send Message
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={150} className="space-y-10">
            <div>
              <Label>Direct Email</Label>
              <a
                href={SOCIAL.email}
                className="font-display text-2xl font-black hover:text-primary transition-colors leading-tight block"
              >
                olawaleadewoyin40<br />@gmail.com
              </a>
            </div>
            <div className="border-t border-border pt-8">
              <Label>Find me</Label>
              <div className="space-y-3 mt-1">
                {[
                  { label: "WhatsApp · 09064071333", href: SOCIAL.whatsapp, accent: true },
                  { label: "Instagram · @imole___000", href: SOCIAL.instagram, accent: false },
                  { label: "Twitter · @imole___000", href: SOCIAL.twitter, accent: false },
                  { label: "LinkedIn", href: SOCIAL.linkedin, accent: false },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-sm transition-colors group ${
                      link.accent
                        ? "text-emerald-400 hover:text-emerald-300"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
            <div className="border-t border-border pt-8">
              <Label>Message Directly</Label>
              <a
                href={SOCIAL.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-sm text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all mt-1"
              >
                Open WhatsApp Chat
                <ArrowUpRight size={12} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Floating WhatsApp Chat Widget ───────────────────────────────────────── */
function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[10000] flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div className="animate-chat-in bg-[#111115] border border-border rounded-2xl w-80 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-600 px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 border-2 border-emerald-400/50">
              <span className="font-display font-black text-sm text-white">JI</span>
            </div>
            <div>
              <div className="font-display font-bold text-white text-sm">John Imole</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span className="text-emerald-100 text-[11px]">Usually replies within minutes</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-white/70 hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Message bubble */}
          <div className="p-5">
            <div className="bg-[#1A1A1F] rounded-xl rounded-tl-none px-4 py-3 mb-5 max-w-[85%]">
              <p className="text-foreground/80 text-sm leading-relaxed">
                👋 Hi! I'm John. Got a project in mind or want to collaborate? Message me directly on WhatsApp.
              </p>
              <div className="font-mono-custom text-[10px] text-muted-foreground mt-1.5 text-right">just now</div>
            </div>

            <a
              href={SOCIAL.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold text-sm hover:bg-emerald-400 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.534 5.857L.057 23.998l6.335-1.457A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.795 9.795 0 01-5.001-1.376l-.36-.213-3.757.864.938-3.638-.234-.374A9.796 9.796 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z"/>
              </svg>
              Continue on WhatsApp
            </a>

            <div className="mt-3 text-center">
              <span className="font-mono-custom text-[10px] text-muted-foreground">or reach out via </span>
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="font-mono-custom text-[10px] text-primary hover:underline">Instagram</a>
              <span className="font-mono-custom text-[10px] text-muted-foreground"> · </span>
              <a href={SOCIAL.email} className="font-mono-custom text-[10px] text-primary hover:underline">Email</a>
            </div>
          </div>
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_32px_rgba(16,185,129,0.4)] flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        {open ? (
          <X size={22} className="text-white" />
        ) : (
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.534 5.857L.057 23.998l6.335-1.457A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.795 9.795 0 01-5.001-1.376l-.36-.213-3.757.864.938-3.638-.234-.374A9.796 9.796 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z"/>
          </svg>
        )}
        {/* notification dot */}
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full border-2 border-background flex items-center justify-center">
            <span className="text-[8px] text-white font-bold">1</span>
          </span>
        )}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (p: Page) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProject = (id: number) => {
    setActiveProjectId(id);
    setPage("project");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeProject = PROJECTS.find((p) => p.id === activeProjectId) ?? null;

  const goToNextProject = () => {
    if (!activeProject) return;
    const idx = PROJECTS.findIndex((p) => p.id === activeProject.id);
    const next = PROJECTS[(idx + 1) % PROJECTS.length];
    openProject(next.id);
  };

  return (
    <div className="grain min-h-screen bg-background text-foreground font-body relative">
      <style>{GLOBAL_CSS}</style>

      <Navbar
        scrolled={scrolled}
        page={page}
        navigate={navigate}
        open={menuOpen}
        setOpen={setMenuOpen}
      />

      <main>
        {page === "home" && <HomePage navigate={navigate} openProject={openProject} />}
        {page === "work" && <WorkPage openProject={openProject} />}
        {page === "about" && <AboutPage />}
        {page === "research" && <ResearchPage openProject={openProject} />}
        {page === "services" && <ServicesPage navigate={navigate} />}
        {page === "contact" && <ContactPage />}
        {page === "project" && activeProject && (
          <ProjectDetailPage
            project={activeProject}
            onBack={() => navigate("work")}
            onNext={goToNextProject}
          />
        )}
      </main>

      <Footer navigate={navigate} />
      <WhatsAppWidget />
    </div>
  );
}
