import { FormData } from "../../PortfolioForm";

interface FooterProps {
  data: FormData;
  template: string;
}

export default function Footer({ data, template }: FooterProps) {
  const isCreative = template === "creative";
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-12 px-6 border-t ${
      isCreative 
        ? 'border-purple-400/20 bg-gradient-to-r from-purple-900/20 to-pink-900/20' 
        : 'border-border bg-secondary/20'
    }`}>
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-6">
          <h3 className={`text-2xl font-bold ${
            isCreative ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : 'gradient-text'
          }`}>
            {data.name}
          </h3>
          <p className="text-muted-foreground mt-2">{data.title}</p>
        </div>

        {data.socials.length > 0 && (
          <div className="flex justify-center gap-6 mb-8">
            {data.socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  isCreative 
                    ? 'border-purple-400/20 hover:border-purple-400/40 hover:bg-purple-400/5' 
                    : 'border-border hover:border-primary/40 hover:bg-primary/5'
                }`}
              >
                {social.platform}
              </a>
            ))}
          </div>
        )}

        <div className="border-t border-border pt-6">
          <p className="text-muted-foreground">
            © {currentYear} {data.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}