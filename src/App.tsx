import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PortfolioPage from "./components/portfolio/PortfolioPage";
import { useState } from "react";
import { FormData } from "./components/PortfolioForm";

const queryClient = new QueryClient();

interface Professional extends FormData {
  id: string;
  template: string;
}

const App = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  const addProfessional = (data: FormData, template: string) => {
    const newProfessional: Professional = {
      ...data,
      id: Date.now().toString(),
      template
    };
    setProfessionals(prev => [...prev, newProfessional]);
    return newProfessional.id;
  };

  const updateProfessional = (id: string, data: FormData) => {
    setProfessionals(prev => 
      prev.map(p => p.id === id ? { ...p, ...data } : p)
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <Index 
                  professionals={professionals}
                  onAddProfessional={addProfessional}
                  onUpdateProfessional={updateProfessional}
                />
              } 
            />
            <Route 
              path="/portfolio/:id" 
              element={<PortfolioPage professionals={professionals} />} 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
