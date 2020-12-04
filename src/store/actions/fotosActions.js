import * as FileSystem from "expo-file-system";

import { inserirFoto, fetchFotos } from "../../helpers/db";

export const ADD_FOTO = "ADD_FOTOS";
export const SET_FOTOS = "SET_FOTOS";

export const addFoto = (imagemUri, localizacao) => {
  const googleApiKey = "AIzaSyD6BlvLFCdl0ZiFoZane7T6Z9eOpP_vkcU";
  console.log(localizacao);

  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${localizacao.coords.latitude},${localizacao.coords.longitude}&key=${googleApiKey}`
    );

    const titulo = "";

    if (!response.ok) {
      throw new Error(
        "Tive um problema com a localização. Poderia tirar novamente?"
      );
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error("Tive um problema com a foto. Poderia tirar novamente?");
    }

    // console.log(resData);
    const endereco = resData.results[0].formatted_address;

    const fileName = imagemUri.split("/").pop();
    const novoUri = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: imagemUri,
        to: novoUri,
      });

      const dbResultado = await inserirFoto(
        titulo,
        novoUri,
        endereco,
        localizacao.coords.latitude,
        localizacao.coords.longitude
      );
      dispatch({
        type: ADD_FOTO,
        fotoData: {
          id: dbResultado.insertId,
          titulo: dbResultado.insertId,
          imagem: novoUri,
          endereco: endereco,
          coords: {
            lat: localizacao.lat,
            lng: localizacao.lng,
          },
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const carregarFotos = () => {
  return async (dispatch) => {
    try {
      const dbResultado = await fetchFotos();

      dispatch({ type: SET_FOTOS, fotos: dbResultado.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
