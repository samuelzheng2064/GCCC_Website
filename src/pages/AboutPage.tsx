import { Language } from "../types";
import { ChevronRight } from "lucide-react";

interface AboutPageProps {
  currentLang: Language;
}

export default function AboutPage({ currentLang }: AboutPageProps) {
  return (
    <>
      {/* HERO */}
      <section
        className="relative h-[55vh] min-h-[340px] flex items-end pt-20 bg-cover bg-center"
        style={{ backgroundImage: `url("/images/aboutus.jpg")` }}
      >
        <div className="absolute inset-0 bg-neutral-900/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#211E18] via-[#211E18]/20 to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
          <span className="font-mono text-xs text-[#E7B7A0] uppercase tracking-widest font-bold block mb-2">
            {currentLang === "en" ? "Who We Are" : "關於我們"}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold tracking-tight leading-tight">
            {currentLang === "en" ? "About GCCC" : "甘城華人教會"}
          </h1>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
          {/* Left: image + proclamation */}
          <div className="flex flex-col gap-8">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative z-10">
                <img
                  src="/images/gccc_sermon_1781744456768.jpg"
                  alt="Holy Bible on altar table"
                  className="w-full h-full object-cover"
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
              <div className="space-y-3 font-serif text-sm text-[#FBF7EF]/85 italic leading-relaxed">
                {currentLang === "en" ? (
                  <>
                    <p>
                      I believe in God, the Father Almighty, Creator of heaven
                      and earth.
                    </p>
                    <p>
                      I believe in Jesus Christ, God's only Son, our Lord; who
                      was conceived by the Holy Spirit, born of the Virgin Mary;
                      suffered under Pontius Pilate, was crucified, died, and
                      was buried; he descended to the dead; on the third day he
                      rose again; he ascended into heaven, he is seated at the
                      right hand of the Father; and he will come again to judge
                      the living and the dead.
                    </p>
                    <p>
                      I believe in the Holy Spirit; the holy catholic church,
                      the communion of saints; the forgiveness of sins, the
                      resurrection of the body; and the life everlasting. Amen.
                    </p>
                  </>
                ) : (
                  <>
                    <p>我信上帝，全能的父，創造天地的主。</p>
                    <p>
                      我信我主耶穌基督，上帝的獨生子；因著聖靈感孕，從童貞女馬利亞所生；在本丟彼拉多手下受難，被釘在十字架上，受死，埋葬；降在陰間；第三天從死里復活；祂升天，坐在全能父上帝的右邊；將來必從那里降臨，審判活人，死人。
                    </p>
                    <p>
                      我信聖靈；我信聖而公之教會；我信聖徒相通；我信罪得赦免；我信身體復活；我信永生。阿們！
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: full church history */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <span className="font-mono text-xs text-[#9A2B27] uppercase tracking-[3px] font-bold block mb-2">
                {currentLang === "en" ? "Our Story" : "教會歷史"}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#33271E] font-bold tracking-tight">
                {currentLang === "en" ? "History of Our Church" : "本教會歷史"}
              </h2>
            </div>
            <div className="h-1 w-16 bg-[#9A2B27]" />
            <div className="space-y-5 text-base md:text-lg text-[#6F685B] font-serif leading-relaxed">
              {currentLang === "en" ? (
                <>
                  <p>
                    In September 1970, several Chinese Christians started the
                    Gainesville Chinese Bible Study Group. They met every Friday
                    night at the Baptist Student Center — to fellowship through
                    Bible study, prayer, and sharing, and to share the gospel
                    with the Chinese community. Numbers grew from a little over
                    10 to 60–70 by the late 1980s.
                  </p>
                  <p>
                    In 1979, the First Baptist Church started an international
                    Sunday school whose members were mainly from the Bible study
                    group. In October 1988, Chinese Sunday worship service began
                    at the First Baptist Church chapel, and in February 1989,
                    GCCC was officially established. By the grace of God, we
                    moved into our own church building in 2002, with adult
                    attendance growing from about 40 to over 100.
                  </p>
                  <p>
                    Our congregation consists of people of all walks of life —
                    mostly first- and second-generation Chinese immigrants,
                    college students, graduate students, and their families.
                    About five percent are non-Chinese and about one-third are
                    second-generation Chinese immigrants more fluent in English.
                    The adult worship service is conducted bilingually in
                    Chinese and English.
                  </p>
                  <p>
                    This church has deep roots in Bible study. From that single
                    Bible study group over fifty years ago, we now have four
                    Sunday morning study groups, six on Friday nights, five
                    fellowships, and a Bible Training Center for Pastors. We are
                    students of the Holy Bible and disciples of Jesus Christ.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    一九七零年九月，數位愛主的華人基督徒開始佛州大學的中文查經班。每週五晚上，在浸信會學生中心聚會，聯繫弟兄姊妹查經、禱告、分享，並傳揚福音給同胞同學。聚會人數從起初的十幾人到八十年代末已增至六、七十人。
                  </p>
                  <p>
                    一九七九年第一浸信教會開始以華人為主的國際主日學，成員都是查經班的弟兄姊妹。一九八八年十月，在第一浸信教會副堂開始中文主日崇拜；次年二月正式成立教會。蒙神的恩典，教會於二零零二年搬進自建教堂，成人崇拜人數由起初四十幾人增加到現在一百多人。
                  </p>
                  <p>
                    本教會會眾包含社會各階層及各年齡層，大部份是第一代及第二代華人移民、大學生、研究生及其眷屬。約有百份之五的非華人及三份之一說英語較流利的第二代移民，成人主日崇拜採中英雙語進行。
                  </p>
                  <p>
                    本教會的基礎深植於查經班。從五十多年前那一個查經班開始，現在主日有四個查經班、週五有六個查經班、五個團契及聖經牧訓班。我們是聖經的學生，是耶穌基督的門徒。
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
