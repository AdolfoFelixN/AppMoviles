import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import Footer from "../components/Footer";
import { Picker } from "@react-native-picker/picker";
import { ClienteContext } from "../contexts/ClienteContext";
import { link } from "../components/link";

function Registro({ navigation }) {
  const [equipo, setEquipo] = useState("");
  const [marca, setMarca] = useState("");
  const [numeroSerie, setNumeroSerie] = useState("");
  const [servicio, setServicio] = useState("");
  const [espacioBodega, setEspacioBodega] = useState("");
  const [estatus, setEstatus] = useState("Activo");

  const { nombre, telefono, email, setNombre, setTelefono, setEmail } = useContext(ClienteContext);

  const handleServicio = async () => {
    if (validateInputs()) {
      try {
        const response = await fetch(
          `${link}/registrar-servicio`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombre,
              telefono,
              email,
              equipo,
              marca,
              numeroSerie,
              servicio,
              espacioBodega,
              estatus,
            }),
          }
        );

        const result = await response.json();
        if (response.status === 400) {
          Alert.alert("Error", result.error);
        } else {
          Alert.alert(
            "¡Producto guardado!",
            "El producto ha sido guardado con éxito"
          );
          setNombre(" ");
          setTelefono(" ");
          setEmail(" ");
          navigation.navigate("Inicio");
        }
      } catch (error) {
        Alert.alert("Error", "Error al conectar con el servidor");
        console.error("Error al registrar:", error);
      }
    }
  };

  const validateInputs = () => {
    if (equipo.length <= 3) {
      Alert.alert("Error", "El equipo debe tener más de 3 letras");
      return false;
    }

    if (numeroSerie.length <= 10) {
      Alert.alert("Error", "El número de serie debe ser mayor a 10 digitos");
      return false;
    }

    if (!servicio) {
      Alert.alert("Error", "Debe seleccionar un servicio");
      return false;
    }

    if (!espacioBodega) {
      Alert.alert("Error", "Debe seleccionar un espacio en bodega");
      return false;
    }

    return true;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Producto</Text>
          </View>

          <View style={styles.steps}>
            <View style={styles.step}>
              <Text style={styles.stepNumber1}>1</Text>
              <Text style={styles.stepText}>Cliente</Text>
            </View>
            <Text style={styles.stepArrow}> {">"} </Text>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={styles.stepText}>Producto</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Equipo</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite el nombre del equipo"
                value={equipo}
                onChangeText={setEquipo}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Marca</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite la marca del equipo"
                value={marca}
                onChangeText={setMarca}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Número de serie</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite el No. de serie del equipo"
                value={numeroSerie}
                onChangeText={setNumeroSerie}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Servicio</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={servicio}
                  onValueChange={(itemValue) => setServicio(itemValue)}
                >                  
                  <Picker.Item label="Reparación" value="Reparación" />
                  <Picker.Item label="Mantenimiento" value="Mantenimiento" />                  
                  <Picker.Item label="En Venta" value="En Venta" />
                </Picker>
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Espacio en Bodega</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={espacioBodega}
                  onValueChange={(itemValue) => setEspacioBodega(itemValue)}
                >                  
                  <Picker.Item label="Rack A1" value="A1" />
                  <Picker.Item label="Rack A2" value="A2" />
                  <Picker.Item label="Rack A3" value="A3" />
                  <Picker.Item label="Rack A4" value="A4" />
                  <Picker.Item label="Rack A5" value="A5" />
                  <Picker.Item label="Rack A6" value="A6" />
                  <Picker.Item label="Rack A7" value="A7" />                  
                  <Picker.Item label="Rack B1" value="B1" />
                  <Picker.Item label="Rack B2" value="B2" />
                  <Picker.Item label="Rack B3" value="B3" />
                  <Picker.Item label="Rack B4" value="B4" />
                  <Picker.Item label="Rack B5" value="B5" />
                  <Picker.Item label="Rack B6" value="B6" />
                  <Picker.Item label="Rack B7" value="B7" />                  
                  <Picker.Item label="Rack C1" value="C1" />
                  <Picker.Item label="Rack C2" value="C2" />
                  <Picker.Item label="Rack C3" value="C3" />
                  <Picker.Item label="Rack C4" value="C4" />
                  <Picker.Item label="Rack C5" value="C5" />
                  <Picker.Item label="Rack C6" value="C6" />
                  <Picker.Item label="Rack C7" value="C7" />                  
                  <Picker.Item label="Rack D1" value="D1" />
                  <Picker.Item label="Rack D2" value="D2" />
                  <Picker.Item label="Rack D3" value="D3" />
                  <Picker.Item label="Rack D4" value="D4" />
                  <Picker.Item label="Rack D5" value="D5" />
                  <Picker.Item label="Rack D6" value="D6" />
                  <Picker.Item label="Rack D7" value="D7" />                  
                  <Picker.Item label="Rack E1" value="E1" />
                  <Picker.Item label="Rack E2" value="E2" />
                  <Picker.Item label="Rack E3" value="E3" />
                  <Picker.Item label="Rack E4" value="E4" />
                  <Picker.Item label="Rack E5" value="E5" />
                  <Picker.Item label="Rack E6" value="E6" />
                  <Picker.Item label="Rack E7" value="E7" />                  
                </Picker>
              </View>
            </View>

            <View style={styles.botones}>
              <TouchableOpacity
                style={styles.btnVolver}
                onPress={() => navigation.navigate("Inicio")}
              >
                <Text style={styles.txtBtnVolver}>Volver</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnContinuar}
                onPress={handleServicio}
              >
                <Text style={styles.buttonText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <Footer navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    paddingBottom: 20,
  },
  steps: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  stepNumber: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#FF3B30",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    marginRight: 5,
  },
  stepNumber1: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    backgroundColor: "#E1E1E6",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    marginRight: 5,
  },
  stepText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "500",
  },
  stepArrow: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: "100%",
    alignSelf: "center",
    marginVertical: 20,
  },
  form: {
    flex: 1,
  },
  field: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    color: "#000",
    fontWeight: "400",
  },
  input: {
    height: 45,
    width: "100%",
    paddingHorizontal: 10,
    fontSize: 14,
    color: "black",
    backgroundColor: "white",
    borderColor: "#E1E1E6",
    borderWidth: 1,
    borderRadius: 2,
  },
  pickerContainer: {
    borderColor: "#E1E1E6",
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: "white",
  },
  pickerInput: {
    color: "black",
    backgroundColor: "#E1E1E6",
  },
  botones: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnVolver: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    width: "48%",
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  txtBtnVolver: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "bold",
  },
  btnContinuar: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    width: "48%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Registro;
