import { useState } from "react";
import { Language, Page } from "../types";
import GcccMark from "../components/GcccMark";
import SermonPlayer from "../components/SermonPlayer";
import { Info, ChevronRight } from "lucide-react";

interface HomePageProps {
  currentLang: Language;
  onNavigateTo: (page: Page) => void;
}

export default function HomePage({
  currentLang,
  onNavigateTo,
}: HomePageProps) {
  const [transitMode, setTransitMode] = useState<"walk" | "bus" | "car">("bus");

  const t = {
    heroScheduleSentence: {
      en: "Join us this Sunday: Sunday School at 9:30 AM | Bilingual Worship Service at 10:50 AM (In-Person & YouTube Live)",
      zh: "主日聚會日程：上午 9:30 兒童/成人主日學 | 上午 10:50 中英雙語聯合主日崇拜 (實體聚會 & 網路YouTube同步直播)",
    },
    UFStudentSectionTitle: {
      en: "University of Florida Focus",
      zh: "佛羅里達大學 (UF) 重點事工",
    },
    UFStudentSectionDesc: {
      en: "Located just minutes away from the UF campus, we provide undergraduate, graduate, and visiting scholars a secondary home. Enjoy healthy free meals, genuine community, and life-changing discipleship.",
      zh: "座落於佛羅里達大學（UF）校園旁。我們為本科生、研究生和訪問學人安排了豐富的港灣聚會：美味可口的週五愛宴、溫馨相扶的成長小組，與深度真誠的青年生活。",
    },
    directionsTitle: {
      en: "Getting to GCCC from UF",
      zh: "從佛羅里達大學 (UF) 前往教會",
    },
    directionsWalk: { en: "15 min walk from SW Recreation", zh: "從西南體育館步行約 15 分鐘" },
    directionsBus: { en: "Take RTS Bus 9, 34, or 35", zh: "搭乘甘城公交 9, 34 或 35 路" },
    directionsCar: { en: "5 mins drive down SW 2nd Ave", zh: "自 SW 2nd Ave 驅車僅 5 分鐘" },
  };

  return (
    <>
      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-[95vh] flex items-center pt-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
        style={{ backgroundImage: `url("/src/assets/images/hero.jpg")` }}
      >
        <div className="absolute inset-0 bg-neutral-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#211E18] via-[#211E18]/30 to-transparent" />

        <div className="relative z-10 w-full flex flex-col items-start gap-6 text-[#FBF7EF] py-12 md:py-24 animate-fade-in pl-[10%] pr-[10%] sm:pr-[35%]">
          <div className="bg-[#FBF7EF]/10 p-4 rounded-full border border-[#E7B7A0]/20 backdrop-blur-sm shadow-xl mb-2 hover:scale-105 transition-transform">
            <GcccMark width={60} height={63} strokeColor="#FBF7EF" />
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-tight">
            {currentLang === "en"
              ? "Welcome to Gainesville Chinese Christian Church"
              : "歡迎來到甘城華人教會"}
          </h1>

          <p className="font-mono text-xs sm:text-sm text-[#E7B7A0] tracking-widest leading-relaxed">
            {t.heroScheduleSentence[currentLang]}
          </p>
        </div>
      </section>

      {/* SERMONS — inline on home page for easy visitor access */}
      <section id="sermons" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="font-mono text-xs text-[#9A2B27] uppercase tracking-widest font-bold block mb-1">
            {currentLang === "en" ? "Spiritual Nourishment" : "主日神話語的造就"}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#33271E] font-bold tracking-tight">
            {currentLang === "en" ? "Recent Sermons" : "近期主日講道"}
          </h2>
        </div>
        <SermonPlayer currentLang={currentLang} />
      </section>

      {/* ABOUT — history & proclamation of faith */}
      <section id="about" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">

          {/* Left: image + proclamation */}
          <div className="flex flex-col gap-8">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative z-10">
                <img
                  src="/src/assets/images/gccc_sermon_1781744456768.jpg"
                  alt="Holy Bible on altar table"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-1/2 h-1/2 bg-[#E7B7A0]/40 rounded-2xl z-0" />
              <div className="absolute top-4 -left-4 w-20 h-20 border-t-4 border-l-4 border-[#9A2B27] z-0" />
            </div>

            {/* Proclamation of Faith */}
            <div className="bg-[#33271E] text-[#FBF7EF] rounded-2xl p-6 border border-[#E7B7A0]/10 shadow-xl">
              <span className="font-mono text-[10px] text-[#E7B7A0] uppercase tracking-[3px] font-bold block mb-4">
                {currentLang === "en" ? "Proclamation of Faith" : "信仰宣告"}
              </span>
              <div className="space-y-3 font-serif text-xs text-[#FBF7EF]/85 italic leading-relaxed">
                {currentLang === "en" ? (
                  <>
                    <p>I believe in God, the Father Almighty, Creator of heaven and earth.</p>
                    <p>I believe in Jesus Christ, God's only Son, our Lord; who was conceived by the Holy Spirit, born of the Virgin Mary; suffered under Pontius Pilate, was crucified, died, and was buried; he descended to the dead; on the third day he rose again; he ascended into heaven, he is seated at the right hand of the Father; and he will come again to judge the living and the dead.</p>
                    <p>I believe in the Holy Spirit; the holy catholic church, the communion of saints; the forgiveness of sins, the resurrection of the body; and the life everlasting. Amen.</p>
                  </>
                ) : (
                  <>
                    <p>我信上帝，全能的父，創造天地的主。</p>
                    <p>我信我主耶穌基督，上帝的獨生子；因著聖靈感孕，從童貞女馬利亞所生；在本丟彼拉多手下受難，被釘在十字架上，受死，埋葬；降在陰間；第三天從死里復活；祂升天，坐在全能父上帝的右邊；將來必從那里降臨，審判活人，死人。</p>
                    <p>我信聖靈；我信聖而公之教會；我信聖徒相通；我信罪得赦免；我信身體復活；我信永生。阿們！</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: full church history */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <span className="font-mono text-xs text-[#9A2B27] uppercase tracking-[3px] font-bold block mb-2">
                {currentLang === "en" ? "Who We Are" : "關於我們"}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#33271E] font-bold tracking-tight">
                {currentLang === "en" ? "History of Our Church" : "本教會歷史"}
              </h2>
            </div>
            <div className="h-1 w-16 bg-[#9A2B27]" />
            <div className="space-y-4 text-sm text-[#6F685B] font-serif leading-relaxed">
              {currentLang === "en" ? (
                <>
                  <p>In September 1970, several Chinese Christians started the Gainesville Chinese Bible Study Group. They met every Friday night at the Baptist Student Center — to fellowship through Bible study, prayer, and sharing, and to share the gospel with the Chinese community. Numbers grew from a little over 10 to 60–70 by the late 1980s.</p>
                  <p>In 1979, the First Baptist Church started an international Sunday school whose members were mainly from the Bible study group. In October 1988, Chinese Sunday worship service began at the First Baptist Church chapel, and in February 1989, GCCC was officially established. By the grace of God, we moved into our own church building in 2002, with adult attendance growing from about 40 to over 100.</p>
                  <p>Our congregation consists of people of all walks of life — mostly first- and second-generation Chinese immigrants, college students, graduate students, and their families. About five percent are non-Chinese and about one-third are second-generation Chinese immigrants more fluent in English. The adult worship service is conducted bilingually in Chinese and English.</p>
                  <p>This church has deep roots in Bible study. From that single Bible study group over fifty years ago, we now have four Sunday morning study groups, six on Friday nights, five fellowships, and a Bible Training Center for Pastors. We are students of the Holy Bible and disciples of Jesus Christ.</p>
                </>
              ) : (
                <>
                  <p>一九七零年九月，數位愛主的華人基督徒開始佛州大學的中文查經班。每週五晚上，在浸信會學生中心聚會，聯繫弟兄姊妹查經、禱告、分享，並傳揚福音給同胞同學。聚會人數從起初的十幾人到八十年代末已增至六、七十人。</p>
                  <p>一九七九年第一浸信教會開始以華人為主的國際主日學，成員都是查經班的弟兄姊妹。一九八八年十月，在第一浸信教會副堂開始中文主日崇拜；次年二月正式成立教會。蒙神的恩典，教會於二零零二年搬進自建教堂，成人崇拜人數由起初四十幾人增加到現在一百多人。</p>
                  <p>本教會會眾包含社會各階層及各年齡層，大部份是第一代及第二代華人移民、大學生、研究生及其眷屬。約有百份之五的非華人及三份之一說英語較流利的第二代移民，成人主日崇拜採中英雙語進行。</p>
                  <p>本教會的基礎深植於查經班。從五十多年前那一個查經班開始，現在主日有四個查經班、週五有六個查經班、五個團契及聖經牧訓班。我們是聖經的學生，是耶穌基督的門徒。</p>
                </>
              )}
            </div>
            <button
              onClick={() => onNavigateTo("fellowships")}
              className="mt-2 self-start inline-flex items-center gap-2 bg-[#9A2B27]/10 hover:bg-[#9A2B27]/20 text-[#9A2B27] px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border border-[#9A2B27]/20"
            >
              <span>{currentLang === "en" ? "Explore Our Fellowships" : "瞭解各團契生活"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* UF CAMPUS BILLBOARD */}
      <section className="bg-[#211E18] text-[#FBF7EF] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#9A2B27]/10 rounded-full blur-3xl translate-x-24 -translate-y-24" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E7B7A0]/5 rounded-full blur-3xl -translate-x-24 translate-y-24" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="font-mono text-xs text-[#E7B7A0] uppercase tracking-widest font-semibold block">
              ⭐ {t.UFStudentSectionTitle[currentLang]}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-snug">
              {currentLang === "zh"
                ? "支持佛羅里達大學學子的溫暖港灣，伴您留學歲月"
                : "Serving Gators with love and hospitality just steps from campus"}
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 font-serif leading-relaxed max-w-3xl">
              {t.UFStudentSectionDesc[currentLang]}
            </p>
            <div className="bg-[#33271E] rounded-xl p-4 border border-white/5 mt-3 max-w-xl">
              <span className="text-xs font-mono tracking-wider text-[#E7B7A0] font-bold block mb-2 uppercase">
                📍 {t.directionsTitle[currentLang]}
              </span>
              <div className="flex border-b border-white/10 mb-3">
                {(["walk", "bus", "car"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setTransitMode(mode)}
                    className={`pb-2 px-3 text-xs font-medium border-b-2 transition-all ${transitMode === mode ? "border-[#9A2B27] text-white" : "border-transparent text-neutral-400 hover:text-white"}`}
                  >
                    {mode === "walk" && `🚶 ${currentLang === "en" ? "On foot" : "步行"}`}
                    {mode === "bus" && `🚌 ${currentLang === "en" ? "RTS Bus" : "搭乘公交"}`}
                    {mode === "car" && `🚗 ${currentLang === "en" ? "By Car" : "開車自駕"}`}
                  </button>
                ))}
              </div>
              <div className="text-xs text-[#FBF7EF] flex items-center gap-2">
                <Info className="w-4 h-4 text-[#E7B7A0] shrink-0" />
                <span>
                  {transitMode === "walk" && t.directionsWalk[currentLang]}
                  {transitMode === "bus" && t.directionsBus[currentLang]}
                  {transitMode === "car" && t.directionsCar[currentLang]}
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigateTo("fellowships")}
              className="mt-2 self-start inline-flex items-center gap-2 bg-[#E7B7A0]/10 hover:bg-[#E7B7A0]/20 text-[#E7B7A0] px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border border-[#E7B7A0]/20"
            >
              <span>{currentLang === "en" ? "Explore Student Fellowship" : "瞭解學生聚會與愛宴詳情"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="lg:col-span-5 h-[280px] sm:h-[320px] rounded-2xl overflow-hidden shadow-2xl relative border border-white/10">
            <img
              src="/src/assets/images/gccc_campus_1781744441184.jpg"
              alt="Gators studying study group"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-6 flex flex-col justify-end">
              <span className="font-mono text-[9px] uppercase tracking-widest text-amber-200 block mb-1">
                Friday Dinner & Groups
              </span>
              <span className="font-serif text-lg font-bold">
                UF Plaza of the Americas & Church Hall
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
