import { cart } from "../data/cart-data.js";
import { products ,loadProducts} from "../data/products.js";
import { updateLocalStorage } from "../data/cart-data.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions } from "../data/deliveryOption.js";
import { updateOrderPriceSummary } from "./orderPriceSummary.js";
 
loadProducts(()=>{
updateOrderPriceSummary()
renderOrderSummary();
})


   


export function renderOrderSummary() {
  let dateString;



 let orderSummaryHtml = '';
  cart.forEach(cartItem => {

    const deliveryOptionId = cartItem.deliveryOptionId;
    deliveryOptions.forEach((deliveryOption) => {

      if (cartItem.deliveryOptionId === deliveryOption.deliveryId) {
        const today = dayjs()

        const deliverydate = today.add(
          deliveryOption.deliveryDays, 'days'
        )
        dateString = deliverydate.format('dddd, MMMM D');
      }

    })
    products.forEach((product, index) => {


      if (product.id === cartItem.productId) {


        let html = `
             <div class="cart-item-container">
                    <div class="delivery-date js-delivery-date-${cartItem.productId}" >
                      ${dateString}
                    </div>
        
                    <div class="cart-item-details-grid">
                      <img class="product-image"
                        src="${product.image}">
        
                      <div class="cart-item-details">
                        <div class="product-name">
                          ${product.name}
                        </div>
                        <div class="product-price">
                          $${(product.priceCents / 100).toFixed(2)}
                        </div>
                        <div class="product-quantity">
                          <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                          </span>
                          <span class="update-quantity-link link-primary">
                            Update
                          </span>
                          <span class="delete-quantity-link link-primary js-delete-quantity">
                            Delete
                          </span>
                        </div>
                      </div>
        
                      <div class="delivery-options">
                        <div class="delivery-options-title">
                          Choose a delivery option:
                        </div>
                       ${renderDeliveryOptions(deliveryOptionId, cartItem.productId)}
                        
                      </div>
                    </div>
                  </div>
            `
        orderSummaryHtml += html;

      }

    })

  })

  const orderSummaryDiv = document.querySelector('.js-order-summary');
  orderSummaryDiv.innerHTML = orderSummaryHtml;

  const deleteBtns = document.querySelectorAll('.js-delete-quantity')
  deleteBtns.forEach((deleteBtn, index) => {

    deleteBtn.addEventListener('click', () => {
      cart.splice(index, 1);
      updateLocalStorage()

      renderOrderSummary();
      updateOrderPriceSummary()

    })

  })
  const deliveryOptionOneDivs = document.querySelectorAll('.js-delivery-option0');
  deliveryOptionOneDivs.forEach((deliveryOptionOneDiv) => {

    deliveryOptionOneDiv.addEventListener('click', () => {


      const cartItemId = deliveryOptionOneDiv.dataset.cartItemId;

      cart.forEach((cartItem) => {


        if (cartItem.productId === cartItemId) {
          cartItem.deliveryOptionId = '1'
          updateLocalStorage()
        }

      })
      renderOrderSummary()
      updateOrderPriceSummary()

    })

  })

  const deliveryOptionTwoDivs = document.querySelectorAll('.js-delivery-option1');
  deliveryOptionTwoDivs.forEach((deliveryOptionTwoDiv) => {

    deliveryOptionTwoDiv.addEventListener('click', () => {
      const cartItemId = deliveryOptionTwoDiv.dataset.cartItemId;

      cart.forEach((cartItem) => {

        if (cartItem.productId=== cartItemId) {
          cartItem.deliveryOptionId = '2'
          updateLocalStorage()
        }
      })

      renderOrderSummary()
      updateOrderPriceSummary()
    })

  })


  const deliveryOptionThreeDivs = document.querySelectorAll('.js-delivery-option2');
  deliveryOptionThreeDivs.forEach((deliveryOptionThreeDiv) => {

    deliveryOptionThreeDiv.addEventListener('click', () => {

      const cartItemId = deliveryOptionThreeDiv.dataset.cartItemId;

      cart.forEach((cartItem) => {

        if (cartItem.productId=== cartItemId) {
          cartItem.deliveryOptionId = '3'
          updateLocalStorage()
        }
      })


      renderOrderSummary()
      updateOrderPriceSummary()
    })


  })
}


export function renderDeliveryOptions(delivaryOptionId, cartItemId) {
  const today = dayjs();

  let html = ''
  deliveryOptions.forEach((deliveryOption, index) => {
    const deliverydate = today.add(
      deliveryOption.deliveryDays, 'days'
    )
    const priceString = deliveryOption.deliveryDays === 10 ? 'Free' : `$${(deliveryOption.priceCents / 100).toFixed(2)}`;
    const dateString = deliverydate.format('dddd, MMMM D');
    const isChecked = deliveryOption.deliveryId === delivaryOptionId;
    html += `
              <div class="delivery-option js-delivery-option${index}" data-cart-item-id=${cartItemId}  >
                <input type="radio" 
                  class="delivery-option-input" ${isChecked ? 'checked' : ''}
                  name="delivery-option-${cartItemId}"
                >
                  <div >
                      <div class="delivery-option-date">
                            ${dateString}
                      </div>
                      <div class="delivery-option-price">
                            ${priceString} - Shipping
                      </div>
                  </div>
              </div>
      `
  })

  return html;
}




















