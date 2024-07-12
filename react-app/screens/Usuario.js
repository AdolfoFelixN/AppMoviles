import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import Footer from "../components/Footer";
import { link } from "../components/link";

function Usuario({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const buttonAlert = () => {
    Alert.alert("Registro Exitoso", "Nuevo usuario registrado con éxito");
  };

  const handleRegistrar = async () => {
    try {
      const response = await fetch(`${link}/usuariosRegistro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, contrasena }),
      });
      const data = await response.json();
      if (response.ok) {
        buttonAlert();
        setUsuario("");
        setContrasena("");
      } else {
        throw new Error(data.error || "Error en el registro de usuario");
      }
    } catch (error) {
      console.error("Error en el registro de usuario:", error);
      Alert.alert("Error", "Error en el registro de usuario");
    }
  };

  const handleRackPress = (item) => {
    navigation.navigate("RacksScreen");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerOptions}>
          <TouchableOpacity
            style={styles.btnHeader}
            onPress={() => console.log("Pressed!")}
          >
            <Image
              source={require("../assets/nuevoUsuario.png")}
              style={styles.imagenHeader}
            />
            <Text style={styles.txtUsuario}>Usuario</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnHeader}
            onPress={handleRackPress}
          >
            <Image
              source={require("../assets/contenedor.png")}
              style={styles.imagenHeader}
            />
            <Text style={styles.headerText}>Racks</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.contenedorDatos}>
          <View style={styles.datos}>
            <Text style={styles.txtDato}>Usuario:</Text>
            <TextInput
              style={styles.inputContrasena}
              value={usuario}
              onChangeText={setUsuario}
              placeholder="Ingrese el nombre de usuario"
            />
          </View>
          <View style={styles.datos}>
            <Text style={styles.txtDato}>Contraseña:</Text>
            <TextInput
              style={styles.inputContrasena}
              value={contrasena}
              onChangeText={setContrasena}
              secureTextEntry={true}
              placeholder="Ingrese la contraseña"
            />
          </View>
        </View>

        <View style={styles.btnRegistrar}>
          <TouchableOpacity style={styles.btnIniciarSesion} onPress={handleRegistrar}>
            <Text style={styles.txtBtnIniciarSesion}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    padding: 20,
  },
  headerOptions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  btnHeader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
  },
  imagenHeader: {
    width: 24,
    height: 24,
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
    color: "#454B60",
  },
  txtUsuario: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF3B30",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: "100%",
    alignSelf: "center",
    marginVertical: 20,
  },
  contenedorDatos: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    marginTop: 20,
    gap: 20,
  },
  datos: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
    width: "100%",
  },
  txtDato: {
    fontSize: 16,
    color: "#323238",
  },
  inputContrasena: {
    height: 45,
    padding: 10,
    fontSize: 16,
    color: "black",
    backgroundColor: "white",
    borderColor: "#E1E1E6",
    borderWidth: 1,
    borderRadius: 2,
  },
  btnRegistrar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 20,
  },
  btnIniciarSesion: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
    width: "35%",
    height: 50,
  },
  txtBtnIniciarSesion: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    margin: "auto",
  },
});

export default Usuario;
