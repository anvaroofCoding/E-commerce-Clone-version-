"use client";

import { useGetIDProductQuery } from "@/app/features/api/pokemon_Api";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import {
  IconChevronLeft,
  IconHeart,
  IconHeartFilled,
  IconShare,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const { data, isLoading } = useGetIDProductQuery(id);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (!data?.id) return;
    try {
      const existing = JSON.parse(localStorage.getItem("star") || "[]");
      setLiked(existing.some((i) => i.id === data.id));
    } catch {
      setLiked(false);
    }
  }, [data?.id]);

  // Toggle like
  function postStar() {
    if (!data?.id) return;
    try {
      const existing = JSON.parse(localStorage.getItem("star") || "[]");
      const isExist = existing.find((i) => i.id === data.id);

      if (!isExist) {
        existing.push(data); // Add
        setLiked(true);
      } else {
        // Remove if already liked
        const filtered = existing.filter((i) => i.id !== data.id);
        localStorage.setItem("star", JSON.stringify(filtered));
        setLiked(false);
        return;
      }

      localStorage.setItem("star", JSON.stringify(existing));
    } catch (error) {
      console.error("Failed to save star item:", error);
    }
  }

  if (isLoading) {
    return <ProductSkeleton />;
  }

  const discountedPrice = (
    data.price -
    (data.price * data.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div>
      <div className="w-full mb-5 flex justify-between items-center bg-white py-3 px-3 sticky top-0 z-10">
        <Button
          variant="guest"
          onClick={() => {
            router.back();
          }}
        >
          <IconChevronLeft stroke={2} />
        </Button>
        <div>
          <Button variant="guest">
            <IconShare stroke={2} />
          </Button>
          <Button variant="ghost" onClick={postStar}>
            {liked ? (
              <IconHeartFilled size={16} className="text-red-500" />
            ) : (
              <IconHeart stroke={2} size={16} />
            )}
          </Button>
        </div>
      </div>
      <div className="mx-auto xl:w-[70%] w-[95%] max-w-[1440px] xl:pt-10 pt-0 grid md:grid-cols-2 md:gap-12 gap-0">
        {/* LEFT SIDE - IMAGES */}
        <div className="space-y-4">
          <div className="relative w-full h-auto bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={data.thumbnail}
              alt={data.title}
              className="object-contain"
            />
          </div>

          <div className="flex gap-4">
            {data.images.map((img, index) => (
              <div
                key={index}
                className="relative w-24 h-24 bg-gray-100 rounded-xl overflow-hidden border"
              >
                <Image src={img} alt="thumb" fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - DETAILS */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{data.title}</h1>

          <div className="flex items-center gap-2">
            <Star className="text-yellow-500 fill-yellow-500 w-5 h-5" />
            <span className="font-medium">{data.rating}</span>
            <span className="text-gray-500">
              ({data.reviews.length} reviews)
            </span>
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-green-600">
              ${discountedPrice}
            </span>
            <span className="text-lg line-through text-gray-400">
              ${data.price}
            </span>
            <Badge variant="destructive">-{data.discountPercentage}%</Badge>
          </div>

          {/* STOCK */}
          <div className="space-y-2">
            <p className="font-medium">
              Availability:{" "}
              <span className="text-green-600">{data.availabilityStatus}</span>
            </p>
            <p>Stock: {data.stock}</p>
            <p>Minimum order: {data.minimumOrderQuantity}</p>
          </div>

          {/* EXTRA INFO */}
          <div className="border rounded-xl p-4 space-y-2 text-sm">
            <p>
              <b>Brand:</b> {data.brand}
            </p>
            <p>
              <b>SKU:</b> {data.sku}
            </p>
            <p>
              <b>Shipping:</b> {data.shippingInformation}
            </p>
            <p>
              <b>Return:</b> {data.returnPolicy}
            </p>
            <p>
              <b>Warranty:</b> {data.warrantyInformation}
            </p>
            <p>
              <b>Dimensions:</b> {data.dimensions.width} ×{" "}
              {data.dimensions.height} × {data.dimensions.depth}
            </p>
            <p>
              <b>Weight:</b> {data.weight}g
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 flex-col">
            <Button className="w-full text-lg h-12">Add to Cart</Button>
            <Button variant="outline" className="w-full text-lg h-12">
              Buy Now
            </Button>
          </div>

          {/* DESCRIPTION */}
          <div className="pt-6 border-t">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{data.description}</p>
          </div>

          {/* REVIEWS */}
          <div className="pt-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            <div className="space-y-4">
              {data.reviews.map((review, index) => (
                <div key={index} className="border rounded-xl p-4">
                  <div className="flex justify-between">
                    <p className="font-medium">{review.reviewerName}</p>
                    <span className="text-yellow-500">⭐ {review.rating}</span>
                  </div>
                  <p className="text-sm text-gray-500">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-12">
      <div className="space-y-4">
        <Skeleton className="w-full h-[500px] rounded-2xl" />
        <div className="flex gap-4">
          <Skeleton className="w-24 h-24 rounded-xl" />
          <Skeleton className="w-24 h-24 rounded-xl" />
          <Skeleton className="w-24 h-24 rounded-xl" />
        </div>
      </div>

      <div className="space-y-6">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
    </div>
  );
}
