import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TemperatureGaugeProps {
  value: number;
  min?: number;
  max?: number;
  unit?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  status?: "optimal" | "warning" | "critical";
}

const sizeConfig = {
  sm: { radius: 40, stroke: 6, text: "text-xl" },
  md: { radius: 60, stroke: 8, text: "text-3xl" },
  lg: { radius: 80, stroke: 10, text: "text-4xl" },
};

export function TemperatureGauge({
  value,
  min = -20,
  max = 30,
  unit = "°C",
  size = "md",
  label,
  status = "optimal",
}: TemperatureGaugeProps) {
  const config = sizeConfig[size];
  const circumference = 2 * Math.PI * config.radius;
  const percentage = ((value - min) / (max - min)) * 100;
  const offset = circumference - (percentage / 100) * circumference * 0.75;

  const statusColors = {
    optimal: {
      stroke: "stroke-success",
      fill: "fill-success/10",
      text: "text-success",
      glow: "drop-shadow-[0_0_10px_hsl(var(--success)/0.5)]",
    },
    warning: {
      stroke: "stroke-warning",
      fill: "fill-warning/10",
      text: "text-warning",
      glow: "drop-shadow-[0_0_10px_hsl(var(--warning)/0.5)]",
    },
    critical: {
      stroke: "stroke-destructive",
      fill: "fill-destructive/10",
      text: "text-destructive",
      glow: "drop-shadow-[0_0_10px_hsl(var(--destructive)/0.5)]",
    },
  };

  const colors = statusColors[status];
  const svgSize = (config.radius + config.stroke) * 2;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: svgSize, height: svgSize }}>
        <svg
          width={svgSize}
          height={svgSize}
          className={cn("transform -rotate-[135deg]", colors.glow)}
        >
          {/* Background Arc */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={config.radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.25}
            strokeLinecap="round"
            className="text-muted/30"
          />
          
          {/* Value Arc */}
          <motion.circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={config.radius}
            fill="none"
            strokeWidth={config.stroke}
            strokeDasharray={circumference}
            strokeLinecap="round"
            className={colors.stroke}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className={cn("font-bold font-mono", config.text, colors.text)}
          >
            {value}
            <span className="text-[0.5em] font-normal">{unit}</span>
          </motion.span>
        </div>
      </div>
      
      {label && (
        <span className="mt-2 text-sm font-medium text-muted-foreground">{label}</span>
      )}
    </div>
  );
}
