import { useState, useContext } from 'react'
import { MyContext } from '../../components/CartContext';
import Navbar from '../../components/Navbar';
import EmptyCartInfo from '../../components/EmptyCartInfo';
import { useMutation } from 'urql';
import NumberInput from '../../components/NumberInput';
import { useDebouncedCallback } from 'use-debounce';
import { formatPrice } from '../../helperFunctions/helperFunctions';


const removeLine = `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
              lines(first:10){
                  edges{
                      node{
                          id
                      }
                  }
              }
      }
      userErrors {
        field
        message
      }
    }
  }`

const updateSingleLineQuantity=`mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
       lines(first:20){
                    edges{
                        node{
                            id
                        }
                    }
                }
      }
      userErrors {
        field
        message
      }
    }
  }`
const Cart = () => {

    const context = useContext(MyContext);
    const [result, executeMutation] = useMutation(removeLine);
    const[updateLineResult,updateLine]=useMutation(updateSingleLineQuantity);
    const cartId = context?.cartId
    // const totalCost=formatPrice(context?.totalCostAndCurrency[1],context?.totalCostAndCurrency[0])

    console.log(context)
    // const [quantity,setQuantity]=useState()

    const removeItem = (lineId:String) => {
        const lineIds = [lineId];
        executeMutation({cartId, lineIds});
    }

    console.log(context?.cartId)
    //    console.log(context?.productsList[0].node.id) 
    // console.log(productsList[0]?.node.merchandise.product.images.edges[0].node.url)

    const debounced = useDebouncedCallback(
        // mutowanie linii w koszyku
        (cartId,lines) => {
          updateLine({cartId,lines});
        },
        // delay in ms
        200
      );

    return (
        <>
            <Navbar itemsQuantity={context?.totalQuantity} />
            {/* {context?.productsList.length===0 && <EmptyCartInfo/>} */}
            {context?.productsList?.map(product => {
                const title = product.node.merchandise.product.title
                const variant = product.node.merchandise.title
                const quantity = product.node.quantity
                const currency=product.node.cost.totalAmount.currencyCode
                const pricePerUnit = formatPrice(currency,product.node.merchandise.price.amount)
                const pricePerLine = formatPrice(currency,product.node.cost.totalAmount.amount)
                const imgUrl = product.node.merchandise.product.images.edges[0].node.url
                const lineId = product.node.id
                return (
                    <div>
                        {title} <br/>
                        {variant} <br/>
                       cena jednostk: {pricePerUnit}   suma:{pricePerLine}, 
                    
                        <NumberInput 
                        availableQuantity={product.node.merchandise.quantityAvailable} 
                        value={quantity} 
                        
                        onValueChange={(value)=>debounced(cartId,[{"id":product.node.id,"quantity":value}])}
                       />
                        {/* <img src={imgUrl} /> */}
                        <button onClick={() => {
                            removeItem(lineId)
                        }
                        }>Remove item</button>
                    </div>

                )
            }
            )
            }
            {/* total of cart:{totalCost} */}
        </>
    )
}

//tutaj na zwiększenie ilości w koszyku lub usuniecie czego tez trzeba apdejtowac koszyk

export default Cart;

//InputNumber - na onchangea musimy robic mutacje ktora zmieni ilosc danego produktu w koszyku
