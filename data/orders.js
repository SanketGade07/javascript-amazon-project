
const orders =[];

export function addToOrder(order){
    orders.unshift(order);
    console.log(orders);
}