import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QualityMeterProps {
  value: number;
  label?: string;
  showPrediction?: boolean;
  predictedHours?: number;
}

export function QualityMeter({
  value,
  label = "Product Quality",
  showPrediction = true,
  predictedHours = 36,
}: QualityMeterProps) {
  const getStatus = (v: number) => {
    if (v >= 90) return { label: "Excellent", color: "text-success", bg: "bg-success" };
    if (v >= 75) return { label: "Good", color: "text-quality-good", bg: "bg-quality-good" };
    if (v >= 50) return { label: "Warning", color: "text-warning", bg: "bg-warning" };
    return { label: "Critical", color: "text-destructive", bg: "bg-destructive" };
  };

  const status = getStatus(value);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <div className="flex items-center gap-2">
          <span className={cn("text-sm font-semibold", status.color)}>{status.label}</span>
        </div>
      </div>

      {/* Main Value Display */}
      <div className="flex items-baseline gap-2">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold"
        >
          {value}
        </motion.span>
        <span className="text-2xl font-medium text-muted-foreground">%</span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 rounded-full overflow-hidden bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", status.bg)}
        />
        
        {/* Quality Markers */}
        <div className="absolute inset-0 flex">
          <div className="w-1/4 border-r border-background/50" />
          <div className="w-1/4 border-r border-background/50" />
          <div className="w-1/4 border-r border-background/50" />
          <div className="w-1/4" />
        </div>
      </div>

      {/* Scale Labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Critical</span>
        <span>Warning</span>
        <span>Good</span>
        <span>Excellent</span>
      </div>

      {/* Prediction */}
      {showPrediction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-4 border-t border-border"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Predicted spoilage in</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">{predictedHours}</span>
              <span className="text-sm text-muted-foreground">hours</span>
            </div>
          </div>
          
          {/* Time visualization */}
          <div className="mt-2 flex gap-1">
            {Array.from({ length: 48 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.02 }}
                className={cn(
                  "flex-1 h-6 rounded-sm origin-bottom",
                  i < predictedHours
                    ? i < 12
                      ? "bg-success/60"
                      : i < 24
                      ? "bg-warning/60"
                      : "bg-destructive/40"
                    : "bg-muted"
                )}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>Now</span>
            <span>24h</span>
            <span>48h</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
