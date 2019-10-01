var mainNav = document.getElementById('main-nav');
var navPrev = document.getElementsByClassName('nav-prev');
var mainContent = document.getElementById('main-content');
var hamburger = document.getElementById('hamburger');

if (!localStorage.getItem('nav')) {
  localStorage.setItem('nav', 'off');
} else if (localStorage.getItem('nav') === 'on') {
  mainNav.classList.add('active');
  hamburger.classList.add('is-active');
  mainContent.classList.add('active');
  if (navPrev[0]) {
    navPrev[0].classList.add('active');
  }
}

function toggleMainNav() {
  if (localStorage.getItem('nav') === 'off') {
    hamburger.classList.add('is-active');
    mainNav.classList.add('active');
    mainContent.classList.add('active');
    if (navPrev[0]) {
      navPrev[0].classList.add('active');
    }
    localStorage.setItem('nav', 'on');
  } else {
    hamburger.classList.remove('is-active');
    mainNav.classList.remove('active');
    mainContent.classList.remove('active');
    if (navPrev[0]) {
      navPrev[0].classList.remove('active');
    }
    localStorage.setItem('nav', 'off');
  }
}
