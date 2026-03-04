"use client";
import React from "react";
import ProductsCards from "../../bin/product_cars/product_card";
import { useGet_ProductsSortQuery } from "../../features/api/pokemon_Api";
import { ChevronRight } from "lucide-react";

import { useParams } from "next/navigation";

export default function Page() {
  const { category } = useParams();
  const limit = 40;
  const { data, isLoading } = useGet_ProductsSortQuery({
    category,
  });
  const totalPages = Math.ceil((data?.total || 0) / limit);
  const placeholderArray = Array.from({ length: 100 });
  return (
    <div className="max-w-[1400px] mx-auto pt-6 lg:w-[70%] w-[95%] my-5">
      <h1 className="text-xl flex items-center justify-start gap-2 mb-5 cursor-pointer">
        <span>
          Our <span>{category}</span> products
        </span>{" "}
        <ChevronRight />
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
  );
}
