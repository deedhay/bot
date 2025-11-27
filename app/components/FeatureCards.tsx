"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import * as Icons from "lucide-react"

const FEATURES = [
  { title: "Advanced Moderation", description: "Keep your server safe with powerful moderation tools and anti-spam protection", icon: Icons.Shield },
  { title: "Smart Leveling System", description: "Engage members with XP rewards, rank cards, and role progression", icon: Icons.TrendingUp },
  { title: "Custom Automation", description: "Set up triggers, welcome messages, and auto-responses instantly", icon: Icons.Zap },
  { title: "Giveaway Manager", description: "Run exciting giveaways with easy setup and automatic winner selection", icon: Icons.Gift },
  { title: "Embed Builder", description: "Create stunning embeds without writing any code", icon: Icons.Palette },
  { title: "Server Analytics", description: "Gain insights into your server with detailed stats and charts", icon: Icons.BarChart3 },
  { title: "Raid Protection", description: "Anti-nuke system with automatic enforcement and whitelist management", icon: Icons.Lock },
  { title: "Role Management", description: "Mass assign roles, create self-role systems, and manage permissions", icon: Icons.Users },
  { title: "Content Moderation", description: "Filter unwanted content with word filters and invite detection", icon: Icons.Eye },
  { title: "Suggestions System", description: "Let your community vote on suggestions with built-in voting workflows", icon: Icons.MessageSquare },
  { title: "User Profiles", description: "Check user info, badges, and server statistics at a glance", icon: Icons.User },
  { title: "Logging & Audits", description: "Track all server changes with detailed logs and audit trails", icon: Icons.FileText },
]

interface Feature {
  title: string
  description: string
  icon: typeof Icons.Shield
}

interface FeatureCardsProps {
  isDark: boolean
}

export default function FeatureCards({ isDark }: FeatureCardsProps) {
  const [cards, setCards] = useState<Feature[]>([])

  useEffect(() => {
    // Shuffle features and select random subset on mount and periodically
    const updateCards = () => {
      const shuffled = [...FEATURES].sort(() => Math.random() - 0.5)
      setCards(shuffled.slice(0, 6))
    }

    updateCards()
    const interval = setInterval(updateCards, 8000) // Change every 8 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto px-4"
      >
        {cards.map((feature, idx) => {
          const Icon = feature.icon
          const randomDelay = Math.random() * 0.3
          const randomX = (Math.random() - 0.5) * 20
          const randomY = (Math.random() - 0.5) * 20

          return (
            <motion.div
              key={feature.title}
              layout
              initial={{ opacity: 0, x: randomX * 2, y: randomY * 2 }}
              animate={{
                opacity: 1,
                x: randomX,
                y: randomY,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: randomDelay,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ scale: 1.05, y: randomY - 5 }}
              className="relative p-5 rounded-2xl border backdrop-blur-sm cursor-pointer group overflow-hidden bg-gradient-to-br from-[#1B1B1B]/80 to-[#000000]/60 border-[#CECECE]/15 hover:border-[#CECECE]/40 transition-all duration-300 rim-light soft-bevel"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#CECECE]/8 to-[#FAFAFA]/5" />

              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="mb-3 inline-block"
                >
                  <Icon
                    className="w-6 h-6 text-[#FAFAFA] group-hover:text-[#CECECE] transition-colors duration-300"
                  />
                </motion.div>

                <h3 className="font-semibold text-sm mb-1 text-[#FAFAFA]">
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#CECECE]/80">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
