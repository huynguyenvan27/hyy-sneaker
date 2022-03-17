
let formatter = new Intl.NumberFormat("en-US", {
  currency: "VND",
});
let cart =[];
let list =[];
const miniCart__inner = document.querySelector(".mini-cart__inner")
function getProductItemApi(id){
  return axios.get(`/product/${id}`)
}
//  cart = [{product:{id=?....},quantity:1}]

// lưu vào local storage
const getAddToCart = async (a)=>{
  let storage = localStorage.getItem('cart')
  // console.log(storage);
  if(storage){
    cart = JSON.parse(storage)  
  }
  let res = await getProductItemApi(a);
  let product = res.data;
  console.log(product);
  try{
      let item = cart.find(e => e.product.id== a)
      if(item){
        item.quantity+= 1;
        renderToast(item.product,'Sản phẩm đã thêm vào giỏ hàng')
      }else{
        cart.push({product,quantity:1,size:42})
        renderToast(product,'Sản phẩm đã thêm vào giỏ hàng')
      }
      renderMiniCart(cart)
      localStorage.setItem("cart",JSON.stringify(cart))
      // console.log(cart);
  }
  catch(error){
    console.log(error);
  }
}

// quick review

const getQuickReview = async (a)=>{
  let kt=0;
  let res = await getProductItemApi(a);
  let product = res.data;
  try{
    const quickReviewBlock = document.createElement("div")
  quickReviewBlock.classList.add("popup");
  quickReviewBlock.innerHTML=`
  <div class="popup-close">
  <button class="btn" onclick="closePopup()"><i class="bi bi-x-square-fill"></i></button>
</div>
<div class="popup-content my-3">
  <div class="row">
    <div class="col-7">
      <div class="slider-for">
      </div>
    </div>
    <div class="col-5">
      <div class="sneaker-info ms-3">
        <div class="ranked-vote">
          <span><i class="bi bi-star-fill"></i></span>
          <span><i class="bi bi-star-fill"></i></span>
          <span><i class="bi bi-star-fill"></i></span>
          <span><i class="bi bi-star-fill"></i></span>
          <span><i class="bi bi-star-fill"></i></span>
        </div>
        <h1 class="sneaker-name">${product.name}</h1>
        <span class="text-16 sale">
          
        </span>
        <div class="sneaker-price mt-3">
        </div>
        <div class="text mt-3">Thương hiệu : ${product.brand.toUpperCase()}</div>
        <div class="sneaker-size__list d-flex flex-wrap mt-3">
        </div>
        <div class="d-flex align-items-center justify-content-between flex-wrap">
          <div class="sneaker-quantity  mt-5">
            <button class="btn btn-light btn-down">
              <i class="bi bi-dash"></i>
            </button>
            <input class="sneaker-quantity__value align-middle" type="number" name="quantity" value="1" min="1" max="10">
            <button class="btn btn-light btn-up">
              <i class="bi bi-plus"></i>
            </button>
          </div>
          <button class="btn--primary mt-5" id="btnAddCart">
            <i class="bi bi-bag"></i>
            Thêm vào giỏ hàng
          </button>
        </div>
        <div class="sneaker-favourite mt-5">
          <button class="btn btn-light favourite btn-outline-danger">
            <i class="bi bi-heart"></i>
            <span class="like">Thêm vào yêu thích</span>
            <span class="liked">Đã thêm vào yêu thích</span>
          </button>
        </div>

      </div>
    </div>
  </div>
</div>
<div class="popup-footer">
  <div class="mt-3">
    <span class="text align-middle">Chia sẻ:</span>
    <a href="" class="icon-link facebook"><i class="fa-brands fa-facebook-f"></i></i></a>
    <a href="" class="icon-link twitter"><i class="fa-brands fa-twitter"></i></a>
    <a href="" class="icon-link youtube"><i class="fa-brands fa-youtube"></i></a>
    <a href="" class="icon-link pinterest"><i class="fa-brands fa-pinterest"></i></a>
  </div>
</div>


`
  document.body.appendChild(quickReviewBlock);
  document.querySelector("#overlay").style.display="block";
  product.imgLg.forEach((e,i) => {
    const sliderForItem = document.createElement("div")
    sliderForItem.classList.add("slider-for__item");
    sliderForItem.innerHTML+=`<img src="${e}" alt="${product.name}"> </div>`;
    document.querySelector(".slider-for").appendChild(sliderForItem);
  });
  let str="";
  if(product.discount!=0){
    document.querySelector(".popup .sale").innerHTML=`Sale : ${product.discount*100} %`;
    str =`
    <span class="price-current">${formatter.format(product.price-product.price*product.discount)}đ</span>
    <span class="price-old">${formatter.format(product.price)}đ</span>`
  }else{
    document.querySelector(".popup .sale").style.display="none";
    str=`
    <span class="price-current">${formatter.format(product.price)}đ</span>
    `
  }
  document.querySelector(".popup .sneaker-price").innerHTML=str;
    
  product.list_size.forEach((e,i) => {
    document.querySelector(".sneaker-size__list").innerHTML += `
    <input id="${e}" type="radio" class="upload" name="size" value=${e} />
    <label class="btn-size" for="${e}">${e}</label>
    `});
    const inputRadio = document.getElementsByName("size");
    Array.from(inputRadio).forEach((e,i)=>{
      e.addEventListener("click",()=>{
        if (e.checked === true){
          kt=e.value;
          // console.log(kt);
        }
      })
    })
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
          }
          
        }
        renderMiniCart(cart)
        localStorage.setItem("cart",JSON.stringify(cart))
        closePopup();
        cartOpen();
      }else{
        alert("Chọn size trước khi nhấn thêm vào giỏ hàng")
      }
    })
    
  // const inputRadio = document.getElementsByName("size");
  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    dotsClass: 'slick-dots-for',
    nextArrow: '<button type="button" class="slick--slick-next"><i class="bi bi-chevron-right"></i></button>',
    prevArrow: '<button type="button" class="slick--slick-prev"><i class="bi bi-chevron-left"></i></button>',
    });

  }
  catch(e){
    console.log(e);
  }
  
}

