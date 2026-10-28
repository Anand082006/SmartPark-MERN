
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Booking = require("./models/Booking");
const Admin = require("./models/Admin");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// HOME
app.get("/", (req, res) => {
  res.send("SmartPark Backend is Running Successfully!");
});

// CREATE ADMIN
app.post("/api/admin/create", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await new Admin({
      username,
      password: hashedPassword,
    }).save();

    res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    console.error("Admin Create Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ADMIN LOGIN
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
        username: admin.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ADMIN PROFILE
app.get(
  "/api/admin/profile",
  authMiddleware,
  async (req, res) => {
    try {
      const admin = await Admin.findById(
        req.admin.adminId
      ).select("-password");

      if (!admin) {
        return res.status(404).json({
          message: "Admin not found",
        });
      }

      res.status(200).json({
        message: "Admin authenticated successfully",
        admin,
      });
    } catch (error) {
      console.error("Admin Profile Error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// GET BOOKED SLOTS
app.get("/api/bookings/slots", async (req, res) => {
  try {
    const { location, date, time } = req.query;

    if (!location || !date || !time) {
      return res.status(400).json({
        message: "Location, date and time are required",
      });
    }

    const bookings = await Booking.find({
      location: location.trim(),
      date,
      time,
      status: { $ne: "Cancelled" },
      slotNumber: { $gte: 1, $lte: 25 },
    }).select("slotNumber");

    res.status(200).json({
      bookedSlots: [
        ...new Set(
          bookings.map((booking) => booking.slotNumber)
        ),
      ],
    });
  } catch (error) {
    console.error("Fetch Slots Error:", error.message);
    res.status(500).json({
      message: "Slots fetch karne mein error hua",
    });
  }
});

// CREATE BOOKING
app.post("/api/bookings", async (req, res) => {
  try {
    const {
      location,
      date,
      time,
      vehicleNumber,
      vehicleType,
      slotNumber,
    } = req.body;

    if (
      !location ||
      !date ||
      !time ||
      !vehicleNumber ||
      !vehicleType ||
      slotNumber == null ||
      !Number.isInteger(Number(slotNumber)) ||
      Number(slotNumber) < 1 ||
      Number(slotNumber) > 25
    ) {
      return res.status(400).json({
        message: "Please fill all details and select a valid slot",
      });
    }

    if (!["Bike", "Car", "SUV"].includes(vehicleType)) {
      return res.status(400).json({
        message: "Invalid vehicle type",
      });
    }

    const normalizedLocation = location.trim();
    const selectedSlot = Number(slotNumber);

    const existingBooking = await Booking.findOne({
      location: {
        $regex: `^${normalizedLocation.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
      },
      date,
      time,
      slotNumber: selectedSlot,
      status: { $ne: "Cancelled" },
    });

    if (existingBooking) {
      return res.status(409).json({
        message: "This parking slot is already booked!",
      });
    }

    const booking = new Booking({
      location: normalizedLocation,
      date,
      time,
      vehicleNumber: vehicleNumber.trim().toUpperCase(),
      vehicleType,
      slotNumber: selectedSlot,
    });

    const savedBooking = await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Booking Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET ALL BOOKINGS
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get Bookings Error:", error.message);
    res.status(500).json({
      message: "Bookings fetch karne me error hua",
    });
  }
});

// ADMIN GET BOOKINGS
app.get(
  "/api/admin/bookings",
  authMiddleware,
  async (req, res) => {
    try {
      const bookings = await Booking.find().sort({
        createdAt: -1,
      });

      res.status(200).json(bookings);
    } catch (error) {
      console.error("Admin Get Bookings Error:", error.message);
      res.status(500).json({
        message: "Bookings fetch karne me error hua",
      });
    }
  }
);

// ADMIN UPDATE BOOKING STATUS
app.put(
  "/api/admin/bookings/:id/status",
  authMiddleware,
  async (req, res) => {
    try {
      const { status } = req.body;
      const allowedStatuses = [
        "Confirmed",
        "Completed",
        "Cancelled",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid booking status",
        });
      }

      const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );

      if (!updatedBooking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

      res.status(200).json({
        message: "Booking status updated successfully",
        booking: updatedBooking,
      });
    } catch (error) {
      console.error("Update Booking Status Error:", error.message);
      res.status(500).json({
        message: "Booking status update karne me error hua",
      });
    }
  }
);

// CANCEL BOOKING
app.put("/api/bookings/:id/cancel", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.status !== "Confirmed") {
      return res.status(400).json({
        message: "Only confirmed bookings can be cancelled",
      });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error("Cancel Booking Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ADMIN DELETE BOOKING
app.delete(
  "/api/admin/bookings/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const deletedBooking = await Booking.findByIdAndDelete(
        req.params.id
      );

      if (!deletedBooking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

      res.status(200).json({
        message: "Booking deleted successfully",
        booking: deletedBooking,
      });
    } catch (error) {
      console.error("Admin Delete Booking Error:", error.message);
      res.status(500).json({
        message: "Booking delete karne me error hua",
      });
    }
  }
);

// DELETE BOOKING
app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(
      req.params.id
    );

    if (!deletedBooking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json({
      message: "Booking deleted successfully",
      booking: deletedBooking,
    });
  } catch (error) {
    console.error("Delete Booking Error:", error.message);
    res.status(500).json({
      message: "Booking delete karne me error hua",
    });
  }
});

// START SERVER
const PORT = 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");

    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error.message);
  });
