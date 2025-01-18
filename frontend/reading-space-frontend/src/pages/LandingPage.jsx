/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Blog from "../components/Blog";

const LandingPage = ({ theme, setTheme }) => {
  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <About />
      <Features />
      <Pricing />
      <Blog/>
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default LandingPage;
