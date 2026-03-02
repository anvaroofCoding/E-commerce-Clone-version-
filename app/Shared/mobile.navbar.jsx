"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, LayoutGrid, ShoppingCart, Heart, User } from "lucide-react";

export default function MobileNavbar() {
  const [active, setActive] = useState("home");

  const menus = [
    { id: "home", label: "Bosh sahifa", icon: Home },
    { id: "catalog", label: "Kataloglar", icon: LayoutGrid },
    { id: "cart", label: "Savat", icon: ShoppingCart },
    { id: "favorites", label: "Saralangan", icon: Heart },
    { id: "profile", label: "Profil", icon: User },
  ];

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-[95%] max-w-md bg-white shadow-2xl rounded-2xl px-4 py-3 flex justify-between items-center xl:hidden block z-50 border">
      {menus.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className="flex flex-col items-center relative"
          >
            {/* Animated Icon */}
            <motion.div
              animate={{
                scale: isActive ? 1.2 : 1,
                y: isActive ? -4 : 0,
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`p-1 rounded-xl ${
                isActive ? "bg-green-600 text-white" : "text-gray-500"
              }`}
            >
              <Icon size={18} />
            </motion.div>

            {/* Label */}
            <span
              className={`text-[11px] ${
                isActive ? "text-green-600 font-medium" : "text-gray-800"
              }`}
            >
              {item.label}
            </span>

            {/* Active indicator */}
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute -bottom-2 w-6 h-1 bg-green-600 rounded-full"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
