import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Code2, Eye, FileCode, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import CodeEditor from "@/components/CodeEditor";
import CodePreview from "@/components/CodePreview";
import FileTree from "@/components/FileTree";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
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
  const [isRunning, setIsRunning] = useState(false);
  const [files, setFiles] = useState<FileTab[]>([]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
          setIsRunning(true);
          setTimeout(() => setIsRunning(false), 100);
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

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 100);
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
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode("code")}
                  className={`px-3 py-1.5 rounded text-sm transition-smooth ${
                    viewMode === "code" ? "bg-background shadow-sm" : "hover:bg-background/50"
                  }`}
                >
                  <FileCode className="h-4 w-4 inline mr-1" />
                  Code
                </button>
                <button
                  onClick={() => {
                    setViewMode("preview");
                    handleRun();
                  }}
                  className={`px-3 py-1.5 rounded text-sm transition-smooth ${
                    viewMode === "preview" ? "bg-background shadow-sm" : "hover:bg-background/50"
                  }`}
                >
                  <Eye className="h-4 w-4 inline mr-1" />
                  Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Chat Sidebar - 30% */}
        <aside className="w-[30%] border-r flex flex-col bg-card/30">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : message.role === "error"
                      ? "bg-destructive/10 border border-destructive/20"
                      : "bg-muted"
                  }`}
                >
                  {message.role === "error" && (
                    <div className="flex items-start gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-destructive">Error</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  {message.role === "error" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 h-7 text-xs"
                      onClick={() => handleFixError(message.content)}
                    >
                      Fix This Error
                    </Button>
                  )}
                  <span className="text-xs opacity-60 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t bg-background">
            <div className="flex gap-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe what you want to build..."
                className="flex-1 resize-none bg-muted border-0 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[60px] max-h-[120px]"
                rows={2}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isGenerating}
                className="self-end"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </aside>

        {/* Editor/Preview - 70% */}
        <div className="flex-1 flex overflow-hidden">
          {viewMode === "code" ? (
            <>
              <FileTree
                files={files}
                currentFile={currentFile?.name || ""}
                onFileSelect={(fileName) => {
                  const file = files.find(f => f.name === fileName);
                  if (file) setCurrentFile(file);
                }}
              />
              <div className="flex-1 p-4 overflow-hidden">
                {currentFile ? (
                  <CodeEditor
                    code={currentFile.content}
                    onCodeChange={(newCode) => {
                      setCurrentFile(prev => prev ? { ...prev, content: newCode } : null);
                      setFiles(prev => prev.map(f => 
                        f.name === currentFile.name ? { ...f, content: newCode } : f
                      ));
                    }}
                    onRun={handleRun}
                    isRunning={isRunning}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <FileCode className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Generate code to get started</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 p-4 overflow-hidden">
              {currentFile ? (
                <CodePreview
                  code={currentFile.content}
                  isRunning={isRunning}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Generate code to see preview</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CodeGenerator;
