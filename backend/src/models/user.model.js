import mongoose from 'mongoose';
import { config } from '../config/config.js';
import bcryptjs from "bcrypt";

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
    contact: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    }
})


userSchema.pre('save', async function () {
    if (!this.isModified('otp')) {
        return;
    }
    this.otp = await bcryptjs.hash(this.otp, 10);
})

userSchema.methods.compareOtp = async function (enteredOtp) {
    return await bcryptjs.compare(enteredOtp, this.otp);
}

const userModel = mongoose.model('User', userSchema);

export default userModel;