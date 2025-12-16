"use client";

import { motion } from "framer-motion";
import {
  Footprints,
  Flame,
  Droplets,
  Moon,
  Trophy,
  Zap,
  Target,
  TrendingUp,
  ChevronRight,
  Play,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const weeklyStepsData = [
  { day: "Mon", steps: 6500 },
  { day: "Tue", steps: 8200 },
  { day: "Wed", steps: 7100 },
  { day: "Thu", steps: 9500 },
  { day: "Fri", steps: 8800 },
  { day: "Sat", steps: 12000 },
  { day: "Sun", steps: 7200 },
];

const caloriesData = [
  { day: "Mon", burned: 450, consumed: 1800 },
  { day: "Tue", burned: 520, consumed: 1650 },
  { day: "Wed", burned: 380, consumed: 1900 },
  { day: "Thu", burned: 620, consumed: 1750 },
  { day: "Fri", burned: 550, consumed: 1800 },
  { day: "Sat", burned: 720, consumed: 2100 },
  { day: "Sun", burned: 400, consumed: 1700 },
];

const badges = [
  { id: 1, name: "7 Day Streak", icon: Zap, color: "gradient-orange", unlocked: true },
  { id: 2, name: "10K Steps", icon: Footprints, color: "gradient-blue", unlocked: true },
  { id: 3, name: "Early Bird", icon: Moon, color: "gradient-purple", unlocked: true },
  { id: 4, name: "Goal Crusher", icon: Target, color: "gradient-green", unlocked: false },
];

const workoutPlans = [
  {
    id: 1,
    name: "Morning HIIT",
    duration: "25 min",
    calories: 320,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Full Body Strength",
    duration: "45 min",
    calories: 450,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Yoga Flow",
    duration: "30 min",
    calories: 180,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Dashboard() {
  return (
    <motion.div
      className="space-y-6 pb-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-3xl gradient-hero p-6 text-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <p className="text-white/80 text-sm font-medium">Good Morning!</p>
          <h1 className="text-2xl font-bold mt-1">Ready to crush your goals?</h1>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              <span className="font-semibold">7 Day Streak</span>
            </div>
            <div className="h-4 w-px bg-white/30" />
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold">+12% this week</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-lg font-semibold mb-3">Today&apos;s Activity</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 rounded-2xl border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl gradient-blue">
                <Footprints className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground text-xs font-medium">Steps</p>
                <p className="text-xl font-bold">8,432</p>
              </div>
            </div>
            <Progress value={84} className="mt-3 h-2" />
            <p className="text-xs text-muted-foreground mt-1">84% of daily goal</p>
          </Card>

          <Card className="p-4 rounded-2xl border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl gradient-orange">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground text-xs font-medium">Calories</p>
                <p className="text-xl font-bold">524</p>
              </div>
            </div>
            <Progress value={65} className="mt-3 h-2" />
            <p className="text-xs text-muted-foreground mt-1">65% of daily goal</p>
          </Card>

          <Card className="p-4 rounded-2xl border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl gradient-green">
                <Droplets className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground text-xs font-medium">Water</p>
                <p className="text-xl font-bold">1.8L</p>
              </div>
            </div>
            <Progress value={72} className="mt-3 h-2" />
            <p className="text-xs text-muted-foreground mt-1">72% of daily goal</p>
          </Card>

          <Card className="p-4 rounded-2xl border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl gradient-purple">
                <Moon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground text-xs font-medium">Sleep</p>
                <p className="text-xl font-bold">7.5h</p>
              </div>
            </div>
            <Progress value={94} className="mt-3 h-2" />
            <p className="text-xs text-muted-foreground mt-1">Great sleep quality</p>
          </Card>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-lg font-semibold mb-3">Weekly Steps</h2>
        <Card className="p-4 rounded-2xl border-0 shadow-sm">
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={weeklyStepsData}>
              <defs>
                <linearGradient id="stepsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#64748b" }}
              />
              <YAxis hide />
              <Area
                type="monotone"
                dataKey="steps"
                stroke="#0ea5e9"
                strokeWidth={2}
                fill="url(#stepsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-lg font-semibold mb-3">Calories This Week</h2>
        <Card className="p-4 rounded-2xl border-0 shadow-sm">
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={caloriesData} barGap={2}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#64748b" }}
              />
              <YAxis hide />
              <Bar dataKey="burned" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="consumed" fill="#f97316" radius={[4, 4, 0, 0]} opacity={0.5} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
              <span className="text-xs text-muted-foreground">Burned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#f97316] opacity-50" />
              <span className="text-xs text-muted-foreground">Consumed</span>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Achievements</h2>
          <button className="text-sm text-primary font-medium flex items-center gap-1">
            View All <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {badges.map((badge) => (
            <motion.div
              key={badge.id}
              className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-2xl ${
                badge.unlocked ? "bg-card shadow-sm" : "bg-muted opacity-50"
              }`}
              whileHover={{ scale: badge.unlocked ? 1.05 : 1 }}
            >
              <div className={`p-3 rounded-full ${badge.unlocked ? badge.color : "bg-muted-foreground/20"}`}>
                <badge.icon className={`h-6 w-6 ${badge.unlocked ? "text-white" : "text-muted-foreground"}`} />
              </div>
              <span className="text-xs font-medium text-center whitespace-nowrap">{badge.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Workout Plans</h2>
          <button className="text-sm text-primary font-medium flex items-center gap-1">
            See All <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-3">
          {workoutPlans.map((workout, index) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="flex items-center gap-4 p-3 rounded-2xl border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="p-2 rounded-full bg-white/90">
                      <Play className="h-4 w-4 text-primary fill-primary" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{workout.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span>{workout.duration}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Flame className="h-3.5 w-3.5 text-orange-500" />
                      {workout.calories} cal
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
