'use client'

import { motion } from "framer-motion"

export default function Header() {
  return (
    <motion.header
      className="w-full bg-gradient-dark text-white p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-px bg-primary opacity-30" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-primary opacity-30" />
        <div
          className="absolute bg-primary opacity-5"
          style={{
            height: "1px",
            width: "22.661827275605326%",
            left: "69.16159053861558%",
            top: "37.498616766699215%",
            transform: "rotate(4.623090145237225deg)",
          }}
        />
        <div
          className="absolute bg-primary opacity-5"
          style={{
            height: "1px",
            width: "32.3253413652764%",
            left: "53.04078179059124%",
            top: "72.5063630264662%",
            transform: "rotate(42.532734100075984deg)",
          }}
        />
        <div
          className="absolute bg-primary opacity-5"
          style={{
            height: "1px",
            width: "16.02622883228603%",
            left: "29.946341720566082%",
            top: "90.86760947774475%",
            transform: "rotate(66.37072327044177deg)",
          }}
        />
        <div
          className="absolute bg-primary opacity-5"
          style={{
            height: "1px",
            width: "31.870804005663654%",
            left: "76.78236627810657%",
            top: "22.300795922918226%",
            transform: "rotate(35.216477779426555deg)",
          }}
        />
        <div
          className="absolute bg-primary opacity-5"
          style={{
            height: "1px",
            width: "13.800959001694391%",
            left: "41.366254866254216%",
            top: "13.466828677174568%",
            transform: "rotate(88.71234567890123deg)",
          }}
        />
      </div>

      <div className="relative z-10 flex items-center">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mr-3"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 12H18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </motion.div>
        <div>
          <h1 className="text-2xl font-light tracking-wider">DataForge</h1>
          <p className="text-xs text-primary/80 font-light tracking-wider">データフォージ</p>
        </div>
      </div>
    </motion.header>
  )
}

