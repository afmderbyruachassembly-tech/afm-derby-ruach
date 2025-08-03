import { Bounded } from "@/components/bounded";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

/**
 * Props for `WordFromOurPastor`.
 */
export type WordFromOurPastorProps =
  SliceComponentProps<Content.WordFromOurPastorSlice>;

/**
 * Component for "WordFromOurPastor" Slices.
 */
const WordFromOurPastor: FC<WordFromOurPastorProps> = ({ slice }) => {
  return (
    <div className="from-afm-blue h-fit overflow-clip bg-linear-180 to-[#0C1E31] xl:px-8 py-20 xl:py-40 lg:px-0">
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="grid grid-cols-1 xl:gap-4 px-4 md:grid-cols-2"
      >
        <div className="content">
          <div className="text-4xl xl:text-6xl font-black tracking-tight text-balance text-white capitalize">
            <PrismicRichText field={slice.primary.heading} />
          </div>
          <div className="text-afm-gray mt-4 text-lg font-light">
            <PrismicRichText field={slice.primary.body} />
          </div>
        </div>

        <div className="mt-20 lg:mt-0 flex items-center [--corner-radius:16px] lg:px-20">
          <div className="card border-afm-card-bg before:border-afm-gold after:border-afm-red relative -right-1/2 h-fit min-h-[400px] w-full -translate-x-1/2 rotate-12 transform rounded-[var(--corner-radius)] border before:absolute before:inset-0 before:-z-10 before:rotate-6 before:rounded-[var(--corner-radius)] before:border before:content-[''] after:absolute after:inset-0 after:-z-10 after:rotate-[12deg] after:rounded-[var(--corner-radius)] after:border">
            <div className="bg-afm-card-bg inset-0 -z-10 m-[calc(var(--corner-radius)/2)] h-fit rotate-y-180 overflow-clip rounded-[calc(var(--corner-radius)/2)] transition-transform">
              <PrismicNextImage
                field={slice.primary.pastor_image}
                className="h-[500px] w-full scale-200 object-cover"
              />
            </div>

            {/* Card content goes here */}
          </div>
        </div>
      </Bounded>
    </div>
  );
};

export default WordFromOurPastor;
