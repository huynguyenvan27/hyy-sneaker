import * as util from './util.js';

const filterProduct = document.querySelector(".filter-product")
const removeAll = document.getElementById("removeAll")
const btnAddBlock = document.querySelector(".btn-add-block")
const btnFilter = document.getElementsByName("brand")
const searchBar = document.querySelector(".search-product input")


let products=[] ;
const getProducts = async()=> {
  try {
    const res = await util.getProductsAPI();
    products = res.data;
    // console.log(products);
    // Render ra ngoài giao diện
    renderProducts(products);
    searchBar.addEventListener("change",()=>{
      let newArrFind = [];
      console.log(searchBar.value.toLowerCase());
      products.forEach((e,i)=>{
        if(e.name.toLowerCase().includes(searchBar.value.toLowerCase())){
          newArrFind.push(e);
          renderProducts(newArrFind)
        }
        if(searchBar.value==0){
          renderProducts(products)
        }
      })
    })
    
    let brand = []; 
    let newArr=[];
    Array.from(btnFilter).forEach(e=>{
      e.addEventListener("click",()=>{
        if(e.checked == true && brand.includes(e.id)==false){
          console.log(e.id);
          console.log(brand);
          const brandAdd = document.createElement("button")
          brandAdd.innerHTML=`
        
          <label for="${e.id}">${e.id}</label>
        `
          brandAdd.classList.add("btn-outline-danger","btn","me-1",`remove-${e.id}`)
          btnAddBlock.appendChild(brandAdd);
          removeAll.style.visibility="visible";
          brand.push(e.id);
          removeAll.onclick = ()=>{
            btnAddBlock.innerHTML="";
            Array.from(btnFilter).forEach(e=>{
              if(e.checked==true){
                e.checked=false;
                brand.pop()

                renderProducts(products)
              }
            })
          }
          newArr = products.filter(a=>brand.includes(a.brand.toLowerCase()))
          renderProducts(newArr);
          if(newArr.length==0){
            document.querySelector(".pagination").style.display="none";
          }
        }else{
          document.querySelector(`.remove-${e.id}`).remove()
          brand.pop()
          renderProducts(products)
          
        }
      })

    })


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
    listProduct.innerHTML= "<h1 class='text-center'>Chưa có sản phẩm nào trong danh mục này</h1>"
    return;
  }
  listProduct.innerHTML= util.renderUI(arr,"");
}






getProducts();




