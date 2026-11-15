(function () {
  const STYLES = window.STYLES || [];
  const CATS = window.CATEGORIES || [];
  const $ = (s, r = document) => r.querySelector(s);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  let activeCat = "all";
  let query = "";
  let topic = store.get("xpc-topic") || "";

  // ---- theme ----
  const savedTheme = store.get("xpc-theme");
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  $("#theme").addEventListener("click", () => {
    const dark = document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    store.set("xpc-theme", next);
  });

  // ---- procedural thumbnail when a style has no image ----
  function motifSVG(st, w = 400, h = 300) {
    const [bg, a, b, c] = st.palette;
    const seed = [...st.id].reduce((n, ch) => (n * 31 + ch.charCodeAt(0)) >>> 0, 7);
    let r = seed;
    const rnd = () => ((r = (r * 1664525 + 1013904223) >>> 0) / 4294967296);
    let g = "";
    switch (st.motif) {
      case "dots":
        for (let y = 10; y < h; y += 18) for (let x = 10; x < w; x += 18) {
          const s = 2 + 6 * (x / w) * (1 - y / h) + rnd() * 1.5;
          g += `<circle cx="${x}" cy="${y}" r="${s.toFixed(1)}" fill="${a}"/>`;
        }
        g += `<rect x="40" y="60" width="160" height="120" fill="${c}" stroke="${a}" stroke-width="6"/><rect x="220" y="110" width="140" height="150" fill="${b}" stroke="${a}" stroke-width="6"/>`;
        break;
      case "stripes":
        for (let y = 0; y < h; y += 6) g += `<rect x="0" y="${y}" width="${w}" height="2" fill="${a}" opacity="${(0.08 + rnd() * 0.12).toFixed(2)}"/>`;
        g += `<rect x="0" y="${h * 0.55}" width="${w}" height="${h * 0.45}" fill="${b}" opacity=".55"/><circle cx="${w * 0.68}" cy="${h * 0.5}" r="62" fill="${c}"/>`;
        for (let i = 0; i < 5; i++) g += `<rect x="${rnd() * w}" y="0" width="1.5" height="${h}" fill="${c}" opacity=".35"/>`;
        break;
      case "waves":
        for (let i = 0; i < 9; i++) {
          const y = h * 0.45 + i * 18;
          g += `<path d="M0 ${y} Q ${w * 0.25} ${y - 14} ${w * 0.5} ${y} T ${w} ${y}" fill="none" stroke="${i % 2 ? c : a}" stroke-width="5" opacity=".75"/>`;
        }
        g += `<path d="M120 120 L200 70 L280 120 Z" fill="${b}"/><rect x="140" y="120" width="120" height="50" fill="${b}" opacity=".8"/>`;
        break;
      case "grid":
        for (let x = 0; x < w; x += 20) g += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${a}" stroke-width="1" opacity=".18"/>`;
        for (let y = 0; y < h; y += 20) g += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${a}" stroke-width="1" opacity=".18"/>`;
        g += `<circle cx="150" cy="120" r="22" fill="none" stroke="${a}" stroke-width="5"/><path d="M150 142 L150 210 M150 165 L115 190 M150 165 L190 150 M150 210 L125 255 M150 210 L178 255" stroke="${a}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
        g += `<path d="M215 120 C 260 80, 320 90, 340 140" stroke="${b}" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="330" cy="200" r="30" fill="${c}" opacity=".9"/>`;
        break;
      case "pixel": {
        const s = 20;
        for (let y = 0; y < h; y += s) for (let x = 0; x < w; x += s) {
          const t = rnd();
          const col = y > h * 0.6 ? (t < 0.6 ? b : a) : t < 0.06 ? c : t < 0.12 ? a : null;
          if (col) g += `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${col}"/>`;
        }
        g += `<rect x="180" y="140" width="40" height="40" fill="${c}"/><rect x="190" y="120" width="20" height="20" fill="${c}"/>`;
        break;
      }
      case "rays":
        for (let i = 0; i < 18; i++) {
          const ang = (i / 18) * Math.PI * 2;
          g += `<path d="M${w / 2} ${h * 0.62} L${w / 2 + Math.cos(ang) * 500} ${h * 0.62 + Math.sin(ang) * 500} L${w / 2 + Math.cos(ang + 0.12) * 500} ${h * 0.62 + Math.sin(ang + 0.12) * 500} Z" fill="${i % 2 ? a : c}" opacity=".22"/>`;
        }
        g += `<circle cx="${w / 2}" cy="${h * 0.62}" r="58" fill="${a}"/><circle cx="${w / 2 - 20}" cy="${h * 0.58}" r="10" fill="${bg}"/><circle cx="${w / 2 + 20}" cy="${h * 0.58}" r="10" fill="${bg}"/>`;
        break;
      case "circles":
        for (let i = 0; i < 9; i++) {
          g += `<circle cx="${(rnd() * w).toFixed(0)}" cy="${(rnd() * h).toFixed(0)}" r="${(30 + rnd() * 70).toFixed(0)}" fill="${[a, b, c][i % 3]}" opacity="${(0.25 + rnd() * 0.45).toFixed(2)}"/>`;
        }
        break;
      default: // paper
        for (let i = 0; i < 120; i++) g += `<circle cx="${(rnd() * w).toFixed(0)}" cy="${(rnd() * h).toFixed(0)}" r="${(rnd() * 1.6).toFixed(1)}" fill="${a}" opacity=".25"/>`;
        g += `<rect x="60" y="70" width="${w - 120}" height="${h - 140}" fill="none" stroke="${a}" stroke-width="4"/><circle cx="${w / 2}" cy="${h / 2}" r="44" fill="${a}"/><circle cx="${w / 2}" cy="${h / 2}" r="22" fill="${c}"/>`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice"><rect width="100%" height="100%" fill="${bg}"/>${g}</svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  const thumbOf = (st) => st.image || motifSVG(st);

  // ---- prompts ----
  const fill = (tpl) => tpl.replaceAll("{chu_de}", topic.trim() || "[chủ đề của bạn]");
  const fillHTML = (tpl) =>
    esc(tpl).replaceAll("{chu_de}", `<mark>${esc(topic.trim() || "[chủ đề của bạn]")}</mark>`);

  // ---- filter chips ----
  const chips = $("#chips");
  const chipData = [{ id: "all", name: "Tất cả" }, ...CATS];
  chips.innerHTML = chipData
    .map((c) => `<button class="chip" role="tab" data-cat="${c.id}" aria-selected="${c.id === activeCat}">${esc(c.name)}</button>`)
    .join("");
  chips.addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    activeCat = b.dataset.cat;
    chips.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-selected", x === b));
    render();
  });

  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
  function matches(st) {
    if (activeCat !== "all" && st.cat !== activeCat) return false;
    if (!query) return true;
    const hay = norm([st.name, st.en, st.tagline, st.desc, ...(st.suits || [])].join(" "));
    return norm(query).split(/\s+/).every((w) => hay.includes(w));
  }

  // ---- grid ----
  function render() {
    const root = $("#stations");
    const list = STYLES.filter(matches);
    $("#count").textContent = `${STYLES.length} phong cách · ${CATS.length} nhóm`;
    if (!list.length) {
      root.innerHTML = `<p class="empty">Không có phong cách nào khớp “${esc(query)}”.</p>`;
      return;
    }
    root.innerHTML = CATS.map((cat, i) => {
      const items = list.filter((s) => s.cat === cat.id);
      if (!items.length) return "";
      return `<section class="station" id="tram-${cat.id}">
        <div class="station-head"><span class="station-no">Trạm ${String(i + 1).padStart(2, "0")}</span><h2>${esc(cat.name)}</h2><p>${esc(cat.note)}</p></div>
        <div class="grid">${items.map(cardHTML).join("")}</div></section>`;
    }).join("");
  }
  function cardHTML(st) {
    return `<button class="card" type="button" data-id="${st.id}" aria-label="Xem phong cách ${esc(st.name)}">
      <img class="thumb" src="${thumbOf(st)}" alt="" loading="lazy">
      <div class="card-body"><h3>${esc(st.name)}</h3><div class="en">${esc(st.en)}</div><p class="tag">${esc(st.tagline)}</p>
      <div class="swatches">${st.palette.map((c) => `<i style="background:${c}"></i>`).join("")}</div></div></button>`;
  }
  $("#stations").addEventListener("click", (e) => {
    const c = e.target.closest(".card");
    if (c) location.hash = c.dataset.id;
  });

  // ---- detail panel ----
  const panel = $("#panel");
  let lastFocus = null;
  function openPanel(st) {
    lastFocus = document.activeElement;
    $("#p-body").innerHTML = `
      <img class="p-hero" src="${thumbOf(st)}" alt="Ảnh mẫu phong cách ${esc(st.name)}">
      <div class="p-content">
        <h2 id="p-title">${esc(st.name)}</h2>
        <div class="en">${esc(st.en)} · ${esc((CATS.find((c) => c.id === st.cat) || {}).name || "")}</div>
        <p class="p-desc">${esc(st.desc)}</p>
        <ul class="suits">${(st.suits || []).map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        <div class="block"><div class="block-head"><h4>Lời nhắc vẽ ảnh</h4><button class="copy" data-copy="imagePrompt">Sao chép</button></div>
          <pre class="prompt" data-tpl="imagePrompt">${fillHTML(st.imagePrompt)}</pre></div>
        <div class="block"><div class="block-head"><h4>Lời nhắc tạo video (ảnh → video)</h4><button class="copy" data-copy="videoPrompt">Sao chép</button></div>
          <pre class="prompt">${fillHTML(st.videoPrompt)}</pre></div>
        ${st.tips && st.tips.length ? `<div class="block"><div class="block-head"><h4>Mẹo</h4></div><ul class="tips">${st.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>` : ""}
        <div class="block"><div class="block-head"><h4>Bảng màu</h4></div>
          <div class="palette-row">${st.palette.map((c) => `<button data-color="${c}" title="Sao chép mã màu"><i style="background:${c}"></i>${c}</button>`).join("")}</div></div>
        ${topic.trim() ? "" : `<p class="tips" style="margin-top:18px;padding:0">Gõ chủ đề ở ô trên cùng trang để lời nhắc tự điền.</p>`}
      </div>`;
    panel.dataset.id = st.id;
    panel.hidden = false;
    document.body.style.overflow = "hidden";
    $(".close", panel).focus();
  }
  function closePanel() {
    panel.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  panel.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) { history.pushState("", document.title, location.pathname + location.search); closePanel(); return; }
    const cp = e.target.closest("[data-copy]");
    if (cp) { const st = STYLES.find((s) => s.id === panel.dataset.id); copy(fill(st[cp.dataset.copy]), "Đã sao chép lời nhắc"); }
    const col = e.target.closest("[data-color]");
    if (col) copy(col.dataset.color, "Đã sao chép " + col.dataset.color);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) { history.pushState("", document.title, location.pathname + location.search); closePanel(); }
  });
  function route() {
    const id = decodeURIComponent(location.hash.slice(1));
    const st = STYLES.find((s) => s.id === id);
    if (st) openPanel(st); else if (!panel.hidden) closePanel();
  }
  window.addEventListener("hashchange", route);

  // ---- copy + toast ----
  let tt;
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 1600); }
  function copy(text, msg) {
    const done = () => toast(msg);
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, () => fallback(text, done));
    else fallback(text, done);
  }
  function fallback(text, done) {
    const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { toast("Không sao chép được, hãy chọn và sao chép tay"); }
    ta.remove();
  }

  // ---- inputs ----
  const topicEl = $("#topic");
  topicEl.value = topic;
  topicEl.addEventListener("input", () => {
    topic = topicEl.value; store.set("xpc-topic", topic);
    if (!panel.hidden) { const st = STYLES.find((s) => s.id === panel.dataset.id); if (st) openPanel(st); topicEl.focus(); }
  });
  $("#search").addEventListener("input", (e) => { query = e.target.value.trim(); render(); });

  render();
  route();
})();
