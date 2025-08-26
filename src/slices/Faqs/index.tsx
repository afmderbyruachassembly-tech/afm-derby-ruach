import AccordionQA from "@/components/accordion";
import { Bounded } from "@/components/bounded";
import { asText, Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

/**
 * Props for `Faqs`.
 */
export type FaqsProps = SliceComponentProps<Content.FaqsSlice>;

/**
 * Component for "Faqs" Slices.
 */
const Faqs: FC<FaqsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="xl:py-40"
    >
      <Bounded className="grid px-4 lg:grid-cols-2">
        <div className="content col-span-1">
          <div className="max-w-xl pb-1 text-6xl font-black tracking-tighter">
            <PrismicRichText field={slice.primary.heading} />
          </div>
          <div className="text-muted-foreground mb-4">
            <PrismicRichText field={slice.primary.body} />
          </div>
          <div className="text-afm-blue flex items-center gap-2 font-bold">
            <PrismicNextLink field={slice.primary.link} />
            <span className="text-3xl">
              {" "}
              <HiOutlineArrowLongRight />
            </span>{" "}
          </div>
        </div>

        <div className="accordion col-span-1">
          {slice.primary.qnas.map((item, i) => (
            // Render the item
            <div key={i}>
              <AccordionQA
                heading={asText(item.heading)}
                body={asText(item.body)}
                item={i}
              />
            </div>
          ))}
        </div>
      </Bounded>
    </section>
  );
};

export default Faqs;
