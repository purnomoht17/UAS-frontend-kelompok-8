const UserModel = require('../repository/userRepository');
const bcrypt = require('bcrypt');

class UserService {
  static async getAllUsers() {
    return UserModel.getAllUsers();
  }

  static async getUserById(id) {
    return UserModel.getUserById(id);
  }

  static async createUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10); 
    return UserModel.createUser(name, email, hashedPassword);
  }

  static async updateUser(id, name, email) {
    return UserModel.updateUser(id, name, email);
  }

  static async deleteUser(id) {
    return UserModel.deleteUser(id);
  }
}

module.exports = UserService;
