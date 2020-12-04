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
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

import * as fotosActions from "../store/actions/fotosActions";

import Colors from "../constants/Colors";

const SalvarUnica = ({ navigation, route }) => {
  const { conexao } = route.params;

  const [foto, setFoto] = useState(null);
  const [local, setLocal] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [desligar, setDesligar] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getLocalizacao();
  }, [foto]);

  useEffect(() => {
    getLocalizacao();
    // console.log("Mudou de state " + enviando);
  }, [enviando]);

  const verificarPermissoes = async () => {
    const resultado = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL,
      Permissions.LOCATION
    );

    if (resultado.status !== "granted") {
      Alert.alert(
        "Para utilizar a aplicação é necessário permitir acesso a câmera e a localização.",
        [{ text: "Entendido" }]
      );
      return false;
    }
    return true;
  };

  const getLocalizacao = async () => {
    const temPermissao = await verificarPermissoes();
    if (!temPermissao) {
      return;
    } else {
      try {
        const localizacao = await Location.getCurrentPositionAsync({
          timeout: 10000,
        });
        setLocal(localizacao);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const desligarNet = () => {
    if (conexao) {
      setDesligar(!conexao.isConnect);
    }
  };

  const abrirCamera = async () => {
    const temPermissao = await verificarPermissoes();
    if (!temPermissao) {
      return;
    }

    const imagem = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      exif: true,
    });
    setFoto(imagem.uri);
    getLocalizacao();
  };

  const finalizar = () => {
    setEnviando(false);
    navigation.goBack();
  };

  const salvarFoto = () => {
    dispatch(fotosActions.addFoto(foto, local))
      .then(() => {
        setEnviando(true);
      })
      .catch((err) => {
        console.log("Deu erro: " + err);
      });

    Alert.alert("Sucesso", "Sua foto foi enviada", [
      { text: "Ok", onPress: finalizar },
    ]);
  };

  const abrirBiblioteca = async () => {
    const temPermissao = await verificarPermissoes();
    if (!temPermissao) {
      return;
    }
    navigation.navigate("Seletor");
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
              {!foto ? (
                <Text>As fotos aparecerão aqui</Text>
              ) : (
                <Image style={styles.imagem} source={{ uri: foto }} />
              )}
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
                  onPress={abrirBiblioteca}
                />
              </View>
            </View>
          </View>

          {foto ? (
            <Button
              title="Salvar foto"
              color={Colors.foto}
              onPress={salvarFoto}
            />
          ) : (
            <Button title="Salvar foto" disabled onPress={salvarFoto} />
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default SalvarUnica;

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
    width: "100%",
    height: 200,
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
