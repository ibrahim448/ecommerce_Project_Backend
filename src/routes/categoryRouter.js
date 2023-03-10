const express = require("express");
const { create, readAll, update, deleteData, readOne, productsByCategory, categoryCount } = require("../controllers/catagoryController");
const router = express.Router();
const { requireSinging, isAdmin } = require("../middlewares/authMiddleware");





router.post("/create", requireSinging, isAdmin, create);
router.get("/readAll", readAll);
router.post("/update/:categoryId", requireSinging, isAdmin, update);
router.delete("/delete/:categoryId", requireSinging, isAdmin, deleteData);
router.get("/readOne/:slug", readOne);
router.get("/products-by-category/:slug", productsByCategory);
router.get("/category-count", categoryCount);







module.exports = router;