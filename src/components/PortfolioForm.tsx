import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";

interface FormData {
  // Hero Section
  name: string;
  title: string;
  tagline: string;
  profileImage: string;
  
  // About Me
  bio: string;
  email: string;
  phone: string;
  location: string;
  socials: { platform: string; url: string }[];
  
  // Skills
  skills: string[];
  
  // Services
  services: { title: string; description: string }[];
  
  // Portfolio
  projects: { title: string; image: string; description: string }[];
  
  // Photos
  photos: { url: string; caption: string }[];
  
  // Testimonials
  testimonials: { name: string; company: string; quote: string }[];
  
  // Blog
  blogTitle: string;
  blogSummary: string;
  
  // Contact
  contactMessage: string;
}

const initialFormData: FormData = {
  name: "",
  title: "",
  tagline: "",
  profileImage: "",
  bio: "",
  email: "",
  phone: "",
  location: "",
  socials: [],
  skills: [],
  services: [{ title: "", description: "" }, { title: "", description: "" }, { title: "", description: "" }],
  projects: [{ title: "", image: "", description: "" }, { title: "", image: "", description: "" }, { title: "", image: "", description: "" }],
  photos: [],
  testimonials: [{ name: "", company: "", quote: "" }],
  blogTitle: "",
  blogSummary: "",
  contactMessage: ""
};

interface PortfolioFormProps {
  onBack: () => void;
  onSubmit: (data: FormData) => void;
  selectedTemplate: string;
}

