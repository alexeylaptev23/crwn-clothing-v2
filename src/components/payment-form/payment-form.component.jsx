import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import { clearCart } from '../../store/cart/cart.action';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { BUTTON_TYPE_CLASSES } from './../button/button.component';

import { PaymentFormContainer, FormConainer, PaymentButton } from './payment-form.styles';


const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();

  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);

  const [ isProcessingPayment, setIsProcessingPayment ] = useState(false);

  const paymentHandler = async e => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then(res => res.json());

    const clientSecret = response.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment Successful!');
        dispatch(clearCart());
      }
    }
  };

  return (
    <>
      <PaymentFormContainer>
        <FormConainer onSubmit={paymentHandler}>
          <h2>Credit Card Payment: </h2>
          <CardElement />
          <PaymentButton
            isLoading={isProcessingPayment}
            buttonType={BUTTON_TYPE_CLASSES.Inverted}
          >
            Pay now
          </PaymentButton>
        </FormConainer>
      </PaymentFormContainer>
    </>
  );
};

export default PaymentForm;
