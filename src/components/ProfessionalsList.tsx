import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, Eye, Edit, Filter } from "lucide-react";
import { FormData } from "./PortfolioForm";

interface Professional extends FormData {
  id: string;
  template: string;
}

interface ProfessionalsListProps {
  professionals: Professional[];
  onViewPortfolio: (professional: Professional) => void;
  onEditProfile: (professional: Professional) => void;
}

export default function ProfessionalsList({ 
  professionals, 
  onViewPortfolio, 
  onEditProfile 
}: ProfessionalsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const filteredProfessionals = professionals.filter(professional => {
    const matchesSearch = 
      professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkill = !skillFilter || 
      professional.skills.some(skill => 
        skill.toLowerCase().includes(skillFilter.toLowerCase())
      );
    
    const matchesRole = !roleFilter || 
      professional.title.toLowerCase().includes(roleFilter.toLowerCase());

    return matchesSearch && matchesSkill && matchesRole;
  });

  const allSkills = Array.from(
    new Set(professionals.flatMap(p => p.skills))
  ).sort();

  const allRoles = Array.from(
    new Set(professionals.map(p => p.title))
  ).sort();

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            Our Professionals
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover talented professionals and explore their portfolios
          </p>
        </div>

        {/* Filters */}
        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search professionals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <select
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md text-sm"
                >
                  <option value="">Filter by skill</option>
                  {allSkills.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md text-sm"
                >
                  <option value="">Filter by role</option>
                  {allRoles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professionals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProfessionals.map((professional) => (
            <Card 
              key={professional.id} 
              className="bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-white/20">
                    <AvatarImage src={professional.profileImage} alt={professional.name} />
                    <AvatarFallback className="text-lg font-bold bg-white/20">
                      {professional.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <h3 className="text-lg font-bold mb-1">{professional.name}</h3>
                <p className="text-sm opacity-90 font-medium mb-3">{professional.title}</p>
                
                <div className="text-xs opacity-80 mb-4 line-clamp-2">{professional.bio}</div>
                
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {professional.skills.slice(0, 2).map((skill, index) => (
                    <Badge key={index} className="text-xs bg-white/20 text-white border-white/30 hover:bg-white/30">
                      {skill}
                    </Badge>
                  ))}
                  {professional.skills.length > 2 && (
                    <Badge className="text-xs bg-white/20 text-white border-white/30">
                      +{professional.skills.length - 2}
                    </Badge>
                  )}
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-center text-xs opacity-80 mb-2">
                    <span>⭐⭐⭐⭐⭐ 4.9 (38)</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-white/20 text-white hover:bg-white/30 border-white/30"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewPortfolio(professional);
                    }}
                  >
                    View Portfolio
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="bg-white/20 text-white hover:bg-white/30 border-white/30"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditProfile(professional);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No professionals found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}