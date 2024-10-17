// CheckoutForm.js
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ price, cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        if (typeof price !== 'number' || price < 1) {
            console.log('Invalid price');
            return;
        }

        // Simulating an API call to create a payment intent
        setTimeout(() => {
            setClientSecret('some-client-secret'); // Replace this with actual client secret from your backend
        }, 1000);
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            setCardError('Success! Payment method created: ' + paymentMethod.id);
            console.log(paymentMethod);

            // Simulating successful payment
            const paymentIntent = { status: 'succeeded', id: 'dummy_payment_intent_id' };

            if (paymentIntent.status === 'succeeded') {
                alert('Payment successful');
                navigate('/order');

                // Simulate sending payment info to your backend
                const paymentInfo = {
                    transactionId: paymentIntent.id,
                    price,
                    quantity: cart.length,
                    status: 'Order pending',
                    itemName: cart.map((item) => item.name),
                    cartItems: cart.map((item) => item._id),
                };
                console.log(paymentInfo);
                // Replace with your API call to send payment info
            }
        }
    };

    return (
        <div className='h-screen menu-background p-5'>
            {/* Centered Title */}
            <div className='flex justify-center items-center mb-10'>
                <h2 className='text-3xl text-slate-700 font-semibold'>Checkout</h2>
            </div>
            <div className='flex flex-col md:flex-row justify-start items-start gap-8'>
                {/* Order Summary */}
                <div className='md:w-1/2 space-y-6'>
                    <div className='bg-white shadow-lg rounded-lg p-6'>
                        <h4 className='text-xl text-gray-800 font-semibold'>Order Summary</h4>
                        <p className='mt-4 text-gray-600'>
                            Total Price: <span className='font-semibold'>${price}</span>
                        </p>
                        <p className='text-gray-600'>
                            Items: <span className='font-semibold'>{Array.isArray(cart) ? cart.length : 0}</span>
                        </p>
                    </div>
                </div>

                {/* Payment Process */}
                <div className='md:w-1/2 w-full bg-white shadow-2xl rounded-lg px-6 py-10'>
                    <h4 className='text-xl text-slate-600 font-semibold mb-4'>Process Your Payment!</h4>
                    <h5 className='font-medium text-gray-700'>Credit / Debit Card</h5>
                    {/* Stripe Form */}
                    <form onSubmit={handleSubmit} className='mt-4'>
                        <CardElement
                            options={{
                                style: {
                                    base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } },
                                    invalid: { color: '#9e2146' },
                                },
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!stripe}
                            className='mt-6 w-full bg-yellow-300 hover:bg-yellow-400 text-slate-700 font-medium py-2 rounded shadow'
                        >
                            Pay
                        </button>
                        {cardError && <p className="text-red-600 mt-2">{cardError}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;
