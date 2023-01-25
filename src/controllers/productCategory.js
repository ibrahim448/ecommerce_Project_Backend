const Product = require("../models/productModel");
const fs = require("fs");
const slugify = require("slugify");



exports.createProduct = async(req,res)=>{
   try {

    const {name, description, price, category, quantity, shipping} = req.fields;
    const {photo} = req.files;


    switch(true){
        case !name.trim():
            return res.json({error:"Name is required"})
        case !description.trim():
            return res.json({error:"description is required"})
        case !price.trim():
            return res.json({error:"price is required"})
        case !category.trim():
            return res.json({error:"category is required"})
        case !quantity.trim():
            return res.json({error:"quantity is required"})
        case !shipping.trim():
            return res.json({error:"shipping is required"})
        case !name.trim():
            return res.json({error:"Name is required"})
        case photo && photo.size > 1000000:
            return res.json({error:"photo less then 1 mb is required"})
    };

    const product = new Product({...req.fields, slug:slugify(name)});

    if(photo){
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
    };

    await product.save();

    res.json(product);
    
   } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
   };
};


exports.readAllProduct = async(req,res)=>{
   try {

    const product = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(5)
      .sort({createdAt : -1});

      res.json(product);
    
   } catch (error) {
     console.log(error);
     return res.status(400).json(error.message);
   };
};


exports.readOneProduct = async(req,res)=>{
   try {

    const product = await Product.findOne({slug: req.params.slug})
    .select("-photo");

    res.json(product);
    
   } catch (error) {
        console.log(error);
        return res.status(400).js(error.message);
   };
};


exports.updateProduct = async(req,res)=>{
   try {

    const {name, description, price, category, quantity, shipping} = req.fields;
    const {photo} = req.files;


    switch(true){
        case !name.trim():
            return res.json({error:"Name is required"})
        case !description.trim():
            return res.json({error:"description is required"})
        case !price.trim():
            return res.json({error:"price is required"})
        case !category.trim():
            return res.json({error:"category is required"})
        case !quantity.trim():
            return res.json({error:"quantity is required"})
        case !shipping.trim():
            return res.json({error:"shipping is required"})
        case !name.trim():
            return res.json({error:"Name is required"})
        case photo && photo.size > 1000000:
            return res.json({error:"photo less then 1 mb is required"})
    };

    const product = await Product.findByIdAndUpdate(
        req.params.productId,
        {
          ...req.fields,
          slug: slugify(name),
        },
        { new: true }
      );

    if(photo){
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
    };

    await product.save();

    res.json(product);
    
   } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
   };
};


exports.deleteProduct = async(req,res)=>{
   try {

    const product = await Product.findByIdAndRemove(req.params.productId)
    .select("-photo");

    res.json({status:"data delete Success"});
    
   } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
   };
    
};


exports.photo = async(req,res)=>{
   try {

    const product = await Product.findById(req.params.productId).select("photo");
    if(product.photo.data){
        res.set("content-Type", product.photo.contentType);
        res.send(product.photo.data);
    }
    
   } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
   };
};

exports.filteredProducts = async (req, res) => {
    
    try {

        //filter by category and price

        const {categoryId, productPrice} = req.body;
        const result = {};

        if(categoryId.length > 0)result.category = categoryId;
        if(productPrice.length)result.price = {$gte: productPrice[0], $lte: productPrice[1]}
        

        const product = await Product.find(result)
        .select("-photo");

        res.json(product)
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    };

};

exports.productCount = async(req,res)=>{
    try {

        const products = await Product.find({}).estimatedDocumentCount();

        res.json(products);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    };
};

exports.productPagination = async(req,res)=>{
    try {

        const perpageProduct = 6;
        const page = req.params.page ? req.params.page : 1;

        const products = await Product.find({})
        .select("-photo")
        .skip((page - 1) * perpageProduct)
        .limit(perpageProduct)
        .sort({createdAt: -1});

        res.json(products);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    };
};


exports.productSearch = async(req,res)=>{
    try {

        const {keyword} = req.params;

        const product = await Product.find({
            $or: [
                {name: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}},
            ]
        })
        .select("-photo");

        res.json(product);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    };
};


exports.relatedproduct = async(req,res)=>{
    try {

       const {categoryId, productId} = req.params;

       const product = await Product.find({
            category: categoryId,
            _id: {$ne: productId}
       })
       .select("-photo")
       .populate("category")
       .limit(3)
       .sort({createdAt: -1});

       res.json(product);

        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    };
};
