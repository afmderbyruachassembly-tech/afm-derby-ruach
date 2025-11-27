import { clsx } from "clsx";
import React from "react";

export const Bounded = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx("mx-auto w-full xl:max-w-7xl", className)}>
      {children}
    </div>
  );
};
