"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsCards({ product, loading }) {
  const discountedPrice =
    !loading && product
      ? (
          product.price -
          (product.price * product.discountPercentage) / 100
        ).toFixed(2)
      : "0.00";

  return (
    <Card className="border-none hover:shadow-md transition duration-300 flex flex-col justify-between p-0 pb-4">
      {/* Product Image */}
      <div className="relative w-full h-36 sm:h-40 md:h-44 lg:h-36">
        {loading ? (
          <Skeleton className="w-full h-full rounded-t" />
        ) : (
          <Image
            src={product.images[0] || product.thumbnail}
            alt={product.title}
            fill
            className="object-contain rounded-t"
          />
        )}
      </div>

      <CardContent className="px-3 flex-1 flex flex-col justify-between">
        {/* Title & Description */}
        {loading ? (
          <Skeleton className="h-4 w-3/4 mb-1" />
        ) : (
          <h3 className="text-sm font-medium truncate">{product.title}</h3>
        )}
        {loading ? (
          <Skeleton className="h-3 w-full mt-1" />
        ) : (
          <p className="text-xs text-gray-500 line-clamp-2 mt-1">
            {product.description}
          </p>
        )}

        {loading ? <Skeleton className="h-3 w-full mt-1" /> : ""}
        {loading ? <Skeleton className="h-3 w-[20%] mt-1" /> : ""}

        {/* Price & Discount */}
        {!loading && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm font-semibold">${discountedPrice}</span>
            {product.discountPercentage > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{product.discountPercentage.toFixed(0)}%
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      {/* Actions */}
      <CardFooter className="flex justify-between px-2 pt-1">
        {loading ? (
          <div className="grid grid-cols-6 w-full gap-2">
            <Skeleton className="h-8 w-full rounded col-span-5" />
            <Skeleton className="h-8 w-full rounded col-span-1" />
          </div>
        ) : (
          <>
            <Button
              size="sm"
              variant="default"
              className="flex-1 mr-1 bg-green-600 hover:bg-green-700 duration-300"
            >
              <ShoppingCart size={16} className="mr-1" /> Qo'shish
            </Button>
            <Button size="sm" variant="ghost">
              <Heart size={16} />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
