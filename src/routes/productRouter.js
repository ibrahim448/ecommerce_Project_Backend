const express = require("express");
const formidable = require("express-formidable");

const { requireSinging, isAdmin } = require("../middlewares/authMiddleware");

const { createProduct, readAllProduct, readOneProduct, updateProduct, deleteProduct, photo, filteredProducts, productCount, productPagination, productSearch, relatedproduct } = require("../controllers/productCategory");
const router = express.Router();

router.post("/createProduct", requireSinging, isAdmin, formidable(), createProduct)
router.get("/products", readAllProduct);
router.get("/product/:slug", readOneProduct);
router.post("/product/:productId", requireSinging, isAdmin, formidable(), updateProduct);
router.delete("/product/:productId", requireSinging, isAdmin, deleteProduct);
router.get("/product/photo/:productId", photo);
router.post("/product-filter", filteredProducts);
router.get("/product-count", productCount);
router.get("/list-products/:page", productPagination);
router.get("/products/search/:keyword", productSearch);
router.get("/products/related/:categoryId/:productId", relatedproduct);






module.exports = router;