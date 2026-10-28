
import { useEffect, useState } from "react";

function BookParking() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [slotNumber, setSlotNumber] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const slots = Array.from({ length: 25 }, (_, i) => i + 1);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!location.trim() || !date || !time) {
        setBookedSlots([]);
        setSlotNumber("");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/bookings/slots?location=${encodeURIComponent(
            location
          )}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`
        );

        if (response.ok) {
          const data = await response.json();
          setBookedSlots(data.bookedSlots || []);
          setSlotNumber("");
        }
      } catch (error) {
        console.error("Fetch Slots Error:", error);
      }
    };

    fetchBookedSlots();
  }, [location, date, time]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (
      !location.trim() ||
      !date ||
      !time ||
      !vehicleNumber.trim() ||
      !vehicleType ||
      !slotNumber
    ) {
      alert("Please fill all details and select a parking slot!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location,
            date,
            time,
            vehicleNumber: vehicleNumber.trim().toUpperCase(),
            vehicleType,
            slotNumber,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(
          `Parking Booked Successfully! 🚗\n\nLocation: ${location}\nSlot: P-${slotNumber}\nDate: ${date}\nTime: ${time}\nVehicle: ${vehicleNumber}`
        );

        setBookedSlots((previous) => [...previous, Number(slotNumber)]);
        setLocation("");
        setDate("");
        setTime("");
        setVehicleNumber("");
        setVehicleType("");
        setSlotNumber("");
      } else {
        alert(data.message || "Booking failed!");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Backend server se connection nahi ho pa raha!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>Book Your Parking 🚗</h1>
        <p>Select your parking slot and reserve your space.</p>
      </div>

      <div className="booking-box">
        <form onSubmit={handleBooking}>
          <div className="form-group">
            <label>📍 Parking Location</label>
            <input
              type="text"
              placeholder="Enter parking location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>📅 Date</label>
              <input
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>🕐 Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>🚗 Vehicle Number</label>
            <input
              type="text"
              placeholder="e.g. UP65AB1234"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>🅿️ Vehicle Type</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="">Select Vehicle Type</option>
              <option value="Bike">Bike</option>
              <option value="Car">Car</option>
              <option value="SUV">SUV</option>
            </select>
          </div>

          <div style={{ marginTop: 24 }}>
            <h3>Choose Your Parking Slot</h3>
            <p>Select location, date and time first.</p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                gap: 10,
                marginTop: 16,
              }}
            >
              {slots.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                const isSelected = String(slotNumber) === String(slot);

                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={isBooked || !location.trim() || !date || !time}
                    onClick={() => setSlotNumber(String(slot))}
                    style={{
                      padding: "14px 4px",
                      border: isSelected
                        ? "3px solid #1d4ed8"
                        : "1px solid #ddd",
                      borderRadius: 8,
                      backgroundColor: isBooked
                        ? "#dc3545"
                        : isSelected
                        ? "#2563eb"
                        : "#16a34a",
                      color: "white",
                      fontWeight: "bold",
                      cursor:
                        isBooked || !location.trim() || !date || !time
                          ? "not-allowed"
                          : "pointer",
                      opacity:
                        !location.trim() || !date || !time ? 0.5 : 1,
                    }}
                  >
                    P-{slot}
                    <br />
                    <small>
                      {isBooked
                        ? "Booked"
                        : isSelected
                        ? "Selected"
                        : "Available"}
                    </small>
                  </button>
                );
              })}
            </div>

            <p style={{ marginTop: 16 }}>
              <strong>Selected Slot:</strong>{" "}
              {slotNumber ? `P-${slotNumber}` : "None"}
            </p>
          </div>

          <div className="parking-info">
            <div>
              <span>Available Slots</span>
              <strong>{25 - bookedSlots.length}</strong>
            </div>
            <div>
              <span>Price / Hour</span>
              <strong>₹30</strong>
            </div>
          </div>

          <button
            type="submit"
            className="book-button"
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookParking;
