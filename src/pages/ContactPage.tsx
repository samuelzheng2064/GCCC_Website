import { Language } from "../types";
import { siteSettings } from "../data";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";

interface ContactPageProps {
  currentLang: Language;
}

export default function ContactPage({ currentLang }: ContactPageProps) {
  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-[#211E18] text-[#FBF7EF] px-4 sm:px-6 lg:px-8 border-t border-[#E7B7A0]/20 min-h-screen"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
        <div className="flex flex-col gap-6">
          <div>
            <span className="font-mono text-xs text-[#E7B7A0] uppercase tracking-widest font-bold block mb-1">
              {currentLang === "en" ? "Get in Touch" : "甘城與你，愛中相遇"}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-bold tracking-tight">
              {currentLang === "en" ? "Contact Us" : "聯絡我們"}
            </h2>
            <p className="text-neutral-300 font-serif text-sm leading-relaxed mt-2.5 max-w-xl">
              我們深切重視您的回音。如果您想索取各團契查經小組的交通方式，有任何代禱需求，或是新學期面臨搬遷落腳、交通接送，請不吝聯絡。
            </p>
          </div>
          <div className="h-[2px] w-12 bg-[#9A2B27]" />
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-sm">
              <div className="bg-[#9A2B27]/20 p-2.5 rounded-lg text-[#E7B7A0]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-wider uppercase text-[#E7B7A0] block">
                  {currentLang === "en" ? "Address" : "教會堂址"}
                </span>
                <a
                  href="https://maps.google.com/?q=3425+SW+2nd+Ave,+Gainesville,+FL+32607"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-base text-[#FBF7EF] hover:text-[#E7B7A0] hover:underline"
                >
                  {siteSettings.address[currentLang]}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="bg-[#9A2B27]/20 p-2.5 rounded-lg text-[#E7B7A0]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-wider uppercase text-[#E7B7A0] block">
                  {currentLang === "en" ? "Email" : "電子郵件"}
                </span>
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="font-serif text-base text-[#FBF7EF] hover:text-[#E7B7A0] hover:underline"
                >
                  {siteSettings.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="bg-[#9A2B27]/20 p-2.5 rounded-lg text-[#E7B7A0]">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-wider uppercase text-[#E7B7A0] block">
                  {currentLang === "en" ? "Phone Call" : "電話號碼"}
                </span>
                <a
                  href={`tel:${siteSettings.phone.replace(/\D/g, "")}`}
                  className="font-serif text-base text-[#FBF7EF] hover:text-[#E7B7A0] hover:underline"
                >
                  {siteSettings.phone}
                </a>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <a
              href="https://maps.google.com/?q=3425+SW+2nd+Ave,+Gainesville,+FL+32607"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#9A2B27] hover:bg-[#80221E] text-white px-5 py-3 rounded-lg text-xs font-semibold shadow transition-all transform hover:-translate-y-0.5"
            >
              <span>{currentLang === "en" ? "Navigate in Google Maps" : "在谷歌地圖中導航"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-neutral-900/40 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2m3!1s0x88e8a38c2323cc67%3A0xc3f8373b7541b61c!2s3425+SW+2nd+Ave%2s+Gainesville%2s+FL+32607!5e0!3m2!1sen!2sus!4v15456!5m2!1sen!2sus"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ border: 0, filter: "grayscale(10%) invert(90%) contrast(100%) brightness(100%)" }}
            allowFullScreen
            loading="lazy"
            title="GCCC Street MapLocation"
          />
        </div>
      </div>
    </section>
  );
}
