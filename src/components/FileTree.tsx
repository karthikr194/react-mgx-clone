import { FileCode, Folder, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileTab {
  name: string;
  content: string;
  language: string;
}

interface FileTreeProps {
  files: FileTab[];
  currentFile: string;
  onFileSelect: (fileName: string) => void;
}

const FileTree = ({ files, currentFile, onFileSelect }: FileTreeProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="w-64 border-r bg-card/30 flex flex-col">
      <div className="p-3 border-b">
        <h3 className="text-sm font-semibold">Files</h3>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          <div className="space-y-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 w-full text-sm hover:bg-muted/50 rounded px-2 py-1"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <Folder className="h-4 w-4 text-primary" />
              <span>src</span>
            </button>
            
            {isExpanded && (
              <div className="ml-4 space-y-1">
                {files.length === 0 ? (
                  <div className="text-xs text-muted-foreground px-2 py-1">
                    No files yet
                  </div>
                ) : (
                  files.map((file) => (
                    <button
                      key={file.name}
                      onClick={() => onFileSelect(file.name)}
                      className={`flex items-center gap-2 w-full text-sm rounded px-2 py-1 transition-colors ${
                        currentFile === file.name
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <FileCode className="h-4 w-4" />
                      <span className="truncate">{file.name}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default FileTree;
