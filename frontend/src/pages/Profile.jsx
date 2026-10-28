import { useState } from "react";

function Profile() {
  const [name, setName] = useState("SmartPark User");
  const [email, setEmail] = useState("user@smartpark.com");
  const [phone, setPhone] = useState("9876543210");
  const [vehicleNumber, setVehicleNumber] =
    useState("UP65AB1234");

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>My Profile 👤</h1>
        <p>Manage your SmartPark profile information.</p>
      </div>

      <div
        className="booking-box"
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        {/* Profile Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              backgroundColor: "#0d6efd",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              margin: "0 auto 12px",
            }}
          >
            👤
          </div>

          <h2>{name}</h2>

          <p
            style={{
              color: "#777",
              marginTop: "5px",
            }}
          >
            SmartPark User
          </p>
        </div>

        {/* Success Message */}
        {saved && (
          <div
            style={{
              padding: "12px",
              marginBottom: "20px",
              backgroundColor: "#d1e7dd",
              color: "#0f5132",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            ✅ Profile updated successfully!
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>👤 Full Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>📧 Email Address</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>📱 Mobile Number</label>

            <input
              type="tel"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              placeholder="Enter mobile number"
            />
          </div>

          <div className="form-group">
            <label>🚗 Vehicle Number</label>

            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) =>
                setVehicleNumber(e.target.value)
              }
              placeholder="e.g. UP65AB1234"
            />
          </div>

          <button
            type="submit"
            className="book-button"
          >
            💾 Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;