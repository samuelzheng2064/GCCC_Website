import { Language } from "../types";
import FellowshipGrid from "../components/FellowshipGrid";

interface FellowshipsPageProps {
  currentLang: Language;
}

const t = {
  title: { en: "Get Involved", zh: "在基督裡同心同行" },
};

export default function FellowshipsPage({ currentLang }: FellowshipsPageProps) {
  return (
    <>
      {/* HERO BANNER */}
      <section
        className="relative h-[55vh] min-h-85 flex items-end bg-cover bg-center"
        style={{
          backgroundImage: `url("/images/gccc_campus_1781744441184.jpg")`,
        }}
      >
        <div className="absolute inset-0 bg-neutral-900/50" />
        <div className="absolute inset-0 bg-linear-to-t from-[#211E18] via-[#211E18]/20 to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold tracking-tight leading-tight">
            {t.title[currentLang]}
          </h1>
        </div>
      </section>

      {/* GRID CONTENT */}
      <section
        id="fellowships"
        className="py-16 bg-[#eeecec] px-4 sm:px-6 lg:px-8 min-h-screen"
      >
        <div className="max-w-7xl mx-auto">
          <FellowshipGrid currentLang={currentLang} />
        </div>
      </section>
    </>
  );
}
