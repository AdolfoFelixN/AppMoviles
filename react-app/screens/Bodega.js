import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Footer from "../components/Footer";
import { link } from "../components/link";

function Bodega({ navigation }) {
  const headers = ["No. Serie", "Equipo", "Ubicación"];
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await fetch(`${link}/servicios`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        const filteredData = result.filter(item => item.estatus === "Activo");
        setData(filteredData);
      } catch (error) {
        Alert.alert("Error", "Error al conectar con el servidor");
        console.error("Error al obtener servicios:", error);
      }
    };

    fetchServicios();
  }, []);

  const handleRowPress = (item) => {
    navigation.navigate("OrdenBodega", { servicio: item });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Bodega</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.table}>
          {/* Encabezados */}
          <View style={styles.row}>
            {headers.map((header, index) => (
              <View key={index} style={styles.headerCell}>
                <Text style={styles.headerTextTable}>{header}</Text>
              </View>
            ))}
          </View>
          {/* Filas de datos */}
          {data.map((item, rowIndex) => (
            <TouchableOpacity key={rowIndex} style={styles.row} onPress={() => handleRowPress(item)}>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{item.numeroSerie}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{item.equipo}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{item.espacioBodega}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: "100%",
    alignSelf: "center",
    marginVertical: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#000",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#f1f1f1",
  },
  headerCell: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    backgroundColor: "#f1f1f1",
    width: "33.33%",
  },
  headerTextTable: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  cell: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    width: "33.33%",
  },
  cellText: {
    textAlign: "start",
  },
});

export default Bodega;