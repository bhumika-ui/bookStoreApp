import User from "../model/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcryptjs.hash(password, 10);

    const createdUser = new User({
      fullname,
      email,
      password: hashPassword,
    });
    await createdUser.save();
 
    const token = generateToken(createdUser._id);

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
        avatar: createdUser.avatar,
        phone: createdUser.phone,
        address: createdUser.address
      },
      token
    });
  } catch (error) {
    console.log("Error:" + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    } else {

      const token = generateToken(user._id);

      res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          avatar: user.avatar,
          phone: user.phone,
          address: user.address
        },
        token
      });
    }
  } catch (error) {
    console.log("Error:" + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProfile = async(req, res) => {
  try{
    const user = await User.findById(req.user._id).select("-password");
    if(!user){
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error){
    res.status(500).json({ message: "Error:" + error.message });
  }
};

const updateProfile = async(req, res) => {
  try{
    const { fullname, phone, address, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { fullname, phone, address, avatar },
      { new: true }
    ).select("-password");

    if(!user){
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user
    });
  } catch (error){
    res.status(500).json({ message: "Error:" + error.message });
  }
};

const changePassword = async(req, res) => {
  try{
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if(!user){
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(currentPassword, user.password);
    if(!isMatch){
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch(error) {
    res.status(500).json({ message: "Error:" + error.message });
  }
};

export { signup, login, getProfile, updateProfile, changePassword };
