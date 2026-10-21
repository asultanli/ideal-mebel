/* =========================================================
   İdeal Mebel — saytın bütün məlumatları bu faylda.
   Rəqəmləri, ünvanı və şəkilləri buradan dəyişin.
   ========================================================= */

const SITE = {
  name: "İdeal Mebel",
  whatsapp: "994552071503",          // wa.me üçün, "+" olmadan
  whatsappPretty: "+994 55 207 15 03",
  instagram: "ideal__mebel_",
  followers: "26.7K",
  posts: "2 400+",
  city: { az: "Bakı və Abşeron", ru: "Баку и Апшерон" },
  address: { az: "Bakı şəhəri (dəqiq ünvanı WhatsApp-da soruşun)", ru: "г. Баку (точный адрес уточняйте в WhatsApp)" },
  hours: { az: "B.e. – Şənbə, 10:00 – 19:00", ru: "Пн – Сб, 10:00 – 19:00" }
};

/* Şəkillər.
   Sayt hər şəkli bu ardıcıllıqla axtarır:
   1) assets/img/photos/<key>.jpg  (tools/download_photos.py ilə yüklənir, və ya özünüz qoyun)
   2) Unsplash (internet lazımdır)
   Mağazanın öz işlərinin şəkillərini eyni adla assets/img/photos/ qovluğuna qoysanız, onlar göstəriləcək. */
const PHOTOS = {
  hero:       "MvY303vrKR0",
  kitchen1:   "MvY303vrKR0",
  kitchen2:   "AQl-J19ocWE",
  kitchen3:   "1M9iX5E97rw",
  kitchen4:   "Z8GlHfdn118",
  wardrobe1:  "JLzD88Mbr4U",
  wardrobe2:  "9KVtDmNnFP4",
  bedroom1:   "gVKmonDbotU",
  bedroom2:   "_Swg04CP0bU",
  bedroom3:   "DhFHtkECn7Q",
  living1:    "hM14LjRvQLM",
  living2:    "G3Ixoze4L2o",
  living3:    "lbVDC9vH-Wg",
  kids1:      "snvSuY0JAbU",
  office1:    "QNch8putqnU",
  office2:    "Up-JJmX7M1Q"
};

const CATEGORIES = [
  { key: "kitchen",  photo: "kitchen2",  az: "Mətbəx mebeli",    ru: "Кухни",            from: 280, unit: "pm" },
  { key: "wardrobe", photo: "wardrobe1", az: "Dolablar",         ru: "Шкафы",            from: 250, unit: "pm" },
  { key: "bedroom",  photo: "bedroom1",  az: "Yataq otağı",      ru: "Спальни",          from: 1400, unit: "set" },
  { key: "living",   photo: "living2",   az: "Qonaq otağı, TV",  ru: "Гостиная, ТВ-зона", from: 180, unit: "pm" },
  { key: "kids",     photo: "kids1",     az: "Uşaq otağı",       ru: "Детская",          from: 950, unit: "set" },
  { key: "office",   photo: "office1",   az: "Ofis mebeli",      ru: "Офисная мебель",   from: 160, unit: "pm" }
];

