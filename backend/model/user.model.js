import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength:[6, 'Email must be at least 6 characters long'],
        maxLength:[50, 'Email must be at most 50 characters long']
    },
    password: {
         type: String,
        required: true,
        select: false,
        minLength: [6, 'Password must be at least 6 characters long'],
        maxLength: [100, 'Password must be at most 100 characters long']
    },
});

// Hash password before saving
userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 10);
}
// Method to compare password
userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({email: this.email}, process.env.JWT_SECRET, { 
        expiresIn: '24h' // Token expiration time
    });
    return token;
};

const User = mongoose.model("User", userSchema);

export default User;