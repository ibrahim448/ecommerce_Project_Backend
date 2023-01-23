const express = require("express");
const formidable = require("express-formidable");

const { requireSinging, isAdmin } = require("../middlewares/authMiddleware");

const { createProduct, readAllProduct, readOneProduct, updateProduct, deleteProduct } = require("../controllers/productCategory");
const router = express.Router();

router.post("/createProduct", requireSinging, isAdmin, formidable(), createProduct)
router.get("/products", readAllProduct);
router.get("/product/:slug", readOneProduct);
router.post("/product/:productId", requireSinging, isAdmin, formidable(), updateProduct);
router.delete("/product/:productId", requireSinging, isAdmin, deleteProduct);






module.exports = router;