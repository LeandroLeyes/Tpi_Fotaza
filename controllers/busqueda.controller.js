import { Op } from "sequelize";

import { Usuario } from "../models/usuario.js";
import { Etiqueta } from "../models/etiqueta.js";
import { Publicacion } from "../models/publicacion.js";
import { Imagen } from "../models/imagen.js";
import { Comentario } from "../models/comentario.js";
import { Valoracion } from "../models/valoracion.js";
import { Rol } from "../models/rol.js";
import { UsuariosRoles } from "../models/usuariosRoles.js";
import blobABase64 from "../helpers/blobAbase64.js";

export async function buscarContenido(req, res) {
  try {
    const termino = req.query.q?.trim();
    const filtro = req.query.filtro || "todo";

    if (!termino) {
      if (req.session && req.session.usuario) {
        return res.redirect("/usuario/home");
      }

      return res.render("landing/index", {
        title: "Fotaza",
      });
    }

    const haySesion = !!(req.session && req.session.usuario);

    const rolUsuarioComun = await Rol.findOne({ where: { nombre: "usuario" } });

    let usuariosIdsValidos = [];
    if (rolUsuarioComun) {
      const relaciones = await UsuariosRoles.findAll({
        where: { idRol: rolUsuarioComun.id },
        attributes: ["idUsuario"],
      });
      usuariosIdsValidos = relaciones.map((r) => r.idUsuario);
    }

    const usuarios = await Usuario.findAll({
      where: {
        id: { [Op.in]: usuariosIdsValidos },
        username: {
          [Op.iLike]: `%${termino}%`,
        },
      },
    });

    const etiquetas = await Etiqueta.findAll({
      where: {
        nombre: {
          [Op.iLike]: `%${termino}%`,
        },
      },
    });

    const publicacionesDB = await Publicacion.findAll({
      include: [
        Usuario,
        Etiqueta,
        {
          model: Imagen,
          as: "imagenes",
          include: [Comentario, Valoracion],
        },
      ],

      where: {
        [Op.or]: [
          {
            titulo: {
              [Op.iLike]: `%${termino}%`,
            },
          },

          {
            "$Etiqueta.nombre$": {
              [Op.iLike]: `%${termino}%`,
            },
          },

          {
            "$Usuario.username$": {
              [Op.iLike]: `%${termino}%`,
            },
          },
        ],
      },

      distinct: true,
    });

    const publicaciones = publicacionesDB
      .map((publicacion) => {
        const pub = publicacion.toJSON();

        let imagenes = pub.imagenes || [];
        if (!haySesion) {
          imagenes = imagenes.filter((img) => !img.copyright);
        }

        const imagen = imagenes[0];

        const promedioValoraciones =
          imagen?.Valoracions?.length > 0
            ? (
                imagen.Valoracions.reduce(
                  (total, valoracion) => total + valoracion.puntaje,
                  0,
                ) / imagen.Valoracions.length
              ).toFixed(1)
            : 0;

        const cantidadComentarios = imagen?.Comentarios?.length || 0;

        return {
          ...pub,
          imagenes,
          imagenBase64: imagen ? blobABase64(imagen.url) : null,
          promedioValoraciones,
          cantidadComentarios,
        };
      })
      .filter((pub) => haySesion || pub.imagenes.length > 0);

    usuarios.forEach((usuario) => {
      usuario.avatar = blobABase64(usuario.avatar);
    });

    const sinResultados =
      usuarios.length === 0 &&
      etiquetas.length === 0 &&
      publicaciones.length === 0;

    res.render("usuario/busqueda", {
      title: `Resultados para ${termino}`,
      termino,
      filtro,
      usuarios,
      etiquetas,
      publicaciones,
      sinResultados,
    });
  } catch (error) {
    console.error(error);
    res.send("Error al realizar búsqueda");
  }
}
