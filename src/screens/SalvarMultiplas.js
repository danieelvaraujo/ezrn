import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import * as Location from "expo-location";
import NetInfo from "@react-native-community/netinfo";

import { abrirCamera } from "./SalvarUnica";
import { useDispatch } from "react-redux";
import * as fotosActions from "../store/actions/fotosActions";

const SalvarMultiplas = ({ navigation, route }) => {
  const { photos } = route.params;

  const [fotos, setFotos] = useState([]);
  const [local, setLocal] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [rede, setRede] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (photos) {
      setFotos(photos);
    }
  }, [photos]);

  useEffect(() => {
    const checarNet = setInterval(() => {
      getConexao();
      // console.log("Internet checada");
    }, 30000);
    return () => clearInterval(checarNet);
  }, []);

  useEffect(() => {
    getLocalizacao();
  }, [enviando]);

  const getConexao = () => {
    NetInfo.fetch().then((conexao) => {
      if (!conexao) {
        console.log("Sem conexão.");
      }
      setRede(conexao.isConnected);
    });
  };

  const getLocalizacao = async () => {
    try {
      const localizacao = await Location.getCurrentPositionAsync({
        timeout: 10000,
      });
      setLocal(localizacao);
      console.log(localizacao);
    } catch (err) {
      console.log(err);
    }
  };

  const finalizar = () => {
    setEnviando(false);
    navigation.navigate("Listagem");
  };

  const despachar = () => {
    for (let photo of photos) {
      dispatch(fotosActions.addFoto(photo.uri, local))
        .then(() => {
          setEnviando(true);
        })
        .catch((err) => {
          console.log("Deu erro: " + err);
        });
    }

    Alert.alert("Sucesso", "Sua foto foi enviada", [
      { text: "Ok", onPress: finalizar },
    ]);
  };

  const salvarFoto = async () => {
    await getConexao();
    if (!rede) {
      Alert.alert("Celular sem internet", "Conecte-se para continuar", [
        { text: "Ok" },
      ]);
    } else {
      despachar();
    }
  };

  const renderImage = (item, i) => {
    return (
      <Image
        style={{ height: 100, width: 350, marginVertical: 1 }}
        source={{ uri: item.uri }}
        key={i}
      />
    );
  };

  return (
    <ScrollView>
      {enviando ? (
        <View style={{ alignSelf: "center" }}>
          <ActivityIndicator size="large" color={Colors.tirar} />
        </View>
      ) : (
        <View style={styles.form}>
          <Text style={styles.titulo}>Envie aqui a foto dos documentos</Text>
          <View style={styles.seletor}>
            <View style={styles.visualizacao}>
              {fotos.map((item, i) => renderImage(item, i))}
            </View>
            <View style={{ width: "100%" }}>
              <View style={{ margin: 2 }}>
                <Button
                  title="Tirar nova foto"
                  color={Colors.tirar}
                  onPress={abrirCamera}
                />
              </View>
              <View style={{ margin: 2 }}>
                <Button
                  title="Escolher foto existente"
                  color={Colors.tirar}
                  onPress={() => navigation.navigate("Seletor")}
                />
              </View>
            </View>
          </View>

          {photos ? (
            <Button
              title="Salvar fotos"
              color={Colors.foto}
              onPress={salvarFoto}
            />
          ) : (
            <Button title="Salvar fotos" disabled onPress={salvarFoto} />
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default SalvarMultiplas;

const styles = StyleSheet.create({
  form: {
    height: "100%",
    margin: 30,
  },
  titulo: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  seletor: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  visualizacao: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  imagem: {
    width: "100%",
    height: "100%",
  },
});
