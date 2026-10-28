import { useState } from "react";

function HelpCenter() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How can I book a parking space?",
      answer:
        "Go to Book Parking, select the parking location, date, time and vehicle details, then click Book Now.",
    },
    {
      question: "Where can I see my bookings?",
      answer:
        "Open My Bookings from the sidebar. All your parking bookings will be displayed there.",
    },
    {
      question: "How can I get my QR ticket?",
      answer:
        "Open QR Tickets from the sidebar. Your QR ticket will be displayed for each booking.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes. Go to My Bookings and click the Cancel Booking button for the booking you want to cancel.",
    },
    {
      question: "How can I make a payment?",
      answer:
        "Open Payments from the sidebar, select your payment method and click Pay.",
    },
    {
      question: "How can I contact SmartPark support?",
      answer:
        "You can contact SmartPark support using the support information given below.",
    },
  ];

  const toggleFAQ = (index) => {
    if (openFAQ === index) {
      setOpenFAQ(null);
    } else {
      setOpenFAQ(index);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>Help Center ❓</h1>
        <p>
          Find answers to common SmartPark questions.
        </p>
      </div>

      {/* FAQ */}
      <div
        className="booking-box"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h2>Frequently Asked Questions</h2>

        <div style={{ marginTop: "20px" }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                marginBottom: "12px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                style={{
                  width: "100%",
                  padding: "16px",
                  border: "none",
                  background: "#f8f9fa",
                  textAlign: "left",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>❓ {faq.question}</span>

                <span>
                  {openFAQ === index ? "▲" : "▼"}
                </span>
              </button>

              {openFAQ === index && (
                <div
                  style={{
                    padding: "15px",
                    background: "white",
                    color: "#555",
                    lineHeight: "1.6",
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div
        className="booking-box"
        style={{
          maxWidth: "800px",
          margin: "25px auto 0",
        }}
      >
        <h2>📞 Contact Support</h2>

        <p style={{ marginTop: "15px" }}>
          If you need further assistance, contact
          SmartPark support.
        </p>

        <div
          style={{
            marginTop: "20px",
            padding: "18px",
            background: "#f8f9fa",
            borderRadius: "10px",
          }}
        >
          <p>
            📧 <strong>Email:</strong>{" "}
            support@smartpark.com
          </p>

          <p style={{ marginTop: "10px" }}>
            📞 <strong>Phone:</strong>{" "}
            +91 98765 43210
          </p>

          <p style={{ marginTop: "10px" }}>
            🕐 <strong>Support Time:</strong>{" "}
            9:00 AM - 6:00 PM
          </p>
        </div>

        <button
          className="book-button"
          style={{
            marginTop: "20px",
          }}
          onClick={() =>
            alert(
              "Support request feature will be available soon!"
            )
          }
        >
          📩 Contact Support
        </button>
      </div>
    </div>
  );
}

export default HelpCenter;