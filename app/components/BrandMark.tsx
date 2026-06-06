"use client";

import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import faviconImg from "../favicon.png";

type BrandMarkProps = {
  starSize?: number;
  fontSize?: number;
};

export default function BrandMark({ starSize = 22, fontSize = 16 }: BrandMarkProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Image
        src={faviconImg}
        width={starSize}
        height={starSize}
        alt=""
        aria-hidden
        style={{ flexShrink: 0 }}
      />
      <Typography
        component="span"
        sx={{
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 700,
          fontSize,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "common.white",
          lineHeight: 1,
        }}
      >
        Alex Parker
      </Typography>
    </Box>
  );
}
