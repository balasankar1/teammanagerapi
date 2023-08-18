const client = require("../configs/db");

exports.getMember = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await client.query(
      `SELECT * FROM members WHERE id = ${userId};`
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

exports.getAll = (req, res) => {};

exports.addMember = async (req, res) => {
  try {
    const { name, role, memberemail, address, phonenumber } = req.body;
    const result = await client.query(`
      INSERT INTO members (name, role, memberemail, address, phonenumber)
      VALUES ('${name}', '${role}', '${memberemail}', '${address}', '${phonenumber}');`);

    const addedMember = result.rows[0];
    res.status(201).json({
      message: "Member added successfully",
      member: addedMember,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "An error occurred while adding the member",
    });
  }
};

exports.updateMember = (req, res) => {};
exports.deleteMember = (req, res) => {};
