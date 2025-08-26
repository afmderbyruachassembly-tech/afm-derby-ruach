/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
// import Button from './button';
import { Bounded } from "@/components/bounded";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsYoutube } from "react-icons/bs";

const Navbar = (props: any) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // Helper Function
  const isActiveLink = (link: any) => {
    if (link.link_type === "Document") {
      // For home page
      if (link.type === "home" && pathname === "/") {
        return true;
      }
      // For other pages, check if pathname matches the document type
      if (link.type && pathname === `/${link.type}`) {
        return true;
      }
      // Fallback to slug-based matching
      if (link.slug) {
        const linkPath = link.slug === "home" ? "/" : `/${link.slug}`;
        return pathname === linkPath;
      }
    }
    return false;
  };

  useEffect(() => {
    console.log(lastScrollY, window.scrollY);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const currentScrollY = window.scrollY;

      // Only update direction if there's a significant change
      // This prevents false "up" direction when scrolling stops
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        const newDirection = currentScrollY > lastScrollY ? "down" : "up";
        setScrollDirection(newDirection);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  return (
    <nav
      // data-slice-type={slice.slice_type}
      // data-slice-variation={slice.variation}
      className={clsx(
        "fixed z-50 w-full transition-transform duration-1000 ease-in-out xl:top-10",
        // Hide when scrolling up (except at the very top of the page)
        scrollDirection === "down" && lastScrollY > 100
          ? "-translate-y-[200%]"
          : "translate-y-0",
      )}
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
            field={props.data.logo}
            quality={100}
            className="h-16 w-60"
          />
          <div className="hidden text-lg font-light text-white/70 lg:block">
            <ul className="flex h-full items-center gap-4 capitalize">
              {props.data.link_item.map((link: any) => (
                <li
                  key={link.key}
                  className={clsx(
                    link.variant === "Tertiary"
                      ? "flex h-full list-none flex-col items-center gap-3.5"
                      : "ml-8 rounded-4xl px-8 py-2 text-xl font-bold text-white",
                  )}
                >
                  {link.variant === "Tertiary" ? (
                    <PrismicNextLink
                      field={link}
                      className={clsx(
                        "transition-colors duration-200",
                        isActiveLink(link)
                          ? "font-bold text-white"
                          : "text-white/70 hover:text-white",
                      )}
                    />
                  ) : (
                    <div className="relative flex items-center gap-2">
                      <PrismicNextLink
                        field={link}
                        className={clsx("before:absolute before:inset-0")}
                      />
                      <BsYoutube className="text-afm-red text-4xl" />
                    </div>
                  )}
                  {/*//TODO:fix this logic using active state*/}
                  {isActiveLink(link) && (
                    <div className="bg-afm-red absolute bottom-0 h-3 w-3 translate-y-1/2 animate-pulse rounded-full border-2 border-white" />
                  )}
                </li>
              ))}
            </ul>
          </div>
          {/* <Button
                        link={slice.primary.buttonlink}
                        className="border-afm-gray bg-afm-gray text-afm-blue hidden rounded-xl border px-11 py-3 text-lg font-bold capitalize lg:block"
                    >
                        {slice.primary.buttontext}
                    </Button> */}
        </div>
      </Bounded>
    </nav>
  );
};

export default Navbar;
