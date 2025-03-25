'use client'

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import CodeCell from "@/components/code-cell"
import { Plus } from "lucide-react"
import GeometricPattern from "./geometric-pattern"

interface CellType {
  id: number
  code: string
  output: string | null
  isOutputVisible: boolean
}

interface CenterPanelProps {
  cells: CellType[]
  onRunCode: (id: number, code: string) => void
  onAddCell: () => void
}

export default function CenterPanel({ cells, onRunCode, onAddCell }: CenterPanelProps) {
  return (
    <motion.div
      className="flex-1 bg-light-blue p-4 overflow-y-auto relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
    >
      <GeometricPattern type="torus" className="top-0 right-0 w-64 h-64 opacity-5" color="#1a1a2e" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-6 flex items-center">
          <h2 className="text-sm uppercase tracking-wider font-light text-dark-blue">Notebook</h2>
          <div className="flex-1 mx-3 h-px bg-dark-blue/10"></div>
          <div className="text-xs text-dark-blue/60 font-light">想像力</div>
        </div>

        <AnimatePresence>
          {cells.map((cell, index) => (
            <motion.div
              key={cell.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.5,
                delay: index === 0 ? 0.3 : 0,
              }}
              className="mb-6"
            >
              <CodeCell
                id={cell.id}
                code={cell.code}
                output={cell.output}
                isOutputVisible={cell.isOutputVisible}
                onRunCode={onRunCode}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="mt-8">
          <Button
            variant="outline"
            className="border-primary/40 text-primary hover:bg-primary/5 hover:border-primary/60"
            onClick={onAddCell}
          >
            <Plus className="mr-2 h-4 w-4" /> New Cell
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

