"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useTranslation } from "../utils/translations"

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "english"
  })

  const t = useTranslation(language)

  const toggleLanguage = () => {
    const newLanguage = language === "english" ? "arabic" : "english"
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const value = {
    language,
    setLanguage: changeLanguage,
    toggleLanguage,
    t,
    isRTL: language === "arabic",
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export { LanguageContext }
