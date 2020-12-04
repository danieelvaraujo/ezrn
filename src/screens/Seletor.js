import React, { useState, useEffect, useLayoutEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import { ImageBrowser } from "expo-image-picker-multiple";

const Seletor = ({ navigation }) => {
  const [loading, setLoading] = useState();
  const [arrayFotos, setArrayFotos] = useState([]);

  useEffect(() => {
    checkLoading();
  }, [loading]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          title={"Done"}
          onPress={() => setLoading(false)}
          style={{ marginRight: 25 }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Done</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const navegar = (aFotos) => {
    setArrayFotos(aFotos);
  };

  const checkLoading = () => {
    if (loading === false) {
      navigation.navigate("SalvarMultiplas", { photos: arrayFotos });
    }
  };

  const imagesCallback = (callback) => {
    callback
      .then(async (photos) => {
        const cPhotos = [];
        for (let photo of photos) {
          const pPhoto = await _processImageAsync(photo.uri);
          cPhotos.push({
            uri: pPhoto.uri,
            name: photo.filename,
            type: "image/jpg",
          });
        }
        navegar(cPhotos);
      })
      .catch((e) => console.log(e));
  };

  const _processImageAsync = async (uri) => {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return file;
  };

  const updateHandler = () => {
    checkLoading();
  };

  const renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;

  return (
    <View style={[styles.flex, styles.container]}>
      <ImageBrowser
        max={4}
        onChange={updateHandler}
        callback={imagesCallback}
        renderSelectedComponent={renderSelectedComponent}
        emptyStayComponent={emptyStayComponent}
      />
    </View>
  );
};

export default Seletor;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    position: "relative",
  },
  emptyStay: {
    textAlign: "center",
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: "absolute",
    right: 3,
    bottom: 3,
    justifyContent: "center",
    backgroundColor: "#0580FF",
  },
  countBadgeText: {
    fontWeight: "bold",
    alignSelf: "center",
    padding: "auto",
    color: "#ffffff",
  },
});
