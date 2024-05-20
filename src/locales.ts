import { Translations } from "./components/providers/localeProvider"

export const locales = ["en_US", "uk_UA"]

export const translations : Translations = {
    en_US: {
        layout: {
            home: "Home",
            cars: "Cars",
            moto: "Motorcycles",
            list: "List",
            lang_name: "🇬🇧 English",
        },
        car_form: {
            title: "Add car",
            select_maker: "Select maker",
            maker: "Maker",
            brand: "Brand",
            model: "Model",
            year: "Year",
            submit: "Submit",
        },
    },
    uk_UA: {
        layout: {
            home: "Головна",
            cars: "Автомобілі",
            moto: "Мотоцикли",
            list: "Список",
            lang_name: "🇺🇦 Українська",
        },
        car_form: {
            select_maker: "Виберіть виробника",
            title: "Додати автомобіль",
            maker: "Виробник",
            brand: "Марка",
            model: "Модель",
            year: "Рік",
            submit: "Відправити",
        },
    },
}