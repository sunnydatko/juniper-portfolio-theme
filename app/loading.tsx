import Image from "next/image";
import loadingImg from "./images/loading.png";

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
        background: "#020817",
        zIndex: 9999,
      }}
    >
      <Image
        src={loadingImg}
        alt=""
        aria-hidden="true"
        width={260}
        height={260}
        priority
        style={{ animation: "orionSpin 2s linear infinite" }}
      />
      {/* visually hidden but announced by screen readers */}
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
        @keyframes orionSpin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          img[aria-hidden="true"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
