import express from "express";
import { getBook, getBookById, searchBooks }  from "../controller/bookcontroller.js";

const router = express.Router();

router.get("/", getBook);
router.get("/search", searchBooks);
router.get("/:id", getBookById);

export default router;