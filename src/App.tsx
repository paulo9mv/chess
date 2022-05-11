
import React, { useState } from "react";
import "./App.css"
import { useStore } from "./context";
import { Observer } from "mobx-react-lite"
import { Button, TextField } from "@material-ui/core";
import { StoreProps } from "./stores/game";
import Home from "./pages/home";

const App = () => {
    return (
        <Home />
    )
}

export default App