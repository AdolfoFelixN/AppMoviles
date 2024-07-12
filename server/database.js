import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conexión a la base de datos establecida");
    connection.release(); // Liberar la conexión
  }
});

export async function getUsuarioPorCredenciales(usuario, contrasena) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?", [usuario, contrasena]);
    return rows;
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function registrarServicio(nombre, telefono, email, equipo, marca, numeroSerie, servicio, espacioBodega, estatus) {
  const connection = await pool.getConnection();
  try {
    await connection.query(
      "INSERT INTO servicios (nombre, telefono, email, equipo, marca, numeroSerie, servicio, espacioBodega, estatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [nombre, telefono, email, equipo, marca, numeroSerie, servicio, espacioBodega, estatus]
    );

    return { nombre, telefono, email, equipo, marca, numeroSerie, servicio, espacioBodega, estatus };
  } catch (error) {
    console.error("Error al registrar servicio:", error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function obtenerServicios() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM servicios");
    return rows;
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function actualizarEstadoServicio(id, nuevoEstatus) {
  const connection = await pool.getConnection();
  try {
    await connection.query(
      'UPDATE servicios SET estatus = ? WHERE id = ?',
      [nuevoEstatus, id]
    );
    connection.release();
    return { success: true, message: 'Estado actualizado correctamente' };
  } catch (error) {
    console.error('Error al actualizar el estado:', error);
    return { success: false, message: 'Error al actualizar el estado' };
  }
}

/*
export async function obtenerSaldoPorId(userId) {
  const connection = await pool.getConnection(); // Obtener una conexión
  try {
    const [rows] = await connection.query(
      "SELECT saldo FROM usuarios WHERE id = ?",
      [userId]
    ); // Ejecutar la consulta con el ID del usuario
    if (rows.length === 0) {
      throw new Error("Usuario no encontrado");
    }
    return rows[0].saldo; // Devolver el saldo del usuario encontrado
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    throw error; // Lanzar el error para que pueda ser manejado por el servidor
  } finally {
    connection.release(); // Liberar la conexión
  }
}

export async function restarSaldoPorId(userId, cantidad, nombreDestino, motivo) {
  const connection = await pool.getConnection(); // Obtener una conexión
  try {
    const [saldoRow] = await connection.query(
      "SELECT saldo FROM usuarios WHERE id = ?",
      [userId]
    );
    if (saldoRow.length === 0) {
      throw new Error("Usuario no encontrado");
    }
    const saldoActual = saldoRow[0].saldo;

    if (saldoActual < cantidad) {
      throw new Error("Saldo insuficiente");
    }
    const nuevoSaldo = saldoActual - cantidad;

    await connection.query("UPDATE usuarios SET saldo = ? WHERE id = ?", [
      nuevoSaldo,
      userId,
    ]);
    await connection.query(
      "INSERT INTO movimientos (idUsuario, monto, tipo, nombreDestino, motivo) VALUES (?, ?, ?, ?, ?)",
      [userId, cantidad, "Retiro", nombreDestino, motivo]
    );

    return nuevoSaldo; // Devolver el nuevo saldo del usuario
  } catch (error) {
    console.error("Error al restar saldo:", error);
    throw error; // Lanzar el error para que pueda ser manejado por el servidor
  } finally {
    connection.release(); // Liberar la conexión
  }
}


export async function aumentarSaldo(numeroCuenta, cantidad, idUsuario, destinatario, motivo) {
  const connection = await pool.getConnection();
  try {
    // Obtener el saldo actual y el id del destinatario usando el número de cuenta
    const [destinatarioRow] = await connection.query(
      "SELECT saldo, id FROM usuarios WHERE nombre = ?",
      [destinatario]
    );
    if (destinatarioRow.length === 0) {
      throw new Error("Destinatario no encontrado");
    }
    const saldoActualDestinatario = destinatarioRow[0].saldo;
    const idDestinatario = destinatarioRow[0].id;    
    //const idDestinatario = 2;
    const nuevoSaldoDestinatario = saldoActualDestinatario + cantidad;

    // Actualizar el saldo del destinatario
    await connection.query("UPDATE usuarios SET saldo = ? WHERE nombre = ?", [
      nuevoSaldoDestinatario,
      destinatario,
    ]);

    // Registrar el movimiento como "Ingreso" para el destinatario
    await connection.query(
      "INSERT INTO movimientos (idUsuario, monto, tipo, nombreDestino, motivo) VALUES (?, ?, ?, ?, ?)",
      [idDestinatario, cantidad, "Ingreso", destinatario, motivo]
    );

    // Registrar el movimiento como "Retiro" para el usuario que realiza la transferencia
    await connection.query(
      "INSERT INTO movimientos (idUsuario, monto, tipo, nombreDestino, motivo) VALUES (?, ?, ?, ?, ?)",
      [idUsuario, cantidad, "Retiro", destinatario, motivo]
    );

    return nuevoSaldoDestinatario;
  } catch (error) {
    console.error("Error al aumentar saldo:", error);
    throw error;
  } finally {
    connection.release();
  }
}




export async function restarSaldo(id, cantidad) {
  const connection = await pool.getConnection();
  try {
    const [saldoRow] = await connection.query(
      "SELECT saldo FROM usuarios WHERE id = ?",
      [id]
    );
    if (saldoRow.length === 0) {
      throw new Error("Usuario no encontrado");
    }
    const saldoActual = saldoRow[0].saldo;

    if (saldoActual < cantidad) {
      throw new Error("Saldo insuficiente");
    }

    const nuevoSaldo = saldoActual - cantidad;

    await connection.query("UPDATE usuarios SET saldo = ? WHERE id = ?", [
      nuevoSaldo,
      id,
    ]);

    return nuevoSaldo;
  } catch (error) {
    console.error("Error al restar saldo:", error);
    throw error;
  } finally {
    connection.release();
  }
}
*/