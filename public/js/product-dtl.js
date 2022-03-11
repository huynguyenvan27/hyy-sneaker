import * as util from './util.js';


// const productDetail = document.getElementById("product-details__inner")
const descptTab = document.querySelector(".information-product__descript")
const voteTab = document.querySelector(".your-vote")
const btnInfo = document.querySelector("#btn-info")
const btnVote = document.querySelector("#btn-vote")
let kt = 0;


function getProductDetail(){
  let product ={};
  const searchParams = new URLSearchParams(window.location.search);
  const id= searchParams.get("id");
  // console.log(id);
  const getProductItem= `/product/${id}`;
  return axios.get(getProductItem)
  .then(res=>{
      if(res.statusText === "OK"){
        product = res.data;
        console.log(product);
        renderProductDetail(product);
        renderProductDescpt(product)


        const btnAddCart = document.getElementById("btnAddCart")
        btnAddCart.addEventListener("click",()=>{
          if(kt!=0){
            let storage = localStorage.getItem('cart')
            if(storage){
              cart = JSON.parse(storage)  
              let item = cart.find(e =>e.product.id==product.id
            )
              if(item){
                item.quantity+= Number(quantity.value);
                item.size = kt;
              }else{
                cart.push({product,quantity:Number(quantity.value),size:kt})
                // renderToast(product)
              }
            }
            renderMiniCart(cart)
            localStorage.setItem("cart",JSON.stringify(cart))
            // console.log(cart);
          }else{
            alert("Chọn size trước khi nhấn thêm vào giỏ hàng")
          }
        })

      }
  })
  .catch(error=>console.log(error))
}



function renderProductDetail(obj){
  obj.imgLg.forEach((e,i) => {
    const sliderForItem = document.createElement("div")
    sliderForItem.classList.add("slider-for__item");
    sliderForItem.innerHTML+=`<img src="${e}" alt="${obj.name}"> </div>`;
    document.querySelector(".slider-for").appendChild(sliderForItem);
  });

  obj.imgDetail.forEach((e,i) => {
    const sliderNavItem = document.createElement("div")
    sliderNavItem.classList.add("slider-nav__item");
    sliderNavItem.innerHTML+=`<img src="${e}" alt="${obj.name}"> </div>`;
    document.querySelector(".slider-nav").appendChild(sliderNavItem);
  }); 

  // slick slider
  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.slider-nav',
    dotsClass: 'slick-dots-for',
    nextArrow: '<button type="button" class="slick--slick-next"><i class="bi bi-chevron-right"></i></button>',
    prevArrow: '<button type="button" class="slick--slick-prev"><i class="bi bi-chevron-left"></i></button>',
    responsive: [
      { slidesToShow: 1,
        slidesToScroll: 1,
        breakpoint: 768,
        settings: {
        arrows: true,
        dots:true,
          }
        },
        ]
    });
    $('.slider-nav').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.slider-for',
    dots: false,
    focusOnSelect: true,
    centerMode: true,
    infinite: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    });

    // sneaker-info
    document.querySelector(".sneaker-name").innerText = obj.name;
    document.querySelector(".sneaker-price").innerHTML = util.renderPrice(obj);
    obj.list_size.forEach((e,i) => {
      document.querySelector(".sneaker-size__list").innerHTML += `
      <input id="${e}" type="radio" class="upload" name="size" value=${e} />
      <label class="btn-size" for="${e}">${e}</label>
      `});
    
    const inputRadio = document.getElementsByName("size");
    console.log(inputRadio);
    // console.log(btnSize);
    Array.from(inputRadio).forEach((e,i)=>{
      e.addEventListener("click",()=>{
        if (e.checked === true){
          kt=e.value;
          console.log(kt);
        }
      })
    })
}





  

function renderProductDescpt(obj){
  descptTab.innerHTML="";
  descptTab.innerHTML=`<div class="row">
  <div class="col-lg-6">
    <p class="text-16 line-seperate">
      <span>Thương hiệu:</span>
      <span>${obj.brand}</span>
    </p>
    <p class="text-16 line-seperate">
      <span>Tên sản phẩm:</span>
      <span>${obj.name}</span>
    </p>
    <p class="text-16 line-seperate">
      <span>Kiểu dáng:</span>
      <span>Giày thể thao, giày sneakers</span>
    </p>
    <p class="text-16 line-seperate">
      <span>Chất liệu vải:</span>
      <span>Vải cao cấp</span>
    </p>
    <p class="text-16 line-seperate">
      <span>Chất lượng: 5 sao</span>
    </p>
  </div>
  <div class="col-lg-6">
    <p class="text-16 line-seperate">
      <span>Mô hình cơ sở :</span>
      <span>${obj.brand} technology</span>
    </p>
    <p class="text-16 line-seperate">
      <span>Công nghệ :</span>
      <span> Gel giảm chấn</span>
    </p>
    <p class="text-16 line-seperate">
      <span>Chống nước :</span>
      <span>IP98</span>
    </p>
      <p class="text-16 line-seperate">
      <span>Bảo hành :</span>
      <span> 6 tháng</span>
    </p>
    <p class="text-16 line-seperate">
      <span>Đổi trả :</span>
      <span> 30 ngày</span>
    </p>
  </div>`
}
getProductDetail()


btnInfo.addEventListener("click",function(){
  descptTab.style.display="block";
  voteTab.style.display="none";
  btnInfo.classList.add("btn-tab--active")
  btnVote.classList.remove("btn-tab--active")
})
btnVote.addEventListener("click",function(){
  voteTab.style.display="block";
  descptTab.style.display="none";
  btnVote.classList.add("btn-tab--active")
  btnInfo.classList.remove("btn-tab--active")
})


// quantity
const btnDown = document.querySelector(".btn.btn-light.btn-down")
const btnUp = document.querySelector(".btn.btn-light.btn-up")
let quantity= document.querySelector(".sneaker-quantity__value");
let min = Number(quantity.getAttribute('min'));
let max = Number(quantity.getAttribute('max'));

btnDown.addEventListener("click",qtyminus)
function qtyminus(e) {
var current = Number(quantity.value);
var newval = (current - 1);
if(newval < min) {
  newval = min;
} else if(newval > max) {
  newval = max;
} 
quantity.value = Number(newval);
e.preventDefault();
}
btnUp.addEventListener("click",qtyplus)
function qtyplus(e) {
var current = Number(quantity.value);
var newval = (current + 1);
if(newval > max) newval = max;
quantity.value = Number(newval);
e.preventDefault();
}
