"use client";
import { Bounded } from "@/components/bounded";
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
  const contentContainerRef = useRef(null);

  const mm = gsap.matchMedia();

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      const isSmallDevice = window.innerWidth < 700;
      const shouldSkipSplit = isIOS && isSmallDevice;

      let split: SplitText;

      if (!shouldSkipSplit) {
        split = SplitText.create(headingRef.current, {
          type: "words,lines",
          linesClass: "line",
          mask: "lines",
        });
      }
      // Intro animation
      const introTl = gsap.timeline({ paused: true });

      mm.add("(min-width: 700px)", () => {
        introTl
          .set(split.lines, { y: 100, opacity: 0 })
          .set(".body, .rsvp, .cta-scroll", { y: 20, opacity: 0 })
          .to(contentContainerRef.current, { opacity: 1, duration: 0.5 })
          .to(split.lines, {
            duration: 1,
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.3,
          })
          .to(
            ".body",
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            },
            "-=0.5",
          )
          .to(
            ".rsvp",
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              stagger: 0.1,
            },
            "-=0.8",
          )
          .to(
            ".cta-scroll",
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            },
            "-=0.9",
          );
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%", // Trigger when the top of the section is 80% from the top of viewport
        onEnter: () => introTl.play(),
        once: true, // Only trigger once
      });

      // If the section is already in viewport when the page loads, play the animation immediately
      if (
        sectionRef.current &&
        ScrollTrigger.isInViewport(sectionRef.current)
      ) {
        introTl.play();
      }

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
      className="relative top-0 -z-10 h-screen overflow-hidden md:min-h-screen 3xl:min-h-[90vh]"
    >
      <div className="absolute -z-10 h-full w-full">
        {slice.variation !== "default" ? (
          <div className="tint inset-0 h-full w-full bg-blue-950 backdrop-blur-3xl">
            <div className="texture absolute inset-0 bg-[url('/noisy-bg.webp')] object-contain mix-blend-multiply backdrop-blur-3xl" />
          </div>
        ) : null}

        <div
          className={clsx(
            "absolute inset-0 h-full w-full",
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
        <div className="relative mx-auto flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl text-white xl:max-w-[70%]">
          <div className="mix-blend-hard-light">
            {/******Texture*******/}
            <div className="texture absolute inset-0 mix-blend-multiply backdrop-blur-3xl">
              <Image
                src="/noisy-bg.webp"
                alt=""
                fill
                priority
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="texture absolute inset-0 h-full scale-125 bg-[url('/grainyBgTexture.webp')] bg-cover bg-no-repeat backdrop-blur-3xl"></div>
            <div className="texture absolute inset-0 h-full scale-125 bg-[url('/grainyBgTexture.webp')] bg-cover bg-no-repeat backdrop-blur-3xl"></div>
          </div>

          {/*******Content Container********/}
          <div
            ref={contentContainerRef}
            className="relative z-10 w-full px-4 sm:opacity-0 md:px-4 md:pt-10 lg:max-w-2xl lg:px-6 lg:text-center xl:max-w-4xl xl:px-8"
          >
            <div
              ref={headingRef}
              className="heading mb-4 text-5xl leading-[110%] font-black tracking-tighter text-balance capitalize lg:text-6xl xl:text-7xl xl:leading-[115%]"
            >
              <PrismicRichText field={slice.primary.heading} />
            </div>
            <div className="body text-afm-lightgray hidden text-lg text-balance text-shadow-black/20 text-shadow-md lg:block">
              <PrismicRichText field={slice.primary.body} />
            </div>
            <div className="mt-8 flex justify-evenly gap-4 text-left lg:gap-0.5">
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
