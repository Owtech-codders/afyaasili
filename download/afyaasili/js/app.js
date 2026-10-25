/* =====================================================================
   AFYAASILI — MANTIKI YA TOVUTI / WEBSITE LOGIC
   Hakuna cha kuhariri hapa kwa kawaida — badilisha taarifa kwenye
   js/data.js. / Normally nothing to edit here — change data in js/data.js
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- Vyombo vya msaada / Helpers ---------- */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var STORAGE_LANG = "afyaasili_lang";
  var STORAGE_CART = "afyaasili_cart";
  var PLACEHOLDER = "img/placeholder.svg";

  var state = {
    lang: "sw",
    cart: {},        // { productId: qty }
    search: "",
    category: "all",
    currentProduct: null,
  };

  function t(key) {
    var lang = TEXT[state.lang] || TEXT.en;
    return lang[key] !== undefined ? lang[key] : (TEXT.en[key] !== undefined ? TEXT.en[key] : key);
  }

  function fmt(n) {
    return SITE.currency + " " + Number(n).toLocaleString("en-US");
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function store(key, val) {
    try {
      if (val === undefined) return JSON.parse(localStorage.getItem(key));
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) { /* private mode n.k. */ }
    return undefined;
  }

  function toast(msg, isError) {
    var el = $("#toast");
    var ico = el.querySelector("i");
    $("#toast-text").textContent = msg;
    if (isError) {
      ico.className = "fa-solid fa-circle-exclamation me-2";
      el.style.background = "#8c2f2a";
    } else {
      ico.className = "fa-solid fa-circle-check me-2";
      el.style.background = "";
    }
    el.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () { el.classList.remove("show"); }, 2600);
  }

  function productById(id) {
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
    return null;
  }

  function catLabel(catId) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === catId) return CATEGORIES[i].label[state.lang] || CATEGORIES[i].label.en;
    }
    return catId;
  }

  /* ---------- Lugha / Language ---------- */
  function detectLanguage() {
    var saved = store(STORAGE_LANG);
    if (saved === "sw" || saved === "en") return saved;
    var langs = [];
    if (navigator.languages) langs = langs.concat(navigator.languages);
    if (navigator.language) langs.push(navigator.language);
    if (navigator.userLanguage) langs.push(navigator.userLanguage);
    for (var i = 0; i < langs.length; i++) {
      if (/^sw/i.test(langs[i])) return "sw";
    }
    return "en";
  }

  function updateLangButtons() {
    var sw = $("#lang-sw"), en = $("#lang-en");
    sw.classList.toggle("active", state.lang === "sw");
    en.classList.toggle("active", state.lang === "en");
    sw.setAttribute("aria-pressed", state.lang === "sw");
    en.setAttribute("aria-pressed", state.lang === "en");
  }

  function setLang(lang, opts) {
    state.lang = lang === "en" ? "en" : "sw";
    document.documentElement.lang = state.lang;
    document.title = t("doc_title");
    updateLangButtons();
    applyTranslations();
    renderChips();
    renderProducts();
    renderOrder();
    if (opts && opts.save) store(STORAGE_LANG, state.lang);
    if (opts && opts.toast) toast(t("lang_switched"));
  }

  function applyTranslations() {
    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.getAttribute("data-i18n-html")); });
    $$("[data-i18n-ph]").forEach(function (el) { el.placeholder = t(el.getAttribute("data-i18n-ph")); });

    // Thamani zinazotoka kwenye SITE / values coming from SITE
    $$(".js-currency").forEach(function (el) { el.textContent = SITE.currency; });
    $$(".js-location").forEach(function (el) { el.textContent = SITE.location[state.lang] || SITE.location.en; });
    $$(".js-phone-display").forEach(function (el) { el.textContent = SITE.phoneDisplay; });
    $$(".js-email").forEach(function (el) { el.textContent = SITE.email; });

    var waLink = "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(t("wa_greeting"));
    $$('[data-js="wa"]').forEach(function (a) { a.href = waLink; });
    $$('[data-js="wa-float"]').forEach(function (a) { a.href = waLink; });
    $$('[data-js="tel"]').forEach(function (a) { a.href = "tel:" + SITE.phoneTel; });
    $$('[data-js="mailto"]').forEach(function (a) { a.href = "mailto:" + SITE.email; });
  }

  /* ---------- Bidhaa / Products ---------- */
  function filteredProducts() {
    var q = state.search.trim().toLowerCase();
    return PRODUCTS.filter(function (p) {
      if (state.category !== "all" && p.category !== state.category) return false;
      if (!q) return true;
      var hay = [
        p.name.sw, p.name.en, p.short.sw, p.short.en, p.description.sw, p.description.en,
      ].join(" ").toLowerCase();
      return hay.indexOf(q) !== -1;
    });
  }

  function cardHtml(p) {
    var img = p.images && p.images.length ? p.images[0] : PLACEHOLDER;
    var badge = p.badge
      ? '<span class="product-badge">' + escapeHtml(p.badge[state.lang] || p.badge.en) + "</span>"
      : "";
    var alt = escapeHtml(p.name[state.lang] || p.name.en);
    return (
      '<div class="col-6 col-lg-4 col-xl-3">' +
        '<article class="product-card">' +
          '<button type="button" class="product-img-btn" data-action="details" data-id="' + escapeHtml(p.id) + '" aria-label="' + alt + '">' +
            '<img src="' + img + '" alt="' + alt + '" class="product-img" loading="lazy" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\'">' +
            badge +
            '<span class="product-zoom-hint"><i class="fa-solid fa-expand" aria-hidden="true"></i></span>' +
          "</button>" +
          '<div class="product-body">' +
            '<span class="product-cat">' + escapeHtml(catLabel(p.category)) + "</span>" +
            '<h3 class="product-name">' + alt + "</h3>" +
            '<p class="product-short">' + escapeHtml(p.short[state.lang] || p.short.en) + "</p>" +
            '<div class="product-price-row">' +
              '<span class="product-price">' + fmt(p.price) + "</span>" +
              '<span class="product-pack">• ' + escapeHtml(p.pack[state.lang] || p.pack.en) + "</span>" +
            "</div>" +
            '<div class="product-actions">' +
              '<button type="button" class="btn btn-brand btn-add" data-action="add" data-id="' + escapeHtml(p.id) + '">' +
                '<i class="fa-solid fa-basket-shopping me-1" aria-hidden="true"></i><span data-i18n="add_to_order">' + t("add_to_order") + "</span>" +
              "</button>" +
              '<button type="button" class="btn btn-outline-brand" data-action="details" data-id="' + escapeHtml(p.id) + '" aria-label="' + t("view_details") + '">' +
                '<i class="fa-solid fa-eye" aria-hidden="true"></i>' +
              "</button>" +
            "</div>" +
          "</div>" +
        "</article>" +
      "</div>"
    );
  }

  function renderChips() {
    var wrap = $("#cat-chips");
    var html = '<button type="button" class="chip' + (state.category === "all" ? " active" : "") + '" data-cat="all">' + t("cat_all") + "</button>";
    CATEGORIES.forEach(function (c) {
      html += '<button type="button" class="chip' + (state.category === c.id ? " active" : "") + '" data-cat="' + escapeHtml(c.id) + '">' +
        escapeHtml(c.label[state.lang] || c.label.en) + "</button>";
    });
    wrap.innerHTML = html;
  }

  function renderProducts() {
    var list = filteredProducts();
    var grid = $("#products-grid");
    grid.innerHTML = list.map(cardHtml).join("");
    $("#products-empty").classList.toggle("d-none", list.length !== 0);
    var countEl = $("#results-count");
    countEl.textContent = list.length === 1
      ? t("results_one")
      : t("results_many").replace("{n}", list.length);
    observeReveals(grid);
  }

  /* ---------- Kikapu / Cart ---------- */
  function cartCount() {
    var n = 0;
    Object.keys(state.cart).forEach(function (id) {
      if (productById(id)) n += state.cart[id];
    });
    return n;
  }

  function cartTotal() {
    var sum = 0;
    Object.keys(state.cart).forEach(function (id) {
      var p = productById(id);
      if (p) sum += p.price * state.cart[id];
    });
    return sum;
  }

  function cartItems() {
    return Object.keys(state.cart)
      .map(function (id) {
        var p = productById(id);
        return p ? { p: p, qty: state.cart[id] } : null;
      })
      .filter(Boolean);
  }

  function saveCart() { store(STORAGE_CART, state.cart); }

  function addToCart(id, qty) {
    var p = productById(id);
    if (!p) return;
    qty = Math.max(1, parseInt(qty, 10) || 1);
    state.cart[id] = (state.cart[id] || 0) + qty;
    saveCart();
    renderOrder();
    toast(t("toast_added"));
  }

  function setCartQty(id, qty) {
    qty = parseInt(qty, 10);
    if (isNaN(qty) || qty < 1) qty = 1;
    if (qty > 999) qty = 999;
    state.cart[id] = qty;
    saveCart();
    renderOrder();
  }

  function removeFromCart(id) {
    delete state.cart[id];
    saveCart();
    renderOrder();
  }

  function clearCart() {
    state.cart = {};
    saveCart();
    renderOrder();
    toast(t("toast_cleared"));
  }

  function updateBadge() {
    var badge = $("#cart-badge");
    if (!badge) return;
    var n = cartCount();
    badge.textContent = n;
    badge.classList.toggle("d-none", n === 0);
  }

  function renderOrder() {
    var items = cartItems();
    var emptyEl = $("#order-empty");
    var wrapEl = $("#order-table-wrap");
    var tbody = $("#order-items");

    updateBadge();

    if (!items.length) {
      emptyEl.classList.remove("d-none");
      wrapEl.classList.add("d-none");
      tbody.innerHTML = "";
      return;
    }

    emptyEl.classList.add("d-none");
    wrapEl.classList.remove("d-none");

    tbody.innerHTML = items.map(function (it) {
      var name = it.p.name[state.lang] || it.p.name.en;
      var pack = it.p.pack[state.lang] || it.p.pack.en;
      var img = it.p.images && it.p.images.length ? it.p.images[0] : PLACEHOLDER;
      return (
        '<tr data-id="' + escapeHtml(it.p.id) + '">' +
          '<td><div class="d-flex align-items-center gap-2">' +
            '<img class="item-thumb" src="' + img + '" alt="' + escapeHtml(name) + '" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\'">' +
            '<span><span class="item-name d-block">' + escapeHtml(name) + "</span>" +
            '<span class="item-pack">' + escapeHtml(pack) + "</span></span>" +
          "</div></td>" +
          '<td class="text-end text-nowrap">' + fmt(it.p.price) + "</td>" +
          '<td><div class="qty-stepper d-inline-flex align-items-center mx-auto">' +
            '<button type="button" class="qty-btn" data-action="dec" aria-label="-"><i class="fa-solid fa-minus" aria-hidden="true"></i></button>' +
            '<input type="text" inputmode="numeric" class="qty-input cart-qty" value="' + it.qty + '" aria-label="' + t("m_qty") + '">' +
            '<button type="button" class="qty-btn" data-action="inc" aria-label="+"><i class="fa-solid fa-plus" aria-hidden="true"></i></button>' +
          "</div></td>" +
          '<td class="text-end text-nowrap fw-semibold">' + fmt(it.p.price * it.qty) + "</td>" +
          '<td class="text-end"><button type="button" class="btn btn-sm btn-link text-danger p-0" data-action="remove" aria-label="' + t("o_clear") + '">' +
            '<i class="fa-regular fa-trash-can" aria-hidden="true"></i></button></td>' +
        "</tr>"
      );
    }).join("");

    $("#order-total").textContent = Number(cartTotal()).toLocaleString("en-US");
  }

  /* ---------- Ujumbe wa oda / Order message ---------- */
  function buildOrderMessage() {
    var items = cartItems();
    var lines = [t("order_msg_intro")];
    items.forEach(function (it, idx) {
      lines.push(t("order_msg_item")
        .replace("{i}", idx + 1)
        .replace("{name}", it.p.name[state.lang] || it.p.name.en)
        .replace("{qty}", it.qty)
        .replace("{total}", fmt(it.p.price * it.qty)));
    });
    lines.push(t("order_msg_total").replace("{total}", fmt(cartTotal())));
    lines.push(t("order_msg_details"));

    var name = $("#form-name").value.trim();
    var phone = $("#form-phone").value.trim();
    var area = $("#form-area").value.trim();
    var notes = $("#form-notes").value.trim();

    lines.push(t("order_msg_name").replace("{v}", name));
    if (phone) lines.push(t("order_msg_phone").replace("{v}", phone));
    if (area) lines.push(t("order_msg_area").replace("{v}", area));
    if (notes) lines.push(t("order_msg_notes").replace("{v}", notes));
    lines.push(t("order_msg_thanks"));
    return lines.join("\n");
  }

  function validateOrder() {
    if (!cartItems().length) {
      toast(t("err_empty_cart"), true);
      return null;
    }
    var nameInput = $("#form-name");
    var name = nameInput.value.trim();
    if (!name) {
      nameInput.classList.add("is-invalid");
      nameInput.focus();
      toast(t("err_name"), true);
      return null;
    }
    nameInput.classList.remove("is-invalid");
    return true;
  }

  function sendViaWhatsApp() {
    if (!validateOrder()) return;
    var msg = buildOrderMessage();
    var url = "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
    toast(t("toast_wa"));
  }

  function sendViaEmail() {
    if (!validateOrder()) return;
    var msg = buildOrderMessage();
    var subject = t("email_subject") + " — " + $("#form-name").value.trim();
    var url = "mailto:" + SITE.email +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(msg);
    window.location.href = url;
    toast(t("toast_email"));
  }

  /* ---------- Dirisha la bidhaa / Product modal ---------- */
  function openProduct(id) {
    var p = productById(id);
    if (!p) return;
    state.currentProduct = p;
    state.modalQty = 1;
    $("#pm-qty").value = "1";

    $("#pmName").textContent = p.name[state.lang] || p.name.en;
    $("#pm-cat").textContent = catLabel(p.category);
    $("#pm-price").textContent = Number(p.price).toLocaleString("en-US");
    $("#pm-pack").textContent = p.pack[state.lang] || p.pack.en;
    $("#pm-desc").textContent = p.description[state.lang] || p.description.en;

    var imgs = p.images && p.images.length ? p.images : [PLACEHOLDER];
    var inner = $("#pm-carousel-inner");
    inner.innerHTML = imgs.map(function (src, i) {
      return '<div class="carousel-item' + (i === 0 ? " active" : "") + '">' +
        '<img src="' + src + '" alt="' + escapeHtml(p.name[state.lang] || p.name.en) + ' ' + (i + 1) + '" ' +
        'onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\'"></div>';
    }).join("");

    var carouselEl = $("#pmCarousel");
    var many = imgs.length > 1;
    $(".carousel-control-prev", carouselEl).classList.toggle("d-none", !many);
    $(".carousel-control-next", carouselEl).classList.toggle("d-none", !many);
    var inst = bootstrap.Carousel.getInstance(carouselEl);
    if (inst) inst.dispose();
    bootstrap.Carousel.getOrCreateInstance(carouselEl, { ride: false, interval: false });

    bootstrap.Modal.getOrCreateInstance($("#productModal")).show();
  }

  /* ---------- Navbar ---------- */
  function updateNavbar() {
    var nav = $("#mainNav");
    var menuOpen = $("#navMenu").classList.contains("show");
    nav.classList.toggle("scrolled", window.scrollY > 30 || menuOpen);
  }

  /* ---------- Reveal animation ---------- */
  var revealObserver = null;
  function observeReveals(ctx) {
    var els = $$(".reveal", ctx || document).concat($$(".product-card", ctx || document));
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
    }
    els.forEach(function (el) {
      if (!el.classList.contains("visible")) {
        el.classList.add("reveal");
        revealObserver.observe(el);
      }
    });
  }

  /* ---------- Matukio / Events ---------- */
  function bindEvents() {
    // Lugha / language
    $("#lang-sw").addEventListener("click", function () { setLang("sw", { save: true, toast: true }); });
    $("#lang-en").addEventListener("click", function () { setLang("en", { save: true, toast: true }); });

    // Search (menyu + sehemu ya bidhaa zinafanana / both inputs stay in sync)
    var sNav = $("#searchNav"), sSec = $("#searchSection");
    function onSearch(value, other) {
      state.search = value;
      other.value = value;
      renderProducts();
    }
    sNav.addEventListener("input", function () { onSearch(sNav.value, sSec); });
    sSec.addEventListener("input", function () { onSearch(sSec.value, sNav); });
    $("#search-form").addEventListener("submit", function (e) {
      e.preventDefault();
      document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    });

    // Vichujio vya makundi / category chips
    $("#cat-chips").addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      state.category = chip.getAttribute("data-cat");
      renderChips();
      renderProducts();
    });

    // Vitufe vya bidhaa / product card actions
    $("#products-grid").addEventListener("click", function (e) {
      var btn = e.target.closest("[data-action]");
      if (!btn) return;
      var id = btn.getAttribute("data-id");
      if (btn.getAttribute("data-action") === "add") addToCart(id, 1);
      else openProduct(id);
    });

    // Meza ya oda / order table actions
    $("#order-items").addEventListener("click", function (e) {
      var btn = e.target.closest("[data-action]");
      if (!btn) return;
      var tr = btn.closest("tr");
      var id = tr.getAttribute("data-id");
      var action = btn.getAttribute("data-action");
      var input = tr.querySelector(".cart-qty");
      if (action === "inc") setCartQty(id, (parseInt(input.value, 10) || 1) + 1);
      else if (action === "dec") setCartQty(id, (parseInt(input.value, 10) || 2) - 1);
      else if (action === "remove") removeFromCart(id);
    });
    $("#order-items").addEventListener("change", function (e) {
      if (e.target.classList.contains("cart-qty")) {
        setCartQty(e.target.closest("tr").getAttribute("data-id"), e.target.value);
      }
    });
    $("#btn-clear").addEventListener("click", clearCart);

    // Kutuma oda / send order
    $("#btn-send-wa").addEventListener("click", sendViaWhatsApp);
    $("#btn-send-email").addEventListener("click", sendViaEmail);
    $("#form-name").addEventListener("input", function () { this.classList.remove("is-invalid"); });

    // Dirisha la bidhaa / modal
    $("#pm-minus").addEventListener("click", function () {
      var v = parseInt($("#pm-qty").value, 10) || 2;
      $("#pm-qty").value = Math.max(1, v - 1);
    });
    $("#pm-plus").addEventListener("click", function () {
      var v = parseInt($("#pm-qty").value, 10) || 0;
      $("#pm-qty").value = Math.min(999, v + 1);
    });
    $("#pm-qty").addEventListener("input", function () {
      this.value = this.value.replace(/[^\d]/g, "");
    });
    $("#pm-add").addEventListener("click", function () {
      if (!state.currentProduct) return;
      var qty = parseInt($("#pm-qty").value, 10) || 1;
      addToCart(state.currentProduct.id, qty);
      var modalEl = $("#productModal");
      setTimeout(function () {
        bootstrap.Modal.getOrCreateInstance(modalEl).hide();
      }, 350);
    });

    // Navbar: mandharinyuma + kufunga menyu kwenye simu / scroll state + close on click
    window.addEventListener("scroll", updateNavbar, { passive: true });
    var navMenu = $("#navMenu");
    ["shown.bs.collapse", "hidden.bs.collapse"].forEach(function (evt) {
      navMenu.addEventListener(evt, updateNavbar);
    });
    $$("#navMenu .nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        if (navMenu.classList.contains("show")) {
          bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
        }
      });
    });

    // Animations za kuingia / reveal on scroll
    observeReveals(document);
  }

  /* ---------- Anza / Init ---------- */
  function init() {
    state.cart = store(STORAGE_CART) || {};
    if (typeof state.cart !== "object" || !state.cart) state.cart = {};

    $("#year").textContent = new Date().getFullYear();
    setLang(detectLanguage(), { save: false, toast: false });
    bindEvents();
    updateNavbar();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