export default function PortfolioForm({ onBack, onSubmit, selectedTemplate }: PortfolioFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [newSkill, setNewSkill] = useState("");
  const [newSocial, setNewSocial] = useState({ platform: "", url: "" });
  const [newPhoto, setNewPhoto] = useState({ url: "", caption: "" });

  const placeholderPhotos = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500", 
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500",
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
    "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500"
  ];

  const steps = [
    "Hero Section",
    "About Me", 
    "Skills",
    "Services",
    "Portfolio",
    "Photos",
    "Testimonials",
    "Blog",
    "Contact"
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      updateFormData("skills", [...formData.skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    updateFormData("skills", formData.skills.filter((_, i) => i !== index));
  };

  const addSocial = () => {
    if (newSocial.platform && newSocial.url) {
      updateFormData("socials", [...formData.socials, newSocial]);
      setNewSocial({ platform: "", url: "" });
    }
  };

  const removeSocial = (index: number) => {
    updateFormData("socials", formData.socials.filter((_, i) => i !== index));
  };

  const addTestimonial = () => {
    updateFormData("testimonials", [...formData.testimonials, { name: "", company: "", quote: "" }]);
  };

  const addPhoto = () => {
    if (newPhoto.url.trim()) {
      updateFormData("photos", [...formData.photos, newPhoto]);
      setNewPhoto({ url: "", caption: "" });
    }
  };

  const removePhoto = (index: number) => {
    updateFormData("photos", formData.photos.filter((_, i) => i !== index));
  };

  const addPlaceholderPhoto = (url: string) => {
    updateFormData("photos", [...formData.photos, { url, caption: "" }]);
  };

  const updateArrayField = (field: string, index: number, key: string, value: string) => {
    const array = [...(formData as any)[field]];
    array[index] = { ...array[index], [key]: value };
    updateFormData(field, array);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Hero Section
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Professional Title</label>
              <Input
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                placeholder="Full Stack Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tagline</label>
              <Input
                value={formData.tagline}
                onChange={(e) => updateFormData("tagline", e.target.value)}
                placeholder="Building amazing digital experiences"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Profile Image URL</label>
              <Input
                value={formData.profileImage}
                onChange={(e) => updateFormData("profileImage", e.target.value)}
                placeholder="https://example.com/profile.jpg"
              />
            </div>
          </div>
        );

      case 1: // About Me
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <Textarea
                value={formData.bio}
                onChange={(e) => updateFormData("bio", e.target.value)}
                placeholder="Tell us about yourself..."
                className="min-h-[120px]"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => updateFormData("location", e.target.value)}
                placeholder="New York, NY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Social Links</label>
              <div className="space-y-3">
                {formData.socials.map((social, index) => (
                  <div key={index} className="flex gap-2">
                    <Input value={social.platform} readOnly className="w-32" />
                    <Input value={social.url} readOnly className="flex-1" />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeSocial(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    placeholder="Platform"
                    value={newSocial.platform}
                    onChange={(e) => setNewSocial(prev => ({ ...prev, platform: e.target.value }))}
                    className="w-32"
                  />
                  <Input
                    placeholder="URL"
                    value={newSocial.url}
                    onChange={(e) => setNewSocial(prev => ({ ...prev, url: e.target.value }))}
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={addSocial}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // Skills
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Add Skills</label>
              <div className="flex gap-2 mb-4">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g., React, Node.js, Python"
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <Button type="button" onClick={addSkill}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <button onClick={() => removeSkill(index)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 3: // Services
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Services (3 services)</h3>
            {formData.services.map((service, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Service Title</label>
                      <Input
                        value={service.title}
                        onChange={(e) => updateArrayField("services", index, "title", e.target.value)}
                        placeholder="Web Development"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        value={service.description}
                        onChange={(e) => updateArrayField("services", index, "description", e.target.value)}
                        placeholder="Describe your service..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 4: // Portfolio
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Portfolio Projects (3 projects)</h3>
            {formData.projects.map((project, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Title</label>
                      <Input
                        value={project.title}
                        onChange={(e) => updateArrayField("projects", index, "title", e.target.value)}
                        placeholder="E-commerce Platform"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Image URL</label>
                      <Input
                        value={project.image}
                        onChange={(e) => updateArrayField("projects", index, "image", e.target.value)}
                        placeholder="https://example.com/project.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        value={project.description}
                        onChange={(e) => updateArrayField("projects", index, "description", e.target.value)}
                        placeholder="Describe your project..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 5: // Photos
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Photo Gallery</h3>
              <Button type="button" variant="outline" onClick={addPhoto}>
                <Plus className="w-4 h-4 mr-2" />
                Add Photo
              </Button>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-4">Add Photo</label>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Input
                    placeholder="Photo URL"
                    value={newPhoto.url}
                    onChange={(e) => setNewPhoto(prev => ({ ...prev, url: e.target.value }))}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Caption (optional)"
                    value={newPhoto.caption}
                    onChange={(e) => setNewPhoto(prev => ({ ...prev, caption: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-4">Or choose from placeholders:</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {placeholderPhotos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={photo} 
                      alt={`Placeholder ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => addPlaceholderPhoto(photo)}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-4">Selected Photos ({formData.photos.length})</label>
              <div className="grid md:grid-cols-2 gap-4">
                {formData.photos.map((photo, index) => (
                  <Card key={index} className="glass-card">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <img 
                          src={photo.url} 
                          alt={photo.caption || `Photo ${index + 1}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1 space-y-2">
                          <Input
                            placeholder="Add caption..."
                            value={photo.caption}
                            onChange={(e) => updateArrayField("photos", index, "caption", e.target.value)}
                            className="text-sm"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removePhoto(index)}
                            className="text-destructive"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 6: // Testimonials
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Client Testimonials</h3>
              <Button type="button" variant="outline" onClick={addTestimonial}>
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </div>
            {formData.testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Client Name</label>
                        <Input
                          value={testimonial.name}
                          onChange={(e) => updateArrayField("testimonials", index, "name", e.target.value)}
                          placeholder="Jane Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Company</label>
                        <Input
                          value={testimonial.company}
                          onChange={(e) => updateArrayField("testimonials", index, "company", e.target.value)}
                          placeholder="Tech Corp"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Quote</label>
                      <Textarea
                        value={testimonial.quote}
                        onChange={(e) => updateArrayField("testimonials", index, "quote", e.target.value)}
                        placeholder="Share what the client said..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 7: // Blog
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Blog Section (Optional)</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Blog Title</label>
              <Input
                value={formData.blogTitle}
                onChange={(e) => updateFormData("blogTitle", e.target.value)}
                placeholder="My Tech Blog"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Blog Summary</label>
              <Textarea
                value={formData.blogSummary}
                onChange={(e) => updateFormData("blogSummary", e.target.value)}
                placeholder="Brief description of your blog..."
              />
            </div>
          </div>
        );

      case 8: // Contact
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Message</label>
              <Textarea
                value={formData.contactMessage}
                onChange={(e) => updateFormData("contactMessage", e.target.value)}
                placeholder="Let's work together! Feel free to reach out..."
                className="min-h-[120px]"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Create Your Portfolio
          </h1>
          <p className="text-muted-foreground">Step {currentStep + 1} of {steps.length}: {steps[currentStep]}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-xs font-medium ${
                  index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="btn-gradient h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{steps[currentStep]}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={currentStep === 0 ? onBack : prevStep}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentStep === 0 ? "Back to Templates" : "Previous"}
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button variant="gradient" onClick={handleSubmit}>
              Create Portfolio
            </Button>
          ) : (
            <Button variant="gradient" onClick={nextStep}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export type { FormData };