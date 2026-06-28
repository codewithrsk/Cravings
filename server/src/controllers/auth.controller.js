import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const RegisterUser = async (req, res, next) => {
  try {
    const { fullName, email, password, phone, gender, dob } = req.body;

    if (!fullName || !email || !password || !phone || !gender || !dob) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email already registred");
      error.statusCode = 409;
      return next(error);
    }

    const photoUrl = `https://placehold.co/600x400?text=${fullName.charAt(0).toUpperCase()}`;

    const photo = {
      url: photoUrl,
      publicId: null,
    };

    const SALLT = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, SALLT);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      gender,
      dob,
      photo,
    });

    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const LoginUser = async (req, res, next) => {
  try {
    console.log(1);

    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }
    console.log(2);

    const existingUser = await User.findOne({ email });
    console.log(3);

    if (!existingUser) {
      const error = new Error("Not Rigester User");
      error.statusCode = 401;
      return next(error);
    }
    console.log(4);
    const SALLT = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, SALLT);
    console.log(788)

    if (hashedPassword != existingUser.password) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      console.log(420);
      
      return next(error);
    }
    console.log(5);

    res.status(200).json({
      message: "login Succesfull",
      data: existingUser,
    });
    return;
  } catch (error) {
    console.log(6);

    next();
    res.status(500).json({ message: "Interal Server Error" });
  }
};
export const Logout = (req, res) => {
  res.json({ massage: "logout successfull" });
};
