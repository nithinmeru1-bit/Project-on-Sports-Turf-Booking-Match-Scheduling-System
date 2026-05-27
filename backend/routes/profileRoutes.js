const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Protected route
router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to your profile!",
        userId: req.user.id
    });
});

module.exports = router;

