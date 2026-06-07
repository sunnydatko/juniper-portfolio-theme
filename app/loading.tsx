export default function Loading() {
  return (
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
      }}
    >
      <div className="jl-ripple-wrap" aria-hidden="true">
        <div className="jl-ring jl-ring-1" />
        <div className="jl-ring jl-ring-2" />
        <div className="jl-ring jl-ring-3" />
        <div className="jl-ring jl-ring-4" />
        <div className="jl-ring jl-ring-5" />
        <div className="jl-core" />
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
      <style>{`
        .jl-ripple-wrap {
          position: relative;
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Expanding rings */
        .jl-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(79, 107, 89, 0.55);
          animation: jlRipple 3.6s cubic-bezier(0.2, 0.6, 0.4, 1) infinite;
          transform: scale(0);
          opacity: 0;
        }
        .jl-ring-1 { width: 200px; height: 200px; animation-delay: 0s;    border-color: rgba(79, 107, 89, 0.45); }
        .jl-ring-2 { width: 200px; height: 200px; animation-delay: 0.72s; border-color: rgba(126, 156, 135, 0.38); }
        .jl-ring-3 { width: 200px; height: 200px; animation-delay: 1.44s; border-color: rgba(198, 169, 106, 0.32); }
        .jl-ring-4 { width: 200px; height: 200px; animation-delay: 2.16s; border-color: rgba(79, 107, 89, 0.28); }
        .jl-ring-5 { width: 200px; height: 200px; animation-delay: 2.88s; border-color: rgba(126, 156, 135, 0.22); }

        @keyframes jlRipple {
          0%   { transform: scale(0.08); opacity: 0.9; }
          70%  { opacity: 0.4; }
          100% { transform: scale(1);    opacity: 0;   }
        }

        /* Soft glowing core */
        .jl-core {
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
          animation: jlCorePulse 1.8s ease-in-out infinite;
          z-index: 1;
        }

        @keyframes jlCorePulse {
          0%, 100% { transform: scale(0.85); opacity: 0.7; }
          50%       { transform: scale(1.2);  opacity: 1.0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .jl-ring  { animation: none; opacity: 0.3; transform: scale(0.5); }
          .jl-core  { animation: none; }
        }
      `}</style>
    </div>
  );
}
