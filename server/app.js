import express from 'express';
import { getUsuarioPorCredenciales, registrarServicio, obtenerServicios, actualizarEstadoServicio } from './database.js';
import cors from 'cors';

const corsOptions = {
  origin: 'http://127.0.0.1:3000',
  methods: ['GET', 'POST'],
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions)); //si no funciona quitar el 'corsOptions' dentro del parentesís

app.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const usuario = await getUsuarioPorCredenciales(correo, contrasena);
    if (usuario.length > 0) {
      res.json({ success: true, usuario: usuario[0] });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al validar usuario:', error);
    res.status(500).json({ error: 'Error al validar usuario' });
  }
});

app.post('/registrar-servicio', async (req, res) => {
  const { nombre, telefono, email, equipo, marca, numeroSerie, servicio, espacioBodega, estatus } = req.body;

  try {
    const nuevoServicio = await registrarServicio(nombre, telefono, email, equipo, marca, numeroSerie, servicio, espacioBodega, estatus);
    res.status(201).json(nuevoServicio);
  } catch (error) {
    console.error('Error al registrar servicio:', error);
    res.status(500).json({ error: 'Error al registrar servicio' });
  }
});

app.get('/servicios', async (req, res) => {  
  try {
      const servicios = await obtenerServicios();
      res.json(servicios);
  } catch (error) {
      console.error('Error al obtener servicios:', error);
      res.status(500).json({ error: 'Error al obtener servicios' });
  }
});

// Endpoint para actualizar el estado de un servicio
app.put('/servicios/:id', async (req, res) => {
  const { id } = req.params;
  const { nuevoEstatus } = req.body;

  const result = await actualizarEstadoServicio(id, nuevoEstatus);

  if (result.success) {
    res.json({ message: result.message });
  } else {
    res.status(500).json({ error: result.message });
  }
});


/*
app.get('/saldo:id', async (req, res) => {
  console.log('Solicitud recibida en /saldo');
  const userId = req.params.id;
  try {
    const saldo = await obtenerSaldoPorId(userId);
    res.json(saldo);
  } catch (error) {
    console.error('Error al obtener el saldo:', error);
    res.status(500).json({ error: 'Error al obtener saldo' });
  }
});

app.post('/restar-saldo/:id', async (req, res) => {
  const userId = req.params.id;
  const { cantidad, nombreDestino, motivo } = req.body;

  try {
    const nuevoSaldo = await restarSaldoPorId(userId, cantidad, nombreDestino, motivo);
    res.json({ nuevoSaldo });
  } catch (error) {
    console.error('Error al restar saldo:', error);
    res.status(500).json({ error: 'Error al restar saldo' });
  }
});



app.post('/aumentar-saldo/:numeroCuenta', async (req, res) => {
  const numeroCuenta = req.params.numeroCuenta;
  const { cantidad, idUsuario, destinatario, motivo } = req.body;

  try {
    // Restar saldo del usuario activo
    const nuevoSaldoUsuarioActivo = await restarSaldo(idUsuario, cantidad);

    // Aumentar saldo del destinatario
    const nuevoSaldoDestinatario = await aumentarSaldo(numeroCuenta, cantidad, idUsuario, destinatario, motivo);

    res.json({ nuevoSaldoUsuarioActivo, nuevoSaldoDestinatario });
  } catch (error) {
    console.error('Error al transferir saldo:', error);
    res.status(500).json({ error: 'Error al transferir saldo' });
  }
});

*/
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
