import React from "react";
import { ArrowRight } from "lucide-react";

interface CtaBannerProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ title, description, buttonText, href }) => {
  return (
    <div className="w-full bg-pine-800 rounded-2xl p-8 md:p-10 my-8 shadow-sm text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
      {/* Background graphic */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-earth/10 rounded-full -mr-16 -mt-16 pointer-events-none" />
      <div className="absolute left-1/4 bottom-0 w-32 h-32 bg-white/5 rounded-full -ml-8 -mb-8 pointer-events-none" />

      <div className="space-y-2 max-w-2xl text-center md:text-left z-10">
        <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
          {title}
        </h3>
        <p className="text-white/75 text-base md:text-lg max-w-xl font-sans leading-relaxed">
          {description}
        </p>
      </div>
      <a
        id="cta-banner-btn"
        href={href}
        target={href.startsWith("/") ? undefined : "_blank"}
        rel={href.startsWith("/") ? undefined : "noopener"}
        className="shrink-0 bg-earth hover:bg-[#E19224] text-pine-900 font-sans font-bold text-base px-6 py-3.5 rounded-lg shadow-md transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2"
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
};
