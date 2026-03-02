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
import { useGet_CategoriesQuery } from "../features/api/pokemon_Api";
import { ChevronLeft, ChevronRight } from "lucide-react";

const navItems = [
  { name: "Kirish", icon: IconLogin },
  { name: "Saralangan", icon: IconHeartFilled },
  { name: "Aviachipta", icon: IconPlaneDeparture },
  { name: "Savat", icon: IconShoppingCartFilled },
];

const searchData = [
  {
    id: 1,
    title: "React Dashboard",
    description: "Modern admin panel",
    image: "/images/dashboard.jpg",
  },
  {
    id: 2,
    title: "Next.js Blog",
    description: "SEO optimized blog",
    image: "/images/blog.jpg",
  },
  {
    id: 3,
    title: "E-commerce App",
    description: "Online shopping system",
    image: "/images/shop.jpg",
  },
];

export default function Navbar() {
  const scrollRef = useRef(null);
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

  // Search state
  const [search, setSearch] = useState("");
  const filteredData = useMemo(
    () =>
      searchData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  return (
    <div
      className={`container px-5 xl:block hidden bg-white sticky top-5 pb-3 duration-300 z-10 ${
        suchOpen ? "rounded-t-xl" : "rounded-xl"
      }`}
    >
      {/* Top Row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-10 py-5">
        {/* Logo */}
        {isLoading ? (
          <Skeleton className="w-40 h-20 rounded-md" />
        ) : (
          <img src="/logo.png" alt="Logo" className="w-30" />
        )}

        {/* Search */}
        <div className="w-full  relative">
          {isLoading ? (
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
                <div className="absolute mt-2 w-full bg-background border rounded-xl shadow-xl max-h-72 overflow-y-auto z-50 p-2 space-y-2">
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <Card
                        key={item.id}
                        className="cursor-pointer hover:bg-muted transition"
                      >
                        <CardContent className="p-3 flex gap-3 items-center">
                          <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Hech narsa topilmadi
                    </p>
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
          className="absolute left-0 bottom-3 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-scroll px-10 scrollbar-hide pb-2"
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
                  className="flex-shrink-0 px-4 py-2 bg-gray-100 rounded-lg whitespace-nowrap cursor-pointer"
                >
                  {item?.name}
                </div>
              ))}
        </div>

        {/* Right button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 bottom-3 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
