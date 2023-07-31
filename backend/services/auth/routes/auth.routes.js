import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userAuth.controllers.js";

const router = Router();

// Rutas relacionadas con la autenticación y gestión de usuarios
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);


export default router;
