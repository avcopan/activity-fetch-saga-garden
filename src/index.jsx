import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import { Provider } from "react-redux";

import App from "./App";

const sagaMiddleware = createSagaMiddleware();

const plantList = (state = [], action) => {
  switch (action.type) {
    case "SET_PLANTS":
      return action.payload;
    default:
      return state;
  }
};

function* fetchPlantsSaga() {
  try {
    const response = yield fetch("/api/plant");
    const plants = yield response.json();
    console.log("SETTING THESE PLANTS: ", plants);
    yield put({ type: "SET_PLANTS", payload: plants });
  } catch (error) {
    console.log("Error:", error);
  }
}

function* addPlantSaga(action) {
  try {
    yield fetch("/api/plant", {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    yield put({ type: "FETCH_PLANTS" });
  } catch (error) {
    console.log("Error:", error);
  }
}

function* removePlantSaga(action) {
  try {
    yield fetch(`/api/plant/${action.payload}`, {
      method: "DELETE",
    });
    yield put({ type: "FETCH_PLANTS" });
  } catch (error) {
    console.log("Error:", error);
  }
}

function* rootSaga() {
  yield takeEvery("FETCH_PLANTS", fetchPlantsSaga);
  yield takeEvery("ADD_PLANT", addPlantSaga);
  yield takeEvery("REMOVE_PLANT", removePlantSaga);
}

const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(logger, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
