import { useRef, useEffect } from "react";
import { Send, Loader2, AlertCircle, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant" | "error";
  content: string;
  timestamp: Date;
}

interface ChatPanelProps {
  messages: Message[];
  inputText: string;
  isGenerating: boolean;
  onInputChange: (text: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onFixError?: (errorContent: string) => void;
}

const ChatPanel = ({
  messages,
  inputText,
  isGenerating,
  onInputChange,
  onSendMessage,
  onKeyPress,
  onFixError,
}: ChatPanelProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-card/30 border-r">
      {/* Header */}
      <div className="p-4 border-b bg-background/50 backdrop-blur-sm">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI Assistant
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Describe what you want to build
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-4 animate-fade-in ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : message.role === "error"
                    ? "bg-destructive/10 border border-destructive/20"
                    : "bg-muted"
                }`}
              >
                {message.role !== "user" && (
                  <div className="flex items-center gap-2 mb-2">
                    {message.role === "error" ? (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    ) : (
                      <Bot className="h-4 w-4 text-primary" />
                    )}
                    <span className="text-xs font-medium">
                      {message.role === "error" ? "Error" : "AI"}
                    </span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                {message.role === "error" && onFixError && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 h-7 text-xs"
                    onClick={() => onFixError(message.content)}
                  >
                    Fix This Error
                  </Button>
                )}
                <span className="text-xs opacity-60 mt-2 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-4">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-background/50 backdrop-blur-sm">
        <div className="flex gap-2">
          <textarea
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Describe what you want to build..."
            className="flex-1 resize-none bg-muted border-0 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[60px] max-h-[120px]"
            rows={2}
          />
          <Button
            onClick={onSendMessage}
            disabled={!inputText.trim() || isGenerating}
            className="self-end"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
