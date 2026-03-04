import { useState } from "react";
import { motion } from "framer-motion";
import {
  Thermometer,
  Droplets,
  Package,
  Truck,
  AlertTriangle,
  TrendingUp,
  Zap,
  Shield,
} from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { TemperatureGauge } from "@/components/dashboard/TemperatureGauge";
import { QualityMeter } from "@/components/dashboard/QualityMeter";
import { LiveChart } from "@/components/dashboard/LiveChart";
import { RouteMap } from "@/components/dashboard/RouteMap";
import { AIAdvisor } from "@/components/dashboard/AIAdvisor";
import { EquipmentHealth } from "@/components/dashboard/EquipmentHealth";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { ShipmentsTable } from "@/components/dashboard/ShipmentsTable";
import { BlockchainAudit } from "@/components/dashboard/BlockchainAudit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Background Mesh */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      
      <div className="relative flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
          <Header onMenuToggle={() => setSidebarOpen(true)} />
          
          <main className="flex-1 overflow-auto p-4 lg:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-[1800px] mx-auto space-y-6"
            >
              {/* Page Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-2xl lg:text-3xl font-bold"
                  >
                    Cold Chain Intelligence
                  </motion.h1>
                  <motion.p
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground"
                  >
                    Real-time monitoring • Predictive analytics • AI-powered decisions
                  </motion.p>
                </div>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success border border-success/20">
                    <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                    System Online
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
                    Last updated: Just now
                  </span>
                </motion.div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Active Shipments"
                  value="24"
                  subtitle="3 delayed"
                  icon={<Truck className="h-6 w-6" />}
                  trend={{ value: 12, direction: "up" }}
                  variant="default"
                  delay={0.1}
                />
                <StatCard
                  title="Average Temperature"
                  value="4.2°C"
                  subtitle="Within optimal range"
                  icon={<Thermometer className="h-6 w-6" />}
                  trend={{ value: 2, direction: "down" }}
                  variant="success"
                  delay={0.15}
                />
                <StatCard
                  title="Active Alerts"
                  value="3"
                  subtitle="1 critical"
                  icon={<AlertTriangle className="h-6 w-6" />}
                  trend={{ value: 15, direction: "up" }}
                  variant="warning"
                  delay={0.2}
                />
                <StatCard
                  title="Products at Risk"
                  value="₹2.4L"
                  subtitle="0.8% of total value"
                  icon={<Package className="h-6 w-6" />}
                  trend={{ value: 5, direction: "down" }}
                  variant="destructive"
                  delay={0.25}
                />
              </div>

              {/* Main Content Tabs */}
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="bg-muted/50 p-1">
                  <TabsTrigger value="overview" className="gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="monitoring" className="gap-2">
                    <Thermometer className="h-4 w-4" />
                    Monitoring
                  </TabsTrigger>
                  <TabsTrigger value="ai-advisor" className="gap-2">
                    <Zap className="h-4 w-4" />
                    AI Advisor
                  </TabsTrigger>
                  <TabsTrigger value="blockchain" className="gap-2">
                    <Shield className="h-4 w-4" />
                    Audit Trail
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Temperature & Quality Gauges */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-card rounded-2xl border border-border/50 p-6"
                    >
                      <h3 className="text-lg font-semibold mb-6">Container #A2847</h3>
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="flex flex-col items-center">
                          <TemperatureGauge
                            value={4.2}
                            status="optimal"
                            size="md"
                            label="Temperature"
                          />
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="relative">
                            <div className="w-[136px] h-[136px] rounded-full border-8 border-muted flex items-center justify-center">
                              <div className="text-center">
                                <span className="text-3xl font-bold text-accent">65%</span>
                                <p className="text-xs text-muted-foreground mt-1">Humidity</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                        <p className="text-sm font-medium text-success">All parameters optimal</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Temperature within 2-8°C safe zone
                        </p>
                      </div>
                    </motion.div>

                    {/* Quality Prediction */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-card rounded-2xl border border-border/50 p-6"
                    >
                      <h3 className="text-lg font-semibold mb-2">Predictive Quality</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        AI-powered shelf life prediction
                      </p>
                      <QualityMeter value={85} predictedHours={36} />
                    </motion.div>

                    {/* Alerts Panel */}
                    <AlertsPanel />
                  </div>

                  {/* Charts and Map Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <LiveChart />
                    <RouteMap />
                  </div>

                  {/* Shipments Table */}
                  <ShipmentsTable />
                </TabsContent>

                {/* Monitoring Tab */}
                <TabsContent value="monitoring" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <LiveChart />
                    <EquipmentHealth />
                  </div>
                  <ShipmentsTable />
                </TabsContent>

                {/* AI Advisor Tab */}
                <TabsContent value="ai-advisor" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AIAdvisor />
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card rounded-2xl border border-border/50 p-6"
                      >
                        <h3 className="text-lg font-semibold mb-4">AI Performance Metrics</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-success/10 border border-success/20 text-center">
                            <p className="text-3xl font-bold text-success">85%</p>
                            <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
                          </div>
                          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
                            <p className="text-3xl font-bold text-primary">&lt;10s</p>
                            <p className="text-sm text-muted-foreground">Response Time</p>
                          </div>
                          <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 text-center">
                            <p className="text-3xl font-bold text-accent">40%</p>
                            <p className="text-sm text-muted-foreground">Waste Reduction</p>
                          </div>
                          <div className="p-4 rounded-xl bg-warning/10 border border-warning/20 text-center">
                            <p className="text-3xl font-bold text-warning">₹24L</p>
                            <p className="text-sm text-muted-foreground">Savings (YTD)</p>
                          </div>
                        </div>
                      </motion.div>
                      <RouteMap />
                    </div>
                  </div>
                </TabsContent>

                {/* Blockchain Tab */}
                <TabsContent value="blockchain" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <BlockchainAudit />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card rounded-2xl border border-border/50 p-6"
                    >
                      <h3 className="text-lg font-semibold mb-4">Compliance Dashboard</h3>
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">FDA Compliance</span>
                            <span className="text-success font-bold">100%</span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                            <div className="h-full w-full bg-success rounded-full" />
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">WHO Guidelines</span>
                            <span className="text-success font-bold">98%</span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                            <div className="h-full w-[98%] bg-success rounded-full" />
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">FSSAI Standards</span>
                            <span className="text-warning font-bold">92%</span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                            <div className="h-full w-[92%] bg-warning rounded-full" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </main>

          {/* Footer */}
          <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm px-6 py-4">
            <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
              <p>© 2026 Intelligent Cold Chain Monitoring System. All rights reserved.</p>
              <p className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success" />
                Hackathon Theme 7: Smart Supply Chain & Logistics Intelligence
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
