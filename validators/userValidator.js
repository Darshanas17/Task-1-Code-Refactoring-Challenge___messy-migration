exports.validateUser = (req, res, next) => {
  const name = (req.body.name || "").trim();
  const email = (req.body.email || "").trim();
  const { password } = req.body;

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
  }
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email and password are required" });
  }
  next();
};

exports.validateLogin = (req, res, next) => {
  const email = (req.body.email || "").trim();
  const { password } = req.body;

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
  }
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  next();
};

exports.validateUpdateUser = (req, res, next) => {
  const { name, email } = req.body;

  if (!name && !email) {
    return res.status(400).json({ error: "Provide name or email to update" });
  }

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
  }

  next();
};
