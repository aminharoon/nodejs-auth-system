import mongoose from 'mongoose';
import { config } from '../config/config.js';
import bcryptjs from "bcrypt";
import jwt from 'jsonwebtoken';

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,

    },
    expiresAt: {
        type: Date,

    }
})

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.otp;
    delete obj.__v;
    return obj;
}

userSchema.pre('save', async function () {
    if (!this.isModified('otp')) {
        return;
    }
    this.otp = await bcryptjs.hash(this.otp, 10);
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcryptjs.hash(this.password, 10)
})

userSchema.methods.comparePassword = async (password) => {

    const result = await bcryptjs.compare(password, this.password)
    console.log(result)
    return result;
}

userSchema.methods.compareOtp = async function (enteredOtp) {
    return await bcryptjs.compare(enteredOtp, this.otp);
}


userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ id: this._id }, config.ACCESS_TOKEN, { expiresIn: '1h' });
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ id: this._id }, config.REFRESH_TOKEN, { expiresIn: '7d' });
}



const userModel = mongoose.model('User', userSchema);

export default userModel;