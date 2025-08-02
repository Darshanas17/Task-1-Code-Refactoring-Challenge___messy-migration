const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const controller = require("../controllers/userController");
const {
  validateUser,
  validateLogin,
  validateUpdateUser,
} = require("../validators/userValidator");

// Public routes
router.post("/", validateUser, controller.createUser);
router.post("/login", validateLogin, controller.login);

// Protected routes with JWT middleware
router.get("/search/name", authenticateToken, controller.searchUsersByName);
router.get("/", authenticateToken, controller.getAllUsers);
router.get("/:id", authenticateToken, controller.getUserById);
router.put(
  "/:id",
  authenticateToken,
  validateUpdateUser,
  controller.updateUser
);
router.delete("/:id", authenticateToken, controller.deleteUser);

module.exports = router;
