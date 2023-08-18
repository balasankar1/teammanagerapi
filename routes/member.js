const express = require("express");
const {
  addMember,
  getAll,
  getMember,
  updateMember,
  deleteMember,
} = require("../controllers/member");

const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/add", verifyToken, addMember);
router.get("/getallmembers", verifyToken, getAll);
router.get("/get/:id", verifyToken, getMember);
router.put("/update/:id", verifyToken, updateMember);
router.delete("/delete/:id", verifyToken, deleteMember);

module.exports = router;
