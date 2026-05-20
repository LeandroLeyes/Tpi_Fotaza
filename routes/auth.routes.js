import { Router } from "express";
import {
  registroUsuario,
  inicioSesion,
} from "../controllers/auth.controller.js";

const auth = Router();
auth.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Login",
  });
});

auth.post("/login", inicioSesion);

auth.get("/register", (req, res) => {
  res.render("auth/register", {
    title: "Registro",
  });
});

auth.post("/register", registroUsuario);

export default auth;
