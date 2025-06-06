// PaysofterButtonTest.js
import React, { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CardPaymentTest from "./CardPaymentTest";
import PaysofterAccountFundTest from "./PaysofterAccountFundTest";
import PaysofterPromiseTest from "./PaysofterPromiseTest";
import UssdPayment from "./UssdPayment";
import BankPayment from "./BankPayment";
import TransferPayment from "./TransferPayment";
import QrPayment from "./QrPayment";
import { formatAmount } from "./FormatAmount";
import logoImage from "./images/logo.png";
import "./Paysofter.css";

function PaysofterButtonTest({
  amount,
  currency,
  email,
  promises,
  paysofterPublicKey,
  onSuccess,
  onClose,
  onError,
  showPaymentModal,
  setShowPaymentModal,
  referenceId,
  qty,
  productName,
  buyerName,
  buyerPhoneNumber,
  showFundOption,
  showCardOption,
  showPromiseOption,
}) {
  const getDefaultPaymentOption = () => {
    if (showPromiseOption) return "promise";
    if (showCardOption) return "card";
    if (showFundOption) return "fund";
    return "promise";
  };

  const [selectedPaymentOption, setSelectedPaymentOption] = useState(
    getDefaultPaymentOption()
  );

  // const [showMoreOptions, setShowMoreOptions] = useState(false);

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
  };

  // const handleMoreOptions = () => {
  //   setShowMoreOptions(!showMoreOptions);
  // };

  const handleOnClosePayment = () => {
    console.log("onClose called!");
    setShowPaymentModal(false);
    onClose();
  };

  console.log('PaysofterButtonTest amount:', amount)
  // console.log("logoImage:", logoImage);
  // console.log("promises:", promises);

  return (
    <div>
      <Modal
        show={showPaymentModal}
        backdrop="static"
        onHide={handleOnClosePayment}
      >
        <Modal.Header closeButton>
          <div className="text-center w-100 py-2">
            <div className="py-2">
              <img
                src={logoImage}
                alt="Paysofter"
                style={{
                  maxHeight: "40px",
                  maxWidth: "80px",
                  height: "auto",
                  width: "auto",
                }}
              />
            </div>
            <Modal.Title>
              Paysofter <span className="test-mode">Test</span>
            </Modal.Title>
            <div>{email}</div>
            <div>
              {formatAmount(amount)} {currency}
            </div>
          </div>
        </Modal.Header>

        {/* {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>} */}

        <Modal.Body>
          <Row>
            <Col md={3}>
              <div className="text-center">
                <p>Options</p>

                {showPromiseOption && (
                  <div className="py-1">
                    <Button
                      variant={selectedPaymentOption === "promise" ? "primary" : "outline-primary"}
                      onClick={() => handlePaymentOptionChange("promise")}
                      className={
                        selectedPaymentOption === "promise" ? "active" : ""
                      }
                    >
                      <i className="fas fa-money-bill-wave"></i> Paysofter
                      Promise
                    </Button>
                  </div>
                )}

                {showCardOption && (
                  <div className="py-1">
                    <Button
                      variant={selectedPaymentOption === "card" ? "primary" : "outline-primary"}
                      onClick={() => handlePaymentOptionChange("card")}
                      className={
                        selectedPaymentOption === "card" ? "active" : ""
                      }
                    >
                      <i className="fas fa-credit-card"></i> Debit Card
                    </Button>{" "}
                  </div>
                )}

                {showFundOption && (
                  <div className="py-1">
                    <Button
                      variant={selectedPaymentOption === "fund" ? "primary" : "outline-primary"}
                      onClick={() => handlePaymentOptionChange("fund")}
                      className={
                        selectedPaymentOption === "fund" ? "active" : ""
                      }
                    >
                      <i className="fas fa-money-bill-alt"></i> Paysofter
                      Account Fund
                    </Button>
                  </div>
                )}

                {/* <div className="text-center py-2">
                  <Button
                    variant="outline-primary"
                    onClick={handleMoreOptions}
                    className="rounded"
                    disabled
                  >
                    <i className="fas fa-bars"></i> More Options
                  </Button>
                </div> */}

                {/* {showMoreOptions && (
                  <>
                    <div className="py-1">
                      <Button
                        variant="outline-primary"
                        onClick={() => handlePaymentOptionChange("transfer")}
                        className={
                          selectedPaymentOption === "transfer" ? "active" : ""
                        }
                      >
                        <i className="fa fa-exchange"></i> Transfer
                      </Button>
                    </div>

                    <div className="py-1">
                      <Button
                        variant="outline-primary"
                        onClick={() => handlePaymentOptionChange("bank")}
                        className={
                          selectedPaymentOption === "bank" ? "active" : ""
                        }
                      >
                        <i className="fas fa-bank"></i> Bank
                      </Button>
                    </div>

                    <div className="py-1">
                      <Button
                        variant="outline-primary"
                        onClick={() => handlePaymentOptionChange("ussd")}
                        className={
                          selectedPaymentOption === "ussd" ? "active" : ""
                        }
                      >
                        <i className="fa fa-mobile"></i> USSD
                      </Button>{" "}
                    </div>

                    <div className="py-1">
                      <Button
                        variant="outline-primary"
                        onClick={() => handlePaymentOptionChange("qr")}
                        className={
                          selectedPaymentOption === "qr" ? "active" : ""
                        }
                      >
                        <i className="fa fa-qrcode"></i> Visa QR
                      </Button>{" "}
                    </div>
                  </>
                )} */}
              </div>
            </Col>
            <Col md={9}>
              {selectedPaymentOption === "promise" && (
                <PaysofterPromiseTest
                  amount={amount}
                  currency={currency}
                  email={email}
                  promises={promises}
                  paysofterPublicKey={paysofterPublicKey}
                  onSuccess={onSuccess}
                  onClose={handleOnClosePayment}
                  referenceId={referenceId}
                  qty={qty}
                  productName={productName}
                />
              )}

              {selectedPaymentOption === "card" && (
                <CardPaymentTest
                  amount={amount}
                  currency={currency}
                  email={email}
                  paysofterPublicKey={paysofterPublicKey}
                  onSuccess={onSuccess}
                  onClose={handleOnClosePayment}
                  referenceId={referenceId}
                  qty={qty}
                  productName={productName}
                  buyerName={buyerName}
                  buyerPhoneNumber={buyerPhoneNumber}
                />
              )}

              {selectedPaymentOption === "fund" && (
                <PaysofterAccountFundTest
                  amount={amount}
                  currency={currency}
                  email={email}
                  paysofterPublicKey={paysofterPublicKey}
                  onSuccess={onSuccess}
                  onClose={handleOnClosePayment}
                  referenceId={referenceId}
                  qty={qty}
                  productName={productName}
                />
              )}

              {selectedPaymentOption === "bank" && <BankPayment />}
              {selectedPaymentOption === "transfer" && <TransferPayment />}
              {selectedPaymentOption === "ussd" && <UssdPayment />}
              {selectedPaymentOption === "qr" && <QrPayment />}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PaysofterButtonTest;
