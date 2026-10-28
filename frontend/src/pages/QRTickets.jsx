import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function QRTickets() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/bookings"
        );

        const data = await response.json();

        if (response.ok) {
          setBookings(data);
        } else {
          alert("Bookings load nahi ho pa rahi hain!");
        }
      } catch (error) {
        console.error("QR Ticket Error:", error);
        alert("Backend server se connection nahi ho pa raha!");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Download QR Ticket
  const downloadTicket = (booking) => {
    const canvas = document.getElementById(
      `qr-${booking._id}`
    );

    if (!canvas) {
      alert("QR code nahi mila!");
      return;
    }

    const link = document.createElement("a");

    link.download = `SmartPark-Ticket-${booking.vehicleNumber}.png`;

    link.href = canvas.toDataURL("image/png");

    link.click();
  };

  if (loading) {
    return (
      <div className="booking-page">
        <div className="booking-header">
          <h1>QR Tickets 🎫</h1>
          <p>Loading your parking tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>QR Tickets 🎫</h1>
        <p>Your parking tickets are available here.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="booking-box">
          <h3>No QR Ticket Found</h3>
          <p>Please book a parking space first.</p>
        </div>
      ) : (
        <div className="cards">
          {bookings.map((booking) => (
            <div className="card" key={booking._id}>
              
              <h2>🅿️ SmartPark</h2>

              <p>
                📍 <strong>Location:</strong>{" "}
                {booking.location}
              </p>

              <p>
                🚗 <strong>Vehicle:</strong>{" "}
                {booking.vehicleNumber}
              </p>

              <p>
                🚘 <strong>Vehicle Type:</strong>{" "}
                {booking.vehicleType}
              </p>

              <p>
                📅 <strong>Date:</strong>{" "}
                {booking.date}
              </p>

              <p>
                🕐 <strong>Time:</strong>{" "}
                {booking.time}
              </p>

              <p>
                🆔 <strong>Booking ID:</strong>{" "}
                {booking._id}
              </p>

              {/* QR CODE */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px 0",
                }}
              >
                <QRCodeCanvas
                  id={`qr-${booking._id}`}
                  value={JSON.stringify({
                    bookingId: booking._id,
                    location: booking.location,
                    date: booking.date,
                    time: booking.time,
                    vehicleNumber:
                      booking.vehicleNumber,
                    vehicleType:
                      booking.vehicleType,
                  })}
                  size={180}
                  level="H"
                />
              </div>

              <p>
                🟢 <strong>Status:</strong>{" "}
                Confirmed
              </p>

              <h2>₹30</h2>

              {/* DOWNLOAD BUTTON */}
              <button
                onClick={() =>
                  downloadTicket(booking)
                }
                style={{
                  width: "100%",
                  marginTop: "15px",
                  padding: "12px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#198754",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                📥 Download Ticket
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QRTickets;