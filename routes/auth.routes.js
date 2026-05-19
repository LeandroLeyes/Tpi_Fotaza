import { Router } from "express";

const auth = Router();
auth.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Login",
  });
});

auth.post("/login", (req, res) => {
  // TODO: Aquí iría la lógica de autenticación

  // si esta todo ok => luego de redirecciona al home
  res.redirect("/home");
});

auth.get("/register", (req, res) => {
  res.render("auth/register", {
    title: "Registro",
  });
});

auth.post("/register", (req, res) => {
  // TODO: Aquí iría la lógica de registro de usuario

  // si esta todo ok => luego de redirecciona al home
  res.redirect("/home");
});

export default auth;
