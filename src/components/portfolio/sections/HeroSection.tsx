import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FormData } from "../../PortfolioForm";

interface HeroSectionProps {
  data: FormData;
  template: string;
}

export default function HeroSection({ data, template }: HeroSectionProps) {
  const isCreative = template === "creative";

  return (
    <section className={`min-h-screen flex items-center justify-center px-6 ${
      isCreative ? 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400' : 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
    }`}>
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <Avatar className={`w-32 h-32 mx-auto mb-6 ring-4 ${
            isCreative ? 'ring-white/30' : 'ring-primary/30'
          }`}>
            <AvatarImage src={data.profileImage} alt={data.name} />
            <AvatarFallback className="text-2xl font-bold">
              {data.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>

        <h1 className={`text-6xl md:text-8xl font-bold mb-4 ${
          isCreative ? 'text-white' : 'gradient-text'
        }`}>
          {data.name}
        </h1>
        
        <h2 className={`text-2xl md:text-3xl font-semibold mb-6 ${
          isCreative ? 'text-white/90' : 'text-primary'
        }`}>
          {data.title}
        </h2>
        
        <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto ${
          isCreative ? 'text-white/80' : 'text-muted-foreground'
        }`}>
          {data.tagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant={isCreative ? "secondary" : "gradient"} 
            size="lg" 
            className="px-12 py-6 text-lg"
          >
            View My Work
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className={`px-12 py-6 text-lg ${
              isCreative ? 'border-white/30 text-white hover:bg-white/10' : ''
            }`}
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
}