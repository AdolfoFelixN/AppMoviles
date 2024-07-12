import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import Footer from "../components/Footer";
import { link } from "../components/link";

function RacksScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [racks, setRacks] = useState([]);
  
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const validSpaces = [
    "A1", "A2", "A3", "A4", "A5", "A6", "A7",
    "B1", "B2", "B3", "B4", "B5", "B6", "B7",
    "C1", "C2", "C3", "C4", "C5", "C6", "C7",
    "D1", "D2", "D3", "D4", "D5", "D6", "D7",
    "E1", "E2", "E3", "E4", "E5", "E6", "E7"
  ];

  useEffect(() => {
    fetch(`${link}/servicios`)
      .then(response => response.json())
      .then(data => {
        // Filtrar los espacios ocupados y validar estatus
        const occupiedSpaces = data
          .filter(item => item.espacioBodega && item.espacioBodega.trim() !== '' && item.estatus !== 'Entregado' && item.estatus !== 'Cancelado')
          .map(item => item.espacioBodega.trim());
  
        // Encontrar los espacios válidos que no están ocupados
        const availableSpaces = validSpaces.filter(space => !occupiedSpaces.includes(space));
  
        // Mapear los datos a racks
        const mappedRacks = data
          .filter(item => item.estatus !== 'Entregado' && item.estatus !== 'Cancelado') // Filtrar 'Entregado' y 'Cancelado'
          .map(item => {
            let status = 'Desconocido';
            if (item.estatus === 'Activo') {
              status = 'Ocupado';
            }
  
            let rackName = `RACK ${item.espacioBodega.trim()}`;
            if (!item.espacioBodega || item.espacioBodega.trim() === '') {
              rackName = `RACK ${availableSpaces.shift()}`;
            }
  
            return {
              id: item.id.toString(),
              name: rackName,
              status: status
            };
          });
  
        // Agregar los espacios disponibles restantes como racks
        availableSpaces.forEach(space => {
          mappedRacks.push({
            id: space,
            name: `RACK ${space}`,
            status: 'Disponible'
          });
        });
  
        // Ordenar racks alfabéticamente por nombre
        mappedRacks.sort((a, b) => a.name.localeCompare(b.name));
  
        // Mover los racks con espacios vacíos al final
        const finalRacks = mappedRacks.filter(rack => !rack.name.includes("RACK ")).concat(mappedRacks.filter(rack => rack.name.includes("RACK ")));
  
        setRacks(finalRacks);
      })
      .catch(error => console.error('Error obteniendo los datos:', error));
  }, []);
  

  const handleLiberar = (id) => {
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
              const response = await fetch(`${link}/servicios/${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ nuevoEstatus: "Entregado" }),
              });
              const data = await response.json();
              if (response.ok) {
                Alert.alert("Entrega exitosa");
                setRacks(prevRacks => prevRacks.map(rack => 
                  rack.id === id ? { ...rack, status: 'Disponible' } : rack
                ));
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

  const renderRack = ({ item }) => {
    let buttonStyle = styles.actionButton;
    let buttonText = '';

    if (item.status === 'Cancelado') {
      buttonText = 'Liberar';
      buttonStyle = styles.cancelledButton;
    }

    return (
      <View style={item.status === 'Ocupado' ? styles.rackContainerOcupado : styles.rackContainer}>
        <View style={styles.rackContent}>
          <Image source={require("../assets/rackIcon.png")} style={styles.rackIcon} />
          <View style={styles.rackInfo}>
            <Text style={styles.rackName}>{item.name}</Text>
            <Text style={styles.rackAvailable}>Estado: {item.status}</Text>
          </View>
          <View style={styles.rackActions}>
            {item.status === 'Cancelado' && (
              <TouchableOpacity
                onPress={() => handleLiberar(item.id)}
                style={buttonStyle}
              >
                <Text style={styles.actionButtonText}>{buttonText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Usuario")}>
          <Text style={styles.headerText}>Usuario</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Racks")}>
          <Text style={styles.headerText}>Racks</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>RACKS</Text>
        <Text style={styles.subtitle}>Espacio en bodega</Text>
        <FlatList
          data={racks}
          renderItem={renderRack}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  rackContainer: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  rackContainerOcupado: {
    backgroundColor: 'rgba(128, 128, 128, 0.5)', // Gris oscuro con opacidad
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  rackContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rackIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  rackInfo: {
    flex: 1,
  },
  rackName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rackAvailable: {
    fontSize: 16,
    color: '#666',
  },
  rackActions: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  cancelledButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RacksScreen;
