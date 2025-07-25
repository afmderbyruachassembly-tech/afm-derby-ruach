"use client";
import { Bounded } from "@/app/components/bounded";
import { useGSAP } from "@gsap/react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FC, useRef } from "react";
import { HiOutlineArrowLongDown } from "react-icons/hi2";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

gsap.registerPlugin(SplitText, ScrollTrigger);

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const split = SplitText.create(headingRef.current, {
        type: "words,lines",
        linesClass: "line",
        mask: "lines",
      });

      // Intro animation
      const introTl = gsap.timeline();

      introTl
        .set(split.lines, { y: 100, opacity: 0 })
        .to(split.lines, {
          duration: 1,
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3,
        })
        .from(
          ".body",
          {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .from(
          ".rsvp",
          {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=0.8",
        )
        .from(
          ".cta-scroll",
          {
            y: -20,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=0.9",
        );

      // Scale image on scroll
      gsap.to(".hero-img", {
        scrollTrigger: {
          trigger: ".hero-img",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
        scale: 1.8,
        ease: "power2.out",
        duration: 2,
      });

      // Outro animation on scroll
      const outro = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-img",
          start: "55% 50%",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      outro
        .to(
          ".heading",
          {
            opacity: 0,
            y: -200,
            duration: 0.7,
            ease: "power2.out",
          },
          0,
        )
        .to(
          ".body",
          {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          0,
        )
        .to(
          ".rsvp",
          {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.1,
          },
          0,
        )
        .to(".cta-scroll", {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
        });
    }, sectionRef); // 👈 This limits all selectors to this component only

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative top-0 -z-10 overflow-hidden md:h-screen lg:h-screen xl:h-screen 2xl:h-[90vh]"
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
            className="hero-img object-cover"
            priority
          />
        </div>
      </div>

      <Bounded className="relative h-full">
        <div className="relative mx-auto flex h-full max-w-[70%] flex-col items-center justify-center overflow-hidden rounded-2xl text-white">
          <div className="mix-blend-hard-light">
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
            <div
              ref={headingRef}
              className="heading mb-4 text-4xl leading-[115%] font-black tracking-tighter text-balance capitalize xl:text-7xl"
            >
              <PrismicRichText field={slice.primary.heading} />
            </div>
            <div className="body text-afm-lightgray text-xl text-balance text-shadow-black/20 text-shadow-md">
              <PrismicRichText field={slice.primary.body} />
            </div>
            <div className="mt-8 flex justify-evenly text-left">
              {slice.primary.location.map((item, index) => (
                // Render the item
                <div key={index} className="rsvp">
                  <span className="text-afm-gold text-xl font-bold capitalize">
                    {" "}
                    <PrismicRichText field={item.leading} />
                  </span>
                  <PrismicRichText field={item.body} />
                </div>
              ))}
            </div>
            <div className="cta-scroll mt-10 flex animate-[var(--animate-bounce)] flex-col items-center justify-center gap-4 text-center">
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
