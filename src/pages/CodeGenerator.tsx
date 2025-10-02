import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Code2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/CodeEditor";
import CodePreview from "@/components/CodePreview";
import Navbar from "@/components/Navbar";

const CodeGenerator = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const promptFromUrl = searchParams.get("prompt");
  const modelFromUrl = searchParams.get("model") || "DeepSeek";

  const [generatedCode, setGeneratedCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (promptFromUrl && !generatedCode) {
      generateCode(promptFromUrl);
    }
  }, [promptFromUrl]);

  const generateCode = async (prompt: string) => {
    setIsGenerating(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ prompt }),
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
      
      // Auto-run after generation
      setTimeout(() => {
        setIsRunning(true);
        setTimeout(() => setIsRunning(false), 100);
      }, 500);
      
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

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-14 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              
              <div className="h-6 w-px bg-border" />
              
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                <h1 className="text-lg font-semibold">Code Generator</h1>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {modelFromUrl}
                </span>
              </div>
            </div>
            
            {promptFromUrl && (
              <div className="hidden md:block text-sm text-muted-foreground max-w-md truncate">
                Prompt: <span className="italic">{promptFromUrl}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 overflow-hidden">
        {isGenerating ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Generating Code...</h2>
                <p className="text-sm text-muted-foreground">
                  DeepSeek is creating your component
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[calc(100vh-180px)] grid grid-cols-1 lg:grid-cols-2 gap-4">
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
        )}
      </main>
    </div>
  );
};

export default CodeGenerator;
