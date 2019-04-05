import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import './index.css';
import App from './pages/Home/App';
import * as serviceWorker from './serviceWorker';
import TiposEventos from './pages/TiposEventos/TiposEventos';
import NaoEncontrada from './pages/NaoEncontrada/NaoEncontrada';

//Criando as rotas
const rotas = (
    <Router>
        <div>
            <Switch>
            {/* Quando for exatamente barra ele mudar o caminho. */}
           <Route exact path="/" component={App} /> 
           <Route path="/tiposeventos" component={TiposEventos}></Route>
           <Route component={NaoEncontrada}/>
           </Switch>
        </div>
    </Router>
);



ReactDOM.render(rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
