"use client";

import React from "react";
import { useGet_ProductsQuery } from "./features/api/pokemon_Api";
import ProductsCards from "./bin/product_cars/product_card";
import { Carusell_Advertising } from "./bin/carusell_created/caresell_advertising";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data, isLoading } = useGet_ProductsQuery();
  const router = useRouter();
  const GetPRoducts = () => {
    router.push("products");
  };

  // 100 ta loading placeholder
  const placeholderArray = Array.from({ length: 100 });

  return (
    <div className="xl:pt-10 pt-5  min-h-screen">
      {/* Carousel */}
      <div className="mx-auto lg:w-[70%] w-[95%] ">
        <Carusell_Advertising isLoading={isLoading} />
      </div>

      {/* Product Grid */}
      <div className="max-w-[1400px] mx-auto pt-6 lg:w-[70%] w-[95%]">
        <h1
          onClick={GetPRoducts}
          className="text-xl flex items-center justify-start gap-2 mb-5 cursor-pointer"
        >
          <span>Our products</span> <ChevronRight />
        </h1>
        <div
          className="grid lg:gap-5 gap-2
                        grid-cols-2
                        sm:grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-5"
        >
          {(isLoading ? placeholderArray : data?.products)?.map(
            (product, index) => (
              <ProductsCards
                key={index}
                loading={isLoading}
                product={product}
                index={index}
              />
            ),
          )}
        </div>
      </div>

      <div className="jus my-5">
        <Button
          onClick={GetPRoducts}
          className={
            "bg-green-600 hover:bg-green-700 duration-300 cursor-pointer"
          }
        >
          Our products <IconChevronRight stroke={2} />
        </Button>
      </div>
    </div>
  );
}
