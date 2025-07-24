"use client";
import { Bounded } from "@/app/components/bounded";
import { useGSAP } from "@gsap/react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import Image from "next/image";
import { FC } from "react";
import { HiOutlineArrowLongDown } from "react-icons/hi2";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

gsap.registerPlugin(SplitText);

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  useGSAP(() => {
    const split = SplitText.create(".heading", {
      type: "lines",
      mask: "lines",
    });

    gsap.fromTo(
      split.lines,
      {
        duration: 1,
        opacity: 0,
        y: 100,
        autoAlpha: 0,
        stagger: 0.05,
        ease: "power2.out",
      },
      {
        duration: 1,
        opacity: 1,
        y: 0,
        autoAlpha: 1,
        stagger: 0.05,
        ease: "power2.out",
      },
    );
  });

  console.log(slice.variation);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden md:h-screen xl:h-screen"
    >
      <div className="absolute -z-10 h-full w-full">
        {slice.variation !== "default" ? (
          <div className="tint inset-0 h-full w-full bg-blue-950 backdrop-blur-3xl">
            <div className="texture absolute inset-0 bg-[url('/noisy-bg.webp')] object-contain mix-blend-multiply backdrop-blur-3xl" />
          </div>
        ) : null}

        <div
          className={clsx(
            "absolute inset-0 h-full w-full scale-200",
            slice.variation !== "default" ? "opacity-10" : "opacity-100",
          )}
        >
          <PrismicNextImage
            field={slice.primary.bgimage}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <Bounded className="relative h-full">
        <div className="relative mx-auto flex h-full max-w-[70%] flex-col items-center justify-center overflow-hidden rounded-2xl text-white">
          <div className="mix-blend-hard-light">
            {/*********Gradient********/}
            {/*<div className="absolute inset-0 bg-[conic-gradient(from_45deg,_#265D97,_#265D97,_#E33738,_#E33738,_#265D97,_#265D97,_#265D97,_#265D97)] backdrop-blur-3xl" />*/}

            {/******Texture*******/}
            <div className="texture absolute inset-0 mix-blend-multiply backdrop-blur-3xl">
              <Image
                src="/noisy-bg.webp"
                alt=""
                fill
                priority
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="texture absolute inset-0 h-full scale-125 bg-[url('/grainyBgTexture.webp')] bg-cover bg-no-repeat backdrop-blur-3xl"></div>
            <div className="texture absolute inset-0 h-full scale-125 bg-[url('/grainyBgTexture.webp')] bg-cover bg-no-repeat backdrop-blur-3xl"></div>
          </div>

          {/*******Content Container********/}
          <div className="relative z-10 max-w-4xl px-8 text-center">
            <div className="heading text-7xl font-black tracking-tighter text-balance capitalize">
              <PrismicRichText field={slice.primary.heading} />
            </div>
            <div className="text-afm-lightgray text-xl text-balance text-shadow-black/20 text-shadow-md">
              <PrismicRichText field={slice.primary.body} />
            </div>
            <div className="mt-8 flex justify-evenly text-left">
              {slice.primary.location.map((item, index) => (
                // Render the item
                <div key={index}>
                  <span className="text-afm-gold text-xl font-bold capitalize">
                    {" "}
                    <PrismicRichText field={item.leading} />
                  </span>
                  <PrismicRichText field={item.body} />
                </div>
              ))}
            </div>
            <div className="mt-10 flex animate-[var(--animate-bounce)] flex-col items-center justify-center gap-4 text-center">
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
