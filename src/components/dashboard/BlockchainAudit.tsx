import { motion } from "framer-motion";
import { Shield, Clock, Link2, FileCheck, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlockchainRecord {
  id: string;
  hash: string;
  type: string;
  timestamp: string;
  verified: boolean;
}

const records: BlockchainRecord[] = [
  {
    id: "1",
    hash: "0x7f83b...2a1d",
    type: "Temperature Log",
    timestamp: "2 min ago",
    verified: true,
  },
  {
    id: "2",
    hash: "0x9a4c2...8e3f",
    type: "Delivery Confirmation",
    timestamp: "15 min ago",
    verified: true,
  },
  {
    id: "3",
    hash: "0x3b7e1...5c9a",
    type: "Quality Check",
    timestamp: "1 hour ago",
    verified: true,
  },
  {
    id: "4",
    hash: "0x6d2f8...1b4c",
    type: "Route Update",
    timestamp: "2 hours ago",
    verified: true,
  },
];

interface BlockchainAuditProps {
  className?: string;
}

export function BlockchainAudit({ className }: BlockchainAuditProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className={cn("bg-card rounded-2xl border border-border/50 p-5", className)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Shield className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Blockchain Audit Trail</h3>
            <p className="text-sm text-muted-foreground">Hyperledger Fabric Records</p>
          </div>
        </div>
        <Badge variant="outline" className="gap-1">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          Live Sync
        </Badge>
      </div>

      <div className="space-y-3">
        {records.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
          >
            <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Link2 className="h-4 w-4 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-medium">{record.hash}</span>
                {record.verified && (
                  <FileCheck className="h-4 w-4 text-success" />
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{record.type}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {record.timestamp}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <div className="text-sm">
          <span className="text-muted-foreground">Total Records: </span>
          <span className="font-semibold">1,247</span>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Shield className="h-4 w-4" />
          View Full Audit
        </Button>
      </div>
    </motion.div>
  );
}
