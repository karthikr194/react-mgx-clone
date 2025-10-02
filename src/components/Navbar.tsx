import { Menu, X, Globe, MessageSquare } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
              <a href="#blog" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Blog
              </a>
              <a href="#use-case" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Use Case
              </a>
              <a href="#learn" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Learn
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Pricing
              </a>
              <a href="#launched" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Launched
              </a>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 px-2 py-1 hover:bg-muted rounded transition-smooth">
                <Globe className="h-4 w-4" />
                <span className="text-sm">English</span>
              </button>
              <button className="p-2 hover:bg-muted rounded transition-smooth">
                <X className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-muted rounded transition-smooth">
                <MessageSquare className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-muted rounded transition-smooth">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </button>
              <div className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">
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
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-smooth">
              <span className="text-lg">+</span>
              <span className="font-medium">New Chat</span>
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-lg transition-smooth mb-4">
              <MessageSquare className="h-4 w-4" />
              <span>Go to App World</span>
            </button>

            <div className="mb-4">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-medium">My Chats</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            <div className="space-y-1">
              <div className="px-3 py-1 text-xs text-muted-foreground">Recents</div>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-lg transition-smooth">
                clone of mgx.dev with same ui
              </button>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-lg transition-smooth">
                Small To-Do App Guide
              </button>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-lg transition-smooth">
                Responsive Story Sharing App
              </button>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-lg transition-smooth">
                Blog App with SSO Posting
              </button>
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
              <button className="text-primary hover:underline">Upgrade</button>
            </div>
            <div className="px-3 text-sm text-muted-foreground">0 left</div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
