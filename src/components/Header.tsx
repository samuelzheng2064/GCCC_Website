import { useState, useEffect } from "react";
import { Language, Page } from "../types";
import GcccMark from "./GcccMark";
import { Menu, X, Globe } from "lucide-react";

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentPage: Page;
  onPageChange: (page: Page) => void;
  onReplayIntro?: () => void;
  introPlaying: boolean;
}

export default function Header({
  currentLang,
  onLanguageChange,
  currentPage,
  onPageChange,
  introPlaying,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = {
    navHome: { en: "Home", zh: "首頁" },
    navAbout: { en: "About Us", zh: "關於我們" },
    navSermons: { en: "Sermons", zh: "主日講道" },
    navFellowships: { en: "Fellowships", zh: "團契生活" },
    navCalendar: { en: "Schedule", zh: "聚會日程" },
    navContact: { en: "Contact Us", zh: "聯絡我們" },
    wordmarkZh: "甘城華人教會",
    wordmarkEn: "GCCC FL",
  };

  const navItems: { label: { en: string; zh: string }; page: Page }[] = [
    { label: t.navHome, page: "home" },
    { label: t.navAbout, page: "about" },
    { label: t.navSermons, page: "sermons" },
    { label: t.navFellowships, page: "fellowships" },
    { label: t.navCalendar, page: "calendar" },
    { label: t.navContact, page: "contact" },
  ];

  const handleNav = (page: Page) => {
    setMobileMenuOpen(false);
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      id="gccc_header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FBF7EF]/95 backdrop-blur-md shadow-md border-b border-[#E7B7A0]/20 py-2"
          : "bg-[#FBF7EF]/80 backdrop-blur-sm py-4"
      } ${introPlaying ? "opacity-0 pointer-events-none" : "opacity-100 animate-fade-in"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Wordmark */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNav("home")}
          >
            <div className="transform transition-transform duration-300 group-hover:scale-105">
              <GcccMark width={44} height={46} strokeColor="#9A2B27" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-wider text-[#33271E] leading-tight">
                {t.wordmarkZh}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-[#6F685B] font-medium uppercase leading-tight">
                {t.wordmarkEn}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-3">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`font-sans text-sm font-medium px-3 py-2 rounded-md transition-colors relative group ${
                  currentPage === item.page
                    ? "text-[#9A2B27]"
                    : "text-[#33271E] hover:text-[#9A2B27]"
                }`}
              >
                {item.label[currentLang]}
                <span
                  className={`absolute bottom-1 left-3 right-3 h-[2px] bg-[#9A2B27] transition-transform duration-300 origin-center ${
                    currentPage === item.page
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center bg-[#E7B7A0]/20 p-1 rounded-full" id="lang-toggle-container">
              <Globe className="w-3.5 h-3.5 text-[#6F685B] ml-2 mr-1 hidden sm:inline" />
              <button
                onClick={() => onLanguageChange("en")}
                className={`text-xs px-2.5 py-1 rounded-full font-sans transition-all font-semibold ${
                  currentLang === "en" ? "bg-[#9A2B27] text-white shadow-sm" : "text-[#33271E] hover:text-[#3d3c3c]"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange("zh")}
                className={`text-xs px-2.5 py-1 rounded-full font-sans transition-all font-semibold ${
                  currentLang === "zh" ? "bg-[#9A2B27] text-white shadow-sm" : "text-[#33271E] hover:text-[#9A2B27]"
                }`}
              >
                中文
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-[#33271E] hover:text-[#9A2B27] hover:bg-[#E7B7A0]/10 transition-colors"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#FBF7EF] border-b border-[#E7B7A0]/20 ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNav(item.page)}
              className={`block w-full text-left px-4 py-2.5 rounded-md text-base font-medium transition-all ${
                currentPage === item.page
                  ? "bg-[#9A2B27]/10 text-[#9A2B27]"
                  : "text-[#33271E] hover:bg-[#E7B7A0]/10 hover:text-[#9A2B27]"
              }`}
            >
              {item.label[currentLang]}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
