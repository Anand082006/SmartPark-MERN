import { useState } from "react";

import Navbar from "./components/Navbar/page";
import Sidebar from "./components/Sidenav/page";

import BookParking from "./pages/BookParking";
import MyBookings from "./pages/MyBookings";
import LiveMap from "./pages/LiveMap.jsx";
import QRTickets from "./pages/QRTickets";
import Favorites from "./pages/Favorites";
import Payments from "./pages/Payments";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import HelpCenter from "./pages/HelpCenter";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

import "./App.css";

function App() {
  const [page, setPage] = useState("Dashboard");

  // Admin Login Status
  const [adminLoggedIn, setAdminLoggedIn] =
    useState(false);

  return (
    <div className="app">
      {/* Navbar */}
      <Navbar />

      <div className="main-layout">
        {/* Sidebar */}
        <Sidebar onMenuClick={setPage} />

        {/* Main Content */}
        <main className="content">

          {/* ================= DASHBOARD ================= */}
          {page === "Dashboard" && (
            <>
              <h1>Welcome to SmartPark 🚗</h1>

              <p>
                Manage your parking easily and quickly.
              </p>

              <div className="cards">
                <div className="card">
                  <h3>Available Parking</h3>
                  <h2>120</h2>
                </div>

                <div className="card">
                  <h3>My Bookings</h3>
                  <h2>05</h2>
                </div>

                <div className="card">
                  <h3>Active Parking</h3>
                  <h2>01</h2>
                </div>
              </div>
            </>
          )}

          {/* ================= BOOK PARKING ================= */}
          {page === "Book Parking" && (
            <BookParking />
          )}

          {/* ================= MY BOOKINGS ================= */}
          {page === "My Bookings" && (
            <MyBookings />
          )}

          {/* ================= LIVE MAP ================= */}
          {page === "Live Map" && (
            <LiveMap />
          )}

          {/* ================= QR TICKETS ================= */}
          {page === "QR Tickets" && (
            <QRTickets />
          )}

          {/* ================= FAVORITES ================= */}
          {page === "Favorites" && (
            <Favorites />
          )}

          {/* ================= PAYMENTS ================= */}
          {page === "Payments" && (
            <Payments />
          )}

          {/* ================= NOTIFICATIONS ================= */}
          {page === "Notifications" && (
            <Notifications />
          )}

          {/* ================= PROFILE ================= */}
          {page === "Profile" && (
            <Profile />
          )}

          {/* ================= SETTINGS ================= */}
          {page === "Settings" && (
            <Settings />
          )}

          {/* ================= HELP CENTER ================= */}
          {page === "Help Center" && (
            <HelpCenter />
          )}

          {/* ================= ADMIN ================= */}
          {page === "Admin" &&
            (adminLoggedIn ? (
              <Admin />
            ) : (
              <AdminLogin
                onLogin={() =>
                  setAdminLoggedIn(true)
                }
              />
            ))}
        </main>
      </div>
    </div>
  );
}

export default App;