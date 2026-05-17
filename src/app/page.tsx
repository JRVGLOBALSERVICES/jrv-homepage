"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FRAME SCRUBBER — Higgsfield video → scroll-driven
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const FRAMES = 61;
const fSrc = (i: number) => `/frames/frame_${String(i + 1).padStart(4, "0")}.jpg`;

function Scrubber({ onProg }: { onProg: (n: number) => void }) {
  const c = useRef<HTMLCanvasElement>(null);
  const imgs = useRef<HTMLImageElement[]>([]);
  const [ok, setOk] = useState(false);
  const cur = useRef(-1);

  useEffect(() => {
    const a: HTMLImageElement[] = [];
    let n = 0;
    for (let i = 0; i < FRAMES; i++) {
      const img = new Image();
      img.onload = img.onerror = () => { n++; if (n === FRAMES) { imgs.current = a; setOk(true); } };
      img.src = fSrc(i); a.push(img);
    }
    return () => a.forEach((i) => { i.src = ""; });
  }, []);

  const draw = useCallback((fi: number) => {
    const ca = c.current, im = imgs.current[fi];
    if (!ca || !im || !im.complete || !im.naturalWidth) return;
    const ctx = ca.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const w = window.innerWidth, h = window.innerHeight;
    ca.width = w; ca.height = h; ca.style.width = w + "px"; ca.style.height = h + "px";
    const s = Math.max(w / im.naturalWidth, h / im.naturalHeight);
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(im, (w - im.naturalWidth * s) / 2, h - im.naturalHeight * s, im.naturalWidth * s, im.naturalHeight * s);
  }, []);

  useEffect(() => {
    if (!ok) return;
    let cl: (() => void) | undefined, rt: any;
    const at = () => {
      const l = (window as any).__lenis;
      if (!l) { rt = setTimeout(at, 0); return; }
      const os = () => {
        const p = Math.min(1, window.scrollY / window.innerHeight);
        const fi = Math.min(FRAMES - 1, Math.floor(p * FRAMES));
        if (fi !== cur.current) { cur.current = fi; draw(fi); }
        onProg(p);
      };
      l.on("scroll", os); os();
      cl = () => l.off("scroll", os);
    };
    at();
    return () => { clearTimeout(rt); if (cl) cl(); };
  }, [ok, draw, onProg]);

  return (
    <div className="fixed inset-0 bg-black z-0">
      <canvas ref={c} className="w-full h-full block" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
      {!ok && <div className="absolute inset-0 flex items-center justify-center bg-black"><div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" /></div>}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CARS = [
  { n: "Perodua Axia G1", p: "RM 110", s: "Hatchback · 5 seats", c: "Economy" },
  { n: "Perodua Axia G2", p: "RM 120", s: "Hatchback · 5 seats", c: "Economy" },
  { n: "Proton Exora", p: "RM 170", s: "MPV · 7 seats", c: "Family" },
  { n: "Proton X50", p: "RM 250", s: "SUV · 5 seats", c: "Adventure" },
  { n: "Toyota Vios", p: "RM 170", s: "Sedan · 5 seats", c: "Sedan" },
  { n: "Toyota Yaris", p: "RM 161", s: "Hatchback · 5 seats", c: "Premium" },
  { n: "Honda City RS", p: "RM 170", s: "Hybrid · 5 seats", c: "Hybrid" },
  { n: "Mitsubishi Xpander", p: "RM 350", s: "MPV · 7 seats", c: "MPV" },
  { n: "Toyota Alphard", p: "RM 700", s: "Luxury · 7 seats", c: "VIP" },
];

const REASONS = [
  { t: "Zero Deposit", d: "No security deposit needed. Rare in the industry." },
  { t: "Free Delivery", d: "Complimentary doorstep delivery within Seremban." },
  { t: "Unlimited Mileage", d: "No distance limits. Drive as far as you want." },
  { t: "24/7 Service", d: "Round-the-clock support and roadside assistance." },
  { t: "Latest Models", d: "2024-2026 facelift fleet, well-maintained." },
  { t: "KLIA Pickup", d: "Meet & greet at both terminals by appointment." },
  { t: "Best Rates", d: "From RM 110/day with transparent pricing." },
  { t: "Replacement", d: "Breakdown? We'll swap your vehicle. No questions." },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GSAP SECTION WRAPPER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function GSection({ id, label, title, children, wide = false }: {
  id?: string; label?: string; title: string; children: React.ReactNode; wide?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const kills: gsap.core.Tween[] = [];

    const h = el.querySelector("[data-g='h']");
    if (h) kills.push(gsap.fromTo(h, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
    }));

    const items = el.querySelectorAll("[data-g='i']");
    if (items.length) {
      gsap.set(items, { opacity: 0, y: 30 });
      kills.push(gsap.to(items, {
        opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.06,
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" },
      }));
    }

    return () => kills.forEach((k) => k.kill());
  }, []);

  return (
    <section id={id} ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 md:py-28 bg-black/50 backdrop-blur-sm"
    >
      <div className={`${wide ? "max-w-6xl" : "max-w-5xl"} mx-auto px-5 w-full`}>
        <div data-g="h" className="text-center mb-14">
          {label && <p className="text-[#FF4500] text-xs font-bold tracking-[0.3em] uppercase mb-3">{label}</p>}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[0.95]">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function Home() {
  const [sy, setSy] = useState(0);
  const [vp, setVp] = useState(0);
  useEffect(() => { setVp(window.innerHeight); }, []);
  const p = vp > 0 ? Math.min(1, sy / vp) : 0;
  const hp = useCallback((n: number) => setSy(n * (window.innerHeight || 720)), []);

  const fade = (s: number) => ({
    opacity: Math.min(1, Math.max(0, (p - s) * 8)),
    transform: `translateY(${(1 - Math.min(1, Math.max(0, (p - s) * 8))) * 25}px)`,
  });

  return (
    <main>
      {/* ── HIGGSFIELD VIDEO BACKGROUND ── */}
      <Scrubber onProg={hp} />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ opacity: Math.max(0, 1 - p * 3) }}>
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FF4500] flex items-center justify-center font-black text-white text-xs">JRV</div>
            <span className="text-white/50 text-[10px] tracking-widest uppercase hidden sm:block">Car Rental</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#cars" className="text-white/60 hover:text-white text-[10px] font-semibold uppercase tracking-wider transition-colors">Fleet</a>
            <a href="https://wa.me/60126565477" target="_blank"
              className="bg-[#FF4500] text-white text-xs font-bold px-4 py-2 rounded-lg hover:brightness-110 active:scale-95 transition-all"
            >Get a Quote</a>
          </div>
        </div>
      </nav>
      <div style={{ height: 56 }} />
      <div style={{ height: "calc(100vh - 56px)" }} />

      {/* ─── H E R O ─── */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="text-center px-5 max-w-3xl mx-auto">
          <p className="text-[#FF4500] text-xs font-bold tracking-[0.3em] uppercase mb-4" style={fade(0.03)}>JRV Car Rental · Since 2020</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.88] mb-4" style={fade(0.08)}>
            Rent The<br /><span className="text-[#FF4500]">Ride.</span><br />Own The<br /><span className="text-[#FF4500]">Road.</span>
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-md mx-auto" style={fade(0.18)}>Premium cars · Honest prices · Free delivery Seremban</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8" style={fade(0.28)}>
            <a href="https://wa.me/60126565477" target="_blank"
              className="bg-[#FF4500] text-white font-bold px-8 py-3.5 rounded-xl text-sm hover:brightness-110 active:scale-[0.97] transition-all"
            >Book on WhatsApp</a>
            <a href="tel:+60126565477"
              className="border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl text-sm hover:bg-white/5 active:scale-[0.97] transition-all"
            >Call +60 12-656 5477</a>
          </div>
          <div className="flex gap-8 justify-center mt-10" style={fade(0.38)}>
            {[{ v: "50+", l: "Cars" }, { v: "1K+", l: "Clients" }, { v: "4.9★", l: "Rating" }].map((x) => (
              <div key={x.l} className="text-center">
                <p className="text-2xl font-black text-white">{x.v}</p>
                <p className="text-[9px] text-white/40 font-semibold uppercase tracking-wider mt-0.5">{x.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── C A R   D I S P L A Y   S E C T I O N ─── */}
      <GSection id="cars" label="The Fleet" title="Choose Your Ride" wide>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CARS.map((car) => (
            <div key={car.n} data-g="i"
              className="group bg-white/10 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden
                         hover:bg-white/20 hover:border-[#FF4500]/40 hover:-translate-y-1
                         hover:shadow-[0_20px_40px_rgba(255,69,0,0.15)]
                         transition-all duration-300"
            >
              {/* Car placeholder */}
              <div className="h-28 md:h-32 bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center border-b border-white/5">
                <div className="w-14 h-14 rounded-full bg-white/10 border border-white/10 flex items-center justify-center
                              group-hover:bg-[#FF4500]/20 group-hover:border-[#FF4500]/30 transition-all duration-300">
                  <svg className="w-7 h-7 text-white/30 group-hover:text-[#FF4500]/60 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M19 17h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.5l-1.5-2H8L6.5 7H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
                  </svg>
                </div>
                <span className="absolute top-3 right-3 text-[9px] bg-[#FF4500]/20 text-[#FF4500] font-bold px-2 py-0.5 rounded-full">{car.c}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white text-sm">{car.n}</h3>
                <p className="text-white/40 text-[10px] mt-0.5">{car.s}</p>
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/10">
                  <span className="text-[#FF4500] font-black text-base">{car.p}<span className="text-white/20 text-[9px]">/day</span></span>
                  <a href="https://wa.me/60126565477"
                    className="text-white/50 group-hover:text-[#FF4500] text-[10px] font-bold uppercase tracking-wider transition-colors"
                  >Book</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GSection>

      {/* ─── E I G H T   R E A S O N S ─── */}
      <GSection id="reasons" label="Built Different" title="Eight Reasons We're Built Different">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {REASONS.map((r) => (
            <div key={r.t} data-g="i"
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4
                         hover:bg-white/10 hover:border-[#FF4500]/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <h3 className="font-bold text-white text-sm">{r.t}</h3>
              <p className="text-white/40 text-[11px] mt-1.5 leading-relaxed">{r.d}</p>
            </div>
          ))}
        </div>
      </GSection>

      {/* ─── R E V I E W S ─── */}
      <GSection label="Trusted" title="What Our Clients Say">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { q: '"Professional service, spotless car. Will definitely rent again."', a: "— Ahmad R.", s: "★★★★★" },
            { q: '"Smooth booking and free delivery saved my time. Highly recommended!"', a: "— Sarah L.", s: "★★★★★" },
            { q: '"Best car rental in Seremban. Zero deposit, unlimited mileage."', a: "— Mike C.", s: "★★★★★" },
          ].map((r, i) => (
            <div key={i} data-g="i"
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center
                         hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              <p className="text-[#FFD700] text-sm mb-3">{r.s}</p>
              <p className="text-white/80 text-sm leading-relaxed mb-3">{r.q}</p>
              <p className="text-white/40 text-xs">{r.a}</p>
            </div>
          ))}
        </div>
      </GSection>

      {/* ─── F A Q ─── */}
      <GSection label="Answers" title="FAQ">
        <div className="max-w-3xl mx-auto space-y-2">
          {[
            { q: "What documents do I need?", a: "Valid license, IC/passport, recent utility bill." },
            { q: "How much deposit?", a: "Zero deposit. Rare in the industry." },
            { q: "Mileage limit?", a: "No. Unlimited on all rentals." },
            { q: "Breakdown?", a: "24/7 roadside + replacement guaranteed." },
          ].map((f, i) => (
            <details key={i} data-g="i"
              className="group border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm"
            >
              <summary className="px-5 py-3.5 cursor-pointer text-white font-semibold text-sm flex items-center justify-between list-none hover:bg-white/5 transition-colors">
                <span>{f.q}</span>
                <span className="text-[#FF4500] group-open:rotate-180 transition-transform text-xs shrink-0">▾</span>
              </summary>
              <div className="px-5 pb-3.5 text-white/50 text-xs leading-relaxed border-t border-white/5 pt-2.5">{f.a}</div>
            </details>
          ))}
        </div>
      </GSection>

      {/* ─── C T A ─── */}
      <section className="relative min-h-[80vh] flex items-center justify-center py-20 bg-black/60 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase mb-3">Last Step</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-3">
            Ready To Hit<br /><span className="text-[#FF4500]">The Road?</span>
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto mb-8">Reply in minutes. Zero paperwork. Be on the road within the hour.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="https://wa.me/60126565477" target="_blank"
              className="bg-[#FF4500] text-white font-bold px-8 py-3.5 rounded-xl text-sm hover:brightness-110 active:scale-[0.97] transition-all"
            >Book via WhatsApp</a>
            <a href="tel:+60126565477"
              className="border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl text-sm hover:bg-white/5 active:scale-[0.97] transition-all"
            >Call +60 12-656 5477</a>
          </div>
        </div>
      </section>

      {/* ─── F O O T E R ─── */}
      <footer className="bg-black/90 py-10 text-center border-t border-white/5">
        <div className="max-w-5xl mx-auto px-5">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#FF4500] flex items-center justify-center font-black text-white text-xs">JRV</div>
            <span className="text-white font-bold text-sm">JRV Car Rental</span>
          </div>
          <p className="text-white/30 text-xs mb-1">51, Jln S2 B18, Seremban 2 · 24 hours · 7 days</p>
          <div className="flex justify-center gap-5 my-4">
            <a href="https://wa.me/60126565477" className="text-white/40 hover:text-[#FF4500] text-xs transition-colors">WhatsApp</a>
            <a href="tel:+60126565477" className="text-white/40 hover:text-[#FF4500] text-xs transition-colors">Call</a>
            <a href="https://jrvservices.co" className="text-white/40 hover:text-[#FF4500] text-xs transition-colors">Website</a>
          </div>
          <p className="text-white/40 text-[11px]">© 2026 JRV Rental Services. Powered by <a href="https://jrvsystems.app" className="text-[#FF4500] hover:underline">JRV Systems</a></p>
        </div>
      </footer>
    </main>
  );
}
