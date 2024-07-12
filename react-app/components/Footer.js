import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const Footer = ({ navigation }) => {

  const [active, setActive] = useState(false);
  
  return (
    <View style={styles.seccionBaja}>
      <TouchableOpacity
        style={styles.btnSeccionBaja}
        onPress={() => navigation.navigate("Bodega")}
      >
        <Image source={require("../assets/bodega.png")} style={styles.imagen}/>
        <Text style={styles.txtOpcionBaja}>Bodega</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnSeccionBaja}
        onPress={() => navigation.navigate("Inicio")}
      >
        <Image source={require("../assets/pedido.png")} style={styles.imagen}/>
        <Text style={styles.txtOpcionBaja}>Registro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnSeccionBaja}
        onPress={() => navigation.navigate("Historial")}
      >
        <Image source={require("../assets/historial.png")} style={styles.imagen}/>
        <Text style={styles.txtOpcionBaja}>Historial</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
    seccionBaja: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",        
        width: "100%",                        
        backgroundColor: "#292929",
        height: 50,
        paddingHorizontal: 5,
    },
    btnSeccionBaja: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#87F5FB",
        width: "30%",
        height: 35,
        borderRadius: 5,          
    },
    imagen: {
        width: 22,
        height: 22,        
        marginRight: 10,
    },
    txtOpcionBaja: {
        color: "#000",
        fontSize: 15,
    },
};

export default Footer;
