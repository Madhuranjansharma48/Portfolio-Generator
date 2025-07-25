import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { FormData } from "../../PortfolioForm";

interface PortfolioProps {
  data: FormData;
  template: string;
}

export default function Portfolio({ data, template }: PortfolioProps) {
  const isCreative = template === "creative";
  const projects = data.projects.filter(project => project.title && project.description);

  if (projects.length === 0) return null;

  return (
    <section className={`py-24 px-6 ${
      isCreative ? 'bg-gradient-to-br from-purple-900/20 to-pink-900/20' : 'bg-secondary/20'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isCreative ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : 'gradient-text'
          }`}>
            My Portfolio
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            isCreative ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-primary to-primary'
          }`} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className={`glass-card hover:scale-105 transition-all duration-300 group ${
                isCreative ? 'border-purple-400/20 hover:border-purple-400/40' : 'hover:border-primary/40'
              }`}
            >
              <CardContent className="p-0">
                {project.image && (
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isCreative 
                        ? 'from-purple-900/80 to-transparent' 
                        : 'from-background/80 to-transparent'
                    }`} />
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <Button 
                    variant={isCreative ? "secondary" : "outline"} 
                    size="sm"
                    className={`w-full ${
                      isCreative ? 'bg-purple-500/20 border-purple-400/30 hover:bg-purple-500/30' : ''
                    }`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}