import { useState } from "react";
import { Language } from "../types";
import { FileText, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

interface GainsvilleDewPageProps {
  currentLang: Language;
}

interface DewIssue {
  id: string;
  title: { en: string; zh: string };
  date: string;
  pdfUrl: string;
  description?: { en: string; zh: string };
}

// Add your PDF issues here — replace the placeholder URLs with actual PDF paths (e.g. "/pdfs/gainesville-dew-2024-01.pdf")
const dewIssues: DewIssue[] = [
  {
    id: "2024-12",
    title: { en: "Gainesville Dew — December 2024", zh: "甘城甘露 — 2024 年 12 月" },
    date: "2024-12-01",
    pdfUrl: "/pdfs/gainesville-dew-2024-12.pdf",
    description: {
      en: "December 2024 issue of the Gainesville Dew newsletter.",
      zh: "2024 年 12 月甘城甘露電子報。",
    },
  },
  {
    id: "2024-11",
    title: { en: "Gainesville Dew — November 2024", zh: "甘城甘露 — 2024 年 11 月" },
    date: "2024-11-01",
    pdfUrl: "/pdfs/gainesville-dew-2024-11.pdf",
    description: {
      en: "November 2024 issue of the Gainesville Dew newsletter.",
      zh: "2024 年 11 月甘城甘露電子報。",
    },
  },
];

function formatDate(dateStr: string, lang: Language) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(lang === "zh" ? "zh-TW" : "en-US", {
    year: "numeric",
    month: "long",
  });
}

export default function GainsvilleDewPage({ currentLang }: GainsvilleDewPageProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    dewIssues.length > 0 ? dewIssues[0].id : null
  );

  const t = {
    eyebrow: { en: "Newsletter", zh: "電子報" },
    title: { en: "Gainesville Dew", zh: "甘城甘露" },
    subtitle: {
      en: "Our church newsletter — faith, community, and updates from GCCC.",
      zh: "教會電子報，包含信仰反思、團體消息與最新動態。",
    },
    openPdf: { en: "Open PDF", zh: "開啟 PDF" },
    noIssues: {
      en: "No issues available yet. Check back soon!",
      zh: "目前尚無期刊，請稍後再來！",
    },
  };

  return (
    <>
      {/* HERO */}
      <section className="relative bg-[#211E18] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-xs text-[#E7B7A0] uppercase tracking-widest font-bold block mb-3">
            {t.eyebrow[currentLang]}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold tracking-tight leading-tight mb-4">
            {t.title[currentLang]}
          </h1>
          <p className="text-white/60 text-lg font-light max-w-xl">
            {t.subtitle[currentLang]}
          </p>
        </div>
      </section>

      {/* ISSUES LIST */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {dewIssues.length === 0 ? (
          <p className="text-center text-gray-500 py-20">{t.noIssues[currentLang]}</p>
        ) : (
          <div className="space-y-4">
            {dewIssues.map((issue) => {
              const isExpanded = expandedId === issue.id;
              return (
                <div
                  key={issue.id}
                  className="bg-white rounded-2xl shadow-sm border border-black/8 overflow-hidden"
                >
                  {/* Header row — click to expand */}
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-black/[0.02] transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : issue.id)}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-[#9A2B27]/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#9A2B27]" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-serif font-semibold text-base sm:text-lg text-[#211E18] truncate">
                          {issue.title[currentLang]}
                        </p>
                        <p className="text-sm text-gray-500 font-mono mt-0.5">
                          {formatDate(issue.date, currentLang)}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-gray-400">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  {/* Expanded: PDF embed + open link */}
                  {isExpanded && (
                    <div className="border-t border-black/8 px-6 py-5 space-y-4 animate-fade-in">
                      {issue.description && (
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {issue.description[currentLang]}
                        </p>
                      )}

                      {/* PDF embed */}
                      <div className="rounded-xl overflow-hidden border border-black/10 bg-gray-50" style={{ height: "600px" }}>
                        <iframe
                          src={issue.pdfUrl}
                          title={issue.title[currentLang]}
                          className="w-full h-full"
                          style={{ border: "none" }}
                        />
                      </div>

                      {/* Open in new tab link */}
                      <a
                        href={issue.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#9A2B27] hover:text-[#7a2220] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {t.openPdf[currentLang]}
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
