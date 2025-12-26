import express from "express";
import sendMessage from "../controller/contactcontroller.js";

const router = express.Router();

router.post("/send", sendMessage);

export default router;