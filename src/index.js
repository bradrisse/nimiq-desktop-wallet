import React from 'react';
import ReactDOM, { render } from 'react-dom';
import App from './components/App';
import reducers from "./ducks/combine";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import theme from './theme'
import registerServiceWorker from "./registerServiceWorker";
import './i18n';


// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div');
root.id = "root";
document.body.appendChild( root );
let store = null;

store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={createMuiTheme(theme)}>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
