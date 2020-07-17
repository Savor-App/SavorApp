import React, {Component} from 'react';
import {Provider} from "react-redux";
import store from "./src/store";
import Boot from "./src/Boot";
export default class App extends Component  {

    render() {
        return (
            <Provider store={store}>
                <Boot />
            </Provider>
        );
    }
}