/* Portfolio — "Bizim işlər". Öz işlərinizi əlavə edin: { photo: "fayl-adı", cat: "...", az: "...", ru: "..." } */
const WORKS = [
  { photo: "kitchen1",  cat: "kitchen",  az: "Ağ mətbəx, ada masası ilə",       ru: "Белая кухня с островом" },
  { photo: "wardrobe1", cat: "wardrobe", az: "Ölçüyə görə dolab, yataq otağı",   ru: "Шкаф по размеру в спальне" },
  { photo: "living2",   cat: "living",   az: "TV divarı, yataq otağı",           ru: "ТВ-стена в спальне" },
  { photo: "kitchen2",  cat: "kitchen",  az: "Açıq mətbəx, şüşə qapıya qədər",   ru: "Открытая кухня до панорамной двери" },
  { photo: "bedroom1",  cat: "bedroom",  az: "Taxta çərçivəli çarpayı",           ru: "Кровать в деревянной раме" },
  { photo: "wardrobe2", cat: "wardrobe", az: "Geyim otağı, açıq rəflər",          ru: "Гардеробная с открытыми полками" },
  { photo: "kitchen3",  cat: "kitchen",  az: "Ağ fasadlı mətbəx",                 ru: "Кухня с белыми фасадами" },
  { photo: "living1",   cat: "living",   az: "Qonaq otağı, TV zonası",            ru: "Гостиная с ТВ-зоной" },
  { photo: "bedroom2",  cat: "bedroom",  az: "Yataq otağı, açıq tonlar",          ru: "Спальня в светлых тонах" },
  { photo: "kids1",     cat: "kids",     az: "Körpə otağı",                       ru: "Детская для малыша" },
  { photo: "kitchen4",  cat: "kitchen",  az: "Mətbəx, taxta döşəmə ilə",          ru: "Кухня с деревянным полом" },
  { photo: "office2",   cat: "office",   az: "Kitab rəfi, ev ofisi",              ru: "Стеллаж для домашнего офиса" },
  { photo: "bedroom3",  cat: "bedroom",  az: "Platforma çarpayı",                 ru: "Кровать-подиум" },
  { photo: "office1",   cat: "office",   az: "İş masası, ev ofisi",               ru: "Рабочий стол, домашний офис" },
  { photo: "living3",   cat: "living",   az: "Qonaq otağı",                       ru: "Гостиная" }
];

/* Qiymət kalkulyatoru — NÜMUNƏ qiymətlər. Mağaza sahibi ilə dəqiqləşdirin! */
const CALC = {
  types: {
    kitchen:  { mode: "m",   rate: 280, min: 1.5, max: 8,   def: 3.2, extras: ["blum", "led", "stone"] },
    wardrobe: { mode: "m",   rate: 250, min: 1,   max: 6,   def: 2.4, extras: ["blum", "led", "mirror"] },
    living:   { mode: "m",   rate: 180, min: 1.5, max: 6,   def: 3,   extras: ["blum", "led"] },
    office:   { mode: "m",   rate: 160, min: 1,   max: 6,   def: 2,   extras: ["blum"] },
    bedroom:  { mode: "set", sets: [1400, 2100, 2900], extras: ["blum", "led", "mirror"] },
    kids:     { mode: "set", sets: [950, 1450, 2000],  extras: ["blum", "led"] }
  },
  materials: [
    { key: "ldsp",  k: 1.0,  az: "Laminat (LDSP)", ru: "Ламинат (ЛДСП)", note: { az: "Sərfəli, davamlı", ru: "Выгодно, прочно" } },
    { key: "mdf",   k: 1.35, az: "MDF, mat boya",  ru: "МДФ, матовая краска", note: { az: "Ən çox seçilən", ru: "Самый популярный" } },
    { key: "acryl", k: 1.55, az: "Akril, parlaq",  ru: "Акрил, глянец", note: { az: "Güzgü effekti", ru: "Зеркальный блеск" } },
    { key: "veneer",k: 1.85, az: "Təbii şpon",     ru: "Натуральный шпон", note: { az: "Premium", ru: "Премиум" } }
  ],
  colors: [
    { key: "white",   hex: "#F3F1EC", az: "Ağ",        ru: "Белый" },
    { key: "cashmere",hex: "#D8CEC0", az: "Kaşmir",    ru: "Кашемир" },
    { key: "greige",  hex: "#B8B0A5", az: "Qreyc",     ru: "Грейж" },
    { key: "olive",   hex: "#727560", az: "Zeytun",    ru: "Олива" },
    { key: "graphite",hex: "#3E4042", az: "Antrasit",  ru: "Антрацит" },
    { key: "oak",     hex: "#C49A6C", az: "Palıd",     ru: "Дуб", wood: true },
    { key: "walnut",  hex: "#76503A", az: "Qoz",       ru: "Орех", wood: true }
  ],
  extras: {
    blum:   { type: "pct",  v: 0.12, az: "Blum furnitura (yumşaq bağlanma)", ru: "Фурнитура Blum (доводчики)" },
    led:    { type: "flat", v: 150,  az: "LED işıqlandırma",                 ru: "LED-подсветка" },
    stone:  { type: "perM", v: 120,  az: "Kvars daş tezgah",                 ru: "Столешница из кварца" },
    mirror: { type: "flat", v: 220,  az: "Güzgülü qapılar",                  ru: "Зеркальные двери" }
  }
};
