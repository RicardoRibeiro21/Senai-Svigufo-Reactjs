import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import './index.css';
import App from './pages/Home/App';
import * as serviceWorker from './serviceWorker';
import TiposEventos from './pages/TiposEventos/TiposEventos';
import NaoEncontrada from './pages/NaoEncontrada/NaoEncontrada';
import Login from './pages/Login/login';
import {usuarioAutenticado} from './services/autenticacao'

//Criando permissão                      Resto das minhas propriedades
const Permissao = ( {component : Component}, {...rest} ) => (
    <Route
      {...rest}
      render = {props => usuarioAutenticado() ?
        //Verificando o usuario ou redirecionando 
    (<Component {...props} /> ) :
     (<Redirect to={ { pathname : "/login" } } />)
      } 
      />
);
//Criando as rotas
const rotas = (
    <Router>
        <div>
            <Switch>
            {/* Quando for exatamente barra ele mudar o caminho. */}
           <Route exact path="/" component={App} /> 
           <Permissao path="/tiposeventos" component={TiposEventos}></Permissao>
           <Route path="/login" component={Login}></Route>
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
