import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Bounded } from "@/app/components/bounded";
import Button from "@/app/components/button";

/**
 * Props for `MainMenu`.
 */
export type MainMenuProps = SliceComponentProps<Content.MainMenuSlice>;

/**
 * Component for "MainMenu" Slices.
 */
const MainMenu: FC<MainMenuProps> = ({ slice }) => {
  console.log(slice.primary.buttonlink.text);
  return (
    <nav
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="absolute z-10 w-full top-8  "
    >
      <Bounded className=" border border-afm-blue/20  backdrop-blur-sm bg-afm-blue/10 rounded-2xl  px-10 py-5">
        <div className="flex justify-between items-center">
          <PrismicNextImage
            field={slice.primary.logo}
            quality={100}
            className="h-16 w-60"
          />
          <div className=" text-white/70 font-light text-lg">
            <ul className="flex gap-4 h-full">
              {slice.primary.linkitem.map((link) => (
                <li
                  key={link.key}
                  className="list-none flex flex-col items-center justify-between gap-3.5 h-full"
                >
                  <PrismicNextLink field={link} />
                  {/*//TODO:fix this logic using active state*/}
                  {link.text === "About" ? (
                    <div className="absolute bottom-0 translate-y-1/2 bg-afm-red border-2 border-afm-gray  animate-pulse w-3 h-3 rounded-full" />
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Button
            link={slice.primary.buttonlink}
            className="py-3 px-11 rounded-xl capitalize text-lg"
          >
            {slice.primary.buttontext}
          </Button>
        </div>
      </Bounded>
    </nav>
  );
};

export default MainMenu;