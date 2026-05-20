import bcrypt from "bcrypt";
import { Usuario } from "../models/usuario.js";

export async function registroUsuario(req, res) {
  try {
    const body = req.body;
    const validarusuarioname = await Usuario.findOne({
      where: { usuarioname: body.usuarioname },
    });
    const validarEmail = await Usuario.findOne({
      where: { email: body.email },
    });

    if (validarEmail || validarusuarioname) {
      return res.redirect("/register");
    }

    const passwordHash = await bcrypt.hash(body.password, 10);

    await Usuario.create({
      name: body.name,
      lastName: body.lastName,
      usuarioname: body.usuarioname,
      email: body.email,
      password: passwordHash,
    });

    return res.redirect("/login");
  } catch (error) {
    console.error("Error al registrar usuario");
    res.send("Error al registrar usuario");
  }
}

export async function inicioSesion(req, res) {
  try {
    const body = req.body;
    const usuario = await Usuario.findOne({ where: { email: body.email } });

    if (usuario) {
      const validPassword = await bcrypt.compare(
        body.password,
        usuario.password,
      );

      if (validPassword) {
        req.session.usuario = {
          id: user.id,
          username: user.username,
          rol: user.rol,
        };

        return res.redirect("/home");
      } else {
        console.error("Contraseña incorrecta!");
        res.redirect("/login");
      }
    } else {
      console.error("El usuario non existe!");
      res.redirect("/login");
    }
  } catch (error) {
    console.error("Error al iniciar sesion");
    res.send("Error al iniciar sesion");
  }
}
