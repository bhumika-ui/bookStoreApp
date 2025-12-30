import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import bookRoute from "./route/bookroute.js";
import userRoute from "./route/userRoute.js";
import contactRoute from "./route/contactroute.js"
import cors from "cors";

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3000;

app.get("/",(req,res) => {
    res.send("bookStore App");
});

app.use("/book", bookRoute);
app.use("/users", userRoute);
app.use("/contact", contactRoute);


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});