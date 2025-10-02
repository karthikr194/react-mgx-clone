import { useState } from "react";
import { Sparkles, Heart, ChevronRight } from "lucide-react";

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

const apps = [
  {
    id: 1,
    title: "Global News Hub",
    image: "/placeholder.svg",
    category: "Website",
  },
  {
    id: 2,
    title: "SheetHub",
    image: "/placeholder.svg",
    category: "Productivity",
  },
  {
    id: 3,
    title: "GTA Game World",
    image: "/placeholder.svg",
    category: "Game",
  },
];

const AppWorld = () => {
  const [activeTab, setActiveTab] = useState<"discover" | "likes">("discover");
  const [activeCategory, setActiveCategory] = useState("Website");
  const [sortBy, setSortBy] = useState("Featured");

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <h2 className="text-2xl font-bold">App World</h2>
          </div>
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div
              key={app.id}
              className="group bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-smooth cursor-pointer"
            >
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img
                  src={app.image}
                  alt={app.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{app.title}</h3>
                <p className="text-sm text-muted-foreground">{app.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppWorld;
