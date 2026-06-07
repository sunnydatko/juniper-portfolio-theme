"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Decorative sprig SVG --------------------------------------------------- */
const BotanicalSprig = ({
  style,
  className,
}: {
  style?: CSSProperties;
  className?: string;
}) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 60 220"
    fill="none"
    stroke="rgba(79,107,89,0.5)"
    strokeWidth={1.1}
    strokeLinecap="round"
    aria-hidden
  >
    <path d="M30 220 C 30 150, 30 110, 30 40" />
    <path d="M30 168 C 14 158, 8 168, 6 180" />
    <path d="M30 150 C 46 140, 52 150, 54 162" />
    <path d="M30 128 C 16 120, 10 128, 8 140" />
    {[40, 52, 64, 76, 88, 100].map((y, i) => (
      <g key={y} transform={`translate(0 ${y})`}>
        <circle cx={30} cy={0} r={i < 2 ? 2.6 : 2.2} fill="rgba(79,107,89,0.3)" />
        <line x1={30} y1={-3} x2={24} y2={-7} />
        <line x1={30} y1={-3} x2={36} y2={-7} />
      </g>
    ))}
  </svg>
);

/* Gradient auras + parallax scroll --------------------------------------- */
const GradientAura = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(0, ${window.scrollY * 0.06}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="ambient-layer" aria-hidden>
      <div ref={ref} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
        <div className="ambient-aura plum" />
        <div className="ambient-aura olive" />
        <div className="ambient-aura plum-deep" />
        <BotanicalSprig
          className="sway"
          style={{ position: "absolute", bottom: -10, left: "3vw", width: 90, height: 240, opacity: 0.12 }}
        />
        <BotanicalSprig
          className="sway sway-slow"
          style={{
            position: "absolute",
            bottom: -10,
            right: "4vw",
            width: 80,
            height: 220,
            opacity: 0.1,
            transform: "scaleX(-1)",
          }}
        />
      </div>
    </div>
  );
};

/* Firefly field (canvas) -------------------------------------------------- */
type Firefly = {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  phase: number;   // pulse phase offset
  speed: number;   // pulse speed
  wander: number;  // direction-change timer
  angle: number;   // current drift angle
};

const FireflyField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (prefersReducedMotion()) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0, height = 0;
    let flies: Firefly[] = [];
    let raf = 0;
    let t = 0;

    const count = () => {
      const base = Math.round((window.innerWidth * window.innerHeight) / 28000);
      return Math.max(18, Math.min(45, base));
    };

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      flies = Array.from({ length: count() }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        r: Math.random() * 1.4 + 0.8,
        phase: Math.random() * Math.PI * 2,
        speed: 0.18 + Math.random() * 0.25,
        wander: Math.random() * 200,
        angle: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      t += 1;

      for (const f of flies) {
        // organic drift — periodically nudge direction
        f.wander -= 1;
        if (f.wander <= 0) {
          f.angle += (Math.random() - 0.5) * 0.7;
          f.wander = 150 + Math.random() * 250;
        }
        const driftSpeed = 0.10 + Math.random() * 0.03;
        f.x += Math.cos(f.angle) * driftSpeed;
        f.y += Math.sin(f.angle) * driftSpeed * 0.6;

        // soft wrap
        if (f.x < -30) f.x = width + 30;
        if (f.x > width + 30) f.x = -30;
        if (f.y < -30) f.y = height + 30;
        if (f.y > height + 30) f.y = -30;

        // pulse opacity: gentle sine, individual phase + speed
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.008 * f.speed + f.phase);
        const alpha = 0.15 + pulse * 0.7;

        // glow: outer halo then bright core
        const glow = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 5);
        glow.addColorStop(0, `rgba(228, 211, 164, ${alpha})`);
        glow.addColorStop(0.4, `rgba(198, 169, 106, ${alpha * 0.55})`);
        glow.addColorStop(1, "rgba(198, 169, 106, 0)");

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // bright core
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 248, 220, ${alpha * 0.9})`;
        ctx.fill();
      }
    };

    const loop = () => { draw(); raf = requestAnimationFrame(loop); };
    init();
    loop();

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(init, 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-particles" aria-hidden />;
};

/* Cursor glow ------------------------------------------------------------ */
const CursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      el.style.opacity = "1";
    };
    const loop = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <div ref={ref} className="ambient-cursor-glow" style={{ opacity: 0 }} aria-hidden />;
};

/* Reveal-on-scroll ------------------------------------------------------- */
const ScrollReveal = () => {
  useEffect(() => {
    const reduced = prefersReducedMotion() || !("IntersectionObserver" in window);
    const seen = new WeakSet<Element>();

    const io = reduced
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                io?.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 }
        );

    const scan = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (io) io.observe(el);
        else el.classList.add("is-visible");
      });
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io?.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
};

/* Root ------------------------------------------------------------------- */
export default function Ambient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <GradientAura />
      <FireflyField />
      <CursorGlow />
      <div className="ambient-noise" aria-hidden />
      <ScrollReveal />
    </>
  );
}
