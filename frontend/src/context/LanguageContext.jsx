import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        nav: { brand: 'EcoShop', home: 'Home', shop: 'Shop', about: 'About', cart: 'Cart', login: 'Login', register: 'Register', dashboard: 'Dashboard', profile: 'Profile', logout: 'Log Out' },
        hero: {
            badge: 'New Collection 2025',
            title: "Nature's Best,\nBottled for You",
            subtitle: 'Experience the future of clean beauty. 100% Organic, Ethical, and Scientifically proven to rejuvenate your skin.',
            shop_all: 'Shop All',
            our_story: 'Our Story'
        },
        blog: {
            article_1: '5 Myths About Collagen',
            article_1_excerpt: 'Collagen is essential for skin elasticity, but there are many misconceptions about how it works...',
            article_2: 'How to Choose Supplements',
            article_2_excerpt: 'Navigating the world of supplements can be tricky. Here is our expert guide to boosting immunity...',
            article_3: 'Spring Skincare Routine',
            article_3_excerpt: 'Transitioning your skincare routine for spring is crucial for maintaining a healthy glow...'
        },
        about: {
            title: 'Our Story',
            subtitle: 'Founded in 2016, EcoDeviva began with a simple mission: to make clean, organic beauty accessible to everyone.',
            history_title: 'Our Journey',
            history_text: 'What started as a small local shop in 2016 has grown into a trusted brand loved by thousands. Over the years, we have stayed true to our roots—sourcing only the finest organic ingredients and ensuring every product is crafted with care and respect for nature. From our humble beginnings to our latest 2025 collection, our commitment to quality and sustainability remains unwavering.',
            values_title: 'Our Values',
            value_1: 'Sustainability First',
            value_2: 'Ethical Sourcing',
            value_3: 'Customer Love'
        },
        features: {
            organic: '100% Organic',
            organic_desc: 'Certified ingredients',
            cruelty: 'Cruelty Free',
            cruelty_desc: 'Never tested on animals',
            carbon: 'Carbon Neutral',
            carbon_desc: 'Free eco-shipping',
            payment: 'Secure Payment',
            payment_desc: '100% secure checkout'
        },
        home: {
            categories: 'Shop by Category',
            see_all: 'See all',
            hits: 'Bestsellers',
            history_title: 'Our Journey',
            history_text: 'What started as a small local shop in 2016 has grown into a trusted brand...',
            blog_title: 'Expert Advice'
        },
        shop: {
            title: 'Shop Collection',
            filters: 'Filters',
            price_range: 'Price Range',
            categories: 'Categories',
            sort_newest: 'Newest First',
            sort_price_low: 'Price: Low to High',
            sort_price_high: 'Price: High to Low',
            search_placeholder: 'Search products...',
            filter_skin: 'Skin Type',
            filter_ingredients: 'Ingredients',
            skin_dry: 'Dry',
            skin_oily: 'Oily',
            skin_combo: 'Combination',
            skin_normal: 'Normal',
            ing_collagen: 'Collagen',
            ing_hyaluronic: 'Hyaluronic Acid',
            ing_vitc: 'Vitamin C',
            results_for: 'Results for'
        },
        product: {
            back: 'Back to Shop',
            add_to_cart: 'Add to Cart',
            description: 'Description',
            ingredients: 'Ingredients',
            shipping: 'Shipping',
            specs_title: 'Specs & Shipping',
            volume: 'Volume',
            country: 'Country',
            shipping_desc: 'Free shipping on all orders over ₴1000',
            views: 'views',
            related: 'You May Also Like'
        },
        cart: {
            title: 'Your Cart',
            empty: 'Your cart is empty',
            start_shopping: 'Start Shopping',
            subtotal: 'Subtotal',
            shipping: 'Shipping',
            total: 'Total',
            checkout: 'Proceed to Checkout'
        },
        checkout: {
            title: 'Checkout',
            step_shipping: 'Shipping',
            step_payment: 'Payment',
            full_name: 'Full Name',
            address: 'Address',
            city: 'City',
            zip: 'Zip Code',
            card_number: 'Card Number',
            expiry: 'Expiry Date',
            cvv: 'CVV',
            place_order: 'Place Order',
            success_title: 'Order Placed!',
            success_msg: 'Thank you for your purchase. Your order #12345 has been confirmed.',
            back_home: 'Back to Home'
        },
        footer: {
            brand_desc: 'Sustainable beauty products crafted for a better world. 100% Organic, Ethical, and Transparent.',
            shop: 'Shop',
            support: 'Support',
            newsletter_title: 'Stay in the Loop',
            newsletter_desc: 'Join our newsletter for exclusive offers and eco-tips.',
            subscribe: 'Subscribe',
            email_placeholder: 'Your email',
            all_products: 'All Products',
            privacy: 'Privacy Policy',
            terms: 'Terms',
            cookies: 'Cookies',
            rights: 'All rights reserved.'
        },
        auth: {
            login_title: 'Welcome Back',
            register_title: 'Create Account',
            email: 'Email',
            password: 'Password',
            name: 'Full Name',
            phone: 'Phone Number',
            submit_login: 'Log In',
            submit_register: 'Sign Up',
            no_account: "Don't have an account?",
            has_account: "Already have an account?",
            your_number: "your number"
        },
        profile: {
            title: 'My Profile',
            welcome: 'Welcome Back',
            member_since: 'Member since 2025',
            tab_orders: 'My Orders',
            tab_settings: 'Settings',
            Tab_logout: 'Log Out',
            orders_title: 'Order History',
            settings_title: 'Account Settings',
            personal_info: 'Personal Information',
            preferences: 'Preferences',
            subscribe: 'Subscribe to Newsletter',
            please_login: 'Please log in to view your profile.',
            items: 'Items',
            status_delivered: 'Delivered',
            status_transit: 'In Transit'
        }
    },
    ua: {
        nav: { brand: 'EcoShop', home: 'Головна', shop: 'Магазин', about: 'Про нас', cart: 'Кошик', login: 'Вхід', register: 'Реєстрація', dashboard: 'Кабінет', profile: 'Профіль', logout: 'Вихід' },
        hero: {
            badge: 'Нова Колекція 2025',
            title: "Найкраще від природи,\nСтворено для вас",
            subtitle: 'Відкрийте майбутнє чистої краси. 100% органічно, етично та науково доведено для омолодження вашої шкіри.',
            shop_all: 'До магазину',
            our_story: 'Про нас'
        },
        about: {
            title: 'Наша Історія',
            subtitle: 'Заснована у 2016 році, EcoDeviva розпочала свою діяльність з простої місії: зробити чисту, органічну красу доступною для кожного.',
            history_title: 'Наш Шлях',
            history_text: 'Те, що починалося як маленький місцевий магазинчик у 2016 році, перетворилося на надійний бренд, який люблять тисячі. Протягом років ми залишалися вірними своєму корінню — використовувати лише найкращі органічні інгредієнти та гарантувати, що кожен продукт створено з турботою та повагою до природи. Від наших скромних початків до нової колекції 2025 року, наша відданість якості та сталому розвитку залишається незмінною.',
            values_title: 'Наші Цінності',
            value_1: 'Сталий Розвиток',
            value_2: 'Етичне Виробництво',
            value_3: 'Любов до Клієнтів'
        },
        blog: {
            article_1: '5 міфів про колаген',
            article_1_excerpt: 'Колаген важливий для еластичності, але існує багато міфів про те, як він працює...',
            article_2: 'Як правильно обрати БАДи',
            article_2_excerpt: 'Світ добавок може бути складним. Ось наш експертний гід з підтримки імунітету...',
            article_3: 'Весняна схема догляду',
            article_3_excerpt: 'Перехід на весняний догляд за шкірою є вирішальним для підтримки здорового сяйва...'
        },

        features: {
            organic: '100% Органіка',
            organic_desc: 'Сертифіковані інгредієнти',
            cruelty: 'Без жорстокості',
            cruelty_desc: 'Не тестується на тваринах',
            carbon: 'Вуглецево-нейтрально',
            carbon_desc: 'Еко-доставка',
            payment: 'Швидка оплата',
            payment_desc: 'Безпечні платежі'
        },
        home: {
            categories: 'Категорії',
            see_all: 'Всі',
            hits: 'Хіти Продажів',
            history_title: 'Наш Шлях',
            history_text: 'Те, що починалося як маленький місцевий магазинчик...',
            blog_title: 'Поради Експертів'
        },
        shop: {
            title: 'Каталог',
            filters: 'Фільтри',
            price_range: 'Ціна',
            categories: 'Категорії',
            sort_newest: 'Спочатку нові',
            sort_price_low: 'Від дешевих',
            sort_price_high: 'Від дорогих',
            search_placeholder: 'Пошук товарів...',
            filter_skin: 'Тип Шкіри',
            filter_ingredients: 'Інгредієнти',
            skin_dry: 'Суха',
            skin_oily: 'Жирна',
            skin_combo: 'Комбінована',
            skin_normal: 'Нормальна',
            ing_collagen: 'Колаген',
            ing_hyaluronic: 'Гіалуронова к-та',
            ing_vitc: 'Вітамін С',
            results_for: 'Результати для'
        },
        product: {
            back: 'Назад',
            add_to_cart: 'В кошик',
            description: 'Опис',
            ingredients: 'Інгредієнти',
            shipping: 'Доставка',
            specs_title: 'Характеристики',
            volume: "Об'єм",
            country: 'Країна',
            shipping_desc: 'Безкоштовна доставка від ₴1000',
            views: 'переглядів',
            related: 'Вам може сподобатись'
        },
        cart: {
            title: 'Ваш Кошик',
            empty: 'Кошик порожній',
            start_shopping: 'Почати покупки',
            subtotal: 'Сума',
            shipping: 'Доставка',
            total: 'Разом',
            checkout: 'Оформити замовлення'
        },
        checkout: {
            title: 'Оформлення',
            step_shipping: 'Доставка',
            step_payment: 'Оплата',
            full_name: 'ПІБ',
            address: 'Адреса',
            city: 'Місто',
            zip: 'Індекс',
            card_number: 'Номер картки',
            expiry: 'Термін дії',
            cvv: 'CVV',
            place_order: 'Замовити',
            success_title: 'Замовлення прийнято!',
            success_msg: 'Дякуємо за покупку. Ваше замовлення #12345 підтверджено.',
            back_home: 'На головну'
        },
        footer: {
            brand_desc: 'Стійкі косметичні продукти для кращого світу. 100% Органічно, Етично та Прозоро.',
            shop: 'Магазин',
            support: 'Підтримка',
            newsletter_title: 'Будьте в курсі',
            newsletter_desc: 'Приєднуйтесь до нашої розсилки для ексклюзивних пропозицій.',
            subscribe: 'Підписатись',
            email_placeholder: 'Ваш email',
            all_products: 'Всі Продукти',
            privacy: 'Політика Конфіденційності',
            terms: 'Умови',
            cookies: 'Cookies',
            rights: 'Всі права захищено.'
        },
        auth: {
            login_title: 'З поверненням',
            register_title: 'Створити акаунт',
            email: 'Email',
            password: 'Пароль',
            name: 'Ім\'я',
            phone: 'Телефон',
            submit_login: 'Увійти',
            submit_register: 'Реєстрація',
            no_account: "Немає акаунту?",
            has_account: "Вже є акаунт?",
            your_number: "ваш номер"
        },
        profile: {
            title: 'Мій Профіль',
            welcome: 'Вітаємо',
            member_since: 'Клієнт з 2025',
            tab_orders: 'Мої замовлення',
            tab_settings: 'Налаштування',
            Tab_logout: 'Вийти',
            orders_title: 'Історія замовлень',
            settings_title: 'Налаштування акаунту',
            personal_info: 'Особиста інформація',
            preferences: 'Вподобання',
            subscribe: 'Підписатися на новини',
            please_login: 'Будь ласка, увійдіть, щоб переглянути профіль.',
            items: 'Товарів',
            status_delivered: 'Доставлено',
            status_transit: 'В дорозі'
        }
    },
    ru: {
        nav: { brand: 'EcoShop', home: 'Главная', shop: 'Магазин', about: 'О нас', cart: 'Корзина', login: 'Вход', register: 'Регистрация', dashboard: 'Кабинет', profile: 'Профиль', logout: 'Выход' },
        hero: {
            badge: 'Новая Коллекция 2025',
            title: "Лучшее от природы,\nСоздано для вас",
            subtitle: 'Откройте будущее чистой красоты. 100% органично, этично и научно доказано для омоложения вашей кожи.',
            shop_all: 'В магазин',
            our_story: 'О нас'
        },
        about: {
            title: 'Наша История',
            subtitle: 'Основанная в 2016 году, EcoDeviva начала свою деятельность с простой миссии: сделать чистую, органическую красоту доступною для каждого.',
            history_title: 'Наш Путь',
            history_text: 'То, что начиналось как маленький местный магазинчик в 2016 году, превратилось в надежный бренд, любимый тысячами. На протяжении лет мы оставались верны своим корням — использовать только лучшие органические ингредиенты и гарантировать, что каждый продукт создан с заботой и уважением к природе. От наших скромных начал до новой коллекции 2025 года, наша преданность качеству и устойчивому развитию остается неизменной.',
            values_title: 'Наши Ценности',
            value_1: 'Устойчивое Развитие',
            value_2: 'Этичное Производство',
            value_3: 'Любовь к Клиентам'
        },
        blog: {
            article_1: '5 мифов о коллагене',
            article_1_excerpt: 'Коллаген важен для эластичности, но существует много мифов о том, как он работает...',
            article_2: 'Как выбрать БАДы',
            article_2_excerpt: 'Мир добавок может быть сложным. Вот наш экспертный гид по поддержке иммунитета...',
            article_3: 'Весенняя схема ухода',
            article_3_excerpt: 'Переход на весенний уход за кожей решающий для поддержания здорового сияния...'
        },

        features: {
            organic: '100% Органика',
            organic_desc: 'Сертифицированные ингредиенты',
            cruelty: 'Без жестокости',
            cruelty_desc: 'Не тестируется на животных',
            carbon: 'Углеродно-нейтрально',
            carbon_desc: 'Эко-доставка',
            payment: 'Быстрая оплата',
            payment_desc: 'Безопасные платежи'
        },
        home: {
            categories: 'Категории',
            see_all: 'Все',
            hits: 'Хиты Продаж',
            history_title: 'Наш Путь',
            history_text: 'То, что начиналось как маленький местный магазинчик...',
            blog_title: 'Советы Экспертов'
        },
        shop: {
            title: 'Каталог',
            filters: 'Фильтры',
            price_range: 'Цена',
            categories: 'Категории',
            sort_newest: 'Сначала новые',
            sort_price_low: 'От дешевых',
            sort_price_high: 'От дорогих',
            search_placeholder: 'Поиск товаров...',
            filter_skin: 'Тип Кожи',
            filter_ingredients: 'Ингредиенты',
            skin_dry: 'Сухая',
            skin_oily: 'Жирная',
            skin_combo: 'Комбинированная',
            skin_normal: 'Нормальная',
            ing_collagen: 'Коллаген',
            ing_hyaluronic: 'Гиалуроновая к-та',
            ing_vitc: 'Витамин С',
            results_for: 'Результаты для'
        },
        product: {
            back: 'Назад',
            add_to_cart: 'В корзину',
            description: 'Описание',
            ingredients: 'Ингредиенты',
            shipping: 'Доставка',
            specs_title: 'Характеристики',
            volume: 'Объем',
            country: 'Страна',
            shipping_desc: 'Бесплатная доставка от ₴1000',
            views: 'просмотров',
            related: 'Вам может понравиться'
        },
        cart: {
            title: 'Ваша Корзина',
            empty: 'Корзина пуста',
            start_shopping: 'Начать покупки',
            subtotal: 'Сумма',
            shipping: 'Доставка',
            total: 'Итого',
            checkout: 'Оформить заказ'
        },
        checkout: {
            title: 'Оформление',
            step_shipping: 'Доставка',
            step_payment: 'Оплата',
            full_name: 'ФИО',
            address: 'Адрес',
            city: 'Город',
            zip: 'Индекс',
            card_number: 'Номер карты',
            expiry: 'Срок действия',
            cvv: 'CVV',
            place_order: 'Заказать',
            success_title: 'Заказ принят!',
            success_msg: 'Спасибо за покупку. Ваш заказ #12345 подтвержден.',
            back_home: 'На главную'
        },
        footer: {
            brand_desc: 'Устойчивые косметические продукты для лучшего мира. 100% Органично, Этично и Прозрачно.',
            shop: 'Магазин',
            support: 'Поддержка',
            newsletter_title: 'Будьте в курсе',
            newsletter_desc: 'Присоединяйтесь к нашей рассылке для эксклюзивных предложений.',
            subscribe: 'Подписаться',
            email_placeholder: 'Ваш email',
            all_products: 'Все Продукты',
            privacy: 'Политика Конфиденциальности',
            terms: 'Условия',
            cookies: 'Cookies',
            rights: 'Все права защищены.'
        },
        auth: {
            login_title: 'С возвращением',
            register_title: 'Создать аккаунт',
            email: 'Email',
            password: 'Пароль',
            name: 'Имя',
            phone: 'Телефон',
            submit_login: 'Войти',
            submit_register: 'Регистрация',
            no_account: "Нет аккаунта?",
            has_account: "Уже есть аккаунт?",
            your_number: "ваш номер"
        },
        profile: {
            title: 'Мой Профиль',
            welcome: 'Добро пожаловать',
            member_since: 'Клиент с 2025',
            tab_orders: 'Мои заказы',
            tab_settings: 'Настройки',
            Tab_logout: 'Выйти',
            orders_title: 'История заказов',
            settings_title: 'Настройки аккаунта',
            personal_info: 'Личная информация',
            preferences: 'Предпочтения',
            subscribe: 'Подписаться на новости',
            please_login: 'Пожалуйста, войдите, чтобы просмотреть профиль.',
            items: 'Товаров',
            status_delivered: 'Доставлено',
            status_transit: 'В пути'
        }
    }
};

export function LanguageProvider({ children }) {
    // Load language from localStorage or default to 'en'
    const [language, setLanguage] = useState(() => {
        try {
            const saved = localStorage.getItem('language');
            return saved || 'en';
        } catch (e) {
            console.error('Failed to load language from localStorage', e);
            return 'en';
        }
    });

    // Save language to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('language', language);
        } catch (e) {
            console.error('Failed to save language to localStorage', e);
        }
    }, [language]);

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];
        for (let k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
