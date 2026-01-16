"use client"

import { useEffect, useState } from "react"
import { Copy, Check } from "lucide-react"

interface ServerData {
  online: boolean
  players: {
    online: number
    max: number
  }
}

export function ServerStatus() {
  const [serverData, setServerData] = useState<ServerData | null>(null)
  const [bedrockData, setBedrockData] = useState<ServerData | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const serverIP = "pera.mom"
  const javaPort = 25565
  const bedrockPort = 19132

  useEffect(() => {
    async function fetchServerStatus() {
      try {
        const [javaRes, bedrockRes] = await Promise.all([
          fetch(`https://api.mcsrvstat.us/3/${serverIP}:${javaPort}`),
          fetch(`https://api.mcsrvstat.us/bedrock/3/${serverIP}:${bedrockPort}`),
        ])

        const javaData = await javaRes.json()
        const bedrockData = await bedrockRes.json()

        setServerData(javaData)
        setBedrockData(bedrockData)
      } catch (error) {
        console.error("Error fetching server status:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchServerStatus()
    const interval = setInterval(fetchServerStatus, 60000)
    return () => clearInterval(interval)
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(serverIP)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const isOnline = serverData?.online || bedrockData?.online
  const totalPlayers = (serverData?.players?.online || 0) + (bedrockData?.players?.online || 0)

  return (
    <div className="w-full max-w-md mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
        {/* Botón IP con copy */}
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {serverIP}
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>

        {/* Botón Discord con contador */}
        <a
          href="https://discord.gg/pera"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-zinc-800/80 hover:bg-zinc-700/80 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 border border-white/10"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
          DISCORD
          {isOnline && (
            <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 text-sm px-2 py-0.5 rounded-full">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              {totalPlayers}
            </span>
          )}
        </a>
      </div>

      {/* Copied feedback */}
      {copied && <p className="text-emerald-400 text-center text-sm mb-6 animate-pulse">IP copiada al portapapeles</p>}

      <div className="flex items-center justify-center gap-8">
        {/* Jugadores */}
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold text-white">
            {loading ? "..." : totalPlayers}
            <span className="text-emerald-400">+</span>
          </p>
          <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Jugadores</p>
        </div>

        {/* Separador */}
        <div className="h-12 w-px bg-white/20"></div>

        {/* Status - Ahora con indicador visual */}
        <div className="text-center">
          {loading ? (
            <p className="text-3xl md:text-4xl font-bold text-white/50">...</p>
          ) : isOnline ? (
            <div className="flex items-center justify-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <p className="text-3xl md:text-4xl font-bold text-emerald-400">Activo</p>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <p className="text-3xl md:text-4xl font-bold text-red-400">Inactivo</p>
            </div>
          )}
          <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Estado</p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6 text-xs text-white/40">
        <span>Java: {javaPort}</span>
        <span>|</span>
        <span>Bedrock: {bedrockPort}</span>
      </div>
    </div>
  )
}
