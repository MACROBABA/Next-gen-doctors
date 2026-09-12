(function(){
  'use strict';

  var feature = document.querySelector('[data-featured-activity]');
  if(!feature) return;

  var categoryKey = feature.getAttribute('data-featured-activity');
  var categories = window.NGD_ACTIVITY_CATEGORIES || {};
  var category = categories[categoryKey];
  if(!category) return;

  var MONTH_AZ = ['Yanvar','Fevral','Mart','Aprel','May','İyun','İyul','Avqust','Sentyabr','Oktyabr','Noyabr','Dekabr'];
  var MONTH_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var title = feature.querySelector('h2');
  var description = feature.querySelector('.desc');
  var metaRows = feature.querySelectorAll('.event-meta-list .row');
  var urgency = feature.querySelector('.event-urgency');
  var detailsLink = feature.querySelector('.btn-ghost-light');
  var photo = feature.querySelector('.event-photo img');

  function currentLang(){
    return document.documentElement.getAttribute('lang') || 'az';
  }

  function eventDate(activity){
    var time = (activity.time || '23:59').split(':');
    return new Date(activity.year, activity.m - 1, activity.d, Number(time[0]), Number(time[1] || 0));
  }

  function setMetaValue(index, value){
    if(!metaRows[index]) return;
    var children = metaRows[index].children;
    if(children.length) children[children.length - 1].textContent = value;
  }

  function upcomingActivity(){
    var now = new Date();
    return (window.NGD_ACTIVITIES || []).filter(function(activity){
      return activity.category === categoryKey && eventDate(activity) >= now;
    }).sort(function(a, b){
      return eventDate(a) - eventDate(b);
    })[0];
  }

  function render(){
    var lang = currentLang();
    var activity = upcomingActivity();
    var categoryName = lang === 'en' ? category.en : category.az;

    if(!activity){
      feature.classList.add('is-empty');
      if(title) title.textContent = lang === 'en'
        ? 'New ' + category.en.toLowerCase() + ' activities will be announced soon'
        : 'Yeni ' + category.az.toLowerCase() + ' fəaliyyəti tezliklə elan olunacaq';
      if(description) description.textContent = lang === 'en'
        ? 'When a new activity is planned, its title, date, time and venue will appear here.'
        : 'Yeni fəaliyyət planlaşdırılan kimi onun başlığı, tarixi, saatı və məkanı burada görünəcək.';
      return;
    }

    feature.classList.remove('is-empty');
    var months = lang === 'en' ? MONTH_EN : MONTH_AZ;
    var activityName = lang === 'en' ? activity.en : activity.az;
    var location = activity.location || (window.NGD_DEFAULT_LOCATION && window.NGD_DEFAULT_LOCATION[lang]) || 'Coolab';
    var dateText = activity.d + ' ' + months[activity.m - 1] + ' ' + activity.year;

    if(title) title.textContent = activityName;
    if(description) description.textContent = lang === 'en'
      ? 'Join our ' + categoryName.toLowerCase() + ' programme on “' + activityName + '”.'
      : '“' + activityName + '” mövzusunda ' + categoryName.toLowerCase() + ' proqramımıza qoşulun.';
    setMetaValue(0, dateText);
    setMetaValue(1, activity.time || (lang === 'en' ? 'To be announced' : 'Tezliklə elan olunacaq'));
    setMetaValue(2, location);
    if(urgency) urgency.textContent = lang === 'en'
      ? 'Register now to reserve your place.'
      : 'Yerinizi ayırmaq üçün indi qeydiyyatdan keçin.';
    if(detailsLink){
      detailsLink.href = '#planlasdirilmis-fealiyyetler';
      detailsLink.textContent = lang === 'en' ? 'See all activities' : 'Bütün fəaliyyətlərə bax';
    }
    if(photo) photo.alt = activityName;
  }

  window.addEventListener('langchange', render);
  render();
}());
