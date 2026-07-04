import React from "react";
import { ArrowRight } from "lucide-react";

interface CtaBannerProps {
  title: string;
  description: string;
  buttonText: string;
  /** Link outbound về landing (kèm UTM) — dựng bằng buildLandingUrl (PRD §8.3). */
  href: string;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ title, description, buttonText, href }) => {
  return (
    <div className="w-full bg-[#D08620] hover:bg-[#C07B1D] transition-colors rounded-2xl p-8 md:p-10 my-8 shadow-sm text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
      {/* Background graphic */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
      <div className="absolute left-1/4 bottom-0 w-32 h-32 bg-white/5 rounded-full -ml-8 -mb-8 pointer-events-none" />

      <div className="space-y-2 max-w-2xl text-center md:text-left z-10">
        <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
          {title}
        </h3>
        <p className="text-amber-50 text-base md:text-lg max-w-xl font-sans leading-relaxed">
          {description}
        </p>
      </div>
      <a
        id="cta-banner-btn"
        href={href}
        target="_blank"
        rel="noopener"
        className="shrink-0 bg-white hover:bg-amber-50 text-[#9F5E08] font-sans font-bold text-base px-6 py-3.5 rounded-lg shadow-md transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2"
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
};
