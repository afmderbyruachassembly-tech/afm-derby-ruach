"use client";
import { Bounded } from "@/app/components/bounded";
import { useGSAP } from "@gsap/react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FC, useRef } from "react";
import renderIcon from "@/utils/render-icon";
gsap.registerPlugin(ScrollTrigger, SplitText);
/**
 * Props for `BentoGridSection`.
 */
export type BentoGridSectionProps =
  SliceComponentProps<Content.BentoGridSectionSlice>;



/**
 * Component for "BentoGridSection" Slices.
 */
const BentoGridSection: FC<BentoGridSectionProps> = ({ slice }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  let split: SplitText;

  useGSAP(() => {
    const ctx = gsap.context(() => {
      split = SplitText.create(headingRef.current, {
        type: "words",
        linesClass: "line",
        mask: "words",
      });

      gsap.set(split.words, { opacity: 0.3 });
      gsap.set(".body", { opacity: 0, y: 40 });

      const gridTl = gsap.timeline();
      gridTl
        .to(split.words, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "40% 80%",
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
          opacity: 1,
          stagger: 0.1,
          ease: "power2.out",
        })
        .to(".body", {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "center 70%", // Can adjust
            // end: "center center",
            scrub: 0.5,
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
      const handleResize = () => {
        // Kill existing animations targeting split words
        gsap.killTweensOf(split.words);

        // Revert the old split
        split.revert();

        // Create new split
        split = SplitText.create(headingRef.current, {
          type: "words",
          linesClass: "line",
          mask: "words",
        });

        // Reset initial state for new words
        gsap.set(split.words, { opacity: 0.3 });

        // Recreate the animation for the new words
        gsap.to(split.words, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "40% 80%",
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
          opacity: 1,
          stagger: 0.1,
          ease: "power2.out",
        });

        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      gridTl.from(".bento-card", {
        scrollTrigger: {
          trigger: ".bento-container",
          start: "top 80%",
          end: "bottom 70%",
          scrub: 0.9,
        },
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power2.out",
        stagger: {
          amount: 0.8,
          from: "start",
        },
      });

      return () => {
        window.removeEventListener("resize", handleResize);
        split?.revert();
        ScrollTrigger.killAll();
      };
    }, sectionRef);

    return () => ctx.revert();
  });

  return (
    <section ref={sectionRef}>
      <Bounded className="bento-grid-section border-orange-700 py-20">
        <div
          ref={headingRef}
          className="m-auto max-w-4xl text-center text-4xl xl:text-6xl leading-[115%] font-black tracking-tighter text-balance capitalize"
        >
          <PrismicRichText field={slice.primary.heading} />
        </div>
        <div className="body m-auto px-4 mt-4 max-w-5xl text-center text-balance">
          <PrismicRichText field={slice.primary.body} />
        </div>

        <div className="card_container mt-10">
          <div className="grid gap-4 px-4 [--corner-radius:16px] sm:grid-cols-2 xl:hidden">
            {/* Simple responsive grid for small/medium screens */}
            {slice.primary.card.map((item, index) => (
              <div
                key={index}
                className="bentocard border-afm-card-bg before:bg-afm-card-bg relative rounded-[var(--corner-radius)] border p-8 before:absolute before:inset-0 before:-z-10 before:m-[calc(var(--corner-radius)/2)] before:rounded-[calc(var(--corner-radius)/2)] before:content-['']"
              >
                {renderIcon(item.icon ?? "")}
                <div className="pb-2 font-bold">
                  <PrismicRichText field={item.card_heading} />
                </div>
                <div className="text-balance">
                  <PrismicRichText field={item.card_body} />
                </div>
              </div>
            ))}
          </div>
          <div className="bento-container hidden xl:block">
            {/* Group cards into rows of 3 */}
            {Array.from(
              { length: Math.ceil(slice.primary.card.length / 3) },
              (_, rowIndex) => {
                const startIndex = rowIndex * 3;
                const rowCards = slice.primary.card.slice(
                  startIndex,
                  startIndex + 3,
                );
                const isEvenRow = rowIndex % 2 === 0;

                return (
                  <div
                    key={rowIndex}
                    className={`grid grid-cols-3 items-stretch [--corner-radius:16px] ${
                      isEvenRow
                        ? "xl:grid-cols-[2fr_1fr_1fr]"
                        : "xl:grid-cols-[1fr_1fr_2fr]"
                    }`}
                  >
                    {rowCards.map((item, index) => (
                      <div
                        key={startIndex + index}
                        className="bento-card border-afm-card-bg before:bg-afm-card-bg relative m-[8px] rounded-[var(--corner-radius)] border p-8 before:absolute before:inset-0 before:-z-10 before:m-[calc(var(--corner-radius)/2)] before:rounded-[calc(var(--corner-radius)/2)] before:content-['']"
                      >
                        {renderIcon(item.icon ?? "")}
                        <div className="pb-2 font-bold">
                          <PrismicRichText field={item.card_heading} />
                        </div>
                        <div className="text-balance">
                          <PrismicRichText field={item.card_body} />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              },
            )}
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default BentoGridSection;
