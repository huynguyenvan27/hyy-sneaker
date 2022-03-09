import * as util from './util.js'

// render UI


let products=[] ;
const getProducts = async()=> {
  try {
    const res = await util.getProductsAPI();
    products = res.data;
    // console.log(products);
    // Render ra ngoài giao diện
    getNewShoes(products)
  } catch (error) {
      console.log(error);
  }
}



const getNewShoes = (arr) =>{
  const newList = document.getElementById("new-list");
  let newArr = arr.filter(e=>
    e.isNew!=false
    )
    // console.log(newArr);
    newList.innerHTML="";
    newList.innerHTML=util.renderUI(newArr,'/page');
    
    $('.responsive').slick({
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 5,
      slidesToScroll: 2,
      dotsClass: 'responsive--slick-dots slick-dots',
      nextArrow: '<button type="button" class="slick--slick-next"><i class="bi bi-chevron-right"></i></button>',
      prevArrow: '<button type="button" class="slick--slick-prev"><i class="bi bi-chevron-left"></i></button>',
      responsive: [
      {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
            arrows: true,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows:false,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows:false,
            dots: true
          }
        },
  
      ]
    });
  }
  getProducts();
  
  // lọc sản phẩm
  // lọc sản phẩm theo thương hiệu
  // xóa sản phẩm
  // thêm animation cho banner
  // thêm login/register cho trang web
  // validate 

    $('.slider').slick({
      dots: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: 2000,
      infinite: true,
      dotsClass: 'slick--slick-dots slick-dots',
      nextArrow: '<button type="button" class="slick--slick-next"><i class="bi bi-chevron-right"></i></button>',
      prevArrow: '<button type="button" class="slick--slick-prev"><i class="bi bi-chevron-left"></i></button>',
      responsive: [
      {
          breakpoint: 992,
          settings: {
            arrows: false,
          }
        },
      ]
    })
    $('.auto-policy').slick({
      dots: false,
      arrows: false,
      slidesToShow: 4,
      responsive: [
      {
        breakpoint: 992,
        settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
          }
        },
      {
        breakpoint: 600,
        settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        }
      },
        ]
    })
    // TOGGLE HAMBURGER & COLLAPSE NAV
    $('.nav-toggle').on('click', function() {
      $(this).toggleClass('open');
      $('.menu-left').toggleClass('collapse');
    });


// countdown time 

const countdown = () => {
  const countDate = new Date("August 17, 2050 00:00:00").getTime();
  const currentTime = new Date().getTime();

  const gap = countDate - currentTime;
  const millisecond = 1;
  const second = millisecond * 1000;
  const minutes = second * 60;
  const hour = minutes * 60;
  const day = hour * 24;

  const textHour = Math.floor((gap % day) / hour);
  const textMinutes = Math.floor((gap % hour) / minutes);
  const textSecond = Math.floor((gap % minutes) / second);
  // const textMillisecond = Math.floor((gap % second) / millisecond);

  document.querySelector('.deal-hour').innerText = textHour;
  document.querySelector('.deal-minute').innerText = textMinutes;
  document.querySelector('.deal-second').innerText = textSecond;
};
setInterval(countdown, 1000);