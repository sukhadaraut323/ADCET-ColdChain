import { motion } from "framer-motion";
import { Activity, Zap, ThermometerSnowflake, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface EquipmentItem {
  id: string;
  name: string;
  type: string;
  health: number;
  status: "optimal" | "good" | "warning" | "critical";
  metrics: {
    efficiency: number;
    power: number;
    vibration: string;
  };
  nextMaintenance: string;
}

const equipment: EquipmentItem[] = [
  {
    id: "1",
    name: "Main Compressor A",
    type: "Refrigeration Unit",
    health: 94,
    status: "optimal",
    metrics: { efficiency: 92, power: 2.4, vibration: "Normal" },
    nextMaintenance: "15 days",
  },
  {
    id: "2",
    name: "Backup Compressor B",
    type: "Refrigeration Unit",
    health: 78,
    status: "good",
    metrics: { efficiency: 85, power: 2.8, vibration: "Normal" },
    nextMaintenance: "7 days",
  },
  {
    id: "3",
    name: "Fan Motor #1",
    type: "Circulation System",
    health: 56,
    status: "warning",
    metrics: { efficiency: 68, power: 1.2, vibration: "Elevated" },
    nextMaintenance: "3 days",
  },
  {
    id: "4",
    name: "Thermostat Controller",
    type: "Control Unit",
    health: 98,
    status: "optimal",
    metrics: { efficiency: 99, power: 0.1, vibration: "N/A" },
    nextMaintenance: "30 days",
  },
];

const statusConfig = {
  optimal: {
    color: "text-success",
    bg: "bg-success",
    label: "Optimal",
    icon: CheckCircle,
  },
  good: {
    color: "text-chart-2",
    bg: "bg-chart-2",
    label: "Good",
    icon: TrendingUp,
  },
  warning: {
    color: "text-warning",
    bg: "bg-warning",
    label: "Needs Attention",
    icon: AlertTriangle,
  },
  critical: {
    color: "text-destructive",
    bg: "bg-destructive",
    label: "Critical",
    icon: AlertTriangle,
  },
};

interface EquipmentHealthProps {
  className?: string;
}

export function EquipmentHealth({ className }: EquipmentHealthProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className={cn("bg-card rounded-2xl border border-border/50 p-5", className)}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Activity className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Equipment Health Monitor</h3>
            <p className="text-sm text-muted-foreground">Predictive maintenance tracking</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {equipment.map((item, index) => {
          const config = statusConfig[item.status];
          const StatusIcon = config.icon;

          return (
            <motion.div
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              className={cn(
                "p-4 rounded-xl border transition-all hover:shadow-md",
                item.status === "warning" ? "border-warning/30 bg-warning/5" : "border-border bg-muted/30"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{item.name}</h4>
                    <span className={cn("flex items-center gap-1 text-xs font-medium", config.color)}>
                      <StatusIcon className="h-3 w-3" />
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.type}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold">{item.health}%</span>
                  <p className="text-xs text-muted-foreground">Health Score</p>
                </div>
              </div>

              <div className="mb-3">
                <Progress
                  value={item.health}
                  className="h-2"
                />
              </div>

              <div className="grid grid-cols-4 gap-2 text-sm">
                <div className="p-2 rounded-lg bg-background">
                  <p className="text-xs text-muted-foreground">Efficiency</p>
                  <p className="font-semibold">{item.metrics.efficiency}%</p>
                </div>
                <div className="p-2 rounded-lg bg-background">
                  <p className="text-xs text-muted-foreground">Power</p>
                  <p className="font-semibold">{item.metrics.power} kW</p>
                </div>
                <div className="p-2 rounded-lg bg-background">
                  <p className="text-xs text-muted-foreground">Vibration</p>
                  <p className={cn(
                    "font-semibold",
                    item.metrics.vibration === "Elevated" && "text-warning"
                  )}>
                    {item.metrics.vibration}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-background">
                  <p className="text-xs text-muted-foreground">Maintenance</p>
                  <p className={cn(
                    "font-semibold",
                    parseInt(item.nextMaintenance) <= 7 && "text-warning"
                  )}>
                    {item.nextMaintenance}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
