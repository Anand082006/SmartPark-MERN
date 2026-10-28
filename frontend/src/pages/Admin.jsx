import { useEffect, useState } from "react";

function Admin() {
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");

  // ===============================
  // GET JWT TOKEN
  // ===============================

  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  // ===============================
  // LOGOUT
  // ===============================

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Kya aap Admin Logout karna chahte hain?"
    );

    if (!confirmLogout) {
      return;
    }

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    window.location.reload();
  };

  // ===============================
  // HANDLE SESSION EXPIRED
  // ===============================

  const handleSessionExpired = () => {
    alert("Session expired. Please login again.");

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    window.location.reload();
  };

  // ===============================
  // FETCH BOOKINGS
  // ===============================

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const token = getToken();

      if (!token) {
        alert("Admin login required!");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/admin/bookings",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setBookings(data);
      } else if (response.status === 401) {
        handleSessionExpired();
      } else {
        alert(
          data.message ||
            "Bookings load nahi ho pa rahi hain!"
        );
      }
    } catch (error) {
      console.error("Admin Fetch Error:", error);

      alert(
        "Backend server se connection nahi ho pa raha!"
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // LOAD BOOKINGS
  // ===============================

  useEffect(() => {
    fetchBookings();
  }, []);

  // ===============================
  // CHANGE BOOKING STATUS
  // ===============================

 const changeStatus = async (id, newStatus) => {
  try {
    const token = getToken();

    if (!token) {
      alert("Admin login required!");
      return;
    }

    const response = await fetch(
      `http://localhost:5000/api/admin/bookings/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === id
            ? {
                ...booking,
                status: newStatus,
              }
            : booking
        )
      );

      alert("Booking status updated successfully!");
    } else if (response.status === 401) {
      handleSessionExpired();
    } else {
      alert(
        data.message ||
          "Booking status update nahi hua!"
      );
    }
  } catch (error) {
    console.error("Status Update Error:", error);

    alert(
      "Backend server se connection nahi ho pa raha!"
    );
  }
};

  // ===============================
  // DELETE BOOKING
  // ===============================

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Kya aap is booking ko delete karna chahte hain?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);

      const token = getToken();

      if (!token) {
        alert("Admin login required!");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/admin/bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Booking deleted successfully! ✅");

        setBookings((previousBookings) =>
          previousBookings.filter(
            (booking) => booking._id !== id
          )
        );
      } else if (response.status === 401) {
        handleSessionExpired();
      } else {
        alert(
          data.message ||
            "Booking delete nahi hui!"
        );
      }
    } catch (error) {
      console.error(
        "Delete Booking Error:",
        error
      );

      alert(
        "Backend server se connection nahi ho pa raha!"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ===============================
  // STATISTICS
  // ===============================

  const totalBookings = bookings.length;

  const totalVehicles = new Set(
    bookings.map(
      (booking) => booking.vehicleNumber
    )
  ).size;

  const totalRevenue = bookings.length * 30;
  const confirmedBookings = bookings.filter(
  (booking) =>
    (booking.status || "Confirmed") === "Confirmed"
).length;

const completedBookings = bookings.filter(
  (booking) => booking.status === "Completed"
).length;

const cancelledBookings = bookings.filter(
  (booking) => booking.status === "Cancelled"
).length;

  const availableParking = Math.max(
    120 - bookings.length,
    0
  );

  // ===============================
  // SEARCH
  // ===============================

  const searchText = search.toLowerCase().trim();

  const filteredBookings = bookings.filter(
    (booking) => {
      return (
        booking.location
          ?.toLowerCase()
          .includes(searchText) ||
        booking.vehicleNumber
          ?.toLowerCase()
          .includes(searchText) ||
        booking.vehicleType
          ?.toLowerCase()
          .includes(searchText) ||
        booking.date
          ?.toLowerCase()
          .includes(searchText)
      );
    }
  );

  // ===============================
  // UI
  // ===============================

  return (
    <div className="booking-page">

      {/* ===============================
          HEADER
      =============================== */}

      <div className="booking-header">

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >

          <div>
            <h1>Admin Dashboard 🛠️</h1>

            <p>
              Manage SmartPark bookings and
              parking data.
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#dc3545",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🚪 Logout
          </button>

        </div>

      </div>

      {/* ===============================
          STATISTICS
      =============================== */}

      <div className="cards">

        <div className="card">
          <h3>📋 Total Bookings</h3>
          <h2>{totalBookings}</h2>
        </div>

        <div className="card">
          <h3>🚗 Total Vehicles</h3>
          <h2>{totalVehicles}</h2>
        </div>

        <div className="card">
          <h3>🅿️ Available Parking</h3>
          <h2>{availableParking}</h2>
        </div>

        <div className="card">
          <h3>💰 Total Revenue</h3>
          <h2>₹{totalRevenue}</h2>
        </div>
        <div className="card">
  <h3>Confirmed</h3>
  <h2>{confirmedBookings}</h2>
</div>

<div className="card">
  <h3>Completed</h3>
  <h2>{completedBookings}</h2>
</div>

<div className="card">
  <h3>Cancelled</h3>
  <h2>{cancelledBookings}</h2>
</div>

      </div>

      {/* ===============================
          BOOKINGS
      =============================== */}

      <div
        className="booking-box"
        style={{
          marginTop: "25px",
          overflowX: "auto",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >

          <h2>
            📋 All Parking Bookings
          </h2>

          <button
            onClick={fetchBookings}
            disabled={loading}
            style={{
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#0d6efd",
              color: "white",
              fontWeight: "bold",
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            🔄{" "}
            {loading
              ? "Refreshing..."
              : "Refresh"}
          </button>

        </div>

        {/* ===============================
            SEARCH
        =============================== */}

        {!loading &&
          bookings.length > 0 && (
            <div
              style={{
                marginTop: "20px",
              }}
            >

              <input
                type="text"
                placeholder="🔍 Search by location, vehicle number, type or date..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "13px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "15px",
                  outline: "none",
                }}
              />

            </div>
          )}

        {/* ===============================
            LOADING
        =============================== */}

        {loading ? (

          <p
            style={{
              marginTop: "20px",
            }}
          >
            Loading bookings...
          </p>

        ) : bookings.length === 0 ? (

          <p
            style={{
              marginTop: "20px",
            }}
          >
            No bookings found.
          </p>

        ) : filteredBookings.length === 0 ? (

          <p
            style={{
              marginTop: "20px",
              color: "#dc3545",
            }}
          >
            ❌ No booking found for "{search}"
          </p>

        ) : (

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
              minWidth: "900px",
            }}
          >

            <thead>

              <tr>

                <th style={tableHeaderStyle}>
                  Location
                </th>

                <th style={tableHeaderStyle}>
                  Date
                </th>

                <th style={tableHeaderStyle}>
                  Time
                </th>

                <th style={tableHeaderStyle}>
                  Vehicle
                </th>

                <th style={tableHeaderStyle}>
                  Type
                </th>

                <th style={tableHeaderStyle}>
                  Status
                </th>

                <th style={tableHeaderStyle}>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredBookings.map(
                (booking) => (

                  <tr key={booking._id}>

                    <td style={tableCellStyle}>
                      {booking.location}
                    </td>

                    <td style={tableCellStyle}>
                      {booking.date}
                    </td>

                    <td style={tableCellStyle}>
                      {booking.time}
                    </td>

                    <td style={tableCellStyle}>
                      {booking.vehicleNumber}
                    </td>

                    <td style={tableCellStyle}>
                      {booking.vehicleType}
                    </td>

                    {/* STATUS */}

                    <td style={tableCellStyle}>

                      <select
                        value={
                          booking.status ||
                          "Confirmed"
                        }
                        onChange={(e) =>
                          changeStatus(
                            booking._id,
                            e.target.value
                          )
                        }
                        style={{
                          padding: "7px 10px",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >

                        <option value="Confirmed">
                          🟢 Confirmed
                        </option>

                        <option value="Completed">
                          🔵 Completed
                        </option>

                        <option value="Cancelled">
                          🔴 Cancelled
                        </option>

                      </select>

                    </td>

                    {/* DELETE */}

                    <td style={tableCellStyle}>

                      <button
                        onClick={() =>
                          deleteBooking(
                            booking._id
                          )
                        }
                        disabled={
                          deletingId ===
                          booking._id
                        }
                        style={{
                          padding: "8px 12px",
                          border: "none",
                          borderRadius: "6px",
                          backgroundColor:
                            "#dc3545",
                          color: "white",
                          cursor:
                            deletingId ===
                            booking._id
                              ? "not-allowed"
                              : "pointer",
                          fontWeight: "bold",
                        }}
                      >

                        {deletingId ===
                        booking._id
                          ? "Deleting..."
                          : "Delete"}

                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

        {/* ===============================
            SEARCH RESULT COUNT
        =============================== */}

        {!loading &&
          bookings.length > 0 &&
          search && (

            <p
              style={{
                marginTop: "15px",
                color: "#666",
              }}
            >

              Showing{" "}

              <strong>
                {filteredBookings.length}
              </strong>{" "}

              of{" "}

              <strong>
                {bookings.length}
              </strong>{" "}

              bookings

            </p>

          )}

      </div>
    </div>
  );
}

// ===============================
// TABLE STYLES
// ===============================

const tableHeaderStyle = {
  padding: "12px",
  backgroundColor: "#f1f3f5",
  borderBottom: "2px solid #ddd",
  textAlign: "left",
};

const tableCellStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

export default Admin;