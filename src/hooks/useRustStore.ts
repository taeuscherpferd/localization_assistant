import { Store } from "@tauri-apps/plugin-store"
import { useEffect, useState } from "react"

export const useRustStore = (store: Store): { localizerSettings: LocalizerSettings, saveSettings: (ns: LocalizerSettings) => Promise<void> } => {
  const [apiKey, setApiKey] = useState("")
  const [localeJsonPath, setLocaleJsonPath] = useState("")
  const [supportedLanguages, setSupportedLanguages] = useState<string[]>([])
  const [defaultLanguage, setDefaultLanguage] = useState<string>("en-US")

  useEffect(() => {
    (async () => {
      try {
        const apiRes = await store.get<string>("apiKey")
        const pathRes = await store.get<string>("localeJsonPath")
        const supportedLangRes = await store.get<string[]>("supportedLanguages")
        const defaultLanguage = await store.get<string>("defaultLanguage")

        if (apiRes) setApiKey(apiRes)
        if (pathRes) setLocaleJsonPath(pathRes)
        if (supportedLangRes) setSupportedLanguages(supportedLangRes)
        if (defaultLanguage) setDefaultLanguage(defaultLanguage)
      }
      catch (e) {
        console.error(e)
      }
    })();
  }, [store])


  const saveSettings = async (newSettings: LocalizerSettings) => {
    if (newSettings.apiKey !== apiKey) {
      await store.set("apiKey", newSettings.apiKey)
      setApiKey(newSettings.apiKey)
    }
    if (newSettings.localeJsonPath !== localeJsonPath) {
      await store.set("localeJsonPath", newSettings.localeJsonPath)
      setLocaleJsonPath(newSettings.localeJsonPath)
    }
    if (newSettings.supportedLanguages.toString() !== supportedLanguages.toString()) {
      await store.set("supportedLanguages", newSettings.supportedLanguages)
      setSupportedLanguages(newSettings.supportedLanguages)
    }
  }

  return { localizerSettings: { apiKey, localeJsonPath, supportedLanguages, defaultLanguage }, saveSettings }
}