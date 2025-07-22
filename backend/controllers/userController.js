import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createtoken } from "../utils/createToken.js";

export async function createUser(req, res) {
  try {
    const { email, password, username } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fil all feilds" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    // token creation and ...

    createtoken(res, newUser._id, newUser.email);

    return res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error" });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "please enter email and passowrd" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    createtoken(res, user._id, user.email);

    return res.status(200).json({
      message: "login successful",
      user: { _id: user._id, email: user.email, username: user.username ,isAdmin:user.isAdmin},
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function logOutUser(req, res) {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {

    console.log(error);

    return res.status(500).json({ message: "Logout failed" });

  }
}