// thêm vào yêu thích
const getAddToWishlist = async (a)=>{

  let storage = localStorage.getItem('list')
  // console.log(storage);
  if(storage){
    list = JSON.parse(storage)  
  }
  let res = await getProductItemApi(a);
  let product = res.data;
  try{
    // const
    let item = list.find(e => e.id== a)
    if(item){
      renderToast(product,'Đã thêm vào yêu thích')
    }else{
      list.push(product)
      renderToast(product,'Đã thêm vào yêu thích')
    }
    localStorage.setItem("list",JSON.stringify(list))
  }
  catch(error){
    console.log(error);
  }
}




const renderToast =(arr,msg)=>{
  const toastMsg = document.createElement("div")
  toastMsg.classList.add('toast-msg');
  const autoRemoveId = setTimeout(function () {
    document.body.removeChild(toastMsg);
  }, 3000);
  toastMsg.onclick = function (e) {
    if (e.target.closest(".toast__close")) {
      document.body.removeChild(toastMsg);
      clearTimeout(autoRemoveId);
    }
  }
  toastMsg.innerHTML=`
  <div class="toast-msg">
  <div class="d-flex align-items-center">
    <div class="toast-img">
      <img src="${arr.img}" alt="${arr.name}">
    </div>
    <div class="ms-3">
      <h4>${arr.name}</h4>
      <h5 class="toast-info">
        ${msg}
        
      </h5>
    </div>
  </div>
  <a href="javascript:void(0)" class="toast__close">&times;</a>
</div>
  `
  document.body.appendChild(toastMsg);
}
const renderListProduct =(data,path)=>{
  if(window.location.pathname=='/index.html'){
    path='/page';
  }else{
    path='';
  }
  let str ="";
  for(let i=0;i<data.length;i++) {
    let e=data[i];
    str += 
  `<div class="d-flex flex-column mini-cart__item">
    <div class="d-flex justify-content-between align-items-start">
    <a href=".${path}/product.html?id=${e.product.id}" class="product-img">
      <img src="${e.product.img}" alt="${e.product.name}">
    </a>
    <div class="product-info d-flex flex-column">
      <a href=".${path}/product.html?id=${e.product.id}" class="product-name text-12">${e.product.name}</a>
      <span>
        <label>SL:</label>
        <label class="quantity">${e.quantity}</label>
      </span>
      <span>
        <label>Tạm tính:</label>
        <label class="product-price color--red">${formatter.format(e.quantity*e.product.price)}đ</label>
      </span>
    </div>
    <button href="" class="btn-remove btn" onclick="deteleMiniCartItem(${i})"><i class="bi bi-trash"></i></button>
    </div>
  </div>`
  };
 
  return str;
}
// console.log("Port number is " + window.location.pathname);
const cartTotal=(data)=>{
  let total =0;
  for(let i=0;i<data.length;i++) {
    let e=data[i];
    total+=e.quantity*e.product.price;
  }
  return formatter.format(total);
}
const cartQuantity=(data)=>{
  let quantity=0;
  for(let i=0;i<data.length;i++) {
    let e=data[i];
    quantity+=e.quantity;
  }
  return quantity;
}
const renderMiniCart =(data)=>{
  miniCart__inner.innerHTML="";
  if(!data || data.length==0){
  const para = document.createElement("h2");
  para.innerText = "Hiện tại không có sản phẩm trong giỏ hàng";
  miniCart__inner.appendChild(para);
  document.querySelector(".mini-cart__router").style.display="none";
  }
  // miniCart__inner.innerHTML="";
  else{
  
  miniCart__inner.innerHTML=
    `<div class="heading-cart text-center mb-4">
    <span class="text">Sản phẩm trong giỏ:</span>
    <span class="quantity text">${cartQuantity(data)}</span>
  </div>
  <div class="d-flex flex-column mini-cart__item">
  ${renderListProduct(data)}
  <div class="mini-cart__total text-center">
    <span class="text">TỔNG TIỀN:</span>
    <span class="text color--red">${cartTotal(data)}đ</span>
  </div>`
  document.querySelector(".mini-cart__router").style.display="block";
  }
}

