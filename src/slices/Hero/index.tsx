import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/app/components/bounded";
import { HiOutlineArrowLongDown } from "react-icons/hi2";
import clsx from "clsx";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  console.log(slice.variation);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative   md:h-screen xl:h-[90vh] overflow-hidden"
    >
      <div className="absolute w-full h-full -z-10">
        {slice.variation !== "default" ? (
          <div className="tint inset-0 bg-blue-950 w-full h-full backdrop-blur-3xl">
            <div className="texture absolute bg-[url('/noisy-background.jpg')] mix-blend-multiply object-contain backdrop-blur-3xl inset-0" />
          </div>
        ) : null}

        <div
          className={clsx(
            slice.variation !== "default" ? "opacity-10" : "opacity-100",
          )}
        >
          <PrismicNextImage
            field={slice.primary.bgimage}
            fill
            className="object-cover"
            priority={true}
          />
        </div>
      </div>

      <Bounded className="relative h-full">
        <div className="relative text-white rounded-2xl max-w-[70%] h-full flex flex-col items-center justify-center  mx-auto overflow-hidden ">
          <div className="mix-blend-hard-light">
            {/*********Gradient********/}
            {/*<div className="absolute inset-0 bg-[conic-gradient(from_45deg,_#265D97,_#265D97,_#E33738,_#E33738,_#265D97,_#265D97,_#265D97,_#265D97)] backdrop-blur-3xl" />*/}

            {/******Texture*******/}
            <div className="texture absolute bg-[url('/noisy-background.jpg')] mix-blend-multiply object-contain backdrop-blur-3xl inset-0" />

            <div className="absolute texture h-full  bg-[url('/grainyBg.png')] bg-no-repeat bg-cover backdrop-blur-3xl inset-0 scale-125" />

            {/*<div className="texture absolute bg-[url('/noisy-background.jpg')] mix-blend-multiply object-contain backdrop-blur-3xl inset-0" />*/}
          </div>

          {/*******Content Container********/}
          <div className="relative z-10 px-8 text-center max-w-2xl">
            <h1 className="text-6xl font-bold tracking-tighter text-balance text-shadow-md text-shadow-black/20">
              <PrismicRichText field={slice.primary.heading} />
            </h1>
            <p className="text-xl text-balance text-afm-lightgray text-shadow-md text-shadow-black/20">
              <PrismicRichText field={slice.primary.body} />
            </p>
            <div className="flex justify-evenly mt-8 text-left">
              {slice.primary.location.map((item, index) => (
                // Render the item
                <div key={index}>
                  <span className="font-bold text-xl text-afm-gold capitalize">
                    {" "}
                    <PrismicRichText field={item.leading} />
                  </span>
                  <PrismicRichText field={item.body} />
                </div>
              ))}
            </div>
            <div className="text-center flex flex-col gap-4 items-center justify-center mt-10 animate-[var(--animate-bounce)] ">
              <span className="origin-center rotate-90">scroll</span>
              <span className="text-5xl">
                <HiOutlineArrowLongDown />
              </span>
            </div>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default Hero;