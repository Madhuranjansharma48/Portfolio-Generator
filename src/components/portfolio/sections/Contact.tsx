import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FormData } from "../../PortfolioForm";

interface ContactProps {
  data: FormData;
  template: string;
}

export default function Contact({ data, template }: ContactProps) {
  const isCreative = template === "creative";

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isCreative ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : 'gradient-text'
          }`}>
            Get In Touch
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            isCreative ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-primary to-primary'
          }`} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Let's Work Together</h3>
            
            {data.contactMessage && (
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {data.contactMessage}
              </p>
            )}

            <div className="space-y-6">
              {data.email && (
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    isCreative 
                      ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' 
                      : 'bg-primary/10'
                  }`}>
                    <Mail className={`w-6 h-6 ${
                      isCreative ? 'text-purple-400' : 'text-primary'
                    }`} />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">{data.email}</div>
                  </div>
                </div>
              )}

              {data.phone && (
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    isCreative 
                      ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' 
                      : 'bg-primary/10'
                  }`}>
                    <Phone className={`w-6 h-6 ${
                      isCreative ? 'text-purple-400' : 'text-primary'
                    }`} />
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-muted-foreground">{data.phone}</div>
                  </div>
                </div>
              )}

              {data.location && (
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    isCreative 
                      ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' 
                      : 'bg-primary/10'
                  }`}>
                    <MapPin className={`w-6 h-6 ${
                      isCreative ? 'text-purple-400' : 'text-primary'
                    }`} />
                  </div>
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-muted-foreground">{data.location}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <Card className={`glass-card ${
            isCreative ? 'border-purple-400/20' : ''
          }`}>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input placeholder="Project inquiry" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea 
                    placeholder="Tell me about your project..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant={isCreative ? "secondary" : "gradient"}
                  className={`w-full ${
                    isCreative ? 'bg-purple-500/20 border-purple-400/30 hover:bg-purple-500/30' : ''
                  }`}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}