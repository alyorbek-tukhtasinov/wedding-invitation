import React, { createContext, useContext, useState } from 'react';

export type Lang = 'uz' | 'ru';

export const translations = {
  uz: {
    langOther: 'RU',
    envelopeInvite: "Taklifnoma",
    envelopeHint: "Ochish uchun suring",
    heroBride: 'Zarifa',
    heroGroom: 'Sardorbek',
    heroAnd: '&',
    heroSubtitle: "To'yimizga taklif etamiz",
    heroDate: '3–4 Oktabr 2026',
    scrollHint: "Pastga suring",

    invTitle: "Hurmatli va aziz mehmon!",
    invText: "Sizni hayotimizdagi eng quvonchli ayyom — nikoh to'yimizga lutfan taklif etamiz. Ushbu baxtli va unutilmas kunimizda sizdek aziz insonlarni yonimizda ko'rish biz uchun ulkan baxt. Tashrifingiz bilan davramizga fayz, quvonchimizga quvonch qo'shasiz degan umiddamiz.",
    invClosing: "Sardorbek & Zarifa",

    detailsTitle: "To'y tafsilotlari",
    detailsDateLabel: "Sana",
    detailsTimeLabel: "Vaqt",
    detailsVenueLabel: "Manzil",
    detailsVenueVal: "«20 yillik» to'yxonasi",
    detailsAddress: "Chortoq, Mustaqillikning 20 yilligi ko'chasi",

    // Ikki tadbir
    event1Name: "Qiz bazmi",
    event1Date: "3-oktabr 2026",
    event1Time: "10:00",
    event2Name: "Nikoh to'yi",
    event2Date: "4-oktabr 2026",
    event2Time: "11:00",

    countdownTitle: "To'yga qadar",
    countdownDays: "Kun",
    countdownHours: "Soat",
    countdownMins: "Daqiqa",
    countdownSecs: "Soniya",
    countdownStarted: "Muborak bo'lsin!",

    mapTitle: "Manzil",
    mapVenue: "«20 yillik» to'yxonasi",
    mapAddress: "Chortoq, Mustaqillikning 20 yilligi ko'chasi",
    mapOpen: "Xaritada ko'rish",
    mapOpenYandex: "Yandex xarita",

    giftTitle: "Sovg'a",
    giftSubtitle: "Muborakbod uchun",
    giftCardLabel: "Karta raqami",
    giftHolder: "To'xtasinov Doniyorbek",
    giftBank: "Uzcard",
    giftCopy: "Nusxa olish",
    giftCopied: "Nusxalandi ✓",
    giftNote: "Tabrikingiz uchun raxmat!",

    musicPlaying: "Musiqa ijro etilmoqda",
    musicTap: "Musiqani yoqish uchun bosing",
  },
  ru: {
    langOther: 'UZ',
    envelopeInvite: "Приглашение",
    envelopeHint: "Проведите, чтобы открыть",
    heroBride: 'Зарифа',
    heroGroom: 'Сардорбек',
    heroAnd: '&',
    heroSubtitle: "Приглашаем вас на нашу свадьбу",
    heroDate: '3–4 октября 2026',
    scrollHint: "Листайте вниз",

    invTitle: "Уважаемый и дорогой гость!",
    invText: "От всей души приглашаем вас на самое радостное событие в нашей жизни — нашу свадьбу. Для нас огромное счастье видеть таких дорогих сердцу людей рядом в этот незабываемый день. Надеемся, что своим присутствием вы украсите наш праздник и разделите нашу радость.",
    invClosing: "Сардорбек & Зарифа",

    detailsTitle: "Детали торжества",
    detailsDateLabel: "Дата",
    detailsTimeLabel: "Время",
    detailsVenueLabel: "Место",
    detailsVenueVal: "«20 yillik» to'yxonasi",
    detailsAddress: "Чартак, ул. 20-летия Независимости",

    // Два события
    event1Name: "Девичник (Qiz bazmi)",
    event1Date: "3 октября 2026",
    event1Time: "10:00",
    event2Name: "Свадьба (Nikoh to'yi)",
    event2Date: "4 октября 2026",
    event2Time: "11:00",

    countdownTitle: "До торжества",
    countdownDays: "Дней",
    countdownHours: "Часов",
    countdownMins: "Минут",
    countdownSecs: "Секунд",
    countdownStarted: "Поздравляем!",

    mapTitle: "Место проведения",
    mapVenue: "«20 yillik» to'yxonasi",
    mapAddress: "Чартак, ул. 20-летия Независимости",
    mapOpen: "Google Maps",
    mapOpenYandex: "Яндекс Карты",

    giftTitle: "Подарок",
    giftSubtitle: "Для поздравления",
    giftCardLabel: "Номер карты",
    giftHolder: "Тўхтасинов Дониёрбек",
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
