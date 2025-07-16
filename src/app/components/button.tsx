import { PrismicNextLink } from "@prismicio/next";
import { clsx } from "clsx";
import { PrismicLinkProps } from "@prismicio/react";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  link: PrismicLinkProps["field"];
  className?: string;
};

function Button({ children, link, className }: ButtonProps) {
  return (
    <PrismicNextLink
      field={link}
      className={clsx(
        "bg-[#265D97] text-white px-4 py-2 inline-block",
        className,
      )}
    >
      {children}
    </PrismicNextLink>
  );
}

export default Button;