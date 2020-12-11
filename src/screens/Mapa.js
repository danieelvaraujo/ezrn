import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

import * as trackerActions from "../store/actions/trackerActions";

import Colors from "../constants/Colors";
import { FlatList } from "react-native-gesture-handler";
const LOCATION_TASK_NAME = "background-location-task";

const Mapa = () => {
  //Array com todos os endereços por onde o usuário passou
  const [enderecos, setEnderecos] = useState(null);
  //Cada novo endereço que o tracker marcar (distância a decidir)
  const [novoEndereco, setNovoEndereco] = useState(null);
  //Switch que será ativado toda vez que o tracker marcar um novo endereco
  //Desativa assim que terminar de marcar
  const [tracking, setTracking] = useState(false);

  const dispatch = useDispatch();

  // Vai salvar um novo endereço no array cada vez que o tracking ativar
  useEffect(() => {
    // salvarEndereco();
    console.log("Rodou o useffect");
  }, [tracking]);

  // O tracker começa ao apertar o botão de iniciar
  // Vai salvar a localização do usuário a cada X metros ou Y milissegundos
  // Roda no background
  const comecarTracker = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status === "granted") {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 1000,
        distanceInterval: 1,
        foregroundService: {
          notificationTitle: "Ezdocs",
          notificationBody: "Rodando em background",
        },
      });
      console.log("Começou a rodar");
    } else {
      Alert.alert(
        "Para utilizar a aplicação é necessário permitir a localização.",
        [{ text: "Entendido" }]
      );
      return false;
    }
  };

  // Encerra o tracker no momento que apertar o botão
  const terminarTracker = async () => {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    console.log("Parou o tracker");
  };

  // Salva na DB o endereço marcado
  const despachar = () => {
    dispatch(trackerActions.addTracker(novoEndereco))
      .then(() => {
        // setTracking(true);
        console.log("then do dispatch");
        // setEnderecos(...enderecos, novoEndereco);
        // console.log("Tracking passou a ser true" + tracking);
      })
      .catch((err) => {
        console.log("Deu erro: " + err);
      });
  };

  // Dá o trigger para o dispatch no momento que o tracking virar true
  const salvarEndereco = async () => {
    if (tracking === true) {
      console.log("Vai despachar");
      despachar();
    }
  };

  // Location task name
  // Recebe as localizações por onde o usuário passar
  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      // Salva o objeto na constante data
      // Pode ser melhor salvar o endereço recebido direto na database
      // Caso o array seja a lista de endereços + o novo endereço, o push na database deve substituir o existente
      const { locations } = data;
      setNovoEndereco(locations);
      console.log(novoEndereco);
    }
  });

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View style={{ paddingTop: 10, width: 250 }}>
          <Button
            title="Começar trajeto"
            color={Colors.comecar}
            onPress={comecarTracker}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            fontWeight: "bold",
            marginTop: 15,
          }}
        >
          Trajeto
        </Text>
        <View style={{ alignItems: "flex-start" }}>
          <View style={{ margin: 10 }}>
            {/* <FlatList  */}
            {/* data={enderecos} */}
            {/* keyExtractor={(item) => item.id} */}
            {/* renderItem={(itemData) => ( */}
            {/* <View> */}
            {/* <Text>{itemData.e</Text> */}
            {/* </View> */}
            {/* )} */}
            {/* /> */}
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ paddingBottom: 10, width: 250 }}>
          <Button
            title="Terminar trajeto"
            color={Colors.terminar}
            onPress={terminarTracker}
          />
        </View>
      </View>
    </View>
  );
};

export default Mapa;

const styles = StyleSheet.create({});
