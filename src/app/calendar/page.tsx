import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("calendar").catch(() => notFound());

  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />
      <div className="h-[100vh]">
        <div className="flex h-full flex-col justify-center">
          <iframe
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FLondon&src=YWZtZGVyYnlydWFjaGFzc2VtYmx5QGdtYWlsLmNvbQ&color=%23039be5"
            width="800"
            height="600"
            scrolling="no"
            className="h-full w-full"
          ></iframe>
        </div>
      </div>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("calendar").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
