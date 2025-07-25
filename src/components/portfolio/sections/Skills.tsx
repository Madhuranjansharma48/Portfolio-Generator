import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FormData } from "../../PortfolioForm";

interface SkillsProps {
  data: FormData;
  template: string;
}

export default function Skills({ data, template }: SkillsProps) {
  const isCreative = template === "creative";

  if (data.skills.length === 0) return null;

  return (
    <section className={`py-24 px-6 ${
      isCreative ? 'bg-gradient-to-br from-purple-900/20 to-pink-900/20' : 'bg-secondary/20'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isCreative ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : 'gradient-text'
          }`}>
            Skills & Expertise
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            isCreative ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-primary to-primary'
          }`} />
        </div>

        <Card className={`glass-card ${isCreative ? 'border-purple-400/20' : ''}`}>
          <CardContent className="p-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {data.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant={isCreative ? "secondary" : "outline"}
                  className={`text-sm px-4 py-2 transition-all duration-300 hover:scale-105 ${
                    isCreative 
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30 text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30' 
                      : 'hover:bg-primary/10 hover:border-primary/40'
                  }`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}