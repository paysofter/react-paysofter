# React Paysofter

## Installtion
npm install react-paysofter

## Usage
##### Here is a basic example of how to use the Paysofter component in your React project.
 
import React from 'react';
import { Paysofter } from 'react-paysofter';

const App = () => {
  const handleSuccess = () => {
    console.log('Payment successful!');
  };

  const handleClose = () => {
    console.log('Payment window closed.');
  };

  return (
    <Paysofter
      amount={promoTotalPrice}
      currency="USD"
      email="user@example.com"
      paysofterPublicKey="your-public-key"
      onSuccess={handleSuccess}
      onClose={handleClose}
      payment_id={`PID${Math.floor(Math.random() * 100000000000000)}`}
      showPromiseOption={true}
      showFundOption={true}
      showCardOption={true}
    />
  );
};

export default App;



## Props
Prop Name	            Type	            Description
amount	                Number	            The amount to be paid.
currency	            String	            The currency in which the payment is to be made (e.g., USD, NGN).
email	                String	            The email address of the user making the payment.
paysofterPublicKey	    String	            Your Paysofter public key for processing the payment.
onSuccess	            Function	        Callback function to handle the success of the payment.
onClose	                Function	        Callback function to handle the closing of the payment window.
payment_id	            String	            A unique identifier for the payment transaction.
showPromiseOption	    Boolean	            Whether to show the Promise payment option (default: true).
showFundOption	        Boolean	            Whether to show the Fund Account payment option (default: false).
showCardOption	        Boolean	            Whether to show the Card payment option (default: false).
