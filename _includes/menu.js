var mainNav = document.getElementById('main-nav');
var navPrev = document.getElementsByClassName('nav-prev');
var mainContent = document.getElementById('main-content');
var hamburger = document.getElementById('hamburger');
var toggle = 'off';
function toggleMainNav() {
  if (toggle === 'off') {
    hamburger.classList.add('is-active');
    mainNav.classList.add('active');
    mainContent.classList.add('active');
    if (navPrev[0]) navPrev[0].classList.add('active');
    toggle = 'on';
  } else {
    hamburger.classList.remove('is-active');
    mainNav.classList.remove('active');
    mainContent.classList.remove('active');
    if (navPrev[0]) navPrev[0].classList.remove('active');
    toggle = 'off';
  }
}
