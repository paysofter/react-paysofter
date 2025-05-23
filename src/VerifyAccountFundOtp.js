// VerifyAccountFundOtp.js
import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Message from "./Message";
import MessageFixed from "./MessageFixed";
import Loader from "./Loader";
import { PAYSOFTER_API_URL } from "./config/apiConfig";
import axios from "axios";
import SuccessScreen from "./SuccessScreen"; 

const VerifyAccountFundOtp = ({
  amount,
  email,
  currency,
  paysofterPublicKey,
  qty,
  productName,
  referenceId,
  formattedPayerEmail,
  onSuccess,
  onClose,
}) => {
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [hasHandledSuccess, setHasHandledSuccess] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createdAt = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
  const paymentMethod = "Paysofter Account Fund";

  const sendOtpData =
    JSON.parse(localStorage.getItem("debitAccountData")) || {};

  const otpData = {
    otp: otp,
    account_id: sendOtpData.account_id,
    amount: sendOtpData.amount,
    // amount: amount,
    currency: currency,
    public_api_key: paysofterPublicKey,
  };

  const paysofterPaymentData = {
    buyer_email: email,
    amount: sendOtpData.amount,
    // amount: amount,
    currency: currency,
    public_api_key: paysofterPublicKey,
    qty: qty,
    product_name: productName,
    reference_id: referenceId,
    created_at: createdAt,
    payment_method: paymentMethod,
    account_id: sendOtpData.account_id,
  };

  const debitAccountData = {
    account_id: sendOtpData.account_id,
    security_code: sendOtpData.security_code,
    amount: sendOtpData.amount,
    // amount: amount,
    currency: currency,
    public_api_key: paysofterPublicKey,
    qty: qty,
    product_name: productName,
    reference_id: referenceId,
  };

  const handleVerifyEmailOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${PAYSOFTER_API_URL}/api/verify-otp/`, otpData);
      handleCreatePaysofterPayment();
    } catch (error) {
      setError(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
    setLoading(false);
  };

  const handleCreatePaysofterPayment = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        `${PAYSOFTER_API_URL}/api/initiate-transaction/`,
        paysofterPaymentData
      );
      setPaymentSuccess(true);
      setShowSuccessMessage(true);
      setHasHandledSuccess(true);
      handleOnSuccess();
      setTimeout(() => {
        // handleOnClose();
        setShowSuccessMessage(false);
        setShowSuccessScreen(true);
      }, 3000);
    } catch (error) {
      setError(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
    setLoading(false);
  };

  const handleResendEmailOtp = async () => {
    setResendLoading(true);
    setResendMessage("");
    try {
      await axios.post(
        `${PAYSOFTER_API_URL}/api/send-debit-fund-account-otp/`,
        debitAccountData
      );
      setResendMessage(`OTP resent to ${formattedPayerEmail} successfully.`);
      setResendDisabled(true);
    } catch (error) {
      setResendMessage("Error resending OTP. Please try again.");
    }
    setResendLoading(false);
  };

  useEffect(() => {
    let timer;
    if (countdown > 0 && resendDisabled) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    } else if (!resendDisabled) {
      setCountdown(60);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [countdown, resendDisabled]);

  const handleOnSuccess = useCallback(() => {
    onSuccess();
  }, [onSuccess]);

  // const handleOnClose = useCallback(() => {
  //   onClose();
  // }, [onClose]);

  useEffect(() => {
    if (paymentSuccess && !hasHandledSuccess) {
      setHasHandledSuccess(true);
      setShowSuccessMessage(true);
      // handleOnSuccess();
      setTimeout(() => {
        setShowSuccessMessage(false);
        localStorage.removeItem("debitAccountData");
        setShowSuccessScreen(true);
      }, 3000);
    }
  }, [paymentSuccess, hasHandledSuccess]);

  return (
    <Container>
      {showSuccessScreen ? (
        <SuccessScreen />
      ) : (
        <Row className="justify-content-center text-center mt-5">
          <Col>
            <div className="border rounded p-4 py-2">
              <h1 className="py-2">Verify OTP ({currency})</h1>
              {showSuccessMessage && (
                <Message variant="success">Payment made successfully!</Message>
              )}
              {loading && <Loader />}
              {error && <Message variant="danger">{error}</Message>}
              {resendMessage && (
                <Message variant={resendLoading ? "info" : "success"}>
                  {resendMessage}
                </Message>
              )}

              <Form className="py-2">
                <Form.Group controlId="otp">
                  <Form.Control
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    required
                  />
                </Form.Group>
                <div className="py-3">
                  <Button
                    onClick={handleVerifyEmailOtp}
                    disabled={otp === "" || loading || showSuccessMessage}
                    variant="success"
                    type="submit"
                    className="rounded"
                  >
                    Verify OTP
                  </Button>
                </div>
              </Form>
              <p>
                OTP has been sent to email: {formattedPayerEmail} for Paysofter
                Account ID: {sendOtpData.account_id} and expires in 10 minutes.
                It might take a few seconds to deliver.
              </p>
              <Button
                variant="link"
                type="submit"
                disabled={resendDisabled || resendLoading}
                onClick={handleResendEmailOtp}
              >
                {resendLoading
                  ? "Resending OTP..."
                  : resendDisabled
                  ? `Resend OTP (${countdown}sec)`
                  : "Resend OTP"}
              </Button>
            </div>

            <div className="py-2 d-flex justify-content-center">
              {error && <MessageFixed variant="danger">{error}</MessageFixed>}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default VerifyAccountFundOtp;
