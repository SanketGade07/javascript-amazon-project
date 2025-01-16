
export let cart= JSON.parse(localStorage.getItem('cart')) || [];




export function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    
  }

   