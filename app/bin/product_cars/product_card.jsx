"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, HeartFilled } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch } from "react-redux";
import { openDrawer } from "@/app/features/navbar/navbarSlice";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function ProductsCards({ product, loading }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (!product?.id) return;
    try {
      const existing = JSON.parse(localStorage.getItem("star") || "[]");
      setLiked(existing.some((i) => i.id === product.id));
    } catch {
      setLiked(false);
    }
  }, [product?.id]);

  // Toggle like
  function postStar(item) {
    if (!item?.id) return;
    try {
      const existing = JSON.parse(localStorage.getItem("star") || "[]");
      const isExist = existing.find((i) => i.id === item.id);

      if (!isExist) {
        existing.push(item); // Add
        setLiked(true);
      } else {
        // Remove if already liked
        const filtered = existing.filter((i) => i.id !== item.id);
        localStorage.setItem("star", JSON.stringify(filtered));
        setLiked(false);
        return;
      }

      localStorage.setItem("star", JSON.stringify(existing));
    } catch (error) {
      console.error("Failed to save star item:", error);
    }
  }
  const discountedPrice =
    !loading && product
      ? (
          product.price -
          (product.price * product.discountPercentage) / 100
        ).toFixed(2)
      : "0.00";

  return (
    <>
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

        <CardContent
          onClick={() => {
            router.push(`/products/${product.id}`);
          }}
          className="px-3 flex-1 flex flex-col justify-between cursor-pointer"
        >
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
        <CardFooter className="flex justify-between gap-2 px-2 pt-1">
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
                className="flex-1  bg-green-600 hover:bg-green-700 duration-300"
                onClick={() => dispatch(openDrawer(product))}
              >
                Add <ShoppingCart size={16} className="font-bold" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  postStar(product);
                }}
              >
                {liked ? (
                  <IconHeartFilled size={16} className="text-red-500" />
                ) : (
                  <IconHeart stroke={2} size={16} />
                )}
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
