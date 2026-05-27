import { useEffect } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export default function Home() {
  useEffect(() => {
    // Ensure the Typeform embed script initializes if already loaded on mount
    if (window.window && (window as any).Typeform) {
      (window as any).Typeform.load();
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#060E1F] text-slate-100 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
      {/* Viewport Gold Frame (Editorial Aesthetic) */}
      <div className="absolute inset-0 border-[8px] md:border-[16px] border-[#060E1F] pointer-events-none z-50">
        <div className="w-full h-full border border-amber-500/10 pointer-events-none" />
      </div>

      {/* Left Content Column */}
      <div className="flex-1 flex flex-col justify-between p-8 md:p-16 lg:p-24 relative z-10 max-w-2xl lg:max-w-3xl">
        {/* Logo and Brand Badge */}
        <div className="flex items-center gap-4 animate-fade-in">
          <img 
            src="/logo.png"
            alt="Paesani Logo" 
            className="w-16 h-16 object-contain shrink-0"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-500/90">
                PAESANI.CO.UK
              </span>
            </div>
            <span className="text-[10px] text-slate-400 tracking-wider">
              Educational Support Services
            </span>
          </div>
        </div>

        {/* Core Direct-Response Copy block */}
        <div className="my-auto py-12 md:py-0 flex flex-col gap-6 md:gap-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] md:leading-[1.1]">
            Get <span className="text-amber-400 font-semibold italic">£14,000/yr</span> (or more) from the UK Government to fund your life.
          </h1>

          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-xl font-light">
            If you are a British citizen, an EU national with 3+ years in the UK, or a Ukrainian refugee, you qualify for full university funding. Study flexible courses around your schedule. No upfront costs. We handle the paperwork.
          </p>

          {/* Core Benefit Pillars (Alex Hormozi Style) */}
          <div className="flex flex-col gap-4 my-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white text-sm md:text-base">Fully Government Funded</p>
                <p className="text-xs md:text-sm text-slate-400">Zero upfront tuition fees. SFE pays the university directly.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white text-sm md:text-base">No Diploma Required</p>
                <p className="text-xs md:text-sm text-slate-400">No formal qualifications? We match you based on work experience.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white text-sm md:text-base">Direct Cash Maintenance Loans</p>
                <p className="text-xs md:text-sm text-slate-400">Receive living cost funding directly into your bank account.</p>
              </div>
            </div>
          </div>

          {/* Primary CTA (Launches Typeform Modal) */}
          <div className="mt-4">
            <button
              data-tf-popup="Zb6esxWx"
              data-tf-opacity="100"
              data-tf-size="100"
              data-tf-iframe-props="title=Paesani Multi-Course Lead Form"
              data-tf-transitive-search-params=""
              data-tf-medium="snippet"
              data-tf-redirect-on-submit="https://paesani.co.uk"
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-[#060E1F] font-bold px-8 py-4 rounded-lg shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-base md:text-lg cursor-pointer"
            >
              See If You Qualify
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-500/60" />
              Takes only 2 minutes • Completely free advisory
            </p>
          </div>
        </div>

        {/* Footer info with Companies House compliance */}
        <div className="text-[11px] text-slate-500 font-light tracking-wide flex flex-col gap-2 w-full pt-6 border-t border-amber-500/5">
          <div className="flex justify-between items-center w-full">
            <span>© 2026 PAESANI CONSULTING LTD</span>
            <a
              href="https://paesani.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500/70 hover:text-amber-500 transition-colors duration-150 font-medium"
            >
              paesani.co.uk
            </a>
          </div>
          <p className="leading-normal text-slate-600 text-[10px]">
            PAESANI CONSULTING LTD is a registered private limited company in England and Wales (Company No. 17195580). Registered office: 66 Paul Street, London, England, EC2A 4NA. Registered SIC Code: 85600 (Educational support services).
          </p>
        </div>
      </div>

      {/* Right Column: Visual Academic Hero (Hidden on mobile to preserve single-screen density) */}
      <div className="hidden md:block flex-1 relative min-h-screen bg-slate-900 overflow-hidden">
        {/* Editorial overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060E1F] via-transparent to-transparent z-10 w-1/3" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060E1F]/80 z-10" />
        
        {/* High-quality generated background image */}
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663101347649/nUEGTEn9yRZ3J2wLy6iuiv/paesani_academic_hero-etDzUHtGBDmpmeBSPh8X9K.webp"
          alt="Paesani Student Advisory"
          className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-[4000ms] ease-out"
        />
      </div>
    </div>
  );
}
