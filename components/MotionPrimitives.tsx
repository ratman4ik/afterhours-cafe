"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

export function IntroOverlay({ onDone }: { onDone: () => void }) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const duration = reduceMotion ? 150 : 2300;
    const timer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      onDone();
    }, duration);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [onDone, reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: reduceMotion ? 0.1 : 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="intro__rule" />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
          >
            DUBLIN · 53.3498° N
          </motion.p>
          <div className="intro__word">
            {"AFTERHOURS".split("").map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.35 + index * 0.045, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <motion.p
            className="intro__status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25 }}
          >
            COFFEE / KITCHEN / AFTER DARK
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 500, damping: 35 });
  const smoothY = useSpring(y, { stiffness: 500, damping: 35 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement;
      setActive(Boolean(target.closest("a, button, input, textarea, select")));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="custom-cursor"
      style={{ x: smoothX, y: smoothY }}
      animate={{ scale: active ? 2.3 : 1, opacity: active ? 0.45 : 1 }}
      aria-hidden="true"
    />
  );
}

export function MagneticLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const move = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.22);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.22);
  };

  return (
    <motion.a
      href={href}
      className={`magnetic ${className}`}
      onMouseMove={move}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      {children}
    </motion.a>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 50, clipPath: "inset(0 0 8% 0)" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: reduceMotion ? 0.1 : 0.85, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxImage({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-7%", "7%"]);

  return (
    <motion.div
      ref={ref}
      className={`image-mask ${className}`}
      initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: reduceMotion ? 0.1 : 1.15, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div className="parallax-inner" style={{ y }}>
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 60vw" priority={priority} />
      </motion.div>
    </motion.div>
  );
}
