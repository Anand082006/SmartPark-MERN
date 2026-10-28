import { useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState([
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
  ]);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(
      (parking) => parking.id !== id
    );

    setFavorites(updatedFavorites);
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>My Favorites ❤️</h1>
        <p>Your favorite parking locations.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="booking-box">
          <h2>No Favorite Parking</h2>
          <p>
            You have not added any parking location
            to favorites yet.
          </p>
        </div>
      ) : (
        <div className="cards">
          {favorites.map((parking) => (
            <div className="card" key={parking.id}>
              <h2>🅿️ {parking.name}</h2>

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
                  alert(
                    `${parking.name} selected!`
                  )
                }
              >
                Book Parking
              </button>

              <button
                onClick={() =>
                  removeFavorite(parking.id)
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
                  cursor: "pointer",
                }}
              >
                ❌ Remove Favorite
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;