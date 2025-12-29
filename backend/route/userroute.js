import express from "express";
import { signup, login } from "../controller/usercontroller.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/profile", verifyToken, (req, res) => {
    res.status(200).json({ user: req.user });
});

export default router;
