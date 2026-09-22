# Yangi mijoz uchun sayt qilish qo'llanmasi

Bu loyiha **shablon** sifatida ishlaydi. Har bir yangi mijoz (yangi to'y sayti)
uchun kod yozish shart emas — faqat **bitta config fayl** va **rasmlarни**
almashtirasiz, so'ng alohida Vercel loyihasi qilib joylaysiz.

Har bir mijoz **alohida repo + alohida Vercel loyiha** bo'ladi. Shu tufayli
bir mijoz sayti boshqasiga umuman ta'sir qilmaydi.

---

## 1-qadam — Repodan nusxa olish

GitHub'da shu reponi yangi mijoz uchun nusxa qiling. Ikki usul:

**A) Template sifatida (tavsiya):**
1. GitHub'da shu repo → **Settings → General → "Template repository"** ni yoqing.
2. Keyin har safar repo sahifasida **"Use this template" → "Create a new repository"**.
   Yangi nom bering, masalan `wedding-ali-vali`.

**B) Oddiy nusxa:** yangi bo'sh repo ochib, shu loyiha fayllarini o'sha repoga
push qiling.

> Hozirgi ishlaydigan sayt (Sardorbek & Zarifa) o'zining reposida qoladi va
> tegilmaydi.

---

## 2-qadam — `src/app/config/weddingConfig.ts` faylini tahrirlash

Bu **yagona** tahrirlanadigan fayl. Ичida hamma narsa izohlab qo'yilgan.
Quyidagilarni yangi mijoz ma'lumotiga o'zgartiring:

| Maydon | Nima |
|---|---|
| `siteTitle` | Brauzer tab nomi (masalan `"Ali & Vali — To'y taklifnomasi"`) |
| `monogram` | Konvert muhridagi harflar (masalan `"A&V"`) |
| `countdown.event1` / `event2` | Countdown uchun ANIQ sana-vaqt: `YYYY-MM-DDTHH:mm:ss` |
| `map.embed` | Yandex xarita iframe manzili (3-qadamga qarang) |
| `map.yandexLink` / `googleLink` | Xaritada ochish havolalari |
| `gift.enabled` | `true` = sovg'a/karta bo'limi ko'rinadi, `false` = yashirin |
| `gift.cardNumber` / `cardNumberRaw` / `validity` | Karta ma'lumoti |
| `content.uz` va `content.ru` | Ismlar, sana yozuvi, taklifnoma matni, tadbir nomlari, to'yxona, manzil, karta egasi — o'zbek va rus tillarida |

> **Muhim:** `countdown.event1/event2` — bu countdown sanoq uchun ANIQ vaqt.
> `content.uz.event1Date` esa ekranда ko'rinadigan yozuv. Ikkalasini ham
> mos qilib yozing.

---

## 3-qadam — Xarita havolalarini olish

1. [yandex.uz/maps](https://yandex.uz/maps) da to'yxona manzilini toping.
2. Nuqtani belgilab, **"Поделиться / Ulashish" → "Встроить карту / Xaritani
   joylash"** bo'limidan `<iframe src="...">` ичidagi **src** havolasini
   nusxalab, `map.embed` ga qo'ying.
3. Xuddi shu sahifadagi qisqa havolani (`https://yandex.uz/maps/-/...`)
   `map.yandexLink` ga qo'ying.
4. `map.googleLink` — koordinatalar bilan:
   `https://www.google.com/maps/search/?api=1&query=KENGLIK,UZUNLIK`

---

## 4-qadam — Rasmlarni almashtirish (`public/` papka)

Fayl nomlari **aynan shunday** bo'lishi kerak (kod shu nomlarga bog'langan):

| Fayl | Qayerda ishlatiladi | Tavsiya format |
|---|---|---|
| `wedding1.jpg` | Bosh sahifa (asosiy rasm) | katta, sifatli |
| `wedding2.jpg` | Taklifnoma foni | |
| `wedding3.jpg` | Tafsilotlar foni | |
| `wedding4.jpg` | Countdown foni | |
| `wedding5.jpg` | Xarita foni | |
| `wedding6.jpg` | Sovg'a foni (agar yoqilgan bo'lsa) | |

- Eski fayllarni o'chirib, yangilarini **xuddi shu nom bilan** qo'ying.
- `music.mp3` — orqa fon musiqasi. Xohlasangiz almashtiring (nomi o'zgармаsin).

---

## 5-qadam — Tekshirish (ixtiyoriy, lekin foydali)

Kompyuterда:
```bash
npm install
npm run dev
```
Brauzerda ochilgan manzilni ko'ring — hammasi to'g'ri bo'lsa, keyingi qadam.

---

## 6-qadam — Vercel'ga joylash

1. [vercel.com](https://vercel.com) → **Add New → Project**.
2. Yangi mijoz reposini import qiling.
3. Framework avtomatik **Vite** deb aniqlanadi (`vercel.json` shuni belgilaydi).
4. **Deploy** bosing.
5. Deploy tugagach, **Settings → Domains** dan mijozga domen biriktiring
   (masalan `ali-vali.documen.uz`).

Tayyor! Har bir mijoz shu tarzda mustaqil sayt va domenga ega bo'ladi.

---

## Eslatma: sovg'a bo'limini yoqish

`weddingConfig.ts` da:
```ts
gift: {
  enabled: true,   // false bo'lsa bo'lim umuman ko'rinmaydi
  ...
}
```
`enabled: true` qilinsa, sovg'a bo'limi va chap tomondagi nuqta indikatoriga
qo'shimcha nuqta avtomatik qo'shiladi.
