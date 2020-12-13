import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import MainNavigation from "./src/navigation/MainNavigation";
import fotosReducer from "./src/store/reducers/fotosReducer";
import trackersReducer from "./src/store/reducers/trackersReducer";
import { init } from "./src/helpers/db";

init()
  .then(() => {
    console.log("SQLite iniciado");
  })
  .catch((err) => {
    console.log("Erro ao inicializar o SQLite: ", err);
  });

const rootReducer = combineReducers({
  fotos: fotosReducer,
  trackers: trackersReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
