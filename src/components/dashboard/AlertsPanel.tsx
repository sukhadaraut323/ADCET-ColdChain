import { motion } from "framer-motion";
import { AlertTriangle, Thermometer, Battery, Wifi, MapPin, Clock, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  message: string;
  container: string;
  timestamp: string;
  acknowledged: boolean;
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "Temperature Excursion",
    message: "Temperature exceeded 10°C threshold for 5 minutes",
    container: "Container #A2847",
    timestamp: "2 min ago",
    acknowledged: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Humidity Spike",
    message: "Humidity level at 82%, exceeding 75% limit",
    container: "Container #B1293",
    timestamp: "15 min ago",
    acknowledged: false,
  },
  {
    id: "3",
    type: "warning",
    title: "Battery Low",
    message: "Sensor battery at 15%, replacement recommended",
    container: "Container #A2847",
    timestamp: "1 hour ago",
    acknowledged: true,
  },
  {
    id: "4",
    type: "info",
    title: "Connection Restored",
    message: "GPS signal restored after 10 minute outage",
    container: "Container #C4521",
    timestamp: "2 hours ago",
    acknowledged: true,
  },
];

const alertConfig = {
  critical: {
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    icon: AlertTriangle,
    iconBg: "bg-destructive/20",
  },
  warning: {
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30",
    icon: Thermometer,
    iconBg: "bg-warning/20",
  },
  info: {
    color: "text-info",
    bg: "bg-info/10",
    border: "border-info/30",
    icon: Wifi,
    iconBg: "bg-info/20",
  },
};

interface AlertsPanelProps {
  className?: string;
}

export function AlertsPanel({ className }: AlertsPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={cn("bg-card rounded-2xl border border-border/50 p-5", className)}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Active Alerts</h3>
          <p className="text-sm text-muted-foreground">Real-time system notifications</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
            <span className="text-destructive font-medium">1 Critical</span>
          </span>
          <span className="flex items-center gap-1.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-warning" />
            <span className="text-muted-foreground">2 Warnings</span>
          </span>
        </div>
      </div>

      <ScrollArea className="h-[320px] pr-4">
        <div className="space-y-3">
          {alerts.map((alert, index) => {
            const config = alertConfig[alert.type];
            const Icon = config.icon;

            return (
              <motion.div
                key={alert.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative p-4 rounded-xl border transition-all",
                  config.border,
                  alert.acknowledged ? "opacity-60 bg-muted/30" : config.bg
                )}
              >
                <div className="flex gap-3">
                  <div className={cn("p-2 rounded-lg h-fit", config.iconBg)}>
                    <Icon className={cn("h-5 w-5", config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className={cn("font-semibold", config.color)}>{alert.title}</h4>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                      </div>
                      {!alert.acknowledged && (
                        <Button size="icon" variant="ghost" className="h-6 w-6 shrink-0">
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {alert.container}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {alert.timestamp}
                      </span>
                      {alert.acknowledged && (
                        <span className="flex items-center gap-1 text-success">
                          <Check className="h-3 w-3" />
                          Acknowledged
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="flex gap-2 mt-4 pt-4 border-t border-border">
        <Button variant="outline" size="sm" className="flex-1">
          View All Alerts
        </Button>
        <Button size="sm" className="flex-1">
          Acknowledge All
        </Button>
      </div>
    </motion.div>
  );
}
