import Ambient from "./components/Ambient";
import ResponsiveMenu from "./components/ResponsiveMenu";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Writing from "./components/Writing";
import Testimonial from "./components/Testimonial";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SectionDivider from "./components/SectionDivider";
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <>
      <Ambient />
      <ResponsiveMenu />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Box
          aria-hidden
          sx={{
            height: "48px",
            background: "linear-gradient(to bottom, #0b1710 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Writing />
        <SectionDivider />
        <Testimonial />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
