import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";

import Colors from "../constants/Colors";
import FotoItem from "../components/FotoItem";
import * as fotosActions from "../store/actions/fotosActions";

const Lista = ({ navigation }) => {
  const [rede, setRede] = useState({});

  const checarNet = () => {
    NetInfo.fetch().then((conexao) => {
      if (!conexao) {
        console.log("Sem conexão.");
      }
      setRede(conexao);
    });

    rede.isConnected
      ? console.log(`Aparelho conectado na rede ${rede.type}`)
      : console.log(`O aparelho não está conectado`);
  };

  const fotos = useSelector((state) => state.fotos.fotos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fotosActions.carregarFotos());
  }, [dispatch]);

  useEffect(() => {
    checarNet();
  }, [rede]);

  return (
    <View style={{ height: "100%" }}>
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
            color={Colors.conexao}
            title="Checar conexão com internet"
            onPress={checarNet}
          />
        </View>
        <View style={{ margin: 5 }}>
          <Button
            color={Colors.foto}
            title="Nova foto"
            onPress={() =>
              navigation.navigate("NovaFoto", {
                conexao: rede.isConnected,
              })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Lista;

const styles = StyleSheet.create({});
