

const overLay = document.getElementById("overlay");
const navMobile = document.getElementById("nav-mobile");
const miniCart = document.getElementById("mini-cart");

//nav-mobile
const closeNav = () =>{
  navMobile.style.marginLeft = "-350px";
  overLay.style.display = "none";
  miniCart.style.marginRight = "-350px";
  document.body.removeChild(document.querySelector(".popup"));
}
const openNav = () =>{
  navMobile.style.marginLeft = "0px";
  overLay.style.display = "block";
}

//mini-cart

const cartOpen = () =>{
  miniCart.style.marginRight = "0px";
  overLay.style.display = "block";
}

// modal-box
const modal = document.getElementById("myModal");

const btn = document.getElementById("userLogin");

const closeModal = document.getElementsByClassName("close-modal")[0];
const btnLoginMobile = document.querySelector("#nav-mobile a:nth-child(8)")
// console.log(btnLoginMobile);
btnLoginMobile.onclick = function(){
  closeNav();
  modal.style.display = "block";
}
btn.onclick = function() {
  modal.style.display = "block";
}

closeModal.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//modal-box
function modeRegister(){
  document.querySelector(".modal__register").style.display="block";
  document.querySelector(".modal__login").style.display="none";
}
function modeLogin(){
  document.querySelector(".modal__register").style.display="none";
  document.querySelector(".modal__login").style.display="block";
}

const headerSite = document.getElementById("header-site");

// scroll header
window.onscroll = function() {myFunction()};
function myFunction() {
  if (document.body.scrollTop > 250|| document.documentElement.scrollTop > 250) {
    headerSite.className = "sticky";
  }
  else {
    headerSite.className = "";
  }
}




// sendMail

function sendMail(){
  window.open('mailto:nvh271299@gmail.com');
}


const closePopup =()=>{
  document.body.removeChild(document.querySelector(".popup"));
  overLay.style.display = "none";
}

// toogle btn filter

const btnCollapse = document.querySelector(".side-filter.btn")
btnCollapse.addEventListener("click",function(){
  this.classList.toggle("collapsible")
  let content = this.nextElementSibling;
  if (content.style.maxHeight){
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }

})



