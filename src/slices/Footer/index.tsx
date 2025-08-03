import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/components/bounded";

/**
 * Props for `Footer`.
 */
export type FooterProps = SliceComponentProps<Content.FooterSlice>;

/**
 * Component for "Footer" Slices.
 */
const Footer: FC<FooterProps> = ({ slice }) => {
  return (
    <footer
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-amber-500 absolute bottom-0 w-full"
    >
      <Bounded className="flex items-center justify-between text-white font-medium py-4 ">
        <PrismicNextImage field={slice.primary.footerLogo} />
        <h6 className="flex capitalize">
          &copy;
          <PrismicRichText field={slice.primary.copyright} />
        </h6>
      </Bounded>
    </footer>
  );
};

export default Footer;