// ============================================================================
//  TO'Y TAKLIFNOMASI — MIJOZ SOZLAMALARI (yagona tahrirlanadigan fayl)
// ----------------------------------------------------------------------------
//  Yangi mijoz uchun sayt qilish: shu faylni tahrirlang + public/ ичidagi
//  rasmlarni (wedding1..6.jpg) almashtiring. Boshqa hech qanday kodga
//  tegish shart emas. To'liq qo'llanma: CLIENT_GUIDE.md faylida.
// ============================================================================

export interface WeddingContent {
  // Bosh sahifa (Hero)
  heroGroom: string;      // Kuyov ismi
  heroBride: string;      // Kelin ismi
  heroAnd: string;        // Ismlar orasidagi belgi (odatda "&")
  heroSubtitle: string;   // Kichik izoh
  heroDate: string;       // Sana yozuvi (masalan "3–4 Oktabr 2026")

  // Taklifnoma matni
  invTitle: string;
  invText: string;
  invClosing: string;     // Imzo (odatda "Kuyov & Kelin")

  // Ikki tadbir (tafsilotlar + countdown)
  event1Name: string;     // 1-tadbir nomi (masalan "Qiz bazmi")
  event1Date: string;     // Ko'rinadigan sana
  event1Time: string;     // Ko'rinadigan vaqt
  event2Name: string;     // 2-tadbir nomi (masalan "Nikoh to'yi")
  event2Date: string;
  event2Time: string;

  // To'yxona / manzil
  detailsVenueVal: string;  // To'yxona nomi
  detailsAddress: string;   // Manzil (ko'cha/tuman)
  mapVenue: string;         // Xarita bo'limidagi to'yxona nomi
  mapAddress: string;       // Xarita bo'limidagi manzil

  // Sovg'a (agar yoqilgan bo'lsa)
  giftHolder: string;       // Karta egasi
  giftBank: string;         // Bank / to'lov tizimi nomi
}

// Bir nechta to'yxona bo'lsa (masalan qiz bazmi va nikoh alohida joyda),
// har bir to'yxona uchun shu obyekt ishlatiladi. `venues` bo'sh yoki
// yo'q bo'lsa — sayt eski (bitta to'yxona) ko'rinishida ishlaydi.
export interface VenueInfo {
  label: { uz: string; ru: string };    // Sarlavha — qaysi tadbir (masalan "Qiz bazmi")
  name: { uz: string; ru: string };     // To'yxona nomi
  address: { uz: string; ru: string };  // Manzil
  embed: string;                          // Yandex map-widget iframe src
  yandexLink: string;                     // Yandex Maps havolasi
  googleLink: string;                     // Google Maps havolasi
}

export interface WeddingConfig {
  // Brauzer sahifa nomi (tab)
  siteTitle: string;
  // Konvert muhridagi monogramma (masalan "S&Z")
  monogram: string;

  // Bir nechta to'yxona (ixtiyoriy). Bo'lsa — xarita bo'limi har bir
  // to'yxonani bitta sahifada ko'rsatadi, tafsilotlarda esa har tadbir
  // ostida o'z to'yxonasi yoziladi. Yo'q bo'lsa — pastdagi bitta `map`
  // va content.mapVenue/mapAddress ishlatiladi.
  venues?: VenueInfo[];

  // Countdown uchun ANIQ sana-vaqt (ISO format: YYYY-MM-DDTHH:mm:ss)
  countdown: {
    event1: string;  // 1-tadbir (qiz bazmi)
    event2: string;  // 2-tadbir (nikoh to'yi)
  };

  // Xarita havolalari
  map: {
    embed: string;        // Yandex map-widget iframe src
    yandexLink: string;   // Yandex Maps'da ochish havolasi
    googleLink: string;   // Google Maps'da ochish havolasi
  };

  // Sovg'a (karta) bo'limi
  gift: {
    enabled: boolean;       // true = bo'lim ko'rinadi, false = yashirin
    cardNumber: string;     // Ko'rinadigan format: "1234 5678 9012 3456"
    cardNumberRaw: string;  // Nusxa olinadigan raqam (probelsiz)
    validity: string;       // Amal qilish muddati (masalan "09/30")
  };

