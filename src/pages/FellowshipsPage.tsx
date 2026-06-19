import { Language } from "../types";
import FellowshipGrid from "../components/FellowshipGrid";

interface FellowshipsPageProps {
  currentLang: Language;
}

export default function FellowshipsPage({ currentLang }: FellowshipsPageProps) {
  return (
    <section
      id="fellowships"
      className="py-20 md:py-28 bg-[#F5EFE3] px-4 sm:px-6 lg:px-8 border-y border-[#E7B7A0]/25 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <FellowshipGrid currentLang={currentLang} />
      </div>
    </section>
  );
}
