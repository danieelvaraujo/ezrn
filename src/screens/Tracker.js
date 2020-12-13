import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as trackerActions from "../store/actions/trackerActions";
import Colors from "../constants/Colors";

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
    salvarEnderecos();
  }, [tracking]);

  //   // atualiza a página quando mudar o state
  useEffect(() => {
    // console.log("onTracker: " + onTracker);
  }, [onTracker]);

  useEffect(() => {
    // console.log(enderecos);
  }, [enderecos]);

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
    dispatch(trackerActions.addTracker(enderecos))
      .then(() => {
        console.log("Array enviado");
        // Array de endereços enviado
      })
      .catch((err) => {
        console.log("Deu erro: " + err);
      });
  };

  // Salva o novo endereço do tracker para ser inserido depois ao array
  const salvarEnderecos = () => {
    if (!novoEndereco.locations) {
      return;
    } else {
      if (tracking === true) {
        // if (!novoEndereco)
        setEnderecos([...enderecos, novoEndereco]);
        setTracking(false);
      }
    }
    // console.log(novoEndereco.locations);
  };

  //   Location task name
  //   Recebe as localizações por onde o usuário passar
  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      // Salva o objeto data na constante novoEndereco
      setTracking(true);
      setNovoEndereco(data);
      salvarEnderecos();
    }
  });

  const renderItem = (item) => {
    if (item.item.locations) {
      return (
        <ScrollView
          key={item.index}
          contentContainerStyle={{
            padding: 2,
            margin: 5,
            width: "70%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <View>
            <Text style={{ textAlign: "center" }}>ID: {item.index}</Text>
          </View>
          <View>
            <Text style={{ textAlign: "center" }}>
              Latitude: {item.item.locations[0].coords.latitude}
            </Text>
            <Text style={{ textAlign: "center" }}>
              Longitude: {item.item.locations[0].coords.longitude}
            </Text>
          </View>
        </ScrollView>
      );
    } else {
      return;
    }
  };

  return (
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

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}
      >
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
          Locais salvos
        </Text>
      </View>

      <View>
        {enderecos.length === 0 ? (
          <Text style={{ textAlign: "center" }}>
            Comece o trajeto para salvar os endereços
          </Text>
        ) : (
          <FlatList
            data={enderecos}
            keyExtractor={(item) => item.id}
            renderItem={(item) => renderItem(item)}
          />
        )}
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
