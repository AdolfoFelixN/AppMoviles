import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { link } from "../components/link";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${link}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert('Login exitoso');
        navigation.navigate('Inicio'); // Navegar a la pantalla de inicio después de un login exitoso
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Error al conectar con el servidor');
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/logoLogin.png")} style={styles.imagen} />
        </View>
        <Text style={styles.headerText}>Login</Text>
        <Text style={styles.txtUsuarioContrasena}>Ingresa tu usuario y contraseña</Text>
      </View>

      <View style={styles.correo}>
        <TextInput
          style={styles.inputCorreo}
          value={correo}
          onChangeText={setCorreo}
          placeholder="Usuario"
        />
      </View>

      <View style={styles.contrasena}>
        <TextInput
          style={styles.inputContrasena}
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry={true}
          placeholder="Contraseña"
        />
      </View>

      <View style={styles.botones}>
        <TouchableOpacity style={styles.btnIniciarSesion} onPress={handleLogin}>
          <Text style={styles.txtBtnIniciarSesion}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",    
    height: "100%",
    backgroundColor: "#fff",    
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 70,
    marginBottom: 20,    
  },
  imageContainer: {
    display: "flex",    
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    marginBottom: 10,
    width: "100%",
    height: 100,    
  },
  imagen: {
    width: "100%",
    height: "100%", 
  },
  headerText: {
    fontSize: 30,    
    marginVertical: 20,    
    color: "#454B60",
  },
  txtUsuarioContrasena: {
    fontSize: 16,
    color: "#454B60",
    marginTop: 20,
    marginBottom: 20,
  },
  correo: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    marginBottom: 10,
  },
  inputCorreo: {
    height: 45,
    marginVertical: 5,
    marginHorizontal: 12,
    padding: 10,
    fontSize: 16,
    color: "black",
    backgroundColor: "white",    
    borderColor: "#454B60",
    borderWidth: 1,
    borderRadius: 10,
  },
  contrasena: {
    display: "flex",
    flexDirection: "column",    
    marginTop: 15,
    marginBottom: 0,
  },
  inputContrasena: {
    height: 45,
    marginVertical: 5,
    marginHorizontal: 12,
    padding: 10,
    fontSize: 16,
    color: "black",
    backgroundColor: "white",
    borderColor: "#454B60",
    borderWidth: 1,
    borderRadius: 10,
  },
  botones: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
  },
  btnIniciarSesion: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,    
    width: "35%",
  },
  txtBtnIniciarSesion: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
};

export default LoginScreen;
