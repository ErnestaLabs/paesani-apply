import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ShieldCheck, Phone, PhoneOff, Loader2 } from "lucide-react";
import { WebCall } from "@tixae-labs/web-sdk";

type CallState = "idle" | "connecting" | "live" | "ending";

export default function Home() {
  const voiceRef = useRef<WebCall | null>(null);
  const [callState, setCallState] = useState<CallState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      try {
        voiceRef.current?.endCall?.();
      } catch {}
    };
  }, []);

  const ensureVoice = async (): Promise<WebCall> => {
    if (voiceRef.current) return voiceRef.current;
    console.log("[voice] Constructing WebCall…");
    const voice = new WebCall();

    voice.on("call-start", () => {
      console.log("[voice] call-start");
      setCallState("live");
    });
    voice.on("call-ended", () => {
      console.log("[voice] call-ended");
      setCallState("idle");
    });
    voice.on("error", (data: any) => {
      console.error("[voice] error event:", data);
      const msg = (data && (data.message || data.error || JSON.stringify(data))) || "unknown error";
      setErrorMsg(`Voice error: ${msg}`);
      setCallState("idle");
    });
    voice.on("final_transcript", (data: any) => console.log("[voice] final_transcript", data));
    voice.on("conversation-update", (data: any) => console.log("[voice] conversation-update", data));

    console.log("[voice] init({ agentId: kwrBxawDy7WuG8G7vpu7, region: eu })…");
    await voice.init({ agentId: "kwrBxawDy7WuG8G7vpu7", region: "eu" });
    console.log("[voice] init complete");
    voiceRef.current = voice;
    return voice;
  };

  const handleClick = async () => {
    setErrorMsg(null);
    try {
      if (callState === "live") {
        setCallState("ending");
        console.log("[voice] endCall()…");
        await voiceRef.current?.endCall();
        return;
      }
      setCallState("connecting");
      const voice = await ensureVoice();
      console.log("[voice] startCall()…");
      await voice.startCall();
      console.log("[voice] startCall resolved");
    } catch (err: any) {
      console.error("[voice] handleClick error:", err);
      const msg = err?.message || err?.toString?.() || "unknown";
      setErrorMsg(`Call failed: ${msg}`);
      setCallState("idle");
    }
  };

  const isLive = callState === "live";
  const isBusy = callState === "connecting" || callState === "ending";

  return (
    <div className="relative min-h-screen w-full bg-[#060E1F] text-slate-100 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
      {/* Left Content Column */}
      <div className="flex-1 flex flex-col justify-between p-8 md:p-16 lg:p-24 relative z-10 max-w-2xl lg:max-w-3xl">
        {/* Logo and Brand Badge */}
        <div className="flex items-center gap-4 animate-fade-in">
          <div
            className="w-16 h-16 shrink-0"
            role="img"
            aria-label="Paesani Logo"
            style={{
              backgroundImage: 'url(/logo.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundColor: '#060E1F',
              backgroundBlendMode: 'screen',
            }}
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

          {/* Core Benefit Pillars */}
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

          {/* Primary CTA — Voice Call */}
          <div className="mt-4">
            <button
              onClick={handleClick}
              disabled={isBusy}
              className={`group inline-flex items-center justify-center gap-3 font-bold px-8 py-4 rounded-lg shadow-lg transition-all duration-200 text-base md:text-lg cursor-pointer disabled:cursor-wait disabled:opacity-80 ${
                isLive
                  ? "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white shadow-red-500/20 hover:shadow-red-500/30"
                  : "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-[#060E1F] shadow-amber-500/10 hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {callState === "connecting" && (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connecting…
                </>
              )}
              {callState === "ending" && (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Ending…
                </>
              )}
              {callState === "live" && (
                <>
                  <PhoneOff className="w-5 h-5" />
                  End Call
                </>
              )}
              {callState === "idle" && (
                <>
                  <Phone className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  Talk To An Advisor Now
                </>
              )}
            </button>
            <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-500/60" />
              Free 2-minute eligibility call • No commitment
            </p>
            {errorMsg && (
              <p className="text-xs text-red-400 mt-2">{errorMsg}</p>
            )}
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

      {/* Right Column: Visual Academic Hero (Hidden on mobile) */}
      <div className="hidden md:block flex-1 relative min-h-screen bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#060E1F] via-transparent to-transparent z-10 w-1/3" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060E1F]/80 z-10" />
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663101347649/nUEGTEn9yRZ3J2wLy6iuiv/paesani_academic_hero-etDzUHtGBDmpmeBSPh8X9K.webp"
          alt="Paesani Student Advisory"
          className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-[4000ms] ease-out"
        />
      </div>
    </div>
  );
}
