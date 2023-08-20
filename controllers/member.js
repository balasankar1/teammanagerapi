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
exports.getAll = async (req, res) => {
  try {
    console.log(req.email);
    const data = await client.query(
      `SELECT * FROM members WHERE email='${req.email}';`
    );

    const memberData = data.rows;
    const filteredData = memberData.map((member) => ({
      name: member.name,
      role: member.role,
      email: member.memberemail,
      address: member.address,
      phoneNumber: member.phonenumber,
    }));

    res.status(200).json({
      message: "Member data received successfully",
      data: filteredData,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addMember = async (req, res) => {
  try {
    console.log(req.email);
    const { name, role, memberemail, address, phonenumber } = req.body;
    const result = await client.query(`
      INSERT INTO members (name, role, memberemail, address, phonenumber,email)
      VALUES ('${name}', '${role}', '${memberemail}', '${address}', '${phonenumber}','${req.email}');`);

    res.status(201).json({
      message: "Member added successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "An error occurred while adding the member",
    });
  }
};

exports.deleteMember = async (req, res) => {
  const memberId = req.params.id;

  try {
    await client.query(`DELETE FROM members WHERE id = ${memberId};`);

    res.status(200).json({
      message: "Member deleted successfully",
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      message: "Error occurred while deleting member",
    });
  }
};

exports.updateMember = async (req, res) => {
  const memberId = req.params.id;
  const { name, role, email, address, phoneNumber } = req.body;

  try {
    const updateQuery = `
      UPDATE members
      SET name = '${name}', role = '${role}', memberemail = '${email}', address = '${address}', phonenumber = '${phoneNumber}'
      WHERE id = ${memberId};
    `;
    await client.query(updateQuery);

    res.status(200).json({
      message: "Member updated successfully",
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      message: "Error occurred while updating member",
    });
  }
};
