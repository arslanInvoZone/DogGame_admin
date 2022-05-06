//@des Add Users 
//@route POST /api/users/adduser

import Users from "../models/usersModel.js";

//@acess Public
const addUsers = async (req, res) => {
    const { walletAddress } = req.body;
    const user = await Users.findOne({walletAddress:walletAddress});
    
    if (!user) {
       await Users.create({
        walletAddress
      });
      res.status(201);
      res.json({
        message:'User Added Successfully!'
      });
    } else {
      res.status(400);
      res.json({message:"user already exists!"});
    }
  };

//@des User Auth
//@route POST  /api/user/login
//@acess Public
const userAuth = async (req, res) => {
    const { walletAddress } = req.body;
    const user = await Users.findOne({ walletAddress: walletAddress });
    if (user) {
      res.json({
        userExist:true
      });
    } else {
      res.status(401);
      res.json({
          userExist:false
      })
    }
  };

//@des List Users 
//@route GET /api/users/
//@acess Public
const listUsers = async (req, res) => {
  try{
    const users = await Users.find({});
    res.json(users);
  }catch(error){
    res.json(error) 
  }
};

//@des delete User 
//@route POST /api/users/delete
//@acess Private
const deleteUser = async (req, res) => {
  try{
    const {userId} = req.body
    const user = await Users.findById({_id:userId});
    if(user){
      await Users.deleteOne(user);
      res.json({message:"User Deleted Successfully!"});
    }
  }catch(error){
    res.json(error) 
  }
};

export {addUsers,userAuth,listUsers, deleteUser}