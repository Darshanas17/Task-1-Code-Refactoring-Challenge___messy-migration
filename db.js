const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

let db;

async function initializeDb() {
  try {
    db = await open({
      filename: "./users.db",
      driver: sqlite3.Database,
    });
    console.log("Connected to the database");
    return db;
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    process.exit(1);
  }
}

module.exports = initializeDb;
