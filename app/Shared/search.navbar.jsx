"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { useGet_ProductsSearchQuery } from "../features/api/pokemon_Api";
import { useParams } from "next/navigation";

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

export default function NavbarSearch() {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const { data, isLoading: ProductsLoading } = useGet_ProductsSearchQuery({
    search,
  });
  const filteredData = useMemo(
    () =>
      searchData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  return (
    <div
      className={`xl:hidden bg-white px-5 sticky top-0  duration-300 z-10 py-3 ${id ? "hidden" : "block"}`}
    >
      <div>
        <div className="relative">
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
        </div>
      </div>

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
    </div>
  );
}
