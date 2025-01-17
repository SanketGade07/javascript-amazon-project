import {addedMsgCheckmark,updateCartTotalQuantity,addQuantityByDropdown} from '../scripts/amazon.js'
import { products } from './products.js';
import {cart} from './cart-data.js'
// import { renderOrderSummary } from '../scripts/checkout.js';
// import { updateItemsPrice } from '../scripts/orderPriceSummary.js';






export function isProductInCart(productId,quantity) {

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId=== productId) {
      cart[i]['quantity']+=quantity;

      return true;
    }

  }

  return false

}



export function addToCart(button) {

    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addedMsgCheckmark(productId);
      const quantity= addQuantityByDropdown(productId);
  
  
      let productExist = isProductInCart(productId,quantity);
      if (!productExist) {
  
        cart.push({
          productId: productId,
          quantity:quantity,
          deliveryOptionId:'1'
        });
      }
      updateCartTotalQuantity();     
    })
  }
  









