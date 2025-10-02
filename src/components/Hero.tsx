import { useState } from "react";
import { Plus, Zap, Image, User, SlidersHorizontal, ArrowUp, Presentation, Microscope, BookOpen, Link, Check, Code2, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CodeEditor from "./CodeEditor";
import CodePreview from "./CodePreview";

const agents = [
  { id: 1, emoji: "🐶", name: "Dog Agent", color: "bg-orange-400" },
  { id: 2, emoji: "🐱", name: "Cat Agent", color: "bg-blue-400" },
  { id: 3, emoji: "😊", name: "Happy Agent", color: "bg-purple-400" },
  { id: 4, emoji: "🐸", name: "Frog Agent", color: "bg-green-400" },
  { id: 5, emoji: "👻", name: "Ghost Agent", color: "bg-gray-300" },
];

const models = [
  "DeepSeek",
  "Claude Sonnet 4",
  "GPT-4",
  "Claude Opus",
  "Gemini Pro",
];

const Hero = () => {
  const [selectedAgent, setSelectedAgent] = useState<number | null>(1);
  const [inputText, setInputText] = useState("");
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [showCodeView, setShowCodeView] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  const handleAgentSelect = (agentId: number) => {
    setSelectedAgent(agentId);
    const agent = agents.find(a => a.id === agentId);
    toast({
      title: "Agent Selected",
      description: `${agent?.name} is now active`,
    });
  };

  const handleAddAgent = () => {
    toast({
      title: "Add New Agent",
      description: "Agent creation feature coming soon!",
    });
  };

  const handleToolbarAction = (action: string) => {
    toast({
      title: action,
      description: `${action} feature activated`,
    });
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} Mode`,
      description: `Starting ${action.toLowerCase()} mode...`,
    });
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Empty Input",
        description: "Please enter your prompt",
        variant: "destructive",
      });
      return;
    }

    if (selectedModel !== "DeepSeek") {
      toast({
        title: "Model Not Supported",
        description: "Currently only DeepSeek model is supported for code generation",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setShowCodeView(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ prompt: inputText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate code');
      }

      const data = await response.json();
      setGeneratedCode(data.code);
      
      toast({
        title: "Code Generated!",
        description: "Your component is ready. Click 'Run' to preview it.",
      });
      
      setInputText("");
    } catch (error) {
      console.error('Code generation error:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate code",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRun = () => {
    if (!generatedCode) {
      toast({
        title: "No Code",
        description: "Generate code first before running",
        variant: "destructive",
      });
      return;
    }
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <section className="relative min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-background via-background to-purple-50/30">
        <div className="container mx-auto px-4 pt-12 pb-24">
        {/* Agent Avatars */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => handleAgentSelect(agent.id)}
              className={`relative w-12 h-12 rounded-full ${agent.color} flex items-center justify-center text-2xl shadow-md hover:scale-110 transition-smooth ${
                selectedAgent === agent.id ? "ring-4 ring-primary" : ""
              }`}
            >
              {agent.emoji}
              {selectedAgent === agent.id && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
            </button>
          ))}
          <button 
            onClick={handleAddAgent}
            className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/10 transition-smooth shadow-md hover:scale-110"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-12">
          Build Your Ideas with Agents
        </h1>

        {/* Input Area */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border rounded-2xl shadow-lg p-6 mb-4">
            <div className="flex items-start gap-3 mb-4">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="@David for"
                className="flex-1 text-lg bg-transparent border-none outline-none resize-none min-h-[60px]"
                rows={2}
              />
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleToolbarAction("Attach File")}
                  className="p-2 hover:bg-muted rounded-lg transition-smooth"
                  title="Attach File"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleToolbarAction("Quick Actions")}
                  className="p-2 hover:bg-muted rounded-lg transition-smooth"
                  title="Quick Actions"
                >
                  <Zap className="h-5 w-5 text-green-600" />
                </button>
                <button 
                  onClick={() => handleToolbarAction("Image Upload")}
                  className="p-2 hover:bg-muted rounded-lg transition-smooth"
                  title="Upload Image"
                >
                  <Image className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleToolbarAction("Mention User")}
                  className="p-2 hover:bg-muted rounded-lg transition-smooth"
                  title="Mention User"
                >
                  <User className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleToolbarAction("Advanced Settings")}
                  className="p-2 hover:bg-muted rounded-lg transition-smooth"
                  title="Settings"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </button>
                <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-medium rounded">
                  New
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <button 
                    onClick={() => setShowModelDropdown(!showModelDropdown)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-lg transition-smooth"
                  >
                    <span className="text-sm">{selectedModel}</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showModelDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-card border rounded-lg shadow-lg z-50 animate-fade-in">
                      {models.map((model) => (
                        <button
                          key={model}
                          onClick={() => {
                            setSelectedModel(model);
                            setShowModelDropdown(false);
                            toast({
                              title: "Model Changed",
                              description: `Switched to ${model}`,
                            });
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-muted transition-smooth first:rounded-t-lg last:rounded-b-lg ${
                            selectedModel === model ? "bg-muted" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{model}</span>
                            {selectedModel === model && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={handleSubmit}
                  disabled={!inputText.trim() || isGenerating}
                  className="p-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Generate Code"
                >
                  {isGenerating ? (
                    <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ArrowUp className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button 
              onClick={() => handleQuickAction("Slides")}
              className="flex items-center gap-2 px-4 py-2 bg-card border hover:border-primary hover:bg-primary/5 rounded-lg transition-smooth"
            >
              <Presentation className="h-4 w-4" />
              <span className="text-sm">Slides</span>
            </button>
            <button 
              onClick={() => handleQuickAction("Deep Research")}
              className="flex items-center gap-2 px-4 py-2 bg-card border hover:border-primary hover:bg-primary/5 rounded-lg transition-smooth"
            >
              <Microscope className="h-4 w-4" />
              <span className="text-sm">Deep Research</span>
            </button>
            <button 
              onClick={() => handleQuickAction("Blog")}
              className="flex items-center gap-2 px-4 py-2 bg-card border hover:border-primary hover:bg-primary/5 rounded-lg transition-smooth"
            >
              <BookOpen className="h-4 w-4" />
              <span className="text-sm">Blog</span>
            </button>
            <button 
              onClick={() => handleQuickAction("Link Hub")}
              className="flex items-center gap-2 px-4 py-2 bg-card border hover:border-primary hover:bg-primary/5 rounded-lg transition-smooth"
            >
              <Link className="h-4 w-4" />
              <span className="text-sm">Link Hub</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Code View Modal */}
    {showCodeView && (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-background w-full max-w-7xl h-[90vh] rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Code Generator</h2>
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                {selectedModel}
              </span>
            </div>
            <button
              onClick={() => setShowCodeView(false)}
              className="p-2 hover:bg-muted rounded-lg transition-smooth"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 grid grid-cols-2 gap-4 p-4 overflow-hidden">
            <CodeEditor
              code={generatedCode}
              onCodeChange={setGeneratedCode}
              onRun={handleRun}
              isRunning={isRunning}
            />
            <CodePreview
              code={generatedCode}
              isRunning={isRunning}
            />
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default Hero;
