import { Bounded } from '@/components/bounded';
import { Content } from "@prismicio/client";
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

/**
 * Props for `Ministries`.
 */
export type MinistriesProps = SliceComponentProps<Content.MinistriesSlice>;

/**
 * Component for "Ministries" Slices.
 */
const Ministries: FC<MinistriesProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded>
        <div className='py-40'>
          {slice.primary.ministrycard.map((item) => (
            <div key={item.ministry_name} className='relative mb-40 grid grid-cols-12 gap-4'>
              <div className='col-span-6'>
                 <h1 className="text-8xl font-extrabold opacity-3 absolute z-0 -top-10 max-w-sm">{item.ministry_name}</h1>
              <h3 className="text-6xl font-extrabold mb-4">{item.ministry_name}</h3>
              <div><PrismicRichText field={item.description} /></div>
              </div>
              <div className='col-span-6'>
                <PrismicNextImage field={item.ministry_image} width={300} />
              </div>
            </div>
            
          ))}
        </div>
      </Bounded>
    </section>
  );
};

export default Ministries;
