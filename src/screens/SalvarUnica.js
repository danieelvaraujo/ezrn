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
import NetInfo from "@react-native-community/netinfo";

import * as fotosActions from "../store/actions/fotosActions";

import Colors from "../constants/Colors";

const SalvarUnica = ({ navigation, route }) => {
  const [foto, setFoto] = useState(null);
  const [local, setLocal] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [rede, setRede] = useState(false);

  const dispatch = useDispatch();

  // Vai conferir a conexão quando abrir a tela de seleção
  useEffect(() => {
    const checarNet = setInterval(() => {
      getConexao();
    }, 30000);
    return () => clearInterval(checarNet);
  }, []);

  useEffect(() => {
    if (foto) {
      salvarFoto();
    } else {
      return;
    }
  }, [rede]);

  // Ao tentar enviar uma foto, vai conferir a localização
  // do usuário para enviar as coordenadas junto da foto
  useEffect(() => {
    getLocalizacao();
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

  // Fazer um setTimeout para que essa função se repita à cada alguns minutos
  const getConexao = () => {
    NetInfo.fetch().then((conexao) => {
      if (!conexao) {
        console.log("Sem conexão.");
      }
      setRede(conexao.isConnected);
    });
  };

  const toggleNet = () => {
    rede ? setRede(false) : setRede(true);
  };

  const getLocalizacao = async () => {
    const temPermissao = await verificarPermissoes();
    if (!temPermissao) {
      return;
    } else {
      try {
        // Espera até 10 segundos em cada tentativa
        const localizacao = await Location.getCurrentPositionAsync({
          timeout: 10000,
        });
        setLocal(localizacao);
      } catch (err) {
        console.log(err);
      }
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
    navigation.navigate("Listagem");
  };

  const despachar = () => {
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
          <View>
            {rede ? (
              <View style={styles.bolaVerde} />
            ) : (
              <View style={styles.bolaVermelha} />
            )}
            <Text style={styles.titulo}>Envie aqui a foto dos documentos</Text>
          </View>
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
              <View style={{ margin: 2 }}>
                <Button
                  title={rede ? "Desligar net" : "Ligar net"}
                  color={Colors.tirar}
                  onPress={toggleNet}
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
  bolaVerde: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "green",
  },
  bolaVermelha: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "red",
  },
});
