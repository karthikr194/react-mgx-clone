import { ReactNode } from "react";

interface ContentSectionProps {
  title: string;
  children: ReactNode;
  bgColor?: string;
  id?: string;
}

const ContentSection = ({ title, children, bgColor = "bg-background", id }: ContentSectionProps) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-fade-in">
          {title}
        </h2>
        <div className="animate-slide-up">{children}</div>
      </div>
    </section>
  );
};

export default ContentSection;
