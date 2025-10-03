import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Code2, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ChatPanel from "@/components/ChatPanel";
import EditorPanel from "@/components/EditorPanel";
import ThemeToggle from "@/components/ThemeToggle";
import Split from "react-split";

interface Message {
  id: string;
  role: "user" | "assistant" | "error";
  content: string;
  timestamp: Date;
}

interface FileTab {
  name: string;
  content: string;
  language: string;
}

const CodeGenerator = () => {
  const navigate = useNavigate();
  
  const [chatTitle, setChatTitle] = useState("New Chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm Gemini AI. Describe what you want to build and I'll generate the code for you.",
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentFile, setCurrentFile] = useState<FileTab | null>(null);
  const [viewMode, setViewMode] = useState<"code" | "preview">("code");
  const [files, setFiles] = useState<FileTab[]>([]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Update chat title with first user message
    if (messages.length === 1) {
      setChatTitle(inputText.slice(0, 50) + (inputText.length > 50 ? "..." : ""));
    }
    
    setInputText("");
    setIsGenerating(true);

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
        throw new Error(errorData.details || errorData.error || 'Failed to generate code');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I've generated the code for you. Check the editor on the right.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Create the file
      const newFile = {
        name: "Component.tsx",
        content: data.code,
        language: "typescript"
      };
      
      setCurrentFile(newFile);
      
      // Add to files list
      setFiles(prev => {
        const exists = prev.find(f => f.name === "Component.tsx");
        if (!exists) {
          return [...prev, newFile];
        }
        return prev.map(f => 
          f.name === "Component.tsx" ? newFile : f
        );
      });

      toast({
        title: "Code Generated!",
        description: "Your component is ready.",
      });

      // Auto-run if in preview mode
      if (viewMode === "preview") {
        setTimeout(() => {
          // Trigger preview update
        }, 500);
      }

    } catch (error) {
      console.error('Code generation error:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "error",
        content: error instanceof Error ? error.message : "Failed to generate code. Please try again.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);

      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate code",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFixError = async (errorContent: string) => {
    const fixPrompt = `Fix this error in the code:\n\n${errorContent}\n\nCurrent code:\n${currentFile.content}`;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `Fix error: ${errorContent}`,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsGenerating(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ prompt: fixPrompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Failed to fix error');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I've fixed the error. Check the updated code.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      if (currentFile) {
        const updatedFile = {
          ...currentFile,
          content: data.code
        };
        setCurrentFile(updatedFile);
        setFiles(prev => prev.map(f => 
          f.name === currentFile.name ? updatedFile : f
        ));
      }

      toast({
        title: "Error Fixed!",
        description: "The code has been updated.",
      });

    } catch (error) {
      console.error('Error fixing failed:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "error",
        content: error instanceof Error ? error.message : "Failed to fix error. Please try again.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-14 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              
              <div className="h-6 w-px bg-border" />
              
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg font-semibold">{chatTitle}</h1>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      Gemini
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Resizable Split */}
      <main className="flex-1 overflow-hidden">
        <Split
          className="flex h-full"
          sizes={[30, 70]}
          minSize={[300, 400]}
          gutterSize={4}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
        >
          <ChatPanel
            messages={messages}
            inputText={inputText}
            isGenerating={isGenerating}
            onInputChange={setInputText}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
            onFixError={handleFixError}
          />
          
          <EditorPanel
            files={files}
            currentFile={currentFile}
            onFileSelect={(fileName) => {
              const file = files.find(f => f.name === fileName);
              if (file) setCurrentFile(file);
            }}
            onCodeChange={(newCode) => {
              setCurrentFile(prev => prev ? { ...prev, content: newCode } : null);
              setFiles(prev => prev.map(f => 
                f.name === currentFile?.name ? { ...f, content: newCode } : f
              ));
            }}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </Split>
      </main>
    </div>
  );
};

export default CodeGenerator;