//  localStorage = [{product:{id=?....},quantity:1}]
// xóa cartItem
const deteleMiniCartItem=(id)=>{
  let newArr=[];
  newArr = JSON.parse(localStorage.getItem('cart'))
  // console.log(JSON.parse(localStorage.getItem('cart')));
  newArr.splice(id,1);
  // console.log(newArr);
  localStorage.setItem("cart",JSON.stringify(newArr))
  renderMiniCart(newArr);
  renderCartBill(newArr)
}

// console.log(getComputedStyle(document.querySelector('#cart-icon'), ':after').setPropertyValue('content'));



window.onload=()=>{renderMiniCart(JSON.parse(localStorage.getItem('cart')))}






  
const renderCartItem=(arr)=>{
  let str="";
  arr.forEach((e,i)=>{
    str+=`               
    <tr>
    <td class="d-flex align-items-center">
      <a href="product.html?id=${e.product.id}" class="product-img">
        <img src="${e.product.img}" alt="${e.product.name}">
      </a>
      <div class="d-flex flex-column ms-3">
        <a href="product.html?id=${e.product.id}" class="product-name">${e.product.name}</a>
        <label class="product-details">${formatter.format(e.product.price)}đ</label>
        <label class="product-details" for="size-final">Size:${e.size}</label>
      </div>
    </td>
    <td data="Số lượng:">
        <div class="sneaker-quantity">
          <button class="btn btn-light btn-down" onclick="down(${e.product.id})">
            <i class="bi bi-dash"></i>
          </button>
          <input class="sneaker-quantity__value align-middle" type="number" name="quantity" min="1" max="10" value="${e.quantity}">
          <button class="btn btn-light btn-up" onclick="up(${e.product.id})">
            <i class="bi bi-plus"></i>
          </button>
        </div>
    </td>
    <td data="Tạm tính:">
      <label class="product-price color--red">${formatter.format(e.quantity*e.product.price)}đ</label>
    </td>
    <td>
      <button class="btn-remove btn" onclick="deteleMiniCartItem(${i})"><i class="bi bi-trash"></i></button>
    </td>
  </tr>`

  })
  return str;
}


  
const renderCartBill=(arr)=>{
  const cartBill = document.getElementById("cart-bill");
  if(!arr || arr.length==0){
    cartBill.innerHTML="<h1 class='text-center'>Không có sản phẩm nào trong giỏ</h1>";
    document.getElementById("btn-checkout").style.display="none";
  }
  else{
  
  cartBill.innerHTML=`
              <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Tạm tính</th>
                <th></th>
              </tr>
            </thead>
            <tbody class="list-cart-item-final">
              ${renderCartItem(arr)}
            </tbody>
            <tfoot> 
              <tr>
                <td class="d-flex align-items-center">
                    <input type="text" id="code-input" placeholder="Mã giảm giá:">
                    <input type="submit" class="btn--primary" value="ÁP DỤNG">
                </td>
                <th colspan="100%" class="text-center">
                    <label class="">Tổng cộng:</label>
                    <label class="total-value color--red">${cartTotal(arr)}đ</label>
                </th>
              </tr>
            </tfoot>
  `
  }

}


const up = (id,e)=>{
  let storage = localStorage.getItem('cart')
  cart = JSON.parse(storage)  
  let item = cart.find(e =>e.product.id==id)
  item.quantity+=1;
  if(item.quantity < 1) {
    item.quantity = 1;
  } else if(item.quantity > 10) {
    item.quantity = 10;
  } 
  renderMiniCart(cart)
  renderCartBill(cart)
  localStorage.setItem("cart",JSON.stringify(cart))
}
const down= (id)=>{
  let storage = localStorage.getItem('cart')
  cart = JSON.parse(storage)  
  let item = cart.find(e =>e.product.id==id)
  item.quantity-=1;
  if(item.quantity < 1) {
    item.quantity = 1;
  } else if(item.quantity > 10) {
    item.quantity = 10;
  } 
  renderMiniCart(cart)
  renderCartBill(cart)
  localStorage.setItem("cart",JSON.stringify(cart))
}

renderCartBill(JSON.parse(localStorage.getItem('cart')));