(function () {
  const H = window.HOTEL;
  const CREDITS = window.CREDITS || [];
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  const UI = {
    vi: { book: "Nhắn Zalo đặt phòng", call: "Gọi", photos: "ảnh", station: "Mục", where: "Vị trí & liên hệ", directions: "Chỉ đường",
      share: "Chia sẻ", copied: "Đã sao chép đường dẫn", amen: "Tiện nghi", about: "Giới thiệu", ask: "Hỏi phòng này qua Zalo",
      credits: "Nguồn ảnh minh hoạ", sample: "Bản mẫu: tên, giá và ảnh đều là minh hoạ. Thay bằng thông tin thật trong hotel.js.",
      zaloMsg: (n) => `Chào khách sạn, tôi muốn hỏi về: ${n}`, close: "Đóng", email: "Email", askCopied: "Đã chép câu hỏi, dán vào Zalo để gửi" },
    en: { book: "Book on Zalo", call: "Call", photos: "photos", station: "Part", where: "Location & contact", directions: "Directions",
      share: "Share", copied: "Link copied", amen: "Amenities", about: "About", ask: "Ask about this on Zalo",
      credits: "Photo credits", sample: "Sample page: names, prices and photos are placeholders.",
      zaloMsg: (n) => `Hello, I'd like to ask about: ${n}`, close: "Close", email: "Email", askCopied: "Question copied, paste it in Zalo" },
  };
  let lang = store.get("ks-lang") || ((navigator.language || "vi").toLowerCase().startsWith("vi") ? "vi" : "en");
  const t = (v) => (v == null ? "" : typeof v === "string" || Array.isArray(v) ? v : v[lang] ?? v.vi);
  const u = (k) => UI[lang][k];

  const ICON = {
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    walk: '<circle cx="13" cy="4" r="2"/><path d="M10 21l2-6-3-3 1-5 4 3 3 1M9 12l-3 3"/>',
    wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',
    car: '<path d="M3 13l2-6h14l2 6v5h-3v-2H6v2H3z"/><circle cx="7.5" cy="14.5" r="1"/><circle cx="16.5" cy="14.5" r="1"/>',
    phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    pin: '<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    share: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 11l7.6-3.8M8.2 13l7.6 3.8"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    image: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M21 16l-5-5-8 8"/>',
  };
  const ic = (n) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICON[n] || ""}</svg>`;
  const img = (f) => "img/" + f;
  const tel = "tel:" + H.phone.replace(/\s+/g, "");
  const zaloLink = () => H.zalo;

  // theme follows system; no toggle needed for guests
  function renderStatic() {
    document.documentElement.lang = lang;
    $("#lang").textContent = lang === "vi" ? "EN" : "VI";
    $("#sample").hidden = !H.sample;
    $("#sample").textContent = u("sample");
    $("#brand").textContent = H.name;
    $("#h-loc").textContent = t(H.location);
    $("#h-name").textContent = H.name;
    $("#h-tag").textContent = t(H.tagline);
    $("#intro").textContent = t(H.intro);
    const cta = `<a class="btn btn-zalo" href="${esc(zaloLink())}" target="_blank" rel="noopener">${ic("chat")}${u("book")}</a>
      <a class="btn btn-call" href="${tel}">${ic("phone")}${u("call")} ${esc(H.phone)}</a>`;
    $("#hero-cta").innerHTML = cta;
    $("#dock").innerHTML = `<a class="btn btn-zalo" href="${esc(zaloLink())}" target="_blank" rel="noopener">${ic("chat")}Zalo</a>
      <a class="btn btn-call" href="${tel}">${ic("phone")}${u("call")}</a>`;
    $("#facts").innerHTML = H.facts.map((f) => `<div class="fact">${ic(f.icon)}<span>${esc(t(f))}</span></div>`).join("");
    $("#chips").innerHTML = H.categories.map((c) => `<a class="chip" href="#tram-${c.id}" data-sec="tram-${c.id}">${esc(t(c))}</a>`).join("")
      + `<a class="chip" href="#vi-tri" data-sec="vi-tri">${esc(u("where"))}</a>`;
    $("#where-no").textContent = `${u("station")} ${String(H.categories.length + 1).padStart(2, "0")}`;
    $("#where-title").textContent = u("where");
    const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(H.mapQuery || H.address);
    const map = $("#map");
    const src = "https://www.google.com/maps?q=" + encodeURIComponent(H.mapQuery || H.address) + "&output=embed&hl=" + lang;
    if (map.getAttribute("src") !== src) map.setAttribute("src", src);
    $("#contact").innerHTML = `<h3>${esc(H.name)}</h3>
      <div class="row">${ic("pin")}<span>${esc(H.address)}</span></div>
      <div class="row">${ic("phone")}<a href="${tel}">${esc(H.phone)}</a></div>
      ${H.email ? `<div class="row">${ic("mail")}<a href="mailto:${esc(H.email)}">${esc(H.email)}</a></div>` : ""}
      <div class="btns"><a class="btn btn-zalo" href="${esc(zaloLink())}" target="_blank" rel="noopener">${ic("chat")}Zalo</a>
      <a class="btn btn-line" href="${mapUrl}" target="_blank" rel="noopener">${ic("pin")}${u("directions")}</a></div>`;
    $("#foot-name").textContent = `© ${new Date().getFullYear()} ${H.name}`;
    $("#credits-title").textContent = u("credits");
    $("#credits").innerHTML = CREDITS.map((c) => `<li>${esc(c.file)}: <a href="${esc(c.page)}" target="_blank" rel="noopener">${esc(c.title)}</a>, ${esc(c.artist || "unknown")}, ${c.license_url ? `<a href="${esc(c.license_url)}" target="_blank" rel="noopener">${esc(c.license)}</a>` : esc(c.license)}</li>`).join("");
    $("#credits").closest("details").hidden = !CREDITS.length;
    document.title = `${H.name} · ${lang === "vi" ? "Phòng và dịch vụ" : "Rooms and services"}`;
  }

  function renderHero() {
    $("#hero-img").innerHTML = H.heroImages.map((f, i) => `<img src="${img(f)}" alt="" ${i ? 'loading="lazy"' : ""} class="${i ? "" : "on"}">`).join("");
    const imgs = [...document.querySelectorAll("#hero-img img")];
    if (imgs.length > 1 && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      let k = 0;
      setInterval(() => { imgs[k].classList.remove("on"); k = (k + 1) % imgs.length; imgs[k].classList.add("on"); }, 6000);
    }
  }

  function renderStations() {
    $("#stations").innerHTML = H.categories.map((c, i) => {
      const items = H.items.filter((x) => x.cat === c.id);
      return `<section class="station wrap" id="tram-${c.id}">
        <div class="station-head"><span class="station-no">${u("station")} ${String(i + 1).padStart(2, "0")}</span><h2>${esc(t(c))}</h2><p>${esc(t(c.note))}</p></div>
        <div class="grid">${items.map(card).join("")}</div></section>`;
    }).join("");
  }
  function card(x) {
    const facts = (t(x.facts) || []).slice(0, 3);
    return `<button class="card" type="button" data-id="${x.id}">
      <div class="card-img"><img src="${img(x.images[0])}" alt="${esc(t(x.name))}" loading="lazy">
        <span class="count">${ic("image")}${x.images.length} ${u("photos")}</span></div>
      <div class="card-body"><h3>${esc(t(x.name))}</h3><p class="short">${esc(t(x.short))}</p>
        <ul class="tags">${facts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        <div class="price">${esc(t(x.price))}</div></div></button>`;
  }
  $("#stations").addEventListener("click", (e) => { const c = e.target.closest(".card"); if (c) location.hash = c.dataset.id; });

  // ---- detail panel ----
  const panel = $("#panel");
  let lastFocus = null;
  function openPanel(x) {
    if (panel.hidden) lastFocus = document.activeElement;
    const name = t(x.name);
    const zl = zaloLink();
    $("#p-body").innerHTML = `
      <div class="gallery">
        <div class="slides" id="slides">${x.images.map((f, i) => `<img src="${img(f)}" alt="${esc(name)} ${i + 1}" ${i ? 'loading="lazy"' : ""}>`).join("")}</div>
        ${x.images.length > 1 ? `<button class="nav-btn prev" data-go="-1" aria-label="Ảnh trước">‹</button><button class="nav-btn next" data-go="1" aria-label="Ảnh sau">›</button>
        <div class="dots">${x.images.map((_, i) => `<i class="${i ? "" : "on"}"></i>`).join("")}</div>` : ""}
      </div>
      <div class="p-content">
        <h2 id="p-title">${esc(name)}</h2>
        <p class="short">${esc(t(x.short))}</p>
        <ul class="tags">${(t(x.facts) || []).map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        <p class="p-price">${esc(t(x.price))}</p>
        <div class="block"><h4>${u("about")}</h4><p style="margin:0">${esc(t(x.desc))}</p></div>
        ${x.amenities ? `<div class="block"><h4>${u("amen")}</h4><ul class="amen">${t(x.amenities).map((a) => `<li>${ic("check")}${esc(a)}</li>`).join("")}</ul></div>` : ""}
        <div class="p-actions">
          <a class="btn btn-zalo" href="${esc(zl)}" target="_blank" rel="noopener" data-ask="${esc(name)}">${ic("chat")}${u("ask")}</a>
          <a class="btn btn-line" href="${tel}">${ic("phone")}${u("call")}</a>
          <button class="btn btn-line" type="button" data-share>${ic("share")}${u("share")}</button>
        </div>
      </div>`;
    panel.dataset.id = x.id;
    panel.hidden = false;
    document.body.style.overflow = "hidden";
    const slides = $("#slides");
    slides.addEventListener("scroll", () => {
      const k = Math.round(slides.scrollLeft / slides.clientWidth);
      panel.querySelectorAll(".dots i").forEach((d, i) => d.classList.toggle("on", i === k));
    }, { passive: true });
    $(".close", panel).focus({ preventScroll: true });
  }
  function closePanel() { panel.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus({ preventScroll: true }); }
  function clearHash() { history.pushState("", document.title, location.pathname + location.search); closePanel(); }
  panel.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) return clearHash();
    const go = e.target.closest("[data-go]");
    if (go) { const s = $("#slides"); s.scrollBy({ left: s.clientWidth * +go.dataset.go, behavior: "smooth" }); }
    const ask = e.target.closest("[data-ask]");
    if (ask) copy(u("zaloMsg")(ask.dataset.ask), u("askCopied"));
    if (e.target.closest("[data-share]")) share();
  });
  document.addEventListener("keydown", (e) => {
    if (panel.hidden) return;
    if (e.key === "Escape") clearHash();
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") { const s = $("#slides"); s.scrollBy({ left: s.clientWidth * (e.key === "ArrowRight" ? 1 : -1), behavior: "smooth" }); }
  });
  function route() {
    const id = decodeURIComponent(location.hash.slice(1));
    const x = H.items.find((i) => i.id === id);
    if (x) openPanel(x); else if (!panel.hidden) closePanel();
  }
  window.addEventListener("hashchange", route);

  // ---- share / copy ----
  let tt;
  function toast(m) { const el = $("#toast"); el.textContent = m; el.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => el.classList.remove("show"), 1800); }
  function copy(text, msg) {
    const ok = () => msg && toast(msg);
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(ok, () => {});
  }
  function share() {
    const url = location.href;
    if (navigator.share) navigator.share({ title: document.title, url }).catch(() => {});
    else copy(url, u("copied"));
  }

  // ---- active chip while scrolling ----
  const io = new IntersectionObserver((ents) => {
    ents.forEach((en) => {
      if (!en.isIntersecting) return;
      document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c.dataset.sec === en.target.id));
      const on = document.querySelector(".chip.on"); if (on) on.scrollIntoView({ block: "nearest", inline: "center" });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  function renderAll() {
    renderStatic(); renderStations();
    document.querySelectorAll(".station, #vi-tri").forEach((s) => io.observe(s));
    if (!panel.hidden) { const x = H.items.find((i) => i.id === panel.dataset.id); if (x) openPanel(x); }
  }
  $("#lang").addEventListener("click", () => { lang = lang === "vi" ? "en" : "vi"; store.set("ks-lang", lang); renderAll(); });

  renderHero();
  renderAll();
  route();
})();
