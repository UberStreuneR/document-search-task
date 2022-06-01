import React from "react"; // Import main react library
import ReactDOM from "react-dom"; // Import react library for render react code
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App"; // Import react module App

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, // render application
  document.getElementById("root") // Where code render
);
