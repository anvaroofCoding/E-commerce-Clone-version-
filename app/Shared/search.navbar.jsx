"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import Image from "next/image";
import React, { useMemo, useState } from "react";

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
  const [search, setSearch] = useState("");
  const filteredData = useMemo(
    () =>
      searchData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  return (
    <div className="block xl:hidden bg-white px-5 sticky top-0  duration-300 z-10 py-3">
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
    </div>
  );
}
