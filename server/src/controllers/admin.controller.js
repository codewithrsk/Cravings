import User from "../models/user.model.js";

export const GetAllUsers = async (req, res, next) => {
  try {
    const users = await User.find(); 
    console.log(users);
    
    res.status(200).json({ message: "All Users fetched successfully", data: users });   
  } catch (error) {
    console.log(error.message);
    next();
  }
};