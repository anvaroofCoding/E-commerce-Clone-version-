"use client";
import React, { useEffect, useState } from "react";
import ProductsCards from "../bin/product_cars/product_card";
import { useGet_ProductsQuery } from "../features/api/pokemon_Api";
import { ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 40;
  const { data, isLoading } = useGet_ProductsQuery({
    search: "",
    limit,
    skip: (currentPage - 1) * limit,
  });
  const totalPages = Math.ceil((data?.total || 0) / limit);
  console.log(totalPages);
  const placeholderArray = Array.from({ length: 100 });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scroll
    });
  }, [currentPage]);
  return (
    <div className="max-w-[1400px] mx-auto pt-6 lg:w-[70%] w-[95%] my-5">
      <h1 className="text-xl flex items-center justify-start gap-2 mb-5 cursor-pointer">
        <span>Our all products</span> <ChevronRight />
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
      <Pagination className={"mt-5"}>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                  className={
                    currentPage === page
                      ? "bg-green-600 text-white hover:bg-green-700 hover:text-white cursor-pointer"
                      : "bg-transparent text-gray-700 hover:bg-gray-100 cursor-pointer"
                  }
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
