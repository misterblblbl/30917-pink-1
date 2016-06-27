
var menuToggle = document.querySelector('.main-nav__toggle');
var menuWrapper = document.querySelector('.main-nav__wrapper');
var sliderControlRight = document.querySelector('.reviews__slider-controls--right');
var sliderControlLeft = document.querySelector('.reviews__slider-controls--left');
var toggles = document.querySelectorAll('.reviews__input');

menuToggle.addEventListener('click', function(){
  menuWrapper.classList.toggle('main-nav__wrapper--closed');
  if (menuToggle.classList.contains('main-nav__toggle--closed')) {
    menuToggle.classList.remove('main-nav__toggle--closed');
    menuToggle.classList.add('main-nav__toggle--opened');
    menuWrapper.classList.add('main-nav__wrapper--opened');
  } else if (menuToggle.classList.contains('main-nav__toggle--opened')) {
    menuToggle.classList.remove('main-nav__toggle--opened');
    menuToggle.classList.add('main-nav__toggle--closed');
    menuWrapper.classList.remove('main-nav__wrapper--opened');
    menuWrapper.classList.add('main-nav__wrapper--closed');
  }
});

if(sliderControlLeft && sliderControlRight) {
  sliderControlLeft.addEventListener('click', function() {
    for(var i = 0; i < toggles.length; i++) {
      if(toggles[i].checked) {
        if(i == 0) {
          toggles[i].checked = false;
          toggles[toggles.length - 1].checked = true;
          break;
        } else {
          toggles[i].checked = false;
          toggles[i - 1].checked = true;
          break;
        }
      }
    }
  });
  sliderControlRight.addEventListener('click', function() {
    for(var i = 0; i < toggles.length; i++) {
      if(toggles[i].checked) {
        if(i == toggles.length - 1) {
          toggles[i].checked = false;
          toggles[0].checked = true;
          break;
        } else {
          toggles[i].checked = false;
          toggles[i + 1].checked = true;
          break;
        }
      }
    }
  });
}

