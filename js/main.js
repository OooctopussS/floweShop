$(document).ready(function () {
  $("#review-1").on('click', function() {
     $.fancybox.open([
      {
        src: 'img/bestflowers-slider/roseReview1.jpg',  
      /*  opts : {
          thumb: 'img/bestflowers-slider/roseReview1.jpg(small)'
        }*/
      },
  /*    {
        src  : 'https://source.unsplash.com/0JYgd2QuMfw/1500x1000',
        opts : {
          thumb   : 'https://source.unsplash.com/0JYgd2QuMfw/240x160'
        }
      }*/
    ], {
      loop : true,
      thumbs : {
        autoStart : true
      }
    });
  });

  $("#review-2").on('click', function() {
    $.fancybox.open([
      {
        src: 'img/bestflowers-slider/liliesReview1.jpg',
      },
    ], {
      loop : true,
      thumbs : {
        autoStart : true
      }
    });
  });
  
  $("#phoneTel").mask("8 (999) 999-99-99");
  $("#phoneBuy").mask("8 (999) 999-99-99");

    var rellax = new Rellax('.main', {
      breakpoints:[0, 768, 1700]
    });

  const reviewsSlider = new Swiper('.bestflowers-slider', {
    // Параметры
    slidesPerView: 1,
    loop: false,
    // Стрелки навигации
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains("increase")) {
      ++e.target.parentElement.querySelector("input").value;
    } else if (e.target.classList.contains("decrease")) {
      --e.target.parentElement.querySelector("input").value;
      if (e.target.parentElement.querySelector("input").value < 1){
        e.target.parentElement.querySelector("input").value = 1;
      }
    }
  });

  const cardsMore = document.querySelectorAll('.card-invise');
  document.addEventListener('click', function (e) {
    const cardCount = document.querySelectorAll('.card-invise');
    let cardsUp = document.querySelector('.items-more');
    if (e.target.classList.contains("items-more") && cardCount.length != 0) {
      for (let i = 0; i < cardsMore.length; i++){
        cardsMore[i].classList.remove('card-invise');
      }
      cardsUp.classList.remove('items-moredown');
      cardsUp.classList.add('items-moreup');
    }
    if (e.target.classList.contains("items-more") && cardCount.length == 0) {
      for (let i = 0; i < cardsMore.length; i++) {
        cardsMore[i].classList.add('card-invise');
      }
      cardsUp.classList.remove('items-moreup');
      cardsUp.classList.add('items-moredown');
    }
  });

  reviewsSlider.keyboard.enable ();

  // Создание первого слайдера -> main-flowers
  let slidesToShow;
  let mainContainer = document.querySelector('body');
  if (mainContainer.clientWidth > 1240) {slidesToShow = 6;}
   else if (mainContainer.clientWidth > 827){slidesToShow = 4;}
    else if (mainContainer.clientWidth > 768) {slidesToShow = 3;}
     else if (mainContainer.clientWidth > 366) {slidesToShow = 2;}
      else {slidesToShow = 1;}
  let slidesToScroll = 1;
  let offset = 0;
  let step = 0;
  let slides = document.querySelectorAll('.main-shop-slider-item');
  let slider = [];
  let idSlider = [];
  const container = document.querySelector('.main-shop-slider');
  const btnPrev = document.querySelector('.main-shop-slider-btn-prev');
  const btnNext = document.querySelector('.main-shop-slider-btn-next');
  const slideWidth = container.clientWidth / slidesToShow;


  for (let i = 0; i < slides.length; i++) {
    idSlider[i] = slides[i].id;
    slider[i] = slides[i].firstChild.src;
    slides[i].remove();
  }

  // Добавление слайдов в начале и при нажатии на next
  function draw(slidesToShow, slideCounts) {
    offset = slideCounts;
    for(i = 0; i < slidesToShow ; i++){
      let aLink = document.createElement('a');
      document.querySelector('.main-shop-slider').appendChild(aLink);
      aLink.classList.add('main-shop-slider-item');
      aLink.style.minWidth = slideWidth + 'px';
      aLink.style.left = offset * slideWidth + 'px';
      aLink.setAttribute('href', 'javascript:;');
      aLink.setAttribute('data-fancybox','');
      aLink.setAttribute('data-src', '#modal-flowers');
      aLink.id = idSlider[i];
      // создаем img, если нет дочернних элементов
      if(!aLink.children.length){
        let img = document.createElement('img');
        aLink.appendChild(img);
        img.src = slider[step];
        aLink.id = idSlider[step];
        img.classList.add('main-shop-slider-img');
        if (step + 1 == slider.length) {
          step = 0;
        } else step++;
      }

      offset++;
    }
  } 

  // Добавление слайдов при нажатии на back
  function drawPrev(){
    offset = slidesToScroll - 1;
    for (i = 0; i < slidesToScroll; i++) {
      let aLink = document.createElement('a');
      document.querySelector('.main-shop-slider').prepend(aLink);
      aLink.classList.add('main-shop-slider-item');
      aLink.style.minWidth = slideWidth + 'px';
      aLink.style.left = offset * slideWidth + 'px';
      aLink.setAttribute('href', 'javascript:;');
      aLink.setAttribute('data-fancybox', '');
      aLink.setAttribute('data-src', '#modal-flowers');
      //aLink.id = idSlider[i];
      // создаем img, если нет дочернних элементов
      if (!aLink.children.length) {
        let img = document.createElement('img');
        aLink.appendChild(img);
        img.classList.add('main-shop-slider-img');
        if (step - 1 == -1) { 
          step = slider.length - 1;
        } else step--;
        img.src = slider[step];
        aLink.id = idSlider[step];
      }
      offset--;
    }
  }
  
    btnNext.addEventListener('click', () => {
    offset = 0;
    slides = document.querySelectorAll('.main-shop-slider-item');
    for(i = 0; i < slides.length; i++){
      //сдвигаем слайды
      slides[i].style.left = offset * slideWidth - slideWidth * slidesToScroll + 'px';
      offset++;
    }
    for (i = 0; i < slidesToScroll; i++) {
      slides[i].remove();
    }
    slides = document.querySelectorAll('.main-shop-slider-item');
    draw(slidesToScroll, slides.length);
  });

  // Кнопка переключения назад
  btnPrev.addEventListener('click', () => {
      offset = 0;
      let slides = document.querySelectorAll('.main-shop-slider-item');
      for (i = 0; i < slides.length; i++) {
        slides[i].style.left = offset * slideWidth + slideWidth * slidesToScroll + 'px';
        offset++;
      }
      for (i = slides.length - 1; i != slides.length - slidesToScroll - 1; i--) {
        slides[i].remove();
      }
      drawPrev();
    });

  draw(slidesToShow, 0);
  // Конец создания первого слайда -> main-flowers

  let flowerBody = ["Розы - это цветы не бывало популярны. На данный момент существует несколько тысяч сортов роз. Розы это цветы, которые обладают волшебной красотой и притягательностью. Сложено много легенд о сказочной розе. Ее любят все, ну и даже преклоняются пред ней. Все народы мира чествуют это прекрасное растение.",
    "Розовые лилии - это цветы не бывало популярны. На данный момент существует несколько тысяч сортов лилий. Лилии это цветы, которые обладают волшебной красотой и притягательностью. Сложено много легенд о сказочной лилии. Ее любят все, ну и даже преклоняются пред ней. Все народы мира чествуют это прекрасное растение.",
    "Астры - это цветы не бывало популярны. На данный момент существует несколько тысяч сортов астр. Астры это цветы, которые обладают волшебной красотой и притягательностью. Сложено много легенд о сказочной астре. Ее любят все, ну и даже преклоняются пред ней. Все народы мира чествуют это прекрасное растение.",
    "Флоксы - это цветы не бывало популярны. На данный момент существует несколько тысяч сортов флокс. Флоксы это цветы, которые обладают волшебной красотой и притягательностью. Сложено много легенд о сказочной флоксе. Ее любят все, ну и даже преклоняются пред ней. Все народы мира чествуют это прекрасное растение.",
    "Подсолнухи - это цветы не бывало популярны. На данный момент существует несколько тысяч сортов подсолнухов. Подсолнухи это цветы, которые обладают волшебной красотой и притягательностью. Сложено много легенд о сказочном подсолнухе. Ее любят все, ну и даже преклоняются пред ней. Все народы мира чествуют это прекрасное растение.",
    "Крысные лилии - это цветы не бывало популярны. На данный момент существует несколько тысяч сортов лилий. Лилии это цветы, которые обладают волшебной красотой и притягательностью. Сложено много легенд о сказочной лилии. Ее любят все, ну и даже преклоняются пред ней. Все народы мира чествуют это прекрасное растение."
  ]

  let modalHead = document.querySelector('.modal-flowers-header');
  let modalBody = document.querySelector('.modal-flowers-underheader');

  document.addEventListener("click", function (e) {
    if (e.target.className == "main-shop-slider-item" || e.target.className == "main-shop-slider-img") {
      if (e.target.id == 'flower1' || e.target.parentElement.id == 'flower1') {
        modalHead.firstChild.textContent = "Роза";
        modalBody.firstChild.textContent = flowerBody[0];
      } else {
        if (e.target.id == 'flower2' || e.target.parentElement.id == 'flower2') {
          modalHead.firstChild.textContent = "Розовая лилия";
          modalBody.firstChild.textContent = flowerBody[1];
        } else {
          if (e.target.id == 'flower3' || e.target.parentElement.id == 'flower3') {
            modalHead.firstChild.textContent = "Астра";
            modalBody.firstChild.textContent = flowerBody[2];
          } else {
            if (e.target.id == 'flower4' || e.target.parentElement.id == 'flower4') {
              modalHead.firstChild.textContent = "Флокс";
              modalBody.firstChild.textContent = flowerBody[3];
            } else {
              if (e.target.id == 'flower5' || e.target.parentElement.id == 'flower5') {
                modalHead.firstChild.textContent = "Подсолнух";
                modalBody.firstChild.textContent = flowerBody[4];
              } else {
                if (e.target.id == 'flower6' || e.target.parentElement.id == 'flower6') {
                  modalHead.firstChild.textContent = "красная лилия";
                  modalBody.firstChild.textContent = flowerBody[5];
                }
              }
            }
          }
        }
      }
    }

    let colorChange = e.target.parentElement.parentElement;
    if (colorChange.classList[0] == 'card') {
      colorChange[6].style.borderColor = e.target.classList[1];
      colorChange.style.borderColor = e.target.classList[1];
    }
  });

  let form = document.getElementsByClassName('card');
  let data;

  for (let i = 0; i < form.length; i++) {
    form[i].addEventListener('submit', function (e) {
      e.preventDefault();

      let color = e.target.style.borderColor,
        flowerSrc = form[i].getElementsByClassName('card-img')[0].getAttribute('src'),
        counter = form[i].querySelector('[name="counter"]'),
        flowerName = form[i].querySelector('[name="flowerName"]');
      if (!color)
        color = 'white';

      data = {
        name: flowerName.innerHTML,
        src: flowerSrc,
        color: color,
        counter: counter.value,
      };

      document.querySelector('[name="modal-flower"]').value = data.name;
      document.querySelector('[name="modal-color"]').value = data.color;
      document.querySelector('[name="modal-counter"]').value = data.counter;

      document.querySelector('[name="buyName"]').innerHTML = data.name;
      document.querySelector('[name="buyImg"]').src = data.src;
      document.querySelector('[name="buyColor"]').style.backgroundColor = data.color;
      document.querySelector('[name="buyCounter"]').innerHTML = data.counter;

      let modalBuy = document.getElementById('modal-buy');
      modalBuy.style.visibility = 'visible';
      modalBuy.style.opacity = '1';
      modalBuy.transition = 'all 0.7s ease-out 0s';
    })
  }

  document.getElementById('modal-buy-close').addEventListener('click', function (e) {
    let modalBuy = document.getElementById('modal-buy');
    modalBuy.style.visibility = 'hidden';
    modalBuy.style.opacity = '0';
  })
});

