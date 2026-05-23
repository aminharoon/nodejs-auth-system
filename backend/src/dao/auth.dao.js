
import userModel from "../models/user.model.js";

const findUser = async (query) => {
    return await userModel.findOne(query);
}

const createUser = async (userData) => {
    const user = new userModel(userData);
    return await user.save();
}



export { findUser, createUser };