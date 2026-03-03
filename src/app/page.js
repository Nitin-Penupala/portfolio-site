import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Experience from '@/components/Experience/Experience';
import Projects from '@/components/Projects/Projects';
import Skills from '@/components/Skills/Skills';
import Education from '@/components/Education/Education';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}
