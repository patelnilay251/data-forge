'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Play } from "lucide-react"

interface CodeCellProps {
  id: number
  code: string
  output: string | null
  isOutputVisible: boolean
  onRunCode: (id: number, code: string) => void
}

export default function CodeCell({ id, code: initialCode, output, isOutputVisible, onRunCode }: CodeCellProps) {
  const [code, setCode] = useState(initialCode)

  return (
    <div className="rounded-md overflow-hidden bg-white border border-dark-blue/10 shadow-sm">
      <div className="flex p-2 border-b border-dark-blue/10 bg-white">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder='Enter Python code, e.g., "df.head()"'
          className="flex-1 font-mono text-sm resize-none border-0 focus-visible:ring-0 p-2 text-dark-blue/80"
          rows={3}
        />
        <div className="ml-2 flex items-start">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Button className="bg-primary/80 hover:bg-primary text-white" size="sm" onClick={() => onRunCode(id, code)}>
              <Play className="h-4 w-4 mr-1" /> Run
            </Button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isOutputVisible && output && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="p-3 bg-light-blue border-t border-dark-blue/10 font-mono text-sm whitespace-pre-wrap text-dark-blue/80">
              {output}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

