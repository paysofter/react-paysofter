// PaysofterPromise.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal, Card, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PaysofterAccountFundPromise from "./PaysofterAccountFundPromise";
import Select from "react-select";
import { PAYMENT_DURATION_CHOICES } from "./payment-constants";

const defaultPromises = [
  "Payment will be held in escrow until all terms are met.",
  "Item will be exactly as described in the listing.",
];

const PaysofterPromise = ({
  email,
  currency,
  amount,
  promises,
  paysofterPublicKey,
  referenceId,
  qty,
  productName,
  onSuccess,
  onClose,
}) => {
  console.log("promises:", promises);

  const [durationChoices, setDurationChoices] = useState([]);
  useEffect(() => {
    setDurationChoices(PAYMENT_DURATION_CHOICES);
  }, []);

  const handleDurationChange = (selectedOption) => {
    setDuration(selectedOption.value);
  };

  const [duration, setDuration] = useState("Within 1 day");
  const [acceptedPromises, setAcceptedPromises] = useState(false);

  const promisesToShow = promises?.length > 0 ? promises : defaultPromises;

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showPaysofterAccountFundPromise, setShowPaysofterAccountFundPromise] =
    useState(false);
  const [showPromisesInfoModal, setShowPromisesInfoModal] = useState(false);

  const handleShowPaysofterAccountFundPromise = () => {
    setShowPaysofterAccountFundPromise(true);
  };

  const handleInfoModalShow = () => {
    setShowInfoModal(true);
  };
  const handleInfoModalClose = () => {
    setShowInfoModal(false);
  };

  const handlePromisesInfoModalShow = () => {
    setShowPromisesInfoModal(true);
  };
  const handlePromisesInfoModalClose = () => {
    setShowPromisesInfoModal(false);
  };

  const [showExpectedDurationInfoModal, setShowExpectedDurationInfoModal] = useState(false);
  const handleExpectedDurationInfoModalShow = () => {
    setShowExpectedDurationInfoModal(true);
  };
  const handleExpectedDurationInfoModalClose = () => {
    setShowExpectedDurationInfoModal(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  console.log('PaysofterPromise amount:', amount)

  return (
    <Container>
      {showPaysofterAccountFundPromise ? (
        <>
          <PaysofterAccountFundPromise
            currency={currency}
            amount={amount}
            email={email}
            duration={duration}
            promises={promisesToShow}
            paysofterPublicKey={paysofterPublicKey}
            referenceId={referenceId}
            qty={qty}
            productName={productName}
            onSuccess={onSuccess}
            onClose={onClose}
          />
        </>
      ) : (
        <Row className="justify-content-center">
          <Col>
            <Row className="text-center py-2">
              <Col md={10}>
                <h2 className="py-2 text-center">Paysofter Promise</h2>
              </Col>
              <Col md={2}>
                <Button
                  variant="outline-info"
                  onClick={handleInfoModalShow}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Paysofter Promise option escrows or places in custody the received payment until a specified condition has been fulfilled before payment is transferred to the seller."
                >
                  <i className="fa fa-info-circle"> </i>
                </Button>

                <Modal show={showInfoModal} onHide={handleInfoModalClose}>
                  <Modal.Header closeButton>
                    <Modal.Title className="text-center w-100 py-2">
                      Paysofter Promise
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p className="text-center">
                      Paysofter Promise option escrows or places in custody the
                      payment made to a seller (using the payer's funded
                      Paysofter Account Fund) until a specified condition has
                      been fulfilled.{" "}
                      <a
                        href="https://paysofter.com/about-paysofter-promise/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        <span>
                          <Button
                            variant="primary"
                            size="sm"
                            className="text-center py-2"
                          >
                            Learn more
                          </Button>
                        </span>
                      </a>
                    </p>
                  </Modal.Body>
                </Modal>
              </Col>
            </Row>

            <Form onSubmit={submitHandler}>
              <Form.Group controlId="currency">
                <Form.Label>Currency</Form.Label>
                <Select
                  value={{ value: currency, label: currency }}
                  isDisabled
                />
              </Form.Group>

              <Form.Group controlId="duration">
                <Row>
                  <Col md={10}>
                    <Form.Label>Expected Settlement Duration</Form.Label>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="outline-info"
                      onClick={handleExpectedDurationInfoModalShow}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="This represents the seller's estimated fulfillment timeframe for the Promise order."
                    >
                      <i className="fa fa-info-circle"> </i>
                    </Button>

                    <Modal show={showExpectedDurationInfoModal} onHide={handleExpectedDurationInfoModalClose}>
                      <Modal.Header closeButton>
                        <Modal.Title className="text-center w-100 py-2">
                          Expected Settlement Duration
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p className="text-center">
                          This represents the seller's estimated fulfillment timeframe for the Promise order.{" "}
                          <a
                            href="https://paysofter.com/about-paysofter-promise/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {" "}
                            <span>
                              <Button
                                variant="primary"
                                size="sm"
                                className="text-center py-2"
                              >
                                Learn more
                              </Button>
                            </span>
                          </a>
                        </p>
                      </Modal.Body>
                    </Modal>
                  </Col>
                </Row>

                <Select
                  options={durationChoices?.map(([value, label]) => ({
                    value,
                    label,
                  }))}
                  value={{ value: duration, label: duration }}
                  onChange={handleDurationChange}
                  placeholder="Select Duration"
                />
              </Form.Group>

              <Form.Group controlId="promises">
                <Row className="justify-content-center py-1">
                  <Col md={10}>
                    <Form.Label>Promises</Form.Label>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="outline-info"
                      onClick={handlePromisesInfoModalShow}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="View the promises that define the escrow agreement."
                    >
                      <i className="fa fa-info-circle"> </i>
                    </Button>
                  </Col>
                </Row>

                <Card className="h-100 shadow-sm rounded">
                  <Card.Body>
                    {promisesToShow?.map((item, idx) => (
                      // <p key={idx} className="text-center">
                      //   <Badge bg="success">{item}</Badge>
                      // </p>
                      <div key={idx} className="d-flex justify-content-center py-1">
                        <Badge bg="success" className="px-3 py-2 text-wrap text-center rounded-pill" style={{ maxWidth: '100%' }}>
                          {item}
                        </Badge>
                      </div>
                    ))}
                  </Card.Body>
                </Card>

                <Modal show={showPromisesInfoModal} onHide={handlePromisesInfoModalClose}>
                  <Modal.Header closeButton>
                    <Modal.Title className="text-center w-100 py-2">Promises Info</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p className="text-center">
                      Promises are agreements between the buyer and seller, and must include the following standard terms as part of the escrow arrangement:
                      <ul>
                        {defaultPromises.map((promise, idx) => (
                          <li key={idx}>{promise}</li>
                        ))}
                      </ul>
                      <a
                        href="https://paysofter.com/about-paysofter-promise/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="primary" size="sm" className="text-center py-2">
                          Learn more
                        </Button>
                      </a>
                    </p>
                  </Modal.Body>
                </Modal>
              </Form.Group>

              <Form.Check
                type="checkbox"
                label="Accept Promises"
                checked={acceptedPromises}
                onChange={(e) => setAcceptedPromises(e.target.checked)}
                className="rounded py-2 mb-2"
              />

              <div className="py-3 text-center">
                <Button
                  className="w-100 rounded-pill"
                  type="submit"
                  variant="primary"
                  onClick={handleShowPaysofterAccountFundPromise}
                  disabled={!acceptedPromises}
                >
                  Submit{" "}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PaysofterPromise;
