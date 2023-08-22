const client = require("../configs/db");

exports.getAll = async (req, res) => {
  const email = req.email;
  try {
    const data = await client.query(
      `SELECT * FROM members WHERE email='${email}' ORDER BY id;`
    );

    const memberData = data.rows;
    const filteredData = memberData.map((member) => ({
      id: member.id,
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
    const { name, role, memberEmail, address, phoneNumber } = req.body;
    const result = await client.query(`
  INSERT INTO members (name, role, memberemail, address, phonenumber, email)
  VALUES ('${name}', '${role}', '${memberEmail}', '${address}', '${phoneNumber}', '${req.email}')`);

    res.status(201).json({
      success: "Member added successfully",
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
    await client.query("DELETE FROM members WHERE id = $1;", [memberId]);

    res.status(200).json({
      success: "Member deleted successfully",
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
  const { name, role, memberEmail, address, phoneNumber } = req.body;

  try {
    console.log(memberId);
    await client.query(`
    UPDATE members
    SET name = '${name}', role = '${role}', memberemail = '${memberEmail}', address = '${address}', phonenumber = '${phoneNumber}', email = '${req.email}'
    WHERE id = ${memberId};
  `);

    res.status(200).json({
      success: "Member updated successfully",
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      message: "Error occurred while updating member",
    });
  }
};
