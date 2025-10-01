import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Use Cases", href: "#use-cases" },
        { name: "Templates", href: "#templates" },
      ],
    },
    {
      title: "Learn",
      links: [
        { name: "Documentation", href: "#docs" },
        { name: "Tutorials", href: "#tutorials" },
        { name: "Blog", href: "#blog" },
        { name: "Webinars", href: "#webinars" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#help" },
        { name: "Community", href: "#community" },
        { name: "Contact Us", href: "#contact" },
        { name: "Status", href: "#status" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Partners", href: "#partners" },
        { name: "Press Kit", href: "#press" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-white transition-smooth text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Brand & Tagline */}
            <div className="text-center md:text-left">
              <p className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                MGX
              </p>
              <p className="text-sm text-gray-400">Build Your Ideas with Agents</p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-smooth">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-smooth">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>© 2025 MGX. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
