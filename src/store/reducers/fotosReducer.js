import { ADD_FOTO, SET_FOTOS } from "../actions/fotosActions";
import Foto from "../../models/foto";

const initialState = {
  fotos: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FOTOS:
      return {
        fotos: action.fotos.map(
          (ft) =>
            new Foto(
              ft.id.toString(),
              ft.titulo,
              ft.imagemUri,
              ft.endereco,
              ft.lat,
              ft.lng
            )
        ),
      };
    case ADD_FOTO:
      const novaFoto = new Foto(
        action.fotoData.id.toString(),
        action.fotoData.titulo,
        action.fotoData.imagem,
        action.fotoData.endereco,
        action.fotoData.coords.lat,
        action.fotoData.coords.lng
      );
      return {
        fotos: state.fotos.concat(novaFoto),
      };
    default:
      return state;
  }
};
