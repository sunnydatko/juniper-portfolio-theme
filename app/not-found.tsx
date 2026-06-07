"use client";

import { keyframes } from "@emotion/react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Image from "next/image";
import { useMemo } from "react";
import ResponsiveMenu from "./components/ResponsiveMenu";
import Footer from "./components/Footer";
import notFoundBg from "./images/not-found-bg.png";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const glitch = keyframes`
  0%, 91%, 100% {
    text-shadow: none;
    transform: none;
  }
  92% {
    text-shadow: -3px 0 rgba(162,185,145,0.8), 3px 0 rgba(198,169,106,0.6);
    transform: translate(-2px, 0) skewX(-2deg);
  }
  93% {
    text-shadow: 3px 0 rgba(162,185,145,0.7), -3px 0 rgba(198,169,106,0.5);
    transform: translate(2px, 0);
  }
  94% {
    text-shadow: none;
    transform: none;
  }
  95% {
    text-shadow: -4px 0 rgba(198,169,106,0.5), 4px 0 rgba(162,185,145,0.7);
    transform: translate(3px, 1px) skewX(1.5deg);
  }
  96% {
    text-shadow: none;
    transform: translate(-1px, 0);
  }
  97% {
    text-shadow: none;
    transform: none;
  }
`;

const anim = (delay: string) => ({
  animation: `${fadeUp} 1.1s ease-out ${delay} forwards`,
  opacity: 0,
  "@media (prefers-reduced-motion: reduce)": { animation: "none", opacity: 1 },
});

function seededRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const FIREFLY_COUNT = 20;

function Fireflies() {
  const items = useMemo(() => {
    const rng = seededRng(7312);
    return Array.from({ length: FIREFLY_COUNT }, (_, i) => {
      const dx1 = (rng() - 0.5) * 90;
      const dy1 = (rng() - 0.5) * 90;
      const dx2 = (rng() - 0.5) * 140;
      const dy2 = (rng() - 0.5) * 140;
      const peakOpacity = 0.6 + rng() * 0.35;
      const midOpacity = 0.4 + rng() * 0.4;
      const floatAnim = keyframes`
        0%   { transform: translate(${dx1}px, ${dy1}px) scale(1);   opacity: 0; }
        12%  { opacity: ${peakOpacity}; }
        48%  { transform: translate(${dx2}px, ${dy2}px) scale(1.4); opacity: ${midOpacity}; }
        88%  { opacity: ${peakOpacity}; }
        100% { transform: translate(${dx1}px, ${dy1}px) scale(1);   opacity: 0; }
      `;
      const isGold = rng() > 0.45;
      const alpha = 0.75 + rng() * 0.2;
      const color = isGold
        ? `rgba(220,185,95,${alpha})`
        : `rgba(155,205,140,${alpha})`;
      const size = 1.8 + rng() * 2.4;
      return {
        id: i,
        top: rng() * 96,
        left: rng() * 96,
        duration: 7 + rng() * 11,
        delay: rng() * 10,
        size,
        color,
        floatAnim,
      };
    });
  }, []);

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {items.map((f) => (
        <Box
          key={f.id}
          sx={{
            position: "absolute",
            top: `${f.top}%`,
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            borderRadius: "50%",
            backgroundColor: f.color,
            boxShadow: `0 0 ${f.size * 4}px ${f.size * 3}px ${f.color}`,
            animation: `${f.floatAnim} ${f.duration}s ease-in-out ${f.delay}s infinite`,
            "@media (prefers-reduced-motion: reduce)": { display: "none" },
          }}
        />
      ))}
    </Box>
  );
}

function PineIcon() {
  return (
    <svg width="30" height="38" viewBox="0 0 30 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M15 1L1 20h7l-5 12h24l-5-12h7L15 1z" fill="rgba(162,185,145,0.65)" />
      <rect x="12" y="32" width="6" height="5" rx="1" fill="rgba(162,185,145,0.55)" />
    </svg>
  );
}

function GoldDivider() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5 }}>
      <Box sx={{ width: 56, height: "1px", bgcolor: "rgba(198,169,106,0.45)" }} />
      <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "rgba(198,169,106,0.65)" }} />
      <Box sx={{ width: 56, height: "1px", bgcolor: "rgba(198,169,106,0.45)" }} />
    </Box>
  );
}

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <Image
        src={notFoundBg}
        alt=""
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center top" }}
      />

      {/* Vignette + depth overlay */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background: [
            "radial-gradient(ellipse 75% 75% at 50% 45%, rgba(4,10,6,0.08) 0%, rgba(4,10,6,0.62) 100%)",
            "linear-gradient(to bottom, rgba(4,10,6,0.38) 0%, transparent 25%, transparent 65%, rgba(4,10,6,0.55) 100%)",
          ].join(", "),
          zIndex: 1,
        }}
      />

      {/* Fireflies */}
      <Fireflies />

      {/* Nav — fixed positioned; Toolbar below it acts as a spacer */}
      <ResponsiveMenu />
      <Toolbar sx={{ flexShrink: 0, position: "relative", zIndex: 2 }} />

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: "center", py: { xs: 8, md: 10 } }}>

          {/* Pine tree icon */}
          <Box sx={{ ...anim("0.15s"), mb: 0.5 }}>
            <PineIcon />
          </Box>

          {/* 404 with glitch */}
          <Box sx={anim("0.3s")}>
            <Typography
              component="div"
              sx={{
                fontFamily: "var(--font-fraunces), serif",
                fontWeight: 400,
                fontSize: { xs: "110px", md: "190px" },
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "rgba(162,185,145,0.65)",
                userSelect: "none",
                animation: `${glitch} 9s steps(1) 1.5s infinite`,
                "@media (prefers-reduced-motion: reduce)": { animation: "none" },
              }}
            >
              404
            </Typography>
          </Box>

          {/* Subtitle */}
          <Box sx={{ ...anim("0.5s"), mt: { xs: 1, md: 1.5 } }}>
            <Typography
              sx={{
                fontFamily: "var(--font-fraunces), serif",
                fontWeight: 400,
                fontSize: { xs: "17px", md: "21px" },
                color: "rgba(180,200,165,0.72)",
                letterSpacing: "0.01em",
                lineHeight: 1.5,
              }}
            >
              Looks like you&apos;ve wandered off the trail.
            </Typography>
          </Box>

          {/* Divider */}
          <Box sx={{ ...anim("0.65s"), my: { xs: 3, md: 3.5 } }}>
            <GoldDivider />
          </Box>

          {/* CTA */}
          <Box sx={anim("0.8s")}>
            <Link
              href="/"
              sx={{
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 600,
                fontSize: { xs: "11px", md: "12px" },
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(198,169,106,0.88)",
                textDecoration: "none",
                paddingBottom: 0,
                "&::before": { display: "none" },
                "&:hover": { color: "#E4D3A4" },
              }}
            >
              Back to Home
            </Link>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ position: "relative", zIndex: 2, backgroundColor: "rgba(4,9,5,0.45)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}>
        <Footer />
      </Box>
    </Box>
  );
}
