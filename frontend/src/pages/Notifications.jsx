import { useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: "✅",
      title: "Booking Confirmed",
      message:
        "Your parking booking at SmartPark - Jaunpur has been confirmed.",
      time: "10 minutes ago",
      type: "success",
    },
    {
      id: 2,
      icon: "💳",
      title: "Payment Successful",
      message:
        "Your parking payment of ₹30 has been successfully completed.",
      time: "20 minutes ago",
      type: "payment",
    },
    {
      id: 3,
      icon: "🎫",
      title: "QR Ticket Ready",
      message:
        "Your QR parking ticket is ready to use.",
      time: "30 minutes ago",
      type: "ticket",
    },
    {
      id: 4,
      icon: "📢",
      title: "Parking Reminder",
      message:
        "Please reach the parking location on time.",
      time: "1 hour ago",
      type: "info",
    },
  ]);

  const removeNotification = (id) => {
    setNotifications(
      notifications.filter(
        (notification) => notification.id !== id
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>Notifications 🔔</h1>
        <p>
          Stay updated with your parking activities.
        </p>
      </div>

      {/* Clear All Button */}
      {notifications.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "15px",
          }}
        >
          <button
            onClick={clearAll}
            style={{
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#dc3545",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🗑️ Clear All
          </button>
        </div>
      )}

      {/* Notifications */}
      {notifications.length === 0 ? (
        <div
          className="booking-box"
          style={{
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "55px",
              marginBottom: "10px",
            }}
          >
            🔕
          </div>

          <h2>No Notifications</h2>

          <p
            style={{
              marginTop: "8px",
              color: "#666",
            }}
          >
            You are all caught up!
          </p>
        </div>
      ) : (
        <div>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              style={{
                backgroundColor: "white",
                padding: "18px",
                marginBottom: "15px",
                borderRadius: "12px",
                boxShadow:
                  "0 3px 10px rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "30px",
                  }}
                >
                  {notification.icon}
                </div>

                <div>
                  <h3>{notification.title}</h3>

                  <p
                    style={{
                      marginTop: "5px",
                      color: "#555",
                    }}
                  >
                    {notification.message}
                  </p>

                  <small
                    style={{
                      display: "block",
                      marginTop: "7px",
                      color: "#888",
                    }}
                  >
                    🕐 {notification.time}
                  </small>
                </div>
              </div>

              <button
                onClick={() =>
                  removeNotification(
                    notification.id
                  )
                }
                style={{
                  border: "none",
                  background: "#f1f1f1",
                  borderRadius: "50%",
                  width: "35px",
                  height: "35px",
                  cursor: "pointer",
                  fontSize: "16px",
                  flexShrink: 0,
                }}
                title="Remove notification"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;