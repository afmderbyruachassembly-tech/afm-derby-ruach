import { Bounded } from "@/components/bounded";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

/**
 * Props for `Ministries`.
 */
export type MinistriesProps = SliceComponentProps<Content.MinistriesSlice>;

/**
 * Component for "Ministries" Slices.
 */
const Ministries: FC<MinistriesProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded className="px-4 py-10">
        <div className="md:pt-32">
          {slice.primary.ministrycard.map((item) => (
            <div
              key={item.ministry_name}
              className="relative mb-20 gap-4 md:mb-40 md:grid md:grid-cols-12"
            >
              <div className="mb-4 md:col-span-6 md:mb-0">
                <h1 className="absolute -top-10 z-0 hidden max-w-sm font-extrabold opacity-3 sm:inline-block md:text-8xl">
                  {item.ministry_name}
                </h1>
                <h3 className="mb-4 text-3xl font-extrabold md:text-6xl">
                  {item.ministry_name}
                </h3>
                <div>
                  <PrismicRichText field={item.description} />
                </div>
              </div>
              <div className="md:col-span-6">
                <PrismicNextImage
                  field={item.ministry_image}
                  width={300}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </Bounded>
    </section>
  );
};

export default Ministries;
