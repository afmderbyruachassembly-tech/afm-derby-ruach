"use client";
import { useGSAP } from "@gsap/react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import { FC, useRef } from "react";

/**
 * Props for `Gallery`.
 */
export type GalleryProps = SliceComponentProps<Content.GallerySlice>;

/**
 * Component for "Gallery" Slices.
 */
const Gallery: FC<GalleryProps> = ({ slice }) => {
  const headingRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 640px)", () => {
      const tl = gsap.timeline();
      tl.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        },
        y: 150,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      })
        .from(".img-anim", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom bottom",
            scrub: true,
          },
          scale: 0,
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
          stagger: 0.5,
        })
        .to(".img-anim", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "bottom 95%",
            end: "bottom top",
            scrub: true,
            toggleClass: { targets: ".img-anim", className: "mx-lg" },
          },
          scale: 3,
          opacity: 0.9,
          y: -200,
          duration: 5,
          ease: "power2.out",
          stagger: 0.5,
        });
    });
    return () => mm.revert();
  });
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-afm-card-bg relative overflow-hidden py-20 xl:pb-40"
      ref={sectionRef}
    >
      <div className="flex flex-col items-center justify-center-safe">
        <div
          ref={headingRef}
          className="w-[100%] max-w-3xl py-8 text-center text-7xl font-black tracking-tighter"
        >
          <PrismicRichText field={slice.primary.heading} />
        </div>
        <div className="relative z-10 grid gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {slice.primary.gallery?.map((item, i) => (
            <div
              ref={imageRef}
              key={i}
              className="img-anim h-full flex-shrink-0 overflow-hidden rounded-lg md:aspect-[16/9]"
            >
              <PrismicNextImage
                field={item.image}
                className="h-full w-full object-cover object-center"
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
