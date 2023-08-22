const express = require("express");
const router = express.Router();
const {
  addMember,
  getAll,
  updateMember,
  deleteMember,
} = require("../controllers/member");
const { verify } = require("../middleware/verifyToken");

router.post("/add", verify, addMember);
router.get("/getall", verify, getAll);
router.put("/update/:id", verify, updateMember);
router.delete("/delete/:id", verify, deleteMember);

module.exports = router;
