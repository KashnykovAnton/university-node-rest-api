import bcrypt from "bcrypt";
import User from "../models/User.js";

function findUser(filter) {
  return User.findOne(filter);
}

async function saveUser(data) {
  const hashPassword = await bcrypt.hash(data.password, 10);
  return User.create({ ...data, password: hashPassword });
}

function updateUser(filter, data) {
  return User.findOneAndUpdate(filter, data);
}

export default { findUser, saveUser, updateUser };
