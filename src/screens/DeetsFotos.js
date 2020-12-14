import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";

const DeetsFotos = ({ route, navigation }) => {
  const { fotoId } = route.params;

  const fotoSelecionada = useSelector((state) =>
    state.fotos.fotos.find((foto) => foto.id === fotoId)
  );

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <View style={styles.alinhar}>
        <Text style={styles.titulo}>{fotoSelecionada.titulo}</Text>
        <View style={styles.containerImagem}>
          <Image
            source={{ uri: fotoSelecionada.imagemUri }}
            style={styles.imagem}
          />
        </View>
        <View style={styles.detalhes}>
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Endereço:</Text>
            <Text style={styles.endereco}> {fotoSelecionada.endereco}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Text style={styles.coords}>Latitude: {fotoSelecionada.lat}</Text>
              <Text style={styles.coords}>
                Longitude: {fotoSelecionada.lng}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DeetsFotos;

const styles = StyleSheet.create({
  alinhar: {
    marginTop: 25,
    justifyContent: "center",
  },
  imagem: {
    marginTop: "5%",
    alignSelf: "center",
    width: "90%",
    minHeight: 200,
  },
  titulo: {
    fontSize: 25,
    alignSelf: "center",
  },
  containerImagem: {
    marginBottom: 20,
  },
  endereco: {
    margin: 10,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  coords: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  detalhes: {
    marginHorizontal: 15,
  },
});
