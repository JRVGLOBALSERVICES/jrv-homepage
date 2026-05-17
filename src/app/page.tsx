"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  { t: "Zero Deposit", d: "No security deposit needed." },
  { t: "Free Delivery", d: "Complimentary within Seremban." },
  { t: "Unlimited Mileage", d: "No distance limits." },
  { t: "24/7 Service", d: "Round-the-clock support." },
  { t: "Latest Models", d: "2024-2026 fleet." },
  { t: "KLIA Pickup", d: "Both terminals." },
  { t: "Best Rates", d: "From RM 110/day." },
  { t: "Replacement", d: "If breakdown." },
];

function GSection({ id, label, title, children }: {
  id?: string; label?: string; title: string; children: React.ReactNode;
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
    <section id={id} ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-5 w-full">
        <div data-g="h" className="text-center mb-14">
          {label && <p className="text-[#FF4500] text-xs font-bold tracking-[0.3em] uppercase mb-3">{label}</p>}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0a0a0a] leading-[0.95]">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  const [sy, setSy] = useState(0);
  const [vp, setVp] = useState(0);
  useEffect(() => { setVp(window.innerHeight); }, []);
  const p = vp > 0 ? Math.min(1, sy / vp) : 0;

  useEffect(() => {
    const l = (window as any).__lenis;
    if (!l) return;
    const os = () => setSy(window.scrollY);
    l.on("scroll", os);
    return () => l.off("scroll", os);
  }, []);

  const fade = (s: number) => ({
    opacity: Math.min(1, Math.max(0, (p - s) * 8)),
    transform: `translateY(${(1 - Math.min(1, Math.max(0, (p - s) * 8))) * 25}px)`,
  });

  return (
    <main>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FF4500] flex items-center justify-center font-black text-white text-xs">JRV</div>
            <span className="text-gray-700 text-[10px] tracking-widest uppercase font-semibold hidden sm:block">Car Rental</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#cars" className="text-gray-500 hover:text-black text-[10px] font-semibold uppercase tracking-wider transition-colors">Fleet</a>
            <a href="https://wa.me/60126565477" target="_blank" className="bg-[#FF4500] text-white text-xs font-bold px-4 py-2 rounded-lg hover:brightness-110 active:scale-95 transition-all">Get a Quote</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
        <div className="text-center px-5 max-w-3xl mx-auto pt-20">
          <p className="text-[#FF4500] text-xs font-bold tracking-[0.3em] uppercase mb-4">JRV Car Rental · Since 2020</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.88] mb-4">
            Rent The<br /><span className="text-[#FF4500]">Ride.</span><br />Own The<br /><span className="text-[#FF4500]">Road.</span>
          </h1>
          <p className="text-white/40 text-sm md:text-base max-w-md mx-auto mb-8">Premium cars · Honest prices · Free delivery Seremban</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="https://wa.me/60126565477" target="_blank" className="bg-[#FF4500] text-white font-bold px-8 py-3.5 rounded-xl text-sm hover:brightness-110 active:scale-[0.97] transition-all">Book on WhatsApp</a>
            <a href="tel:+60126565477" className="border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl text-sm hover:bg-white/5 active:scale-[0.97] transition-all">Call +60 12-656 5477</a>
          </div>
          <div className="flex gap-8 justify-center mt-10">
            {[{ v: "50+", l: "Cars" }, { v: "1K+", l: "Clients" }, { v: "4.9★", l: "Rating" }].map((x) => (
              <div key={x.l} className="text-center">
                <p className="text-2xl font-black text-white">{x.v}</p>
                <p className="text-[9px] text-white/40 font-semibold uppercase tracking-wider mt-0.5">{x.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET */}
      <GSection id="cars" label="The Fleet" title="Choose Your Ride">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CARS.map((car) => (
            <div key={car.n} data-g="i"
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-[#FF4500]/30 transition-all duration-300"
            >
              <div className="h-24 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border-b border-gray-100 relative">
                <svg className="w-8 h-8 text-gray-300 group-hover:text-[#FF4500]/40 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 17h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.5l-1.5-2H8L6.5 7H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
                </svg>
                <span className="absolute top-2 right-2 text-[9px] bg-[#FF4500]/10 text-[#FF4500] font-bold px-2 py-0.5 rounded-full">{car.c}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#0a0a0a] text-sm">{car.n}</h3>
                <p className="text-gray-400 text-[10px] mt-0.5">{car.s}</p>
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100">
                  <span className="text-[#FF4500] font-black text-base">{car.p}<span className="text-gray-300 text-[9px]">/day</span></span>
                  <a href="https://wa.me/60126565477" className="text-gray-400 group-hover:text-[#FF4500] text-[10px] font-bold uppercase tracking-wider transition-colors">Book</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GSection>

      {/* REASONS */}
      <GSection label="Built Different" title="Eight Reasons We're Built Different">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {REASONS.map((r) => (
            <div key={r.t} data-g="i"
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-[#FF4500]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <h3 className="font-bold text-[#0a0a0a] text-sm">{r.t}</h3>
              <p className="text-gray-500 text-[11px] mt-1.5 leading-relaxed">{r.d}</p>
            </div>
          ))}
        </div>
      </GSection>

      {/* REVIEWS */}
      <GSection label="Trusted" title="What Our Clients Say">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { q: '"Professional service, spotless car. Will definitely rent again."', a: "— Ahmad R.", s: "★★★★★" },
            { q: '"Smooth booking and free delivery saved my time."', a: "— Sarah L.", s: "★★★★★" },
            { q: '"Best car rental in Seremban. Zero deposit, unlimited mileage."', a: "— Mike C.", s: "★★★★★" },
          ].map((r, i) => (
            <div key={i} data-g="i"
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <p className="text-[#FFD700] text-sm mb-3">{r.s}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{r.q}</p>
              <p className="text-gray-400 text-xs">{r.a}</p>
            </div>
          ))}
        </div>
      </GSection>

      {/* FAQ */}
      <GSection label="Answers" title="FAQ">
        <div className="max-w-3xl mx-auto space-y-2">
          {[
            { q: "What documents do I need?", a: "Valid license, IC/passport, recent utility bill." },
            { q: "How much deposit?", a: "Zero deposit. Rare in the industry." },
            { q: "Mileage limit?", a: "No. Unlimited on all rentals." },
            { q: "Breakdown?", a: "24/7 roadside + replacement guaranteed." },
          ].map((f, i) => (
            <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden bg-white">
              <summary className="px-5 py-3.5 cursor-pointer text-[#0a0a0a] font-semibold text-sm flex items-center justify-between list-none hover:bg-gray-50 transition-colors">
                <span>{f.q}</span>
                <span className="text-[#FF4500] group-open:rotate-180 transition-transform text-xs shrink-0">▾</span>
              </summary>
              <div className="px-5 pb-3.5 text-gray-500 text-xs leading-relaxed border-t border-gray-100 pt-2.5">{f.a}</div>
            </details>
          ))}
        </div>
      </GSection>

      {/* CTA */}
      <section className="bg-[#FF4500] py-16">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-3">Ready To Hit<br />The Road?</h2>
          <p className="text-white/70 text-sm max-w-md mx-auto mb-8">Reply in minutes. Zero paperwork. Be on the road within the hour.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="https://wa.me/60126565477" target="_blank" className="bg-black text-white font-bold px-8 py-3.5 rounded-xl text-sm hover:brightness-110 active:scale-[0.97] transition-all">Book via WhatsApp</a>
            <a href="tel:+60126565477" className="border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl text-sm hover:bg-white/10 active:scale-[0.97] transition-all">Call +60 12-656 5477</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] text-white/40 py-10 text-center">
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
