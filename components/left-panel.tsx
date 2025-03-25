'use client'

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RefreshCw, Upload, Loader2 } from "lucide-react"
import GeometricPattern from "./geometric-pattern"

interface LeftPanelProps {
  dataset: any
  onFileUpload: (file: File) => void
  isLoading: boolean
}

export default function LeftPanel({ dataset, onFileUpload, isLoading }: LeftPanelProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files[0])
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 500)
  }

  return (
    <motion.div
      className="w-full lg:w-[300px] bg-gradient-dark text-white p-4 overflow-y-auto relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <GeometricPattern type="spiral" className="inset-0" color="#ffffff" opacity={0.03} />

      <div className="relative z-10">
        <div className="mb-6 mt-2">
          <h2 className="text-sm uppercase tracking-wider font-light mb-4 border-b border-white/10 pb-2">
            Dataset Manager
          </h2>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <Button
              className="w-full bg-primary/80 hover:bg-primary text-white border border-primary/20"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Upload CSV
                </>
              )}
            </Button>
            <input type="file" ref={fileInputRef} className="hidden" accept=".csv" onChange={handleFileChange} />
          </motion.div>
        </div>

        {dataset && (
          <>
            <Accordion type="single" collapsible className="mb-6 bg-dark-blue/50 rounded-md border border-primary/10">
              <AccordionItem value="dataset-info" className="border-b-0">
                <AccordionTrigger className="px-3 py-2 text-sm hover:no-underline hover:bg-primary/10">
                  <span className="text-primary/90">Dataset Info</span>
                </AccordionTrigger>
                <AccordionContent className="px-3 py-2 text-sm">
                  <div className="space-y-1 text-white/80">
                    <p>
                      Name: <span className="text-primary/90">{dataset.name}</span>
                    </p>
                    <p>
                      Rows: <span className="text-primary/90">{dataset.rows}</span>
                    </p>
                    <p>
                      Columns: <span className="text-primary/90">{dataset.columns}</span>
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-wider font-light mb-3 flex items-center">
                <span>Preview</span>
                <div className="flex-1 mx-2 h-px bg-white/10"></div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-primary/80 hover:text-primary text-xs flex items-center"
                  onClick={handleRefresh}
                >
                  <motion.div animate={{ rotate: isRefreshing ? 360 : 0 }} transition={{ duration: 0.5 }}>
                    <RefreshCw className="h-3 w-3 mr-1" />
                  </motion.div>
                  Refresh
                </motion.button>
              </h3>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <div className="bg-dark-blue/50 rounded-md border border-primary/10 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-primary/10">
                        {Object.keys(dataset.preview[0]).map((key) => (
                          <TableHead key={key} className="text-primary/90 font-light text-xs">
                            {key}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dataset.preview.map((row: any, rowIndex: number) => (
                        <TableRow key={rowIndex} className="border-b-primary/10">
                          {Object.values(row).map((value: any, index) => (
                            <TableCell key={index} className="text-white/80 text-xs py-1.5">
                              {value}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

