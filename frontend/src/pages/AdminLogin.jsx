import { useState } from "react";

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // JWT Token browser me save hoga
        localStorage.setItem(
          "adminToken",
          data.token
        );

        // Admin information save
        localStorage.setItem(
          "adminUser",
          JSON.stringify(data.admin)
        );

        alert("Admin Login Successful! ✅");

        onLogin();
      } else {
        alert(
          data.message ||
            "Invalid username or password!"
        );
      }
    } catch (error) {
      console.error(
        "Admin Login Error:",
        error
      );

      alert(
        "Backend server se connection nahi ho pa raha!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="booking-box"
        style={{
          width: "100%",
          maxWidth: "450px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              fontSize: "55px",
            }}
          >
            🔐
          </div>

          <h1>Admin Login</h1>

          <p
            style={{
              color: "#777",
              marginTop: "8px",
            }}
          >
            Login to access SmartPark Admin
            Panel
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>👤 Username</label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>🔑 Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="book-button"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "🔓 Login"}
          </button>
        </form>

        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "13px",
            color: "#666",
          }}
        >
          <strong>Admin Login</strong>
          <br />
          Use your registered admin credentials.
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;