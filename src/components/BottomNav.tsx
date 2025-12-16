"use client";

import { Home, Dumbbell, Utensils, Users, User } from "lucide-react";
import { motion } from "framer-motion";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "dashboard", icon: Home, label: "Home" },
  { id: "workout", icon: Dumbbell, label: "Workout" },
  { id: "nutrition", icon: Utensils, label: "Nutrition" },
  { id: "community", icon: Users, label: "Community" },
  { id: "profile", icon: User, label: "Profile" },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border">
      <div className="mx-auto max-w-lg">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 gradient-blue rounded-2xl opacity-15"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon
                  className={`h-6 w-6 relative z-10 transition-transform ${
                    isActive ? "scale-110" : ""
                  }`}
                />
                <span className="text-xs font-medium relative z-10">
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
