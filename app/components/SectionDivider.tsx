import Box from "@mui/material/Box";

export default function SectionDivider() {
  return (
    <Box
      aria-hidden
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        my: 2,
      }}
    >
      <Box sx={{ flex: 1, height: "1px", bgcolor: "rgba(198,169,106,0.3)" }} />

      {/* Mini brand mark star */}
      <Box
        component="svg"
        viewBox="0 0 32 32"
        fill="none"
        sx={{ width: 18, height: 18, flexShrink: 0, opacity: 0.75 }}
      >
        <line x1="16" y1="16" x2="16"    y2="5.5"   stroke="#7E9C87" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="16" x2="25.09" y2="10.75"  stroke="#7E9C87" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="16" x2="25.09" y2="21.25"  stroke="#7E9C87" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="16" x2="16"    y2="26.5"   stroke="#7E9C87" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="16" x2="6.91"  y2="21.25"  stroke="#7E9C87" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="16" x2="6.91"  y2="10.75"  stroke="#7E9C87" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16"    cy="5.5"   r="2" fill="#C6A96A"/>
        <circle cx="25.09" cy="10.75" r="2" fill="#C6A96A"/>
        <circle cx="25.09" cy="21.25" r="2" fill="#C6A96A"/>
        <circle cx="16"    cy="26.5"  r="2" fill="#C6A96A"/>
        <circle cx="6.91"  cy="21.25" r="2" fill="#C6A96A"/>
        <circle cx="6.91"  cy="10.75" r="2" fill="#C6A96A"/>
        <circle cx="16" cy="16" r="3" fill="#4F6B59"/>
        <circle cx="16" cy="16" r="1.2" fill="#7E9C87" opacity="0.6"/>
      </Box>

      <Box sx={{ flex: 1, height: "1px", bgcolor: "rgba(198,169,106,0.3)" }} />
    </Box>
  );
}
