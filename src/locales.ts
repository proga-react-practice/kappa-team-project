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
        form: {
            select_maker: "Select maker",
            maker: "Maker",
            model: "Model",
            year: "Year",
            engine: "Engine",
            engine_text: "Engine Type",
            petrol: "Petrol",
            diesel: "Diesel",
            electric: "Electric",
            save: "Save",
            cancel: "Cancel",
            reset: "Reset",
            commit: "Commit",
            commit_hist: "Commits History",
            cars: "Cars",
            editcar: "Edit Car",
            editmoto: "Edit Motorcycle",
            type: "Type",
            favorite: "Favorite",
            vehicle_list: "Vehicle List"
        },
        error: {
            maker_error: "Maker is required",
            model_error: "Model is required",
            model_5ch_error: "Model must be at least 5 characters long",
            model_2ch_error: 'Model must be at least 2 characters long',
            model_15ch_error: "Model must be at most 15 characters long",
            year_error: "Year is required",
            year_error_1900: "Year must be greater than 1900",
            year_less_error: "Year must be less than ",
            year_4num_error: "Year must be a 4 digit number",
            engine_error: "Engine type is required"
        },
        car_form: {
            title: "Add car",
            submit: "Add Car",
            clear: "Clear",
        },
        moto_form: {
            title: "Add motorcycle",
            submit: "SUBMIT",
            clear: "CLEAR",
        },
        page_not_found: {
            title: "404 Page not found",
            message: "Sorry, the page you are looking for could not be found or has been removed."
        },
        page_home: {
            title: "Your own collection",
            message: "Our team is working on a web project for collecting vehicles. This project allows you to create collections of your own cars and motorcycles.",
            message1: "Vladyslav made a form for creating a car collection.",
            message2: "Irina created a form to create a collection of motorcycles.",
            message3: "To connect these two forms, we used the react-router-dom library.",
            message4: "",
        }
    },
    uk_UA: {
        layout: {
            home: "Головна",
            cars: "Автомобілі",
            moto: "Мотоцикли",
            list: "Список",
            lang_name: "🇺🇦 Українська",
        },
        form: {
            select_maker: "Виберіть виробника",
            maker: "Виробник",
            model: "Модель",
            year: "Рік",
            engine: "Двигун",
            engine_text: "Тип двигуна",
            petrol: "Бензин",
            diesel: "Дизель",
            electric: "Електро",
            save: "Зберегти",
            cancel: "Скасувати",
            reset: "Скинути",
            commit: "Застосувати",
            commit_hist: "Історія змін",
            cars: "Автомобілі",
            editcar: "Редагувати автомобіль",
            editmoto: "Редагувати мотоцикл",
            type: "Тип",
            favorite: "Улюблене",
            vehicle_list: "Список транспортних засобів"
        },
        error: {
            maker_error: "Виробник є обов'язковим",
            model_error: "Модель є обов'язковою",
            model_5ch_error: "Модель повинна містити щонайменше 5 символів",
            model_2ch_error: 'Модель повинна містити щонайменше 2 символи',
            model_15ch_error: "Модель повинна містити не більше 15 символів",
            year_error: "Рік є обов'язковим",
            year_error_1900: "Рік має бути більше ніж 1900",
            year_less_error: "Рік має бути менше ніж ",
            year_4num_error: "Рік має складатися з 4 цифр",
            engine_error: "Тип двигуна є обов'язковим"
        },
        car_form: {
            title: "Додати автомобіль",
            submit: "ДОДАТИ АВТОМОБІЛЬ",
            clear: "ОЧИСТИТИ",
        },
        moto_form: {
            title: "Додати мотоцикл",
            submit: "ДОДАТИ",
            clear: "ОЧИСТИТИ"
        },
        page_not_found: {
            title: "404 Сторінка не знайдена",
            message: "Вибачте, сторінку, яку ви шукаєте, не знайдено або її було видалено."
        },
        page_home: {
            title: "Ваша власна колекція",
            message: "Наша команда працює над веб-проектом для збору транспортних засобів. Цей проект дозволяє створювати колекції власних автомобілів та мотоциклів.",
            message1: "Владислав створив форму для створення колекції автомобілів.",
            message2: "Ірина створила форму для створення колекції мотоциклів.",
            message3: "Для з'єднання цих двох форм ми використовували бібліотеку react-router-dom.",
            message4: "",
        }
    },
}
