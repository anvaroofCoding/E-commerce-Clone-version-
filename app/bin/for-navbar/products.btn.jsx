"use client";
import { useGet_CategoriesQuery } from "@/app/features/api/pokemon_Api";
import { toggle } from "@/app/features/navbar/navbar.moda";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IconChartCohort, IconChevronRight, IconX } from "@tabler/icons-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductsBtn() {
  const suchOpen = useSelector((state) => state.navbar.value);
  const dispatch = useDispatch();
  const { data, isLoading } = useGet_CategoriesQuery();

  return (
    <div>
      <Button
        className="bg-green-600 hover:bg-green-500 duration-300 "
        onClick={() => dispatch(toggle())}
      >
        {suchOpen ? (
          <IconX stroke={2} size={17} />
        ) : (
          <IconChartCohort stroke={2} size={17} />
        )}
        Katalog
      </Button>

      <div
        className={`
          absolute left-0 top-full w-full h-[80vh] bg-white rounded-b-xl
          transform transition-all duration-200 ease-in-out overflow-hidden p-3
          ${
            suchOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }
        `}
      >
        <div className="w-full h-full grid grid-cols-5">
          {/* LEFT SIDE */}
          <div className="w-full h-full col-span-1 flex flex-col gap-2 overflow-y-auto pr-2">
            {isLoading
              ? // 🔥 Skeleton holati
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2 px-2 py-2">
                    <Skeleton className="h-4 w-24 rounded-md" />
                    <Skeleton className="h-4 w-4 rounded-md ml-auto" />
                  </div>
                ))
              : // ✅ Data kelganda
                data?.map((inf, inx) => (
                  <div
                    className="hover:bg-gray-100 duration-200 rounded-xl px-2 py-2 flex items-center justify-between gap-2 cursor-pointer"
                    key={inx}
                  >
                    <span>{inf?.name}</span>
                    <IconChevronRight size={16} stroke={2} />
                  </div>
                ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full h-full col-span-4"></div>
        </div>
      </div>
    </div>
  );
}
