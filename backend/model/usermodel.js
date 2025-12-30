import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    avatar:{
        type: String,
        default: ""
    },
    phone:{
        type: String,
        default: ""
    },
    address:{
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);

export default User;