  // Ikki tildagi mijoz matnlari
  content: {
    uz: WeddingContent;
    ru: WeddingContent;
  };
}

export const weddingConfig: WeddingConfig = {
  siteTitle: "Sardorbek & Zarifa — To'y taklifnomasi",
  monogram: 'S&Z',

  countdown: {
    event1: '2026-10-03T10:00:00',
    event2: '2026-10-04T11:00:00',
  },

  map: {
    embed:
      'https://yandex.uz/map-widget/v1/?ll=71.837887%2C41.080877&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgo1NTU5MDg4NzQxEk5Pyrt6YmVraXN0b24sIE5hbWFuZ2FuIHZpbG95YXRpLCBDaG9ydG9xLCBNdXN0YXFpbGxpa25pbmcgMjAgeWlsbGlnaSBrb8q7Y2hhc2kiCg0ArY9CFc5SJEI%2C&z=18',
    yandexLink: 'https://yandex.uz/maps/-/CXERnN1q',
    googleLink: 'https://www.google.com/maps/search/?api=1&query=41.080877%2C71.837887',
  },

  gift: {
    enabled: false,
    cardNumber: '5614 6820 9046 8861',
    cardNumberRaw: '5614682090468861',
    validity: '09/30',
  },

  content: {
    uz: {
      heroGroom: 'Sardorbek',
      heroBride: 'Zarifa',
      heroAnd: '&',
      heroSubtitle: "To'yimizga taklif etamiz",
      heroDate: '3–4 Oktabr 2026',

      invTitle: "Hurmatli va aziz mehmon!",
      invText:
        "Sizni hayotimizdagi eng quvonchli ayyom — nikoh to'yimizga lutfan taklif etamiz. Ushbu baxtli va unutilmas kunimizda sizdek aziz insonlarni yonimizda ko'rish biz uchun ulkan baxt. Tashrifingiz bilan davramizga fayz, quvonchimizga quvonch qo'shasiz degan umiddamiz.",
      invClosing: "Sardorbek & Zarifa",

      event1Name: "Qiz bazmi",
      event1Date: "3-oktabr 2026",
      event1Time: "10:00",
      event2Name: "Nikoh to'yi",
      event2Date: "4-oktabr 2026",
      event2Time: "11:00",

      detailsVenueVal: "«20 yillik» to'yxonasi",
      detailsAddress: "Chortoq, Mustaqillikning 20 yilligi ko'chasi",
      mapVenue: "«20 yillik» to'yxonasi",
      mapAddress: "Chortoq, Mustaqillikning 20 yilligi ko'chasi",

      giftHolder: "To'xtasinov Doniyorbek",
      giftBank: "Uzcard",
    },
    ru: {
      heroGroom: 'Сардорбек',
      heroBride: 'Зарифа',
      heroAnd: '&',
      heroSubtitle: "Приглашаем вас на нашу свадьбу",
      heroDate: '3–4 октября 2026',

      invTitle: "Уважаемый и дорогой гость!",
      invText:
        "От всей души приглашаем вас на самое радостное событие в нашей жизни — нашу свадьбу. Для нас огромное счастье видеть таких дорогих сердцу людей рядом в этот незабываемый день. Надеемся, что своим присутствием вы украсите наш праздник и разделите нашу радость.",
      invClosing: "Сардорбек & Зарифа",

      event1Name: "Девичник (Qiz bazmi)",
      event1Date: "3 октября 2026",
      event1Time: "10:00",
      event2Name: "Свадьба (Nikoh to'yi)",
      event2Date: "4 октября 2026",
      event2Time: "11:00",

      detailsVenueVal: "«20 yillik» to'yxonasi",
      detailsAddress: "Чартак, ул. 20-летия Независимости",
      mapVenue: "«20 yillik» to'yxonasi",
      mapAddress: "Чартак, ул. 20-летия Независимости",

      giftHolder: "Тўхтасинов Дониёрбек",
      giftBank: "Uzcard",
    },
  },
};
