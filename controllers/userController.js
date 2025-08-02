const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res, next) => {
  try {
    const db = req.db;
    const rows = await db.all("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const db = req.db;
    const { id } = req.params;
    const row = await db.get("SELECT * FROM users WHERE id = ?", [id]);
    if (!row) return res.status(404).json({ error: "User not found" });
    res.status(200).json(row);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const db = req.db;
    const { name, email, password } = req.body;
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const result = await db.run(query, [name, email, hashedPassword]);

    res.status(201).json({ message: "User created", userId: result.lastID });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const db = req.db;
    const { name, email } = req.body;
    const { id } = req.params;

    if (!name && !email) {
      return res.status(400).json({ error: "Provide name or email to update" });
    }

    const updates = [];
    const params = [];

    if (name) {
      updates.push("name = ?");
      params.push(name);
    }
    if (email) {
      updates.push("email = ?");
      params.push(email);
    }

    params.push(id);

    const sql = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;

    const result = await db.run(sql, params);

    if (result.changes === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated" });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const db = req.db;
    const result = await db.run("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);

    if (result.changes === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

exports.searchUsersByName = async (req, res, next) => {
  try {
    const db = req.db;
    const { name } = req.query;
    if (!name) return res.status(400).json({ error: "Name query is required" });

    const rows = await db.all("SELECT * FROM users WHERE name LIKE ?", [
      `%${name}%`,
    ]);
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const db = req.db;
    const { email, password } = req.body;

    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (!user)
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid password" });

    const payload = { userId: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ status: "success", user_id: user.id, token });
  } catch (err) {
    next(err);
  }
};
