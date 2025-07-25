import { FormData } from "../../PortfolioForm";

interface PhotosSectionProps {
  data: FormData;
  template: string;
}

export default function Photos({ data, template }: PhotosSectionProps) {
  const isCreative = template === "creative";

  if (!data.photos || data.photos.length === 0) {
    return null;
  }

  return (
    <section className={`py-20 px-6 ${
      isCreative ? 'bg-gradient-to-b from-purple-900/50 to-pink-900/50' : 'bg-muted/30'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${
            isCreative ? 'text-white' : 'gradient-text'
          }`}>
            Photo Gallery
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isCreative ? 'text-white/80' : 'text-muted-foreground'
          }`}>
            A collection of memorable moments and professional highlights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.photos.map((photo, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 ${
                isCreative ? 'shadow-lg shadow-purple-500/20' : 'shadow-md hover:shadow-lg'
              }`}
            >
              <div className="aspect-square relative">
                <img
                  src={photo.url}
                  alt={photo.caption || `Photo ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end ${
                  isCreative ? 'bg-gradient-to-t from-purple-900/80 to-transparent' : 'bg-gradient-to-t from-black/60 to-transparent'
                }`}>
                  {photo.caption && (
                    <div className="p-4 w-full">
                      <p className="text-white text-sm font-medium">
                        {photo.caption}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}