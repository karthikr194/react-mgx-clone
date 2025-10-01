import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";
import ContentSection from "@/components/ContentSection";
import FeatureTable from "@/components/FeatureTable";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Code, Smartphone, Users, TrendingUp, Shield } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Lightning Fast Development",
      description: "Build applications in hours instead of months with our intuitive drag-and-drop interface.",
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "No Coding Required",
      description: "Create powerful AI solutions without any programming knowledge or technical background.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      title: "Cross-Platform",
      description: "Deploy your applications across web, iOS, and Android platforms seamlessly.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Collaborative Workspace",
      description: "Work together with your team in real-time to bring ideas to life faster.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Scalable Architecture",
      description: "Built on enterprise-grade infrastructure that scales with your business needs.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Enterprise Security",
      description: "Bank-level security and compliance to keep your data and applications safe.",
    },
  ];

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <Hero />
      <CategoryFilter />

      {/* Revolutionary Technology Section */}
      <ContentSection 
        title="What Makes No Code AI Builder Technology Revolutionary" 
        id="revolutionary"
        bgColor="bg-background"
      >
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6 leading-relaxed">
            No-code technology removes complex programming barriers for AI app creation. Users can now create 
            powerful solutions in hours, not months. The platform democratizes artificial intelligence, making 
            it accessible to entrepreneurs, business professionals, and innovators without technical backgrounds.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Breaking Down Traditional Development Barriers</h3>
              <p className="text-muted-foreground leading-relaxed">
                Traditional app development requires years of programming expertise, large budgets, and extended 
                timelines. Our no-code platform eliminates these barriers, enabling anyone with a vision to build 
                sophisticated AI applications through visual interfaces and pre-built components.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Empowering Non-Technical Innovators</h3>
              <p className="text-muted-foreground leading-relaxed">
                Business leaders, designers, and domain experts can now directly translate their expertise into 
                functional applications. This shift accelerates innovation by removing the technical bottleneck 
                between idea conception and implementation.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Transform Ideas Section */}
      <ContentSection 
        title="Transform Ideas into Powerful AI Applications Without Coding" 
        id="transform"
        bgColor="bg-muted/20"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-smooth border-border">
              <CardContent className="pt-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      {/* Feature Comparison Table */}
      <ContentSection 
        title="Essential Features of Our No-Code App Builder Platform" 
        id="features"
        bgColor="bg-background"
      >
        <FeatureTable />
        
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Visual Development Environment</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                Drag-and-drop interface for rapid prototyping
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                Real-time preview of changes
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                Pre-built templates and components
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                Customizable design system
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">AI-Powered Capabilities</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                Natural language processing integration
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                Machine learning model deployment
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                Automated data analysis and insights
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                Intelligent automation workflows
              </li>
            </ul>
          </div>
        </div>
      </ContentSection>

      {/* Mobile Apps Section */}
      <ContentSection 
        title="Build Sophisticated Mobile Apps for iOS and Android" 
        id="mobile"
        bgColor="bg-muted/20"
      >
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Create native mobile applications that deliver exceptional user experiences on both iOS and Android 
          platforms. Our platform handles all the technical complexity, allowing you to focus on design and 
          functionality.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="text-center hover:shadow-lg transition-smooth">
            <CardContent className="pt-8 pb-8">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <p className="text-muted-foreground">Faster Development</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-smooth">
            <CardContent className="pt-8 pb-8">
              <div className="text-4xl font-bold text-primary mb-2">$50K+</div>
              <p className="text-muted-foreground">Average Cost Savings</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-smooth">
            <CardContent className="pt-8 pb-8">
              <div className="text-4xl font-bold text-primary mb-2">100K+</div>
              <p className="text-muted-foreground">Apps Built</p>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      {/* Real-World Applications Section */}
      <ContentSection 
        title="Real-World Applications for AI-Powered Solutions" 
        id="use-cases"
        bgColor="bg-background"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Healthcare & Telemedicine</h3>
              <p className="text-muted-foreground">
                Build patient management systems, appointment scheduling apps, and AI-powered diagnostic tools 
                that improve healthcare delivery and patient outcomes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">E-commerce & Retail</h3>
              <p className="text-muted-foreground">
                Create intelligent shopping experiences with personalized recommendations, inventory management, 
                and automated customer service powered by AI.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Education & E-Learning</h3>
              <p className="text-muted-foreground">
                Develop interactive learning platforms with adaptive content delivery, student progress tracking, 
                and AI-powered tutoring systems.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Finance & Banking</h3>
              <p className="text-muted-foreground">
                Build secure financial applications with fraud detection, automated reporting, and intelligent 
                investment recommendations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Marketing & Analytics</h3>
              <p className="text-muted-foreground">
                Create data-driven marketing tools with predictive analytics, customer segmentation, and automated 
                campaign optimization.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Operations & Logistics</h3>
              <p className="text-muted-foreground">
                Streamline operations with AI-powered supply chain management, route optimization, and predictive 
                maintenance systems.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      <Footer />
    </div>
  );
};

export default Index;
