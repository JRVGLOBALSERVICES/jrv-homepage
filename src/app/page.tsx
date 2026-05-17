"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DESIGN SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const ease = [0.23, 1, 0.32, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CARS = [
  { n: "Perodua Axia G1", p: "RM 110", s: "Hatchback", t: "5 seats" },
  { n: "Perodua Axia G2", p: "RM 120", s: "Hatchback", t: "5 seats" },
  { n: "Proton Exora", p: "RM 170", s: "MPV", t: "7 seats" },
  { n: "Proton X50", p: "RM 250", s: "SUV", t: "5 seats" },
  { n: "Toyota Vios", p: "RM 170", s: "Sedan", t: "5 seats" },
  { n: "Toyota Yaris", p: "RM 161", s: "Hatchback", t: "5 seats" },
  { n: "Honda City RS", p: "RM 170", s: "Hybrid", t: "5 seats" },
  { n: "Mitsubishi Xpander", p: "RM 350", s: "MPV", t: "7 seats" },
  { n: "Toyota Alphard", p: "RM 700", s: "Luxury", t: "7 seats" },
];

const REASONS = [
  { t: "Zero Deposit", d: "No security deposit needed. Rare in the industry." },
  { t: "Free Delivery", d: "Complimentary within Seremban area." },
  { t: "Unlimited Mileage", d: "No distance limits at all." },
  { t: "24/7 Service", d: "Round-the-clock roadside assistance." },
  { t: "Latest Models", d: "2024-2026 well-maintained fleet." },
  { t: "KLIA Pickup", d: "Meet & greet at both terminals." },
  { t: "Best Rates", d: "From RM 110/day — transparent." },
  { t: "Replacement", d: "If breakdown, we swap your car." },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function Home() {
  return (
    <main>
      {/* NAV */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200"
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#FF4500] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs tracking-tight">JRV</span>
            </div>
            <span className="text-gray-700 text-xs font-semibold tracking-wider uppercase hidden sm:block">Car Rental</span>
          </a>
          <div className="flex items-center gap-5">
            <a href="#cars" className="text-gray-500 hover:text-black text-xs font-semibold uppercase tracking-wider transition-colors">Cars</a>
            <a href="#reasons" className="text-gray-500 hover:text-black text-xs font-semibold uppercase tracking-wider transition-colors hidden md:block">Why Us</a>
            <a href="https://wa.me/60126565477" target="_blank"
              className="bg-[#FF4500] text-white text-xs font-bold px-5 py-2.5 rounded-lg hover:brightness-110 active:scale-[0.97] transition-all"
            >Book Now</a>
          </div>
        </div>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,69,0,0.08),transparent_70%)] pointer-events-none" />
        <div className="text-center px-5 max-w-3xl mx-auto pt-24 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
            className="text-[#FF4500] text-xs font-bold tracking-[0.25em] uppercase mb-4"
          >
            JRV Car Rental · Since 2020
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.88] mb-4"
          >
            Rent The<br />
            <span className="text-[#FF4500]">Ride.</span><br />
            Own The<br />
            <span className="text-[#FF4500]">Road.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.4 }}
            className="text-white/40 text-sm md:text-base max-w-md mx-auto mb-8"
          >
            Premium cars · Honest prices · Free delivery Seremban
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-3"
          >
            <a href="https://wa.me/60126565477" target="_blank"
              className="bg-[#FF4500] text-white font-bold px-8 py-3.5 rounded-xl text-sm hover:brightness-110 active:scale-[0.97] transition-all"
            >Book on WhatsApp</a>
            <a href="#cars"
              className="border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl text-sm hover:bg-white/5 active:scale-[0.97] transition-all"
            >View Fleet</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex gap-8 justify-center mt-10"
          >
            {[{ v: "50+", l: "Cars" }, { v: "1K+", l: "Clients" }, { v: "4.9★", l: "Rating" }].map((x) => (
              <div key={x.l} className="text-center">
                <p className="text-2xl font-black text-white">{x.v}</p>
                <p className="text-[9px] text-white/40 font-semibold uppercase tracking-wider mt-0.5">{x.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <div className="py-4 bg-white border-b border-gray-200 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee" style={{ animation: "m 30s linear infinite" }}>
          {Array.from({ length: 8 }).flatMap(() => [
            "SEWA LAMA LAGI MURAH", "FREE DELIVERY", "ZERO DEPOSIT", "UNLIMITED MILEAGE", "24/7 SERVICE", "KLIA PICKUP"
          ]).map((t, i) => (
            <span key={i} className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mx-4">
              {t} <span className="text-[#FF4500]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── FLEET ─── */}
      <section id="cars" className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-[#FF4500] text-[10px] font-bold tracking-[0.25em] uppercase mb-3">The Fleet</p>
              <h2 className="text-3xl md:text-5xl font-black text-[#0a0a0a] leading-[0.95]">Choose Your Ride</h2>
              <p className="text-gray-400 text-sm mt-2">50+ cars · 12 models · From RM 110/day</p>
            </div>
          </FadeIn>

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
          >
            {CARS.map((car) => (
              <motion.div key={car.n} variants={item}>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:shadow-xl hover:-translate-y-1 hover:border-[#FF4500]/30 transition-all duration-300">
                  <div className="h-24 md:h-28 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border-b border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-[#FF4500]/30 group-hover:shadow-md transition-all duration-300">
                      <svg className="w-6 h-6 text-gray-300 group-hover:text-[#FF4500]/50 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M19 17h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.5l-1.5-2H8L6.5 7H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
                      </svg>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-[#0a0a0a] text-sm">{car.n}</h3>
                      <span className="text-[9px] text-gray-400 font-medium">{car.t}</span>
                    </div>
                    <p className="text-gray-400 text-[10px] mt-0.5">{car.s}</p>
                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100">
                      <span className="text-[#FF4500] font-black text-base">{car.p}<span className="text-gray-300 text-[9px] font-medium">/day</span></span>
                      <a href="https://wa.me/60126565477" target="_blank"
                        className="text-gray-400 group-hover:text-[#FF4500] text-[10px] font-bold uppercase tracking-wider transition-colors"
                      >Book</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── EIGHT REASONS ─── */}
      <section id="reasons" className="py-20 md:py-28 bg-[#FFF8F0]">
        <div className="max-w-5xl mx-auto px-5">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-[#FF4500] text-[10px] font-bold tracking-[0.25em] uppercase mb-3">Built Different</p>
              <h2 className="text-3xl md:text-5xl font-black text-[#0a0a0a] leading-[0.95]">Eight Reasons We're Built Different</h2>
              <p className="text-gray-400 text-sm mt-2 max-w-xl mx-auto">Local team in Seremban. Tight fleet. Honest pricing. 24/7 service.</p>
            </div>
          </FadeIn>

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {REASONS.map((r) => (
              <motion.div key={r.t} variants={item}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#FF4500]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <h3 className="font-bold text-[#0a0a0a] text-sm">{r.t}</h3>
                <p className="text-gray-500 text-[11px] mt-1.5 leading-relaxed">{r.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-[#FF4500] text-[10px] font-bold tracking-[0.25em] uppercase mb-3">Testimonials</p>
              <h2 className="text-3xl md:text-5xl font-black text-[#0a0a0a] leading-[0.95]">What Our Clients Say</h2>
            </div>
          </FadeIn>

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              { q: '"Professional service, spotless car. Will definitely rent again."', a: "— Ahmad R.", s: "★★★★★" },
              { q: '"Smooth booking and free delivery saved my time. Highly recommended!"', a: "— Sarah L.", s: "★★★★★" },
              { q: '"Best car rental in Seremban. Zero deposit, unlimited mileage."', a: "— Mike C.", s: "★★★★★" },
            ].map((r, i) => (
              <motion.div key={i} variants={item}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <p className="text-[#FFD700] text-sm mb-3">{r.s}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{r.q}</p>
                <p className="text-gray-400 text-xs">{r.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 md:py-28 bg-[#FFF8F0]">
        <div className="max-w-3xl mx-auto px-5">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-[#FF4500] text-[10px] font-bold tracking-[0.25em] uppercase mb-3">Questions?</p>
              <h2 className="text-3xl md:text-5xl font-black text-[#0a0a0a] leading-[0.95]">FAQ</h2>
            </div>
          </FadeIn>

          <div className="space-y-2">
            {[
              { q: "What documents do I need?", a: "Valid driver's license, IC/passport, and recent utility bill for address verification." },
              { q: "How much deposit do I pay?", a: "Zero deposit for most bookings. Rare in the industry — we trust our customers." },
              { q: "Is there a mileage limit?", a: "No. All rentals come with unlimited mileage at no extra charge." },
              { q: "What if the car breaks down?", a: "24/7 roadside assistance. Replacement vehicle guaranteed if needed." },
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
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#FF4500] py-16">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95] mb-3">Ready To Hit The Road?</h2>
            <p className="text-white/70 text-sm max-w-md mx-auto mb-8">Reply in minutes. Zero paperwork. Be on the road within the hour.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href="https://wa.me/60126565477" target="_blank"
                className="bg-black text-white font-bold px-8 py-3.5 rounded-xl text-sm hover:brightness-110 active:scale-[0.97] transition-all"
              >Book via WhatsApp</a>
              <a href="tel:+60126565477"
                className="border-2 border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl text-sm hover:bg-white/10 active:scale-[0.97] transition-all"
              >Call +60 12-656 5477</a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#0a0a0a] text-white/40 py-10 text-center">
        <div className="max-w-5xl mx-auto px-5">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#FF4500] flex items-center justify-center font-black text-white text-xs rounded-lg">JRV</div>
            <span className="text-white font-bold text-sm">JRV Car Rental</span>
          </div>
          <p className="text-white/30 text-xs mb-1">51, Jln S2 B18, Seremban 2 · 24 hours · 7 days</p>
          <div className="flex justify-center gap-5 my-4">
            {[
              { l: "WhatsApp", h: "https://wa.me/60126565477" },
              { l: "Call", h: "tel:+60126565477" },
              { l: "Website", h: "https://jrvservices.co" },
            ].map((s) => (
              <a key={s.l} href={s.h} className="text-white/40 hover:text-[#FF4500] text-xs transition-colors">{s.l}</a>
            ))}
          </div>
          <p className="text-white/40 text-[11px]">
            © 2026 JRV Rental Services. Powered by{" "}
            <a href="https://jrvsystems.app" className="text-[#FF4500] hover:underline">JRV Systems</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
