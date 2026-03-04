import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DataPoint {
  time: string;
  temperature: number;
  humidity: number;
}

const generateData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i.toString().padStart(2, "0")}:00`,
      temperature: 4 + Math.random() * 3 - 1.5,
      humidity: 65 + Math.random() * 10 - 5,
    });
  }
  return data;
};

interface LiveChartProps {
  className?: string;
}

export function LiveChart({ className }: LiveChartProps) {
  const [data, setData] = useState(generateData);
  const [activeTab, setActiveTab] = useState<"temperature" | "humidity">("temperature");

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)];
        const lastTime = parseInt(prev[prev.length - 1].time.split(":")[0]);
        const nextHour = (lastTime + 1) % 24;
        newData.push({
          time: `${nextHour.toString().padStart(2, "0")}:00`,
          temperature: 4 + Math.random() * 3 - 1.5,
          humidity: 65 + Math.random() * 10 - 5,
        });
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const config = {
    temperature: {
      dataKey: "temperature",
      stroke: "hsl(var(--primary))",
      fill: "hsl(var(--primary) / 0.1)",
      domain: [0, 12] as [number, number],
      unit: "°C",
      safeZone: { min: 2, max: 8 },
    },
    humidity: {
      dataKey: "humidity",
      stroke: "hsl(var(--accent))",
      fill: "hsl(var(--accent) / 0.1)",
      domain: [40, 100] as [number, number],
      unit: "%",
      safeZone: { min: 55, max: 75 },
    },
  };

  const currentConfig = config[activeTab];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={cn("bg-card rounded-2xl border border-border/50 p-5", className)}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Real-Time Monitoring</h3>
          <p className="text-sm text-muted-foreground">Live sensor data - Last 24 hours</p>
        </div>
        
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setActiveTab("temperature")}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-all",
              activeTab === "temperature"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Temperature
          </button>
          <button
            onClick={() => setActiveTab("humidity")}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-all",
              activeTab === "humidity"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Humidity
          </button>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={currentConfig.stroke} stopOpacity={0.3} />
                <stop offset="100%" stopColor={currentConfig.stroke} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={currentConfig.domain}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}${currentConfig.unit}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "0 4px 12px hsl(var(--foreground) / 0.1)",
              }}
              formatter={(value: number) => [
                `${value.toFixed(1)}${currentConfig.unit}`,
                activeTab.charAt(0).toUpperCase() + activeTab.slice(1),
              ]}
            />
            
            {/* Safe Zone */}
            <ReferenceLine
              y={currentConfig.safeZone.max}
              stroke="hsl(var(--warning))"
              strokeDasharray="5 5"
              strokeOpacity={0.5}
            />
            <ReferenceLine
              y={currentConfig.safeZone.min}
              stroke="hsl(var(--warning))"
              strokeDasharray="5 5"
              strokeOpacity={0.5}
            />
            
            <Area
              type="monotone"
              dataKey={currentConfig.dataKey}
              stroke={currentConfig.stroke}
              strokeWidth={2}
              fill="url(#colorGradient)"
              dot={false}
              activeDot={{
                r: 6,
                fill: currentConfig.stroke,
                stroke: "hsl(var(--card))",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-warning opacity-50" style={{ borderTop: "2px dashed" }} />
          <span className="text-xs text-muted-foreground">Safe Zone Limits</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentConfig.stroke }} />
          <span className="text-xs text-muted-foreground">
            Current {activeTab === "temperature" ? "Temperature" : "Humidity"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
