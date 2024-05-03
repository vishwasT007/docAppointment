const express = require("express");
const router = express.Router();
const User = require('../models/userModels');
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDocotrsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

// Routes for user-related operations

// LOGIN || POST
router.post("/login", loginController);

// REGISTER || POST
router.post("/register", registerController);

// Authenticated user data || POST
router.post("/getUserData", authMiddleware, authController);

// Apply to become a doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// Notification related routes
router.post("/get-all-notification", authMiddleware, getAllNotificationController);
router.post("/delete-all-notification", authMiddleware, deleteAllNotificationController);

// Doctor related routes
router.get("/getAllDoctors", authMiddleware, getAllDocotrsController);

// Appointment related routes
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);
router.post("/booking-availability", authMiddleware, bookingAvailabilityController);
router.get("/user-appointments", authMiddleware, userAppointmentsController);

// Get user by ID
router.get('/:userId', async (req, res) => {
  try {
    console.log(`Fetching user with hmmm ID: ${req.params.userId}`);

    const user = await User.findById(req.params.userId);
    
    if (!user) {
      console.log(`User with ID ${req.params.userId} not found`);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`User found: ${user}`);

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
