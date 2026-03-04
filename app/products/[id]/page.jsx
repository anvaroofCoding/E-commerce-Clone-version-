"use client";

import { useGetIDProductQuery } from "@/app/features/api/pokemon_Api";
import { useParams, useRouter } from "next/navigation";
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
import React, { useEffect, useMemo, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const { data, isLoading } = useGetIDProductQuery(id);

  // ===== State =====
  const [liked, setLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // ===== Images (duplicate-free) =====
  const images = useMemo(() => {
    if (!data) return [];
    return Array.from(new Set([...(data.images || [])])).filter(Boolean);
  }, [data]);

  // ===== Set default selected image =====
  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  // ===== Carousel API =====
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // ===== localStorage like toggle =====
  useEffect(() => {
    if (!data?.id) return;
    try {
      const existing = JSON.parse(localStorage.getItem("star") || "[]");
      setLiked(existing.some((i) => i.id === data.id));
    } catch {
      setLiked(false);
    }
  }, [data?.id]);

  const postStar = () => {
    if (!data?.id) return;
    try {
      const existing = JSON.parse(localStorage.getItem("star") || "[]");
      const isExist = existing.find((i) => i.id === data.id);

      if (!isExist) {
        existing.push(data);
        setLiked(true);
      } else {
        const filtered = existing.filter((i) => i.id !== data.id);
        localStorage.setItem("star", JSON.stringify(filtered));
        setLiked(false);
        return;
      }

      localStorage.setItem("star", JSON.stringify(existing));
    } catch (error) {
      console.error("Failed to save star item:", error);
    }
  };

  const discountedPrice = (
    data?.price -
    (data?.price * data?.discountPercentage) / 100
  ).toFixed(2);

  // ===== JSX =====
  return (
    <div>
      {/* ===== Header ===== */}
      <div className="w-full mb-5 justify-between items-center bg-white py-3 px-3 sticky top-0 z-10 flex xl:hidden">
        <Button variant="guest" onClick={() => router.back()}>
          <IconChevronLeft stroke={2} />
        </Button>
        <div className="flex gap-2">
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

      {/* ===== Desktop Header ===== */}
      <div className="w-full mb-5 pt-6 rounded-xl justify-between items-center bg-white py-3 px-3 hidden xl:flex container">
        <Button variant="guest" onClick={() => router.back()}>
          <IconChevronLeft stroke={2} />
        </Button>
        <div className="flex gap-2">
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

      {/* ===== Main Grid ===== */}
      <div className="mx-auto xl:w-[70%] w-[95%] max-w-[1440px] xl:pt-5 pt-0 grid md:grid-cols-2 md:gap-5 gap-0">
        {/* ===== Left: Images ===== */}
        <div className="space-y-6 xl:block hidden">
          <div className="relative w-full h-[400px] bg-white rounded-2xl overflow-hidden flex items-center justify-center">
            {isLoading ? (
              <Skeleton className={"w-[97%] h-[95%]"} />
            ) : (
              <img
                src={selectedImage || images[0]}
                alt={data?.title}
                className="object-contain w-full h-full"
              />
            )}
          </div>

          {/* Carousel Thumbnails */}
          <Carousel className="w-full">
            <CarouselContent>
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <CarouselItem key={index} className="basis-1/4">
                      <div className="p-1">
                        <Skeleton className="aspect-square w-full rounded-xl" />
                      </div>
                    </CarouselItem>
                  ))
                : images.map((img, index) => (
                    <CarouselItem key={index} className="basis-1/4">
                      <div className="p-1">
                        <Card
                          onClick={() => setSelectedImage(img)}
                          className={`cursor-pointer border-2 transition ${
                            selectedImage === img
                              ? "border-green-600"
                              : "border-transparent"
                          }`}
                        >
                          <CardContent className="flex aspect-square items-center justify-center p-2">
                            <img
                              src={img}
                              alt="thumb"
                              className="object-contain w-full h-full"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Mobile Carousel */}
        {isLoading ? (
          <div className="mx-auto xl:hidden block bg-white p-2 w-[95%] rounded-xl ">
            <Skeleton className={"w-full h-80 rounded-xl"} />
          </div>
        ) : (
          <div className="mx-auto xl:hidden block">
            <Carousel setApi={setApi} className="w-full max-w-xs">
              <CarouselContent>
                {images.map((img, index) => (
                  <CarouselItem key={index}>
                    <Card className="m-px">
                      <CardContent className="flex aspect-square items-center justify-center p-2">
                        <img
                          src={img}
                          alt={data?.title}
                          className="object-contain w-full h-full"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="flex justify-center gap-2 py-2">
              {Array.from({ length: count }).map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    current - 1 === index ? "bg-green-600 w-3" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* ===== Right: Details ===== */}
        <div className="space-y-6 bg-white p-6 rounded-xl mt-2 xl:mt-0">
          {isLoading ? (
            <Skeleton className={"w-full h-10 rounded-xl"} />
          ) : (
            <h1 className="text-3xl font-bold">{data?.title}</h1>
          )}

          {isLoading ? (
            <Skeleton className={"w-full h-5 rounded-xl"} />
          ) : (
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500 fill-yellow-500 w-5 h-5" />
              <span className="font-medium">{data?.rating}</span>
              <span className="text-gray-500">
                ({data?.reviews?.length} reviews)
              </span>
            </div>
          )}

          {isLoading ? (
            <Skeleton className={"w-full h-10 rounded-xl"} />
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-green-600">
                ${discountedPrice}
              </span>
              <span className="text-lg line-through text-gray-800">
                ${data?.price}
              </span>
              <Badge variant="destructive">-{data?.discountPercentage}%</Badge>
            </div>
          )}

          {/* STOCK */}
          <div className="space-y-2">
            {isLoading ? (
              <Skeleton className={"w-full h-5 rounded-xl"} />
            ) : (
              <p className="font-medium">
                Availability:{" "}
                <span className="text-green-600">
                  {data?.availabilityStatus}
                </span>
              </p>
            )}
            {isLoading ? (
              <Skeleton className={"w-full h-5 rounded-xl"} />
            ) : (
              <p>Stock: {data?.stock}</p>
            )}
            {isLoading ? (
              <Skeleton className={"w-full h-5 rounded-xl"} />
            ) : (
              <p>Minimum order: {data?.minimumOrderQuantity}</p>
            )}
          </div>

          {/* EXTRA INFO */}
          <div className="space-y-2 text-sm">
            {isLoading ? (
              <Skeleton className={"w-full h-4 rounded-xl"} />
            ) : (
              <p>
                <b>Brand:</b> {data?.brand}
              </p>
            )}
            {isLoading ? (
              <Skeleton className={"w-full h-4 rounded-xl"} />
            ) : (
              <p>
                <b>SKU:</b> {data?.sku}
              </p>
            )}
            {isLoading ? (
              <Skeleton className={"w-full h-4 rounded-xl"} />
            ) : (
              <p>
                <b>Shipping:</b> {data?.shippingInformation}
              </p>
            )}
            {isLoading ? (
              <Skeleton className={"w-full h-4 rounded-xl"} />
            ) : (
              <p>
                <b>Return:</b> {data?.returnPolicy}
              </p>
            )}
            {isLoading ? (
              <Skeleton className={"w-full h-4 rounded-xl"} />
            ) : (
              <p>
                <b>Warranty:</b> {data?.warrantyInformation}
              </p>
            )}
            {isLoading ? (
              <Skeleton className={"w-full h-4 rounded-xl"} />
            ) : (
              <p>
                <b>Dimensions:</b> {data?.dimensions?.width} ×{" "}
                {data?.dimensions?.height} × {data?.dimensions?.depth}
              </p>
            )}
            {isLoading ? (
              <Skeleton className={"w-full h-4 rounded-xl"} />
            ) : (
              <p>
                <b>Weight:</b> {data?.weight}g
              </p>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="pt-6 border-t mt-5 xl:mt-0">
          {isLoading ? (
            <Skeleton className={"w-full h-10 rounded-xl"} />
          ) : (
            <h2 className="text-xl font-semibold mb-2">Description</h2>
          )}
          {isLoading ? (
            <Skeleton className={"w-full h-5 rounded-xl"} />
          ) : (
            <p className="text-gray-600">{data?.description}</p>
          )}
        </div>

        {/* REVIEWS */}

        <div className="pt-6 border-t mt-5 xl:mt-0">
          {isLoading ? (
            <Skeleton className={"w-full h-10 rounded-xl"} />
          ) : (
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          )}

          <div className="space-y-4">
            {data?.reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-xl p-4">
                {isLoading ? (
                  <Skeleton className={"w-full h-10 rounded-xl"} />
                ) : (
                  <div className="flex justify-between">
                    <p className="font-medium">{review?.reviewerName}</p>
                    <span className="text-yellow-500">⭐ {review?.rating}</span>
                  </div>
                )}
                {isLoading ? (
                  <Skeleton className={"w-full h-5 rounded-xl"} />
                ) : (
                  <p className="text-sm text-gray-500">{review?.comment}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
