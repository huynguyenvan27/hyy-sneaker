import * as util from './util.js'

// util.upAndDown();

let citis = document.getElementById("city");
let districts = document.getElementById("district");
let wards = document.getElementById("ward");


const renderCheckOutItem = (arr) =>{
  const checkOutCart = document.getElementById("checkout-cart");
  checkOutCart.innerHTML="";
  arr.forEach(e=>{
    checkOutCart.innerHTML+=`
    <div class="product d-flex justify-content-between align-items-center">
    <label class="product-name">${e.product.name}</label>
    <label class="product-quantity mx-3">x${e.quantity}</label>
    <label class="product-price color--red">${util.formatter.format(e.quantity*e.product.price)}đ</label>
    </div>
    `
  })
}

const renderCheckOut =(arr)=>{
  const totalCheckout = document.getElementById("total-checkout");
  renderCheckOutItem(arr);
  totalCheckout.innerHTML= util.cartTotal(arr)+"đ";

}
renderCheckOut (JSON.parse(localStorage.getItem('cart')));




// provinces
let Provinces = {
  url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json", 
  method: "GET"
};
let promise = axios(Provinces);
//Xử lý khi request thành công
promise.then(function (result) {
  renderCity(result.data);
});

function renderCity(data) {
  for (const x of data) {
    citis[citis.options.length] = new Option(x.Name, x.Id);
}

  // xứ lý khi thay đổi tỉnh thành thì sẽ hiển thị ra quận huyện thuộc tỉnh thành đó

  citis.onchange=function(){
    districts.options.length=1;
    wards.options.length=1;
    if(this.value != ""){
      // console.log(this.value);
      const result = data.filter(n => n.Id === this.value);
      // console.log(result);
      for (const k of result[0].Districts) {
        districts[districts.options.length] = new Option(k.Name, k.Id);
      }
    }
  };

  //  xứ lý khi thay đổi quận huyện thì sẽ hiển thị ra phường xã thuộc quận huyện đó
  districts.onchange = function () {
    wards.options.length=1;
    const dataCity = data.filter((n) => n.Id === citis.value);
    if (this.value != "") {
      const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;

      for (const w of dataWards) {
        wards[wards.options.length] = new Option(w.Name, w.Id);
      }

    }
  };
}