import * as util from './util.js'


// const cartItemFinal =document.querySelector(".list-cart-item-final")



const renderCartItem=(arr)=>{
  let str="";
  arr.forEach(e=>{
    str+=`               
    <tr>
    <td class="d-flex align-items-center">
      <a href="product.html?id=${e.product.id}" class="product-img">
        <img src="${e.product.img}" alt="${e.product.name}">
      </a>
      <div class="d-flex flex-column ms-3">
        <a href="product.html?id=${e.product.id}" class="product-name">${e.product.name}</a>
        <label class="product-details">${util.formatter.format(e.product.price)}đ</label>
        <form action="">
          <label class="product-details" for="size-final">Size:</label>
          <select name="size" id="size-final">
            <option value="">40</option>
            <option value="">41</option>
            <option value="">42</option>
            <option value="">43</option>
            <option value="">44</option>
          </select>
        </form>
      </div>
    </td>
    <td data="Số lượng:">
        <div class="sneaker-quantity">
          <button class="btn btn-light btn-down">
            <i class="bi bi-dash"></i>
          </button>
          <input class="sneaker-quantity__value align-middle" type="number" name="quantity" value="${e.quantity}">
          <button class="btn btn-light btn-up" onclick="getAddToCart(${e.product.id})">
            <i class="bi bi-plus"></i>
          </button>
        </div>
    </td>
    <td data="Tạm tính:">
      <label class="product-price color--red">${util.formatter.format(e.quantity*e.product.price)}đ</label>
    </td>
    <td>
      <button class="btn-remove btn" onclick="deteleMiniCartItem(${e.product.id})"><i class="bi bi-trash"></i></button>
    </td>
  </tr>`

  })
  return str;
}
const renderCartBill=(arr)=>{
  const cartBill = document.getElementById("cart-bill");
  if(!arr){
    cartBill.innerHTML="<h1 class='text-center'>Không có sản phẩm nào trong giỏ</h1>";
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
                    <label class="total-value color--red">${util.cartTotal(arr)}đ</label>
                </th>
              </tr>
            </tfoot>
  `
  }
}


renderCartBill(JSON.parse(localStorage.getItem('cart')));



