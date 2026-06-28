import React, { createContext, useContext, useState } from 'react';

export type Lang = 'uz' | 'ru';

export const translations = {
  uz: {
    langOther: 'RU',
    heroBride: 'Zuhraxon',
    heroGroom: 'Shohzamon',
    heroAnd: '&',
    heroSubtitle: "To'yimizga taklif etamiz",
    heroDate: '05 Iyul 2026',
    scrollHint: "Pastga suring",

    invTitle: "Hurmatli va aziz mehmon!",
    invText: "Sizni hayotimizdagi eng quvonchli ayyom — nikoh to'yimizga lutfan taklif etamiz. Ushbu baxtli va unutilmas kunimizda sizdek aziz insonlarni yonimizda ko'rish biz uchun ulkan baxt. Tashrifingiz bilan davramizga fayz, quvonchimizga quvonch qo'shasiz degan umiddamiz.",
    invClosing: "Shohzamon & Zuhraxon",

    detailsTitle: "To'y tafsilotlari",
    detailsDateLabel: "Sana",
    detailsDateVal: "05 Iyul 2026",
    detailsTimeLabel: "Vaqt",
    detailsTimeVal: "18:00",
    detailsVenueLabel: "Manzil",
    detailsVenueVal: "Versal to'yxonasi",
    detailsAddress: "O'zbekiston tumani, Ziyo-Nursux MFY",

    countdownTitle: "To'yga qadar",
    countdownDays: "Kun",
    countdownHours: "Soat",
    countdownMins: "Daqiqa",
    countdownSecs: "Soniya",

    mapTitle: "Manzil",
    mapVenue: "Versal to'yxonasi",
    mapAddress: "O'zbekiston tumani, Ziyo-Nursux MFY",
    mapOpen: "Xaritada ko'rish",
    mapOpenYandex: "Yandex xarita",

    giftTitle: "Sovg'a",
    giftSubtitle: "Muborakbod uchun",
    giftCardLabel: "Karta raqami",
    giftHolder: "BAHODIRJONOV SHOHZAMON",
    giftBank: "Humo",
    giftCopy: "Nusxa olish",
    giftCopied: "Nusxalandi ✓",
    giftNote: "Tabrikingiz uchun raxmat!",

    musicPlaying: "Musiqa ijro etilmoqda",
    musicTap: "Musiqani yoqish uchun bosing",
  },
  ru: {
    langOther: 'UZ',
    heroBride: 'Зуҳрахон',
    heroGroom: 'Шоҳзамон',
    heroAnd: '&',
    heroSubtitle: "Приглашаем вас на нашу свадьбу",
    heroDate: '05 Июля 2026',
    scrollHint: "Листайте вниз",

    invTitle: "Уважаемый и дорогой гость!",
    invText: "От всей души приглашаем вас на самое радостное событие в нашей жизни — нашу свадьбу. Для нас огромное счастье видеть таких дорогих сердцу людей рядом в этот незабываемый день. Надеемся, что своим присутствием вы украсите наш праздник и разделите нашу радость.",
    invClosing: "Шоҳзамон & Зуҳрахон",

    detailsTitle: "Детали торжества",
    detailsDateLabel: "Дата",
    detailsDateVal: "05 Июля 2026",
    detailsTimeLabel: "Время",
    detailsTimeVal: "18:00",
    detailsVenueLabel: "Место",
    detailsVenueVal: "Versal to'yxonasi",
    detailsAddress: "Ўзбекистон тумани, Зиё-Нурсух МФЙ",

    countdownTitle: "До свадьбы",
    countdownDays: "Дней",
    countdownHours: "Часов",
    countdownMins: "Минут",
    countdownSecs: "Секунд",

    mapTitle: "Место проведения",
    mapVenue: "Versal to'yxonasi",
    mapAddress: "Ўзбекистон тумани, Зиё-Нурсух МФЙ",
    mapOpen: "Google Maps",
    mapOpenYandex: "Яндекс Карты",

    giftTitle: "Подарок",
    giftSubtitle: "Для поздравления",
    giftCardLabel: "Номер карты",
    giftHolder: "Баҳодиржонов Шоҳзамон",
    giftBank: "Humo",
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