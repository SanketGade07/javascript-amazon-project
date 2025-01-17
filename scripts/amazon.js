import { products,loadProducts } from "../data/products.js";
import { isProductInCart,addToCart} from "../data/cart.js";
import {cart,updateLocalStorage} from "../data/cart-data.js"

// import  updateItemsPrice  from "./orderPriceSummary.js";

loadProducts(renderIndexHtml)




 function renderIndexHtml(){
  let productsGridHtml = '';
  products.forEach((product) => {
    let html;
  
    html = `<div class="product-container js-product-container" >
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>
  
            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>
  
            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${(product.rating.stars) * 10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>
  
            <div class="product-price">
             $${(product.priceCents / 100).toFixed(2)}
            </div>
  
            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
  
            <div class="product-spacer"></div>
  
            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>
  
            <button class="add-to-cart-button button-primary js-add-to-cart-button " data-product-id=${product.id}>
              Add to Cart
            </button>
          </div>`
  
  
        
    productsGridHtml += html;
  })
  
  const productGridDiv = document.querySelector('.js-products-grid')
  
  productGridDiv.innerHTML = productsGridHtml;


const addCartBtns = document.querySelectorAll('.js-add-to-cart-button');

addCartBtns.forEach((button) => {
    addToCart(button);

})



  let searchProducts = createSearchProducts();
   
  
    searchFunctionality(searchProducts);
  }
  
  function createSearchProducts(){
    let index=-1;
    const searchProducts=products.map(product=>{
      const productContainer=document.getElementsByClassName('js-product-container');
      
      index++;
      return {name : product.name.toLowerCase(),element:productContainer[index]}
      
    })
    return searchProducts;
  }
  
  function searchFunctionality(searchProducts){
    const searchInputElement=document.querySelector('.js-search-bar');
    searchInputElement.addEventListener('input',e=>{
      let value =e.target.value.toLowerCase();
      searchProducts.forEach(product => {
        const isVisible= product.name.includes(value);
        product.element.classList.toggle('hide',!isVisible)
      });
      
      
    })
  
  }

updateCartTotalQuantity()
export function updateCartTotalQuantity(){
  let totalQuantity = JSON.parse(localStorage.getItem('totalQuantity')) || 0
  
  cart.forEach((product)=>{
      let quantity=product.quantity;
      totalQuantity+=quantity;
  })
  

  localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
  const cartQuantityDiv = document.querySelector('.js-cart-quantity');
  cartQuantityDiv.innerText=totalQuantity;
  totalQuantity=0;
  localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
  
  updateLocalStorage()
}


export function addQuantityByDropdown(productId){
   
 const  dropdownElement = document.querySelector(`.js-quantity-selector-${productId}`);
 const quantity = parseInt(dropdownElement.value);
 

  
  return quantity;
}


export function addedMsgCheckmark(productId){
  const addedMsgDiv = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMsgDiv.style.opacity=1;
  let timeoutId;
 
  clearTimeout(timeoutId);
  timeoutId=setTimeout(()=>{
   addedMsgDiv.style.opacity=0;
 
  },2000)
  }

