import { Router } from "express";
import { isGuest } from "../middlewares/auth.middleware.js";
import { renderPublicacion } from "../controllers/publicacion.controller.js";
import { buscarContenido } from "../controllers/busqueda.controller.js";
import { renderPerfilUsuario } from "../controllers/usuario.controller.js";

const landing = Router();

landing.get("/", isGuest, (req, res) => {
  res.render("landing/index", {
    title: "Fotaza",
  });
});

//Rutas Publicas
landing.get("/publicaciones/:id", renderPublicacion);
landing.get("/buscar", buscarContenido);
landing.get("/perfil/:id", renderPerfilUsuario);

export default landing;
