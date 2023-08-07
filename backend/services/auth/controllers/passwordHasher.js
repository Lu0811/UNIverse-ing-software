// passwordHasher.js

import bcrypt from "bcrypt";

export class PasswordHasher {
  async hash(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async compare(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}
