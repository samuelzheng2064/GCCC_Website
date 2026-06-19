import { Language } from "../types";
import CalendarEmbed from "../components/CalendarEmbed";
import { Clock, Heart } from "lucide-react";

interface CalendarPageProps {
  currentLang: Language;
}

export default function CalendarPage({ currentLang }: CalendarPageProps) {
  return (
    <section id="calendar" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
        <div className="bg-[#33271E] text-white rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-[#E7B7A0]/10 shadow-xl min-h-[350px]">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#E7B7A0] font-bold">
              {currentLang === "en" ? "Sunday Logistics" : "崇拜與聚會後愛宴"}
            </span>
            <h4 className="font-serif text-2xl font-semibold leading-tight text-white">
              {currentLang === "zh"
                ? "主日同享愛宴，共享彼此生命契合"
                : "Fellowship lunch served right after Sunday Worship"}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 font-serif leading-relaxed">
              {currentLang === "zh"
                ? "崇拜（下午 12:15）結束後。備有熱飯熱菜供全體會眾免費同享！這是一次極好的機會，與牧長和在座弟兄姊妹彼此傾聽和熟悉。"
                : "Worship services are followed by a complimentary home-style luncheon. A fantastic setting to greet coordinators, seek guidance, or get acquainted with local friends."}
            </p>
          </div>
          <div className="border-t border-white/10 pt-4 mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-2.5 text-xs">
              <Clock className="w-4 h-4 text-[#E7B7A0]" />
              <span>{currentLang === "en" ? "Lunch starts: 12:20 PM every Sunday" : "午餐愛宴：崇拜結束後 (12:20 PM)"}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-300">
              <Heart className="w-4 h-4 text-[#9A2B27] fill-[#9A2B27]" />
              <span>{currentLang === "en" ? "100% Free & Open to All Visitors" : "免費供應，熱切期待您的加入一同聚餐"}</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <CalendarEmbed currentLang={currentLang} />
        </div>
      </div>
    </section>
  );
}
