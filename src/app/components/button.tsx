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
      className={clsx("inline-block px-4 py-2", className)}
    >
      {children}
    </PrismicNextLink>
  );
}

export default Button;
