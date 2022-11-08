import { CardElement } from '@stripe/react-stripe-js';

import Button, { BUTTON_TYPE_CLASSES } from './../button/button.component';

import { PaymentFormContainer, FormConainer } from './payment-form.styles';

const PaymentForm = () => {
  return (
    <PaymentFormContainer>
      <FormConainer>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.Inverted}>Pay now</Button>
      </FormConainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
