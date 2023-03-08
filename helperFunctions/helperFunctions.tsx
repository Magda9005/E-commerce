export const formatPrice=(currency:string,price:string):String=>{
    return new Intl.NumberFormat(`${currency}`, { style: 'currency', currency: `${currency}` }).format(price)
}