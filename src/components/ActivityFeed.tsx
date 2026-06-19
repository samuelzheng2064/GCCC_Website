import { useState } from "react";
import { Activity, Language } from "../types";
import { activitiesData } from "../data";
import { MapPin, Clock, ChevronLeft, ChevronRight, X } from "lucide-react";

interface ActivityCardProps {
  activity: Activity;
  currentLang: Language;
}

function ActivityCard({ activity, currentLang }: ActivityCardProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const hasMultiple = activity.photos.length > 1;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((i) => (i - 1 + activity.photos.length) % activity.photos.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((i) => (i + 1) % activity.photos.length);
  };

  const dateObj = new Date(activity.date + "T00:00:00");
  const dateLabel = dateObj.toLocaleDateString(currentLang === "zh" ? "zh-TW" : "en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const activityDay = new Date(activity.date + "T00:00:00");
  activityDay.setHours(0, 0, 0, 0);
  const diffDays = Math.round((activityDay.getTime() - today.getTime()) / 86400000);
  const badge =
    diffDays === 0
      ? { label: currentLang === "en" ? "Today" : "今天", cls: "bg-[#9A2B27] text-white" }
      : diffDays > 0 && diffDays <= 7
      ? { label: currentLang === "en" ? `In ${diffDays}d` : `${diffDays}天後`, cls: "bg-[#E7B7A0]/20 text-[#E7B7A0] border border-[#E7B7A0]/30" }
      : null;

  return (
    <>
      <div
        className="group flex flex-col rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]"
        style={{ background: "linear-gradient(160deg,#2A1F16 0%,#1A1209 100%)" }}
      >
        {/* Photo */}
        <div
          className="relative aspect-[4/3] overflow-hidden cursor-pointer"
          onClick={() => setLightbox(true)}
        >
          <img
            src={activity.photos[photoIndex]}
            alt={activity.title[currentLang]}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Multi-photo nav */}
          {hasMultiple && (
            <>
              <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {activity.photos.map((_, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); setPhotoIndex(i); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === photoIndex ? "bg-white scale-125" : "bg-white/40"}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Fellowship tag */}
          <span className="absolute top-3 left-3 font-mono text-[10px] font-bold text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10 tracking-wider">
            {activity.fellowship[currentLang]}
          </span>

          {/* Today / soon badge */}
          {badge && (
            <span className={`absolute top-3 right-3 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full ${badge.cls}`}>
              {badge.label}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="relative p-5 flex flex-col gap-2.5">
          <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-[#E7B7A0]/20 to-transparent" />

          <h3 className="font-serif text-[#FBF7EF] font-bold text-lg leading-snug group-hover:text-[#E7B7A0] transition-colors">
            {activity.title[currentLang]}
          </h3>

          {activity.description && (
            <p className="text-sm text-[#FBF7EF]/60 font-sans leading-relaxed line-clamp-2">
              {activity.description[currentLang]}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-1 pt-3 border-t border-[#E7B7A0]/10">
            <span className="font-mono text-[11px] text-[#E7B7A0]/70 flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {dateLabel}{activity.time ? ` · ${activity.time}` : ""}
            </span>
            {activity.location && (
              <span className="font-mono text-[11px] text-[#E7B7A0]/70 flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                {activity.location[currentLang]}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightbox(false)}>
          <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all" onClick={() => setLightbox(false)}>
            <X className="w-5 h-5" />
          </button>
          <img
            src={activity.photos[photoIndex]}
            alt={activity.title[currentLang]}
            className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          {hasMultiple && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev(e); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); next(e); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

interface ActivityFeedProps {
  currentLang: Language;
}

export default function ActivityFeed({ currentLang }: ActivityFeedProps) {
  if (activitiesData.length === 0) return null;

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <span className="font-mono text-xs text-[#9A2B27] uppercase tracking-widest font-bold block mb-1">
          {currentLang === "en" ? "Fellowship Life" : "團契生活動態"}
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-[#33271E] font-bold tracking-tight">
          {currentLang === "en" ? "What's Happening" : "近期活動"}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activitiesData.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} currentLang={currentLang} />
        ))}
      </div>
    </section>
  );
}
