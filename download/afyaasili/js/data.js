/* =====================================================================
   AFYAASILI — FAILI YA TAARIFA (HARIRI HAPA)
   AFYAASILI — DATA FILE (EDIT HERE)
   =====================================================================
   Kituo kimoja cha kubadilisha KILA KITU kwenye tovuti:
   The single place to change EVERYTHING on the website:

     1. SITE      → jina, namba ya WhatsApp/simu, barua pepe, eneo, sarafu
     2. CATEGORIES→ makundi ya bidhaa
     3. PRODUCTS  → bidhaa, picha, maelezo, bei (ongeza/futa bure)
     4. TEXT      → tafsiri zote (Kiswahili "sw" na English "en")

   MUHIMU / IMPORTANT:
   - Bidhaa, picha, bei na maelezo hapa chini ni MIFANO ya onyesho tu.
     The products, images, prices and descriptions below are SAMPLES only.
   - BFSUMA lazima iyabadilishe kwa taarifa sahihi kabla ya tovuti
     kuchapishwa / must replace them with accurate info before going live.
   - Usiweke madai ya kitabibu au matibabu kwenye maelezo.
     Do not add medical or treatment claims to the descriptions.
   - Picha: weka faili zako kwenye folda img/products/ kisha badilisha
     jina la faili hapa chini. / Put your own files in img/products/
     and update the filenames below.
   ===================================================================== */

/* ---------- 1. TAARIFA ZA KAMPUNI / COMPANY INFO ---------- */
const SITE = {
  name: "AfyaAsili",
  owner: "BFSUMA",

  // Namba ya WhatsApp kwa mfumo wa kimataifa, bila "+" na bila "0" mwanzoni.
  // WhatsApp number in international format (Tanzania 0697... => 255697...).
  // Mfano kama namba ni Kenyan: 0712345678 => 254712345678
  whatsapp: "255697415257",

  // Namba itakayoonekana kwenye tovuti (mfumo wa ndani).
  // Phone number displayed on the website.
  phoneDisplay: "0697 415 257",

  // Link ya kupiga simu (tel:). / Click-to-call link.
  phoneTel: "+255697415257",

  // Barua pepe ya kupokea oda na maswali. / Email for orders and questions.
  email: "mafurudaniel99@gmail.com",

  // Eneo la kampuni — andika eneo halisi lililotolewa na BFSUMA.
  // Company location — replace with the real location provided by BFSUMA.
  location: { sw: "Afrika Mashariki", en: "East Africa" },

  // Sarafu ya bei. / Currency shown before prices.
  currency: "TZS",
};

/* ---------- 2. MAKUNDI YA BIDHAA / PRODUCT CATEGORIES ---------- */
const CATEGORIES = [
  { id: "supplements", label: { sw: "Virutubisho",        en: "Supplements" } },
  { id: "teas",        label: { sw: "Chai za Asili",      en: "Herbal Teas" } },
  { id: "oils",        label: { sw: "Mafuta ya Asili",    en: "Natural Oils" } },
  { id: "honey_gels",  label: { sw: "Asali na Gel za Asili", en: "Honey & Gels" } },
];

