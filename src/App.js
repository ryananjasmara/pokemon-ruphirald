import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/css/styles.css";
import AppNavigator from "./components/AppNavigator";

function App() {
  return (
    <div className="app">
      <AppNavigator />
    </div>
  );
}

export default App;
