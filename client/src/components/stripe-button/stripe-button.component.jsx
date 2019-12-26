import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_HNv6ClwKIMCGI4rljRJ4ua4A00HbJX26ky';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('payment was successful');
        }).catch(error => {
            console.log('payment error: ', JSON.parse(error));
            alert(
                'there was an issue with your payment, please make sure you use the provided credit card'
            );
        });
    }

    return (
        <StripeCheckout
            currency="USD"
            billingAddress={false}
            bitcoin
            label='Pay Now'
            name='KNAVELS CRWN Clothing Ltd.'
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;