// export const CartContext = createContext();
import { useQuery } from 'urql';
import cookie from 'js-cookie';
import { useEffect,useMemo } from 'react';
// add to cart- na klika: sprawdzamy czy jest utworzony koszyk w cookiesach:
//-- jak nie to tworzymy i dojdajemy tam produkt z tą linią 
// jesli jest to dodajemy do tego konkretnego koszyka produkt 

const CartContext = ({ children }) => {
    // const cartId = "gid://shopify/Cart/c1-2552942f064aef08d33884023f23705e";

    useEffect(() => {
        cookie.set('cartId', "gid://shopify/Cart/c1-2552942f064aef08d33884023f23705e");
    }, [])

    const cartId=useMemo(()=>{
        if(cookie.get('cartId')!==undefined) {
            return cookie.get('cartId')
        }else {
            return undefined
        }
    },[])

        //sprawdzamy czy w ogóle jest jakiś koszyk

    if(cartId){
        const getCart = `query GetCart($cartId:ID!){
            cart(id: $cartId) {
            id
                totalQuantity
            createdAt
            updatedAt
            lines(first: 10) {
              edges {
                node {
                  id
                  merchandise {
                      ... on ProductVariant {
                        id
                                        product {
                                            title
                                        }
                      }
                    }
                  quantity
                }
              }
            }
          }
        }
        `
        const [result, reexecuteQuery] = useQuery(
            {
                query: getCart,
                variables: { cartId }
            },
        )

        const { data, fetching, error } = result;

        console.log(data.cart.totalQuantity)



    }

    return (
        <>
        </>
    )

}

export default CartContext;




