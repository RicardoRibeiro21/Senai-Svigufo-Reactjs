import React, {Component} from 'react'
import '../../assets/css/login.css'
import Axios from 'axios';
import logo from '../../assets/img/icon-login.png';
class Login extends Component {
    constructor(){
        super();
        this.state = {
            email : "",
            senha : ""
        }
    }

    atualizaEstadoEmail(event) {
        //Alterar o estado de minha propriedade
        this.setState({email : event.target.value});
    }
    atualizaEstadoSenha(event) {
        //Alterar o estado de minha propriedade
        this.setState({senha : event.target.value});
    }
    efetualogin(event){
        event.preventDefault();
        // alert(this.state.email + " - " + this.state.senha);

        Axios.post('http://localhost:5000/api/Login', {
            email : this.state.email,
            senha : this.state.senha
        })
        .then(data => { if (data.status === 2000) 
            {
                console.log(data);
                //Armazenando as informações do usuário no local storage para ser utilizado futuramente
                localStorage.setItem("usuario-svigufo", data.data.token);
                //
                this.props.history.push("/tiposeventos")
            }
             else {
              alert("Email ou senha inválido");
              }
            })
        .catch(erro => {console.log(erro)
        this.setState({ erroMensagem : 'Email ou senha inválido'});
        }
        )
    }

        render(){
            return(
                <section className="container flex">
      <div className="img__login"><div className="img__overlay"></div></div>

      <div className="item__login">
        <div className="row">
          <div className="item">
            <img src={logo} className="icone-login" />
          </div>
          <div className="item" id="item__title">
            <p className="text__login" id="item__description">
              Bem-vindo! Faça login para acessar sua conta.
            </p>
          </div>
          <form onSubmit={this.efetualogin.bind(this)}>
            <div className="item">
              <input
                className="input__login"
                placeholder="username"
                type="text"
                value = {this.state.email}
                //Carregar as alterações 
                onChange={this.atualizaEstadoEmail.bind(this)}
                name="username"
                id="login__email"
              />
            </div>
            <div className="item">
              <input
                className="input__login"
                placeholder="password"
                type="password"
                value = {this.state.senha}
                onChange={this.atualizaEstadoSenha.bind(this)}
                name="password"
                id="login__password"
              />
            </div>
            {/* Estilizando com css  */}
            <p className="text-login"style={{color : "red", textAlign : 'center'}}>{this.state.erroMensagem}</p>
            <div className="item">
            <button className="btn btn__login" id="btn__login" onclick="minhaPrimeiraFuncao()"></button>
              <button className="btn btn__login" id="btn__login">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
            );
        }
}

export default Login;