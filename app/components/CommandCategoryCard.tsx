"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { CATEGORY_ICONS, CATEGORY_COLORS, CATEGORY_DESCRIPTIONS } from "@/lib/category-icons";

interface CommandCategoryCardProps {
  category: string;
  commandCount: number;
  isDark: boolean;
  onClick?: () => void;
}

export default function CommandCategoryCard({
  category,
  commandCount,
  isDark,
  onClick,
}: CommandCategoryCardProps) {
  const iconName = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] || "Package";
  const colorGradient = CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || "from-gray-500 to-gray-600";
  const description = CATEGORY_DESCRIPTIONS[category as keyof typeof CATEGORY_DESCRIPTIONS] || category;

  const IconComponent = (Icons as any)[iconName];

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`cursor-pointer group relative overflow-hidden rounded-xl p-6 ${
        isDark ? "bg-gray-900/50 border border-white/10" : "bg-white border border-black/10"
      } transition-all duration-300 hover:shadow-xl`}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${colorGradient} transition-opacity duration-300`} />

      {/* Icon */}
      <div className={`mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br ${colorGradient}`}>
        {IconComponent ? (
          <IconComponent className="w-6 h-6 text-white" />
        ) : (
          <Icons.Package className="w-6 h-6 text-white" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className={`text-lg font-semibold mb-1 capitalize ${isDark ? "text-white" : "text-black"}`}>
          {category}
        </h3>
        <p className={`text-sm mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {description}
        </p>
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
          isDark ? "bg-white/10 text-gray-300" : "bg-black/10 text-gray-700"
        }`}>
          {commandCount} command{commandCount !== 1 ? "s" : ""}
        </div>
      </div>
    </motion.div>
  );
}
