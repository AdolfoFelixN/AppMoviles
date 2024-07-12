import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HeaderApp = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.imagenSalir} onPress={() => navigation.navigate("Login")}>        
          <Image source={require("../assets/salir.png")} style={styles.imagen}/>          
        </TouchableOpacity>
        
        <View style={styles.imageContainer} >
          <Image source={require("../assets/logoLogin.png")} style={styles.imagen}/>
        </View> 

        <TouchableOpacity style={styles.imagenPerfil} onPress={() => navigation.navigate("Usuario")}>        
          <Image source={require("../assets/perfil.png")} style={styles.imagen}/>          
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 10,
    borderTopWidth: 1, // Grosor del borde superior
    borderBottomWidth: 1, // Grosor del borde inferior
    borderTopColor: '#E1E1E6', // Color del borde superior
    borderBottomColor: '#E1E1E6', // Color del borde inferior    
  },

  imageContainer: {
    display: "flex",    
    justifyContent: "center",
    alignItems: "center",        
    width: "60%",
    height: 50,        
  },

  imagen: {
    width: "75%",
    height: "75%", 
  },

  imagenSalir: {
    display: "flex",    
    justifyContent: "center",
    alignItems: "center",        
    width: "14%",
    height: 52,            
  },

  imagenPerfil: {
    display: "flex",    
    justifyContent: "center",
    alignItems: "center",        
    width: "11%",
    height: 50,            
  },

  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  button: {
    color: 'black',
  },
});

export default HeaderApp;
