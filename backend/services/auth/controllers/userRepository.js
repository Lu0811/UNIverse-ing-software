// userRepository.js

import User from "../models/User.js";

export class UserRepository {
  async findByUsernameOrEmail(username, email) {
    return User.findOne({ $or: [{ username }, { email }] });
  }

  async findById(id) {
    return User.findById(id);
  }

  async save(user) {
    await user.save();
  }

  async update(id, updates) {
    return User.findByIdAndUpdate(id, updates, { new: true });
  }

  async delete(id) {
    return User.findByIdAndDelete(id);
  }

}
