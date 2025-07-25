import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TemplateSelector from "@/components/TemplateSelector";
import PortfolioForm, { FormData } from "@/components/PortfolioForm";
import ProfessionalsList from "@/components/ProfessionalsList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Professional extends FormData {
  id: string;
  template: string;
}

interface IndexProps {
  professionals: Professional[];
  onAddProfessional: (data: FormData, template: string) => string;
  onUpdateProfessional: (id: string, data: FormData) => void;
}

type AppState = "list" | "template" | "form";

const Index = ({ professionals, onAddProfessional, onUpdateProfessional }: IndexProps) => {
  const [appState, setAppState] = useState<AppState>("list");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [editingProfessional, setEditingProfessional] = useState<Professional | null>(null);
  const navigate = useNavigate();

  const handleStartCreating = () => {
    setEditingProfessional(null);
    setSelectedTemplate("");
    setAppState("template");
  };

  const handleTemplateSelected = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleTemplateNext = () => {
    setAppState("form");
  };

  const handleFormBack = () => {
    setAppState("template");
  };

  const handleFormSubmit = (data: FormData) => {
    if (editingProfessional) {
      onUpdateProfessional(editingProfessional.id, data);
    } else {
      onAddProfessional(data, selectedTemplate);
    }
    setAppState("list");
    setEditingProfessional(null);
  };

  const handleViewPortfolio = (professional: Professional) => {
    navigate(`/portfolio/${professional.id}`);
  };

  const handleEditProfile = (professional: Professional) => {
    setEditingProfessional(professional);
    setSelectedTemplate(professional.template);
    setAppState("form");
  };

  if (appState === "template") {
    return (
      <TemplateSelector
        selectedTemplate={selectedTemplate}
        onSelectTemplate={handleTemplateSelected}
        onNext={handleTemplateNext}
      />
    );
  }

  if (appState === "form") {
    return (
      <PortfolioForm
        onBack={handleFormBack}
        onSubmit={handleFormSubmit}
        selectedTemplate={selectedTemplate}
      />
    );
  }

  // List view
  if (professionals.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl font-bold mb-6 gradient-text">
            Portfolio Generator
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Create stunning professional portfolios with our beautiful templates and easy-to-use form builder.
          </p>
          <Button 
            onClick={handleStartCreating}
            variant="gradient"
            size="lg"
            className="px-12 py-6 text-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Portfolio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-6 right-6 z-50">
        <Button
          onClick={handleStartCreating}
          variant="gradient"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Portfolio
        </Button>
      </div>
      
      <ProfessionalsList
        professionals={professionals}
        onViewPortfolio={handleViewPortfolio}
        onEditProfile={handleEditProfile}
      />
    </>
  );
};

export default Index;
