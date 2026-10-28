import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [showQR, setShowQR] = useState(null);

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
    console.error("Fetch Bookings Error:", error);
    alert("Backend server se connection nahi ho pa raha!");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchBookings();
  }, []);

  // Cancel Booking
  const cancelBooking = async (id) => {
    const confirmCancel = window.confirm(
      "Kya aap is booking ko cancel karna chahte hain?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      setCancellingId(id);

      const response = await fetch(
        `http://localhost:5000/api/bookings/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Booking cancelled successfully! ✅");

        setBookings((previousBookings) =>
  previousBookings.map((booking) =>
    booking._id === id
      ? { ...booking, status: "Cancelled" }
      : booking
  )
);

        setShowQR(null);
      } else {
        alert(data.message || "Booking cancel nahi hui!");
      }
    } catch (error) {
      console.error("Cancel Booking Error:", error);
      alert("Backend server se connection nahi ho pa raha!");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>My Bookings 📖</h1>
        <p>View and manage your parking bookings.</p>
      </div>

      {loading ? (
        <div className="booking-box">
          <h3>Loading bookings...</h3>
        </div>
      ) : bookings.length === 0 ? (
        <div className="booking-box">
          <h3>No bookings found.</h3>
          <p>Book your parking space first.</p>
        </div>
      ) : (
        <div className="cards">
          {bookings.map((booking) => (
            <div className="card" key={booking._id}>
              <h3>
                🅿️ SmartPark - {booking.location}
              </h3>

              <p>
                🚗 <strong>Vehicle:</strong>{" "}
                {booking.vehicleNumber}
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
                🚘 <strong>Vehicle Type:</strong>{" "}
                {booking.vehicleType}
              </p>

              <p>
  📌 <strong>Status:</strong>{" "}
  {booking.status || "Confirmed"}
</p>

              <h3>₹30</h3>

              {/* VIEW QR BUTTON */}
              <button
                onClick={() =>
                  setShowQR(
                    showQR === booking._id
                      ? null
                      : booking._id
                  )
                }
                style={{
                  width: "100%",
                  marginTop: "10px",
                  padding: "11px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#0d6efd",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                🎫{" "}
                {showQR === booking._id
                  ? "Hide QR Ticket"
                  : "View QR Ticket"}
              </button>

              {/* QR CODE */}
              {showQR === booking._id && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "15px",
                    textAlign: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                  }}
                >
                  <h3>🎫 Parking Ticket</h3>

                  <p>
                    <strong>Booking ID:</strong>{" "}
                    {booking._id}
                  </p>

                  <QRCodeCanvas
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

                  <p
                    style={{
                      marginTop: "10px",
                      fontSize: "13px",
                    }}
                  >
                    Scan this QR code for booking
                    details.
                  </p>
                </div>
              )}

              {/* CANCEL BUTTON */}
              <button
                onClick={() =>
                  cancelBooking(booking._id)
                }
                disabled={
                  cancellingId === booking._id
                }
                style={{
                  width: "100%",
                  marginTop: "10px",
                  padding: "11px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                  cursor:
                    cancellingId === booking._id
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {cancellingId === booking._id
                  ? "Cancelling..."
                  : "Cancel Booking"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;