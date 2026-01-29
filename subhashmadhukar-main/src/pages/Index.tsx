import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import AiInterviewChallenge from "@/components/AiInterviewChallenge";
import ResumeCritique from "@/components/ResumeCritique";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AiChat from "@/components/AiChat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <AiInterviewChallenge />
      <Skills />
      <Experience />
      <ResumeCritique />
      <Contact />
      <Footer />
      <AiChat />
    </div>
  );
};

export default Index;