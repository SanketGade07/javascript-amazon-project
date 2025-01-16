import {orders} from '../data/orders.js';
import { loadProducts, products } from '../data/products.js';
import { deliveryOptions } from '../data/deliveryOption.js';
// import { renderOrderSummary } from './checkout.js';


loadProducts(renderOrder);


function renderOrder(){
    const orderGridDiv=document.querySelector('.js-order-grid');
    let html='';
    orders.forEach((order)=>{
        
             html+= `

        <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${order.orderTime}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${order.totalCostCents}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        ${renderProductDetails(order)}

     
        </div>
      </div>`
    
    })
    orderGridDiv.innerHTML=html;

}


// Function to format the date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
         // e.g., "Monday"
        
        month: "long",   // e.g., "January"
        day: "numeric"   // e.g., "16"
    });
}



function renderProductDetails(order){
    let html = '';

        order.products.forEach((orderProduct)=>{
            products.forEach((product)=>{
            
                if(orderProduct.productId===product.id){
                    
            html += `
        <div class="order-details-grid">
          <div class="product-image-container">
            <img src="${product.image}" >
          </div>

          <div class="product-details">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${formatDate(orderProduct.estimatedDeliveryTime)}
            </div>
            <div class="product-quantity">
              Quantity: ${orderProduct.quantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>
            <div class="product-actions">
                <a href="tracking.html">
                <button class="track-package-button button-secondary">
                    Track package
                </button>
                </a>
            </div>
        </div>
            
            `}
            })
        })
    
    return html;

}
