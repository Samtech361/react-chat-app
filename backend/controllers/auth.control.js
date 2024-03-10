import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "passwords do not match" });
    }

    const user = User.findOne({ userName }); //checks if username already exists

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
      userName,
      password: hashedPassword,
      gender: gender === male ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res); // generate token and set cookie
      await newUser.save(); //saves object to the DB

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
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

export const login = (req, res) => {
  res.send("login page");
};

export const logout = (req, res) => {
  res.send("logout page");
};
