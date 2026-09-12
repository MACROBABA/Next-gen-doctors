(function(){
  'use strict';

  var section = document.querySelector('[data-activity-category]');
  if(!section) return;

  var list = section.querySelector('.planned-activity-list');
  var categoryKey = section.getAttribute('data-activity-category');
  var categories = window.NGD_ACTIVITY_CATEGORIES || {};
  var category = categories[categoryKey];
  if(!list || !category) return;

  var MONTH_AZ = ['Yanvar','Fevral','Mart','Aprel','May','İyun','İyul','Avqust','Sentyabr','Oktyabr','Noyabr','Dekabr'];
  var MONTH_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  function currentLang(){
    return document.documentElement.getAttribute('lang') || 'az';
  }

  function activityDetailHref(activity){
    return 'fealiyyet-detay.html?event=' + encodeURIComponent(activity.slug);
  }

  function makeText(tag, className, value){
    var node = document.createElement(tag);
    if(className) node.className = className;
    node.textContent = value;
    return node;
  }

  function render(){
    var lang = currentLang();
    var months = lang === 'en' ? MONTH_EN : MONTH_AZ;
    var activities = (window.NGD_ACTIVITIES || []).filter(function(activity){
      return activity.category === categoryKey;
    }).sort(function(a, b){
      return new Date(b.year, b.m - 1, b.d) - new Date(a.year, a.m - 1, a.d);
    });

    list.replaceChildren();

    if(!activities.length){
      list.appendChild(makeText('p', 'planned-activity-empty', lang === 'en'
        ? 'New activities will be announced soon.'
        : 'Yeni fəaliyyətlər tezliklə elan olunacaq.'));
      return;
    }

    activities.forEach(function(activity){
      var card = document.createElement('a');
      card.className = 'planned-activity-card';
      card.href = activityDetailHref(activity);

      var date = document.createElement('span');
      date.className = 'planned-activity-date';
      date.appendChild(makeText('strong', '', String(activity.d).padStart(2, '0')));
      date.appendChild(makeText('small', '', months[activity.m - 1] + ' ' + activity.year));

      var body = document.createElement('span');
      body.className = 'planned-activity-body';
      body.appendChild(makeText('span', 'planned-activity-kind', lang === 'en' ? category.en : category.az));
      body.appendChild(makeText('span', 'planned-activity-name', lang === 'en' ? activity.en : activity.az));
      if(activity.time){
        body.appendChild(makeText('span', 'planned-activity-time', activity.time));
      }

      card.appendChild(date);
      card.appendChild(body);
      card.appendChild(makeText('span', 'planned-activity-arrow', '→'));
      list.appendChild(card);
    });
  }

  window.addEventListener('langchange', render);
  render();
}());