/* ---------- 3. BIDHAA / PRODUCTS ----------
   - id:        laitabirika, usirudie id ileile / unique, never duplicate
   - category:  lazima iwe mojawapo ya CATEGORIES hapo juu / must match above
   - price:     namba (bila koma) / number only
   - images:    picha 1 au zaidi kwa kila bidhaa (img/products/...)
   - badge:     lebo ndogo (au null kama haitaki) / small label (or null)
   - name / short / description: kila moja ina "sw" na "en"
*/
const PRODUCTS = [
  {
    id: "moringa-powder",
    category: "supplements",
    price: 8000,
    pack: { sw: "Gramu 250", en: "250 g" },
    images: ["img/products/moringa-powder-1.jpg", "img/products/moringa-powder-2.jpg"],
    badge: { sw: "Maarufu", en: "Popular" },
    name: { sw: "Unga wa Majani ya Moringa", en: "Moringa Leaf Powder" },
    short: {
      sw: "Unga safi wa majani ya moringa yaliyokaushwa hewani, bila viongeza.",
      en: "Pure powder from carefully dried moringa leaves, with no additives.",
    },
    description: {
      sw: "Unga wa majani ya moringa yaliyovunwa na kukaushwa kwa makini, bila rangi wala vihifadhizi. Unaweza kuchanganywa na uji, juisi, mtindi au supu kama sehemu ya lishe ya kila siku. Anza kwa kijiti kimoja kwa siku na ongeza taratibu kwa mapendeleo yako.",
      en: "Moringa leaves, carefully harvested and dried, ground into a fine powder with no added colours or preservatives. Mix it into porridge, juice, yoghurt or soup as part of your daily diet. Start with one teaspoon a day and adjust gradually to your preference.",
    },
  },
  {
    id: "moringa-capsules",
    category: "supplements",
    price: 12000,
    pack: { sw: "Kapsuli 60", en: "60 capsules" },
    images: ["img/products/moringa-capsules-1.jpg", "img/products/moringa-capsules-2.jpg"],
    badge: null,
    name: { sw: "Kapsuli za Moringa", en: "Moringa Capsules" },
    short: {
      sw: "Kapsuli 60 za unga wa moringa safi kwa wale wanaopenda urahisi.",
      en: "60 capsules of pure moringa powder for those who prefer convenience.",
    },
    description: {
      sw: "Kapsuli rahisi za kumeza zilizojazwa kwa unga wa majani ya moringa safi, bila viongeza. Zinafaa kwa watu wenye ratiba ya haraka wanaotaka kuingiza moringa katika siku zao bila fueko. Maelezo ya kiasi cha matumizi yatasasishwa na BFSUMA.",
      en: "Easy-to-swallow capsules filled with pure moringa leaf powder and nothing else. Ideal for busy people who want to include moringa in their day without the mixing. Usage guidance will be updated by BFSUMA.",
    },
  },
  {
    id: "raw-honey",
    category: "honey_gels",
    price: 15000,
    pack: { sw: "Gramu 500", en: "500 g" },
    images: ["img/products/honey-1.jpg", "img/products/honey-2.jpg"],
    badge: { sw: "Mpya", en: "New" },
    name: { sw: "Asali Safi ya Nyuki", en: "Pure Raw Honey" },
    short: {
      sw: "Asali iliyovunwa moja kwa moja kutoka kwenye nyuki wa msituni, isiyochezwa.",
      en: "Honey extracted straight from the hive, unprocessed.",
    },
    description: {
      sw: "Asali asili iliyovunwa na kuchujwa kwa uvivu mkubwa ili kuhifadhi ladha yake ya kawaida. Ni nzuri kwa chai, mkate au matumizi ya jikoni kwa ujumla. Chanzo na msimu wa kuvuna hubadilika, hivyo rangi na ladha zinaweza kutofautiana kidogo kila kifurushi.",
      en: "Raw natural honey, gently extracted and strained to keep its familiar taste. Lovely with tea, bread or everyday cooking. Source and harvest season vary, so colour and taste may differ slightly from batch to batch.",
    },
  },
  {
    id: "ginger-tea",
    category: "teas",
    price: 6500,
    pack: { sw: "Viejia 20", en: "20 sachets" },
    images: ["img/products/ginger-tea-1.jpg", "img/products/ginger-tea-2.jpg"],
    badge: null,
    name: { sw: "Chai ya Tangawizi na Limao", en: "Ginger & Lemon Herbal Tea" },
    short: {
      sw: "Mchanganyo wa tangawizi, giligani na limao kwa kikombe cha kupumzika.",
      en: "A blend of ginger, lemongrass and lemon for a relaxing cup.",
    },
    description: {
      sw: "Chai ya viambajengo inayounganisha tangawizi iliyokaushwa, giligani na ladha kidogo ya limao. Tumia kijiko cha chai kwenye maji ya moto kwa dakika tano, kisha chuja na utamu kwa asali kadiri unavyopenda. Kifurushi kina viejia 20 vilivyofungwa kimoja kimoja.",
      en: "A herbal infusion combining dried ginger, lemongrass and a hint of lemon. Steep one teaspoon in hot water for five minutes, strain, then sweeten with honey to your taste. Each pack contains 20 individually wrapped sachets.",
    },
  },
  {
    id: "hibiscus-tea",
    category: "teas",
    price: 6000,
    pack: { sw: "Gramu 50", en: "50 g" },
    images: ["img/products/hibiscus-tea-1.jpg", "img/products/hibiscus-tea-2.jpg"],
    badge: null,
    name: { sw: "Chai ya Dafra (Hibiscus)", en: "Hibiscus Tea" },
    short: {
      sw: "Maua ya dafra makavu yenye rangi ya ruby na ladha ya kupendeza.",
      en: "Dried hibiscus flowers with a ruby colour and pleasant taste.",
    },
    description: {
      sw: "Maua ya dafra (hibiscus) makavu yaliyochaguliwa kwa makini, yanayotoa chai ya rangi ya ruby inayofurahika moto au baridi. Wachemsha kwa dakika tano, kisha utamu kwa asali au nongwa. Wigo: gramu 50.",
      en: "Carefully selected dried hibiscus flowers that brew into a ruby-red infusion, enjoyable hot or iced. Simmer for five minutes, then sweeten with honey or sugar. Net weight: 50 g.",
    },
  },
  {
    id: "eucalyptus-oil",
    category: "oils",
    price: 5000,
    pack: { sw: "Mlilistalo 30", en: "30 ml" },
    images: ["img/products/eucalyptus-oil-1.jpg", "img/products/eucalyptus-oil-2.jpg"],
    badge: null,
    name: { sw: "Mafuta ya Muarobaini", en: "Eucalyptus Oil" },
    short: {
      sw: "Mafuta safi ya muarobaini kwa uvukizi na harufu safi ya nyumbani.",
      en: "Pure eucalyptus oil for steaming and a fresh home scent.",
    },
    description: {
      sw: "Mafuta ya asili yaliyotokana na majani ya muarobaini kwa njia ya uvukizi. Huongezwa kwenye maji ya mvuke au difeza ya nyumbani kwa harufu safi. Weka mbali na watoto wadogo na usitumie moja kwa moja kwenye ngozi bila kuchanganya na mafuta mengine ya kawaida.",
      en: "A natural oil obtained from eucalyptus leaves by steam distillation. Add it to steaming water or a home diffuser for a fresh scent. Keep away from small children and do not apply to skin undiluted.",
    },
  },
  {
    id: "coconut-oil",
    category: "oils",
    price: 10000,
    pack: { sw: "Mlilistalo 250", en: "250 ml" },
    images: ["img/products/coconut-oil-1.jpg", "img/products/coconut-oil-2.jpg"],
    badge: null,
    name: { sw: "Mafuta ya Nazi Safi", en: "Cold-Pressed Coconut Oil" },
    short: {
      sw: "Mafuta ya nazi yaliyopigwa baridi, macho na yenye harufu ya asili.",
      en: "Cold-pressed coconut oil, clear with its natural aroma.",
    },
    description: {
      sw: "Mafuta ya nazi safi yaliyopatikana kwa njia ya kupiga baridi (cold-press) ili kuhifadhi ladha yake ya asili. Hutumika jikoni, pia kwa utunzaji wa ngozi na nywele. Weka mahali penye ubaridi; inaweza kuganda kiasili katika hali ya baridi.",
      en: "Pure coconut oil obtained by cold-pressing to preserve its natural aroma. Use it in the kitchen, as well as for skin and hair care. Store in a cool place; it may solidify naturally in cooler weather.",
    },
  },
  {
    id: "aloe-gel",
    category: "honey_gels",
    price: 7500,
    pack: { sw: "Mlilistalo 100", en: "100 ml" },
    images: ["img/products/aloe-gel-1.jpg", "img/products/aloe-gel-2.jpg"],
    badge: null,
    name: { sw: "Gel ya Aloe Vera", en: "Aloe Vera Gel" },
    short: {
      sw: "Gel nyepesi ya aloe vera bila rangi wala harufu bandia.",
      en: "A light aloe vera gel with no added colours or fragrances.",
    },
    description: {
      sw: "Gel iliyotengenezwa kutoka kwenye majani ya aloe vera, bila rangi wala harufu bandia. Inafaa kutumika baada ya kuoga kuweka ngozi laini na kunawili. Jaribu kwanza kwenye sehemu ndogo ya ngozi kabla ya matumizi kamili.",
      en: "A gel made from aloe vera leaves, free from added colours and fragrances. Apply after showering to keep skin feeling soft and refreshed. Patch-test on a small area of skin before full use.",
    },
  },
];

