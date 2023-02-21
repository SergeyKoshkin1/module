let input = document.querySelector('.input');
let button = document.querySelector('.button');
let timer = document.querySelector('.timer');


let test;

function onClick(){
    if(input.value == '') return;
    clearInterval(test);
    let inputNumber = parseInt( input.value);
    timer.textContent = inputNumber;
    input.value = '';
    
    let count = function(){        
        if (inputNumber <= 0 || inputNumber.type ){
            clearInterval(test);
        } 
        else {
        inputNumber--;
        timer.textContent = inputNumber;
        }};
        test = setInterval(count, 1000);   
}

button.addEventListener('click', onClick);
     
     
    

