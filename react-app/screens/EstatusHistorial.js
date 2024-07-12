import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Footer from "../components/Footer";

function EstatusHistorial({ navigation }) {

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>OSE-24-001</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.header}>
          <Text style={styles.headerText}>Estatus:</Text>
          <Text style={styles.estatus}>Entregado</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.cliente}>
          <View style={styles.editarCliente}>
            <Text style={styles.headerText}>Cliente</Text>
            <TouchableOpacity
              style={styles.btnEditar}
              onPress={() => navigation.navigate("Historial")}
            >
              <Image
                source={require("../assets/lapiz.png")}
                style={styles.imagen}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.datos}>
            <View style={styles.dato}>
              <Text style={styles.txtDato}>Nombre:      Luis Esteban Vega Gómez</Text>              
            </View>

            <View style={styles.dato}>
              <Text style={styles.txtDato}>Teléfono:     8126798643</Text>              
            </View>

            <View style={styles.dato}>
              <Text style={styles.txtDato}>Email:           estebanVega@fime.edu.mx</Text>              
            </View>

          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.cliente}>
          <View style={styles.editarCliente}>
            <Text style={styles.headerText}>Equipo</Text>
            <TouchableOpacity
              style={styles.btnEditar}
              onPress={() => navigation.navigate("Historial")}
            >
              <Image
                source={require("../assets/lapiz.png")}
                style={styles.imagen}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.datos}>
            <View style={styles.dato}>
              <Text style={styles.txtDato}>Tipo:            Balanza</Text>              
            </View>

            <View style={styles.dato}>
              <Text style={styles.txtDato}>Marca:         Torrey</Text>              
            </View>

            <View style={styles.dato}>
              <Text style={styles.txtDato}>No.Serie:     248625891287</Text>              
            </View>

            <View style={styles.dato}>
              <Text style={styles.txtDato}>Servicio:      Reparación</Text>              
            </View>

          </View>
        </View>

      </ScrollView>

      {/* Footer al final de la pantalla */}
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
    color: "blue",
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
});

export default EstatusHistorial;
