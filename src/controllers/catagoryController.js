const Category = require("../models/catagoryModel");
const slugify = require("slugify");



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