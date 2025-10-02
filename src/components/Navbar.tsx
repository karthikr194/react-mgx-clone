import { Menu, X, Globe, MessageSquare, Trash2, Plus as PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface Chat {
  id: number;
  title: string;
}

const languages = ["English", "Spanish", "French", "German", "Japanese", "Chinese"];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [chats, setChats] = useState<Chat[]>([
    { id: 1, title: "clone of mgx.dev with same ui" },
    { id: 2, title: "Small To-Do App Guide" },
    { id: 3, title: "Responsive Story Sharing App" },
    { id: 4, title: "Blog App with SSO Posting" },
  ]);
  const [activeChat, setActiveChat] = useState<number | null>(1);

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now(),
      title: `New Chat ${chats.length + 1}`,
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat.id);
    toast({
      title: "New Chat Created",
      description: "Start your conversation",
    });
  };

  const handleDeleteChat = (chatId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (activeChat === chatId) {
      setActiveChat(chats[0]?.id || null);
    }
    toast({
      title: "Chat Deleted",
      description: "Chat removed successfully",
    });
  };

  const handleSelectChat = (chatId: number) => {
    setActiveChat(chatId);
    const chat = chats.find(c => c.id === chatId);
    toast({
      title: "Chat Selected",
      description: chat?.title,
    });
  };

  const handleNavigation = (section: string) => {
    toast({
      title: `Navigating to ${section}`,
      description: `Loading ${section.toLowerCase()} section...`,
    });
  };

  const handleSocialClick = (platform: string) => {
    toast({
      title: `Opening ${platform}`,
      description: `Redirecting to ${platform}...`,
    });
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setShowLanguageDropdown(false);
    toast({
      title: "Language Changed",
      description: `Switched to ${lang}`,
    });
  };

  const handleUpgrade = () => {
    toast({
      title: "Upgrade Account",
      description: "Redirecting to pricing page...",
    });
  };

  const handleAppWorld = () => {
    toast({
      title: "App World",
      description: "Opening App World...",
    });
  };

  return (
    <>
      <header className="sticky top-0 bg-background border-b z-50">
        <nav className="px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left Side - Menu & Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-muted rounded-lg transition-smooth"
              >
                <Menu className="h-5 w-5" />
              </button>
              <a href="/" className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6" />
                <span className="text-xl font-bold">MGX</span>
              </a>
            </div>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => handleNavigation("Blog")}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                Blog
              </button>
              <button 
                onClick={() => handleNavigation("Use Case")}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                Use Case
              </button>
              <button 
                onClick={() => handleNavigation("Learn")}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                Learn
              </button>
              <button 
                onClick={() => handleNavigation("Pricing")}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                Pricing
              </button>
              <button 
                onClick={() => handleNavigation("Launched")}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                Launched
              </button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <button 
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center gap-1 px-2 py-1 hover:bg-muted rounded transition-smooth"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">{selectedLanguage}</span>
                </button>
                {showLanguageDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-card border rounded-lg shadow-lg z-50 animate-fade-in">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLanguageChange(lang)}
                        className={`w-full text-left px-4 py-2 hover:bg-muted transition-smooth first:rounded-t-lg last:rounded-b-lg ${
                          selectedLanguage === lang ? "bg-muted" : ""
                        }`}
                      >
                        <span className="text-sm">{lang}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button 
                onClick={() => handleSocialClick("X")}
                className="p-2 hover:bg-muted rounded transition-smooth"
                title="X (Twitter)"
              >
                <X className="h-5 w-5" />
              </button>
              <button 
                onClick={() => handleSocialClick("Discord")}
                className="p-2 hover:bg-muted rounded transition-smooth"
                title="Discord"
              >
                <MessageSquare className="h-5 w-5" />
              </button>
              <button 
                onClick={() => handleSocialClick("LinkedIn")}
                className="p-2 hover:bg-muted rounded transition-smooth"
                title="LinkedIn"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </button>
              <div className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium cursor-default">
                <span className="text-lg">⏺</span>
                <span>4.9/5.0</span>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-background border-r z-50 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-6 w-6" />
              <span className="text-xl font-bold">MGX</span>
            </div>
            <button 
              onClick={handleNewChat}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-smooth"
            >
              <PlusIcon className="h-5 w-5" />
              <span className="font-medium">New Chat</span>
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <button 
              onClick={handleAppWorld}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-lg transition-smooth mb-4"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Go to App World</span>
            </button>

            <div className="mb-4">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-medium">My Chats</span>
                <span className="text-xs text-muted-foreground">({chats.length})</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="px-3 py-1 text-xs text-muted-foreground">Recents</div>
              {chats.map((chat) => (
                <div key={chat.id} className="group relative">
                  <button 
                    onClick={() => handleSelectChat(chat.id)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-smooth ${
                      activeChat === chat.id ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    }`}
                  >
                    {chat.title}
                  </button>
                  <button
                    onClick={(e) => handleDeleteChat(chat.id, e)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 text-destructive rounded transition-smooth"
                    title="Delete chat"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-smooth cursor-pointer">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                K
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Karthik Raju</span>
                  <span className="text-xs px-2 py-0.5 bg-muted rounded">Free</span>
                </div>
              </div>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex items-center justify-between px-3 py-2 text-sm">
              <span className="text-muted-foreground">Credits remaining</span>
              <button 
                onClick={handleUpgrade}
                className="text-primary hover:underline"
              >
                Upgrade
              </button>
            </div>
            <div className="px-3 text-sm text-muted-foreground">0 left</div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
