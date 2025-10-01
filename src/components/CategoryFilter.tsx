import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const categories = [
  "New",
  "Claude",
  "Sonnet 4",
  "Slides",
  "Deep Research",
  "Blog",
  "Link Hub",
  "App World",
];

const CategoryFilter = () => {
  const [activeFilter, setActiveFilter] = useState("Featured");

  return (
    <section className="py-8 bg-muted/30 border-b">
      <div className="container mx-auto px-4">
        {/* Scrollable Categories */}
        <div className="mb-6 overflow-x-auto scrollbar-hide">
          <ul className="flex space-x-3 pb-2 min-w-max">
            {categories.map((cat) => (
              <li key={cat}>
                <button className="px-5 py-2.5 bg-card rounded-full shadow-sm border hover:border-primary hover:bg-primary/5 transition-smooth whitespace-nowrap text-sm font-medium">
                  {cat}
                </button>
              </li>
            ))}
            <li>
              <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full whitespace-nowrap text-sm font-medium hover:bg-primary-dark transition-smooth flex items-center">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </li>
          </ul>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">Discover</h2>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground font-medium">Filter:</span>
            <div className="flex space-x-2">
              <Button
                variant={activeFilter === "Featured" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("Featured")}
                className="rounded-full transition-smooth"
              >
                Featured
              </Button>
              <Button
                variant={activeFilter === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("All")}
                className="rounded-full transition-smooth"
              >
                All
              </Button>
              <Button
                variant={activeFilter === "Popular" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("Popular")}
                className="rounded-full transition-smooth"
              >
                Popular
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
