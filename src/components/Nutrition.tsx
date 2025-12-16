"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Flame,
  Apple,
  Beef,
  Wheat,
  Droplets,
  ChevronRight,
  Clock,
  X,
  Check,
  Bell,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const macroData = [
  { name: "Protein", value: 120, goal: 150, color: "#0ea5e9" },
  { name: "Carbs", value: 180, goal: 250, color: "#22c55e" },
  { name: "Fat", value: 55, goal: 65, color: "#f97316" },
];

const meals = [
  {
    id: 1,
    type: "Breakfast",
    time: "8:00 AM",
    calories: 420,
    items: ["Oatmeal with berries", "Greek yogurt", "Coffee"],
    logged: true,
  },
  {
    id: 2,
    type: "Lunch",
    time: "12:30 PM",
    calories: 650,
    items: ["Grilled chicken salad", "Whole grain bread", "Orange juice"],
    logged: true,
  },
  {
    id: 3,
    type: "Snack",
    time: "3:30 PM",
    calories: 180,
    items: ["Protein bar", "Apple"],
    logged: true,
  },
  {
    id: 4,
    type: "Dinner",
    time: "7:00 PM",
    calories: 0,
    items: [],
    logged: false,
  },
];

const foodSuggestions = [
  { id: 1, name: "Grilled Salmon", calories: 280, protein: 35, carbs: 0, fat: 15, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=100&h=100&fit=crop" },
  { id: 2, name: "Quinoa Bowl", calories: 320, protein: 12, carbs: 52, fat: 8, image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=100&h=100&fit=crop" },
  { id: 3, name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=100&h=100&fit=crop" },
  { id: 4, name: "Mixed Salad", calories: 120, protein: 4, carbs: 18, fat: 4, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&h=100&fit=crop" },
  { id: 5, name: "Brown Rice", calories: 215, protein: 5, carbs: 45, fat: 2, image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=100&h=100&fit=crop" },
];

const mealReminders = [
  { id: 1, meal: "Breakfast", time: "7:30 AM", enabled: true },
  { id: 2, meal: "Lunch", time: "12:00 PM", enabled: true },
  { id: 3, meal: "Dinner", time: "6:30 PM", enabled: true },
  { id: 4, meal: "Hydration", time: "Every 2 hours", enabled: false },
];

export function Nutrition() {
  const [showAddFood, setShowAddFood] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const calorieGoal = 2000;
  const calorieProgress = (totalCalories / calorieGoal) * 100;

  const pieData = macroData.map((m) => ({ name: m.name, value: m.value }));

  const filteredSuggestions = foodSuggestions.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 pb-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Nutrition</h1>
          <p className="text-muted-foreground">Track your daily intake</p>
        </div>
        <Button
          size="icon"
          className="rounded-full gradient-green hover:opacity-90"
          onClick={() => setShowAddFood(true)}
        >
          <Plus className="h-5 w-5 text-white" />
        </Button>
      </div>

      <Card className="p-5 rounded-3xl border-0 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="flex items-center gap-6">
          <div className="relative w-28 h-28">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={50}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{totalCalories}</span>
              <span className="text-xs text-muted-foreground">kcal</span>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">Daily Goal</span>
                <span className="font-semibold">{totalCalories} / {calorieGoal}</span>
              </div>
              <Progress value={calorieProgress} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">
              {calorieGoal - totalCalories} calories remaining
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        {macroData.map((macro) => (
          <Card key={macro.name} className="p-3 rounded-2xl border-0 shadow-sm text-center">
            <div
              className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-2"
              style={{ backgroundColor: `${macro.color}20` }}
            >
              {macro.name === "Protein" && <Beef className="h-5 w-5" style={{ color: macro.color }} />}
              {macro.name === "Carbs" && <Wheat className="h-5 w-5" style={{ color: macro.color }} />}
              {macro.name === "Fat" && <Droplets className="h-5 w-5" style={{ color: macro.color }} />}
            </div>
            <p className="text-lg font-bold">{macro.value}g</p>
            <p className="text-xs text-muted-foreground">{macro.name}</p>
            <Progress
              value={(macro.value / macro.goal) * 100}
              className="h-1 mt-2"
              style={{ "--progress-color": macro.color } as React.CSSProperties}
            />
          </Card>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Today&apos;s Meals</h2>
          <button className="text-sm text-primary font-medium flex items-center gap-1">
            Meal Plan <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-3">
          {meals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`p-4 rounded-2xl border-0 shadow-sm cursor-pointer transition-all hover:shadow-md ${
                  !meal.logged ? "border-2 border-dashed border-primary/30" : ""
                }`}
                onClick={() => {
                  if (!meal.logged) {
                    setSelectedMeal(meal.type);
                    setShowAddFood(true);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        meal.logged ? "gradient-green" : "bg-muted"
                      }`}
                    >
                      {meal.logged ? (
                        <Check className="h-5 w-5 text-white" />
                      ) : (
                        <Plus className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{meal.type}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{meal.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {meal.logged ? (
                      <>
                        <p className="font-bold text-lg">{meal.calories}</p>
                        <p className="text-xs text-muted-foreground">calories</p>
                      </>
                    ) : (
                      <span className="text-sm text-primary font-medium">Log meal</span>
                    )}
                  </div>
                </div>
                {meal.logged && meal.items.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      {meal.items.join(" • ")}
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Meal Reminders</h2>
          <Bell className="h-5 w-5 text-muted-foreground" />
        </div>
        <Card className="p-4 rounded-2xl border-0 shadow-sm">
          <div className="space-y-3">
            {mealReminders.map((reminder) => (
              <div key={reminder.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{reminder.meal}</p>
                  <p className="text-xs text-muted-foreground">{reminder.time}</p>
                </div>
                <div
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                    reminder.enabled ? "gradient-green" : "bg-muted"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      reminder.enabled ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <AnimatePresence>
        {showAddFood && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-end"
            onClick={() => setShowAddFood(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full bg-background rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">
                  {selectedMeal ? `Log ${selectedMeal}` : "Add Food"}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setShowAddFood(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search foods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl h-12"
                />
              </div>

              <h3 className="font-semibold mb-3">Suggestions</h3>
              <div className="space-y-3">
                {filteredSuggestions.map((food) => (
                  <Card
                    key={food.id}
                    className="flex items-center gap-3 p-3 rounded-2xl border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{food.name}</h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Flame className="h-3 w-3 text-orange-500" />
                          {food.calories} cal
                        </span>
                        <span>P: {food.protein}g</span>
                        <span>C: {food.carbs}g</span>
                        <span>F: {food.fat}g</span>
                      </div>
                    </div>
                    <Button size="sm" className="rounded-full gradient-blue hover:opacity-90">
                      <Plus className="h-4 w-4 text-white" />
                    </Button>
                  </Card>
                ))}
              </div>

              <Button className="w-full mt-6 rounded-xl h-12 gradient-green hover:opacity-90">
                <Apple className="h-5 w-5 mr-2 text-white" />
                <span className="text-white">Add Custom Food</span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
