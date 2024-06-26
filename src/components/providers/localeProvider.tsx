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
    const [localeIndex, setLocaleIndex] = useState(localStorage.getItem('locale') ? parseInt(localStorage.getItem('locale') as string) : 0)
    const [locale, setLocale] = useState(locales[localeIndex])
    const [translation, setTranslation] = useState(translations[locale])

    useEffect(() => {
        setLocale(locales[localeIndex])
    }, [localeIndex, locales])

    useEffect(() => {
        setTranslation(translations[locale])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locale])

    function changeLocale() {
        setLocaleIndex((localeIndex + 1) % locales.length)
        localStorage.setItem('locale', (localeIndex + 1) % locales.length + '')
    }

    return (
        <LocaleContext.Provider value={{ translation, locale, changeLocale, setLocaleIndex }}>
            {children}
        </LocaleContext.Provider>
    )
}