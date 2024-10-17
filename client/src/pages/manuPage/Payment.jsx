import React, { useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import { loadStripe } from '@stripe/stripe-js';
import dummyCartItems from '../../data/dummyCartData';
// import useCart from '../../hooks/useCart';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const Payment = () => {

    // Load your public Stripe key
    const stripePromise = loadStripe('pk_test_51PYjeZ2K1YkP5vT5b2grYSC7LorDqu5YqkNfXWLEQwCNrBFzD9mPcpKT71uU4hW3hnTPAJo7cgZpTkimEFD4Amsz00HQPRGbHG');


    // const [cart] = useCart();
    // const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)
    // const totalPrice = parseFloat(cartTotal.toFixed(2))

    const totalPrice = 1000
    const [cart,setCart]=useState(dummyCartItems)
    



    return (
        <div>
            <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={totalPrice} cart={cart} />
                </Elements>
            </div>

        </div>
    )
}

export default Payment