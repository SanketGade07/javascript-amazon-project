const cart=[  ];

function updateCartTotalQuantity(){
    let TotalQuantity=0;
    cart.forEach((product)=>{
        let quantity=product.quantity;
        TotalQuantity+=quantity;
    })

    const cartQuantityDiv = document.querySelector('.js-cart-quantity');
    cartQuantityDiv.innerHTML=TotalQuantity;

}



