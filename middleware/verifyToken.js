const jwt = require("jsonwebtoken");
const client = require("../configs/db");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const userEmail = decoded.email;

    const data = await client.query(
      `SELECT * FROM users WHERE email = '${userEmail}';`
    );
    const isValid = data.rows;

    if (isValid.length === 0) {
      return res.status(400).json({ message: "Invalid Token" });
    } else {
      req.email = userEmail;
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Database error occured" });
  }
};
