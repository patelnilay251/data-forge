'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import GeometricPattern from "./geometric-pattern"
import { Loader2 } from "lucide-react"
import dynamic from 'next/dynamic'

// Dynamically import Plotly with SSR disabled
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

// API endpoint constants
const API_BASE_URL = "http://localhost:8000"

const API_BASE_URL_RENDER = "https://backend-data-forge.onrender.com"


interface RightPanelProps {
  dataset: any
}

export default function RightPanel({ dataset }: RightPanelProps) {
  const [chartType, setChartType] = useState("bar")
  const [chartData, setChartData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch visualization when chart type changes or dataset changes
  useEffect(() => {
    if (!dataset) {
      setChartData(null)
      return
    }

    const fetchVisualization = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_BASE_URL_RENDER}/visualize`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chart_type: chartType }),
        })

        if (!response.ok) {
          throw new Error(`Visualization request failed: ${response.statusText}`)
        }

        const data = await response.json()

        if (data.error) {
          setError(data.error)
          setChartData(null)
        } else {
          setChartData(data)
        }
      } catch (err) {
        console.error("Error fetching visualization:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch visualization")
        setChartData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVisualization()
  }, [chartType, dataset])

  return (
    <motion.div
      className="w-full lg:w-[400px] bg-white border-l border-dark-blue/10 p-4 relative"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <GeometricPattern type="grid" className="inset-0" color="#1a1a2e" opacity={0.02} />

      <div className="relative z-10">
        <div className="mb-6 flex items-center">
          <h2 className="text-sm uppercase tracking-wider font-light text-dark-blue">Visualization</h2>
          <div className="flex-1 mx-3 h-px bg-dark-blue/10"></div>
          <div className="text-xs text-dark-blue/60 font-light">拡張</div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="mb-6">
          <Select value={chartType} onValueChange={setChartType} disabled={!dataset || isLoading}>
            <SelectTrigger className="w-full border-dark-blue/10 text-dark-blue/80 bg-light-blue/50 focus:ring-primary/20">
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Bar Chart</SelectItem>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="scatter">Scatter Plot</SelectItem>
              <SelectItem value="pie">Pie Chart</SelectItem>
              <SelectItem value="histogram">Histogram</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="border border-dark-blue/10 rounded-md p-4 h-[400px] flex items-center justify-center bg-light-blue/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-5"
            >
              <motion.g
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 180, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <line x1="100" y1="100" x2="190" y2="100" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.3} />
                <line x1="100" y1="100" x2="184.77" y2="129.39" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.1} />
                <line x1="100" y1="100" x2="169.35" y2="155.88" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.3} />
                <line x1="100" y1="100" x2="145.00" y2="177.06" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.1} />
                <line x1="100" y1="100" x2="115.00" y2="190.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.3} />
                <line x1="100" y1="100" x2="84.00" y2="193.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.1} />
                <line x1="100" y1="100" x2="54.00" y2="185.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.3} />
                <line x1="100" y1="100" x2="29.00" y2="168.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.1} />
                <line x1="100" y1="100" x2="10.00" y2="142.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.3} />
                <line x1="100" y1="100" x2="0.00" y2="110.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.1} />
                <line x1="100" y1="100" x2="0.00" y2="75.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.3} />
                <line x1="100" y1="100" x2="10.00" y2="43.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.1} />
                <line x1="100" y1="100" x2="28.00" y2="16.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.3} />
                <line x1="100" y1="100" x2="53.00" y2="0.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.1} />
                <line x1="100" y1="100" x2="82.00" y2="0.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.3} />
                <line x1="100" y1="100" x2="113.00" y2="10.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.1} />
                <line x1="100" y1="100" x2="139.00" y2="29.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.3} />
                <line x1="100" y1="100" x2="159.00" y2="58.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.1} />
                <line x1="100" y1="100" x2="170.00" y2="90.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.3} />
                <line x1="100" y1="100" x2="171.00" y2="125.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.1} />
                <line x1="100" y1="100" x2="161.00" y2="156.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.3} />
                <line x1="100" y1="100" x2="142.00" y2="178.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.1} />
                <line x1="100" y1="100" x2="115.00" y2="190.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.3} />
                <line x1="100" y1="100" x2="85.00" y2="190.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.1} />
                <line x1="100" y1="100" x2="55.00" y2="179.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.3} />
                <line x1="100" y1="100" x2="30.00" y2="157.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.1} />
                <line x1="100" y1="100" x2="15.00" y2="129.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.3} />
                <line x1="100" y1="100" x2="10.00" y2="95.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.1} />
                <line x1="100" y1="100" x2="18.00" y2="63.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.3} />
                <line x1="100" y1="100" x2="36.00" y2="37.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.1} />
                <line x1="100" y1="100" x2="61.00" y2="21.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.3} />
                <line x1="100" y1="100" x2="90.00" y2="15.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.1} />
                <line x1="100" y1="100" x2="120.00" y2="20.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.3} />
                <line x1="100" y1="100" x2="146.00" y2="36.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.1} />
                <line x1="100" y1="100" x2="164.00" y2="61.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.3} />
                <line x1="100" y1="100" x2="175.00" y2="90.00" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity={0.1} />
              </motion.g>
            </svg>
          </div>

          {isLoading ? (
            <div className="text-center relative z-10">
              <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
              <p className="text-dark-blue/60 font-light">Loading visualization...</p>
            </div>
          ) : dataset && chartData ? (
            <div className="relative z-10 w-full h-full">
              <Plot
                data={chartData.data || []}
                layout={{
                  ...chartData.layout,
                  autosize: true,
                  margin: { l: 50, r: 30, t: 30, b: 50 },
                  font: { family: "Inter, sans-serif" },
                  paper_bgcolor: "transparent",
                  plot_bgcolor: "transparent",
                }}
                config={{ responsive: true }}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ) : dataset && error ? (
            <div className="text-center relative z-10">
              <p className="text-red-500 font-light mb-2">Error</p>
              <p className="text-dark-blue/60 text-sm">{error}</p>
            </div>
          ) : dataset ? (
            <div className="text-center relative z-10">
              <p className="text-lg font-light mb-2 text-dark-blue">
                {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
              </p>
              <p className="text-dark-blue/60 text-sm">Based on {dataset.name}</p>
            </div>
          ) : (
            <div className="text-center relative z-10">
              <p className="text-dark-blue/60 font-light">Chart will appear here</p>
              <p className="text-xs text-dark-blue/40 mt-1">Upload a dataset to begin</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

