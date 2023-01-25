const Category = require("../models/catagoryModel");
const slugify = require("slugify");
const Product = require("../models/productModel");


exports.create = async(req,res)=>{
  try {

    const {name} = req.body;
    if(!name.trim()){
      res.json({error:"Name is required"});
    };

    const existsName = await Category.findOne({name});
    if(existsName){
      res.json({error:"Alredy Exists"});
    };

    const category = await new Category({name, slug:slugify(name)}).save();
    res.json(category);
    
  } catch (error) {
    console.log(error)
    return res.json({error:"Unauthorized"})
  };
};

exports.readAll = async(req,res)=>{
  try {

    const category = await Category.find({});
    res.json(category);
    
  } catch (error) {
    console.log(error)
  };
};

exports.update = async(req,res)=>{
  try {

    const {name} = req.body;
    const {categoryId} = req.params;
    if(!name.trim()){
      res.json({error:"Name is required"});
    };

    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        slug:slugify(name)
      },
      {
        new: true
      }
    );

    res.json(category);
    
  } catch (error) {
    console.log(error)
  };
};

exports.deleteData = async(req,res)=>{
  try {

    const {categoryId} = req.params;

    const deleteCategory = await Category.findByIdAndRemove(categoryId);
    res.json({data:"Delete Success"})
    
  } catch (error) {
    console.log(error)
  };
};

exports.readOne = async(req,res)=>{
  try {

    const {slug} = req.params;

    const read = await Category.findOne({slug});
    res.json(read);
    
  } catch (error) {
    console.log(error)
  }
};

exports.productsByCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    const products = await Product.find({ category }).populate("category").select("-photo");

    res.json({
      category,
      products,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.categoryCount = async(req,res)=>{
  try {

    const category = await Category.find({}).estimatedDocumentCount();
    res.json(category);
    
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  };
};
