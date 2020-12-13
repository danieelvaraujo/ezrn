import React from "react";
import { StyleSheet, View, FlatList, Button, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as trackerActions from "../store/actions/trackerActions";

const ListaTrackers = ({ navigation }) => {
  const trackers = useSelector((state) => state.trackers.trackers);
  const dispatch = useDispatch();

  dispatch(trackerActions.carregarTrackers());

  return (
    <View style={{ height: "100%" }}>
      <FlatList
        data={trackers}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <View
            style={{
              padding: 15,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderColor: "#ccc",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18 }}>{itemData.item.endereco}</Text>
          </View>
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

export default ListaTrackers;

const styles = StyleSheet.create({});
