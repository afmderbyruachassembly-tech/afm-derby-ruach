import { Bounded } from '@/components/bounded';
import { Content } from "@prismicio/client";
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

/**
 * Props for `ChurchLeadership`.
 */
export type ChurchLeadershipProps =
  SliceComponentProps<Content.ChurchLeadershipSlice>;

/**
 * Component for "ChurchLeadership" Slices.
 */
const ChurchLeadership: FC<ChurchLeadershipProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className='py-10 px-4 '
    >
      <Bounded>
        <div className='m-auto max-w-4xl text-4xl leading-[115%] font-black tracking-tighter text-balance capitalize lg:text-center xl:text-6xl'>{slice.primary.title}</div>
        <div className='max-w-2xl body m-auto mt-4 max-w-5xl text-balance lg:text-center'>{slice.primary.description}</div>
        <div className='card_container mt-10 overflow-hidden'>
          <div className='flex gap-4 [--corner-radius:16px] grid grid-cols-12'>
            
          {slice.primary.card.map((item) => (
            <div key={item.name} className='bentocard border-afm-card-bg before:bg-afm-card-bg relative rounded-[var(--corner-radius)] border p-2 before:absolute before:inset-0 before:-z-10 before:m-[calc(var(--corner-radius)/2)] before:rounded-[calc(var(--corner-radius)/2)] before:content-[""]  xl:col-span-3 sm:col-span-6 lg:col-span-4'>
              <PrismicNextImage field={item.profile} className='rounded-sm'/>
              <div className='px-4 pb-2'>
                <p className='mt-2 font-bold'>{item.name}</p>
              <p>{item.position}</p>
              <div className='pt-2 text-sm font-medium text-gray-600'><PrismicRichText field={item.bio} /></div>
              </div>
            </div>
            ))}
          </div>
              
        </div>
      </Bounded>
    </section>
  );
};

export default ChurchLeadership;
