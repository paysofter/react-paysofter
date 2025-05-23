<!-- README.md -->

# React Paysofter

This is a ReactJS package for integrating Paysofter payment gateway into your ReactJS application.

![Paysofter Payment (Live)](./src/images/promise-live.jpg)

## Installation

To install the package, run:

```bash
npm install react-paysofter
```

## Usage

Here are basic examples of how to use the `react-paysofter` library in your ReactJS project.

![Paysofter Payment (Test)](./src/images/promise-test.jpg)

<!-- ![Project Logo](./images/card.jpg) -->
<!-- ![Project Logo](./images/fund.jpg) -->

### Example 1: Basic Payment Setup

```jsx
import React from "react";
import { Paysofter } from "react-paysofter";

const App = () => {
  const amount = 10; // Amount in dollars, e.g., 10.00 USD
  const [paysofterPublicKey] = useState("test_api_key_abc123"); // Replace with your actual Paysofter public key
  const promises = [
    "Payment will be held in escrow until all terms are met.",
    "Item will be exactly as described in the listing.",
    "Item will be delivered within the agreed timeframe.",
    "Refund will be given if seller doesn't meet terms.",
  ];

  const handleOnSuccess = () => {
    console.log("Payment successful!");
  };

  const handleOnClose = () => {
    console.log("Payment window closed.");
  };

  return (
    <Paysofter
      amount={amount}
      currency="USD"
      email="user@example.com"
      paysofterPublicKey={paysofterPublicKey}
      onSuccess={handleOnSuccess}
      onClose={handleOnClose}
      referenceId={`RID${Math.floor(Math.random() * 100000000000000)}`}
      showPromiseOption={true}
      showFundOption={false}
      showCardOption={true}
      promises={promises}
    />
  );
};

export default App;
```

### Example 2: Payment Setup with "Pay Now" Button Option

```jsx
import React, { useState } from "react";
import { Paysofter } from "react-paysofter";

const App = () => {
  const [showPayment, setShowPayment] = useState(false);
  const amount = 5000; // Amount in Nigerian Naira, e.g., NGN 5,000
  const currency = "NGN"; // Nigerian Naira
  const email = "buyer@example.com"; // Buyer's email
  const [paysofterPublicKey] = useState("test_api_key_abc123"); // Replace with your actual Paysofter public key
  const promises = [
    "Payment will be held in escrow until all terms are met.",
    "Item will be exactly as described in the listing.",
    "Item will be delivered within the agreed timeframe.",
    "Refund will be given if seller doesn't meet terms.",
  ];

  const handleOnSuccess = () => {
    console.log("Payment successful!");
    setShowPayment(false); // Hide payment component after success
  };

  const handleOnClose = () => {
    console.log("Payment window closed.");
    setShowPayment(false); // Hide payment component when closed
  };

  return (
    <div>
      {!showPayment ? (
        <button onClick={() => setShowPayment(true)}>Pay Now</button>
      ) : (
        <Paysofter
          amount={amount}
          currency={currency}
          email={email}
          paysofterPublicKey={paysofterPublicKey}
          onSuccess={handleOnSuccess}
          onClose={handleOnClose}
          referenceId={`RID${Math.floor(Math.random() * 100000000000000)}`}
          showPromiseOption={truefalse}
          showFundOption={false}
          showCardOption={false}
          promises={promises}
        />
      )}
    </div>
  );
};

export default App;
```

### Example 3: Payment Setup with "Pay Now" Button Option and Input Fields

