// auth.controller.js

import { PasswordHasher } from "../services/passwordHasher.js";
import { UserRepository } from "../services/userRepository.js";

export class AuthController {
  constructor(passwordHasher, userRepository) {
    this.passwordHasher = passwordHasher;
    this.userRepository = userRepository;
  }

  registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const existingUser = await this.userRepository.findByUsernameOrEmail(username, email);
      if (existingUser) {
        return res.status(400).json({ message: "Nombre de usuario o correo electrónico ya registrado" });
      }

      const hashedPassword = await this.passwordHasher.hash(password);

      const newUser = {
        username,
        email,
        password: hashedPassword,
      };

      await this.userRepository.save(newUser);
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  };

  loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Buscar el usuario por nombre de usuario o correo electrónico
      const user = await User.findOne({ $or: [{ username }, { email: username }] });
  
      if (!user) {
        return res.status(401).json({ message: "Nombre de usuario o contraseña incorrectos" });
      }
  
      const passwordMatch = await comparePasswords(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: "Nombre de usuario o contraseña incorrectos" });
      }
  
      // Generar y devolver un token de autenticación (por ejemplo, JWT)
      // Aquí se debe utilizar una biblioteca de manejo de tokens como jsonwebtoken
  
      const token = generateAuthToken(user._id); // Función que genera el token de autenticación
  
      res.status(200).json({ token });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  };

  getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      res.json(user);
    }
    
    catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Error en el servidor" });
    }
  };

  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      res.json(user);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Error en el servidor" });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      // También se pueden eliminar los mensajes asociados al usuario si es necesario
      // Ejemplo: await Message.deleteMany({ $or: [{ sender: id }, { receiver: id }] });
  
      res.json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Error en el servidor" });
    }
  };

  
}
