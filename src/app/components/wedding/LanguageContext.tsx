import React, { createContext, useContext, useState } from 'react';

export type Lang = 'uz' | 'ru';

export const translations = {
  uz: {
    langOther: 'RU',
    heroBride: 'Nilufar',
    heroGroom: 'Jasur',
    heroAnd: '&',
    heroSubtitle: "To'yimizga taklif etamiz",
    heroDate: '23 May 2026',
    scrollHint: "Pastga suring",

    invTitle: "Aziz mehmon,",
    invText: "Sizni bizning to'y marosimimizga samimiy qalbdan taklif etishdan mamnunmiz. Bu baxtli va unutilmas kunni siz bilan birga nishonlash bizga juda muhim. Tashrif buyuring va quvonchimizni biz bilan baham ko'ring.",
    invClosing: "Jasur & Nilufar",

    detailsTitle: "To'y tafsilotlari",
    detailsDateLabel: "Sana",
    detailsDateVal: "23 May 2026",
    detailsTimeLabel: "Vaqt",
    detailsTimeVal: "18:00",
    detailsVenueLabel: "Manzil",
    detailsVenueVal: "Guliston Banquet Hall",
    detailsAddress: "Yunusobod tumani, Toshkent",

    countdownTitle: "To'yga qadar",
    countdownDays: "Kun",
    countdownHours: "Soat",
    countdownMins: "Daqiqa",
    countdownSecs: "Soniya",

    mapTitle: "Manzil",
    mapVenue: "Guliston Banquet Hall",
    mapAddress: "Yunusobod tumani, Toshkent shahri",
    mapOpen: "Xaritada ko'rish",
    mapOpenYandex: "Yandex xarita",

    giftTitle: "Sovg'a",
    giftSubtitle: "Muborakbod uchun",
    giftCardLabel: "Karta raqami",
    giftHolder: "KARIMOV JASUR",
    giftBank: "Uzcard",
    giftCopy: "Nusxa olish",
    giftCopied: "Nusxalandi ✓",
    giftNote: "Tabrikingiz uchun raxmat!",

    musicPlaying: "Musiqa ijro etilmoqda",
    musicTap: "Musiqani yoqish uchun bosing",
  },
  ru: {
    langOther: 'UZ',
    heroBride: 'Нилуфар',
    heroGroom: 'Жасур',
    heroAnd: '&',
    heroSubtitle: "Приглашаем вас на нашу свадьбу",
    heroDate: '23 Мая 2026',
    scrollHint: "Листайте вниз",

    invTitle: "Дорогой гость,",
    invText: "С радостью и любовью в сердце мы приглашаем вас разделить с нами этот счастливый и незабываемый день. Ваше присутствие сделает наш праздник по-настоящему особенным и памятным.",
    invClosing: "Жасур & Нилуфар",

    detailsTitle: "Детали торжества",
    detailsDateLabel: "Дата",
    detailsDateVal: "23 Мая 2026",
    detailsTimeLabel: "Время",
    detailsTimeVal: "18:00",
    detailsVenueLabel: "Место",
    detailsVenueVal: "Guliston Banquet Hall",
    detailsAddress: "Юнусабадский район, Ташкент",

    countdownTitle: "До свадьбы",
    countdownDays: "Дней",
    countdownHours: "Часов",
    countdownMins: "Минут",
    countdownSecs: "Секунд",

    mapTitle: "Место проведения",
    mapVenue: "Guliston Banquet Hall",
    mapAddress: "Юнусабадский район, г. Ташкент",
    mapOpen: "Google Maps",
    mapOpenYandex: "Яндекс Карты",

    giftTitle: "Подарок",
    giftSubtitle: "Для поздравления",
    giftCardLabel: "Номер карты",
    giftHolder: "KARIMOV JASUR",
    giftBank: "Uzcard",
    giftCopy: "Скопировать",
    giftCopied: "Скопировано ✓",
    giftNote: "Благодарим за поздравление!",

    musicPlaying: "Музыка играет",
    musicTap: "Нажмите для воспроизведения",
  },
};

export type T = typeof translations['uz'];

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: T;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'uz',
  setLang: () => {},
  t: translations.uz,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('uz');
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};
