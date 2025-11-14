// controllers\userController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res, next) => {
  try {
    // register a new user
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const adminEmails = process.env.ADMIN_EMAILS
      ? process.env.ADMIN_EMAILS.split(",")
      : [];
    console.log("Admin Emails:", adminEmails);
    const isAdmin = adminEmails.includes(email);
    let newUser;
    if (isAdmin) {
      console.log("Creating admin user");
      newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: "admin",
      });
      await newUser.save();
    } else {
      console.log("Creating normal user");
      newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
    }

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    // login user logic
    // get email and password from req.body
    const { email, password } = req.body;
    // check if user exists and password matches
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // generate token and set cookie

    const token = user.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    next(error);
  }
};
