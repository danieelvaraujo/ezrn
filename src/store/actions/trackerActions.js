import { inserirTracker, fetchTrackers } from "../../helpers/db";

export const ADD_TRACKER = "ADD_TRACKER";
export const SET_TRACKERS = "SET_TRACKERS";

export const addTracker = (localizacao) => {
  const googleApiKey = "AIzaSyD6BlvLFCdl0ZiFoZane7T6Z9eOpP_vkcU";

  // console.log(localizacao[0].locations[0].coords);

  const objLatitude = localizacao[0].locations[0].coords.latitude;
  const objLongitude = localizacao[0].locations[0].coords.longitude;

  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${objLatitude},${objLongitude}&key=${googleApiKey}`
    );

    if (!response.ok) {
      throw new Error(
        "Tive um problema com a localização. Poderia tirar novamente?"
      );
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error("Perdeu conexão com a localização.");
    }

    const endereco = resData.results[0].formatted_address;

    try {
      const dbResultado = await inserirTracker(
        endereco,
        objLatitude,
        objLongitude
      );
      dispatch({
        type: ADD_TRACKER,
        trackerData: {
          id: dbResultado.insertId,
          endereco: endereco,
          coords: {
            lat: objLatitude,
            lng: objLongitude,
          },
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const carregarTrackers = () => {
  return async (dispatch) => {
    try {
      const dbResultado = await fetchTrackers();

      dispatch({ type: SET_TRACKERS, trackers: dbResultado.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
