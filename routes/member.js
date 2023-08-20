const express = require("express");
const {
  addMember,
  getAll,
  getMember,
  updateMember,
  deleteMember,
} = require("../controllers/member");

//const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/add", addMember);
router.get("/getall", getAll);
router.get("/get/:id", getMember);
router.put("/update/:id", updateMember);
router.delete("/delete/:id", deleteMember);

module.exports = router;
