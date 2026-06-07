"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type BrandMarkProps = {
  starSize?: number;
  fontSize?: number;
};

export default function BrandMark({ starSize = 22, fontSize = 16 }: BrandMarkProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        component="svg"
        aria-hidden
        viewBox="0 0 32 32"
        fill="none"
        sx={{ width: starSize, height: starSize, flexShrink: 0 }}
      >
        {/* Six branches radiating from center */}
        <line x1="16" y1="16" x2="16"    y2="5.5"   stroke="#7E9C87" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="16" x2="25.09" y2="10.75"  stroke="#7E9C87" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="16" x2="25.09" y2="21.25"  stroke="#7E9C87" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="16" x2="16"    y2="26.5"   stroke="#7E9C87" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="16" x2="6.91"  y2="21.25"  stroke="#7E9C87" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="16" x2="6.91"  y2="10.75"  stroke="#7E9C87" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Berries at each tip */}
        <circle cx="16"    cy="5.5"   r="2.2" fill="#C6A96A"/>
        <circle cx="25.09" cy="10.75" r="2.2" fill="#C6A96A"/>
        <circle cx="25.09" cy="21.25" r="2.2" fill="#C6A96A"/>
        <circle cx="16"    cy="26.5"  r="2.2" fill="#C6A96A"/>
        <circle cx="6.91"  cy="21.25" r="2.2" fill="#C6A96A"/>
        <circle cx="6.91"  cy="10.75" r="2.2" fill="#C6A96A"/>
        {/* Center hub */}
        <circle cx="16" cy="16" r="3.5" fill="#4F6B59"/>
        <circle cx="16" cy="16" r="1.5" fill="#7E9C87" opacity="0.6"/>
      </Box>
      <Typography
        component="span"
        sx={{
          fontFamily: "var(--font-fraunces), serif",
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
