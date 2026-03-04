import { motion } from "framer-motion";
import { Package, Truck, Thermometer, Clock, MapPin, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Shipment {
  id: string;
  product: string;
  category: string;
  container: string;
  temperature: number;
  quality: number;
  status: "in-transit" | "delivered" | "delayed" | "loading";
  eta: string;
  destination: string;
}

const shipments: Shipment[] = [
  {
    id: "SHP-2024-001",
    product: "COVID-19 Vaccines",
    category: "Pharmaceutical",
    container: "#A2847",
    temperature: 4.2,
    quality: 96,
    status: "in-transit",
    eta: "2h 30m",
    destination: "Metro Hospital",
  },
  {
    id: "SHP-2024-002",
    product: "Insulin Vials",
    category: "Pharmaceutical",
    container: "#B1293",
    temperature: 5.8,
    quality: 88,
    status: "delayed",
    eta: "4h 15m",
    destination: "Pharma Plus",
  },
  {
    id: "SHP-2024-003",
    product: "Fresh Dairy",
    category: "Perishable",
    container: "#C4521",
    temperature: 3.1,
    quality: 98,
    status: "in-transit",
    eta: "1h 45m",
    destination: "MegaMart Central",
  },
  {
    id: "SHP-2024-004",
    product: "Blood Samples",
    category: "Medical",
    container: "#D7832",
    temperature: -18.5,
    quality: 100,
    status: "loading",
    eta: "6h 00m",
    destination: "LabCorp Facility",
  },
  {
    id: "SHP-2024-005",
    product: "Frozen Seafood",
    category: "Perishable",
    container: "#E9120",
    temperature: -22.3,
    quality: 94,
    status: "delivered",
    eta: "-",
    destination: "SeaFood Express",
  },
];

const statusConfig = {
  "in-transit": { label: "In Transit", variant: "default" as const, className: "bg-primary" },
  "delivered": { label: "Delivered", variant: "default" as const, className: "bg-success" },
  "delayed": { label: "Delayed", variant: "default" as const, className: "bg-warning" },
  "loading": { label: "Loading", variant: "outline" as const, className: "" },
};

interface ShipmentsTableProps {
  className?: string;
}

export function ShipmentsTable({ className }: ShipmentsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className={cn("bg-card rounded-2xl border border-border/50 p-5", className)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Active Shipments</h3>
            <p className="text-sm text-muted-foreground">Real-time shipment tracking</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <ScrollArea className="w-full">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[120px]">Shipment ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Container</TableHead>
              <TableHead className="text-center">Temp</TableHead>
              <TableHead className="text-center">Quality</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>ETA</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.map((shipment, index) => {
              const config = statusConfig[shipment.status];
              const tempStatus = shipment.temperature > 8 ? "warning" : shipment.temperature < 0 ? "cold" : "optimal";
              const qualityStatus = shipment.quality >= 90 ? "excellent" : shipment.quality >= 75 ? "good" : "warning";

              return (
                <motion.tr
                  key={shipment.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-muted/50"
                >
                  <TableCell className="font-mono text-sm font-medium">{shipment.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{shipment.product}</p>
                      <p className="text-xs text-muted-foreground">{shipment.category}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{shipment.container}</TableCell>
                  <TableCell className="text-center">
                    <span className={cn(
                      "inline-flex items-center gap-1 font-mono text-sm font-medium",
                      tempStatus === "warning" ? "text-warning" : tempStatus === "cold" ? "text-info" : "text-success"
                    )}>
                      <Thermometer className="h-3 w-3" />
                      {shipment.temperature}°C
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            qualityStatus === "excellent" ? "bg-success" :
                            qualityStatus === "good" ? "bg-quality-good" : "bg-warning"
                          )}
                          style={{ width: `${shipment.quality}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{shipment.quality}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={config.variant} className={cn("text-xs", config.className)}>
                      {config.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {shipment.eta}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {shipment.destination}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Track on Map</DropdownMenuItem>
                        <DropdownMenuItem>View Temperature Log</DropdownMenuItem>
                        <DropdownMenuItem>Generate Report</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </motion.div>
  );
}
