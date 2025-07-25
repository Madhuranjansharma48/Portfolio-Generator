import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { FormData } from "../../PortfolioForm";

interface TestimonialsProps {
  data: FormData;
  template: string;
}

export default function Testimonials({ data, template }: TestimonialsProps) {
  const isCreative = template === "creative";
  const testimonials = data.testimonials.filter(testimonial => 
    testimonial.name && testimonial.quote
  );

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isCreative ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : 'gradient-text'
          }`}>
            What Clients Say
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            isCreative ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-primary to-primary'
          }`} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className={`glass-card hover:scale-105 transition-all duration-300 ${
                isCreative ? 'border-purple-400/20 hover:border-purple-400/40' : 'hover:border-primary/40'
              }`}
            >
              <CardContent className="p-8">
                <Quote className={`w-8 h-8 mb-6 ${
                  isCreative ? 'text-purple-400' : 'text-primary'
                }`} />
                
                <blockquote className="text-lg mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="border-t border-border pt-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  {testimonial.company && (
                    <div className={`text-sm ${
                      isCreative ? 'text-purple-400' : 'text-primary'
                    }`}>
                      {testimonial.company}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}