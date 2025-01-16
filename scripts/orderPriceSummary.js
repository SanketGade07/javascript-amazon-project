import { loadProducts, products } from '../data/products.js';
import {cart, updateLocalStorage} from '../data/cart-data.js';
import { addToOrder } from '../data/orders.js';
import {  renderOrderSummary } from '../scripts/checkout.js';

let totalCartPrice=0;
let shippingTotalPrice=0
let totalBeforeTax=0;
let estimatedTax=0;
export function updateOrderPriceSummary(){
     totalCartPrice=0;
      cart.forEach(cartItem => {
        products.forEach((product, index) => {
    
          if (product.id === cartItem.productId) {
            let cartItemPrice=0;
            if(cartItem.quantity>1){
                cartItemPrice=cartItem.quantity*product.priceCents;
            }
            else{
                cartItemPrice=product.priceCents;
            }
            totalCartPrice+=cartItemPrice;
          }
        })
})
    const paymentSummaryMoneyDiv=document.querySelector('.js-payment-summary-money');
    paymentSummaryMoneyDiv.innerHTML=`$${(totalCartPrice/100).toFixed(2)}`;
    updateShipingTotalPrice();
    updateTotalBeforeTax();
    updateEstimatedTax();
    updateOrderTotal();
}
 function updateShipingTotalPrice(){
     shippingTotalPrice=0;
    cart.forEach((cartItem)=>{
        if(cartItem.deliveryOptionId==='1'){
            const ShippingPrice=0;
            shippingTotalPrice+=ShippingPrice;
        }
        else if(cartItem.deliveryOptionId==='2'){
            const ShippingPrice=4.99
            shippingTotalPrice+=ShippingPrice;
        }
        else{
            const ShippingPrice=9.99
            shippingTotalPrice+=ShippingPrice;
        }
    })
    
    const totalShippingMoneyDiv=document.querySelector('.js-payment-summary-shipping-money');
    totalShippingMoneyDiv.innerHTML=`$${shippingTotalPrice}`;

}

 function updateTotalBeforeTax(){
    totalBeforeTax=parseFloat((totalCartPrice/100).toFixed(2)) +shippingTotalPrice;
    const beforeTaxDiv=document.querySelector('.js-before-tax');
    beforeTaxDiv.innerHTML=`$${totalBeforeTax.toFixed(2)}`;

}

function updateEstimatedTax(){
    estimatedTax=parseFloat(((10/100)*totalBeforeTax).toFixed(2));
    const estimatedTaxDiv=document.querySelector('.js-estimated-tax');
    estimatedTaxDiv.innerHTML=`$${estimatedTax.toFixed(2)}`;


}

function updateOrderTotal(){
    
    const orderTotal=(totalBeforeTax + estimatedTax).toFixed(2);
    const orderTotalDiv=document.querySelector('.js-order-total');
    orderTotalDiv.innerHTML=`$${orderTotal}`;

}

const placeOrderBtn=document.getElementsByClassName('js-place-order-btn')[0];
placeOrderBtn.addEventListener('click',async()=>{
    
    try{
        
            const response=await fetch('https://supersimplebackend.dev/orders',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    cart:cart
                }),
            });
            const order=await response.json();
            addToOrder(order);
            cart.length=0;
            updateLocalStorage();
            renderOrderSummary();
            updateOrderPriceSummary();
           
            
            
        }
        catch(err){
            console.error(err);
        }
        window.location.href='orders.html';
        

    })

