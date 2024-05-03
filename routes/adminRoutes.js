const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
  deleteUserController
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

const User = require('../models/userModels');

// GET all users
router.get("/getAllUsers", authMiddleware, getAllUsersController);

// GET all doctors
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// POST change account status
router.post("/changeAccountStatus", authMiddleware, changeAccountStatusController);

// DELETE user by ID
router.delete("/users/:userId", authMiddleware, deleteUserController);

router.put("/users/:userId", async (req, res) => {
  try {
    const { name, email, isDoctor } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { name, email, isDoctor },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
