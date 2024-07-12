import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import Footer from "../components/Footer";
import { ClienteContext } from "../contexts/ClienteContext";

function HomeScreen({ navigation }) {  

  const { nombre, setNombre, telefono, setTelefono, email, setEmail } = useContext(ClienteContext);

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (nombre.length <= 5) {
      Alert.alert("Error", "El nombre debe tener más de 5 letras");
      return false;
    }

    if (!/^\d+$/.test(telefono)) {
      Alert.alert("Error", "El teléfono debe contener solo números");
      return false;
    }

    if (!emailRegex.test(email)) {
      Alert.alert("Error", "El email no es válido");
      return false;
    }
    //console.log(nombre, telefono, email)
    return true;
  };

  const handlePress = () => {
    if (validateInputs()) {
      navigation.navigate("Registro");
    }
  };

  return (
    <View style={styles.principal}>
      <View style={styles.contenedor}>
        <View style={styles.txtHeader}>
          <Text style={styles.txtFormulario}>Cliente</Text>
        </View>

        <View style={styles.clienteProducto}>
          <View style={styles.cliente}>            
            <Text style={styles.txtPaso}>1</Text>            
            <Text style={styles.txtClienteProducto}>Cliente</Text>
          </View> 
          <Text style={styles.paso}> {">"} </Text>
          <View style={styles.producto}>
            <Text style={styles.txtPaso2}>2</Text>   
            <Text style={styles.txtClienteProducto}>Producto</Text>
          </View>
        </View>

        <View style={styles.divisor} />

        <View style={styles.datos}>
          <View style={styles.nombre}>
            <Text style={styles.txtNombre}>Nombre</Text>
            <TextInput
              style={styles.inputNombre}
              placeholder="Digite el nombre completo"
              value={nombre}
              onChangeText={setNombre}
              autoCompleteType="off"
              autoCorrect={false}
              textContentType="none"
            />
          </View>

          <View style={styles.nombre}>
            <Text style={styles.txtNombre}>Teléfono</Text>
            <TextInput
              style={styles.inputNombre}
              placeholder="Digite el número de teléfono"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="numeric"
              autoCompleteType="off"
              autoCorrect={false}
              textContentType="none"
            />
          </View>

          <View style={styles.nombre}>
            <Text style={styles.txtNombre}>E-mail</Text>
            <TextInput
              style={styles.inputNombre}
              placeholder="Digite el correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.boton}>
            <TouchableOpacity
              style={styles.btnContinuar}
              onPress={handlePress}
            >
              <Text style={styles.txtBtnContinuar}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Footer navigation={navigation} />
    </View>
  );
}

const styles = {
  principal: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    backgroundColor: "white",
  },
  contenedor: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "auto",
    padding: 0,
    borderRadius: 5,
    margin: 10,
  },
  txtHeader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    padding: 20,
  },
  txtFormulario: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 30,
  },
  clienteProducto: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",    
    alignItems: "center",
    paddingHorizontal: 30,
  },
  cliente: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    margin: "auto",
    
  },
  producto: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  paso: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  txtPaso: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#FF3B30",
    padding: 10,    
    width: 35,
    height: 35,
    borderRadius: 20,    
  },
  txtPaso2: {
    fontSize: 12,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#E1E1E6",
    padding: 10,
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  txtClienteProducto: {
    fontSize: 18,
    color: "#000",
    fontWeight: "500",
  },
  divisor: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: "90%",
    margin: "auto",
    marginVertical: 20,
  },
  datos: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    padding: 20,    
    gap: 12,    
  },

  nombre: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "start",
    width: "100%",
  },

  txtNombre: {
    fontSize: 16,
    color: "#000",    
    fontWeight: "400",    
  },
  inputNombre: {
    height: 45,
    width: "100%",
    marginVertical: 5,
    paddingHorizontal: 10,    
    fontSize: 14,
    color: "black",
    backgroundColor: "white",
    borderColor: "#E1E1E6",
    borderWidth: 1,
    borderRadius: 2,
  },

  boton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 50,
  },
  btnContinuar: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    width: "45%",
  },
  txtBtnContinuar: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
};

export default HomeScreen;
