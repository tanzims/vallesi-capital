import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import fourplex from "./assets/fourplex.png";
import { ContactModal } from "./ContactModal";

const HERO_IMAGE = fourplex;

const philosophy = [
  {
    n: "01",
    title: "Rooted in the Valley",
    body: "Vallesi draws its name from “people of the valley,” reflecting our Silicon Valley roots and relationship-driven approach to investing.",
  },
  {
    n: "02",
    title: "Deep Networks",
    body: "We engage with the Santa Clara University ecosystem and maintain relationships with experienced real estate investors, operators, and developers across single-family and multifamily assets.",
  },
  {
    n: "03",
    title: "Disciplined Diligence",
    body: "Every opportunity undergoes rigorous underwriting and collaborative review to ensure alignment, risk awareness, and a clear investment thesis.",
  },
  {
    n: "04",
    title: "Focused Execution",
    body: "We target multifamily investments that deliver stable cash flow and long‑term value creation, with a focus on assets that benefit from strong fundamentals and tax‑advantaged structures.",
  },
];

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center gap-4">
          <a href="#hero" className="wordmark text-[13px] sm:text-[15px] hover:opacity-60 transition-opacity whitespace-nowrap">
            VALLESI CAPITAL
          </a>
          <div className="flex gap-6 md:gap-10 items-center text-[15px]">
            <a href="#approach" className="hidden md:inline text-muted-foreground hover:text-foreground transition-colors">
              Approach
            </a>
            <a href="#about" className="hidden md:inline text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-foreground/80 text-foreground hover:bg-foreground hover:text-background transition-colors text-[13px] sm:text-[15px]"
            >
              <Mail className="w-3.5 h-3.5" />
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="pt-28 sm:pt-40 pb-20 sm:pb-28 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-8"
            >
              <h1 className="serif-display text-[52px] md:text-[72px] lg:text-[84px]">
                Building durable
                <br />
                value through
                <br />
                <em className="italic text-accent font-light">disciplined</em> real
                <br />
                estate investment.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="lg:col-span-4 lg:pb-6"
            >
              <p className="text-[20px] leading-[1.6] text-muted-foreground mb-8">
                We partner with investors to deploy capital into real estate opportunities that
                generate durable value over time.
              </p>
              <a
                href="#approach"
                className="inline-flex items-center gap-2 text-[14px] tracking-widest uppercase border-b border-foreground pb-1 hover:gap-3 transition-all"
              >
                Our Approach
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 sm:mt-20 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9] overflow-hidden border border-border"
          >
            <img
              src={HERO_IMAGE}
              alt="Multifamily property"
              className="w-full h-full object-cover grayscale-[10%]"
            />
          </motion.div>
        </div>
      </section>

      {/* Investment Philosophy */}
      <section id="approach" className="py-20 sm:py-32 px-5 sm:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="kicker mb-16"
          >
            Investment Philosophy
          </motion.p>

          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {philosophy.map((item, i) => (
              <motion.div
                key={item.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-background p-7 sm:p-10 hover:bg-card transition-colors"
              >
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="numeral text-4xl">{item.n}</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <h3 className="font-serif text-[28px] font-normal mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-[1.7] text-[17px]">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 sm:py-32 px-5 sm:px-8 border-t border-border bg-card/40">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="kicker">About</span>
            <span className="h-px flex-1 bg-border" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-7"
          >
            <p className="font-serif text-[24px] md:text-[30px] leading-[1.55] first-letter:font-serif first-letter:float-left first-letter:text-[72px] md:first-letter:text-[104px] first-letter:leading-[0.85] first-letter:pr-3 md:first-letter:pr-4 first-letter:pt-2 first-letter:text-accent">
              Vallesi Capital is built on a conviction that enduring value is created through
              discipline, partnership, and long-term ownership.
            </p>

            <p className="text-[17px] md:text-[22px] leading-[1.7] text-muted-foreground">
              We combine construction expertise, financial rigor, and institutional execution to
              identify and steward high-conviction real estate investments. From sourcing through
              asset management, we approach every opportunity with precision, transparency, and
              alignment.
            </p>

            <p className="text-[17px] md:text-[22px] leading-[1.7] text-muted-foreground">
              Inspired by the meaning &ldquo;people of the valley,&rdquo; Vallesi reflects both our
              Silicon Valley roots and our belief that durable outcomes are shaped over time
              through trusted partnerships and steady stewardship.
            </p>
          </motion.div>

          {/* Closing line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 pt-10 border-t border-border"
          >
            <p className="serif-display text-[28px] md:text-[44px] italic">
              We invest with conviction, manage with discipline, and build value that lasts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 sm:py-32 px-5 sm:px-8 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="kicker mb-6">Partner With Us</p>
            <h2 className="serif-display text-[44px] sm:text-5xl md:text-6xl mb-6 sm:mb-8">
              Built to <em className="italic text-accent">endure.</em>
            </h2>
            <p className="text-[17px] sm:text-[20px] leading-[1.65] text-muted-foreground mb-10 sm:mb-12">
              Interested in our investment approach or exploring partnership opportunities?
              We&rsquo;d like to hear from you.
            </p>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background hover:bg-accent transition-colors text-[14px] tracking-widest uppercase"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 sm:py-12 px-5 sm:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
          <div className="wordmark text-[15px]">VALLESI CAPITAL</div>
          <p className="text-sm text-muted-foreground">
            © 2026 Vallesi Capital. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
