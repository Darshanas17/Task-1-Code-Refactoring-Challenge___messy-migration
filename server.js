require("dotenv").config();

["PORT", "JWT_SECRET", "JWT_EXPIRES_IN", "NODE_ENV", "SALT_ROUNDS"].forEach(
  (varName) => {
    if (!process.env[varName]) {
      console.error(`Missing environment variable: ${varName}`);
      process.exit(1);
    }
  }
);

const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");
const initializeDb = require("./db");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
});
app.use(limiter);

const startServer = async () => {
  try {
    const db = await initializeDb();

    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    app.use("/users", userRoutes);

    app.get("/", (req, res) =>
      res.status(200).send("User Management System API is running...")
    );

    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
