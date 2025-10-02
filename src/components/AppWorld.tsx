import { useState } from "react";
import { Sparkles, Heart, ChevronRight, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const categories = [
  "Website",
  "Game",
  "Productivity",
  "Prototype",
  "Data Analysis",
  "Blog",
  "Business Card",
  "Deep research",
];

const allApps = [
  {
    id: 1,
    title: "Global News Hub",
    description: "Real-time news aggregator",
    image: "/placeholder.svg",
    category: "Website",
    likes: 245,
  },
  {
    id: 2,
    title: "SheetHub",
    description: "Spreadsheet collaboration tool",
    image: "/placeholder.svg",
    category: "Productivity",
    likes: 189,
  },
  {
    id: 3,
    title: "GTA Game World",
    description: "Open world game experience",
    image: "/placeholder.svg",
    category: "Game",
    likes: 532,
  },
  {
    id: 4,
    title: "Task Manager Pro",
    description: "Advanced task tracking",
    image: "/placeholder.svg",
    category: "Productivity",
    likes: 328,
  },
  {
    id: 5,
    title: "Portfolio Showcase",
    description: "Creative portfolio builder",
    image: "/placeholder.svg",
    category: "Website",
    likes: 156,
  },
  {
    id: 6,
    title: "Data Visualizer",
    description: "Interactive data charts",
    image: "/placeholder.svg",
    category: "Data Analysis",
    likes: 421,
  },
];

const AppWorld = () => {
  const [activeTab, setActiveTab] = useState<"discover" | "likes">("discover");
  const [activeCategory, setActiveCategory] = useState("Website");
  const [sortBy, setSortBy] = useState("Featured");
  const [likedApps, setLikedApps] = useState<number[]>([]);

  const handleLike = (appId: number) => {
    setLikedApps(prev => {
      if (prev.includes(appId)) {
        toast({
          title: "Removed from Likes",
          description: "App removed from your favorites",
        });
        return prev.filter(id => id !== appId);
      } else {
        toast({
          title: "Added to Likes",
          description: "App added to your favorites",
        });
        return [...prev, appId];
      }
    });
  };

  const handleAppClick = (app: typeof allApps[0]) => {
    toast({
      title: `Opening ${app.title}`,
      description: app.description,
    });
  };

  const handleViewAll = () => {
    toast({
      title: "View All Apps",
      description: "Loading full app catalog...",
    });
  };

  // Filter apps based on active tab and category
  const getFilteredApps = () => {
    let filtered = activeTab === "likes" 
      ? allApps.filter(app => likedApps.includes(app.id))
      : allApps;

    if (activeCategory !== "Website") {
      filtered = filtered.filter(app => app.category === activeCategory);
    }

    // Sort apps
    if (sortBy === "Popular") {
      filtered = [...filtered].sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "Recent") {
      filtered = [...filtered].reverse();
    }

    return filtered;
  };

  const filteredApps = getFilteredApps();

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <h2 className="text-2xl font-bold">App World</h2>
          </div>
          <button 
            onClick={handleViewAll}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth"
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("discover")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-smooth ${
              activeTab === "discover"
                ? "bg-primary/10 text-primary"
                : "bg-card hover:bg-muted"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">Discover</span>
          </button>
          <button
            onClick={() => setActiveTab("likes")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-smooth ${
              activeTab === "likes"
                ? "bg-primary/10 text-primary"
                : "bg-card hover:bg-muted"
            }`}
          >
            <Heart className="h-4 w-4" />
            <span className="font-medium">My Likes</span>
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 flex-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-smooth ${
                  activeCategory === category
                    ? "bg-foreground text-background"
                    : "bg-card hover:bg-muted"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-card border rounded-lg text-sm cursor-pointer hover:bg-muted transition-smooth"
            >
              <option>Featured</option>
              <option>Popular</option>
              <option>Recent</option>
            </select>
          </div>
        </div>

        {/* Apps Grid */}
        {filteredApps.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {activeTab === "likes" 
                ? "No liked apps yet. Start exploring and like your favorites!" 
                : "No apps found in this category"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="group bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-smooth"
              >
                <div 
                  onClick={() => handleAppClick(app)}
                  className="aspect-video bg-muted relative overflow-hidden cursor-pointer"
                >
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth flex items-center justify-center">
                    <ExternalLink className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-smooth" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{app.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{app.description}</p>
                      <span className="inline-block text-xs px-2 py-1 bg-muted rounded">
                        {app.category}
                      </span>
                    </div>
                    <button
                      onClick={() => handleLike(app.id)}
                      className="p-2 hover:bg-muted rounded-lg transition-smooth"
                    >
                      <Heart 
                        className={`h-5 w-5 transition-smooth ${
                          likedApps.includes(app.id) 
                            ? "fill-red-500 text-red-500" 
                            : "text-muted-foreground"
                        }`} 
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{app.likes} likes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      
      </div>
    </section>
  );
};

export default AppWorld;
