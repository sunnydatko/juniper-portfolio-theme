"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { SiReact, SiTypescript, SiJavascript } from "react-icons/si";
import { MdAccessibility } from "react-icons/md";
import { TbBrandReactNative } from "react-icons/tb";

const skills = [
  { label: "React", icon: <SiReact /> },
  { label: "React Native", icon: <TbBrandReactNative /> },
  { label: "TypeScript", icon: <SiTypescript /> },
  { label: "JavaScript", icon: <SiJavascript /> },
  { label: "Accessibility", icon: <MdAccessibility /> },
];

export default function About() {
  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: { xs: 10, md: 14 },
        position: "relative",
        zIndex: 1,
      }}
    >
      <Container
        sx={{
          textAlign: "center",
          maxWidth: "860px !important",
        }}
      >
        <Typography
          component="span"
          className="reveal"
          sx={{
            display: "block",
            color: "primary.light",
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 600,
            fontSize: { xs: 12.5, md: 14 },
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            mb: 2,
          }}
        >
          + About Me
        </Typography>

        <Typography className="reveal" style={{ transitionDelay: "0.1s" }} variant="h3" sx={{ mb: 4 }}>
          Turning product ideas into polished user experiences
        </Typography>

        <Typography
          className="reveal"
          style={{ transitionDelay: "0.2s" }}
          sx={{
            color: "grey.300",
            fontSize: { xs: "17px", md: "21px" },
            lineHeight: 1.7,
            mb: 3,
          }}
        >
          I'm a Senior Software Engineer with a passion for building scalable products, thoughtful design systems, and user experiences that feel effortless to use. I enjoy working across product, design, and engineering to turn ideas into polished, maintainable solutions.
        </Typography>

        <Box
          className="reveal"
          style={{ transitionDelay: "0.3s" }}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {skills.map(({ label, icon }) => (
            <Tooltip key={label} title={label} arrow>
              <Box
                sx={{
                  color: "rgba(243,241,235,0.35)",
                  fontSize: "22px",
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.2s",
                  cursor: "default",
                  "&:hover": { color: "rgba(243,241,235,0.7)" },
                }}
              >
                {icon}
              </Box>
            </Tooltip>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
