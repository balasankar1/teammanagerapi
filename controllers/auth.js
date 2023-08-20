const jwt = require("jsonwebtoken");
const client = require("../configs/db");

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await client.query(
      `SELECT * FROM teamlead WHERE email = '${email}';`
    );
    const user = userData.rows[0];

    if (!user) {
      return res.status(401).json({
        error: "User doesn't exist",
      });
    } else if (password === user.password) {
      const token = jwt.sign(
        {
          email: email,
        },
        process.env.Secret_KEY
      );

      return res.status(200).json({
        message: "User Signed In Successfully",
        token: token,
      });
    } else {
      return res.status(401).json({
        error: "Enter correct password!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signin };
