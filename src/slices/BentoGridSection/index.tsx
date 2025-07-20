import { Bounded } from "@/app/components/bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";
import { LuHeart, LuShield } from "react-icons/lu";

/**
 * Props for `BentoGridSection`.
 */
export type BentoGridSectionProps =
  SliceComponentProps<Content.BentoGridSectionSlice>;

/**
 * Component for "BentoGridSection" Slices.
 */
const BentoGridSection: FC<BentoGridSectionProps> = ({ slice }) => {
  return (
    <Bounded className="bento-grid-section">
      <PrismicRichText field={slice.primary.heading} />
      <PrismicRichText field={slice.primary.body} />
      <div className="card_container">
        {slice.primary.card.map((item, index) => (
          <div key={index} className="card">
            {item.icon}
            <LuHeart className="text-2xl" />
            <LuShield className="text-2xl" />
            <PrismicRichText field={item.card_heading} />
            <PrismicRichText field={item.card_body} />
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default BentoGridSection;
