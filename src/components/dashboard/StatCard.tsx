import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
  };
  variant?: "default" | "success" | "warning" | "destructive" | "info";
  className?: string;
  delay?: number;
}

const variantStyles = {
  default: {
    icon: "bg-primary/10 text-primary",
    gradient: "from-primary/5 via-transparent to-transparent",
  },
  success: {
    icon: "bg-success/10 text-success",
    gradient: "from-success/5 via-transparent to-transparent",
  },
  warning: {
    icon: "bg-warning/10 text-warning",
    gradient: "from-warning/5 via-transparent to-transparent",
  },
  destructive: {
    icon: "bg-destructive/10 text-destructive",
    gradient: "from-destructive/5 via-transparent to-transparent",
  },
  info: {
    icon: "bg-info/10 text-info",
    gradient: "from-info/5 via-transparent to-transparent",
  },
};

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = "default",
  className,
  delay = 0,
}: StatCardProps) {
  const styles = variantStyles[variant];

  const TrendIcon = trend?.direction === "up" 
    ? TrendingUp 
    : trend?.direction === "down" 
    ? TrendingDown 
    : Minus;

  const trendColor = trend?.direction === "up" 
    ? "text-success" 
    : trend?.direction === "down" 
    ? "text-destructive" 
    : "text-muted-foreground";

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-card border border-border/50 p-5",
        "hover:shadow-card-hover transition-shadow duration-300",
        className
      )}
    >
      {/* Background Gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-50",
        styles.gradient
      )} />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: delay + 0.2, type: "spring" }}
              className="text-3xl font-bold tracking-tight"
            >
              {value}
            </motion.span>
            {trend && (
              <div className={cn("flex items-center gap-1 text-sm font-medium", trendColor)}>
                <TrendIcon className="h-4 w-4" />
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        
        <div className={cn("rounded-xl p-3", styles.icon)}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
