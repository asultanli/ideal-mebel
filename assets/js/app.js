/* İdeal Mebel — site logic. Content lives in data.js. */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const fmt = n => Math.round(n).toLocaleString("ru-RU").replace(/ | |,/g, " ");
  const waUrl = text => `https://wa.me/${SITE.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;

  /* ---------- i18n: AZ text lives in the HTML, RU here ---------- */
  const RU = {
    top1: "Бесплатный замер · Баку и Апшерон", navCat: "Каталог", navWorks: "Наши работы", navCalc: "Рассчитать цену", navProcess: "Как мы работаем", navContact: "Контакты", writeUs: "Написать",
    heroKicker: "Ваш дом станет красивее с нами!", heroTitle: "Кухни, шкафы и спальни точно по вашим размерам",
    heroSub: "Бесплатно делаем замер, готовим 3D-проект, изготавливаем мебель и собираем у вас дома. Цвет и модель выбираете вы.",
    heroCta1: "Рассчитать цену", heroCta2: "Написать в WhatsApp", hp1: "Бесплатный замер", hp2: "3D-дизайн", hp3: "Профессиональная сборка",
    tr1: "подписчиков в Instagram", tr2: "публикаций работ", tr3b: "Цвет и модель", tr3: "выбираете вы", tr4b: "Профессиональная", tr4: "команда",
    catKicker: "Что мы делаем", catTitle: "Мебель по размеру для каждой комнаты", catLink: "Рассчитать цену →",
    worksKicker: "Портфолио", worksTitle: "Наши работы", worksMore: "Больше работ в Instagram",
    calcKicker: "Калькулятор", calcTitle: "Рассчитайте цену за 1 минуту", calcSub: "Выберите тип мебели, размер, материал и цвет. Отправьте расчёт в WhatsApp одним нажатием, менеджер назовёт точную цену.",
    cStep1: "Тип мебели", cStep3: "Материал фасада", cStep4: "Цвет", cStep5: "Дополнительно", cResult: "Примерная цена", cSend: "Отправить расчёт в WhatsApp",
    cFine: "* Цена примерная. Точная цена фиксируется в договоре после бесплатного замера.",
    procKicker: "Как мы работаем", procTitle: "От заявки до сборки",
    p1t: "Заявка", p1: "Пишете в WhatsApp или звоните и коротко рассказываете, что нужно.",
    p2t: "Бесплатный замер", p2: "Мастер приезжает, делает точный замер и показывает образцы материалов и цветов.",
    p3t: "3D-проект и договор", p3: "Готовим 3D-визуализацию. После согласования цена и срок фиксируются в договоре.",
    p4t: "Производство", p4: "Мебель изготавливается в цеху по вашим размерам.",
    p5t: "Доставка и сборка", p5: "Наша команда привозит, собирает и сдаёт работу чисто.",
    faqKicker: "Вопросы", faqTitle: "Частые вопросы", faqSub: "Не нашли ответ? Напишите в WhatsApp, обычно отвечаем за несколько минут.",
    q1: "Замер бесплатный?", a1: "Да. Мастер бесплатно приезжает по Баку и Апшерону, делает замер и показывает образцы материалов.",
    q2: "Сколько времени занимает изготовление?", a2: "Срок зависит от объёма проекта и материала. Точная дата указывается в договоре.",
    q3: "Можно выбрать свой размер и цвет?", a3: "Да, всё делаем по вашим размерам. Цвет, материал фасада и фурнитуру выбираете вы.",
    q4: "Сборка входит в цену?", a4: "Условия доставки и сборки менеджер называет по проекту. Сборку делает наша профессиональная команда.",
    q5: "Можете демонтировать старую мебель?", a5: "Скажите об этом при заявке, менеджер расскажет о возможностях и цене.",
    ctKicker: "Контакты", ctTitle: "Запишитесь на бесплатный замер", ctSub: "Заполните форму, и сообщение откроется в WhatsApp уже готовым. Или напишите напрямую.",
    ctAddr: "Адрес", ctHours: "Часы работы", ctArea: "Зона обслуживания",
    fName: "Ваше имя", fPhone: "Телефон", fType: "Что нужно?", fMsg: "Коротко (размеры, цвет, пожелания)", fErr: "Укажите имя и номер телефона.", fSend: "Отправить в WhatsApp",
    ftAbout: "Профессиональная сборка мебели и мебель для дома по размерам. Ваш дом станет красивее с нами!", ftCat: "Каталог", ftContact: "Контакты", ftPhotos: "Примеры фото: Unsplash"
  };
  const UI = {
    az: { all: "Hamısı", from: "-dan", pm: "/ pm", set: "dəst", length: "Uzunluq", sizeSet: "Dəstin ölçüsü", sets: [["Kiçik", "Əsas dəst"], ["Orta", "Dəst + komod"], ["Böyük", "Tam dəst + dolab"]],
      hintM: "Divar boyu ölçü, metrlə", perM: "1 pm ≈", forSet: "Seçilmiş dəst üçün", type: "Növ", size: "Ölçü", mat: "Material", color: "Rəng", extras: "Əlavələr", none: "yoxdur",
      msgCalc: "Salam! Saytda qiymət hesabladım:", msgPrice: "Təxmini qiymət", msgEnd: "Pulsuz ölçü üçün vaxt təyin etmək istəyirəm.",
      msgLead: "Salam! Saytdan müraciət:", name: "Ad", phone: "Telefon", need: "Lazımdır", note: "Qeyd", other: "Başqa" },
    ru: { all: "Все", from: "от", pm: "/ пм", set: "комплект", length: "Длина", sizeSet: "Размер комплекта", sets: [["Малый", "Базовый комплект"], ["Средний", "Комплект + комод"], ["Большой", "Полный + шкаф"]],
      hintM: "Длина вдоль стены, в метрах", perM: "1 пм ≈", forSet: "За выбранный комплект", type: "Тип", size: "Размер", mat: "Материал", color: "Цвет", extras: "Дополнительно", none: "нет",
      msgCalc: "Здравствуйте! Рассчитал(а) цену на сайте:", msgPrice: "Примерная цена", msgEnd: "Хочу записаться на бесплатный замер.",
      msgLead: "Здравствуйте! Заявка с сайта:", name: "Имя", phone: "Телефон", need: "Нужно", note: "Комментарий", other: "Другое" }
  };
  let lang = "az";
  try { lang = localStorage.getItem("im_lang") || "az"; } catch (e) {}
  const AZ = {};
  $$("[data-i18n]").forEach(el => { AZ[el.dataset.i18n] = el.innerHTML; });
  const ui = () => UI[lang];
  const tx = o => o[lang] ?? o.az;

  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(el => { el.innerHTML = (lang === "ru" ? RU : AZ)[el.dataset.i18n] ?? AZ[el.dataset.i18n]; });
    $$("[data-lang]").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    $$(".js-address").forEach(el => el.textContent = tx(SITE.address));
    $$(".js-hours").forEach(el => el.textContent = tx(SITE.hours));
    $$(".js-city").forEach(el => el.textContent = tx(SITE.city));
    renderCategories(); renderFilters(); renderWorks(); renderFormTypes(); renderCalc(true);
  }

  /* ---------- static contact bits ---------- */
  $$(".wa-link").forEach(a => a.href = waUrl());
  $$(".ig-link").forEach(a => a.href = `https://instagram.com/${SITE.instagram}`);
  $$(".js-wa-pretty").forEach(el => el.textContent = SITE.whatsappPretty);
  $$(".js-ig-name").forEach(el => el.textContent = "@" + SITE.instagram);
  $$(".js-followers").forEach(el => el.textContent = SITE.followers);
  $$(".js-posts").forEach(el => el.textContent = SITE.posts);
  $("#year").textContent = new Date().getFullYear();

  /* ---------- photos: local file → Unsplash → soft placeholder ---------- */
  const photoCache = {};
  function resolvePhoto(key, w) {
    if (photoCache[key]) return photoCache[key];
    const id = PHOTOS[key];
    const sources = [`assets/img/photos/${key}.jpg`];
    if (id) sources.push(`https://unsplash.com/photos/${id}/download?w=${w}`);
    photoCache[key] = new Promise(resolve => {
      const tryNext = i => {
        if (i >= sources.length) return resolve(null);
        const img = new Image();
        img.onload = () => resolve(sources[i]);
        img.onerror = () => tryNext(i + 1);
        img.src = sources[i];
      };
      tryNext(0);
    });
    return photoCache[key];
  }
  function loadPhoto(el) {
    const key = el.dataset.photo; if (!key) return;
    el.classList.add("loading");
    resolvePhoto(key, el.dataset.w || 1400).then(src => {
      el.classList.remove("loading");
      if (src) el.style.backgroundImage = `url("${src}")`; else el.classList.add("failed");
    });
  }
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { loadPhoto(e.target); io.unobserve(e.target); }
  }), { rootMargin: "400px" }) : null;
  const watchPhotos = root => $$(".js-photo[data-photo]", root).forEach(el => io ? io.observe(el) : loadPhoto(el));

  /* ---------- categories ---------- */
  const arrow = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
  function renderCategories() {
    $("#catGrid").innerHTML = CATEGORIES.map(c => `
      <a class="cat reveal" href="#calc" data-calc-type="${c.key}">
        <div class="js-photo" data-photo="${c.photo}" data-w="1000"></div>
        <div class="cat-body">
          <div><h3>${tx(c)}</h3><p class="from">${lang === "ru" ? ui().from + " " : ""}<b>${fmt(c.from)} ₼</b>${lang === "az" ? ui().from : ""} ${c.unit === "pm" ? ui().pm : "/ " + ui().set}</p></div>
          <span class="go">${arrow}</span>
        </div>
      </a>`).join("");
    $(".js-foot-cats").innerHTML = CATEGORIES.map(c => `<li><a href="#calc" data-calc-type="${c.key}">${tx(c)}</a></li>`).join("");
    watchPhotos($("#catGrid")); observeReveal();
  }

  /* ---------- works + filters + lightbox ---------- */
  let filter = "all";
  function renderFilters() {
    const used = [...new Set(WORKS.map(w => w.cat))];
    $("#filters").innerHTML = [["all", ui().all], ...CATEGORIES.filter(c => used.includes(c.key)).map(c => [c.key, tx(c)])]
      .map(([k, l]) => `<button data-filter="${k}" aria-pressed="${k === filter}">${l}</button>`).join("");
  }
  function renderWorks() {
    $("#worksGrid").innerHTML = WORKS.map((w, i) => {
      const cat = CATEGORIES.find(c => c.key === w.cat);
      return `<button class="work${filter !== "all" && w.cat !== filter ? " hide" : ""}" data-work="${i}">
        <div class="js-photo" data-photo="${w.photo}" data-w="900"></div>
        <figcaption><small>${cat ? tx(cat) : ""}</small>${tx(w)}</figcaption></button>`;
    }).join("");
    watchPhotos($("#worksGrid"));
  }
  let lbIndex = 0;
  const visibleWorks = () => $$(".work:not(.hide)").map(b => +b.dataset.work);
  function openLightbox(i) {
    lbIndex = i; const w = WORKS[i], el = $("#lbImg");
    el.style.backgroundImage = ""; el.dataset.photo = w.photo; el.dataset.w = 1800; loadPhoto(el);
    $("#lbCap").textContent = tx(w);
    $("#lightbox").hidden = false; document.body.style.overflow = "hidden";
  }
  function stepLightbox(d) { const v = visibleWorks(); const p = v.indexOf(lbIndex); openLightbox(v[(p + d + v.length) % v.length]); }
  function closeLightbox() { $("#lightbox").hidden = true; document.body.style.overflow = ""; }
  $("#lbClose").onclick = closeLightbox; $("#lbPrev").onclick = () => stepLightbox(-1); $("#lbNext").onclick = () => stepLightbox(1);
  $("#lightbox").addEventListener("click", e => { if (e.target.id === "lightbox") closeLightbox(); });
  document.addEventListener("keydown", e => {
    if ($("#lightbox").hidden) return;
    if (e.key === "Escape") closeLightbox(); if (e.key === "ArrowLeft") stepLightbox(-1); if (e.key === "ArrowRight") stepLightbox(1);
  });

  /* ---------- calculator ---------- */
  const st = { type: "kitchen", len: CALC.types.kitchen.def, set: 1, mat: "mdf", color: "cashmere", extras: new Set(["blum"]) };
  const round10 = n => Math.round(n / 10) * 10;
  function price() {
    const t = CALC.types[st.type], k = CALC.materials.find(m => m.key === st.mat).k;
    let base = t.mode === "m" ? t.rate * st.len * k : t.sets[st.set] * k, total = base;
    st.extras.forEach(x => { if (!t.extras.includes(x)) return; const e = CALC.extras[x];
      total += e.type === "pct" ? base * e.v : e.type === "perM" ? e.v * (t.mode === "m" ? st.len : 3) : e.v; });
    return { lo: round10(total * .92), hi: round10(total * 1.1), total };
  }
  function renderCalc(full) {
    const t = CALC.types[st.type], U = ui();
    if (full) {
      $("#cType").innerHTML = CATEGORIES.map(c => `<button data-ctype="${c.key}" aria-pressed="${c.key === st.type}">${tx(c)}</button>`).join("");
      $("#cMat").innerHTML = CALC.materials.map(m => `<button class="mat" data-mat="${m.key}" aria-pressed="${m.key === st.mat}">${tx(m)}<small>${tx(m.note)}</small></button>`).join("");
      $("#cColor").innerHTML = CALC.colors.map(c => `<button data-color="${c.key}" aria-pressed="${c.key === st.color}" aria-label="${tx(c)}" title="${tx(c)}" style="background:${c.wood ? woodCss(c.hex) : c.hex}"></button>`).join("");
      $("#cSizeLabel").textContent = t.mode === "m" ? U.length : U.sizeSet;
      $("#cSize").innerHTML = t.mode === "m"
        ? `<div class="range-row"><input type="range" id="cLen" min="${t.min}" max="${t.max}" step="0.1" value="${st.len}" aria-label="${U.length}"><span class="range-val" id="cLenVal"></span></div><p class="range-hint">${U.hintM}</p>`
        : `<div class="sets">${U.sets.map((s, i) => `<button class="set-opt" data-set="${i}" aria-pressed="${i === st.set}">${s[0]}<small>${s[1]}</small></button>`).join("")}</div>`;
      $("#cExtras").innerHTML = t.extras.map(x => { const e = CALC.extras[x];
        const add = e.type === "pct" ? `+${e.v * 100}%` : e.type === "perM" ? `+${e.v} ₼ ${U.pm}` : `+${e.v} ₼`;
        return `<label class="extra"><input type="checkbox" data-extra="${x}" ${st.extras.has(x) ? "checked" : ""}> ${tx(e)} <span class="add">${add}</span></label>`; }).join("");
      const r = $("#cLen"); if (r) r.addEventListener("input", () => { st.len = +r.value; renderCalc(false); });
    }
    const p = price(), mat = CALC.materials.find(m => m.key === st.mat), col = CALC.colors.find(c => c.key === st.color);
    const size = t.mode === "m" ? `${st.len.toFixed(1)} m` : U.sets[st.set][0];
    if ($("#cLenVal")) $("#cLenVal").textContent = `${st.len.toFixed(1)} m`;
    $("#cColorName").textContent = "· " + tx(col);
    $("#cPrice").textContent = `${fmt(p.lo)} – ${fmt(p.hi)} ₼`;
    $("#cMonthly").textContent = t.mode === "m" ? `${U.perM} ${fmt(p.total / st.len)} ₼` : U.forSet;
    const ex = t.extras.filter(x => st.extras.has(x)).map(x => tx(CALC.extras[x]));
    const cat = CATEGORIES.find(c => c.key === st.type);
    $("#cSummary").innerHTML = [[U.type, tx(cat)], [U.size, size], [U.mat, tx(mat)], [U.color, tx(col)], [U.extras, ex.join(", ") || U.none]]
      .map(([a, b]) => `<li><span>${a}</span><span>${b}</span></li>`).join("");
    $("#cSend").href = waUrl([U.msgCalc, `• ${U.type}: ${tx(cat)}`, `• ${U.size}: ${size}`, `• ${U.mat}: ${tx(mat)}`, `• ${U.color}: ${tx(col)}`,
      `• ${U.extras}: ${ex.join(", ") || U.none}`, `• ${U.msgPrice}: ${fmt(p.lo)} – ${fmt(p.hi)} ₼`, "", U.msgEnd].join("\n"));
    $("#cPreview").innerHTML = drawPreview(st.type, col, t.mode === "m" ? (st.len - t.min) / (t.max - t.min) : [.35, .65, 1][st.set], st.extras, t.mode === "m" ? st.len : null);
  }
  function woodCss(hex) { return `repeating-linear-gradient(100deg, ${hex} 0 6px, ${shade(hex, -.12)} 6px 8px, ${hex} 8px 13px, ${shade(hex, .08)} 13px 15px)`; }
  function shade(hex, a) {
    const n = parseInt(hex.slice(1), 16), f = v => Math.max(0, Math.min(255, Math.round(a < 0 ? v * (1 + a) : v + (255 - v) * a)));
    return "#" + [n >> 16, n >> 8 & 255, n & 255].map(v => f(v).toString(16).padStart(2, "0")).join("");
  }

  /* Front elevation drawing of the chosen furniture in the chosen colour */
  function drawPreview(type, col, ratio, extras, realLen) {
    const W = 600, H = 360, floor = 322;
    const w = 260 + 280 * ratio, len = realLen || w / 140;
    const x0 = (W - w) / 2, c = col.hex, edge = shade(c, -.22), hnd = ["graphite", "olive", "walnut"].includes(col.key) ? "#C9A45C" : "#2B2B2B";
    const led = extras.has("led"), stone = extras.has("stone"), mirror = extras.has("mirror");
    const fill = col.wood ? "url(#wood)" : c;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><defs>
      <pattern id="wood" width="60" height="14" patternUnits="userSpaceOnUse"><rect width="60" height="14" fill="${c}"/><path d="M0 4 Q15 2 30 5 T60 4" stroke="${shade(c, -.14)}" fill="none"/><path d="M0 10 Q20 12 40 9 T60 11" stroke="${shade(c, .1)}" fill="none"/></pattern>
      <linearGradient id="mir" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#E8EEF1"/><stop offset=".5" stop-color="#C5D0D6"/><stop offset="1" stop-color="#DCE4E8"/></linearGradient>
      <linearGradient id="glow" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FFD9A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFD9A0" stop-opacity="0"/></linearGradient>
      </defs><rect width="${W}" height="${H}" fill="#ECE6DE"/><rect y="${floor}" width="${W}" height="${H - floor}" fill="#DCD3C8"/>`;
    const door = (x, y, dw, dh, vertical = true, m = false) =>
      `<rect x="${x + 1.5}" y="${y + 1.5}" width="${dw - 3}" height="${dh - 3}" fill="${m ? "url(#mir)" : fill}" stroke="${edge}" stroke-width="1"/>` +
      (vertical ? `<rect x="${x + dw - 12}" y="${y + dh / 2 - 14}" width="3" height="28" rx="1.5" fill="${hnd}"/>` : `<rect x="${x + dw / 2 - 16}" y="${y + 8}" width="32" height="3" rx="1.5" fill="${hnd}"/>`);
    if (type === "kitchen") {
      const n = Math.max(3, Math.round(len / .6)), dw = w / n, topY = 60, upH = 92, baseY = 214, baseH = floor - 12 - baseY;
      for (let i = 0; i < n; i++) s += door(x0 + i * dw, topY, dw, upH);
      if (led) s += `<rect x="${x0}" y="${topY + upH}" width="${w}" height="40" fill="url(#glow)"/>`;
      s += `<rect x="${x0}" y="${topY + upH + 4}" width="${w}" height="${baseY - topY - upH - 14}" fill="${stone ? "#F1EEE9" : "#E3DCD2"}" opacity=".7"/>`;
      s += `<rect x="${x0 - 6}" y="${baseY - 10}" width="${w + 12}" height="10" fill="${stone ? "#EDEAE5" : "#3A3A3A"}" stroke="${stone ? "#CFC9C1" : "none"}"/>`;
      for (let i = 0; i < n; i++) {
        const x = x0 + i * dw;
        if (i === Math.floor(n / 2)) { s += `<rect x="${x + 2}" y="${baseY + 2}" width="${dw - 4}" height="${baseH - 4}" fill="#2A2A2A"/><rect x="${x + 8}" y="${baseY + 22}" width="${dw - 16}" height="${baseH - 40}" fill="#444" stroke="#555"/>`; continue; }
        if (i % 3 === 0) { const h3 = baseH / 3; for (let k = 0; k < 3; k++) s += door(x, baseY + k * h3, dw, h3, false); }
        else s += door(x, baseY, dw, baseH);
      }
      s += `<rect x="${x0}" y="${floor - 12}" width="${w}" height="12" fill="${shade(c, -.35)}"/>`;
    } else if (type === "wardrobe") {
      const n = Math.max(2, Math.round(len / .5)), dw = w / n, top = 30;
      s += `<rect x="${x0 - 3}" y="${top - 3}" width="${w + 6}" height="${floor - top + 3}" fill="${edge}"/>`;
      for (let i = 0; i < n; i++) s += door(x0 + i * dw, top, dw, floor - top - 10, true, mirror && (i === Math.floor(n / 2) || (n > 4 && i === 1)));
      if (led) s += `<rect x="${x0}" y="${top}" width="${w}" height="26" fill="url(#glow)"/>`;
    } else if (type === "living") {
      const tvW = Math.min(220, w * .5), cabY = 250;
      s += `<rect x="${x0}" y="${cabY}" width="${w}" height="${floor - cabY - 14}" fill="${edge}"/>`;
      const n = Math.max(2, Math.round(len / .6)), dw = w / n;
      for (let i = 0; i < n; i++) s += door(x0 + i * dw, cabY, dw, floor - cabY - 14, false);
      s += `<rect x="${W / 2 - tvW / 2 - 30}" y="60" width="${tvW + 60}" height="170" fill="${fill}" stroke="${edge}"/>`;
      s += `<rect x="${W / 2 - tvW / 2}" y="${90}" width="${tvW}" height="${tvW * .56}" rx="3" fill="#1E1E1E"/>`;
      if (led) s += `<rect x="${W / 2 - tvW / 2 - 30}" y="230" width="${tvW + 60}" height="18" fill="url(#glow)"/>`;
      if (w > 300) [x0, x0 + w - 56].forEach(x => { s += `<rect x="${x}" y="70" width="56" height="170" fill="${fill}" stroke="${edge}"/>`; [110, 160, 210].forEach(y => s += `<rect x="${x + 4}" y="${y}" width="48" height="4" fill="${edge}"/>`); });
    } else if (type === "office") {
      s += `<rect x="${x0}" y="214" width="${w}" height="10" fill="${fill}" stroke="${edge}"/><rect x="${x0 + 6}" y="224" width="6" height="${floor - 224}" fill="#2B2B2B"/><rect x="${x0 + w - 70}" y="224" width="64" height="${floor - 224}" fill="${fill}" stroke="${edge}"/>`;
      [0, 1, 2].forEach(k => s += door(x0 + w - 70, 224 + k * ((floor - 224) / 3), 64, (floor - 224) / 3, false));
      s += `<rect x="${x0}" y="60" width="${w}" height="8" fill="${fill}" stroke="${edge}"/><rect x="${x0}" y="120" width="${w}" height="8" fill="${fill}" stroke="${edge}"/>`;
      for (let x = x0 + 10; x < x0 + w * .55; x += 13) s += `<rect x="${x}" y="${120 - 30 - (x % 3) * 4}" width="10" height="${30 + (x % 3) * 4}" fill="${["#A8573A", "#2E4560", "#C99A2E", "#8FA58E"][Math.round(x) % 4]}"/>`;
      s += `<rect x="${x0 + w * .3}" y="166" width="80" height="48" fill="#222"/>`;
    } else {
      const bedW = type === "kids" ? 190 : 270, bx = W / 2 - bedW / 2 - (type === "kids" ? 80 : 0);
      s += `<rect x="${bx - 10}" y="${type === "kids" ? 150 : 110}" width="${bedW + 20}" height="${floor - (type === "kids" ? 150 : 110) - 40}" fill="${fill}" stroke="${edge}"/>`;
      if (type === "bedroom") for (let x = bx; x < bx + bedW; x += 30) s += `<line x1="${x + 5}" y1="118" x2="${x + 5}" y2="${floor - 60}" stroke="${edge}" opacity=".6"/>`;
      s += `<rect x="${bx}" y="${floor - 70}" width="${bedW}" height="30" rx="6" fill="#F7F4EF" stroke="#DDD5CA"/><rect x="${bx}" y="${floor - 46}" width="${bedW}" height="36" fill="${fill}" stroke="${edge}"/>`;
      s += `<rect x="${bx + 14}" y="${floor - 92}" width="${bedW / 2 - 24}" height="26" rx="10" fill="#FFFFFF" stroke="#DDD5CA"/><rect x="${bx + bedW / 2 + 10}" y="${floor - 92}" width="${bedW / 2 - 24}" height="26" rx="10" fill="#FFFFFF" stroke="#DDD5CA"/>`;
      if (type === "bedroom") [bx - 90, bx + bedW + 30].forEach(x => { s += door(x, floor - 110, 60, 50, false) + door(x, floor - 60, 60, 50, false); if (led) s += `<circle cx="${x + 30}" cy="${floor - 150}" r="22" fill="url(#glow)"/>`; });
      else { s += `<rect x="${bx + bedW + 40}" y="200" width="150" height="10" fill="${fill}" stroke="${edge}"/>` + door(bx + bedW + 140, 210, 50, floor - 210, true);
        s += `<rect x="${bx + bedW + 40}" y="90" width="150" height="8" fill="${fill}" stroke="${edge}"/><circle cx="${bx + 60}" cy="118" r="8" fill="#C99A2E"/>`; }
    }
    return s + `</svg>`;
  }

  /* ---------- lead form → WhatsApp ---------- */
  function renderFormTypes() {
    const cur = $("#fType").value;
    $("#fType").innerHTML = CATEGORIES.map(c => `<option value="${c.key}">${tx(c)}</option>`).join("") + `<option value="other">${ui().other}</option>`;
    if (cur) $("#fType").value = cur;
  }
  $("#leadForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#fName").value.trim(), phone = $("#fPhone").value.trim();
    if (!name || !phone) { $("#formError").hidden = false; return; }
    $("#formError").hidden = true;
    const U = ui(), type = $("#fType").selectedOptions[0].textContent, msg = $("#fMsg").value.trim();
    const text = [U.msgLead, `• ${U.name}: ${name}`, `• ${U.phone}: ${phone}`, `• ${U.need}: ${type}`, msg ? `• ${U.note}: ${msg}` : ""].filter(Boolean).join("\n");
    window.open(waUrl(text), "_blank", "noopener");
  });

  /* ---------- events ---------- */
  document.addEventListener("click", e => {
    const l = e.target.closest("[data-lang]");
    if (l) { lang = l.dataset.lang; try { localStorage.setItem("im_lang", lang); } catch (er) {} applyLang(); return; }
    const ct = e.target.closest("[data-calc-type]");
    if (ct) { st.type = ct.dataset.calcType; const t = CALC.types[st.type]; if (t.mode === "m") st.len = t.def; renderCalc(true); }
    const f = e.target.closest("[data-filter]");
    if (f) { filter = f.dataset.filter; renderFilters(); $$(".work").forEach(w => w.classList.toggle("hide", filter !== "all" && WORKS[w.dataset.work].cat !== filter)); return; }
    const wk = e.target.closest("[data-work]"); if (wk) { openLightbox(+wk.dataset.work); return; }
    const cty = e.target.closest("[data-ctype]");
    if (cty) { st.type = cty.dataset.ctype; const t = CALC.types[st.type]; if (t.mode === "m") st.len = t.def; renderCalc(true); return; }
    const m = e.target.closest("[data-mat]"); if (m) { st.mat = m.dataset.mat; $$("[data-mat]").forEach(b => b.setAttribute("aria-pressed", b === m)); renderCalc(false); return; }
    const c = e.target.closest("[data-color]"); if (c) { st.color = c.dataset.color; $$("[data-color]").forEach(b => b.setAttribute("aria-pressed", b === c)); renderCalc(false); return; }
    const s = e.target.closest("[data-set]"); if (s) { st.set = +s.dataset.set; $$("[data-set]").forEach(b => b.setAttribute("aria-pressed", b === s)); renderCalc(false); return; }
    if (e.target.closest("#burger")) { $("#nav").classList.toggle("open"); return; }
    if (e.target.closest("#nav a")) $("#nav").classList.remove("open");
  });
  document.addEventListener("change", e => {
    const x = e.target.closest("[data-extra]"); if (!x) return;
    x.checked ? st.extras.add(x.dataset.extra) : st.extras.delete(x.dataset.extra); renderCalc(false);
  });

  /* header shadow + active nav link */
  const sections = $$("main section[id]");
  const onScroll = () => {
    $("#header").classList.toggle("scrolled", scrollY > 10);
    let cur = ""; sections.forEach(s => { if (s.getBoundingClientRect().top < 140) cur = s.id; });
    $$("#nav a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
  };
  addEventListener("scroll", onScroll, { passive: true });

  /* reveal on scroll */
  const rio = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); rio.unobserve(e.target); } }), { threshold: .12 }) : null;
  function observeReveal() { $$(".reveal:not(.in)").forEach(el => rio ? rio.observe(el) : el.classList.add("in")); }
  $$(".section-head, .calc, .process, .faq-wrap, .contact").forEach(el => el.classList.add("reveal"));

  applyLang();
  watchPhotos(document);
  observeReveal();
  onScroll();
})();
