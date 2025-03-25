"use client"

import { useState } from "react"
import Header from "@/components/header"
import LeftPanel from "@/components/left-panel"
import CenterPanel from "@/components/center-panel"
import RightPanel from "@/components/right-panel"
import GeometricPattern from "@/components/geometric-pattern"

// API endpoint constants
const API_BASE_URL = "http://localhost:8000"

export default function Home() {
  const [dataset, setDataset] = useState<any>(null)
  const [cells, setCells] = useState<{ id: number; code: string; output: string | null; isOutputVisible: boolean }[]>([
    { id: 1, code: "", output: null, isOutputVisible: false }
  ])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleFileUpload = async (file: File) => {
    setIsLoading(true)

    try {
      // Create form data for file upload
      const formData = new FormData()
      formData.append("file", file)

      // Call the backend API to upload and process the file
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      // Parse the response data
      const data = await response.json()
      setDataset(data)
    } catch (error) {
      console.error("Error uploading file:", error)
      // Could add error notification here
    } finally {
      setIsLoading(false)
    }
  }

  const handleRunCode = async (id: number, code: string) => {
    try {
      // Update cell to show it's running
      setCells(
        cells.map((cell) => {
          if (cell.id === id) {
            return {
              ...cell,
              output: "Running...",
              isOutputVisible: true,
            }
          }
          return cell
        })
      )

      // Call the backend API to execute the code
      const response = await fetch(`${API_BASE_URL}/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      if (!response.ok) {
        throw new Error(`Code execution failed: ${response.statusText}`)
      }

      // Parse the response data
      const data = await response.json()

      // Update the cell with the execution output
      setCells(
        cells.map((cell) => {
          if (cell.id === id) {
            return {
              ...cell,
              output: data.output,
              isOutputVisible: true,
            }
          }
          return cell
        })
      )
    } catch (error) {
      console.error("Error executing code:", error)

      // Update cell with error message
      setCells(
        cells.map((cell) => {
          if (cell.id === id) {
            return {
              ...cell,
              output: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              isOutputVisible: true,
            }
          }
          return cell
        })
      )
    }
  }

  const addNewCell = () => {
    const newId = Math.max(...cells.map((cell) => cell.id)) + 1
    setCells([...cells, { id: newId, code: "", output: null, isOutputVisible: false }])
  }

  return (
    <div className="flex flex-col min-h-screen bg-light-blue relative overflow-hidden">
      <GeometricPattern type="grid" className="inset-0 z-0" />
      <Header />
      <div className="flex flex-1 flex-col lg:flex-row relative z-10">
        <LeftPanel dataset={dataset} onFileUpload={handleFileUpload} isLoading={isLoading} />
        <CenterPanel cells={cells} onRunCode={handleRunCode} onAddCell={addNewCell} />
        <RightPanel dataset={dataset} />
      </div>
    </div>
  )
}

