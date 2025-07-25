import { Card, CardContent } from "@/components/ui/card";
import { FormData } from "../../PortfolioForm";

interface ServicesProps {
  data: FormData;
  template: string;
}

export default function Services({ data, template }: ServicesProps) {
  const isCreative = template === "creative";
  const services = data.services.filter(service => service.title && service.description);

  if (services.length === 0) return null;

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isCreative ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : 'gradient-text'
          }`}>
            Services
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            isCreative ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-primary to-primary'
          }`} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`glass-card hover:scale-105 transition-all duration-300 ${
                isCreative ? 'border-purple-400/20 hover:border-purple-400/40' : 'hover:border-primary/40'
              }`}
            >
              <CardContent className="p-8">
                <div className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center text-2xl font-bold ${
                  isCreative 
                    ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  {index + 1}
                </div>
                
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}