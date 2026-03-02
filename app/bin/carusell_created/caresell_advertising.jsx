"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const data = [
  "/header/1.png",
  "/header/2.png",
  "/header/3.png",
  "/header/4.png",
  "/header/5.png",
];

export function Carusell_Advertising({ isLoading }) {
  return (
    <div className="w-full rounded-lg relative">
      {isLoading ? (
        <div className="bg-white p-2 rounded-xl">
          <Skeleton className="w-full h-80 rounded-xl" />
        </div>
      ) : (
        <Carousel plugins={[Autoplay({ delay: 3000 })]}>
          <CarouselContent>
            {data.map((src, index) => (
              <CarouselItem key={index}>
                <div className="p-1 w-full">
                  <img
                    src={src}
                    alt={`slide-${index}`}
                    className="w-full xl:h-80 h-auto object-cover rounded-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={"hidden xl:flex"} />
          <CarouselNext className={"hidden xl:flex"} />
        </Carousel>
      )}
    </div>
  );
}
