/**
 * Módulo de autenticación y gestión de usuarios en una red social.
 * @module userAuthHandlers
 */

import bcrypt from "bcrypt"; // Library for password hashing
import User from "../models/User.js";

/**
 * Función auxiliar para hashear la contraseña.
 * @function hashPassword
 * @async
 * @param {string} password - Contraseña en texto plano.
 * @returns {string} - Contraseña hasheada.
 */
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

/**
 * Función auxiliar para comparar contraseñas hasheadas.
 * @function comparePasswords
 * @async
 * @param {string} password - Contraseña en texto plano.
 * @param {string} hashedPassword - Contraseña hasheada.
 * @returns {boolean} - Devuelve true si las contraseñas coinciden, de lo contrario, devuelve false.
 */
const comparePasswords = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

/**
 * Registra un nuevo usuario en la base de datos.
 * @function registerUser
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Devuelve el usuario registrado en formato JSON con el código de estado 201 (CREATED).
 * @throws {Error} - Si ocurre algún error en el servidor.
 */
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar si el usuario o el correo ya están registrados
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Nombre de usuario o correo electrónico ya registrado" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Inicia sesión del usuario y devuelve un token de autenticación.
 * @function loginUser
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Devuelve un objeto con el token de autenticación en formato JSON con el código de estado 200 (OK).
 * @throws {Error} - Si el nombre de usuario o la contraseña son incorrectos.
 * @throws {Error} - Si ocurre algún error en el servidor.
 */
export const loginUser = async (req, res) => {
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

/**
 * Obtiene información de un usuario específico por su ID.
 * @function getUser
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Devuelve los datos del usuario en formato JSON.
 * @throws {Error} - Si el usuario no se encuentra, devuelve un mensaje de error en formato JSON con el código de estado 404 (NOT FOUND).
 * @throws {Error} - Si ocurre algún error en el servidor.
 */
export const getUser = async (req, res) => {
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

/**
 * Actualiza información de un usuario específico por su ID.
 * @function updateUser
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Devuelve los datos actualizados del usuario en formato JSON.
 * @throws {Error} - Si el usuario no se encuentra, devuelve un mensaje de error en formato JSON con el código de estado 404 (NOT FOUND).
 * @throws {Error} - Si ocurre algún error en el servidor.
 */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

/**
 * Elimina un usuario específico por su ID de la base de datos.
 * @function deleteUser
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Devuelve un mensaje de éxito en formato JSON con el código de estado 200 (OK) si el usuario se elimina correctamente.
 * @throws {Error} - Si el usuario no se encuentra, devuelve un mensaje de error en formato JSON con el código de estado 404 (NOT FOUND).
 * @throws {Error} - Si ocurre algún error en el servidor.
 */
export const deleteUser = async (req, res) => {
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

/**
 * Obtiene todos los mensajes de chat disponibles.
 * @function getChats
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Devuelve una lista de mensajes de chat en formato JSON.
 * @throws {Error} - Si ocurre algún error en el servidor.
 */
