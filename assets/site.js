  // ============================================================
  //  📋 BİZƏ QOŞUL — GOOGLE FORM LİNKİ
  //  Linkinizi aşağıdakı "" içərisinə yazın, məsələn: "https://forms.gle/..."
  //  Bu link bütün səhifələrdəki "Bizə Qoşul" və "Qeydiyyatdan Keç"
  //  düymələrində avtomatik istifadə olunacaq.
  // ============================================================
  var NGD_JOIN_URL = "https://forms.gle/KVP1ce8GPTLTugpK9";

  // language toggle
  var langToggle = document.getElementById('langToggle');
  function applyLang(lang){
    document.documentElement.setAttribute('lang', lang);
    langToggle.querySelectorAll('button').forEach(function(b){
      b.classList.toggle('active', b.getAttribute('data-set-lang') === lang);
    });
    try{ localStorage.setItem('ngd-lang', lang); }catch(e){}
    if (window.renderMedCalendar) window.renderMedCalendar();
    var goBtn = document.querySelector('.go-top');
    if (goBtn) goBtn.setAttribute('aria-label', lang === 'en' ? 'Back to top' : 'Səhifənin yuxarısına qayıt');
    if (window.NGD_CHAT && window.NGD_CHAT.setLang) window.NGD_CHAT.setLang(lang);
    try{ window.dispatchEvent(new CustomEvent('langchange', {detail:{lang:lang}})); }catch(e){}
  }
  langToggle.addEventListener('click', function(e){
    var btn = e.target.closest('button[data-set-lang]');
    if(!btn) return;
    applyLang(btn.getAttribute('data-set-lang'));
  });
  var savedLang = 'az';
  try{ savedLang = localStorage.getItem('ngd-lang') || 'az'; }catch(e){}
  applyLang(savedLang);

  // Add playsinline to video (iOS Safari support, added via JS to avoid HTML validator warning)
  var introVideo = document.querySelector('.intro-video');
  if (introVideo) introVideo.setAttribute('playsinline', '');

  // mobile menu
  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  menuToggle.addEventListener('click', function(){
    var open = mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // scroll reveal
  var els = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('in'); });
  }

  // count-up numbers (skips conference index numbers 01-04, which aren't stats)
  var countEls = Array.from(document.querySelectorAll('.tabular')).filter(function(el){
    return !el.classList.contains('conf-index');
  });
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  countEls.forEach(function(el){
    var match = el.textContent.trim().match(/^(\d+)(.*)$/);
    if(!match) return;
    el.dataset.countTarget = match[1];
    el.dataset.countSuffix = match[2];
    if(!reduceMotion) el.textContent = '0' + match[2];
  });
  if(!reduceMotion && 'IntersectionObserver' in window){
    var countIo = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting || !entry.target.dataset.countTarget) return;
        countIo.unobserve(entry.target);
        var el = entry.target;
        var target = parseInt(el.dataset.countTarget, 10);
        var suffix = el.dataset.countSuffix || '';
        var duration = 5000;
        var start = null;
        function step(ts){
          if(start === null) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if(progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    countEls.forEach(function(el){ if(el.dataset.countTarget) countIo.observe(el); });
  }

  // medical calendar
  (function(){
    var calGrid = document.getElementById('calGrid');
    if(!calGrid) return;
    var calTitle = document.getElementById('calTitle');
    var calWeekdays = document.getElementById('calWeekdays');
    var calInfo = document.getElementById('calInfo');
    var calPrev = document.getElementById('calPrev');
    var calNext = document.getElementById('calNext');

    var MED_DAYS = [
      {m:2, d:4, az:'Ümumdünya Xərçənglə Mübarizə Günü', en:'World Cancer Day', field:true},
      {m:2, d:15, az:'Beynəlxalq Uşaq Xərçəngi Günü', en:'International Childhood Cancer Day', field:true},
      {m:3, d:3, az:'Ümumdünya Eşitmə Günü', en:'World Hearing Day', field:true},
      {m:3, d:20, az:'Ümumdünya Ağız Sağlamlığı Günü', en:'World Oral Health Day', field:true},
      {m:3, d:21, az:'Ümumdünya Daun Sindromu Günü', en:'World Down Syndrome Day'},
      {m:3, d:24, az:'Ümumdünya Vərəmlə Mübarizə Günü', en:'World Tuberculosis Day'},
      {m:4, d:2, az:'Ümumdünya Autizm Məlumatlılığı Günü', en:'World Autism Awareness Day'},
      {m:4, d:7, az:'Ümumdünya Səhiyyə Günü', en:'World Health Day'},
      {m:4, d:17, az:'Ümumdünya Hemofiliya Günü', en:'World Hemophilia Day', field:true},
      {m:4, d:25, az:'Ümumdünya Malyariya Günü', en:'World Malaria Day'},
      {m:5, d:5, az:'Ümumdünya Əl Gigiyenası Günü', en:'World Hand Hygiene Day'},
      {m:5, d:8, az:'Ümumdünya Qırmızı Xaç və Aypara Günü', en:'World Red Cross and Red Crescent Day'},
      {m:5, d:12, az:'Beynəlxalq Tibb Bacıları Günü', en:'International Nurses Day', field:true},
      {m:5, d:17, az:'Ümumdünya Hipertoniya Günü', en:'World Hypertension Day'},
      {m:5, d:19, az:'Ümumdünya Ailə Həkimləri Günü', en:'World Family Doctor Day', field:true},
      {m:5, d:31, az:'Tütünsüz Dünya Günü', en:'World No Tobacco Day'},
      {m:6, d:14, az:'Ümumdünya Qan Donoru Günü', en:'World Blood Donor Day'},
      {m:6, d:19, az:'Ümumdünya Oraqvari Hüceyrə Anemiyası Günü', en:'World Sickle Cell Awareness Day'},
      {m:7, d:28, az:'Ümumdünya Hepatit Günü', en:'World Hepatitis Day'},
      {m:8, d:1, az:'Ümumdünya Ana Südü Həftəsi', en:'World Breastfeeding Week', field:true},
      {m:9, d:8, az:'Ümumdünya Fizioterapiya Günü', en:'World Physical Therapy Day', field:true},
      {m:9, d:10, az:'Ümumdünya İntihara Qarşı Mübarizə Günü', en:'World Suicide Prevention Day'},
      {m:9, d:21, az:'Ümumdünya Alzheimer Günü', en:"World Alzheimer's Day"},
      {m:9, d:25, az:'Ümumdünya Əczaçılar Günü', en:'World Pharmacists Day', field:true},
      {m:9, d:28, az:'Ümumdünya Quduzluğa Qarşı Mübarizə Günü', en:'World Rabies Day'},
      {m:9, d:29, az:'Ümumdünya Ürək Günü', en:'World Heart Day'},
      {m:10, d:10, az:'Ümumdünya Psixi Sağlamlıq Günü', en:'World Mental Health Day'},
      {m:10, d:12, az:'Ümumdünya Artrit Günü', en:'World Arthritis Day'},
      {m:10, d:16, az:'Ümumdünya Anesteziologiya Günü', en:'World Anaesthesia Day', field:true},
      {m:10, d:20, az:'Ümumdünya Osteoporoz Günü', en:'World Osteoporosis Day'},
      {m:10, d:29, az:'Ümumdünya İnsult Günü', en:'World Stroke Day'},
      {m:11, d:8, az:'Beynəlxalq Radiologiya Günü', en:'International Day of Radiology', field:true},
      {m:11, d:12, az:'Ümumdünya Pnevmoniya Günü', en:'World Pneumonia Day'},
      {m:11, d:14, az:'Ümumdünya Diabet Günü', en:'World Diabetes Day'},
      {m:11, d:17, az:'Ümumdünya Vaxtından Əvvəl Doğulmuş Uşaqlar Günü', en:'World Prematurity Day'},
      {m:12, d:1, az:'Ümumdünya QİÇS Günü', en:'World AIDS Day'},
      {m:12, d:3, az:'Beynəlxalq Əlillər Günü', en:'International Day of Persons with Disabilities'},
      {m:12, d:12, az:'Ümumdünya Səhiyyənin Əhatəliliyi Günü', en:'Universal Health Coverage Day'}
    ];
    // observance days pinned to an "nth weekday" rather than a fixed date
    var MED_DAYS_NTH = [
      {m:3, nth:2, wd:4, az:'Ümumdünya Böyrək Günü', en:'World Kidney Day', field:true},
      {m:5, nth:1, wd:2, az:'Ümumdünya Astma Günü', en:'World Asthma Day', field:true},
      {m:9, nth:2, wd:6, az:'Ümumdünya İlk Yardım Günü', en:'World First Aid Day'},
      {m:10, nth:2, wd:4, az:'Ümumdünya Görmə Günü', en:'World Sight Day', field:true},
      {m:11, nth:3, wd:3, az:'Ümumdünya XOAX Günü', en:'World COPD Day', field:true}
    ];
    // observance days pinned to the LAST occurrence of a weekday in the month
    var MED_DAYS_LAST = [
      {m:1, wd:0, az:'Ümumdünya Cüzam (Leprozi) Günü', en:'World Leprosy Day'}
    ];
    // observance days pinned to the literal last calendar day of the month
    var MED_DAYS_LASTDAY = [
      {m:2, az:'Ümumdünya Nadir Xəstəliklər Günü', en:'Rare Disease Day', field:true}
    ];
    var PLANNED_ACTIVITIES = (window.NGD_ACTIVITIES || []).filter(function(ev){
      return !!ev.category;
    });
    function nthWeekdayOfMonth(year, monthIdx, nth, weekday){
      var d = new Date(year, monthIdx, 1);
      var offset = (weekday - d.getDay() + 7) % 7;
      return 1 + offset + (nth - 1) * 7;
    }
    function lastWeekdayOfMonth(year, monthIdx, weekday){
      var lastDate = new Date(year, monthIdx + 1, 0);
      var offset = (lastDate.getDay() - weekday + 7) % 7;
      return lastDate.getDate() - offset;
    }
    function lastDayOfMonth(year, monthIdx){
      return new Date(year, monthIdx + 1, 0).getDate();
    }
    function eventsForMonth(year, monthIdx){
      var list = MED_DAYS.filter(function(ev){ return ev.m === monthIdx + 1; }).map(function(ev){
        return { d: ev.d, az: ev.az, en: ev.en, field: !!ev.field };
      });
      MED_DAYS_NTH.forEach(function(ev){
        if (ev.m === monthIdx + 1){
          list.push({ d: nthWeekdayOfMonth(year, monthIdx, ev.nth, ev.wd), az: ev.az, en: ev.en, field: !!ev.field });
        }
      });
      MED_DAYS_LAST.forEach(function(ev){
        if (ev.m === monthIdx + 1){
          list.push({ d: lastWeekdayOfMonth(year, monthIdx, ev.wd), az: ev.az, en: ev.en, field: !!ev.field });
        }
      });
      MED_DAYS_LASTDAY.forEach(function(ev){
        if (ev.m === monthIdx + 1){
          list.push({ d: lastDayOfMonth(year, monthIdx), az: ev.az, en: ev.en, field: !!ev.field });
        }
      });
      PLANNED_ACTIVITIES.forEach(function(ev){
        if (ev.year === year && ev.m === monthIdx + 1){
          list.push({ d: ev.d, az: ev.az, en: ev.en, time: ev.time || '', slug: ev.slug, category: ev.category, activity:true });
        }
      });
      return list;
    }
    var MONTH_AZ = ['Yanvar','Fevral','Mart','Aprel','May','İyun','İyul','Avqust','Sentyabr','Oktyabr','Noyabr','Dekabr'];
    var MONTH_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var WD_AZ = ['B.e','Ç.a','Ç','C.a','C','Ş','B'];
    var WD_EN = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

    var today = new Date();
    var viewYear = today.getFullYear();
    var viewMonth = today.getMonth();
    var activeCell = null;

    function lang(){ return document.documentElement.getAttribute('lang') || 'az'; }
    function dayName(item){ return lang() === 'en' ? item.en : item.az; }
    function escapeHTML(value){
      return String(value).replace(/[&<>"']/g, function(ch){
        return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch];
      });
    }
    function activityHref(item){
      var categories = window.NGD_ACTIVITY_CATEGORIES || {};
      var category = categories[item.category];
      return category ? category.page + '#planlasdirilmis-fealiyyetler' : '#';
    }

    var currentEvents = {};

    function renderInfo(items){
      calInfo.classList.toggle('has-selection', !!(items && items.length));
      if(!items || !items.length){
        calInfo.innerHTML = lang() === 'en'
          ? '<p class="empty">Hover over or select a marked date to see the activity.</p>'
          : '<p class="empty">Fəaliyyət və ya tibb günü olan tarixi seçin.</p>';
        return;
      }
      var orderedItems = items.slice().sort(function(a, b){ return (b.activity ? 1 : 0) - (a.activity ? 1 : 0); });
      calInfo.innerHTML = orderedItems.map(function(item){
        var label = item.activity
          ? (lang() === 'en' ? 'Planned activity' : 'Planlaşdırılmış fəaliyyət')
          : (item.field
            ? (lang() === 'en' ? 'Medical Field Day' : 'Tibb Sahəsi Günü')
            : (lang() === 'en' ? 'Health Awareness Day' : 'Sağlamlıq Günü'));
        var time = item.time ? '<span class="cal-time">' + escapeHTML(item.time) + '</span>' : '';
        var name = '<span class="name">' + escapeHTML(dayName(item)) + '</span>';
        if(item.activity){
          return '<a class="cal-activity-link" href="' + activityHref(item) + '">' +
            '<span class="lbl">' + label + '</span>' + name + time +
            '<span class="cal-link-label">' + (lang() === 'en' ? 'View activity' : 'Fəaliyyətə bax') + ' <b aria-hidden="true">→</b></span>' +
          '</a>';
        }
        return '<div class="cal-info-item"><span class="lbl">' + label + '</span>' + name + '</div>';
      }).join('');
    }

    function selectCell(cell){
      if(activeCell) activeCell.classList.remove('is-active');
      activeCell = cell;
      cell.classList.add('is-active');
      renderInfo(currentEvents[cell.dataset.day]);
    }

    function render(){
      var months = lang() === 'en' ? MONTH_EN : MONTH_AZ;
      var weekdays = lang() === 'en' ? WD_EN : WD_AZ;
      calTitle.textContent = months[viewMonth] + ' ' + viewYear;
      calWeekdays.innerHTML = weekdays.map(function(w){ return '<span>' + w + '</span>'; }).join('');

      var firstDay = new Date(viewYear, viewMonth, 1).getDay();
      var offset = (firstDay + 6) % 7;
      var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

      currentEvents = {};
      eventsForMonth(viewYear, viewMonth).forEach(function(ev){
        if(!currentEvents[ev.d]) currentEvents[ev.d] = [];
        currentEvents[ev.d].push(ev);
      });

      var html = '';
      for (var i = 0; i < offset; i++) html += '<span class="cal-day is-blank"></span>';
      for (var d = 1; d <= daysInMonth; d++) {
        var events = currentEvents[d] || [];
        var isToday = viewYear === today.getFullYear() && viewMonth === today.getMonth() && d === today.getDate();
        var hasActivity = events.some(function(ev){ return ev.activity; });
        var hasField = events.some(function(ev){ return ev.field; });
        var titles = events.map(dayName).join(' • ');
        var cls = 'cal-day' + (isToday ? ' is-today' : '') + (events.length ? ' has-event' : '') + (hasField ? ' is-field' : '') + (hasActivity ? ' is-activity' : '');
        var attrs = events.length ? ' title="' + escapeHTML(titles) + '" aria-label="' + escapeHTML(d + ': ' + titles) + '"' : '';
        html += events.length
          ? '<button type="button" class="' + cls + '" data-day="' + d + '"' + attrs + '>' + d + '</button>'
          : '<span class="' + cls + '" data-day="' + d + '">' + d + '</span>';
      }
      calGrid.innerHTML = html;
      activeCell = null;
      renderInfo(null);

      if (viewYear === today.getFullYear() && viewMonth === today.getMonth()) {
        var cells = Array.from(calGrid.querySelectorAll('.has-event'));
        var sel = calGrid.querySelector('.is-today.has-event') ||
          cells.find(function(c){ return parseInt(c.dataset.day, 10) >= today.getDate(); }) ||
          cells[0];
        if (sel) selectCell(sel);
      }
    }

    calGrid.addEventListener('click', function(e){
      var cell = e.target.closest('.cal-day.has-event');
      if (cell) selectCell(cell);
    });
    calGrid.addEventListener('mouseover', function(e){
      var cell = e.target.closest('.cal-day.has-event');
      if (cell && cell !== activeCell) selectCell(cell);
    });
    calGrid.addEventListener('focusin', function(e){
      var cell = e.target.closest('.cal-day.has-event');
      if (cell && cell !== activeCell) selectCell(cell);
    });
    calPrev.addEventListener('click', function(){
      viewMonth--; if (viewMonth < 0) { viewMonth = 11; viewYear--; }
      render();
    });
    calNext.addEventListener('click', function(){
      viewMonth++; if (viewMonth > 11) { viewMonth = 0; viewYear++; }
      render();
    });

    render();
    window.renderMedCalendar = render;
  })();

  // past-events photo carousel (auto-rotates every 5s)
  (function(){
    var boxes = document.querySelectorAll('.past-photo');
    if(!boxes.length) return;
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    boxes.forEach(function(box){
      var imgs = box.querySelectorAll('img');
      if(imgs.length < 2) return;
      var i = 0;
      setInterval(function(){
        imgs[i].classList.remove('is-active');
        i = (i + 1) % imgs.length;
        imgs[i].classList.add('is-active');
      }, 5000);
    });
  })();

  // go to top button
  (function(){
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'go-top';
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 15 6-6 6 6"></path></svg>';
    document.body.appendChild(btn);
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var shown = false;
    // yalnız uzun səhifələrdə göstər: məzmun ekrandan ~1.5 dəfə hündürdürsə
    function pageIsLong(){
      var doc = document.documentElement;
      var h = Math.max(doc.scrollHeight, doc.offsetHeight, document.body.scrollHeight);
      return h > window.innerHeight * 1.5;
    }
    function toggle(){
      var should = pageIsLong() && (window.pageYOffset || document.documentElement.scrollTop) > 400;
      if(should !== shown){
        shown = should;
        btn.classList.toggle('show', should);
      }
    }
    window.addEventListener('scroll', toggle, { passive: true });
    window.addEventListener('resize', toggle, { passive: true });
    window.addEventListener('load', toggle, { passive: true });
    toggle();
    btn.addEventListener('click', function(){
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  })();

  // chatbot loader (assets/chatbot.js dinamik yüklənir — bütün səhifələrdə)
  (function(){
    var s = document.createElement('script');
    s.src = 'assets/chatbot.js';
    document.body.appendChild(s);
  })();

  // "Bizə Qoşul" üzən düyməsi (chatbot düyməsi kimi — bütün səhifələrdə) + qeydiyyat düymələri
  (function(){
    var hasUrl = !!NGD_JOIN_URL;
    var page = location.pathname.split('/').pop();
    var fallback = (page === '' || page === 'index.html') ? '#qosul' : 'index.html#qosul';

    // 1) Sağ aşağı küncdə üzən "Bizə Qoşul" düyməsi
    var fab = document.createElement('a');
    fab.className = 'join-fab';
    fab.href = hasUrl ? NGD_JOIN_URL : fallback;
    if (hasUrl) { fab.target = '_blank'; fab.rel = 'noopener'; }
    fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>' +
      '<span data-lang="az">Bizə Qoşul</span><span data-lang="en">Join Us</span>';
    document.body.appendChild(fab);    // 2) "Qeydiyyatdan Keç" düymələri (href="#") — link veriləndə formaya yönəldilir
    if (hasUrl) {
      document.querySelectorAll('a[href="#"]').forEach(function(a){
        a.href = NGD_JOIN_URL;
        a.target = '_blank'; a.rel = 'noopener';
      });
    }
  })();

  // ============================================================
  //  🎬 PARALLAX + SCROLL REVEAL ANİMASİYALARI
  // ============================================================
  (function(){
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // — Parallax fon şəkilləri —
    document.querySelectorAll('[data-parallax]').forEach(function(section){
      var bg = section.querySelector('.parallax-bg');
      if (!bg) return;
      var src = section.getAttribute('data-parallax');
      bg.style.backgroundImage = 'url(' + src + ')';
    });

    var ticking = false;
    function onScroll(){
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function(){
        var wh = window.innerHeight;
        document.querySelectorAll('.parallax-bg').forEach(function(bg){
          var section = bg.parentElement;
          var rect = section.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > wh) return;
          var progress = (wh - rect.top) / (wh + rect.height);
          var offset = (progress - 0.5) * 60;
          bg.style.transform = 'translateY(' + offset + 'px)';
        });
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();

    // — Scroll reveal (staggered) —
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold:0.15, rootMargin:'0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function(el){
      revealObserver.observe(el);
    });
  })();
