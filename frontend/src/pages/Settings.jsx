import { useState } from "react";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>Settings ⚙️</h1>
        <p>Manage your SmartPark preferences.</p>
      </div>

      <div
        className="booking-box"
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
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
            ✅ Settings saved successfully!
          </div>
        )}

        {/* Notification Setting */}
        <div
          style={{
            padding: "18px",
            borderBottom: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3>🔔 Notifications</h3>
            <p
              style={{
                color: "#777",
                marginTop: "5px",
              }}
            >
              Receive booking and payment notifications.
            </p>
          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) =>
              setNotifications(e.target.checked)
            }
            style={{
              width: "22px",
              height: "22px",
              cursor: "pointer",
            }}
          />
        </div>

        {/* Dark Mode */}
        <div
          style={{
            padding: "18px",
            borderBottom: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3>🌙 Dark Mode</h3>
            <p
              style={{
                color: "#777",
                marginTop: "5px",
              }}
            >
              Use dark theme for the application.
            </p>
          </div>

          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) =>
              setDarkMode(e.target.checked)
            }
            style={{
              width: "22px",
              height: "22px",
              cursor: "pointer",
            }}
          />
        </div>

        {/* Location */}
        <div
          style={{
            padding: "18px",
            borderBottom: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3>📍 Location Access</h3>
            <p
              style={{
                color: "#777",
                marginTop: "5px",
              }}
            >
              Allow SmartPark to access your location.
            </p>
          </div>

          <input
            type="checkbox"
            checked={location}
            onChange={(e) =>
              setLocation(e.target.checked)
            }
            style={{
              width: "22px",
              height: "22px",
              cursor: "pointer",
            }}
          />
        </div>

        {/* Privacy */}
        <div
          style={{
            padding: "18px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <h3>🔐 Privacy & Security</h3>

          <p
            style={{
              color: "#777",
              marginTop: "5px",
            }}
          >
            Your personal information is protected.
          </p>

          <button
            style={{
              marginTop: "12px",
              padding: "9px 15px",
              border: "1px solid #0d6efd",
              borderRadius: "7px",
              background: "white",
              color: "#0d6efd",
              cursor: "pointer",
            }}
            onClick={() =>
              alert(
                "Your SmartPark account is protected."
              )
            }
          >
            View Privacy Info
          </button>
        </div>

        {/* Save */}
        <button
          className="book-button"
          style={{
            marginTop: "25px",
          }}
          onClick={handleSave}
        >
          💾 Save Settings
        </button>
      </div>
    </div>
  );
}

export default Settings;