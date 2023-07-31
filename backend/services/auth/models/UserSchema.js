import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Otros campos relacionados con el perfil del usuario pueden agregarse aquí
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
