import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useSelector } from "react-redux";

import Colors from "../constants/Colors";
import * as trackerActions from "../store/actions/trackerActions";

const DeetsTrackers = ({ route, navigation }) => {
  const { trackerId } = route.params;

  const trackerSelecionado = useSelector((state) =>
    state.trackers.trackers.find((tracker) => tracker.id === trackerId)
  );

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <View style={styles.alinhar}>
        <Text style={styles.titulo}>Trajeto {trackerSelecionado.id}</Text>

        <View style={styles.detalhes}>
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Endereços:</Text>
            <View style={styles.endereco}>
              <Text style={{ padding: 5 }}>{trackerSelecionado.endereco}</Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <Text style={styles.coords}>
                  Latitude: {trackerSelecionado.lat}
                </Text>
                <Text style={styles.coords}>
                  Longitude: {trackerSelecionado.lng}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DeetsTrackers;

const styles = StyleSheet.create({
  alinhar: {
    marginTop: 25,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 25,
    alignSelf: "center",
  },
  endereco: {
    margin: 5,
  },
  coords: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  detalhes: {
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});
