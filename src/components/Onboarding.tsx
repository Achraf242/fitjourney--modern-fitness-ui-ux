"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Dumbbell,
  Apple,
  Users,
  Target,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const onboardingSteps = [
  {
    id: 1,
    title: "Track Your Fitness",
    description: "Monitor your daily activities, steps, calories burned, and sleep patterns all in one place.",
    icon: Dumbbell,
    gradient: "gradient-blue",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Nutrition Made Easy",
    description: "Log your meals, track macros, and get personalized nutrition insights to fuel your goals.",
    icon: Apple,
    gradient: "gradient-green",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Join the Community",
    description: "Connect with friends, join challenges, and climb the leaderboards together.",
    icon: Users,
    gradient: "gradient-orange",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Achieve Your Goals",
    description: "Set personalized goals, earn badges, and celebrate every milestone on your fitness journey.",
    icon: Target,
    gradient: "gradient-purple",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop",
  },
];

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = onboardingSteps[currentStep];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? "w-8 bg-primary"
                  : index < currentStep
                  ? "w-4 bg-primary/50"
                  : "w-4 bg-muted"
              }`}
            />
          ))}
        </div>
        <Button variant="ghost" size="sm" onClick={handleSkip}>
          Skip
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md text-center"
          >
            <div className="relative mx-auto mb-8">
              <div className="w-64 h-64 mx-auto rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <motion.div
                className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-2xl ${step.gradient} flex items-center justify-center shadow-lg`}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <step.icon className="h-10 w-10 text-white" />
              </motion.div>
            </div>

            <motion.h1
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {step.title}
            </motion.h1>

            <motion.p
              className="text-muted-foreground text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {step.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-6 pb-8">
        <motion.div whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleNext}
            className={`w-full h-14 rounded-2xl text-lg font-semibold ${step.gradient} hover:opacity-90 transition-opacity`}
          >
            {currentStep === onboardingSteps.length - 1 ? (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Get Started
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="h-5 w-5 ml-2" />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
