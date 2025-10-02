import { useState } from "react";
import { Copy, Check, Download, Play, Code2, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  onRun: () => void;
  isRunning: boolean;
}

const CodeEditor = ({ code, onCodeChange, onRun, isRunning }: CodeEditorProps) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"code" | "preview">("code");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Component.tsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Component.tsx has been downloaded",
    });
  };

  return (
    <div className="flex flex-col h-full bg-card border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b bg-muted/50">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4" />
          <span className="text-sm font-medium">Component.tsx</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-background rounded-lg p-1">
            <button
              onClick={() => setViewMode("code")}
              className={`p-1.5 rounded transition-smooth ${
                viewMode === "code" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              title="Code View"
            >
              <Code2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("preview")}
              className={`p-1.5 rounded transition-smooth ${
                viewMode === "preview" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              title="Preview"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-border" />

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="h-8"
          >
            <Download className="h-4 w-4" />
          </Button>
          
          <Button
            variant="default"
            size="sm"
            onClick={onRun}
            disabled={isRunning || !code}
            className="h-8"
          >
            <Play className="h-4 w-4 mr-1" />
            {isRunning ? "Running..." : "Run"}
          </Button>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="flex-1 overflow-auto">
        {viewMode === "code" ? (
          <textarea
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            className="w-full h-full p-4 bg-background font-mono text-sm resize-none focus:outline-none"
            placeholder="Generated code will appear here..."
            spellCheck={false}
          />
        ) : (
          <div className="p-4">
            <pre className="text-sm font-mono whitespace-pre-wrap break-words">
              {code || "No code to preview"}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
