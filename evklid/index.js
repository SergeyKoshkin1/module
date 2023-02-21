let burger = document.querySelector('.burger');
let close = document.querySelector('.close');
let menu = document.querySelector('.header__nav');
let menuLink = document.querySelectorAll('.nav__link');
let SearchClose = document.querySelector('.btn-search-close');

burger.addEventListener('click',
function() {
    burger.classList.toggle('burger-active');
    menu.classList.toggle('header__nav--active');
    close.classList.toggle('close--active');

    document.body.classList.toggle('stop-scroll');
})

menuLink.forEach(function(element){
element.addEventListener('click', function(){
    burger.classList.remove('burger-active');
    menu.classList.remove('header__nav--active');
    close.classList.remove('close--active');
    document.body.classList.remove('stop-scroll');
})

close.addEventListener('click',
function (){
    burger.classList.remove('burger-active');
    menu.classList.remove('header__nav--active');
    close.classList.remove('close--active');
    document.body.classList.remove('stop-scroll');
})

})


let headerSearch = document.querySelector('.header__search');
let search = document.querySelector('.search');
let btnSearchClose =  document.querySelector('.btn-search-close');

headerSearch.addEventListener('click',
function() {
  search.classList.toggle('search--active');
  setTimeout(function(){
    SearchClose.focus()
  }, 100)
})

btnSearchClose.addEventListener('click',
function() {
  search.classList.remove('search--active');
})



const swiper = new Swiper('.swiper', {
  spaceBetween:80,

  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
	pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
		clickable: true
  },
  a11y: {
    paginationBulletMessage: 'Слайд {{index}}'
  }
});




let tabsBtn = document.querySelectorAll('.tabs-btn');
let tabsItem = document.querySelectorAll('.tabs-item');

tabsBtn.forEach(function(element){
  element.addEventListener('click', function(e){
    const path = e.currentTarget.dataset.path;

    tabsBtn.forEach(function(btn){ btn.classList.remove('tabs-btn--active')});
    e.currentTarget.classList.add('tabs-btn--active');

    tabsItem.forEach(function(element){ element.classList.remove('tabs-item--active')});
    document.querySelector(`[data-target="${path}"]`).classList.add('tabs-item--active');
  });
});

new Accordion('.accordion-list', {
	elementClass: 'accordion',
	triggerClass: 'accordion__control',
	panelClass: 'accordion__content',
	activeClass: 'accordion--active'
});
