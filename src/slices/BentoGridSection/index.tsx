import { Bounded } from "@/app/components/bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";
import {
  LuBookOpen,
  LuChurch,
  LuCompass,
  LuHeart,
  LuShield,
  LuUsers,
} from "react-icons/lu";

/**
 * Props for `BentoGridSection`.
 */
export type BentoGridSectionProps =
  SliceComponentProps<Content.BentoGridSectionSlice>;

const iconMap = {
  LuHeart: LuHeart,
  LuShield: LuShield,
  LuBookOpen: LuBookOpen,
  LuChurch: LuChurch,
  LuUsers: LuUsers,
  LuCompass: LuCompass,
};

/**
 * Component for "BentoGridSection" Slices.
 */
const BentoGridSection: FC<BentoGridSectionProps> = ({ slice }) => {
  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];

    if (IconComponent) {
      return <IconComponent className="mb-4 h-6 w-6 text-gray-400" />;
    }

    // Fallback if icon is not found
    console.warn(`Icon "${iconName}" not found in iconMap`);
    return <div className="mb-4 h-8 w-8 rounded bg-gray-300" />;
  };
  return (
    <Bounded className="bento-grid-section border-orange-700 py-20">
      <div className="m-auto max-w-4xl text-center text-6xl font-black tracking-tighter text-balance capitalize">
        <PrismicRichText field={slice.primary.heading} />
      </div>
      <div className="m-auto mt-4 max-w-5xl text-center text-balance">
        <PrismicRichText field={slice.primary.body} />
      </div>

      <div className="card_container mt-10">
        <div className="grid gap-4 px-4 [--corner-radius:16px] sm:grid-cols-2 xl:hidden">
          {/* Simple responsive grid for small/medium screens */}
          {slice.primary.card.map((item, index) => (
            <div
              key={index}
              className="card border-afm-card-bg before:bg-afm-card-bg relative rounded-[var(--corner-radius)] border p-8 before:absolute before:inset-0 before:-z-10 before:m-[calc(var(--corner-radius)/2)] before:rounded-[calc(var(--corner-radius)/2)] before:content-['']"
            >
              {renderIcon(item.icon ?? "")}
              <div className="pb-2 font-bold">
                <PrismicRichText field={item.card_heading} />
              </div>
              <div className="text-balance">
                <PrismicRichText field={item.card_body} />
              </div>
            </div>
          ))}
        </div>
        <div className="hidden xl:block">
          {/* Group cards into rows of 3 */}
          {Array.from(
            { length: Math.ceil(slice.primary.card.length / 3) },
            (_, rowIndex) => {
              const startIndex = rowIndex * 3;
              const rowCards = slice.primary.card.slice(
                startIndex,
                startIndex + 3,
              );
              const isEvenRow = rowIndex % 2 === 0;

              return (
                <div
                  key={rowIndex}
                  className={`grid grid-cols-3 items-stretch [--corner-radius:16px] ${
                    isEvenRow
                      ? "xl:grid-cols-[2fr_1fr_1fr]"
                      : "xl:grid-cols-[1fr_1fr_2fr]"
                  }`}
                >
                  {rowCards.map((item, index) => (
                    <div
                      key={startIndex + index}
                      className="card border-afm-card-bg before:bg-afm-card-bg relative m-[8px] rounded-[var(--corner-radius)] border p-8 before:absolute before:inset-0 before:-z-10 before:m-[calc(var(--corner-radius)/2)] before:rounded-[calc(var(--corner-radius)/2)] before:content-['']"
                    >
                      {renderIcon(item.icon ?? "")}
                      <div className="pb-2 font-bold">
                        <PrismicRichText field={item.card_heading} />
                      </div>
                      <div className="text-balance">
                        <PrismicRichText field={item.card_body} />
                      </div>
                    </div>
                  ))}
                </div>
              );
            },
          )}
        </div>
      </div>
    </Bounded>
  );
};

export default BentoGridSection;
