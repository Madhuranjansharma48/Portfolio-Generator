import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { FormData } from "../../PortfolioForm";

interface BlogProps {
  data: FormData;
  template: string;
}

export default function Blog({ data, template }: BlogProps) {
  const isCreative = template === "creative";

  if (!data.blogTitle) return null;

  return (
    <section className={`py-24 px-6 ${
      isCreative ? 'bg-gradient-to-br from-purple-900/20 to-pink-900/20' : 'bg-secondary/20'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isCreative ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : 'gradient-text'
          }`}>
            Blog
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            isCreative ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-primary to-primary'
          }`} />
        </div>

        <Card className={`glass-card max-w-3xl mx-auto ${
          isCreative ? 'border-purple-400/20' : ''
        }`}>
          <CardContent className="p-8 text-center">
            <BookOpen className={`w-16 h-16 mx-auto mb-6 ${
              isCreative ? 'text-purple-400' : 'text-primary'
            }`} />
            
            <h3 className="text-2xl font-semibold mb-4">{data.blogTitle}</h3>
            
            {data.blogSummary && (
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {data.blogSummary}
              </p>
            )}
            
            <Button 
              variant={isCreative ? "secondary" : "gradient"}
              size="lg"
              className={`px-8 ${
                isCreative ? 'bg-purple-500/20 border-purple-400/30 hover:bg-purple-500/30' : ''
              }`}
            >
              Read More
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}