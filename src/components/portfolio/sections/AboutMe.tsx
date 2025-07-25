import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { FormData } from "../../PortfolioForm";

interface AboutMeProps {
  data: FormData;
  template: string;
}

export default function AboutMe({ data, template }: AboutMeProps) {
  const isCreative = template === "creative";

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isCreative ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : 'gradient-text'
          }`}>
            About Me
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            isCreative ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-primary to-primary'
          }`} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className={`text-lg leading-relaxed mb-8 ${
              isCreative ? 'text-gray-300' : 'text-muted-foreground'
            }`}>
              {data.bio}
            </p>

            <div className="space-y-4">
              {data.email && (
                <div className="flex items-center gap-3">
                  <Mail className={`w-5 h-5 ${isCreative ? 'text-purple-400' : 'text-primary'}`} />
                  <span className="text-foreground">{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-3">
                  <Phone className={`w-5 h-5 ${isCreative ? 'text-purple-400' : 'text-primary'}`} />
                  <span className="text-foreground">{data.phone}</span>
                </div>
              )}
              {data.location && (
                <div className="flex items-center gap-3">
                  <MapPin className={`w-5 h-5 ${isCreative ? 'text-purple-400' : 'text-primary'}`} />
                  <span className="text-foreground">{data.location}</span>
                </div>
              )}
            </div>
          </div>

          <Card className={`glass-card ${isCreative ? 'border-purple-400/20' : ''}`}>
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6">Connect With Me</h3>
              
              {data.socials.length > 0 && (
                <div className="space-y-4 mb-8">
                  {data.socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                        isCreative 
                          ? 'border-purple-400/20 hover:border-purple-400/40 hover:bg-purple-400/5' 
                          : 'border-border hover:border-primary/40 hover:bg-primary/5'
                      }`}
                    >
                      <ExternalLink className={`w-4 h-4 ${isCreative ? 'text-purple-400' : 'text-primary'}`} />
                      <span className="font-medium">{social.platform}</span>
                    </a>
                  ))}
                </div>
              )}

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${isCreative ? 'text-purple-400' : 'text-primary'}`}>
                    {data.projects.filter(p => p.title).length}+
                  </div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${isCreative ? 'text-purple-400' : 'text-primary'}`}>
                    {data.skills.length}+
                  </div>
                  <div className="text-sm text-muted-foreground">Skills</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}