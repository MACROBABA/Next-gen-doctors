(function(){
  'use strict';

  window.NGD_ACTIVITY_CATEGORIES = {
    webinar: {
      page: 'vebinar.html',
      az: 'Vebinar',
      en: 'Webinar'
    },
    seminar: {
      page: 'seminar-masterklass.html',
      az: 'Seminar & Master-klass',
      en: 'Seminar & Masterclasses'
    },
    infotur: {
      page: 'infotur.html',
      az: 'İnfotur',
      en: 'Info-tour'
    },
    breakfast: {
      page: 'sehar-yemeyi.html',
      az: 'Səhər Yeməyi & Oxu',
      en: 'Breakfast & Reading'
    }
  };

  window.NGD_DEFAULT_LOCATION = {
    az: 'Coolab',
    en: 'Coolab'
  };

  // Yeni fəaliyyət əlavə etmək üçün yalnız bu siyahıya bir sətir əlavə edin.
  // Təqvim və uyğun fəaliyyət səhifəsi avtomatik yenilənəcək.
  window.NGD_ACTIVITIES = [
    {year:2026, m:3, d:1, time:'14:00', category:'seminar', slug:'menstruasiya-problemleri', az:'Menstruasiya problemləri', en:'Menstrual problems'},
    {year:2026, m:3, d:8, time:'14:00', category:'seminar', slug:'anadangəlmə-urek-qusurlari', az:'Anadangəlmə ürək qüsurları', en:'Congenital heart defects'},
    {year:2026, m:3, d:14, time:'14:00', category:'infotur', slug:'merkezi-klinika-infotur', az:'Klinik infotur — Mərkəzi Klinika', en:'Clinic info-tour — Central Clinic'},
    {year:2026, m:3, d:15, time:'12:00', category:'seminar', slug:'cinsi-yolla-kecen-xestelikler', az:'Cinsi yolla keçən xəstəliklər', en:'Sexually transmitted infections'},
    {year:2026, m:3, d:26, time:'21:00', category:'seminar', slug:'yenidogulmuslarda-qeyri-infeksion-xestelikler', az:'Yenidoğulmuş uşaqlarda qeyri-infeksion xəstəliklər', en:'Non-infectious diseases in newborns'},
    {year:2026, m:3, d:29, time:'21:00', category:'seminar', slug:'anesteziologiyanin-esaslari', az:'Anesteziologiyanın əsasları', en:'Fundamentals of anesthesiology'},
    {year:2026, m:4, d:5, time:'14:00', category:'seminar', slug:'tecili-ginekoloji-veziyyetler', az:'Təcili ginekoloji vəziyyətlər', en:'Urgent gynecological conditions'},
    {year:2026, m:4, d:19, time:'14:00', category:'seminar', slug:'usaqlarda-antibiotik-istifadesi', az:'Uşaqlarda antibiotik istifadəsi', en:'Antibiotic use in children'},
    {year:2026, m:4, d:25, time:'14:00', category:'breakfast', slug:'seher-yemeyi', az:'Səhər yeməyi', en:'Breakfast & Reading'},
    {year:2026, m:4, d:26, time:'14:00', category:'seminar', slug:'sud-vezi-radiologiyasi', az:'Süd vəzi radiologiyası: gündəlik praktikada yanaşma', en:'Breast radiology: approach in daily practice'},
    {year:2026, m:4, d:30, time:'21:00', category:'seminar', slug:'qarin-agrilarina-yanasma', az:'Qarın ağrılarına yanaşma: nə zaman əməliyyata qərar verilir?', en:'Approach to abdominal pain: when is surgery indicated?'},
    {year:2026, m:5, d:10, time:'14:00', category:'seminar', slug:'beyin-sisleri', az:'Klinik hal müzakirəsi: Beyin şişləri', en:'Clinical case discussion: brain tumors'},
    {year:2026, m:5, d:14, time:'21:00', category:'seminar', slug:'hormonlar', az:'Hormonlar: orqanizmin kimyəvi dili', en:"Hormones: the body's chemical language"},
    {year:2026, m:5, d:17, time:'14:00', category:'seminar', slug:'karyera-yol-xeritesi', az:'Karyera yol xəritəsi: Tədqiqatçı kimi düşünmək', en:'Career roadmap: thinking like a researcher'},
    {year:2026, m:5, d:21, time:'21:00', category:'seminar', slug:'stomatologiyada-suni-intellekt', az:'Stomatologiyada süni intellekt', en:'Artificial intelligence in dentistry'},
    {year:2026, m:5, d:24, time:'14:00', category:'seminar', slug:'ultrases-praktik-telim', az:'Ultrasəs üzrə praktik təlim', en:'Practical ultrasound training'},
    {year:2026, m:5, d:31, time:'21:00', category:'seminar', slug:'allergik-reaksiyalar', az:'Allergik reaksiyalar və adrenalin istifadəsi', en:'Allergic reactions and use of adrenaline'},
    {year:2026, m:6, d:11, time:'20:00', category:'webinar', slug:'autoimmun-tiroditler', az:'Autoimmun tiroiditlər (onlayn)', en:'Autoimmune thyroiditis (online)'},
    {year:2026, m:6, d:18, time:'21:00', category:'webinar', slug:'usaqlarda-invaziv-kardiologiya', az:'Uşaqlarda invaziv kardiologiya (onlayn)', en:'Pediatric invasive cardiology (online)'},
    {year:2026, m:6, d:25, time:'21:00', category:'webinar', slug:'dis-cekimi-agirlasmalari', az:'Diş çəkimi ağırlaşmaları və onların idarə olunması (onlayn)', en:'Dental extraction complications and their management (online)'},
    {year:2026, m:9, d:6, time:'21:00', category:'seminar', slug:'academic-english', az:'Niyə gələcəyin hər həkimi “Academic English” bilməlidir?', en:'Why should every future doctor know Academic English?'},
    {year:2026, m:9, d:10, time:'21:00', category:'seminar', slug:'interaktiv-meqale-muzakiresi', az:'İnteraktiv məqalə müzakirəsi', en:'Interactive article discussion'},
    {year:2026, m:9, d:17, time:'14:00', location:'Coolab', category:'seminar', slug:'dus-yolunda-ilk-addim', az:'DUS yolunda ilk addım nədir?', en:'What is the first step on the road to residency?'},
    {year:2026, m:9, d:24, time:'21:00', category:'seminar', slug:'neyrocerrah-olmaq', az:'Neyrocərrah olmaq: yol, çətinliklər və gələcəyi', en:'Becoming a neurosurgeon: path, challenges and future'},
    {year:2026, m:9, d:27, time:'14:00', category:'seminar', slug:'ilkin-cerrahi-verdisler', az:'İlkin cərrahi vərdişlər və cərrahi tikiş', en:'Basic surgical skills and suturing'}
  ];
}());
