// Shared site configuration hook
import { useEffect, useState } from 'react'

export interface SiteConfig {
  botName: string
  botLogo: string
  favicon: string
  tagline: string
  inviteLink: string
}

const DEFAULT_CONFIG: SiteConfig = {
  botName: 'Eris Bot',
  botLogo: '/eris-logo.png',
  favicon: '/favicon.png',
  tagline: 'Systematically does it all',
  inviteLink: 'https://discord.com/oauth2/authorize?client_id=1426601112584323232',
}

let cachedConfig: SiteConfig | null = null

export const useSiteConfig = (): SiteConfig => {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG)

  useEffect(() => {
    // Use cached config if available
    if (cachedConfig) {
      setConfig(cachedConfig)
      return
    }

    // Load from siteconfig.json
    fetch('/siteconfig.json')
      .then((res) => res.json())
      .then((data) => {
        const mergedConfig = { ...DEFAULT_CONFIG, ...data }
        cachedConfig = mergedConfig
        setConfig(mergedConfig)
      })
      .catch(() => {
        setConfig(DEFAULT_CONFIG)
      })
  }, [])

  return config
}

export const getSiteConfigSync = (): SiteConfig => {
  return cachedConfig || DEFAULT_CONFIG
}
