import { useParams } from "react-router-dom";
import { FormData } from "../PortfolioForm";
import HeroSection from "./sections/HeroSection";
import AboutMe from "./sections/AboutMe";
import Skills from "./sections/Skills";
import Services from "./sections/Services";
import Portfolio from "./sections/Portfolio";
import Photos from "./sections/Photos";
import Testimonials from "./sections/Testimonials";
import Blog from "./sections/Blog";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

interface Professional extends FormData {
  id: string;
  template: string;
}

interface PortfolioPageProps {
  professionals: Professional[];
}

export default function PortfolioPage({ professionals }: PortfolioPageProps) {
  const { id } = useParams<{ id: string }>();
  const professional = professionals.find(p => p.id === id);

  if (!professional) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Portfolio Not Found</h1>
          <p className="text-muted-foreground">The requested portfolio could not be found.</p>
        </div>
      </div>
    );
  }

  const templateClass = professional.template === "creative" 
    ? "creative-template" 
    : "modern-template";

  return (
    <div className={`min-h-screen ${templateClass}`}>
      <HeroSection data={professional} template={professional.template} />
      <AboutMe data={professional} template={professional.template} />
      <Skills data={professional} template={professional.template} />
      <Services data={professional} template={professional.template} />
      <Portfolio data={professional} template={professional.template} />
      <Photos data={professional} template={professional.template} />
      <Testimonials data={professional} template={professional.template} />
      {professional.blogTitle && (
        <Blog data={professional} template={professional.template} />
      )}
      <Contact data={professional} template={professional.template} />
      <Footer data={professional} template={professional.template} />
    </div>
  );
}