import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Thermometer, Package, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const deliveryPoints = [
  { id: 1, name: "Warehouse A", status: "completed", temp: 4.2, time: "08:00", x: 15, y: 20 },
  { id: 2, name: "Hospital Metro", status: "completed", temp: 4.5, time: "09:30", x: 35, y: 35 },
  { id: 3, name: "Pharma Plus", status: "current", temp: 5.1, time: "11:00", x: 55, y: 25 },
  { id: 4, name: "MedStore Central", status: "pending", temp: null, time: "12:30", x: 72, y: 45 },
  { id: 5, name: "HealthCare Hub", status: "pending", temp: null, time: "14:00", x: 85, y: 30 },
];

interface RouteMapProps {
  className?: string;
}

export function RouteMap({ className }: RouteMapProps) {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(3);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => setIsOptimizing(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={cn("bg-card rounded-2xl border border-border/50 p-5", className)}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Dynamic Route Optimization</h3>
          <p className="text-sm text-muted-foreground">Real-time delivery tracking & AI routing</p>
        </div>
        <Button
          onClick={handleOptimize}
          disabled={isOptimizing}
          className="gap-2"
          variant="outline"
        >
          {isOptimizing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Navigation className="h-4 w-4" />
              </motion.div>
              Optimizing...
            </>
          ) : (
            <>
              <Navigation className="h-4 w-4" />
              Optimize Route
            </>
          )}
        </Button>
      </div>

      {/* Map Container */}
      <div className="relative h-[280px] rounded-xl bg-gradient-to-br from-muted/50 to-muted overflow-hidden border border-border/50">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Route Lines */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--success))" />
              <stop offset="50%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--muted-foreground))" />
            </linearGradient>
          </defs>
          
          {deliveryPoints.slice(0, -1).map((point, i) => {
            const next = deliveryPoints[i + 1];
            const isCompleted = point.status === "completed" && next.status !== "pending";
            return (
              <motion.line
                key={point.id}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: i * 0.3, duration: 0.5 }}
                x1={`${point.x}%`}
                y1={`${point.y}%`}
                x2={`${next.x}%`}
                y2={`${next.y}%`}
                stroke={isCompleted ? "hsl(var(--success))" : point.status === "current" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.5)"}
                strokeWidth={isCompleted ? 3 : 2}
                strokeDasharray={next.status === "pending" ? "8 4" : "none"}
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {/* Delivery Points */}
        {deliveryPoints.map((point, index) => (
          <motion.div
            key={point.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.15, type: "spring" }}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
          >
            <button
              onClick={() => setSelectedPoint(point.id)}
              className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                point.status === "completed"
                  ? "bg-success/20 border-success text-success"
                  : point.status === "current"
                  ? "bg-primary/20 border-primary text-primary animate-pulse"
                  : "bg-muted border-muted-foreground/30 text-muted-foreground",
                selectedPoint === point.id && "ring-4 ring-primary/30"
              )}
            >
              {point.status === "completed" ? (
                <CheckCircle className="h-5 w-5" />
              ) : point.status === "current" ? (
                <Navigation className="h-5 w-5" />
              ) : (
                <MapPin className="h-5 w-5" />
              )}
              
              {/* Point Number */}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-card border border-border rounded-full text-xs font-bold flex items-center justify-center">
                {point.id}
              </span>
            </button>
          </motion.div>
        ))}

        {/* Selected Point Info */}
        {selectedPoint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm rounded-xl p-4 border border-border shadow-lg"
          >
            {(() => {
              const point = deliveryPoints.find(p => p.id === selectedPoint);
              if (!point) return null;
              
              return (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      point.status === "completed" ? "bg-success/10 text-success" :
                      point.status === "current" ? "bg-primary/10 text-primary" :
                      "bg-muted text-muted-foreground"
                    )}>
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{point.name}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {point.time}
                        </span>
                        {point.temp && (
                          <span className="flex items-center gap-1">
                            <Thermometer className="h-3 w-3" />
                            {point.temp}°C
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      point.status === "completed" ? "default" :
                      point.status === "current" ? "secondary" : "outline"
                    }
                    className={cn(
                      point.status === "completed" && "bg-success text-success-foreground"
                    )}
                  >
                    {point.status === "completed" ? "Delivered" :
                     point.status === "current" ? "In Transit" : "Pending"}
                  </Badge>
                </div>
              );
            })()}
          </motion.div>
        )}
      </div>

      {/* Route Stats */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        {[
          { label: "Total Stops", value: "5", icon: MapPin },
          { label: "Completed", value: "2", icon: CheckCircle },
          { label: "ETA", value: "2.5h", icon: Clock },
          { label: "Avg Temp", value: "4.6°C", icon: Thermometer },
        ].map((stat, i) => (
          <div key={stat.label} className="text-center p-3 rounded-lg bg-muted/50">
            <stat.icon className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
            <p className="text-lg font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
