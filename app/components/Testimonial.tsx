"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { testimonials } from "../helpers/data";
import testimonialAvatar from "../images/testimonial-avatar.webp";

const imageMap: Record<string, StaticImageData> = {
  "testimonial-avatar": testimonialAvatar,
};

export default function Testimonial() {
  const { quote, name, title, image } = testimonials[0];
  const avatarSrc = image ? imageMap[image] : undefined;

  return (
    <Box
      component="section"
      id="testimonial"
      sx={{
        py: { xs: 10, md: 14 },
        position: "relative",
        zIndex: 1,
      }}
    >
      <Container sx={{ maxWidth: "650px !important", textAlign: "center" }}>
        <Box className="reveal" sx={{ mb: 6 }}>
          <Typography
            component="span"
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
            + Recommendation
          </Typography>
          <Typography variant="h3">What Others Say</Typography>
        </Box>

        <Typography
          className="reveal"
          style={{ transitionDelay: "0.1s" }}
          sx={{
            color: "grey.300",
            fontSize: { xs: "18px", md: "21px" },
            lineHeight: 1.85,
            fontStyle: "italic",
            mb: 5,
          }}
        >
          &ldquo;{quote}&rdquo;
        </Typography>

        <Box
          className="reveal"
          style={{ transitionDelay: "0.2s" }}
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}
        >
          {avatarSrc && (
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid rgba(255,255,255,0.08)",
                flexShrink: 0,
                position: "relative",
              }}
            >
              <Image
                src={avatarSrc!}
                alt={name}
                fill
                style={{ objectFit: "cover" }}
                sizes="72px"
              />
            </Box>
          )}
          <Box>
            <Typography
              sx={{
                color: "common.white",
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 600,
                fontSize: { xs: 15, md: 16 },
              }}
            >
              {name}
            </Typography>
            <Typography
              sx={{
                color: "grey.500",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: { xs: 12, md: 13 },
                letterSpacing: "0.04em",
                mt: 0.5,
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
