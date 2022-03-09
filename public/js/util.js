

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

