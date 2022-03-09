
let formatter = new Intl.NumberFormat("en-US", {
  currency: "VND",
});
var toastLiveExample = document.getElementById('liveToast')
let cart =[];
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
        renderToast(item.product)
      }else{
        cart.push({product,quantity:1})
        renderToast(product)
      }
      renderMiniCart(cart)
      localStorage.setItem("cart",JSON.stringify(cart))
      // console.log(cart);
  }
  catch(error){
    console.log(error);
  }
}

const renderToast =(arr)=>{
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
        Sản phẩm đã thêm vào giỏ hàng
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
    <button href="" class="btn-remove btn" onclick="deteleMiniCartItem(${e.product.id})"><i class="bi bi-trash"></i></button>
    </div>
  </div>`
  };
 
  return str;
}
console.log("Port number is " + window.location.pathname);
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
  if(!data){
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
window.onload=()=>{
  renderMiniCart(JSON.parse(localStorage.getItem('cart')));
}


// xóa cartItem
// let newArr=[];
// const deteleMiniCartItem=(id)=>{
//   newArr = JSON.parse(localStorage.getItem('cart')).filter(e=>
//     e.product.id!==id
//   )
//   console.log(newArr);
//   console.log(JSON.parse(localStorage.getItem('cart')));
//   console.log(id);
// }

// console.log(document.querySelector(".btn-remove.btn"));

//  cart = [{product:{id=?....},quantity:1}]





  
