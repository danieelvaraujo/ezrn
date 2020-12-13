import React from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import FotoItem from "../components/FotoItem";
import * as fotosActions from "../store/actions/fotosActions";

const ListaFotos = ({ navigation }) => {
  const fotos = useSelector((state) => state.fotos.fotos);

  const dispatch = useDispatch();

  dispatch(fotosActions.carregarFotos());

  return (
    <View style={{ height: "100%" }}>
      <View
        style={{ margin: 10, flexDirection: "row", justifyContent: "center" }}
      >
        <View style={{ margin: 5 }}>
          <Button
            color={Colors.foto}
            title="Lista de fotos"
            onPress={() => navigation.navigate("Fotos")}
          />
        </View>
        <View style={{ margin: 5 }}>
          <Button
            color={Colors.foto}
            title="Lista de trackers"
            onPress={() => navigation.navigate("Trackers")}
          />
        </View>
      </View>

      <FlatList
        data={fotos}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <FotoItem
            imagem={itemData.item.imagemUri}
            titulo={itemData.item.titulo}
            endereco={itemData.item.endereco}
            fotoSelecionada={() =>
              navigation.navigate("Detalhes", {
                tituloFoto: itemData.item.titulo,
                fotoId: itemData.item.id,
                endereco: itemData.item.endereco,
                imagemUri: itemData.item.imagemUri,
                lat: itemData.item.lat,
                lng: itemData.item.lng,
              })
            }
          />
        )}
      />
      <View style={{ margin: 10 }}>
        <View style={{ margin: 5 }}>
          <Button
            color={Colors.foto}
            title="Nova foto"
            onPress={() => navigation.navigate("SalvarUnica")}
          />
        </View>
        <View style={{ margin: 5 }}>
          <Button
            color={Colors.foto}
            title="Trajeto"
            onPress={() => navigation.navigate("Tracker")}
          />
        </View>
      </View>
    </View>
  );
};

export default ListaFotos;

const styles = StyleSheet.create({});
