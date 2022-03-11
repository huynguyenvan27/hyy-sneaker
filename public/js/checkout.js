import * as util from './util.js'

// util.upAndDown();




const userName = document.getElementById("contact-input__name");
const address = document.getElementById("contact-input__address");
const phone = document.getElementById("contact-input__phone");
const inputEles = document.querySelectorAll('.input-class');
const select =  document.getElementsByTagName("select")
const shopping = document.getElementById("shopping")
console.log(shopping);
shopping.addEventListener("click",valiadation)
function valiadation(){
  Array.from(inputEles).map((ele) =>
    ele.classList.remove('success', 'error')
  );
  let isValid = checkValidation();
  if(isValid){
    alert("Đơn hàng của bạn sẽ được xác nhận trong ít phút")
  }
}
function checkValidation(){
  let isCheck = true;
  // name
  if(userName.value==""){
    setError(userName,"Tên không được để trống");
    isCheck = false;
  }else{
    setSucces(userName)
  }
  Array.from(select).forEach(e=>{
  if (e.value){
    setSucces(e)
    }else{
      setError(e,"");
      isCheck = false;
    }
  })
  // email
  if(address.value==""){
    setError(address,"Email không được để trống");
    isCheck= false;
  }else{
    setSucces(address);
  }
  // phone
  if(phone.value == ""){
    setError(phone,"Số điện thoại không được để trống");
    isCheck = false;
  }else if(!isPhone(phone.value)){
    setError(phone,"Số điện thoại không đúng định dạng");
    return isCheck = false;
  }else{
    setSucces(phone);
  }
  return isCheck;
}
function setSucces(inputEle){
  inputEle.classList.add("success");
}
function setError(inputEle,text){
  const inputMsg = inputEle.parentNode;
  inputEle.classList.add("error");
  inputMsg.querySelector("small").innerText=text;
}
// isEmail
function isEmail(email) {
return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
//isPhone
function isPhone(number) {
  return /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(number);
}
// isBirthday
function isBirthday(birthday){
  return /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(birthday)
}

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






