import { useState } from "react";

function LiveMap() {
  const [selectedParking, setSelectedParking] = useState(null);

  const parkingLocations = [
    {
      id: 1,
      name: "SmartPark - Jaunpur",
      area: "Jaunpur City",
      slots: 25,
      price: 30,
    },
    {
      id: 2,
      name: "SmartPark - Varanasi",
      area: "Varanasi Cantt",
      slots: 18,
      price: 40,
    },
    {
      id: 3,
      name: "SmartPark - Prayagraj",
      area: "Civil Lines",
      slots: 12,
      price: 35,
    },
  ];

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>Live Parking Map 🗺️</h1>
        <p>
          Find nearby parking locations and available slots.
        </p>
      </div>

      {/* Map Area */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "450px",
          background:
            "linear-gradient(135deg, #dfe9f3, #ffffff)",
          borderRadius: "15px",
          border: "1px solid #ddd",
          overflow: "hidden",
          marginBottom: "25px",
        }}
      >
        {/* Roads */}
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: 0,
            width: "100%",
            height: "55px",
            background: "#777",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "45%",
            top: 0,
            width: "55px",
            height: "100%",
            background: "#777",
          }}
        />

        {/* Parking Marker 1 */}
        <button
          onClick={() => setSelectedParking(parkingLocations[0])}
          style={{
            position: "absolute",
            top: "25%",
            left: "25%",
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            border: "4px solid white",
            background: "#198754",
            color: "white",
            fontSize: "22px",
            cursor: "pointer",
            boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
          }}
        >
          🅿️
        </button>

        {/* Parking Marker 2 */}
        <button
          onClick={() => setSelectedParking(parkingLocations[1])}
          style={{
            position: "absolute",
            top: "65%",
            left: "65%",
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            border: "4px solid white",
            background: "#198754",
            color: "white",
            fontSize: "22px",
            cursor: "pointer",
            boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
          }}
        >
          🅿️
        </button>

        {/* Parking Marker 3 */}
        <button
          onClick={() => setSelectedParking(parkingLocations[2])}
          style={{
            position: "absolute",
            top: "20%",
            left: "70%",
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            border: "4px solid white",
            background: "#ffc107",
            color: "white",
            fontSize: "22px",
            cursor: "pointer",
            boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
          }}
        >
          🅿️
        </button>

        {/* Map Label */}
        <div
          style={{
            position: "absolute",
            bottom: "15px",
            left: "15px",
            background: "white",
            padding: "10px 15px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          📍 Parking Locations
        </div>
      </div>

      {/* Selected Parking */}
      {selectedParking && (
        <div className="booking-box">
          <h2>{selectedParking.name}</h2>

          <p>
            📍 <strong>Area:</strong>{" "}
            {selectedParking.area}
          </p>

          <p>
            🅿️ <strong>Available Slots:</strong>{" "}
            {selectedParking.slots}
          </p>

          <p>
            💰 <strong>Price / Hour:</strong>{" "}
            ₹{selectedParking.price}
          </p>

          <button
            className="book-button"
            onClick={() => alert("Parking selected!")}
          >
            Select Parking
          </button>
        </div>
      )}

      {/* Parking List */}
      <div className="cards">
        {parkingLocations.map((parking) => (
          <div className="card" key={parking.id}>
            <h3>🅿️ {parking.name}</h3>

            <p>
              📍 <strong>Area:</strong>{" "}
              {parking.area}
            </p>

            <p>
              🟢 <strong>Available Slots:</strong>{" "}
              {parking.slots}
            </p>

            <p>
              💰 <strong>Price:</strong> ₹
              {parking.price}/hour
            </p>

            <button
              className="book-button"
              onClick={() =>
                setSelectedParking(parking)
              }
            >
              View Parking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveMap;