import { createContext, useEffect, useState } from "react"

interface Translation{
    [key: string]: Record<string, string>
}

export interface Translations {
    [key: string]: Translation

}

interface LocaleProviderProps {
    children: React.ReactNode
    locales: string[]
    translations: Translations
}

interface LocaleContextProps {
    translation: Translation
    locale: string
    changeLocale: () => void
    setLocaleIndex: (index: number) => void
}

export const LocaleContext = createContext<LocaleContextProps>({
    translation: {},
    locale: "",
    changeLocale: () => { },
    setLocaleIndex: () => { }
 })

export default function LocaleProvider({ children, locales, translations }: LocaleProviderProps) {
    const [localeIndex, setLocaleIndex] = useState(0)
    const [locale, setLocale] = useState(locales[localeIndex])
    const [translation, setTranslation] = useState(translations[locale])

    useEffect(() => {
        setLocale(locales[localeIndex])
    }, [localeIndex])

    useEffect(() => {
        setTranslation(translations[locale])
    }, [locale])

    function changeLocale() {
        setLocaleIndex((localeIndex + 1) % locales.length)
    }

    return (
        <LocaleContext.Provider value={{ translation, locale, changeLocale, setLocaleIndex }}>
            {children}
        </LocaleContext.Provider>
    )
}