"use client";

import { ArrowDown, ArrowUpRight, Instagram, MapPin, Menu, X } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useCallback, useState } from "react";
import { CustomCursor, IntroOverlay, MagneticLink, ParallaxImage, Reveal } from "./MotionPrimitives";
import { MenuSection } from "./MenuSection";
import { ReservationForm } from "./ReservationForm";

const navItems = [
  ["Story", "#story"],
  ["Menu", "#menu"],
  ["Gallery", "#gallery"],
  ["Visit", "#visit"],
] as const;

const basePath = process.env.NODE_ENV === "production" ? "/afterhours-cafe" : "";

export function CafeSite() {
  const [introDone, setIntroDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], reduceMotion ? [0, 0] : [0, 110]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.18]);
  const completeIntro = useCallback(() => setIntroDone(true), []);

  return (
    <main>
      <a className="skip-link" href="#content">Skip to content</a>
      <IntroOverlay onDone={completeIntro} />
      <CustomCursor />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Afterhours home"><span>AFTER</span>HOURS<sup>®</sup></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <MagneticLink href="#reserve" className="header-cta">Book a table <ArrowUpRight aria-hidden="true" /></MagneticLink>
        <button className="nav-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? "Close menu" : "Open menu"}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        {menuOpen && (
          <motion.nav id="mobile-nav" className="mobile-nav" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} aria-label="Mobile navigation">
            {navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a href="#reserve" onClick={() => setMenuOpen(false)}>Reserve</a>
          </motion.nav>
        )}
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <motion.div className="hero-media" style={{ y: heroY, opacity: heroOpacity }}>
          <ParallaxImage src={`${basePath}/images/afterhours-hero.webp`} alt="Espresso on a dark wooden counter in a warmly lit café" priority />
        </motion.div>
        <div className="hero-vignette" />
        <div className="hero-meta"><span>53.3498° N / 6.2603° W</span><span>DUBLIN · IRELAND</span></div>
        <div className="hero-copy">
          <p className="eyebrow">COFFEE & KITCHEN · OPEN LATE</p>
          <h1 id="hero-title" aria-label="Good coffee. Late nights.">
            {["GOOD COFFEE.", "LATE NIGHTS."].map((line, lineIndex) => (
              <span className={lineIndex === 1 ? "outline" : ""} key={line}>
                {line.split(" ").map((word, index) => (
                  <motion.i
                    key={word}
                    initial={{ y: "115%" }}
                    animate={introDone ? { y: 0 } : { y: "115%" }}
                    transition={{ delay: lineIndex * 0.12 + index * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >{word}&nbsp;</motion.i>
                ))}
              </span>
            ))}
          </h1>
          <div className="hero-bottom">
            <p>Daylight coffee.<br />After-dark plates.</p>
            <a href="#story" className="scroll-cue"><ArrowDown aria-hidden="true" /><span>SCROLL TO STAY AWHILE</span></a>
          </div>
        </div>
      </section>

      <div id="content">
        <section className="marquee" aria-hidden="true"><div>COFFEE / KITCHEN / NIGHT SHIFT / DUBLIN /&nbsp;</div><div>COFFEE / KITCHEN / NIGHT SHIFT / DUBLIN /&nbsp;</div></section>

        <section className="about section-pad" id="story" aria-labelledby="story-heading">
          <div className="section-kicker"><span>01</span> OUR FREQUENCY</div>
          <Reveal className="about-lead">
            <p>NOT YOUR MORNING ROUTINE.</p>
            <h2 id="story-heading">BUILT FOR THE HOURS <em>BETWEEN</em> ONE THING AND THE NEXT.</h2>
          </Reveal>
          <div className="about-grid">
            <Reveal className="about-image"><ParallaxImage src={`${basePath}/images/afterhours-pour.webp`} alt="Milk being poured into espresso in a handmade ceramic cup" /></Reveal>
            <Reveal className="about-copy" delay={0.12}>
              <span>( ABOUT AFTERHOURS )</span>
              <p>AFTERHOURS is a fictional Dublin café concept for early risers, night thinkers and everyone in the middle. We pull careful coffee all day, then turn the lights low and the kitchen up.</p>
              <p>No rush. No ritual theatre. Just a room with good acoustics, warm plates, and somewhere to land.</p>
              <MagneticLink href="#menu">See what’s on <ArrowUpRight aria-hidden="true" /></MagneticLink>
            </Reveal>
          </div>
        </section>

        <MenuSection />

        <section className="gallery section-pad" id="gallery" aria-labelledby="gallery-heading">
          <div className="section-kicker section-kicker--light"><span>03</span> THE MOOD</div>
          <div className="gallery-title"><Reveal><h2 id="gallery-heading">DARK ROOM.<br />WARM <em>LIGHT.</em></h2></Reveal><p>NOON → MIDNIGHT</p></div>
          <div className="gallery-grid">
            <ParallaxImage className="gallery-a" src={`${basePath}/images/afterhours-toast.webp`} alt="Ricotta toast with roast tomatoes on a cream ceramic plate" />
            <div className="gallery-caption"><span>01 / LATE PLATES</span><p>Food that makes sense at 11am and 11pm.</p></div>
            <ParallaxImage className="gallery-b" src={`${basePath}/images/afterhours-hero.webp`} alt="Café counter glowing with warm light after dark" />
            <ParallaxImage className="gallery-c" src={`${basePath}/images/afterhours-pour.webp`} alt="Barista pouring a latte in low light" />
            <div className="gallery-stamp">OPEN<br /><strong>LATE</strong><br />DUBLIN 08</div>
          </div>
        </section>

        <section className="visit section-pad" id="visit" aria-labelledby="visit-heading">
          <div className="section-kicker"><span>04</span> FIND YOUR WAY</div>
          <div className="visit-layout">
            <Reveal className="visit-title"><h2 id="visit-heading">COME BY.<br /><em>STAY LATE.</em></h2><MapPin aria-hidden="true" /></Reveal>
            <div className="hours">
              <div><span>MON–THU</span><strong>07:30 — 22:00</strong></div>
              <div><span>FRI</span><strong>07:30 — 00:00</strong></div>
              <div><span>SAT</span><strong>08:00 — 00:00</strong></div>
              <div><span>SUN</span><strong>08:00 — 20:00</strong></div>
            </div>
            <div className="address">
              <span>FICTIONAL LOCATION</span>
              <p>18 Mercer Lane<br />Dublin 2, D02 XXXX<br />Ireland</p>
              <a href="https://maps.google.com/?q=Dublin+2" target="_blank" rel="noreferrer">Open Dublin map <ArrowUpRight aria-hidden="true" /></a>
              <small>Demo address — not a real venue</small>
            </div>
          </div>
        </section>

        <section className="reserve section-pad" id="reserve" aria-labelledby="reserve-heading">
          <div className="reserve-copy">
            <div className="section-kicker section-kicker--light"><span>05</span> SAVE A SEAT</div>
            <Reveal><h2 id="reserve-heading">YOUR TABLE<br />AFTER <em>DARK.</em></h2></Reveal>
            <p>For parties of six or fewer. Walk-ins are always welcome in this fictional café.</p>
          </div>
          <ReservationForm />
        </section>
      </div>

      <footer className="footer">
        <div className="footer-top"><a className="brand" href="#top"><span>AFTER</span>HOURS<sup>®</sup></a><p>COFFEE & KITCHEN<br />DUBLIN — FICTIONAL CONCEPT</p></div>
        <div className="footer-word">AFTER<span>HOURS</span></div>
        <div className="footer-bottom">
          <span>© 2026 AFTERHOURS · DEMO SITE</span>
          <a href="mailto:hello@example.com">hello@example.com <small>(placeholder)</small></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram aria-hidden="true" /> Instagram</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
