import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert, TextInput } from "react-native";
import Footer from "../components/Footer";
import { link } from "../components/link";

function OrdenBodega({ route, navigation }) {
  const { servicio } = route.params;

  const [modoEdicion, setModoEdicion] = useState(false); // Estado para controlar el modo de edición
  const [nombre, setNombre] = useState(servicio.nombre || "Nombre no disponible");
  const [telefono, setTelefono] = useState(servicio.telefono || "Teléfono no disponible");
  const [email, setEmail] = useState(servicio.email || "Email no disponible");
  const [equipo, setEquipo] = useState(servicio.equipo);
  const [marca, setMarca] = useState(servicio.marca || "Marca no disponible");
  const [noSerie, setNoSerie] = useState(servicio.numeroSerie);
  const [servicioDescripcion, setServicioDescripcion] = useState(servicio.servicio || "Servicio no disponible");
  const [status, setStatus] = useState(servicio.estatus || "Activo");

  const handleEditPress = () => {
    setModoEdicion(true); // Cambia al modo de edición
  };

  const handleSavePress = async () => {
    try {
      const response = await fetch(`${link}/serviciosActualizar/${servicio.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          telefono,
          email,
          equipo,
          marca,
          numeroSerie: noSerie,
          servicio: servicioDescripcion,
          estatus: status
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert("Cambios guardados exitosamente");
        setModoEdicion(false); // Cambia al modo de visualización después de guardar
      } else {
        console.error("Error en la respuesta del servidor:", data); // Imprime la respuesta del servidor
        throw new Error(data.error || "Error al guardar los cambios");
      }
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      Alert.alert("Error", "Error al guardar los cambios");
    }
  };
  
  

  const handleEntrega = () => {
    Alert.alert(
      "Confirmación",
      "¿Seguro que desea entregar el producto?",
      [
        {
          text: "No",
          onPress: () => Alert.alert("Operación cancelada"),
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: async () => {
            try {
              const response = await fetch(`${link}/servicios/${servicio.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ nuevoEstatus: "Entregado", nuevoEspacio: " " }),
              });
              const data = await response.json();
              if (response.ok) {
                Alert.alert("Entrega exitosa");
                setStatus("Entregado"); // Actualiza el estado localmente después de la entrega                
              } else {
                throw new Error(data.error || "Error al entregar el servicio");
              }
            } catch (error) {
              console.error("Error al entregar el servicio:", error);
              Alert.alert("Error", "Error al entregar el servicio");
            }
          },
        },
      ]
    );
  };
  
  const handleCancelar = () => {
    Alert.alert(
      "Confirmación",
      "¿Seguro que desea cancelar el servicio?",
      [
        {
          text: "No",
          onPress: () => Alert.alert("Operación cancelada"),
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: async () => {
            try {
              const response = await fetch(`${link}/servicios/${servicio.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ nuevoEstatus: "Cancelado", nuevoEspacio: " "}),
              });
              const data = await response.json();
              if (response.ok) {
                Alert.alert("Servicio cancelado");
                setStatus("Cancelado"); // Actualiza el estado localmente después de la cancelación
              } else {
                throw new Error(data.error || "Error al cancelar el servicio");
              }
            } catch (error) {
              console.error("Error al cancelar el servicio:", error);
              Alert.alert("Error", "Error al cancelar el servicio");
            }
          },
        },
      ]
    );
  };

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
            {modoEdicion ? (
              <TouchableOpacity style={styles.btnEditar} onPress={handleSavePress}>
                <Image source={require("../assets/save.png")} style={styles.imagen} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.btnEditar} onPress={handleEditPress}>
                <Image source={require("../assets/lapiz.png")} style={styles.imagen} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.datos}>
            <View style={styles.dato}>
              {modoEdicion ? (
                <TextInput
                  style={styles.txtInput}
                  value={nombre}
                  onChangeText={setNombre}
                  placeholder="Nombre"
                />
              ) : (
                <Text style={styles.txtDato}>Nombre: {nombre}</Text>
              )}
            </View>

            <View style={styles.dato}>
              {modoEdicion ? (
                <TextInput
                  style={styles.txtInput}
                  value={telefono}
                  onChangeText={setTelefono}
                  placeholder="Teléfono"
                />
              ) : (
                <Text style={styles.txtDato}>Teléfono: {telefono}</Text>
              )}
            </View>

            <View style={styles.dato}>
              {modoEdicion ? (
                <TextInput
                  style={styles.txtInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                />
              ) : (
                <Text style={styles.txtDato}>Email: {email}</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.cliente}>
          <View style={styles.editarCliente}>
            <Text style={styles.headerText}>Equipo</Text>
            {modoEdicion ? (
              <TouchableOpacity style={styles.btnEditar} onPress={handleSavePress}>
                <Image source={require("../assets/save.png")} style={styles.imagen} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.btnEditar} onPress={handleEditPress}>
                <Image source={require("../assets/lapiz.png")} style={styles.imagen} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.datos}>
            <View style={styles.dato}>
              {modoEdicion ? (
                <TextInput
                  style={styles.txtInput}
                  value={equipo}
                  onChangeText={setEquipo}
                  placeholder="Tipo de equipo"
                />
              ) : (
                <Text style={styles.txtDato}>Tipo: {equipo}</Text>
              )}
            </View>

            <View style={styles.dato}>
              {modoEdicion ? (
                <TextInput
                  style={styles.txtInput}
                  value={marca}
                  onChangeText={setMarca}
                  placeholder="Marca"
                />
              ) : (
                <Text style={styles.txtDato}>Marca: {marca}</Text>
              )}
            </View>

            <View style={styles.dato}>
              {modoEdicion ? (
                <TextInput
                  style={styles.txtInput}
                  value={noSerie}
                  onChangeText={setNoSerie}
                  placeholder="Número de serie"
                />
              ) : (
                <Text style={styles.txtDato}>No.Serie: {noSerie}</Text>
              )}
            </View>

            <View style={styles.dato}>
              {modoEdicion ? (
                <TextInput
                  style={styles.txtInput}
                  value={servicioDescripcion}
                  onChangeText={setServicioDescripcion}
                  placeholder="Descripción del servicio"
                />
              ) : (
                <Text style={styles.txtDato}>Servicio: {servicioDescripcion}</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.botones}>
          <TouchableOpacity style={styles.btnCancelar} onPress={handleCancelar}>
            <Text style={styles.txtBoton}>Cancelar Servicio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnEntregar} onPress={handleEntrega}>
            <Text style={styles.txtBoton}>Entregar</Text>
          </TouchableOpacity>
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
  txtInput: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
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
  imagen: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
});

export default OrdenBodega;
