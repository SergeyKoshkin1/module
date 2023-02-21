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

   
})

menuLink.forEach(function(element){
element.addEventListener('click', function(){
    burger.classList.remove('burger-active');
    menu.classList.remove('header__nav--active');
    close.classList.remove('close--active');
    
})

close.addEventListener('click',
function (){
    burger.classList.remove('burger-active');
    menu.classList.remove('header__nav--active');
    close.classList.remove('close--active');
    
})

})
