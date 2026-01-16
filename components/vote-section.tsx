import Image from "next/image"
import { ExternalLink } from "lucide-react"

interface VoteSite {
  name: string
  logo: string
  url: string
}

const voteSites: VoteSite[] = [
  {
    name: "Minecraft-Server-List",
    logo: "https://minecraft-server-list.com/favicon.ico",
    url: "https://minecraft-server-list.com/server/123456/vote/",
  },
  {
    name: "MinecraftServers.org",
    logo: "https://minecraftservers.org/favicon.ico",
    url: "https://minecraftservers.org/vote/123456",
  },
  {
    name: "TopG",
    logo: "https://topg.org/favicon.ico",
    url: "https://topg.org/minecraft-servers/server-123456",
  },
  {
    name: "Planet Minecraft",
    logo: "https://www.planetminecraft.com/favicon.ico",
    url: "https://www.planetminecraft.com/server/pera-network/vote/",
  },
  {
    name: "Minecraft-MP",
    logo: "https://minecraft-mp.com/favicon.ico",
    url: "https://minecraft-mp.com/server/123456/vote/",
  },
]

export function VoteSection() {
  return (
    <div className="w-full max-w-md">
      <h3 className="text-white/50 text-xs uppercase tracking-wider text-center mb-4">Vota por nosotros</h3>
      <div className="flex flex-col gap-2">
        {voteSites.map((site) => (
          <a
            key={site.name}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-zinc-800/50 hover:bg-zinc-700/50 border border-white/5 hover:border-emerald-500/30 rounded-lg px-4 py-3 transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center overflow-hidden">
                <Image
                  src={site.logo || "/placeholder.svg"}
                  alt={site.name}
                  width={20}
                  height={20}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span className="text-white/80 text-sm font-medium">{site.name}</span>
            </div>
            <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold uppercase group-hover:gap-2 transition-all">
              Votar
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
