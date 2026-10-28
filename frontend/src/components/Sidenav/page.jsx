import { useState } from "react";

function Sidebar({ onMenuClick }) {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    ["📋", "Dashboard"],
    ["🅿️", "Book Parking"],
    ["🗺️", "Live Map"],
    ["📖", "My Bookings"],
    ["🎫", "QR Tickets"],
    ["❤️", "Favorites"],
    ["💳", "Payments"],
    ["🔔", "Notifications"],
    ["👤", "Profile"],
    ["⚙️", "Settings"],
    ["❓", "Help Center"],
    ["🛠️", "Admin"],
  ];

  const handleClick = (name) => {
    setActive(name);
    onMenuClick(name);
  };

  return (
    <aside className="sidebar">
      <div className="logo">SmartPark</div>

      <div className="menu">
        {menuItems.map(([icon, name]) => (
          <div
            key={name}
            className={`menu-item ${active === name ? "active" : ""}`}
            onClick={() => handleClick(name)}
          >
            <span className="icon">{icon}</span>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;