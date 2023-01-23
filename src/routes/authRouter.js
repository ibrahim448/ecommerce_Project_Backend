const express = require("express");
const { registrationUser, loginUser, allUsers, updateUser} = require("../controllers/authControoller");
const { requireSinging, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();




router.post("/register", registrationUser);
router.post("/login", loginUser);
router.get("/users", allUsers);
router.get("/auth-check", requireSinging, (req,res)=>{
    res.json({ok:true});
});
router.get("/admin-check",requireSinging, isAdmin, (req,res)=>{
    res.json({ok:true});
});

router.post("/updateUser",requireSinging, updateUser);










module.exports = router;