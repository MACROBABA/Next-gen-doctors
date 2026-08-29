// ============================================================
//  Next Gen Doctors — Gemini dəstəkli chatbot
//  Saytın real məlumatları (knowledge base) ilə işləyir.
//  API açarı: assets/gemini-config.js faylındadır (gitignore).
// ============================================================
(function () {
  if (window.NGD_CHAT_LOADED) return;
  window.NGD_CHAT_LOADED = true;

  // ---------- knowledge base (saytın real məlumatları) ----------
  var KNOWLEDGE_AZ = [
    "ORGANİZASİYA:",
    "- Next Gen Doctors — Azərbaycanda gənc tibb tələbələrinin peşəkar inkişafına dəstək olan könüllü icma platformasıdır.",
    "- Təsis tarixi: 15 noyabr 2024-cü il.",
    "- Missiya: top həkimlərlə gələcəyin həkimləri arasında körpü qurmaq.",
    "- Statistikalar: 48+ tədbir, 1700+ icma üzvü, 60+ peşəkar həkim və təlimçi, 383 sorğu iştirakçısı.",
    "- Şüar: ÖYRƏN — BAĞLAN — İLHAMLANDIR — XİDMƏT ET.",
    "NÖVBƏTİ TƏDBİRLƏR:",
    "- Vebinar 'Tibb Təhsilində Karyera Planlaması' — onlayn (Zoom); tarix tezliklə elan olunacaq.",
    "- Seminar & Master-klass 'Klinik Bacarıqlar Master-klassı' — Bakıda; tarix tezliklə elan olunacaq.",
    "- Növbəti konfrans Bakıda keçiriləcək; tarix tezliklə elan olunacaq.",
    "- Növbəti infotur: 'Klinikaya İnfotur'.",
    "ÜMUMİ FƏALİYYƏT STATİSTİKASI:",
    "- Vebinarlar: 20 tədbir, 1180+ iştirakçı, onlayn (Zoom).",
    "- Seminar & Master-klass: 21 tədbir, 787+ iştirakçı, ortalama 38+ tələbə/tədbir.",
    "- Konfranslar: 2 böyük konfrans, 590+ iştirakçı.",
    "- İnfoturlar: 3 tur, 69+ iştirakçı.",
    "- Səhər Yeməyi & Oxu: 5 proqram, 49+ iştirakçı.",
    "- Rayon Turları: Bakıdan kənarda tibb tələbələri ilə görüşlər.",
    "KEÇMİŞ KONFRANSLAR (4):",
    "- 'Kamran Musayevlə Səmimi Görüş' — Bakı Texniki Universiteti, 215 iştirakçı, 10 fotolu qalereya.",
    "- 'Beynin və Ruhun Kimyası' — Naxçıvan, Palace Hotel, 145 iştirakçı, 9 fotolu qalereya.",
    "- 'Diabetik Retinopatiya' — Bakı, Graff Hotel, 87 iştirakçı.",
    "- 'Süd Vəzi Xərçəngi: Diaqnozdan Müalicəyə' — Bakı, Graff Hotel, 101 iştirakçı.",
    "- Xüsusi konfranslarda cəmi 548 iştirakçı iştirak edib.",
    "KEÇMİŞ SEMİNARLAR (9 — kecmis-seminarlar.html):",
    "- Dr. Ruslan ilə Seminar (10 may 2026) — klinik mövzularda sual-cavab formatlı seminar, 5 foto.",
    "- Səma Pənahova ilə Seminar (24 may 2026) — sertifikat təqdimatı ilə başa çatan seminar, 5 foto.",
    "- Naxçıvan Seminarı — regional fəaliyyətlər çərçivəsində keçirilən seminar, 4 foto.",
    "- Nəsrin Ağayeva ilə Seminar — uşaqlarda antibiotiklərin rasional istifadəsi mövzusunda, 3 foto.",
    "- Bəhruz Əliyev ilə Seminar — praktiki bilik və təcrübə mübadiləsi, 4 foto.",
    "- Samir Cavadlı ilə Seminar — 'Thinking Like a Researcher' mövzusunda, 5 foto.",
    "- Lalə Mehdi ilə Seminar — tibb tarixinə dair iki natiqli seminar, 3 foto.",
    "- Lalə Ağabəyli ilə Seminar — 'Approach to Breast Imaging' mövzusunda, 5 foto.",
    "- 26 oktyabr 2025 Seminarı — döş xərçənginə qarşı məlumatlılıq mövzusunda, 5 foto.",
    "KEÇMİŞ İNFOTUR:",
    "- Mərkəzi Klinikaya İnfotur — 14 mart 2026-cı il, 6 foto (kecmis-infoturlar.html).",
    "- Məlhəm Hospitalda İnfotur — gənc tibb tələbələri müasir tibb müəssisəsi ilə tanış oldular, 5 foto (kecmis-infoturlar.html).",
    "- Yeni Klinikada İnfotur — reabilitasiya və müasir müalicə üsulları ilə tanışlıq, 2 foto (kecmis-infoturlar.html).",
    "KEÇMİŞ SƏHƏR YEMƏYİ:",
    "- 25 aprel 2026 Səhər Yeməyi & Oxu — həkimlərlə səhər yeməyi, kitab söhbətləri və təcrübə mübadiləsi, 18 foto (kecmis-sehar-yemeyi.html).",
    "- 24 may 2025 Səhər Yeməyi & Oxu — gənc tibb tələbələri ilə səhər yeməyi və oxu, 4 foto (kecmis-sehar-yemeyi.html).",
    "FOTO QALEREYALARI:",
    "- Keçmiş seminarlar: kecmis-seminarlar.html — 9 kart.",
    "- Keçmiş konfranslar: kecmis-konfranslar.html — 2 kart.",
    "- Keçmiş infoturlar: kecmis-infoturlar.html.",
    "- Keçmiş səhər yeməyi: kecmis-sehar-yemeyi.html.",
    "- Qalereyalarda hər kartın şəkilləri hər 5 saniyədə avtomatik dəyişir.",
    "ŞƏBƏKƏ:",
    "- 20 uzman həkim, 2 professor, 2 fəlsəfə doktoru.",
    "- Şəbəkədəki həkimlər Türkiyə, Almaniya və ABŞ-da təhsil almışdır.",
    "ƏLAQƏ:",
    "- Telefon: +994 77 244 19 03",
    "- E-poçt: nextgendoctors@gmail.com",
    "- Instagram: @nextgendoctorss, TikTok: @nextgendoctors, YouTube: @nextgendoctors",
    "- LinkedIn: Next Gen Doctors, Telegram: @nextgendoctors, WhatsApp: +994 77 244 19 03",
    "İCMAYA QOŞULMA: Sosial şəbəkələri izləmək və ya WhatsApp/Telegram üzərindən əlaqə saxlamaqla. Tədbirlərə qeydiyyat səhifədəki 'Qeydiyyatdan Keç' düyməsi ilə aparılır."
  ].join("\n");

  var KNOWLEDGE_EN = [
    "ORGANIZATION:",
    "- Next Gen Doctors is a volunteer-driven community platform in Azerbaijan that supports the professional growth of young medical students.",
    "- Founded: November 15, 2024.",
    "- Mission: building a bridge between top doctors and the doctors of tomorrow.",
    "- Stats: 48+ events, 1700+ community members, 60+ professional doctors and trainers, 383 survey participants.",
    "- Motto: LEARN — CONNECT — INSPIRE — SERVE.",
    "UPCOMING EVENTS:",
    "- Webinar 'Career Planning in Medical Education' — online (Zoom); date to be announced soon.",
    "- Seminar & Masterclass 'Clinical Skills Masterclass' — in Baku; date to be announced soon.",
    "- The next conference will be held in Baku; date to be announced soon.",
    "- Next info-tour: 'Clinic Info-Tour'.",
    "OVERALL ACTIVITY STATS:",
    "- Webinars: 20 events, 1180+ attendees, online (Zoom).",
    "- Seminars & Masterclasses: 21 events, 787+ attendees, averaging 38+ students per session.",
    "- Conferences: 2 major conferences, 590+ attendees.",
    "- Info-Tours: 3 tours, 69+ participants.",
    "- Breakfast & Reading: 5 programs, 49+ participants.",
    "- Regional Tours: meetings with medical students beyond Baku.",
    "PAST CONFERENCES (4):",
    "- 'A Candid Conversation with Kamran Musayev' — Baku Technical University, 215 attendees, 10-photo gallery.",
    "- 'The Chemistry of Mind and Soul' — Nakhchivan, Palace Hotel, 145 attendees, 9-photo gallery.",
    "- 'Diabetic Retinopathy' — Baku, Graff Hotel, 87 attendees.",
    "- 'Breast Cancer: From Diagnosis to Treatment' — Baku, Graff Hotel, 101 attendees.",
    "- 548 total attendees across featured conferences.",
    "PAST SEMINARS (9 — kecmis-seminarlar.html):",
    "- Seminar with Dr. Ruslan (May 10, 2026) — interactive Q&A on clinical topics, 5 photos.",
    "- Seminar with Səma Pənahova (May 24, 2026) — closed with certificates for participants, 5 photos.",
    "- Nakhchivan Seminar — held with local participants as part of regional activities, 4 photos.",
    "- Seminar with Nəsrin Ağayeva — on the rational use of antibiotics in children, 3 photos.",
    "- Seminar with Bəhruz Əliyev — sharing practical knowledge and experience, 4 photos.",
    "- Seminar with Samir Cavadlı — 'Thinking Like a Researcher', 5 photos.",
    "- Seminar with Lalə Mehdi — a two-speaker seminar on medical history, 3 photos.",
    "- Seminar with Lalə Ağabəyli — 'Approach to Breast Imaging', 5 photos.",
    "- Seminar of Oct 26, 2025 — raising awareness about breast cancer, 5 photos.",
    "PAST INFO-TOUR:",
    "- Info-Tour to the Central Clinic — March 14, 2026, 6 photos (kecmis-infoturlar.html).",
    "- Info-Tour at Məlhəm Hospital — young medical students got acquainted with a modern medical facility, 5 photos (kecmis-infoturlar.html).",
    "- Info-Tour at the New Clinic — rehabilitation and modern treatment methods, 2 photos (kecmis-infoturlar.html).",
    "PAST BREAKFAST & READING:",
    "- Breakfast & Reading, Apr 25, 2026 — breakfast, book conversations and experience sharing with doctors, 18 photos (kecmis-sehar-yemeyi.html).",
    "- Breakfast & Reading, May 24, 2025 — breakfast, book reading and experience sharing with young medical students, 4 photos (kecmis-sehar-yemeyi.html).",
    "PHOTO GALLERIES:",
    "- Past seminars: kecmis-seminarlar.html — 9 cards.",
    "- Past conferences: kecmis-konfranslar.html — 2 cards.",
    "- Past info-tours: kecmis-infoturlar.html.",
    "- Past breakfast & reading: kecmis-sehar-yemeyi.html.",
    "- In galleries, each card's photos auto-rotate every 5 seconds.",
    "NETWORK:",
    "- 20 specialist doctors, 2 professors, 2 PhD holders.",
    "- Many doctors in the network studied and worked in Turkey, Germany and the USA.",
    "CONTACT:",
    "- Phone: +994 77 244 19 03",
    "- Email: nextgendoctors@gmail.com",
    "- Instagram: @nextgendoctorss, TikTok: @nextgendoctors, YouTube: @nextgendoctors",
    "- LinkedIn: Next Gen Doctors, Telegram: @nextgendoctors, WhatsApp: +994 77 244 19 03",
    "JOINING: Follow the social media channels or contact via WhatsApp/Telegram. Event registration happens via the 'Register' button on the site."
  ].join("\n");

  var SYSTEM = [
    "You are the official AI assistant chatbot of Next Gen Doctors — an Azerbaijani community platform that connects young medical students with leading physicians.",
    "",
    "RULES:",
    "- Reply in the SAME language the user writes in (Azerbaijani or English).",
    "- Base your answers ONLY on the KNOWLEDGE BASE below. Never invent numbers, events, dates or facts.",
    "- If the question is outside the knowledge base or you don't know the answer, say so briefly and suggest contacting Next Gen Doctors via WhatsApp/Telegram +994 77 244 19 03 or email nextgendoctors@gmail.com.",
    "- Keep answers short (2-4 sentences), friendly and warm. Use emoji where suitable.",
    "- Topics the user may ask about: events, registration, statistics, conferences, the community, speakers, or contact details.",
    "",
    "KNOWLEDGE BASE (AZERBAIJANI):",
    KNOWLEDGE_AZ,
    "",
    "KNOWLEDGE BASE (ENGLISH):",
    KNOWLEDGE_EN
  ].join("\n");

  // ---------- dil mətnləri ----------
  function texts(lang) {
    var en = lang === 'en';
    return {
      title: 'Next Gen Doctors',
      subtitle: en ? 'Assistant — online' : 'Köməkçi — onlayn',
      greeting: en
        ? "Hello! 👋 I'm the Next Gen Doctors assistant. Ask me about our events, statistics, community or contact info."
        : "Salam! 👋 Mən Next Gen Doctors-un köməkçisiyəm. Tədbirlər, statistika, icma və əlaqə haqqında soruşa bilərsiniz.",
      placeholder: en ? 'Type your question...' : 'Sualınızı yazın...',
      chips: en
        ? ['What events do you have?', 'How do I join?', 'Contact info']
        : ['Hansı tədbirləriniz var?', 'İcmaya necə qoşulum?', 'Əlaqə məlumatları'],
      noKey: en
        ? "⚠️ The assistant isn't configured yet. Please add the Gemini API key to assets/gemini-config.js."
        : "⚠️ Köməkçi hələ konfiqurasiya olunmayıb. Zəhmət olmasa assets/gemini-config.js faylına Gemini API açarını əlavə edin.",
      quota: en
        ? '😔 The free request limit is temporarily full. Please try again a little later, or contact us via WhatsApp/Telegram: +994 77 244 19 03.'
        : '😔 Pulsuz sorğu limiti müvəqqəti dolub. Zəhmət olmasa bir az sonra yenidən cəhd edin və ya WhatsApp/Telegram: +994 77 244 19 03 vasitəsilə bizimlə əlaqə saxlayın.',
      error: en
        ? 'Sorry, something went wrong. Please try again later.'
        : 'Bağışlayın, xəta baş verdi. Zəhmət olmasa bir az sonra yenidən cəhd edin.',
      sendLabel: en ? 'Send message' : 'Mesaj göndər',
      openLabel: en ? 'Open chat' : 'Söhbəti aç',
      closeLabel: en ? 'Close chat' : 'Söhbəti bağla'
    };
  }

  // ---------- lokal bilik bazası (Gemini müvəqqəti əlçatan olmayanda) ----------
  var LOCAL_KB = [
    {
      keys: ['qeydiyyat', 'register', 'sign up'],
      az: "İcmaya qoşulmaq üçün sosial şəbəkələrimizi izləyin (Instagram: @nextgendoctorss) və ya WhatsApp/Telegram: +994 77 244 19 03 vasitəsilə əlaqə saxlayın. Tədbirlərə qeydiyyat səhifədəki \"Qeydiyyatdan Keç\" düyməsi ilə aparılır. 📝",
      en: "To join the community, follow our social media (Instagram: @nextgendoctorss) or contact us via WhatsApp/Telegram: +994 77 244 19 03. Registration for events happens via the \"Register\" button on the page. 📝"
    },
    {
      keys: ['qoşul', 'join', 'üzv'],
      az: "İcmamıza qoşulmaq çox asandır! 🩺 Sosial şəbəkələrimizi (Instagram: @nextgendoctorss, Telegram: @nextgendoctors) izləyin və ya WhatsApp: +994 77 244 19 03 vasitəsilə bizə yazın — növbəti tədbirlərimizdən xəbərdar olacaqsınız.",
      en: "Joining our community is easy! 🩺 Follow our social media (Instagram: @nextgendoctorss, Telegram: @nextgendoctors) or message us on WhatsApp: +994 77 244 19 03 — you'll be the first to know about our next events."
    },
    {
      keys: ['əlaqə', 'contact', 'telefon', 'phone', 'nömrə', 'email', 'e-poçt', 'mail'],
      az: "Bizimlə əlaqə: 📞 Telefon/WhatsApp: +994 77 244 19 03 • E-poçt: nextgendoctors@gmail.com • Instagram: @nextgendoctorss • Telegram: @nextgendoctors • LinkedIn: Next Gen Doctors. Hər zaman yazmaqdan çəkinməyin! 😊",
      en: "You can reach us: 📞 Phone/WhatsApp: +994 77 244 19 03 • Email: nextgendoctors@gmail.com • Instagram: @nextgendoctorss • Telegram: @nextgendoctors • LinkedIn: Next Gen Doctors. Feel free to reach out anytime! 😊"
    },
    {
      keys: ['kamran', 'musayev'],
      az: "🏛️ \"Kamran Musayevlə Səmimi Görüş\" konfransı Bakı Texniki Universitetində 215 iştirakçı ilə keçirilib. Fotoları kecmis-konfranslar.html səhifəsində (10 şəkil) baxa bilərsiniz.",
      en: "🏛️ \"A Candid Conversation with Kamran Musayev\" took place at Baku Technical University with 215 attendees. You can see the photos (10 images) at kecmis-konfranslar.html."
    },
    {
      keys: ['ruslan'],
      az: "🎓 Dr. Ruslan ilə Seminar (10 may 2026) — klinik mövzularda sual-cavab formatlı seminar keçirilib. 5 fotosu kecmis-seminarlar.html səhifəsindədir.",
      en: "🎓 The seminar with Dr. Ruslan (May 10, 2026) was an interactive Q&A session on clinical topics. Its 5 photos are at kecmis-seminarlar.html."
    },
    {
      keys: ['səma', 'sema', 'panahova'],
      az: "🎓 Səma Pənahova ilə Seminar (24 may 2026) — sertifikat təqdimatı ilə başa çatan seminar keçirilib. 5 fotosu kecmis-seminarlar.html səhifəsindədir.",
      en: "🎓 The seminar with Səma Pənahova (May 24, 2026) closed with certificates presented to participants. Its 5 photos are at kecmis-seminarlar.html."
    },
    {
      keys: ['naxçıvan', 'naxcivan', 'nakhchivan'],
      az: "Naxçıvanda iki tədbirimiz olub: 🏛️ \"Beynin və Ruhun Kimyası\" konfransı (Palace Hotel, 145 iştirakçı) və 🎓 Naxçıvan Seminarı (regional fəaliyyət). Fotolar kecmis-konfranslar.html və kecmis-seminarlar.html səhifələrindədir.",
      en: "We held two events in Nakhchivan: 🏛️ the \"Chemistry of Mind and Soul\" conference (Palace Hotel, 145 attendees) and 🎓 the Nakhchivan Seminar (regional activity). Photos are at kecmis-konfranslar.html and kecmis-seminarlar.html."
    },
    {
      keys: ['nəsrin', 'nesrin', 'agayeva'],
      az: "🎓 Nəsrin Ağayeva ilə Seminar — \"Uşaqlarda antibiotiklərin rasional istifadəsi\" mövzusunda keçirilib. 3 fotosu kecmis-seminarlar.html səhifəsindədir.",
      en: "🎓 The seminar with Nəsrin Ağayeva was on the rational use of antibiotics in children. Its 3 photos are at kecmis-seminarlar.html."
    },
    {
      keys: ['bəhruz', 'behruz', 'eliyev'],
      az: "🎓 Bəhruz Əliyev ilə Seminar — praktiki bilik və təcrübənin bölüşüldüyü seminar keçirilib. 4 fotosu kecmis-seminarlar.html səhifəsindədir.",
      en: "🎓 The seminar with Bəhruz Əliyev focused on sharing practical knowledge and experience. Its 4 photos are at kecmis-seminarlar.html."
    },
    {
      keys: ['samir', 'cavadlı', 'cavadli'],
      az: "🎓 Samir Cavadlı ilə Seminar — \"Thinking Like a Researcher\" mövzusunda keçirilib və sertifikat təqdimatı ilə başa çatıb. 5 fotosu kecmis-seminarlar.html səhifəsindədir.",
      en: "🎓 The seminar with Samir Cavadlı was on \"Thinking Like a Researcher\" and closed with certificates. Its 5 photos are at kecmis-seminarlar.html."
    },
    {
      keys: ['lalə mehdi', 'lale mehdi'],
      az: "🎓 Lalə Mehdi ilə Seminar — tibb tarixinə dair iki natiqli maraqlı seminar keçirilib. 3 fotosu kecmis-seminarlar.html səhifəsindədir.",
      en: "🎓 The seminar with Lalə Mehdi was a two-speaker session on an intriguing chapter of medical history. Its 3 photos are at kecmis-seminarlar.html."
    },
    {
      keys: ['lalə ağabəyli', 'lale agabeyli', 'agabeyli'],
      az: "🎓 Lalə Ağabəyli ilə Seminar — \"Approach to Breast Imaging\" mövzusunda keçirilib və sertifikat təqdimatı ilə başa çatıb. 5 fotosu kecmis-seminarlar.html səhifəsindədir.",
      en: "🎓 The seminar with Lalə Ağabəyli was on \"Approach to Breast Imaging\" and closed with certificates. Its 5 photos are at kecmis-seminarlar.html."
    },
    {
      keys: ['26 oktyabr', '26.10', 'döş xərçəngi', 'breast cancer'],
      az: "🎓 26 oktyabr 2025 Seminarı — döş xərçənginə qarşı məlumatlılıq mövzusunda keçirilib. 5 fotosu kecmis-seminarlar.html səhifəsindədir.",
      en: "🎓 The seminar of Oct 26, 2025 raised awareness about breast cancer. Its 5 photos are at kecmis-seminarlar.html."
    },
    {
      keys: ['mərkəzi klinika', 'central clinic', '14 mart', 'march 14'],
      az: "🏥 Mərkəzi Klinikaya İnfotur 14 mart 2026-cı ildə keçirilib — müasir tibb müəssisəsi ilə yaxından tanışlıq. 4 fotosu kecmis-infoturlar.html səhifəsindədir.",
      en: "🏥 The Info-Tour to the Central Clinic took place on March 14, 2026 — an up-close look at a modern medical facility. Its 4 photos are at kecmis-infoturlar.html."
    },
    {
      keys: ['məlhəm', 'melhem', 'melhem hospital'],
      az: "🏥 Məlhəm Hospitalda İnfotur keçirilib — gənc tibb tələbələri müasir tibb müəssisəsi ilə tanış oldular. 5 fotosu kecmis-infoturlar.html səhifəsindədir.",
      en: "🏥 An Info-Tour was held at Məlhəm Hospital — young medical students got acquainted with a modern medical facility. Its 5 photos are at kecmis-infoturlar.html."
    },
    {
      keys: ['yeni klinika', 'new clinic'],
      az: "🏥 Yeni Klinikada İnfotur keçirilib — gənc tibb tələbələri reabilitasiya və müasir müalicə üsulları ilə tanış oldular. 2 fotosu kecmis-infoturlar.html səhifəsindədir.",
      en: "🏥 An Info-Tour was held at the New Clinic — young medical students learned about rehabilitation and modern treatment methods. Its 2 photos are at kecmis-infoturlar.html."
    },
    {
      keys: ['25 aprel', 'april 25', '25.04'],
      az: "☕ 25 aprel 2026 Səhər Yeməyi & Oxu — həkimlərlə səhər yeməyi, kitab söhbətləri və təcrübə mübadiləsi keçirilib. 18 fotosu kecmis-sehar-yemeyi.html səhifəsindədir.",
      en: "☕ The Breakfast & Reading on Apr 25, 2026 featured breakfast, book conversations and experience sharing with doctors. Its 18 photos are at kecmis-sehar-yemeyi.html."
    },
    {
      keys: ['24 may', 'may 24', '24.05', '2025'],
      az: "☕ 24 may 2025 Səhər Yeməyi & Oxu — gənc tibb tələbələri ilə səhər yeməyi və oxu keçirilib. 4 fotosu kecmis-sehar-yemeyi.html səhifəsindədir.",
      en: "☕ The Breakfast & Reading on May 24, 2025 featured breakfast, book reading and experience sharing with young medical students. Its 4 photos are at kecmis-sehar-yemeyi.html."
    },
    {
      keys: ['qalereya', 'keçmiş', 'past', 'şəkil', 'şəkillər', 'foto', 'photo', 'photos', 'gallery', 'karusel', 'carousel'],
      az: "📸 Foto qalereyalarımız: kecmis-seminarlar.html (9 seminar kartı), kecmis-konfranslar.html (2 konfrans kartı), kecmis-infoturlar.html və kecmis-sehar-yemeyi.html. Hər kartda şəkillər hər 5 saniyədə avtomatik dəyişir!",
      en: "📸 Our photo galleries: kecmis-seminarlar.html (9 seminar cards), kecmis-konfranslar.html (2 conference cards), kecmis-infoturlar.html and kecmis-sehar-yemeyi.html. Photos in each card auto-rotate every 5 seconds!"
    },
    {
      keys: ['vebinar', 'webinar', 'onlayn', 'zoom'],
      az: "Vebinarlarımız onlayn (Zoom) keçirilir: 20 tədbir, 1180+ iştirakçı. 📺 Növbəti mövzu: \"Tibb Təhsilində Karyera Planlaması\" — tarix tezliklə elan olunacaq. Daha ətraflı vebinar.html səhifəsində.",
      en: "Our webinars are held online (Zoom): 20 events, 1180+ attendees. 📺 Next topic: \"Career Planning in Medical Education\" — date to be announced soon. See vebinar.html for details."
    },
    {
      keys: ['seminar', 'master-klass', 'masterclass', 'master klass'],
      az: "Seminar & Master-klass tədbirlərimiz: 21 tədbir, 787+ iştirakçı, ortalama 38+ tələbə/tədbir. 🎓 Növbəti: \"Klinik Bacarıqlar Master-klassı\" (Bakı). Keçmiş seminarlarımıza kecmis-seminarlar.html səhifəsində baxa bilərsiniz.",
      en: "Our seminars & masterclasses: 21 events, 787+ attendees, averaging 38+ students per session. 🎓 Next: \"Clinical Skills Masterclass\" (Baku). See past seminars at kecmis-seminarlar.html."
    },
    {
      keys: ['konfrans', 'conference'],
      az: "Konfranslarımız: 2 böyük konfrans, 590+ iştirakçı. 🏛️ Keçmiş konfranslar: Kamran Musayevlə Səmimi Görüş (215), Beynin və Ruhun Kimyası — Naxçıvan (145), Diabetik Retinopatiya (87), Süd Vəzi Xərçəngi (101). Növbəti konfrans Bakıda olacaq — tarix tezliklə elan ediləcək.",
      en: "Our conferences: 2 major conferences, 590+ attendees. 🏛️ Past conferences: A Candid Conversation with Kamran Musayev (215), The Chemistry of Mind and Soul — Nakhchivan (145), Diabetic Retinopathy (87), Breast Cancer: From Diagnosis to Treatment (101). The next conference will be in Baku — date to be announced soon."
    },
    {
      keys: ['infotur', 'info-tour', 'klinikaya'],
      az: "İnfoturlarımız: 3 tur, 69+ iştirakçı. 🏥 Müasir tibb müəssisələri ilə yaxından tanışlıq. Növbəti: \"Klinikaya İnfotur\". Keçmiş infoturlara kecmis-infoturlar.html səhifəsində baxa bilərsiniz.",
      en: "Our info-tours: 3 tours, 69+ participants. 🏥 Up-close visits to modern medical facilities. Next: \"Clinic Info-Tour\". See past info-tours at kecmis-infoturlar.html."
    },
    {
      keys: ['səhər yeməyi', 'breakfast', 'oxu'],
      az: "Səhər Yeməyi & Oxu proqramlarımız: 5 proqram, 49+ iştirakçı. ☕ Səmimi mühitdə həkimlərlə birgə səhər yeməyi, kitab söhbətləri və təcrübə mübadiləsi. Keçmiş proqramlara kecmis-sehar-yemeyi.html səhifəsində baxa bilərsiniz.",
      en: "Our Breakfast & Reading programs: 5 programs, 49+ participants. ☕ Breakfast, book conversations and experience sharing with doctors in a warm setting. See past programs at kecmis-sehar-yemeyi.html."
    },
    {
      keys: ['təsis', 'founded', 'nə vaxt', 'when', 'yaranıb', 'qurulub', 'started'],
      az: "Next Gen Doctors 15 noyabr 2024-cü ildə təsis edilib. 🎂 O vaxtdan bəri 48+ tədbir keçirib və 1700+ icma üzvünə çatıb!",
      en: "Next Gen Doctors was founded on November 15, 2024. 🎂 Since then we've hosted 48+ events and grown to 1700+ community members!"
    },
    {
      keys: ['tarix', 'tarixlər', 'date', 'dates', 'nə zaman'],
      az: "📅 Növbəti tədbirlərin tarixləri hələ elan olunmayıb (tezliklə açıqlanacaq). Keçmiş tədbirlərdən: Dr. Ruslan seminarı 10.05.2026, Səma Pənahova seminarı 24.05.2026, Mərkəzi Klinikaya infotur 14.03.2026, Səhər Yeməyi & Oxu 25.04.2026, döş xərçəngi seminarı 26.10.2025.",
      en: "📅 Upcoming event dates are not announced yet (coming soon). Past events: Dr. Ruslan seminar May 10, 2026; Səma Pənahova seminar May 24, 2026; Central Clinic info-tour Mar 14, 2026; Breakfast & Reading Apr 25, 2026; breast cancer seminar Oct 26, 2025."
    },
    {
      keys: ['statistika', 'stats', 'rəqəm', 'neçə', 'how many', 'sayı'],
      az: "Rəqəmlərimiz: 📊 48+ tədbir, 1700+ icma üzvü, 60+ peşəkar həkim və təlimçi, 383 sorğu iştirakçısı.",
      en: "Our numbers: 📊 48+ events, 1700+ community members, 60+ professional doctors and trainers, 383 survey participants."
    },
    {
      keys: ['həkim', 'doctor', 'professor', 'təlimçi', 'trainer', 'şəbəkə', 'network', 'müəllim'],
      az: "Şəbəkəmizdə 20 uzman həkim, 2 professor və 2 fəlsəfə doktoru var. 🧑‍⚕️ Onların çoxu Türkiyə, Almaniya və ABŞ-da təhsil almışdır.",
      en: "Our network includes 20 specialist doctors, 2 professors and 2 PhD holders. 🧑‍⚕️ Many of them studied in Turkey, Germany and the USA."
    },
    {
      keys: ['next gen doctors', 'ngd', 'platforma', 'könüllü', 'volunteer', 'kimsiniz', 'kimsiz', 'who are you'],
      az: "Next Gen Doctors — Azərbaycanda gənc tibb tələbələrinin peşəkar inkişafına dəstək olan könüllü icma platformasıdır. 💙 Missiyamız: top həkimlərlə gələcəyin həkimləri arasında körpü qurmaq.",
      en: "Next Gen Doctors is a volunteer-driven community platform in Azerbaijan supporting the professional growth of young medical students. 💙 Our mission: building a bridge between top doctors and the doctors of tomorrow."
    },
    {
      keys: ['tədbir', 'fəaliyyət', 'event', 'activity', 'nələr', 'neler', 'var'],
      az: "Fəaliyyətlərimiz: 📅 Vebinarlar (20, 1180+), Seminar & Master-klass (21, 787+), Konfranslar (2, 590+), İnfoturlar (3, 69+), Səhər Yeməyi & Oxu (5, 49+) və Rayon Turları. Hamısı haqqında ana səhifədən keçid edə bilərsiniz!",
      en: "Our activities: 📅 Webinars (20, 1180+), Seminars & Masterclasses (21, 787+), Conferences (2, 590+), Info-Tours (3, 69+), Breakfast & Reading (5, 49+) and Regional Tours. You can explore them all from the homepage!"
    }
  ];

  function localAnswer(text) {
    var q = (text || '').toLowerCase();
    // sual azərbaycancadırsa AZ, əks halda EN cavab
    var isAZ = /[əıöüçşğ]/i.test(q) || /(var|nə|necə|hansı|kim|sizin|mən|salam|olunub|olub|edib|bilərəm|zaman|idi|keçirilir|keçirilib|tədbir)/i.test(q);
    for (var i = 0; i < LOCAL_KB.length; i++) {
      var item = LOCAL_KB[i];
      for (var k = 0; k < item.keys.length; k++) {
        if (q.indexOf(item.keys[k]) !== -1) {
          return isAZ ? item.az : item.en;
        }
      }
    }
    return null;
  }

  // ---------- konfiqurasiya yükləmə ----------
  var config = window.NGD_GEMINI;
  function loadConfig(cb) {
    if (window.NGD_GEMINI && (window.NGD_GEMINI.apiKey || window.NGD_GEMINI._loaded)) {
      config = window.NGD_GEMINI;
      return cb();
    }
    var s = document.createElement('script');
    s.src = 'assets/gemini-config.js';
    s.onload = function () { config = window.NGD_GEMINI || {}; cb(); };
    s.onerror = function () { config = {}; cb(); };
    document.head.appendChild(s);
  }

  // ---------- DOM qurulması ----------
  var fab, panel, bodyEl, inputEl, chipsEl, headTitle, headSub, greetingNode, closeBtn, sendBtn;
  var t = texts(document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'az');
  var history = [];
  var busy = false;

  var ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></svg>';
  var ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  var ICON_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>';

  function buildUI() {
    fab = document.createElement('button');
    fab.type = 'button';
    fab.className = 'chat-fab';
    fab.setAttribute('aria-label', t.openLabel);
    fab.setAttribute('aria-expanded', 'false');
    fab.innerHTML = '<span class="chat-fab-icon">' + ICON_CHAT + '</span>' +
      '<span class="chat-fab-close">' + ICON_CLOSE + '</span>';
    document.body.appendChild(fab);

    panel = document.createElement('div');
    panel.className = 'chat-panel';
    panel.innerHTML =
      '<div class="chat-head">' +
        '<div class="chat-avatar">🩺</div>' +
        '<div class="chat-head-txt">' +
          '<div class="chat-title"></div>' +
          '<div class="chat-sub"></div>' +
        '</div>' +
        '<button type="button" class="chat-close" aria-label="' + t.closeLabel + '">' + ICON_CLOSE + '</button>' +
      '</div>' +
      '<div class="chat-chips"></div>' +
      '<div class="chat-body"></div>' +
      '<div class="chat-note"></div>' +
      '<div class="chat-input">' +
        '<input type="text" autocomplete="off" placeholder="' + t.placeholder + '" aria-label="' + t.placeholder + '">' +
        '<button type="button" class="chat-send" aria-label="' + t.sendLabel + '">' + ICON_SEND + '</button>' +
      '</div>';
    document.body.appendChild(panel);

    headTitle = panel.querySelector('.chat-title');
    headSub = panel.querySelector('.chat-sub');
    bodyEl = panel.querySelector('.chat-body');
    chipsEl = panel.querySelector('.chat-chips');
    inputEl = panel.querySelector('.chat-input input');
    closeBtn = panel.querySelector('.chat-close');
    sendBtn = panel.querySelector('.chat-send');
    closeBtn.addEventListener('click', toggle);
    sendBtn.addEventListener('click', send);
    inputEl.addEventListener('keydown', function (e) { if (e.key === 'Enter') send(); });
    fab.addEventListener('click', toggle);

    applyLang();
    greetingNode = addMsg(t.greeting, 'bot');
  }

  function applyLang(lang) {
    var l = lang || (document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'az');
    t = texts(l);
    if (headTitle) { headTitle.textContent = t.title; headSub.textContent = t.subtitle; }
    if (inputEl) inputEl.placeholder = t.placeholder;
    if (closeBtn) closeBtn.setAttribute('aria-label', t.closeLabel);
    if (sendBtn) sendBtn.setAttribute('aria-label', t.sendLabel);
    if (fab) fab.setAttribute('aria-label', panel && panel.classList.contains('open') ? t.closeLabel : t.openLabel);
    if (chipsEl) {
      chipsEl.innerHTML = '';
      t.chips.forEach(function (chip) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'chat-chip';
        b.textContent = chip;
        b.addEventListener('click', function () {
          if (busy) return;
          inputEl.value = chip;
          send();
        });
        chipsEl.appendChild(b);
      });
    }
    if (greetingNode) greetingNode.textContent = t.greeting;
  }

  function toggle() {
    var open = panel.classList.toggle('open');
    fab.classList.toggle('is-open', open);
    fab.setAttribute('aria-expanded', open ? 'true' : 'false');
    fab.setAttribute('aria-label', open ? t.closeLabel : t.openLabel);
    if (open) inputEl.focus();
  }

  function addMsg(text, who) {
    var d = document.createElement('div');
    d.className = 'chat-msg ' + who;
    d.textContent = text;
    bodyEl.appendChild(d);
    bodyEl.scrollTop = bodyEl.scrollHeight;
    return d;
  }

  function addTyping() {
    var d = document.createElement('div');
    d.className = 'chat-msg bot chat-typing-wrap';
    d.innerHTML = '<span class="chat-typing"><i></i><i></i><i></i></span>';
    bodyEl.appendChild(d);
    bodyEl.scrollTop = bodyEl.scrollHeight;
    return d;
  }

  function fallbackMsg(text, err) {
    // Gemini uğursuz olarsa: lokal bilik bazasından cavab, yoxdursa quota/xəta mesajı
    var fb = localAnswer(text);
    if (fb) return fb;
    if (err && err.status === 429 && /quota/i.test(err.message || '')) return t.quota;
    return t.error;
  }

  function send() {
    var text = inputEl.value.trim();
    if (!text || busy) return;
    inputEl.value = '';
    addMsg(text, 'user');
    history.push({ role: 'user', parts: [{ text: text }] });

    if (!config || !config.apiKey) {
      addMsg(localAnswer(text) || t.noKey, 'bot');
      history.length = 0;
      return;
    }

    busy = true;
    var typing = addTyping();
    callGemini(text).then(function (reply) {
      typing.remove();
      addMsg(reply, 'bot');
      history.push({ role: 'model', parts: [{ text: reply }] });
      if (history.length > 16) history = history.slice(-16);
    }).catch(function (err) {
      typing.remove();
      var msg = fallbackMsg(text, err);
      addMsg(msg, 'bot');
      if (msg !== t.quota && msg !== t.error) {
        history.push({ role: 'model', parts: [{ text: msg }] });
        if (history.length > 16) history = history.slice(-16);
      }
    }).finally(function () {
      busy = false;
    });
  }

  function callGemini(userText) {
    var url = 'https://generativelanguage.googleapis.com/v1beta/models/' +
      encodeURIComponent(config.model || 'gemini-flash-latest') +
      ':generateContent?key=' + encodeURIComponent(config.apiKey);
    var body = {
      system_instruction: { parts: [{ text: SYSTEM }] },
      contents: history,
      generationConfig: { temperature: 0.4, maxOutputTokens: 800 }
    };
    var MAX_ATTEMPTS = 3;
    function attempt(n) {
      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }).then(function (res) {
        return res.json().then(function (data) {
          if (!res.ok || data.error) {
            var err = new Error((data.error && data.error.message) || 'HTTP ' + res.status);
            err.status = res.status;
            throw err;
          }
          var cand = data.candidates && data.candidates[0];
          if (!cand || !cand.content || !cand.content.parts) throw new Error('empty response');
          return cand.content.parts.map(function (p) { return p.text || ''; }).join('').trim();
        });
      }).catch(function (err) {
        // quota xətası (429 + 'quota') — retry faydasızdır, dərhal at
        var isQuota = err.status === 429 && /quota/i.test(err.message || '');
        // rate limit (429) və ya müvəqqəti server xətası (5xx) — artan fasilə ilə yenidən cəhd et
        var retriable = !isQuota && (err.status === 429 || (err.status >= 500 && err.status < 600));
        if (retriable && n < MAX_ATTEMPTS) {
          return new Promise(function (r) { setTimeout(r, 1500 * n); })
            .then(function () { return attempt(n + 1); });
        }
        throw err;
      });
    }
    return attempt(1);
  }

  // ---------- işə salma ----------
  loadConfig(function () {
    buildUI();
    window.NGD_CHAT = {
      setLang: applyLang,
      open: function () { if (panel && !panel.classList.contains('open')) toggle(); }
    };
  });
})();
