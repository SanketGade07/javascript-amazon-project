export const cart=[  ];



export function isProductInCart(productId,quantity) {

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
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
          id: productId,
          quantity:quantity
        });
  
  
  
      }
      updateCartTotalQuantity();
      
    })
  }



