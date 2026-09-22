import React, { createContext, useContext, useState } from 'react';
import { weddingConfig, type WeddingContent } from '../../config/weddingConfig';

export type Lang = 'uz' | 'ru';

// Barcha mijozlar uchun bir xil bo'lgan interfeys matnlari (tugmalar, birliklar,
// yo'l-yo'riqlar). Mijozga xos matnlar bu yerda EMAS — ular weddingConfig.ts da.
export const uiStrings = {
  uz: {
    langOther: 'RU',
    envelopeInvite: "Taklifnoma",
    envelopeHint: "Ochish uchun suring",
    scrollHint: "Pastga suring",

    detailsTitle: "To'y tafsilotlari",
    detailsDateLabel: "Sana",
    detailsTimeLabel: "Vaqt",
    detailsVenueLabel: "Manzil",

    countdownTitle: "To'yga qadar",
    countdownDays: "Kun",
    countdownHours: "Soat",
    countdownMins: "Daqiqa",
    countdownSecs: "Soniya",
    countdownStarted: "Muborak bo'lsin!",

    mapTitle: "Manzil",
    mapOpen: "Xaritada ko'rish",
    mapOpenYandex: "Yandex xarita",

    giftTitle: "Sovg'a",
    giftSubtitle: "Muborakbod uchun",
    giftCardLabel: "Karta raqami",
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
    scrollHint: "Листайте вниз",

    detailsTitle: "Детали торжества",
    detailsDateLabel: "Дата",
    detailsTimeLabel: "Время",
    detailsVenueLabel: "Место",

    countdownTitle: "До торжества",
    countdownDays: "Дней",
    countdownHours: "Часов",
    countdownMins: "Минут",
    countdownSecs: "Секунд",
    countdownStarted: "Поздравляем!",

    mapTitle: "Место проведения",
    mapOpen: "Google Maps",
    mapOpenYandex: "Яндекс Карты",

    giftTitle: "Подарок",
    giftSubtitle: "Для поздравления",
    giftCardLabel: "Номер карты",
    giftCopy: "Скопировать",
    giftCopied: "Скопировано ✓",
    giftNote: "Благодарим за поздравление!",

    musicPlaying: "Музыка играет",
    musicTap: "Нажмите для воспроизведения",
  },
};

// Yakuniy tarjima obyekti = interfeys matnlari + mijoz kontenti (config'dan).
export type T = typeof uiStrings['uz'] & WeddingContent;

function buildTranslations(lang: Lang): T {
  return { ...uiStrings[lang], ...weddingConfig.content[lang] };
}

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: T;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'uz',
  setLang: () => {},
  t: buildTranslations('uz'),
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('uz');
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: buildTranslations(lang) }}>
      {children}
    </LanguageContext.Provider>
  );
};
