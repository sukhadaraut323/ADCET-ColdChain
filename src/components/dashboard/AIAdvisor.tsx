import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  AlertTriangle,
  ThermometerSnowflake,
  Truck,
  Clock,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Recommendation {
  id: string;
  priority: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  action: string;
  reasoning: string;
  impact: string;
  timeToAct: string;
}

const recommendations: Recommendation[] = [
  {
    id: "1",
    priority: "critical",
    title: "Increase Cooling Power",
    description: "Temperature approaching critical threshold in Container #A2847",
    action: "Increase cooling power by 25%",
    reasoning: "Current temperature trend shows 0.5°C/hour increase. At current rate, threshold breach in 3.2 hours.",
    impact: "Prevents $12,000 product loss",
    timeToAct: "Immediate",
  },
  {
    id: "2",
    priority: "high",
    title: "Expedite Delivery",
    description: "Route optimization suggests priority delivery for Pharma Plus",
    action: "Prioritize next delivery stop",
    reasoning: "Product quality at 78%. Fastest route to Pharma Plus maintains quality above minimum threshold.",
    impact: "Saves 45 minutes transit time",
    timeToAct: "Within 30 min",
  },
  {
    id: "3",
    priority: "medium",
    title: "Schedule Maintenance",
    description: "Compressor efficiency decreased by 12%",
    action: "Schedule maintenance within 72h",
    reasoning: "Vibration patterns indicate early bearing wear. Proactive maintenance prevents emergency repair.",
    impact: "Saves ₹18,000 in emergency repairs",
    timeToAct: "Within 72h",
  },
];

const priorityConfig = {
  critical: {
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    badge: "bg-destructive text-destructive-foreground",
    icon: AlertTriangle,
  },
  high: {
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30",
    badge: "bg-warning text-warning-foreground",
    icon: ThermometerSnowflake,
  },
  medium: {
    color: "text-info",
    bg: "bg-info/10",
    border: "border-info/30",
    badge: "bg-info text-info-foreground",
    icon: Truck,
  },
  low: {
    color: "text-muted-foreground",
    bg: "bg-muted",
    border: "border-border",
    badge: "bg-muted text-muted-foreground",
    icon: Clock,
  },
};

interface AIAdvisorProps {
  className?: string;
}

export function AIAdvisor({ className }: AIAdvisorProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnalyze = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={cn("bg-card rounded-2xl border border-border/50 p-5", className)}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-success border-2 border-card"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              AI Intervention Advisor
              <Sparkles className="h-4 w-4 text-warning" />
            </h3>
            <p className="text-sm text-muted-foreground">Real-time intelligent recommendations</p>
          </div>
        </div>
        <Button onClick={handleAnalyze} disabled={isProcessing} size="sm" className="gap-2">
          {isProcessing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {isProcessing ? "Analyzing..." : "Re-analyze"}
        </Button>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {recommendations.map((rec, index) => {
          const config = priorityConfig[rec.priority];
          const Icon = config.icon;

          return (
            <AccordionItem
              key={rec.id}
              value={rec.id}
              className={cn(
                "border rounded-xl overflow-hidden transition-all",
                config.border,
                config.bg
              )}
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 w-full"
                >
                  <div className={cn("p-2 rounded-lg", config.bg)}>
                    <Icon className={cn("h-5 w-5", config.color)} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{rec.title}</span>
                      <Badge className={cn("text-xs", config.badge)}>
                        {rec.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                </motion.div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4 pt-2">
                  <div className="p-3 rounded-lg bg-background border border-border">
                    <p className="text-sm font-medium mb-1">Recommended Action</p>
                    <p className="text-sm text-foreground font-semibold">{rec.action}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium mb-1">AI Reasoning</p>
                    <p className="text-sm text-muted-foreground">{rec.reasoning}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                      <p className="text-xs text-success font-medium">Potential Impact</p>
                      <p className="text-sm font-semibold text-success">{rec.impact}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                      <p className="text-xs text-warning font-medium">Time to Act</p>
                      <p className="text-sm font-semibold text-warning">{rec.timeToAct}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gap-1">
                      Apply Recommendation
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      Dismiss
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </motion.div>
  );
}
