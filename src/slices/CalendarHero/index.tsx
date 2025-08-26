import { Bounded } from "@/components/bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

/**
 * Props for `CalendarHero`.
 */
export type CalendarHeroProps = SliceComponentProps<Content.CalendarHeroSlice>;

/**
 * Component for "CalendarHero" Slices.
 */
const CalendarHero: FC<CalendarHeroProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex h-[80vh] items-center bg-gradient-to-b from-[#112B45]/95 to-[#0C1E31] py-12 text-center text-white"
    >
      <Bounded>
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 text-3xl font-extrabold md:text-4xl lg:text-5xl">
            <PrismicRichText field={slice.primary.heading} />
          </div>
          <PrismicRichText field={slice.primary.body} />
        </div>
      </Bounded>
    </section>
  );
};

export default CalendarHero;
