"use client";

import { useState, useMemo, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, X } from "lucide-react";
import Image from "next/image";
import ProductsBtn from "@/app/bin/for-navbar/products.btn";
import {
  IconHeartFilled,
  IconLogin,
  IconPlaneDeparture,
  IconShoppingCartFilled,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import {
  useGet_CategoriesQuery,
  useGet_ProductsSearchQuery,
} from "../features/api/pokemon_Api";
import { ChevronLeft, ChevronRight } from "lucide-react";

const navItems = [
  { name: "Kirish", icon: IconLogin },
  { name: "Saralangan", icon: IconHeartFilled },
  { name: "Aviachipta", icon: IconPlaneDeparture },
  { name: "Savat", icon: IconShoppingCartFilled },
];

export default function Navbar() {
  const scrollRef = useRef(null);
  const [search, setSearch] = useState("");
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 150;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const suchOpen = useSelector((state) => state.navbar.value);
  const { data: categories, isLoading } = useGet_CategoriesQuery();
  const { data, isLoading: ProductsLoading } = useGet_ProductsSearchQuery({
    search,
  });

  return (
    <div
      className={`container px-5 xl:block hidden bg-white sticky top-5 pb-3 duration-300 z-10 ${
        suchOpen ? "rounded-t-xl" : "rounded-xl"
      }`}
    >
      {/* Top Row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-10 ">
        {/* Logo */}
        {isLoading ? (
          <Skeleton className="w-40 h-20 rounded-md" />
        ) : (
          <img src="/logo.png" alt="Logo" className="w-30" />
        )}

        {/* Search */}
        <div className="w-full  relative">
          {isLoading || ProductsLoading ? (
            <Skeleton className="h-10 w-full rounded-md" />
          ) : (
            <>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Maxsulotni qidiring..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-9"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              {/* Dropdown */}
              {search && (
                <div
                  className="absolute top-full left-0 mt-3 w-full 
                  bg-white dark:bg-zinc-900 
                  border border-gray-200 dark:border-zinc-800 
                  rounded-2xl shadow-2xl 
                  max-h-96 overflow-y-auto 
                  z-50 p-3 space-y-2
                  backdrop-blur-xl"
                >
                  {data?.total > 0 ? (
                    data?.products.map((item) => (
                      <Card
                        key={item.id}
                        className="group cursor-pointer border-0 shadow-none 
                     hover:bg-gray-50 dark:hover:bg-zinc-800 
                     transition-all duration-200 rounded-xl"
                      >
                        <CardContent className="p-3 flex gap-4 items-center">
                          {/* IMAGE */}
                          <div
                            className="relative w-16 h-16 rounded-xl 
                            overflow-hidden flex-shrink-0 
                            border border-gray-200 dark:border-zinc-700"
                          >
                            <img
                              src={item.thumbnail}
                              alt={item.brand}
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* INFO */}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">
                              {item.brand}
                            </p>

                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                      Hech narsa topilmadi
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          {isLoading ? (
            <div className="flex gap-5">
              {Array.from({ length: navItems.length }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="w-12 h-3 rounded-md" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center text-gray-500 hover:text-gray-800 cursor-pointer duration-300"
                  >
                    <Icon size={20} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                );
              })}
            </>
          )}
          {isLoading ? (
            <Skeleton className="w-25 h-10 rounded-md" />
          ) : (
            <ProductsBtn />
          )}
        </div>
      </div>

      {/* Scrollable Categories */}
      <div className="relative flex items-center ">
        {/* Left button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0  z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-scroll px-10 scrollbar-hide pb-1"
        >
          {isLoading
            ? Array.from({ length: 15 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="flex-shrink-0 h-9 w-24 rounded-lg"
                />
              ))
            : categories?.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2 py-1 bg-gray-100 rounded-lg whitespace-nowrap cursor-pointer text-sm"
                >
                  {item?.name}
                </div>
              ))}
        </div>

        {/* Right button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
