import React from "react";
import { Provider } from "react-redux";
import "./assets/css/styles.css";
import AppNavigator from "./components/AppNavigator";
import store from "./rematch";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <AppNavigator />
      </div>
    </Provider>
  );
}

export default App;
