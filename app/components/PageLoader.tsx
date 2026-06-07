"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 600);
    const removeTimer = setTimeout(() => setVisible(false), 1100);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        role="status"
        aria-label="Loading"
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d1a12",
          zIndex: 9999,
          opacity: fading ? 0 : 1,
          transition: "opacity 0.5s ease",
          pointerEvents: fading ? "none" : "auto",
        }}
      >
        <div className="jlp-ripple-wrap" aria-hidden="true">
          <div className="jlp-ring jlp-ring-1" />
          <div className="jlp-ring jlp-ring-2" />
          <div className="jlp-ring jlp-ring-3" />
          <div className="jlp-ring jlp-ring-4" />
          <div className="jlp-ring jlp-ring-5" />
          <div className="jlp-core" />
        </div>
        <span
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          Loading
        </span>
      </div>
      <style>{`
        .jlp-ripple-wrap {
          position: relative;
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .jlp-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(79, 107, 89, 0.55);
          animation: jlpRipple 3.6s cubic-bezier(0.2, 0.6, 0.4, 1) infinite;
          transform: scale(0);
          opacity: 0;
        }
        .jlp-ring-1 { width: 200px; height: 200px; animation-delay: 0s;    border-color: rgba(79, 107, 89, 0.45); }
        .jlp-ring-2 { width: 200px; height: 200px; animation-delay: 0.72s; border-color: rgba(126, 156, 135, 0.38); }
        .jlp-ring-3 { width: 200px; height: 200px; animation-delay: 1.44s; border-color: rgba(198, 169, 106, 0.32); }
        .jlp-ring-4 { width: 200px; height: 200px; animation-delay: 2.16s; border-color: rgba(79, 107, 89, 0.28); }
        .jlp-ring-5 { width: 200px; height: 200px; animation-delay: 2.88s; border-color: rgba(126, 156, 135, 0.22); }
        @keyframes jlpRipple {
          0%   { transform: scale(0.08); opacity: 0.9; }
          70%  { opacity: 0.4; }
          100% { transform: scale(1);    opacity: 0;   }
        }
        .jlp-core {
          position: relative;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: radial-gradient(
            circle at center,
            rgba(255, 248, 220, 0.95) 10%,
            rgba(228, 211, 164, 0.7)  45%,
            rgba(198, 169, 106, 0)    100%
          );
          animation: jlpCorePulse 1.8s ease-in-out infinite;
          z-index: 1;
        }
        @keyframes jlpCorePulse {
          0%, 100% { transform: scale(0.85); opacity: 0.7; }
          50%       { transform: scale(1.2);  opacity: 1.0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .jlp-ring { animation: none; opacity: 0.3; transform: scale(0.5); }
          .jlp-core { animation: none; }
        }
      `}</style>
    </>
  );
}
