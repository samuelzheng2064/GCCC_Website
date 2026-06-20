import { useState, useEffect } from "react";
import { Language, Page } from "./types";
import { siteSettings } from "./data";
import GcccIntro from "./components/GcccIntro";
import Header from "./components/Header";
import GcccMark from "./components/GcccMark";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FellowshipsPage from "./pages/FellowshipsPage";
import CalendarPage from "./pages/CalendarPage";
import ContactPage from "./pages/ContactPage";
import { Heart, MapPin, Mail, Youtube, CheckCircle, Sparkles } from "lucide-react";

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>("zh");
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [introPlaying, setIntroPlaying] = useState(true);
  const [forceReplayKey, setForceReplayKey] = useState(0);
  const [showNewHereModal, setShowNewHereModal] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("gccc_intro_seen");
    if (seen) setIntroPlaying(false);
  }, [forceReplayKey]);

  const handleReplayIntro = () => {
    sessionStorage.removeItem("gccc_intro_seen");
    setIntroPlaying(true);
    setForceReplayKey((prev) => prev + 1);
  };

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const t = {
    visitorModalTitle: { en: "Welcome to GCCC!", zh: "熱忱歡迎您來到甘城華人教會！" },
    visitorModalSub: { en: "Frequently Asked Questions for Guests", zh: "為新走入教會的朋友解答以下心中常問的多個問題" },
    visitorQ1: { en: "What language is spoken?", zh: "我們聚會使用什麼語言？" },
    visitorA1: { en: "Our Sunday Service is joint bilingual (English and Mandarin Chinese) with live translations for sermons and messages.", zh: "我們的主日崇拜、報告與講道採取雙語（中文普通話與英文）同步翻譯，中英文會眾都能融洽得造就。" },
    visitorQ2: { en: "Is there a program for children?", zh: "我的孩子能參與什麼活動？" },
    visitorA2: { en: "Yes! We run Children's Sunday School (9:30 AM) and provide loving child supervision and youth groups during worship services.", zh: "絕對有！我們在每週日上午 9:30 設有各年齡層的孩子主日學，在崇拜時間亦有專為兒童照看與青少年陪伴預備的輔助事工。" },
    visitorQ3: { en: "Do I need to sign up for Friday dinner?", zh: "週五學生與學者晚餐需要提前預約嗎？" },
    visitorA3: { en: "No sign ups required. Just show up! Dinner starts at 6:30 PM in the Fellowship Hall. We would love to serve you.", zh: "完全不需要！每週五傍晚 6:30 供應愛宴，直接前來走入教會副堂即可，我們期待為您奉上暖胃家常菜！" },
    footerDesc: {
      en: "GCCC Gainesville is a Bible-teaching church community. Our door is open to seekers and believers alike.",
      zh: "甘城華人教會是以聖經神治與恩惠真理為講台核心的基督徒社群，無論您是信仰探求者，還是尋覓屬靈家園的同工，我們均溫馨守候。",
    },
    socialLinks: { en: "Social Media Channels & Resources", zh: "常用社群渠道與資源連結" },
    rights: { en: "All Rights Reserved", zh: "甘城華人基督教會 版權所有" },
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
      case "sermons":
        return (
          <HomePage
            currentLang={currentLang}
            onNavigateTo={handlePageChange}
          />
        );
      case "about":
        return <AboutPage currentLang={currentLang} />;
      case "fellowships":
        return <FellowshipsPage currentLang={currentLang} />;
      case "calendar":
        return <CalendarPage currentLang={currentLang} />;
      case "contact":
        return <ContactPage currentLang={currentLang} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7EF] flex flex-col selection:bg-[#9A2B27]/30 selection:text-[#33271E]">

      <GcccIntro key={forceReplayKey} forceReplay={introPlaying} onDone={() => setIntroPlaying(false)} />

      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onReplayIntro={handleReplayIntro}
        introPlaying={introPlaying}
      />

      <main className={`flex-grow transition-opacity duration-700 ${introPlaying ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        {renderPage()}
      </main>

      <footer className="bg-[#191512] text-[#F9F6ED] py-16 px-4 sm:px-6 lg:px-8 border-t-2 border-[#9A2B27]/40 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 border-b border-[#E7B7A0]/10 pb-12 mb-12">
          <div className="flex flex-col items-center md:items-start gap-3">
            <button className="flex items-center gap-2.5 cursor-pointer" onClick={() => handlePageChange("home")}>
              <GcccMark width={36} height={38} strokeColor="#9A2B27" />
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-wider text-white">甘城華人教會</span>
                <span className="font-mono text-[9px] tracking-widest text-[#E7B7A0] uppercase font-light">Gainesville Chinese Christian Church</span>
              </div>
            </button>
            <p className="text-xs text-neutral-400 font-serif leading-relaxed text-center md:text-left max-w-sm mt-2">
              {t.footerDesc[currentLang]}
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-3">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#E7B7A0] font-semibold">
              {t.socialLinks[currentLang]}
            </span>
            <div className="flex items-center gap-3">
              <a href={siteSettings.youtubeLiveUrl} target="_blank" rel="noopener noreferrer"
                className="bg-red-700/10 hover:bg-red-700/30 p-2.5 rounded-full border border-red-700/30 text-red-500 hover:text-red-400 transition-colors" title="GCCC YouTube Channels">
                <Youtube className="w-5 h-5" />
              </a>
              <a href={`mailto:${siteSettings.email}`}
                className="bg-neutral-800 hover:bg-neutral-700 p-2.5 rounded-full border border-[#E7B7A0]/10 text-[#E7B7A0] hover:text-white transition-colors" title="Email Us">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://maps.google.com/?q=3425+SW+2nd+Ave,+Gainesville,+FL+32607" target="_blank" rel="noopener noreferrer"
                className="bg-neutral-800 hover:bg-neutral-700 p-2.5 rounded-full border border-[#E7B7A0]/10 text-[#E7B7A0] hover:text-white transition-colors" title="Church Location Map">
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 font-mono">
          <span>&copy; {new Date().getFullYear()} {t.rights[currentLang]}. 3425 SW 2nd Ave, Gainesville, FL 32607.</span>
          <button
            onClick={handleReplayIntro}
            className="inline-flex items-center gap-1.5 text-[#9A2B27] hover:text-red-500 border border-[#9A2B27]/40 hover:border-[#9A2B27] px-3.5 py-1.5 rounded-full bg-neutral-900 transition-all cursor-pointer font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentLang === "en" ? "Replay Drawing Intro" : "重新播放手繪動畫"}</span>
          </button>
        </div>
      </footer>

      {showNewHereModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowNewHereModal(false)}>
          <div className="bg-[#FBF7EF] text-[#33271E] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-[#E7B7A0]/30 animate-fade-in relative max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="bg-[#33271E] text-[#FBF7EF] px-6 py-5 md:px-8 border-b border-[#E7B7A0]/20 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#9A2B27] fill-[#9A2B27]" />
                <div>
                  <h4 className="font-serif text-lg font-bold text-white">{t.visitorModalTitle[currentLang]}</h4>
                  <span className="text-[10px] font-mono tracking-wider text-[#E7B7A0] block uppercase">{t.visitorModalSub[currentLang]}</span>
                </div>
              </div>
              <button onClick={() => setShowNewHereModal(false)} className="bg-black/40 hover:bg-black/60 text-[#FBF7EF] p-1.5 rounded-full transition-colors text-xs cursor-pointer">✕</button>
            </div>
            <div className="p-6 md:p-8 overflow-y-auto space-y-5 flex-grow">
              <div className="text-sm font-serif italic text-[#6F685B] border-b border-[#E7B7A0]/10 pb-4 mb-2 leading-relaxed">
                {currentLang === "zh"
                  ? "「若有人在基督裡，他就是新造的人，舊事已過，都變成新的了。」— 哥林多後書 5:17。我們非常期待與您建立深刻的連結，以下為您整理了初次來到本堂最實用的信息指南："
                  : "We are genuinely delighted you're exploring GCCC. Our hearts are packed with warmth and expectation as we look forward to shaking hands soon. Here are a handful of handy questions answered:"}
              </div>
              {([
                { q: t.visitorQ1, a: t.visitorA1, n: "Q1" },
                { q: t.visitorQ2, a: t.visitorA2, n: "Q2" },
                { q: t.visitorQ3, a: t.visitorA3, n: "Q3" },
              ] as const).map(({ q, a, n }) => (
                <div key={n} className="bg-white rounded-xl p-4 border border-[#E7B7A0]/25 shadow-sm">
                  <div className="flex gap-2.5 items-start">
                    <span className="font-mono text-xs font-black text-[#9A2B27] bg-[#9A2B27]/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">{n}</span>
                    <div>
                      <h5 className="font-serif font-bold text-sm sm:text-base text-[#33271E] leading-snug">{q[currentLang]}</h5>
                      <p className="text-xs sm:text-sm text-[#6F685B] mt-2 font-serif leading-relaxed">{a[currentLang]}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-[#E7B7A0]/15 p-4 rounded-xl border border-[#E7B7A0]/40 flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#9A2B27] shrink-0 mt-0.5" />
                <span className="text-xs font-sans text-[#33271E] leading-relaxed">
                  {currentLang === "zh"
                    ? "無需任何著裝限制 (No Dress Code)。聚會時穿著舒適、得體的便服即可。歡迎您和家人朋友前來，我們非常期待親自向您問好！"
                    : "No specific dress codes or prior bookings necessary. Dress in whatever casual, respectful clothing makes you feel comfortable. Looking forward to greeting you!"}
                </span>
              </div>
            </div>
            <div className="border-t border-[#E7B7A0]/20 p-4 bg-white flex justify-end shrink-0">
              <button onClick={() => setShowNewHereModal(false)} className="bg-[#33271E] hover:bg-neutral-800 text-[#FBF7EF] px-5 py-2 rounded-lg text-xs font-semibold shadow transition-all cursor-pointer">
                {currentLang === "en" ? "Got it, thanks!" : "我明白了，謝謝！"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
