import React from "react";
import { clsx } from "clsx";

export const Bounded = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx("relative w-full xl:max-w-7xl mx-auto", className)}>
      {children}
    </div>
  );
};