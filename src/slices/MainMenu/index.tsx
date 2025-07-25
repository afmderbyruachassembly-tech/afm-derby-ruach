"use client";
import { Bounded } from "@/app/components/bounded";
import Button from "@/app/components/button";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";

/**
 * Props for `MainMenu`.
 */
export type MainMenuProps = SliceComponentProps<Content.MainMenuSlice>;

/**
 * Component for "MainMenu" Slices.
 */
const MainMenu: FC<MainMenuProps> = ({ slice }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="fixed top-0 z-10 w-full"
    >
      <Bounded
        className={clsx(
          "rounded-2xl border px-10 py-5 backdrop-blur-sm transition-all duration-300 ease-in-out",
          isScrolled
            ? "border-afm-blue/20 bg-afm-blue/90"
            : "border-afm-blue/20 bg-afm-blue/10",
        )}
      >
        <div className="flex items-center justify-between">
          <PrismicNextImage
            field={slice.primary.logo}
            quality={100}
            className="h-16 w-60"
          />
          <div className="hidden text-lg font-light text-white/70 lg:block">
            <ul className="flex h-full gap-4">
              {slice.primary.linkitem.map((link) => (
                <li
                  key={link.key}
                  className="flex h-full list-none flex-col items-center justify-between gap-3.5"
                >
                  <PrismicNextLink field={link} />
                  {/*//TODO:fix this logic using active state*/}
                  {link.text === "About" ? (
                    <div className="bg-afm-blue border-afm-gray absolute bottom-0 h-3 w-3 translate-y-1/2 animate-pulse rounded-full border-2" />
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Button
            link={slice.primary.buttonlink}
            className="rounded-xl px-11 py-3 text-lg capitalize"
          >
            {slice.primary.buttontext}
          </Button>
        </div>
      </Bounded>
    </nav>
  );
};

export default MainMenu;