```jsx
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Add bootstrap.min.css to the entry point of your app e.g. "index.js" to be available globally
import { Paysofter } from "react-paysofter";

const App = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [amount, setAmount] = useState(5000); // Default amount in NGN, e.g., NGN 5,000
  const [currency, setCurrency] = useState("NGN"); // Default currency
  const [email, setEmail] = useState("buyer@example.com"); // Default email
  const [paysofterPublicKey] = useState("test_api_key_abc123"); // Replace with your actual Paysofter public key
  // const referenceId = `RID${Math.floor(Math.random() * 10000000000000000)}`; // Generate a 17-digit random payment reference with RID prefix
  const referenceId = `RID${new Date()
    .toISOString()
    .slice(2, 19)
    .replace(/[-T:]/g, "")}${Math.floor(Math.random() * 100000)}`; // Or generate a 17-digit payment reference with RID prefix starting with the timestamp and random numbers appended at the end as in 'RIDYYMMDDHHMMSSxxxxx'.
  console.log("referenceId:", referenceId);

  const promises = [
    "Payment will be held in escrow until all terms are met.",
    "Item will be exactly as described in the listing.",
    "Item will be delivered within the agreed timeframe.",
    "Refund will be given if seller doesn't meet terms.",
  ];

  const handleOnSuccess = () => {
    console.log("Payment successful!");
    setShowPayment(false); // Hide payment component after success
  };

  const handleOnClose = () => {
    console.log("Payment window closed.");
    setShowPayment(false); // Hide payment component when closed
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center", padding: "10px" }}>Checkout</h2>
      {!showPayment ? (
        <Form>
          <Form.Group controlId="formAmount">
            <Form.Label>Amount: </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </Form.Group>

          <Form.Group controlId="formCurrency" style={{ marginTop: "10px" }}>
            <Form.Label>Currency: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" style={{ marginTop: "10px" }}>
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <Button
              variant="primary"
              onClick={() => setShowPayment(true)}
              style={{ marginTop: "20px" }}
            >
              Pay Now
            </Button>
          </div>
        </Form>
      ) : (
        <>
          <Paysofter
            amount={amount}
            currency={currency}
            email={email}
            paysofterPublicKey={paysofterPublicKey}
            onSuccess={handleOnSuccess}
            onClose={handleOnClose}
            referenceId={referenceId}
            showPromiseOption={false}
            showFundOption={true}
            showCardOption={true}
            promises={promises}
          />
        </>
      )}
    </div>
  );
};

export default App;
```


## Props

| Prop Name            | Type                  | Description                                                                                                                                                                                                                                                                                                                                                                     |
|----------------------|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `amount`             | Number                | The amount to be paid.                                                                                                                                                                                                                                                                                                                                                          |
| `currency`           | String                | The currency in which the payment is to be made (e.g., USD, NGN).                                                                                                                                                                                                                                                                                                               |
| `email`              | String                | The email address of the user making the payment.                                                                                                                                                                                                                                                                                                                               |
| `paysofterPublicKey` | String                | Your Paysofter public key for processing the payment.                                                                                                                                                                                                                                                                                                                           |
| `onSuccess`          | Function              | Callback function to handle the success of the payment.                                                                                                                                                                                                                                                                                                                         |
| `onClose`            | Function              | Callback function to handle the closing of the payment window.                                                                                                                                                                                                                                                                                                                  |
| `showPromiseOption`  | Boolean               | Whether to show the Promise payment option (default: true). If all options are declared false, then Promise payment option defaults to true.                                                                                                                                                                                                                                    |
| `showFundOption`     | Boolean               | Whether to show the Fund Account payment option.                                                                                                                                                                                                                                                                                                                                |
| `showCardOption`     | Boolean               | Whether to show the Card payment option.                                                                                                                                                                                                                                                                                                                                        |
| `buyerName`          | String                | The buyer's name for the Card payment option. This information is optional with a maximum length of 225 characters, and the buyer may choose not to provide it.                                                                                                                                                                                                                 |
| `buyerPhoneNumber`   | String                | The buyer's phone number for the Card payment option. This information is optional, and the buyer may choose not to provide it.                                                                                                                                                                                                                                                 |
| `referenceId`        | String                | A unique identifier for the payment serving as a reference for the payment options. Either generate a 17-digit random payment reference with `RID` prefix, or generate a 17-digit payment reference with `RID` prefix starting with a timestamp and a small random number appended at the end. Paysofter also generates a transaction ID (`TID`) for every transaction. |
| `qty`                | Number                | The quantity or number of units paid for in the transaction. This is optional and ranges from 1 to 10,000 units.                                                                                                                                                                                                                                                                |
| `productName`        | String                | The name of the product being purchased in the transaction. This is optional with a maximum length of 225 characters.                                                                                                                                                                                                                                                           |
| `promises`           | Array or JSON string  | A list of promise strings defining the escrow agreement between buyer and seller. The following defaults must be included: “Item will be exactly as described in the listing.” and “Payment will be held in escrow until all terms are met.” Each promise should be a maximum of 70 characters, and there can be up to 5 promises. If using FormData, stringify the array like so: `formData.append("promises", JSON.stringify(promises));` |



## Contributing to the Project

1. **Fork the Repository:** Begin by forking the repository to your GitHub account.
2. **Create a New Feature Branch:** Create a branch for your feature or bug fix using the following command:
   ```bash
   git checkout -b feature-name
   ```
3. **Commit Your Changes:** Once you’ve made your changes, commit them with a meaningful message:
   ```bash
   git commit -am 'Description of the changes made'
   ```
4. **Push to the Branch:** Push your feature branch to the repository:
   ```bash
   git push origin feature-name
   ```
5. **Submit a Pull Request:** Finally, submit a pull request for review and integration.

## Additional Configuration Options

For further configuration options, please refer to the [Paysofter Documentation](https://paysofter.com/docs/).
