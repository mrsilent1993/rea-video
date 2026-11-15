/*
 * Chế độ "đi một vòng khách sạn": cuộn = máy quay di chuyển giữa các trạm.
 * Mỗi trạm là một ảnh toàn màn hình; giữa hai trạm ảnh trượt ngang, phóng nhẹ và nhoè như máy quay đang đi,
 * tới trạm thì dừng, ảnh nét lại và nội dung hiện bên trái (điện thoại: phía dưới).
 * Bật khi html có class "film" (mặc định; tắt khi người xem chọn "Xem dạng danh sách" hoặc máy bật giảm chuyển động).
 */
(function () {
  const root = document.documentElement;
  const bench = document.getElementById("bench");
  if (!bench) return;

  const SEG = 1.6;       // mỗi đoạn giữa hai trạm dài 1,6 màn hình cuộn
  const REST = 0.3;      // phần đầu mỗi đoạn: máy quay còn đứng yên ở trạm
  const MOVE = 0.5;      // phần giữa: máy quay di chuyển (phần còn lại: đã tới trạm sau, đứng yên)
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const smooth = (v) => { v = clamp(v, 0, 1); return v * v * (3 - 2 * v); };
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  let stops = [], shots = [], ovs = [], chips = [], N = 0, ticking = false, lastC = -1;

  function build() {
    const { H, t, u, ic, img, tel, esc, lang, zalo } = window.KS;
    const vi = lang === "vi";
    const L = {
      station: vi ? "Trạm" : "Stop", next: vi ? "Tiếp theo" : "Next", scroll: vi ? "Cuộn để đi một vòng khách sạn" : "Scroll to walk through the hotel",
      list: vi ? "Xem dạng danh sách" : "List view", where: u("where"), dir: u("directions"), book: u("book"), call: u("call"),
      photos: u("photos"),
    };
    const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(H.mapQuery || H.address);

    stops = [
      { id: "top", still: H.heroStill || H.heroImages[0], label: vi ? "Chào mừng" : "Welcome", hero: true },
      ...H.categories.map((c) => ({ id: "tram-" + c.id, cat: c, still: c.still || (H.items.find((i) => i.cat === c.id) || {}).images?.[0], label: t(c) })),
      { id: "vi-tri", still: H.whereStill || H.heroImages[0], label: L.where, where: true },
    ];
    N = stops.length;
    bench.style.height = `calc(${(N - 1) * SEG * 100}vh + 100vh)`;

    const pad = (n) => String(n).padStart(2, "0");
    const card = (x) => `<button class="fcard" type="button" data-id="${x.id}">
        <span class="fthumb"><img src="${img(x.images[0])}" alt="" loading="lazy" decoding="async"><span class="fcount">${ic("image")}${x.images.length}</span></span>
        <span class="fname">${esc(t(x.name))}</span><span class="fprice">${esc(t(x.price))}</span></button>`;

    const overlay = (s, k) => {
      const head = `<p class="fstation">${L.station} ${pad(k + 1)} / ${pad(N)}</p>`;
      if (s.hero) return `${head}<p class="feyebrow">${esc(t(H.location))}</p><h1>${esc(H.name)}</h1>
        <p class="ftag">${esc(t(H.tagline))}</p><p class="fdesc">${esc(t(H.intro))}</p>
        <div class="fbtns"><a class="btn btn-zalo" href="${esc(zalo)}" target="_blank" rel="noopener">${ic("chat")}${esc(L.book)}</a>
        <a class="btn btn-glass" href="${tel}">${ic("phone")}${esc(H.phone)}</a></div>
        <ul class="ffacts">${H.facts.map((f) => `<li>${ic(f.icon)}${esc(t(f))}</li>`).join("")}</ul>`;
      if (s.where) return `${head}<h2>${esc(L.where)}</h2>
        <p class="fdesc">${ic("pin")} ${esc(H.address)}</p>
        <p class="fdesc">${ic("phone")} <a href="${tel}">${esc(H.phone)}</a>${H.email ? ` · <a href="mailto:${esc(H.email)}">${esc(H.email)}</a>` : ""}</p>
        <div class="fbtns"><a class="btn btn-zalo" href="${esc(zalo)}" target="_blank" rel="noopener">${ic("chat")}Zalo</a>
        <a class="btn btn-glass" href="${mapUrl}" target="_blank" rel="noopener">${ic("pin")}${esc(L.dir)}</a>
        <a class="btn btn-glass" href="${tel}">${ic("phone")}${esc(L.call)}</a></div>`;
      const items = H.items.filter((i) => i.cat === s.cat.id);
      return `${head}<h2>${esc(t(s.cat))}</h2><p class="fnote">${esc(t(s.cat.note))}</p>
        <div class="fcards">${items.map(card).join("")}</div>`;
    };

    bench.innerHTML = `
      <div class="stage">
        <div class="shots">${stops.map((s, k) => `<img class="shot" src="${img(s.still)}" alt="" decoding="async" ${k > 1 ? 'loading="lazy"' : ""}>`).join("")}</div>
        <div class="fscrim"></div><div class="fgrain"></div>
        <header class="ftop">
          <span class="fbrand">${esc(H.name)}</span>
          <nav class="ftoc">${stops.map((s, k) => `<button type="button" data-go="${k}"><b>${pad(k + 1)}</b> ${esc(s.label)}</button>`).join("")}</nav>
          <span class="fright"><button class="pill" type="button" data-lang>${vi ? "EN" : "VI"}</button><button class="pill flist" type="button" data-list>${esc(L.list)}</button></span>
        </header>
        ${stops.map((s, k) => `<section class="ov${s.hero ? " ov-hero" : ""}" id="${s.id}" aria-hidden="true">${overlay(s, k)}</section>`).join("")}
        <p class="fcue"><span class="fcue-txt"></span></p>
        <div class="fticks">${stops.map((_, k) => `<i style="left:${(k / (N - 1)) * 100}%"></i>`).join("")}<b class="fneedle"></b></div>
      </div>`;
    shots = [...bench.querySelectorAll(".shot")];
    ovs = [...bench.querySelectorAll(".ov")];
    chips = [...bench.querySelectorAll(".ftoc button")];
    bench._L = L;
    lastC = -1;
    frame();
  }

  // vị trí máy quay c (0..N-1) từ tiến độ cuộn: đứng yên ở mỗi trạm, di chuyển mượt ở giữa
  function camera() {
    const top = bench.getBoundingClientRect().top + window.scrollY;
    const len = bench.offsetHeight - window.innerHeight;
    const p = clamp((window.scrollY - top) / Math.max(1, len), 0, 1);
    const x = p * (N - 1);
    const k = Math.min(Math.floor(x), N - 2);
    const f = x - k;
    return { p, x, c: k + smooth((f - REST) / MOVE) };
  }

  const small = () => window.innerWidth < 700;

  function frame() {
    ticking = false;
    if (!root.classList.contains("film") || !N) return;
    const { p, x, c } = camera();
    if (Math.abs(c - lastC) < 1e-4 && bench._p === p) return;
    lastC = c; bench._p = p;
    const blurMax = small() ? 0 : 7;
    shots.forEach((el, j) => {
      const d = c - j;
      if (d <= -1 || d >= 1.001) { el.style.opacity = 0; el.style.visibility = "hidden"; return; }
      el.style.visibility = "visible";
      el.style.opacity = d < 0 ? smooth(1 + d) : 1;
      const drift = clamp(x - j, -0.6, 0.6) * 0.03;           // trôi rất chậm khi đứng ở trạm
      const s = 1.06 + Math.abs(d) * 0.08 - drift;
      el.style.transform = `translate3d(${(-d * 7).toFixed(3)}%,0,0) scale(${s.toFixed(4)})`;
      el.style.filter = blurMax ? `blur(${Math.min(Math.abs(d) * 14, blurMax).toFixed(2)}px)` : "none";
    });
    ovs.forEach((el, j) => {
      const d = c - j;
      const o = clamp(1 - Math.abs(d) * 3.2, 0, 1);
      el.style.opacity = o;
      el.style.transform = `translate3d(0,${(d * -48).toFixed(1)}px,0)`;
      const live = o > 0.6;
      el.classList.toggle("live", live);
      el.setAttribute("aria-hidden", live ? "false" : "true");
    });
    const near = Math.round(c);
    chips.forEach((b, k) => b.classList.toggle("on", k === near));
    const moving = Math.abs(c - near) > 0.04;
    const cue = bench.querySelector(".fcue");
    const L = bench._L;
    if (near === 0 && !moving) { cue.firstChild.textContent = L.scroll + " ↓"; cue.classList.add("show"); }
    else if (moving || c < N - 1.5) {
      const nx = Math.min(N - 1, Math.floor(c) + 1);
      cue.firstChild.textContent = moving ? `${L.next} ${String(nx + 1).padStart(2, "0")} · ${stops[nx].label}` : "";
      cue.classList.toggle("show", moving);
    } else cue.classList.remove("show");
    bench.querySelector(".fneedle").style.left = (p * 100).toFixed(2) + "%";
  }
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };

  function goTo(k) {
    const top = bench.getBoundingClientRect().top + window.scrollY;
    const len = bench.offsetHeight - window.innerHeight;
    // tới đúng lúc máy quay đã dừng ở trạm k
    const x = k === 0 ? 0 : k - 1 + REST + MOVE + 0.05;
    window.scrollTo({ top: top + (Math.min(x, N - 1) / (N - 1)) * len, behavior: "smooth" });
  }

  bench.addEventListener("click", (e) => {
    const c = e.target.closest(".fcard"); if (c) { location.hash = c.dataset.id; return; }
    const g = e.target.closest("[data-go]"); if (g) { goTo(+g.dataset.go); return; }
    if (e.target.closest("[data-lang]")) { window.KS.setLang(window.KS.lang === "vi" ? "en" : "vi"); return; }
    if (e.target.closest("[data-list]")) { store.set("ks-view", "list"); root.classList.remove("film"); window.scrollTo(0, 0); }
  });

  const toFilm = document.getElementById("to-film");
  if (toFilm) toFilm.addEventListener("click", () => { store.set("ks-view", "film"); root.classList.add("film"); window.scrollTo(0, 0); lastC = -1; req(); });

  window.addEventListener("scroll", req, { passive: true });
  window.addEventListener("resize", () => { lastC = -1; req(); });
  document.addEventListener("ks:render", () => {
    const y = window.scrollY;
    build();
    window.scrollTo(0, y);
  });
  if (window.KS) build();
})();
