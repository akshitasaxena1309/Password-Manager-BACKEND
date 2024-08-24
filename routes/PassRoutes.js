const express = require("express");
const router = express.Router();
const passController = require("../controllers/Passontroller");
const authMiddleware = require("../middlewares/authMiddleware");

// user creation area
router.post("/register", passController.register);
router.post("/login", passController.login);

// website password area
router.post("/addSite", authMiddleware, passController.addSite);
router.delete("/deleteSite/:siteId", authMiddleware, passController.deleteSite);
router.post("/update/:siteId", authMiddleware, passController.updateSite);
// User

router.get("/passwordInfo", authMiddleware, passController.passwordDetails);

module.exports = router;
