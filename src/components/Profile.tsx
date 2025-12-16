"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Scale,
  Ruler,
  Target,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Camera,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export function Profile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@fitjourney.com",
    phone: "+1 (555) 123-4567",
    birthDate: "1995-06-15",
    weight: "75",
    height: "180",
    goal: "Build Muscle",
  });

  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    mealReminders: true,
    socialUpdates: false,
    weeklyReports: true,
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 p-6 rounded-2xl glass"
      >
        <div className="relative">
          <Avatar className="w-24 h-24 border-4 border-primary">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-lg"
          >
            <Camera className="w-4 h-4" />
          </motion.button>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-2xl glass space-y-4"
      >
        <h3 className="font-semibold flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Personal Information
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs text-muted-foreground">
              Full Name
            </Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => handleProfileChange("name", e.target.value)}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs text-muted-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => handleProfileChange("email", e.target.value)}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs text-muted-foreground">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={profile.phone}
              onChange={(e) => handleProfileChange("phone", e.target.value)}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate" className="text-xs text-muted-foreground">
              Date of Birth
            </Label>
            <Input
              id="birthDate"
              type="date"
              value={profile.birthDate}
              onChange={(e) => handleProfileChange("birthDate", e.target.value)}
              className="bg-background/50"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl glass space-y-4"
      >
        <h3 className="font-semibold flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Fitness Details
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-xs text-muted-foreground">
              Weight (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              value={profile.weight}
              onChange={(e) => handleProfileChange("weight", e.target.value)}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height" className="text-xs text-muted-foreground">
              Height (cm)
            </Label>
            <Input
              id="height"
              type="number"
              value={profile.height}
              onChange={(e) => handleProfileChange("height", e.target.value)}
              className="bg-background/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="goal" className="text-xs text-muted-foreground">
            Fitness Goal
          </Label>
          <Input
            id="goal"
            value={profile.goal}
            onChange={(e) => handleProfileChange("goal", e.target.value)}
            className="bg-background/50"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl glass space-y-4"
      >
        <h3 className="font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Notifications
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Workout Reminders</p>
              <p className="text-xs text-muted-foreground">
                Get notified about your scheduled workouts
              </p>
            </div>
            <Switch
              checked={notifications.workoutReminders}
              onCheckedChange={(checked) =>
                handleNotificationChange("workoutReminders", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Meal Reminders</p>
              <p className="text-xs text-muted-foreground">
                Daily reminders to log your meals
              </p>
            </div>
            <Switch
              checked={notifications.mealReminders}
              onCheckedChange={(checked) =>
                handleNotificationChange("mealReminders", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Social Updates</p>
              <p className="text-xs text-muted-foreground">
                Notifications from community interactions
              </p>
            </div>
            <Switch
              checked={notifications.socialUpdates}
              onCheckedChange={(checked) =>
                handleNotificationChange("socialUpdates", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Weekly Reports</p>
              <p className="text-xs text-muted-foreground">
                Summary of your weekly progress
              </p>
            </div>
            <Switch
              checked={notifications.weeklyReports}
              onCheckedChange={(checked) =>
                handleNotificationChange("weeklyReports", checked)
              }
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full p-4 rounded-xl glass flex items-center justify-between hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-medium">Privacy & Security</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full p-4 rounded-xl glass flex items-center justify-between hover:bg-destructive/10 transition-colors text-destructive"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </div>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="pt-4"
      >
        <Button className="w-full gradient-primary text-white py-6 rounded-xl font-semibold">
          Save Changes
        </Button>
      </motion.div>
    </div>
  );
}
