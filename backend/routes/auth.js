const express = require('express');
const router = express.Router();
const User = require('../model/User');
const {body, validationResult}=require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'shhhhh';
const fetchUser = require('../middleware/fetchUser');
//ROUTE1: Create a User using : POST "/api/auth/createUser". No login required
router.post('/createUser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min:5})
] ,async (req, res) =>  {
  let sucsess = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({sucsess,errors: errors.array()});
    }
    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({sucsess,error: "sorry a user with this email already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    try {
        sucsess = true;
        const user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass
        });
        const Data ={
          id:user.id
        }
        const authToken =jwt.sign(Data , JWT_SECRET);
        res.json({sucsess, authToken});
      } catch (error) {
        sucsess = false;
        if (error.code === 11000) {
          // Duplicate key error
          return res.status(400).json({sucsess, error: 'Email already exists' });
        }
        console.error(error);
        res.status(500).json({sucsess,error: 'Server error' });
      }

    //   console.log(req.body);
    //   const user = User(req.body);
    //   user.save()
    //   res.send(req.body);
});
//ROUTE2:Authenticate a User using : POST "/api/auth/login". No login required 
router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists()
] ,async (req, res) =>  {
  let sucsess = false;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      sucsess = false
      return res.status(400).json({sucsess, errors: errors.array()});
  }
  const {email,password} = req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({sucsess, error:"Please try to login with different credentails"});
    }
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(400).json({sucsess, error:"Please try to login with different credentials"});
    }
    const Data ={
      id:user.id
    }
    sucsess = true;
    const authToken =jwt.sign(Data , JWT_SECRET);
    res.json({sucsess,authToken});
  }
  catch(error){
    sucsess = false;
    console.error(error);
    res.ststus(500).json({sucsess,error:"Server error"});
  }

});
//ROUTE3: Get loggedin User Details using : POST "/api/auth/getUser". Login required
router.post('/getUser',fetchUser,async (req ,res)=>{
  let sucsess = false;
  try{
    sucsess = true;
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({sucsess,user});
  }
  catch(error){
    sucsess = false;
    console.error(error);
    res.status(500).send(sucsess,"Internal Server Error");
  }
});
module.exports=router;
