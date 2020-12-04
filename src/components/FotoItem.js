import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const FotoItem = (props) => {
  return (
    <TouchableOpacity onPress={props.fotoSelecionada} style={styles.fotoItem}>
      <Image style={styles.imagem} source={{ uri: props.imagem }} />
      <View style={styles.infoContainer}>
        <Text style={styles.titulo}>{props.titulo}</Text>
        <Text style={styles.endereco}>{props.endereco}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FotoItem;

const styles = StyleSheet.create({
  fotoItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  imagem: {
    width: 70,
    height: 70,
    borderRadius: 25,
    backgroundColor: "#91b8c2",
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  titulo: {
    color: "#666",
    fontSize: 18,
    marginBottom: 5,
  },
  endereco: {
    color: "#666",
    fontSize: 16,
  },
});
