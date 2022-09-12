const menuBtn = document.querySelector('.menu-toggler');
const topNavigation = document.querySelector('.top-nav');
const body = document.querySelector('body');
const anchors = document.querySelectorAll('.nav-link');

const text = `Guzeev Zhenya. Junior Web Developer 
 `;
const landingText = document.querySelector('.landing-text');
let index = 0;

AOS.init({
  easing: 'ease',
  duration: 1800,
  once: true
});

function menuToggle() {
  body.addEventListener('click', (e) => {
    let target = e.target;
    if (target.matches('.menu-toggler')) {
      topNavigation.classList.toggle('open');
    } else if (target.matches('.nav-list, .nav-list>li>a')) {
      topNavigation.classList.remove('open');
    }
  })

  //  Плавная прокрутка
  anchors.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const blockID = item.getAttribute('href');
      document.querySelector('' + blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  })
}

function autoName() {
  landingText.innerHTML = text.slice(0, index);
  index++;
  if (index > text.length - 1) {
    index = 0;
  }
}


class SliderCarousel {
  constructor({
      main,
      wrap,
      next,
      prev,
      infinity = false,
      position = 0,
      slidesToShow = 3,
      responsive = []
  }) {
      if (!main || !wrap) {
          console.warn('slider-carousel: Необходимо 2 свойства, "main" и "wrap"!');
      }
      this.main = document.querySelector(main);
      this.wrap = document.querySelector(wrap);
      this.slides = document.querySelector(wrap).children;
      this.next = document.querySelector(next);
      this.prev = document.querySelector(prev);
      this.slidesToShow = slidesToShow;
      this.options = {
          position,
          infinity,
          widthSlide: Math.floor(100 / this.slidesToShow),
          maxPosition: this.slides.length - this.slidesToShow,
      };
      this.responsive = responsive;
  }

  init() {
      this.addHTMLClass();
      this.addStyle();

      if (this.prev && this.next) {
          this.controlSlider();
      } else {
          this.addArrows();
          this.controlSlider();
      }

      this.responseInit();
  }

  responseInit() {
      const slidesToShowDefault = this.slidesToShow;
      const allRespone = this.responsive.map((item) => item.breakpoint);
      const maxResponse = Math.max(...allRespone);

      const checkResponse = () => {
          const widthWindow = document.documentElement.clientWidth;
          if (widthWindow < maxResponse) {
              for (let i = 0; i < allRespone.length; i++) {
                  if (widthWindow < allRespone[i]) {
                      this.slidesToShow = this.responsive[i].slideToShow;
                      this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                      this.addStyle();
                  }
              }
          } else {
              this.slidesToShow = slidesToShowDefault;
              this.options.widthSlide = Math.floor(100 / this.slidesToShow);
              this.addStyle();
          }
      };

      checkResponse();

      window.addEventListener('resize', checkResponse);
  }

  prevSlider() {
      if (this.options.infinity || this.options.position > 0) {
          --this.options.position;
          if (this.options.position < 0) {
              this.options.position = this.options.maxPosition;
          }
          this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
      }
  }

  nextSlider() {
      if (this.options.infinity || this.options.position < this.options.maxPosition) {
          ++this.options.position;
          if (this.options.position > this.options.maxPosition) {
              this.options.position = 0;
          }
          this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
      }
  }

  controlSlider() {
      this.prev.addEventListener('click', this.prevSlider.bind(this));
      this.next.addEventListener('click', this.nextSlider.bind(this));
  }

  // метод для добавления классов элементам
  addHTMLClass() {
      this.main.classList.add('glo-slider');
      this.wrap.classList.add('glo-slider__wrap');
      for (const item of this.slides) {
          item.classList.add('glo-slider__item');
      }
  }

  addArrows() {
      this.prev = document.createElement('button');
      this.next = document.createElement('button');

      this.prev.className = 'glo-slider__prev';
      this.next.className = 'glo-slider__next';

      this.main.appendChild(this.prev);
      this.main.appendChild(this.next);

      const style = document.createElement('style');
      style.textContent = `
          .glo-slider__prev,
          .glo-slider__next {
              margin: 0 10px;
              border: 20px solid transparent;
              background: transparent;
              cursor: pointer;
              z-index: 20;
              position: absolute;
          }
          .glo-slider__next {
              border-left-color: #19b5fe;
              right: 0%;
              top: 25%;
          }
          .glo-slider__prev {
              border-right-color: #19b5fe;
              left: 0%;
              top: 25%;
          }

          .glo-slider__next:focus,
          .glo-slider__prev:focus,
          .glo-slider__next:hover,
          .glo-slider__prev:hover {
              background: transparent;
              outline: transparent;
          }
          `;
      document.head.append(style);
  }

  addStyle() {
      let style = document.getElementById('sliderCarousel-style');

      if (!style) {
          style = document.createElement('style');
          style.id = 'sliderCarousel-style';
      }

      style.textContent = `
          .glo-slider {
              overflow: hidden !important;
          }
          .glo-slider__wrap {
              display: flex !important;
              transition: transform 0.5s !important;
              will-change: transform !important;
              padding: 0 !important;
          }
          .glo-slider__item {
              margin: 0 !important;
              flex: 0 0 ${this.options.widthSlide}% !important;
            }`;

      document.head.append(style);
  }
}

const options = {
  main: '#services-wrapper',
  wrap: '.my-skills',
  next: '#services-slider-arrow-right',
  prev: '#services-slider-arrow-left',
  slidesToShow: 3,
  infinity: true,

  responsive: [{
          breakpoint: 1024,
          slideToShow: 3,
      },
      {
          breakpoint: 768,
          slideToShow: 2,
      },
      {
          breakpoint: 576,
          slideToShow: 1,
      },
  ],
};


menuToggle();
setInterval(autoName, 150);