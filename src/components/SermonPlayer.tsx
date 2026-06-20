import { Language } from "../types";
import { currentSermons } from "../data";

interface SermonPlayerProps {
  currentLang: Language;
}

export default function SermonPlayer({ currentLang }: SermonPlayerProps) {
  const t = {
    chinese: { en: "Chinese", zh: "中文" },
    english: { en: "English", zh: "英文" },
  };

  return (
    <div className="flex flex-col gap-10">
      {currentSermons.map((sermon) => {
        const hasChinese = !!sermon.youtubeLink;
        const hasEnglish = !!sermon.englishYoutubeLink;

        return (
          <div key={sermon.id} className="flex flex-col gap-4">
            {/* Sermon title + date */}
            <div>
              <p className="font-mono text-xs text-[#9A2B27] uppercase tracking-widest mb-1">
                {sermon.date}
                {sermon.speaker[currentLang] ? ` · ${sermon.speaker[currentLang]}` : ""}
              </p>
              <h3 className="font-serif text-2xl md:text-3xl text-[#33271E] font-bold tracking-tight">
                {sermon.title[currentLang]}
              </h3>
            </div>

            {/* Video cards — only render cards that have a link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hasChinese && (
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs text-[#6F685B] uppercase tracking-widest">
                    {t.chinese[currentLang]}
                  </span>
                  <div className="aspect-video rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                    <iframe
                      className="w-full h-full"
                      src={sermon.youtubeLink}
                      title={`${sermon.title[currentLang]} — Chinese`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {hasEnglish && (
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs text-[#6F685B] uppercase tracking-widest">
                    {t.english[currentLang]}
                  </span>
                  <div className="aspect-video rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                    <iframe
                      className="w-full h-full"
                      src={sermon.englishYoutubeLink}
                      title={`${sermon.title[currentLang]} — English`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
