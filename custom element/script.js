document.addEventListener("DOMContentLoaded", function () {
  const validation = new JustValidate('.section-form');
  const selector = document.querySelector("input[type='tel']");
  const im = new Inputmask("+7 (999) 999 99 99");
  im.mask(selector);

  validation
    .addField('.name', [{
        rule: 'required',
        errorMessage: 'Вы не ввели имя',
      },
        {
        rule: 'minLength',
        value: 2,
        errorMessage: "Не достаточное количество символов"
      },
      {
        rule: 'maxLength',
        value: 15,
        errorMessage: "Вы ввели больше чем положено"
      }
    ])
    .addField('.mail', [{
        rule: 'required',
        errorMessage: 'Вы не ввели e-mail',
      },
      {
        rule: 'email',
        errorMessage: 'Вы не корректно ввели email',
      }
    ])
    .addField('.tel', [
        {
            rule: 'required',
        errorMessage: 'Вы не ввели телефон',
      },
        {
      rule: "function",
      validator: function (name, value) {
        const phone = selector.inputmask.unmaskedvalue();
        return phone.length === 10
      },
      errorMessage: 'Не достаточное количество символов в строке',
    }
    

]);
})


// Функция ymaps.ready() будет вызвана, когда
            // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
            ymaps.ready(function () {
              var myMap = new ymaps.Map('map', {
                  center: [48.872185073737896,2.354223999999991],
                      zoom: 15        }, {
                      searchControlProvider: 'yandex#search'
                  }),
          
                  myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                      hintContent: 'улица дю Фобур Сен Дени  54',
                      balloonContent: 'Франция, Иль-де-Франс, Париж, X округ Парижа, улица дю Фобур Сен Дени  54'
                  }, {
                      // Опции.
                      // Необходимо указать данный тип макета.
                      iconLayout: 'default#image',
                      // Своё изображение иконки метки.
                      iconImageHref: './img/map.svg',
                      // Размеры метки.
                      iconImageSize: [50, 50],
                      // Смещение левого верхнего угла иконки относительно
                      // её "ножки" (точки привязки).
                      controls: ['smallMapDefaultSet']
                  }, {
                      searchControlProvider: 'nullyandex#search'
                  });
                  myMap.controls.remove('zoomControl');
                  myMap.controls.remove('rulerControl');
                  myMap.controls.remove('geolocationControl');
                  myMap.controls.remove('searchControl');
                  myMap.controls.remove('trafficControl');
                  myMap.controls.remove('typeSelector');
                  myMap.controls.remove('fullscreenControl');
                  
              myMap.geoObjects
                  .add(myPlacemark)
                  .add(myPlacemarkWithContent);
          });
          