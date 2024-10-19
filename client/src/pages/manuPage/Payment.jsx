import React, { useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import { loadStripe } from '@stripe/stripe-js';
import dummyCartItems from '../../data/dummyCartData';
import { useSelector } from 'react-redux';

const Payment = () => {

    // Load your public Stripe key
    const stripePromise = loadStripe('pk_test_51PYjeZ2K1YkP5vT5b2grYSC7LorDqu5YqkNfXWLEQwCNrBFzD9mPcpKT71uU4hW3hnTPAJo7cgZpTkimEFD4Amsz00HQPRGbHG');


    const cartItems = useSelector((state) => state.cart.items);
    const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0)

    // Calculate price for each item
    const calculatePrice = (item) => item.price * item.quantity;
    // Calculate total price
    const cartSubTotal = cartItems.reduce((total, item) => total + calculatePrice(item), 0);
    const orderTotal = cartSubTotal;




    return (
        <div>
            <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={orderTotal} cart={cartItems} />
                </Elements>
            </div>

        </div>
    )
}

export default Payment