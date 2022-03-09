

const overLay = document.getElementById("overlay");
const navMobile = document.getElementById("nav-mobile");
const miniCart = document.getElementById("mini-cart");

//nav-mobile
const closeNav = () =>{
  navMobile.style.marginLeft = "-350px";
  overLay.style.display = "none";
  miniCart.style.marginRight = "-350px";
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




// toogle btn filter

function toogleNavFilter(){
  document.querySelector("#filter-product").classList.toggle("block");
}



