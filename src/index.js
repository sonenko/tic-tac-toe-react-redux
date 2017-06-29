import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import "./styles.scss";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import board from "./reducers/board";
import {createStore} from "redux";
import Game from "./Game";

injectTapEventPlugin();

const store = createStore(board);
const rootEl = document.getElementById(`app`);

const render = () => ReactDOM.render(
    <MuiThemeProvider>
        <Game st={store.getState()} dispatch={store.dispatch}/>
    </MuiThemeProvider>,
    rootEl
);

render();
store.subscribe(render);


