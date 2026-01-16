import { ServerStatus } from "@/components/server-status"
import { SocialLinks } from "@/components/social-links"
import { VoteSection } from "@/components/vote-section"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center px-4 py-8">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/background.png" alt="Pera Network Spawn" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6">
          <span className="px-4 py-2 rounded-full border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 text-sm font-medium tracking-wide">
            BIENVENIDO A PERA NETWORK
          </span>
        </div>

        <div className="mb-8">
          <Image
            src="/images/pera900.png"
            alt="Pera Network"
            width={280}
            height={200}
            className="drop-shadow-2xl"
            priority
          />
        </div>

        {/* Server Status */}
        <ServerStatus />

        <VoteSection />

        {/* Social Links */}
        <div className="mt-8">
          <SocialLinks />
        </div>
      </div>
    </main>
  )
}
