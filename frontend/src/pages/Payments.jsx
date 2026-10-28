import { useState } from "react";

function Payments() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      alert("Please select a payment method!");
      return;
    }

    setPaymentStatus("success");
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>Payments 💳</h1>
        <p>Pay your parking booking securely.</p>
      </div>

      {paymentStatus === "success" ? (
        <div
          className="booking-box"
          style={{
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "60px",
              marginBottom: "10px",
            }}
          >
            ✅
          </div>

          <h2>Payment Successful!</h2>

          <p
            style={{
              marginTop: "10px",
              color: "#555",
            }}
          >
            Your parking payment has been
            successfully completed.
          </p>

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#f8f9fa",
              borderRadius: "10px",
            }}
          >
            <p>
              <strong>Booking Amount:</strong> ₹30
            </p>

            <p>
              <strong>Payment Method:</strong>{" "}
              {paymentMethod}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span style={{ color: "green" }}>
                Paid
              </span>
            </p>
          </div>

          <button
            className="book-button"
            style={{
              marginTop: "20px",
            }}
            onClick={() => {
              setPaymentStatus("");
              setPaymentMethod("");
            }}
          >
            Make Another Payment
          </button>
        </div>
      ) : (
        <div className="booking-box">
          <h2>Parking Payment</h2>

          {/* Booking Summary */}
          <div
            style={{
              marginTop: "20px",
              padding: "18px",
              background: "#f8f9fa",
              borderRadius: "10px",
            }}
          >
            <h3>🧾 Booking Summary</h3>

            <p style={{ marginTop: "12px" }}>
              📍 <strong>Parking:</strong>{" "}
              SmartPark - Jaunpur
            </p>

            <p>
              🚗 <strong>Vehicle:</strong>{" "}
              UP65AB1234
            </p>

            <p>
              ⏱️ <strong>Duration:</strong>{" "}
              1 Hour
            </p>

            <hr />

            <h2>
              Total Amount: ₹30
            </h2>
          </div>

          {/* Payment Form */}
          <form
            onSubmit={handlePayment}
            style={{
              marginTop: "25px",
            }}
          >
            <div className="form-group">
              <label>💳 Select Payment Method</label>

              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              >
                <option value="">
                  Select Payment Method
                </option>

                <option value="UPI">
                  📱 UPI
                </option>

                <option value="Credit Card">
                  💳 Credit Card
                </option>

                <option value="Debit Card">
                  💳 Debit Card
                </option>

                <option value="Cash">
                  💵 Cash
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="book-button"
            >
              💳 Pay ₹30
            </button>
          </form>

          <p
            style={{
              marginTop: "15px",
              textAlign: "center",
              color: "#777",
              fontSize: "13px",
            }}
          >
            🔒 This is a demo payment system.
            No real money will be charged.
          </p>
        </div>
      )}
    </div>
  );
}

export default Payments;