import userModel from '../model/user.model.js';


export const createUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required");
  }

  const hashedPassword = await userModel.hashPassword(password);
  const user = new userModel({
    name,
    email,
    password: hashedPassword
  });
  return user.save();
};



