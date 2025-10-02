import { useEffect, useRef, useState } from "react";
import { AlertCircle, Maximize2, Minimize2, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";

interface CodePreviewProps {
  code: string;
  isRunning: boolean;
}

const CodePreview = ({ code, isRunning }: CodePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const renderCode = () => {
    if (!code || !iframeRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create a complete HTML document with React
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              body {
                margin: 0;
                padding: 16px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              }
              * {
                box-sizing: border-box;
              }
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script type="text/babel">
              const { useState, useEffect, useCallback, useMemo, useRef } = React;
              
              // Wrap the code in a try-catch
              try {
                ${code}
                
                // Render the default export or the last component
                const root = ReactDOM.createRoot(document.getElementById('root'));
                
                // Try to render the default export or find the component
                if (typeof App !== 'undefined') {
                  root.render(<App />);
                } else {
                  // Find the last defined component
                  const components = Object.keys(window).filter(key => 
                    typeof window[key] === 'function' && 
                    key[0] === key[0].toUpperCase()
                  );
                  
                  if (components.length > 0) {
                    const ComponentName = components[components.length - 1];
                    const Component = window[ComponentName];
                    root.render(<Component />);
                  } else {
                    throw new Error('No React component found in the code');
                  }
                }
              } catch (err) {
                document.getElementById('root').innerHTML = 
                  '<div style="padding: 20px; color: #ef4444; font-family: monospace;">' +
                  '<strong>Error:</strong><br/>' + err.message + '</div>';
                console.error(err);
              }
            </script>
          </body>
        </html>
      `;

      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
      }

      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Preview Updated",
          description: "Component rendered successfully",
        });
      }, 1000);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to render component");
      setIsLoading(false);
      toast({
        title: "Render Error",
        description: "Failed to render the component",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isRunning && code) {
      renderCode();
    }
  }, [isRunning]);

  const handleRefresh = () => {
    renderCode();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    toast({
      title: isFullscreen ? "Exited Fullscreen" : "Fullscreen Mode",
      description: isFullscreen ? "Preview restored to normal size" : "Preview expanded to fullscreen",
    });
  };

  return (
    <div 
      className={`flex flex-col bg-card border rounded-lg overflow-hidden transition-all ${
        isFullscreen ? "fixed inset-4 z-50" : "h-full"
      }`}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b bg-muted/50">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm font-medium ml-2">Live Preview</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={!code || isLoading}
            className="h-8"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="h-8"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-white relative overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Render Error</h3>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button onClick={handleRefresh} variant="outline">
                Try Again
              </Button>
            </div>
          </div>
        ) : !code ? (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="text-sm">No code to preview</p>
              <p className="text-xs mt-2">Generate code to see the preview</p>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            className="w-full h-full border-0"
            title="Code Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        )}
        
        {isLoading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
            <div className="flex items-center gap-2 text-sm">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Rendering...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePreview;
