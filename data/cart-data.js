
export let cart= JSON.parse(localStorage.getItem('cart'))

if(!cart){
    cart=[
        {
            id:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:2
        }
    
    ]

}
   