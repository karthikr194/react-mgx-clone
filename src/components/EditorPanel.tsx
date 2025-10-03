import { useState } from "react";
import { Copy, Download, Play, FileCode, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import CodeEditor from "./CodeEditor";
import CodePreview from "./CodePreview";
import FileTree from "./FileTree";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface FileTab {
  name: string;
  content: string;
  language: string;
}

interface EditorPanelProps {
  files: FileTab[];
  currentFile: FileTab | null;
  onFileSelect: (fileName: string) => void;
  onCodeChange: (newCode: string) => void;
  viewMode: "code" | "preview";
  onViewModeChange: (mode: "code" | "preview") => void;
}

const EditorPanel = ({
  files,
  currentFile,
  onFileSelect,
  onCodeChange,
  viewMode,
  onViewModeChange,
}: EditorPanelProps) => {
  const [isRunning, setIsRunning] = useState(false);

  const handleCopyCode = () => {
    if (currentFile?.content) {
      navigator.clipboard.writeText(currentFile.content);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
    }
  };

  const handleDownloadZip = async () => {
    if (files.length === 0) {
      toast({
        title: "No files to download",
        description: "Generate some code first",
        variant: "destructive",
      });
      return;
    }

    const zip = new JSZip();
    
    // Add files to zip
    files.forEach((file) => {
      zip.file(file.name, file.content);
    });

    // Add package.json
    const packageJson = {
      name: "generated-app",
      version: "1.0.0",
      dependencies: {
        react: "^18.3.1",
        "react-dom": "^18.3.1",
      },
    };
    zip.file("package.json", JSON.stringify(packageJson, null, 2));

    // Generate zip
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "generated-code.zip");

    toast({
      title: "Downloaded!",
      description: "Your code has been downloaded as a zip file",
    });
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 100);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b bg-background/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => onViewModeChange("code")}
              className={`px-3 py-1.5 rounded text-sm transition-all ${
                viewMode === "code" ? "bg-background shadow-sm" : "hover:bg-background/50"
              }`}
            >
              <FileCode className="h-4 w-4 inline mr-1" />
              Code
            </button>
            <button
              onClick={() => {
                onViewModeChange("preview");
                handleRun();
              }}
              className={`px-3 py-1.5 rounded text-sm transition-all ${
                viewMode === "preview" ? "bg-background shadow-sm" : "hover:bg-background/50"
              }`}
            >
              <Eye className="h-4 w-4 inline mr-1" />
              Preview
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {viewMode === "code" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyCode}
                disabled={!currentFile}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadZip}
                disabled={files.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </>
          )}
          <Button
            size="sm"
            onClick={handleRun}
            disabled={!currentFile}
          >
            <Play className="h-4 w-4 mr-2" />
            Run
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {viewMode === "code" ? (
          <>
            <FileTree
              files={files}
              currentFile={currentFile?.name || ""}
              onFileSelect={onFileSelect}
            />
            <div className="flex-1 overflow-hidden">
              {currentFile ? (
                <CodeEditor
                  code={currentFile.content}
                  onCodeChange={onCodeChange}
                  onRun={handleRun}
                  isRunning={isRunning}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <FileCode className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-lg font-medium">No code generated yet</p>
                    <p className="text-sm mt-1">Describe what you want to build in the chat</p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-hidden">
            {currentFile ? (
              <CodePreview code={currentFile.content} isRunning={isRunning} />
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-lg font-medium">No preview available</p>
                  <p className="text-sm mt-1">Generate code first to see the preview</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorPanel;
