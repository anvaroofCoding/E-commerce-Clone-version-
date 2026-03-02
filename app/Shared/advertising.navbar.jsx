import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function AdvertisingNavbar() {
  return (
    <div className="block xl:hidden bg-white px-5 sticky  duration-300 z-10 pt-3 flex items-center justify-between">
      <div className="flex items-center">
        <img src={"/logo.png"} className="w-20 " />
        <h1 className="text-sm">Ilova bilan juda osson!</h1>
      </div>
      <Button className={"bg-green-600 hover:bg-green-700 duration-300"}>
        Ochish
      </Button>
    </div>
  );
}
