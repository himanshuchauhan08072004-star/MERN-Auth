import { Github, ShieldCheck } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-surface-border mt-24">
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-text-secondary text-sm">
        <ShieldCheck size={16} className="text-accent" />
        <span>MERNAuth — two-token authentication reference implementation</span>
      </div>
      <a
        href="https://github.com"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <Github size={16} />
        Source
      </a>
    </div>
  </footer>
);

export default Footer;
