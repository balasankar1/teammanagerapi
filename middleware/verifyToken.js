const jwt = require("jsonwebtoken");
const client = require("../configs/db");

exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(500).json({ error: "Database error occured" });
    }

    const userEmail = decoded.email;
    client
      .query(`SELECT * FROM members WHERE memberemail = '${userEmail}';`)
      .then((data) => {
        const isValid = data.rows;
        if (isValid.length === 0) {
          return res.status(400).json({ message: "Invalid Token" });
        } else {
          req.email = userEmail;
          next();
        }
      })
      .catch((error) => {
        res.status(500).json({
          error: "Database error occurred!!",
        });
      });
  });
};
