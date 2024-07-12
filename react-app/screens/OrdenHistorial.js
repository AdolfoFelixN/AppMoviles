import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import Footer from "../components/Footer";
import { link } from "../components/link";

function OrdenHistorial({ route, navigation }) {
  const { servicio } = route.params;

  const [nombre, setNombre] = useState(servicio.nombre || "Nombre no disponible");
  const [telefono, setTelefono] = useState(servicio.telefono || "Teléfono no disponible");
  const [email, setEmail] = useState(servicio.email || "Email no disponible");
  const [equipo, setEquipo] = useState(servicio.equipo);
  const [marca, setMarca] = useState(servicio.marca || "Marca no disponible");
  const [noSerie, setNoSerie] = useState(servicio.numeroSerie);
  const [servicioDescripcion, setServicioDescripcion] = useState(servicio.servicio || "Servicio no disponible");
  const [status, setStatus] = useState(servicio.estatus || "Activo");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{noSerie}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.header}>
          <Text style={styles.headerText}>Estatus:</Text>
          <Text style={[styles.estatus, getStatusStyle(status)]}>{status}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.cliente}>
          <View style={styles.editarCliente}>
            <Text style={styles.headerText}>Cliente</Text>            
          </View>

          <View style={styles.datos}>
            <View style={styles.dato}>
              <Text style={styles.txtDato}>Nombre: {nombre}</Text>
            </View>

            <View style={styles.dato}>
              <Text style={styles.txtDato}>Teléfono: {telefono}</Text>
            </View>

            <View style={styles.dato}>
              <Text style={styles.txtDato}>Email: {email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.cliente}>
          <View style={styles.editarCliente}>
            <Text style={styles.headerText}>Equipo</Text>            
          </View>

          <View style={styles.datos}>
            <View style={styles.dato}>
              <Text style={styles.txtDato}>Tipo: {equipo}</Text>
            </View>

            <View style={styles.dato}>
              <Text style={styles.txtDato}>Marca: {marca}</Text>
            </View>

            <View style={styles.dato}>
              <Text style={styles.txtDato}>No.Serie: {noSerie}</Text>
            </View>

            <View style={styles.dato}>
              <Text style={styles.txtDato}>Servicio: {servicioDescripcion}</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Footer al final de la pantalla */}
      <Footer navigation={navigation} />
    </View>
  );
}

const getStatusStyle = (status) => {
  switch (status) {
    case "Activo":
      return { color: "#3498DB", fontWeight: "bold" }; // Azul
    case "Entregado":
      return { color: "#23A55A", fontWeight: "bold" }; // Verde
    case "Cancelado":
      return { color: "#F23F43", fontWeight: "bold" }; // Rojo
    default:
      return { color: "#000", fontWeight: "bold" }; // Negro por defecto
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  estatus: {
    fontSize: 24,
    fontWeight: "bold",
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: "100%",
    alignSelf: "center",
    marginVertical: 20,
  },

  editarCliente: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  btnEditar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
  },

  datos: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  dato: {
    marginVertical: 3,
    paddingVertical: 5,
  },
  txtDato: {
    fontSize: 18,
  },

  imagen: {
    width: 22,
    height: 22,
    marginRight: 10,
  },

  botones: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnCancelar: {
    backgroundColor: "#F23F43",
    paddingVertical: 12,
    borderRadius: 5,    
    width: "48%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnEntregar: {
    backgroundColor: "#23A55A",
    paddingVertical: 12,
    borderRadius: 5,    
    width: "48%",
    height: 56,        
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  txtBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",    
  },

});

export default OrdenHistorial;
