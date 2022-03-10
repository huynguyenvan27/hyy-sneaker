import * as util from './util.js';

let products=[] ;
const getProducts = async()=> {
  try {
    const res = await util.getProductsAPI();
    products = res.data;
    // console.log(products);
    // Render ra ngoài giao diện
    renderProducts(products);
    let newArr=[];
    newArr = products.filter(a=>a.brand="nike")
    console.log(newArr);
  } catch (error) {
      console.log(error);
  }
}

const renderProducts = (arr) =>{
  const listProduct = document.getElementById("list-product__inner");
  // xóa hết nội dung trong DOM
  listProduct.innerHTML= "";
  // trường hợp mảng rỗng
  if(arr.length== 0){
    listProduct.innerHTML= "<h1>Chưa có sản phẩm nào trong danh mục này</h1>"
    return;
  }
  listProduct.innerHTML= util.renderUI(arr,"");
}



const btnFilter = document.getElementsByName("brand")
console.log(btnFilter);
Array.from(btnFilter).forEach(e=>{
  e.addEventListener("click",()=>{
    console.log(e.id);
    


  })
})




getProducts();



//Lọc sản phẩm theo thương hiệu

