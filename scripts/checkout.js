import { cart } from "../data/cart-data.js";
import { products } from "../data/products.js";
import { updateLocalStorage } from "../data/cart-data.js";




    
    
    
    

    renderOrderSummary();
    
     export function renderOrderSummary(){
        
    
        let orderSummaryHtml=''
        cart.forEach(cartItem=>{
            
            
        products.forEach((product,index)=>{
            if(product.id===cartItem.id){
                let html =`
             <div class="cart-item-container">
                    <div class="delivery-date">
                      Delivery date: Tuesday, June 21
                    </div>
        
                    <div class="cart-item-details-grid">
                      <img class="product-image"
                        src="${product.image}">
        
                      <div class="cart-item-details">
                        <div class="product-name">
                          ${product.name}
                        </div>
                        <div class="product-price">
                          $${(product.priceCents/100).toFixed(2)}
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
                        <div class="delivery-option">
                          <input type="radio" checked
                            class="delivery-option-input"
                            name="delivery-option-${index}">
                          <div>
                            <div class="delivery-option-date">
                              Tuesday, June 21
                            </div>
                            <div class="delivery-option-price">
                              FREE Shipping
                            </div>
                          </div>
                        </div>
                        <div class="delivery-option">
                          <input type="radio"
                            class="delivery-option-input"
                            name="delivery-option-${index}">
                          <div>
                            <div class="delivery-option-date">
                              Wednesday, June 15
                            </div>
                            <div class="delivery-option-price">
                              $4.99 - Shipping
                            </div>
                          </div>
                        </div>
                        <div class="delivery-option">
                          <input type="radio"
                            class="delivery-option-input"
                            name="delivery-option-${index}">
                          <div>
                            <div class="delivery-option-date">
                              Monday, June 13
                            </div>
                            <div class="delivery-option-price">
                              $9.99 - Shipping
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
            `
            orderSummaryHtml+=html;
        
            }
            
        })
    
        })
    
        const orderSummaryDiv=document.querySelector('.js-order-summary');
        orderSummaryDiv.innerHTML=orderSummaryHtml;

    const deleteBtns=document.querySelectorAll('.js-delete-quantity')
    deleteBtns.forEach((deleteBtn,index)=>{
    
      deleteBtn.addEventListener('click',()=>{
        console.log(cart)
        console.log(index)
        cart.splice(index,1);
        updateLocalStorage()
        console.log(cart)
        renderOrderSummary();
        
        
      })

    })
    }

  


      
    


    
    
    