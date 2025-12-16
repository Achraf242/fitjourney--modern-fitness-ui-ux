"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Users,
  Heart,
  MessageCircle,
  Share2,
  Crown,
  Medal,
  Target,
  Flame,
  ChevronRight,
  Plus,
  Clock,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const leaderboard = [
  { id: 1, name: "Sarah M.", points: 2850, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", badge: "crown" },
  { id: 2, name: "Mike T.", points: 2720, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", badge: "medal" },
  { id: 3, name: "Emma L.", points: 2650, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", badge: "medal" },
  { id: 4, name: "You", points: 2480, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", badge: null, isUser: true },
  { id: 5, name: "Alex K.", points: 2350, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", badge: null },
];

const challenges = [
  {
    id: 1,
    title: "10K Steps Daily",
    description: "Complete 10,000 steps every day this week",
    participants: 1234,
    daysLeft: 3,
    progress: 71,
    reward: "500 pts",
    joined: true,
    icon: "🚶",
  },
  {
    id: 2,
    title: "Hydration Hero",
    description: "Drink 8 glasses of water daily for 5 days",
    participants: 892,
    daysLeft: 5,
    progress: 40,
    reward: "300 pts",
    joined: true,
    icon: "💧",
  },
  {
    id: 3,
    title: "Morning Warrior",
    description: "Complete 5 workouts before 8 AM",
    participants: 567,
    daysLeft: 7,
    progress: 0,
    reward: "750 pts",
    joined: false,
    icon: "🌅",
  },
  {
    id: 4,
    title: "Protein Power",
    description: "Hit your protein goal for 7 consecutive days",
    participants: 445,
    daysLeft: 7,
    progress: 0,
    reward: "400 pts",
    joined: false,
    icon: "💪",
  },
];

const feed = [
  {
    id: 1,
    user: { name: "Sarah M.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    type: "achievement",
    content: "Just completed a 30-day workout streak! 🔥",
    achievement: "30 Day Streak",
    likes: 42,
    comments: 8,
    time: "2h ago",
    liked: true,
  },
  {
    id: 2,
    user: { name: "Mike T.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    type: "workout",
    content: "Crushed my morning HIIT session! 💪 New personal best!",
    stats: { duration: "45 min", calories: 520 },
    likes: 28,
    comments: 5,
    time: "4h ago",
    liked: false,
  },
  {
    id: 3,
    user: { name: "Emma L.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    type: "challenge",
    content: "Joined the 10K Steps Challenge! Who's with me? 🚶‍♀️",
    likes: 15,
    comments: 12,
    time: "6h ago",
    liked: false,
  },
];

const friends = [
  { id: 1, name: "Sarah M.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", status: "active", activity: "Just finished a workout" },
  { id: 2, name: "Mike T.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", status: "active", activity: "Logging lunch" },
  { id: 3, name: "Emma L.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", status: "offline", activity: "Last seen 2h ago" },
];

export function Community() {
  const [activeTab, setActiveTab] = useState("feed");
  const [likedPosts, setLikedPosts] = useState<number[]>([1]);

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 pb-6"
    >
      <div>
        <h1 className="text-2xl font-bold">Community</h1>
        <p className="text-muted-foreground">Connect & compete with friends</p>
      </div>

      <Card className="p-4 rounded-3xl border-0 shadow-lg gradient-hero text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="h-6 w-6" />
            <span className="font-semibold">Weekly Challenge</span>
          </div>
          <h2 className="text-xl font-bold">Community Step Goal</h2>
          <p className="text-white/80 text-sm mt-1">Together we&apos;ve walked 2.5M steps!</p>
          <Progress value={75} className="mt-4 h-3 bg-white/20" />
          <div className="flex items-center justify-between mt-2 text-sm">
            <span>2.5M / 3M steps</span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" /> 1,234 participants
            </span>
          </div>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full bg-muted rounded-xl p-1 h-auto">
          <TabsTrigger value="feed" className="flex-1 rounded-lg py-2 data-[state=active]:gradient-blue data-[state=active]:text-white">
            Feed
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex-1 rounded-lg py-2 data-[state=active]:gradient-blue data-[state=active]:text-white">
            Challenges
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex-1 rounded-lg py-2 data-[state=active]:gradient-blue data-[state=active]:text-white">
            Ranks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="mt-4 space-y-4">
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {friends.map((friend) => (
              <motion.div
                key={friend.id}
                className="flex-shrink-0 flex flex-col items-center gap-1"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <Avatar className="w-14 h-14 border-2 border-primary">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback>{friend.name[0]}</AvatarFallback>
                  </Avatar>
                  {friend.status === "active" && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <span className="text-xs font-medium truncate w-16 text-center">{friend.name.split(" ")[0]}</span>
              </motion.div>
            ))}
            <motion.button
              className="flex-shrink-0 flex flex-col items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                <Plus className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">Add</span>
            </motion.button>
          </div>

          <AnimatePresence>
            {feed.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 rounded-2xl border-0 shadow-sm">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.user.avatar} />
                      <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{post.user.name}</span>
                        <span className="text-xs text-muted-foreground">{post.time}</span>
                      </div>
                      <p className="text-sm mt-1">{post.content}</p>

                      {post.type === "achievement" && (
                        <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 flex items-center gap-3">
                          <div className="p-2 rounded-full gradient-orange">
                            <Zap className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-medium text-sm">{post.achievement}</span>
                        </div>
                      )}

                      {post.type === "workout" && post.stats && (
                        <div className="mt-3 flex gap-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {post.stats.duration}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Flame className="h-4 w-4 text-orange-500" />
                            {post.stats.calories} cal
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                        <button
                          className="flex items-center gap-1.5 text-sm"
                          onClick={() => toggleLike(post.id)}
                        >
                          <Heart
                            className={`h-5 w-5 transition-colors ${
                              likedPosts.includes(post.id)
                                ? "fill-red-500 text-red-500"
                                : "text-muted-foreground"
                            }`}
                          />
                          <span className={likedPosts.includes(post.id) ? "text-red-500" : "text-muted-foreground"}>
                            {post.likes + (likedPosts.includes(post.id) && !post.liked ? 1 : 0)}
                          </span>
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MessageCircle className="h-5 w-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-muted-foreground ml-auto">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="challenges" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Active Challenges</h3>
            <button className="text-sm text-primary font-medium flex items-center gap-1">
              Browse All <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-4 rounded-2xl border-0 shadow-sm ${challenge.joined ? "" : "opacity-90"}`}>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-card flex items-center justify-center text-2xl">
                    {challenge.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{challenge.title}</h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {challenge.reward}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {challenge.participants}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {challenge.daysLeft} days left
                      </span>
                    </div>
                    {challenge.joined ? (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{challenge.progress}%</span>
                        </div>
                        <Progress value={challenge.progress} className="h-2" />
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        className="mt-3 rounded-full gradient-blue hover:opacity-90"
                      >
                        <Target className="h-4 w-4 mr-1" />
                        Join Challenge
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-4">
          <Card className="rounded-2xl border-0 shadow-sm overflow-hidden">
            <div className="p-4 gradient-hero text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Your Rank</p>
                  <p className="text-3xl font-bold">#4</p>
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm">Points</p>
                  <p className="text-3xl font-bold">2,480</p>
                </div>
              </div>
              <p className="text-sm text-white/80 mt-2">170 points behind #3</p>
            </div>
            <div className="divide-y divide-border">
              {leaderboard.map((user, index) => (
                <motion.div
                  key={user.id}
                  className={`flex items-center gap-3 p-4 ${user.isUser ? "bg-primary/5" : ""}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className={`w-8 text-center font-bold ${index < 3 ? "text-lg" : "text-muted-foreground"}`}>
                    {index === 0 ? <Crown className="h-5 w-5 text-yellow-500 mx-auto" /> : 
                     index === 1 ? <Medal className="h-5 w-5 text-gray-400 mx-auto" /> :
                     index === 2 ? <Medal className="h-5 w-5 text-amber-600 mx-auto" /> :
                     `#${index + 1}`}
                  </span>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold ${user.isUser ? "text-primary" : ""}`}>
                      {user.name}
                      {user.isUser && <span className="text-xs ml-2 text-primary">(You)</span>}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{user.points.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">points</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