/* ---------- 4. TAFSIRI ZOTE / ALL TRANSLATIONS ----------
   Kila maandishi ya tovuti yako hapa. Ukiongeza funguo mpya, iweke
   kwenye lugha zote mbili. / All website text lives here. If you add a
   new key, add it to both languages. */
const TEXT = {
  sw: {
    doc_title: "AfyaAsili — Bidhaa za Asili za BFSUMA",
    brand_sub: "na BFSUMA",
    nav_home: "Nyumbani",
    nav_products: "Bidhaa",
    nav_order: "Oda Yangu",
    nav_about: "Kuhusu Sisi",
    nav_contact: "Mawasiliano",
    nav_search_ph: "Tafuta bidhaa...",
    lang_switched: "Lugha imebadilishwa kuwa Kiswahili.",

    hero_badge: "Bidhaa za Asili • Afrika Mashariki",
    hero_title: "Nguvu ya <span class='text-accent'>Asili</span><br>kwa Afya Yako",
    hero_text: "AfyaAsili, kutoka kwa BFSUMA, inakuletea dawa na virutubisho vya asili vinavyotokana na utajiri wa Afrika Mashariki. Vinjari bidhaa zetu, chagua unazopenda, na wasilisha oda yako kwa urahisi kupitia WhatsApp au barua pepe.",
    hero_cta1: "Vinjari Bidhaa",
    hero_cta2: "Wasiliana Nasi",
    hero_b1: "100% Bidhaa za Asili",
    hero_b2: "Oda Rahisi kwa WhatsApp",
    hero_b3: "Tunahudumia Afrika Mashariki",

    f_title: "Kwa Nini Chagua AfyaAsili?",
    f_sub: "Tunafanya biashara ya bidhaa za asili kuwa rahisi, wazi na ya kuaminika.",
    f1t: "Asili 100%",
    f1d: "Bidhaa zetu zinatokana na viambajengo vya asili vya Afrika Mashariki.",
    f2t: "Oda Rahisi",
    f2d: "Wasilisha oda yako kwa mbofyo mbofyo kupitia WhatsApp au barua pepe.",
    f3t: "Maelezo Wazi",
    f3d: "Kila bidhaa ina maelezo yake, kifurushi na bei yake waziwazi.",
    f4t: "Huduma ya Karibu",
    f4d: "Timu ya BFSUMA ipo tayari kukusaidia kwa simu au WhatsApp.",

    p_title: "Bidhaa Zetu",
    p_sub: "Chagua kutoka kwenye bidhaa zetu za asili. Bofya picha ili kuona maelezo zaidi.",
    search_ph: "Tafuta kwa jina au maelezo...",
    cat_all: "Zote",
    results_one: "bidhaa 1 imepatikana",
    results_many: "bidhaa {n} zimepatikana",
    results_none: "Hakuna bidhaa zilizopatikana. Jaribu neno lingine au kundi lingine.",
    sample_notice: "Taarifa ya Mfano: Bidhaa, picha, bei na maelezo hapa chini ni mifano ya onyesho tu — BFSUMA inahitaji kuyabadilisha kwa taarifa sahihi kabla ya tovuti kuchapishwa. Bidhaa hazibadilishi ushauri wa daktari.",
    add_to_order: "Weka Oda",
    view_details: "Maelezo",
    from: "Bei",

    cat_supplements: "Virutubisho",
    cat_teas: "Chai za Asili",
    cat_oils: "Mafuta ya Asili",
    cat_honey_gels: "Asali na Gel za Asili",

    m_pack: "Kifurushi",
    m_qty: "Idadi",
    m_add: "Weka kwenye Oda",
    m_close: "Funga",
    toast_added: "Imeongezwa kwenye oda yako.",

    o_title: "Oda Yangu",
    o_sub: "Kagua bidhaa ulizochagua, jaza taarifa zako, kisha tuma oda kwa WhatsApp au barua pepe.",
    o_empty: "Oda yako bado ni tupu. Ongeza bidhaa kutoka kwenye orodha ya bidhaa.",
    o_empty_cta: "Vinjari Bidhaa",
    th_product: "Bidhaa",
    th_price: "Bei",
    th_qty: "Idadi",
    th_subtotal: "Jumla ndogo",
    o_total: "Jumla",
    o_clear: "Futa Oda",
    form_title: "Taarifa Zako",
    lbl_name: "Jina lako *",
    ph_name: "Mfano: Amina Juma",
    lbl_phone: "Namba ya simu (hiari)",
    ph_phone: "Mfano: 0712 345 678",
    lbl_area: "Eneo la kufikishwa (hiari)",
    ph_area: "Mfano: Mjini, karibu na sokoni...",
    lbl_notes: "Maelezo ya oda (hiari)",
    ph_notes: "Mfano: ningeipenda ifikishwe jioni...",
    send_wa: "Tuma kwa WhatsApp",
    send_email: "Tuma kwa Barua Pepe",
    send_note: "Ujumbe utafunguka tayari umejazwa. Hakikisha ujumbe, kisha ubonyeze \"Tuma\" kwenye kifaa chako.",
    err_name: "Tafadhali weka jina lako kwanza.",
    err_empty_cart: "Ongeza angalau bidhaa moja kwenye oda.",
    toast_wa: "WhatsApp inafunguka na ujumbe wa oda yako...",
    toast_email: "Programu ya barua pepe inafunguka...",
    toast_cleared: "Oda imefutwa.",
    order_msg_intro: "Habari BFSUMA,\nNingependa kuweka oda ifuatayo kupitia tovuti ya AfyaAsili:\n\nBIDHAA:",
    order_msg_item: "{i}. {name} — Idadi: {qty} — {total}",
    order_msg_total: "\nJUMLA: {total}",
    order_msg_details: "\n\nTAARIFA ZA MNUNUZI:",
    order_msg_name: "Jina: {v}",
    order_msg_phone: "Simu: {v}",
    order_msg_area: "Eneo la kufikishwa: {v}",
    order_msg_notes: "Maelezo: {v}",
    order_msg_thanks: "\n\nAsante!",
    email_subject: "Oda Mpya — AfyaAsili",
    wa_greeting: "Habari BFSUMA! Nimeona tovuti ya AfyaAsili na nina swali kuhusu bidhaa zenu.",

    a_title: "Kuhusu BFSUMA",
    a_p1: "BFSUMA ni kampuni inayouza dawa na virutubisho vya asili kwa soko la Afrika Mashariki. Kupitia chapa ya AfyaAsili, tunaweka bidhaa za asili mkononi pako kwa bei nafuu na kwa njia ya wazi.",
    a_p2: "Tunaamini katika uwazi: kila bidhaa inaelezwa kikamilifu kwa jina, kifurushi na bei, na oda zako zinapelekwa moja kwa moja kwa timu yetu kupitia WhatsApp na barua pepe ili upate majibu ya haraka.",
    a_note: "Maelezo haya ya mfano yatasasishwa na BFSUMA.",
    a_pt1: "Bidhaa kutoka kwa wakulima na wakusanyaji wa mitaa",
    a_pt2: "Ufungashaji salama na usafi kwa kila oda",
    a_pt3: "Mawasiliano ya moja kwa moja na timu ya BFSUMA",

    c_title: "Mawasiliano",
    c_sub: "Una swali kuhusu bidhaa au oda yako? Tufikie kwa njia yoyote ifuatayo.",
    c_phone_title: "Simu na WhatsApp",
    c_email_title: "Barua Pepe",
    c_area_title: "Eneo",
    c_area_note: "Tunahudumia wateja katika nchi za Afrika Mashariki.",
    act_call: "Piga Simu",
    act_wa: "Fungua WhatsApp",
    act_email: "Tuma Barua Pepe",

    fo_about: "AfyaAsili ni chapa ya bidhaa za asili ya kampuni ya BFSUMA — dawa na virutubisho vya asili kwa soko la Afrika Mashariki.",
    fo_links_title: "Viungo vya Haraka",
    fo_contact_title: "Mawasiliano",
    fo_disclaimer: "Kumbuka: bidhaa, bei na maelezo kwenye tovuti hii ni mifano ya onyesho na yanahitaji kuthibitishwa na BFSUMA kabla ya matumizi ya biashara. Taarifa haziibadilishi ushauri wa wataalamu wa afya.",
    fo_rights: "Haki zote zimehifadhiwa.",
    cart_label: "Oda",
  },

  en: {
    doc_title: "AfyaAsili — Natural Products by BFSUMA",
    brand_sub: "by BFSUMA",
    nav_home: "Home",
    nav_products: "Products",
    nav_order: "My Order",
    nav_about: "About Us",
    nav_contact: "Contact",
    nav_search_ph: "Search products...",
    lang_switched: "Language switched to English.",

    hero_badge: "Natural Products • East Africa",
    hero_title: "The Power of <span class='text-accent'>Nature</span><br>for Your Wellbeing",
    hero_text: "AfyaAsili, by BFSUMA, brings you natural remedies and supplements inspired by the richness of East Africa. Browse our products, choose your favourites, and place your order easily via WhatsApp or email.",
    hero_cta1: "Browse Products",
    hero_cta2: "Contact Us",
    hero_b1: "100% Natural Products",
    hero_b2: "Easy WhatsApp Orders",
    hero_b3: "Serving East Africa",

    f_title: "Why Choose AfyaAsili?",
    f_sub: "We make buying natural products simple, transparent and trustworthy.",
    f1t: "100% Natural",
    f1d: "Our products come from natural East African ingredients.",
    f2t: "Easy Ordering",
    f2d: "Send your order in a few taps via WhatsApp or email.",
    f3t: "Clear Information",
    f3d: "Every product lists its description, pack size and price clearly.",
    f4t: "Personal Service",
    f4d: "The BFSUMA team is ready to help you by phone or WhatsApp.",

    p_title: "Our Products",
    p_sub: "Choose from our range of natural products. Tap a photo to see more details.",
    search_ph: "Search by name or description...",
    cat_all: "All",
    results_one: "1 product found",
    results_many: "{n} products found",
    results_none: "No products found. Try another word or category.",
    sample_notice: "Demo Notice: Products, images, prices and descriptions below are samples for display only — BFSUMA must replace them with accurate information before the website goes live. Products are not a substitute for medical advice.",
    add_to_order: "Add to Order",
    view_details: "Details",
    from: "Price",

    cat_supplements: "Supplements",
    cat_teas: "Herbal Teas",
    cat_oils: "Natural Oils",
    cat_honey_gels: "Honey & Gels",

    m_pack: "Pack",
    m_qty: "Quantity",
    m_add: "Add to Order",
    m_close: "Close",
    toast_added: "Added to your order.",

    o_title: "My Order",
    o_sub: "Review your selected items, fill in your details, then send your order via WhatsApp or email.",
    o_empty: "Your order is still empty. Add products from the products list.",
    o_empty_cta: "Browse Products",
    th_product: "Product",
    th_price: "Price",
    th_qty: "Qty",
    th_subtotal: "Subtotal",
    o_total: "Total",
    o_clear: "Clear Order",
    form_title: "Your Details",
    lbl_name: "Your name *",
    ph_name: "e.g. Amina Juma",
    lbl_phone: "Phone number (optional)",
    ph_phone: "e.g. 0712 345 678",
    lbl_area: "Delivery area (optional)",
    ph_area: "e.g. Town centre, near the market...",
    lbl_notes: "Order notes (optional)",
    ph_notes: "e.g. I would prefer evening delivery...",
    send_wa: "Send via WhatsApp",
    send_email: "Send via Email",
    send_note: "A pre-filled message will open. Review it, then tap \"Send\" on your device.",
    err_name: "Please enter your name first.",
    err_empty_cart: "Add at least one product to your order.",
    toast_wa: "Opening WhatsApp with your order message...",
    toast_email: "Opening your email app...",
    toast_cleared: "Order cleared.",
    order_msg_intro: "Hello BFSUMA,\nI would like to place the following order via the AfyaAsili website:\n\nITEMS:",
    order_msg_item: "{i}. {name} — Qty: {qty} — {total}",
    order_msg_total: "\nTOTAL: {total}",
    order_msg_details: "\n\nCUSTOMER DETAILS:",
    order_msg_name: "Name: {v}",
    order_msg_phone: "Phone: {v}",
    order_msg_area: "Delivery area: {v}",
    order_msg_notes: "Notes: {v}",
    order_msg_thanks: "\n\nThank you!",
    email_subject: "New Order — AfyaAsili",
    wa_greeting: "Hello BFSUMA! I saw the AfyaAsili website and I have a question about your products.",

    a_title: "About BFSUMA",
    a_p1: "BFSUMA is a company selling natural remedies and supplements to the East African market. Through the AfyaAsili brand, we put natural products within your reach at fair prices and in a transparent way.",
    a_p2: "We believe in transparency: every product is clearly described by name, pack size and price, and your orders go straight to our team via WhatsApp and email so you get a quick response.",
    a_note: "This sample text will be updated by BFSUMA.",
    a_pt1: "Products from local farmers and gatherers",
    a_pt2: "Safe, clean packaging for every order",
    a_pt3: "Direct communication with the BFSUMA team",

    c_title: "Contact Us",
    c_sub: "Have a question about products or your order? Reach us any of these ways.",
    c_phone_title: "Phone & WhatsApp",
    c_email_title: "Email",
    c_area_title: "Location",
    c_area_note: "We serve customers across East African countries.",
    act_call: "Call Now",
    act_wa: "Open WhatsApp",
    act_email: "Send Email",

    fo_about: "AfyaAsili is the natural products brand of BFSUMA — natural remedies and supplements for the East African market.",
    fo_links_title: "Quick Links",
    fo_contact_title: "Contact",
    fo_disclaimer: "Note: products, prices and details on this site are display samples and must be confirmed by BFSUMA before commercial use. This information is not a substitute for professional health advice.",
    fo_rights: "All rights reserved.",
    cart_label: "Order",
  },
};

/* ---------------------------------------------------------------
   MWISHO WA FAILI YA TAARIFA / END OF DATA FILE
   Kwa maswali ya kiufundi wasiliana na mtengenezaji wa tovuti.
   --------------------------------------------------------------- */
