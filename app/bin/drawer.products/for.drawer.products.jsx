"use client";

import { useEffect, useState } from "react";
import { closeDrawer } from "@/app/features/navbar/navbarSlice";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from "@/components/ui/drawer";

import {
  IconShoppingCart,
  IconStar,
  IconTruck,
  IconTag,
  IconBarcode,
  IconRulerMeasure,
  IconPackage,
  IconDiscount2,
  IconCopy,
  IconCheck,
} from "@tabler/icons-react";

import { useDispatch, useSelector } from "react-redux";

export function ForDrawerProducts() {
  const dispatch = useDispatch();
  const { isOpen, product_data } = useSelector((state) => state.navbar);

  const [productLink, setProductLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (product_data?.id) {
      const link = `${window.location.origin}/product/${product_data.id}`;
      setProductLink(link);
    }
  }, [product_data]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(productLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!product_data) return null;

  return (
    <Drawer
      direction="right"
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) dispatch(closeDrawer());
      }}
    >
      <DrawerOverlay className="bg-black/40 backdrop-blur-sm" />

      <DrawerContent className="bg-white w-full sm:max-w-md overflow-hidden flex flex-col">
        <DrawerHeader className="border-b">
          <DrawerTitle className="text-xl font-bold">
            {product_data.title}
          </DrawerTitle>
          <DrawerDescription className="text-sm text-gray-500">
            {product_data.brand} • {product_data.category}
          </DrawerDescription>
        </DrawerHeader>

        <div className="overflow-y-auto px-5 py-4 space-y-6 flex-1">
          {/* IMAGE */}
          <div className="rounded-xl overflow-hidden border">
            <img
              src={product_data.thumbnail}
              alt={product_data.title}
              className="w-full object-cover"
            />
          </div>

          {/* PRICE */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">
                ${product_data.price}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <IconDiscount2 size={16} />
                {product_data.discountPercentage}% discount
              </p>
            </div>

            <div className="text-sm text-right">
              <p className="font-semibold text-green-600">
                {product_data.availabilityStatus}
              </p>
              <p className="text-gray-500">Stock: {product_data.stock}</p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <h3 className="font-semibold mb-1">Description</h3>
            <p className="text-sm text-gray-600">{product_data.description}</p>
          </div>

          {/* DIMENSIONS */}
          <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-1">
            <h3 className="font-semibold flex items-center gap-1">
              <IconRulerMeasure size={16} /> Dimensions
            </h3>
            <p>Width: {product_data?.dimensions?.width}</p>
            <p>Height: {product_data?.dimensions?.height}</p>
            <p>Depth: {product_data?.dimensions?.depth}</p>
            <p>Weight: {product_data.weight}g</p>
          </div>

          {/* SHIPPING */}
          <div className="text-sm space-y-1">
            <p className="flex items-center gap-1">
              <IconTruck size={16} />
              {product_data.shippingInformation}
            </p>
            <p>Warranty: {product_data.warrantyInformation}</p>
            <p>Return Policy: {product_data.returnPolicy}</p>
          </div>

          {/* META */}
          <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-1">
            <h3 className="font-semibold flex items-center gap-1">
              <IconPackage size={16} /> Product Info
            </h3>
            <p className="flex items-center gap-1">
              <IconTag size={14} />
              SKU: {product_data.sku}
            </p>
            <p className="flex items-center gap-1">
              <IconBarcode size={14} />
              Barcode: {product_data.meta?.barcode}
            </p>
            <p>Minimum Order: {product_data.minimumOrderQuantity}</p>
          </div>

          {/* REVIEWS */}
          <div>
            <h3 className="font-semibold mb-2">Reviews</h3>
            <div className="space-y-3">
              {product_data.reviews?.map((review, i) => (
                <div key={i} className="border rounded-lg p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{review.reviewerName}</span>
                    <span className="flex items-center gap-1 text-yellow-500">
                      <IconStar size={14} />
                      {review.rating}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* QR + LINK */}
          <div className="bg-gray-100 rounded-xl p-4 space-y-3 text-center">
            <h3 className="font-semibold">Product QR Code</h3>

            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                productLink,
              )}`}
              alt="QR Code"
              className="mx-auto rounded-lg border"
            />

            <div className="text-xs break-all text-gray-600">{productLink}</div>

            <Button onClick={handleCopy} variant="secondary" className="w-full">
              {copied ? (
                <>
                  Copied <IconCheck size={16} />
                </>
              ) : (
                <>
                  Copy Link <IconCopy size={16} />
                </>
              )}
            </Button>
          </div>
        </div>

        <DrawerFooter className="border-t">
          <Button className="bg-green-600 hover:bg-green-700 transition">
            Add <IconShoppingCart size={18} />
          </Button>

          <DrawerClose asChild>
            <Button variant="secondary" onClick={() => dispatch(closeDrawer())}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
