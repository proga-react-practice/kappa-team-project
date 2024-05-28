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
            vehicle_list: "Vehicle List",
            upload_image: "Upload Image",
            open: "Open",
            filters: "Filters",
            all: "All",
            car: "Car",
            motorcycle: "Motorcycle",
            from: "From",
            to: "To",
            manufacturer: "Manufacturer",
            search: "Search",
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
            message: "Sorry, the page you are looking for could not be found or has been removed.",
            btn_return : "Return To Home",
        },
        page_home: {
            title: "Your own collection",
            message: "Create your own collection of vehicles and manage them conveniently with a shared list. Add your favorite cards, edit them, and leave feedback. To get started, select one of the categories:",
            btn_add_car: "Add Car",
            btn_add_moto:"Add Moto"

        },

        footer: {
            features: "Features",
            linkGitHub: "Link GitHub",
            resources: "Resources",
            mui: "MUI",
            developers: "Developers",
            support: "Support",
            company: "Company",
            about: "About",
            ourTeam: "Our Team",
            contact: "Contact",
            feedback: "Feedback"
        },

        feedback:{
            name: "Your name",
            email: "Your email",
            feedback_text : "Feedback or Suggestions",
            feedback_placeholder:"Enter your feedback or suggestions",
            submit:"Submit",
            error_name:"Please enter your name",
            error_email:"Please enter your email",
            error_feedback:"Please enter your feedback or suggestions",
            name_placeholder : "Enter your name",
            email_placeholder: "Enter your email",

        },
        comingSoon: {
            title: "Coming Soon",
            description: "Our website is under construction. We'll be here soon with our new awesome site, subscribe to be notified.",
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
            vehicle_list: "Список транспортних засобів",
            upload_image: "Завантажити зображення",
            open: "Відкрити",
            filters: "Фільтри",
            all: "Всі",
            car: "Автомобіль",
            motorcycle: "Мотоцикл",
            from: "Від",
            to: "До",
            manufacturer: "Виробник",
            search: "Пошук",
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
            message: "Вибачте, сторінку, яку ви шукаєте, не знайдено або її було видалено.",
            btn_return : "Повернутися додому",

        },
        page_home: {
            title: "Ваша власна колекція",
            message: "Створюйте власну колекцію транспортних засобів і зручно керуйте ними за допомогою спільного списку. Додавайте улюблені карточки, редагуйте їх та залишайте відгуки. Щоб почати, оберіть одну із категорій:",
            btn_add_car: "Додати автомобіль",
            btn_add_moto: "Додати мотоцикл"

        },

        footer: {
            features: "Функції",
            linkGitHub: "Посилання GitHub",
            resources: "Ресурси",
            mui: "MUI",
            developers: "Розробники",
            support: "Підтримка",
            company: "Компанія",
            about: "Про нас",
            ourTeam: "Наша команда",
            contact: "Контакти",
            feedback: "Зворотній зв'язок"
        },
        feedback: {
            name: "Ваше ім'я",
            email: "Ваша електронна пошта",
            feedback_text: "Відгуки або Пропозиції",
            submit: "Надіслати",
            error_name: "Будь ласка, введіть своє ім'я",
            error_email: "Будь ласка, введіть свою електронну пошту",
            error_feedback: "Будь ласка, введіть ваші відгуки або пропозиції",
            feedback_placeholder: "Введіть ваші відгуки або пропозиції",
            name_placeholder : "Введіть своє ім'я",
            email_placeholder: "Введіть свою електронну пошту"

        },
        comingSoon: {
            title: "Скоро відкриття",
            description: "Наш сайт в процесі розробки. Ми скоро будемо тут з новим чудовим сайтом, підпишіться, щоб бути сповіщеними.",
        },


    },
};
