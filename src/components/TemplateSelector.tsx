import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface Template {
  id: string;
  name: string;
  preview: string;
  description: string;
}

const templates: Template[] = [
  {
    id: "modern",
    name: "Modern Portfolio",
    preview: "🎨",
    description: "Clean, minimalist design with smooth animations and modern typography"
  },
  {
    id: "creative",
    name: "Creative Portfolio", 
    preview: "✨",
    description: "Bold, creative layout with vibrant colors and dynamic sections"
  }
];

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
  onNext: () => void;
}

export default function TemplateSelector({ selectedTemplate, onSelectTemplate, onNext }: TemplateSelectorProps) {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Choose Your <span className="text-primary">Template</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a professional template that best represents your style and customize it to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {templates.map((template) => (
            <Card 
              key={template.id}
              className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                selectedTemplate === template.id 
                  ? 'border-primary shadow-lg shadow-primary/20' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              <CardContent className="p-0">
                <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 rounded-t-lg flex items-center justify-center">
                  <div className="text-6xl">{template.preview}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Any Features</span>
                    {selectedTemplate === template.id ? (
                      <Button size="sm" className="bg-primary text-primary-foreground">
                        <Check className="w-4 h-4 mr-1" />
                        Selected
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={onNext}
            disabled={!selectedTemplate}
            size="lg"
            className="px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Continue to Form
          </Button>
        </div>
      </div>
    </div>
  );
}