

export let formatter = new Intl.NumberFormat("en-US", {
  currency: "VND",
});


export function calcPriceSale(priceOld,sale){
  let priceCurrent =formatter.format(parseInt(priceOld - priceOld*sale));
  return priceCurrent
}

export const cartTotal=(data)=>{
  let total =0;
  for(let i=0;i<data.length;i++) {
    let e=data[i];
    total+=e.quantity*e.product.price;
  }
  return formatter.format(total);
}

// api
export const getProductsAPI = ()=>{
  return axios.get("/product"); // Luôn trả về 1 Promise
}
export function renderNumberSale(discount){
  let str="";
  if(discount!=0){
    str = `-${discount*100}%`;
  }
  return str;
}
export const renderPrice=(obj)=>{
  let str= "";
  if(obj.discount!=0){
    str =`
    <span class="price-current">${calcPriceSale(obj.price,obj.discount)}đ</span>
    <span class="price-old">${formatter.format(obj.price)}đ</span>`
  }else{
    str=`
    <span class="price-current">${formatter.format(obj.price)}đ</span>
    `
  }
  return str;
}

export const renderUI=(arr,source)=>{
  let str="";
  arr.forEach((e,i) => {
    str+= `<div class="col col-lg-4 col-md-4 col-sm-6 col-6">
    <div class="product-card">
      <div class="product-card__inner position-relative">
        <span class="number-sale">
          ${renderNumberSale(e.discount)}
        </span>
        <a href=".${source}/product.html?id=${e.id}" class="product-link"> 
          <img src="${e.img}" alt="${e.name}" title="${e.name}">
        </a>
        <div class="text-center quick-action">
          <button class="add-to-cart" onclick="getAddToCart(${e.id})">
           <span class="icon-title">Thêm vào giỏ hàng</span>
            <i class="bi bi-bag"></i>
          </button>
          <button class="favourite" onclick="getAddToWishlist(${e.id})">
            <span class="icon-title">Thêm vào yêu thích</span>
            <i class="bi bi-suit-heart"></i>
          </button>
          <button class="quick-review" onclick="getQuickReview(${e.id})">
            <span class="icon-title">Xem nhanh</span>
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>
      <a href=".${source}/product.html?id=${e.id}" class="product-info">
        <h1 class="name-tag" title="${e.name}">${e.name}</h1>
      </a>
      <div class="sneaker-price">
        ${renderPrice(e)}
      </div>
    </div>
  </div> ` 
  })
  return str;
}

export const btnCollapse = document.querySelector(".side-filter")

export const collapse = ()=>{
  this.classList.toogle("collapsible")
  if (content.style.maxHeight){
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}


export const renderProductDetail = (obj)=>{

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
    // console.log(inputRadio);
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
