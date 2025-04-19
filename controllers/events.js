const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {

  const eventos = await Evento.find()
                              .populate('user', 'name');
  res.json({
    ok: true,
    eventos: eventos
  });
}

const crearEvento = async (req, res = response) => {

  const evento = new Evento(req.body);
  try {

    evento.user = req.uid;

    const eventoGuardado = await evento.save();
    res.json({
      ok: true,
      message: 'Evento creado',
      evento: eventoGuardado
    });
  } catch (err) {
    console.log(err);
    res.json({
      ok: false,
      message: 'Error al crear el evento'
    });
  }
}

const actualizarEvento = async (req, res = response) => {

  const eventoId = req.params.id;
  const uid  = req.uid;

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      res.status(404).json({
        ok: false,
        message: 'El evento no existe'
      });
      return;
    }
    console.log(evento.user.toString());
    console.log(uid);
    if (evento.user.toString() !== uid) {
      res.status(401).json({
        ok: false,
        message: 'No tienes permisos para editar este evento'
      });
      return;
    }

    const nuevoEvento = {
      ...req.body,
      user: uid
    }

    const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true} );

    res.json({
      ok: true,
      message: 'Evento actualizado',
      evento: eventoActualizado
    });

    const eventoGuardado = await evento.save();
    res.json({
      ok: true,
      message: 'Evento actualizado',
      evento: eventoGuardado
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: 'Error al actualizar el evento'
    });
  }

}

const eliminarEvento = async (req, res = response) => {

  const eventoId = req.params.id;
  const uid  = req.uid;

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      res.status(404).json({
        ok: false,
        message: 'El evento no existe'
      });
      return;
    }
    console.log(evento.user.toString());
    console.log(uid);
    if (evento.user.toString() !== uid) {
      res.status(401).json({
        ok: false,
        message: 'No tienes permisos para borrar este evento'
      });
      return;
    }

    const eventoBorrado = await Evento.findByIdAndDelete(eventoId);

    res.json({
      ok: true,
      message: 'Evento borrado',
      evento: eventoBorrado
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: 'No se pudo borrar el evento'
    });
  }


 
}

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento
}