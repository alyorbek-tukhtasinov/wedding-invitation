import React, { createContext, useContext, useState } from 'react';

export type Lang = 'uz' | 'ru';

export const translations = {
  uz: {
    langOther: 'RU',
    heroBride: 'Muhlisa',
    heroGroom: 'Umarxo\'ja',
    heroAnd: '&',
    heroSubtitle: "To'yimizga taklif etamiz",
    heroDate: '17 May 2026',
    scrollHint: "Pastga suring",

    invTitle: "Hurmatli va aziz mehmon!",
    invText: "Sizni hayotimizdagi eng quvonchli ayyom — nikoh to'yimizga lutfan taklif etamiz. Ushbu baxtli va unutilmas kunimizda sizdek aziz insonlarni yonimizda ko'rish biz uchun ulkan baxt. Tashrifingiz bilan davramizga fayz, quvonchimizga quvonch qo'shasiz degan umiddamiz.",
    invClosing: "Umarxo\'ja & Muhlisa",

    detailsTitle: "To'y tafsilotlari",
    detailsDateLabel: "Sana",
    detailsDateVal: "17 May 2026",
    detailsTimeLabel: "Vaqt",
    detailsTimeVal: "16:00",
    detailsVenueLabel: "Manzil",
    detailsVenueVal: "Olimxoji to'yxonasi",
    detailsAddress: "Oltiariq tumani, Zilxa shaharchasi",

    countdownTitle: "To'yga qadar",
    countdownDays: "Kun",
    countdownHours: "Soat",
    countdownMins: "Daqiqa",
    countdownSecs: "Soniya",

    mapTitle: "Manzil",
    mapVenue: "Olimxoji to'yxonasi",
    mapAddress: "Oltiariq tumani, Zilxa shaharchasi",
    mapOpen: "Xaritada ko'rish",
    mapOpenYandex: "Yandex xarita",

    giftTitle: "Sovg'a",
    giftSubtitle: "Muborakbod uchun",
    giftCardLabel: "Karta raqami",
    giftHolder: "NAZIROV UMARXO\'JA",
    giftBank: "Uzcard",
    giftCopy: "Nusxa olish",
    giftCopied: "Nusxalandi ✓",
    giftNote: "Tabrikingiz uchun raxmat!",

    musicPlaying: "Musiqa ijro etilmoqda",
    musicTap: "Musiqani yoqish uchun bosing",
  },
  ru: {
    langOther: 'UZ',
    heroBride: 'Мухлиса',
    heroGroom: 'Умархужа',
    heroAnd: '&',
    heroSubtitle: "Приглашаем вас на нашу свадьбу",
    heroDate: '17 Мая 2026',
    scrollHint: "Листайте вниз",

    invTitle: "Дорогой гость,",
    invText: "С радостью и любовью в сердце мы приглашаем вас разделить с нами этот счастливый и незабываемый день. Ваше присутствие сделает наш праздник по-настоящему особенным и памятным.",
    invClosing: "Умархужа & Мухлиса",

    detailsTitle: "Детали торжества",
    detailsDateLabel: "Дата",
    detailsDateVal: "17 Мая 2026",
    detailsTimeLabel: "Время",
    detailsTimeVal: "16:00",
    detailsVenueLabel: "Место",
    detailsVenueVal: "Olimxoji to'yxonasi",
    detailsAddress: "Олтиарыкский район, пос. Зилха",

    countdownTitle: "До свадьбы",
    countdownDays: "Дней",
    countdownHours: "Часов",
    countdownMins: "Минут",
    countdownSecs: "Секунд",

    mapTitle: "Место проведения",
    mapVenue: "Olimxoji to'yxonasi",
    mapAddress: "Олтиарыкский район, пос. Зилха",
    mapOpen: "Google Maps",
    mapOpenYandex: "Яндекс Карты",

    giftTitle: "Подарок",
    giftSubtitle: "Для поздравления",
    giftCardLabel: "Номер карты",
    giftHolder: "NAZIROV UMARXO\'JA",
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