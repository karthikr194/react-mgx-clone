import { Plus, Zap, Image, User, SlidersHorizontal, ArrowUp, Presentation, Microscope, BookOpen, Link } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-background via-background to-purple-50/30">
      <div className="container mx-auto px-4 pt-12 pb-24">
        {/* Agent Avatars */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center text-2xl shadow-md">
            🐶
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-2xl shadow-md">
            🐱
          </div>
          <div className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center text-2xl shadow-md">
            😊
          </div>
          <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center text-2xl shadow-md">
            🐸
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-2xl shadow-md">
            👻
          </div>
          <button className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/10 transition-smooth shadow-md">
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-12">
          Build Your Ideas with Agents
        </h1>

        {/* Input Area */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border rounded-2xl shadow-lg p-6 mb-4">
            <div className="flex items-start gap-3 mb-4">
              <input
                type="text"
                placeholder="@David for"
                className="flex-1 text-lg bg-transparent border-none outline-none"
              />
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted rounded-lg transition-smooth">
                  <Plus className="h-5 w-5" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-smooth">
                  <Zap className="h-5 w-5 text-green-600" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-smooth">
                  <Image className="h-5 w-5" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-smooth">
                  <User className="h-5 w-5" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-smooth">
                  <SlidersHorizontal className="h-5 w-5" />
                </button>
                <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-medium rounded">
                  New
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-lg transition-smooth">
                  <span className="text-sm">Claude Sonnet 4</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button className="p-2 bg-muted hover:bg-muted-foreground/20 rounded-lg transition-smooth">
                  <ArrowUp className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button className="flex items-center gap-2 px-4 py-2 bg-card border hover:border-primary rounded-lg transition-smooth">
              <Presentation className="h-4 w-4" />
              <span className="text-sm">Slides</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-card border hover:border-primary rounded-lg transition-smooth">
              <Microscope className="h-4 w-4" />
              <span className="text-sm">Deep Research</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-card border hover:border-primary rounded-lg transition-smooth">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm">Blog</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-card border hover:border-primary rounded-lg transition-smooth">
              <Link className="h-4 w-4" />
              <span className="text-sm">Link Hub</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
