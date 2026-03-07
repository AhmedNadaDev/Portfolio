import React from "react";
import { cn } from "@/lib/utils";

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}) {
  const calculatedDuration = duration / speed;
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 z-0 size-full"
        >
          <circle
            className="stroke-primary/25 stroke-2 dark:stroke-primary/35"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            strokeDasharray="6 10"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          <div
            style={{
              "--duration": calculatedDuration,
              "--radius": radius,
              "--angle": angle,
              width: `${iconSize}px`,
              height: `${iconSize}px`,
            }}
            className={cn(
              "animate-orbit absolute left-1/2 top-1/2 z-10 flex items-center justify-center",
              { "[animation-direction:reverse]": reverse },
              className
            )}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
