'use client'
import { createContext, useContext } from 'react'
import { useQuery } from 'urql';

import EmptyCartInfo from '../../components/EmptyCartInfo';
// import { createClient,useQuery} from 'urql';

import Navbar from "../../components/Navbar";


const Cart = () => {

    // const itemsQuantity = useContext(CartContext)

    // console.log(itemsQuantity)
    return (
        <></>

        // <CartProvider value={client}>
        //     <Navbar itemsQuantity={10} />
        //     <EmptyCartInfo />
        // </CartProvider>
    )
}

export default Cart;