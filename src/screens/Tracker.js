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

const Tracker = () => {
  const [onTracker, setOnTracker] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [novoEndereco, setNovoEndereco] = useState({});
  const [enderecos, setEnderecos] = useState([]);

  const dispatch = useDispatch();

  // cada vez que o switch ficar on, vai salvar os endereços no array
  // depois que salvar, o switch fica off e espera o próximo track
  useEffect(() => {
    console.log("tracking: " + tracking);
  }, [tracking]);

  //   // atualiza a página quando mudar o state
  useEffect(() => {
    console.log("onTracker: " + onTracker);
  }, [onTracker]);

  useEffect(() => {}, [enderecos]);

  // O tracker começa ao apertar o botão de iniciar
  // Vai salvar a localização do usuário a cada X metros ou Y milissegundos
  const comecarTracker = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status === "granted") {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 15000,
        distanceInterval: 1,
        foregroundService: {
          notificationTitle: "Ezdocs",
          notificationBody: "Rodando em background",
        },
      });
      setOnTracker(true);
    } else {
      Alert.alert(
        "Para utilizar a aplicação é necessário permitir a localização.",
        [{ text: "Entendido" }]
      );
      return false;
    }
  };

  // Termina a função do tracker ao apertar o botão de finalizar
  // setState do array de endereços para ser enviado
  // Salva o array na database
  const terminarTracker = async () => {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    // fazer esse State atualizar o state da página antes de despachar
    despachar();
    setOnTracker(false);
  };

  // Vai ser enviado a database o array com todo o trajeto quando o usuario clicar em finalizar
  const despachar = () => {
    // dispatch(trackerActions.addTracker(enderecos))
    //   .then(() => {
    // Array de endereços enviado
    //   })
    //   .catch((err) => {
    //     console.log("Deu erro: " + err);
    //   });
  };

  // Salva o novo endereço do tracker para ser inserido depois ao array
  const salvarEnderecos = () => {
    if (tracking === true) {
      setEnderecos([...enderecos, novoEndereco]);
      setTracking(false);

      //   console.log(enderecos);
    }
  };

  //   Location task name
  //   Recebe as localizações por onde o usuário passar
  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      // Salva o objeto na constante data
      // Caso o array seja a lista de endereços + o novo endereço, o push na database deve substituir o existente
      setTracking(true);
      setNovoEndereco(data);
      salvarEnderecos();
    }
  });

  const cartaoEndereco = ({ item }) => {
    console.log(item.locations[0].coords.latitude);
  };

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View style={{ paddingTop: 10, width: 250, margin: 3 }}>
          <Button
            title="Começar trajeto"
            color={Colors.comecar}
            onPress={comecarTracker}
          />
        </View>
        <View style={{ paddingBottom: 10, width: 250, margin: 3 }}>
          <Button
            title="Terminar trajeto"
            color={Colors.terminar}
            onPress={terminarTracker}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {onTracker ? (
            <View style={styles.bolaVerde} />
          ) : (
            <View style={styles.bolaVermelha} />
          )}
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              fontWeight: "bold",
              marginLeft: 15,
            }}
          >
            Trajeto
          </Text>
        </View>

        <View style={{ alignItems: "flex-start" }}>
          <View style={{ margin: 10 }}>
            {enderecos ? (
              <FlatList
                data={enderecos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View
                    key={item.id}
                    style={{
                      width: 300,
                      height: 100,
                      borderWidth: 1,
                      borderColor: "black",
                      padding: 2,
                      margin: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text>
                      Latitude: {item.locations[index].coords.latitude}
                    </Text>
                    <Text>
                      Longitude: {item.locations[index].coords.longitude}
                    </Text>
                  </View>
                )}
                // renderItem={cartaoEndereco}
              />
            ) : (
              <View>
                <Text>Sem nada para mostrar no momento</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Tracker;

const styles = StyleSheet.create({
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
