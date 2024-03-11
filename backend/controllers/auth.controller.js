import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "passwords do not match" });
    }

    const user = User.findOne({ username }); //checks if username already exists

    if (user) {
      return res.status(400).json({ error: "username already exists" });
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //profile picture
    const boyProfilePic = "";
    const girlProfilePic = "";

    //creates a new user object
    const newUser = new user({
      fullName,
      username,
      password: hashedPassword,
      gender: gender === male ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res); // generate token and set cookie
      await newUser.save(); //saves object to the DB

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }); // checks if user already exists
    const isPasswordcorrect = await bcrypt.compare(
      password,
      user?.password || ""
    ); // checks if password is correct

    if (!user && !isPasswordcorrect) {
      res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullNamename: user.fullName,
      userName: user.username,
      profilePicture: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie(jwt, "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
