"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Check,
  Clock,
  Flame,
  Dumbbell,
  ChevronRight,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const exercises = [
  {
    id: 1,
    name: "Jumping Jacks",
    duration: 45,
    reps: null,
    image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=400&h=300&fit=crop",
    instructions: "Stand upright, jump while spreading legs and arms, return to start.",
    muscleGroup: "Full Body",
  },
  {
    id: 2,
    name: "Push-ups",
    duration: null,
    reps: 15,
    image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=300&fit=crop",
    instructions: "Start in plank position, lower chest to floor, push back up.",
    muscleGroup: "Chest, Arms",
  },
  {
    id: 3,
    name: "Squats",
    duration: null,
    reps: 20,
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop",
    instructions: "Stand with feet shoulder-width apart, lower hips, stand back up.",
    muscleGroup: "Legs, Glutes",
  },
  {
    id: 4,
    name: "Plank Hold",
    duration: 60,
    reps: null,
    image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&h=300&fit=crop",
    instructions: "Hold forearm plank position, keep body straight, engage core.",
    muscleGroup: "Core",
  },
  {
    id: 5,
    name: "Lunges",
    duration: null,
    reps: 12,
    image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400&h=300&fit=crop",
    instructions: "Step forward, lower back knee toward floor, alternate legs.",
    muscleGroup: "Legs, Glutes",
  },
];

const workoutCategories = [
  { id: "hiit", name: "HIIT", icon: "🔥", color: "gradient-orange" },
  { id: "strength", name: "Strength", icon: "💪", color: "gradient-blue" },
  { id: "cardio", name: "Cardio", icon: "❤️", color: "gradient-pink" },
  { id: "yoga", name: "Yoga", icon: "🧘", color: "gradient-purple" },
  { id: "stretch", name: "Stretch", icon: "🤸", color: "gradient-green" },
];

export function Workout() {
  const [activeWorkout, setActiveWorkout] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);

  const currentExercise = exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + (completedExercises.includes(currentExercise?.id) ? 1 : 0)) / exercises.length) * 100;

  const handleNextExercise = useCallback(() => {
    if (!completedExercises.includes(currentExercise.id)) {
      setCompletedExercises([...completedExercises, currentExercise.id]);
      setTotalCaloriesBurned((prev) => prev + Math.floor(Math.random() * 30 + 20));
    }
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setIsPlaying(false);
      setTimeLeft(exercises[currentExerciseIndex + 1].duration || 0);
    } else {
      setActiveWorkout(false);
      setIsPlaying(false);
    }
  }, [completedExercises, currentExercise, currentExerciseIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleNextExercise();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, handleNextExercise]);

  const startWorkout = () => {
    setActiveWorkout(true);
    setCurrentExerciseIndex(0);
    setCompletedExercises([]);
    setTotalCaloriesBurned(0);
    setTimeLeft(exercises[0].duration || 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (activeWorkout) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[calc(100vh-140px)]"
      >
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveWorkout(false)}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Exercise {currentExerciseIndex + 1} of {exercises.length}</p>
          </div>
          <div className="w-10" />
        </div>

        <Progress value={progress} className="h-2 mb-6" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentExercise.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-video">
              <img
                src={currentExercise.image}
                alt={currentExercise.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {currentExercise.muscleGroup}
                </span>
                <h2 className="text-2xl font-bold mt-2">{currentExercise.name}</h2>
              </div>
            </div>

            <Card className="p-6 rounded-3xl border-0 shadow-lg text-center">
              {currentExercise.duration ? (
                <div className="space-y-4">
                  <div className="relative w-40 h-40 mx-auto">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="8"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="#0ea5e9"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={440}
                        strokeDashoffset={440 - (440 * (timeLeft / currentExercise.duration))}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold">{formatTime(timeLeft)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-6">
                  <p className="text-6xl font-bold text-gradient">{currentExercise.reps}</p>
                  <p className="text-muted-foreground mt-2">repetitions</p>
                </div>
              )}

              <p className="text-muted-foreground mt-4 text-sm">
                {currentExercise.instructions}
              </p>

              <div className="flex justify-center gap-4 mt-6">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 rounded-full"
                  onClick={() => setTimeLeft(currentExercise.duration || 0)}
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
                
                {currentExercise.duration ? (
                  <Button
                    size="icon"
                    className="h-16 w-16 rounded-full gradient-blue hover:opacity-90"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6 text-white" />
                    ) : (
                      <Play className="h-6 w-6 text-white ml-1" />
                    )}
                  </Button>
                ) : (
                  <Button
                    size="icon"
                    className="h-16 w-16 rounded-full gradient-green hover:opacity-90"
                    onClick={handleNextExercise}
                  >
                    <Check className="h-6 w-6 text-white" />
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 rounded-full"
                  onClick={handleNextExercise}
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>
            </Card>

            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{exercises.length - currentExerciseIndex - 1} left</span>
              </div>
              <div className="flex items-center gap-2 text-orange-500">
                <Flame className="h-4 w-4" />
                <span className="text-sm font-medium">{totalCaloriesBurned} cal</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 pb-6"
    >
      <div>
        <h1 className="text-2xl font-bold">Workouts</h1>
        <p className="text-muted-foreground">Find your perfect routine</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {workoutCategories.map((cat) => (
          <motion.button
            key={cat.id}
            className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-2xl ${cat.color} text-white min-w-[80px]`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">{cat.icon}</span>
            <span className="text-xs font-medium">{cat.name}</span>
          </motion.button>
        ))}
      </div>

      <Card className="relative overflow-hidden rounded-3xl border-0 shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=300&fit=crop"
          alt="Featured workout"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <span className="text-xs bg-orange-500 px-2 py-1 rounded-full">Featured</span>
          <h2 className="text-xl font-bold mt-2">Full Body HIIT Challenge</h2>
          <div className="flex items-center gap-4 mt-2 text-sm text-white/80">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> 25 min
            </span>
            <span className="flex items-center gap-1">
              <Flame className="h-4 w-4" /> 320 cal
            </span>
            <span className="flex items-center gap-1">
              <Dumbbell className="h-4 w-4" /> 5 exercises
            </span>
          </div>
          <Button
            className="mt-4 gradient-orange hover:opacity-90 rounded-full"
            onClick={startWorkout}
          >
            <Play className="h-4 w-4 mr-2" /> Start Workout
          </Button>
        </div>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Exercise Library</h2>
          <button className="text-sm text-primary font-medium flex items-center gap-1">
            See All <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-3">
          {exercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="flex items-center gap-4 p-3 rounded-2xl border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{exercise.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{exercise.muscleGroup}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    {exercise.duration ? (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {exercise.duration}s
                      </span>
                    ) : (
                      <span>{exercise.reps} reps</span>
                    )}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
