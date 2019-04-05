import React, {Component} from "react"

import logo from "../../assets/img/icon-login.png"; 

import '../../assets/css/flexbox.css';
import '../../assets/css/reset.css';
import '../../assets/css/login.css';
import '../../assets/css/style.css';



class TiposEventos extends Component{
  //Fazendo chamada na Api
  constructor(){
    super();
    //Estado do nosso componente, definimos nossos objetos dentro deste método
    this.state = {
      lista: [],
      nome: ""
  }
  //Quando ocorrer um evento, da um bind no método, assim ele atualiza o que está no contexto.
  this.atualizaEstadoNome = this.atualizaEstadoNome.bind(this);
  //Seta para fazer a ponte e dizer que está no mesmo contexto.
  this.cadastraTipoEvento = this.cadastraTipoEvento.bind(this);
}
    buscarTiposEventos(){
      fetch('http://localhost:5000/api/tiposeventos')
      .then(resposta => resposta.json())
      //Setar o estado, atualizar o valor por isso setState e pega a lista e coloca a data
      .then(data => this.setState({lista : data}))
      .catch(erro => console.log(erro))
  }

  //Fazer antes de renderizar a página
  componentDidMount(){
        this.buscarTiposEventos();
  }

  atualizaEstadoNome(event){
      //setando o nome e sabendo qual é
    this.setState({nome : event.target.value});
  }

  cadastraTipoEvento(event){
    //Evitando o carregamento do formulário quando cadastro
    event.preventDefault();
        fetch('http://localhost:5000/api/tiposeventos', 
          {
            method : 'POST',
            body : JSON.stringify({ nome: this.state.nome}),
            header:{
            "Content-Type" : "application/json" }            
          })
          .then(resposta => console.log(resposta))
          .then(this.buscarTiposEventos())
          .catch(erro => console.log(erro))
  }
  //renderizando o que queremos dentro da pagina
    render(){
        return (
            <div>
            <header className="cabecalhoPrincipal">
              <div className="container">
                <img src="./assets/img/icon-login.png" />
        
                <nav className="cabecalhoPrincipal-nav">
                  Administrador
                </nav>
              </div>
            </header>
        
            <main className="conteudoPrincipal">
              <section className="conteudoPrincipal-cadastro">
                <h1 className="conteudoPrincipal-cadastro-titulo">Tipos de Eventos</h1>
                <div className="container" id="conteudoPrincipal-lista">
                  <table id="tabela-lista">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Título</th>
                      {/* <th>Ação</th>  */}
                      </tr>
                    </thead>
        
                    <tbody>
                      {
                        this.state.lista.map(function(tiposeventos){
                          return (
                            <tr key={tiposeventos}>
                              <td>{tiposeventos.id}</td>
                              <td>{tiposeventos.nome}</td>
                            </tr>
                          );
                        })                      
                      }
                    </tbody>
                  </table>
                </div>
        
                <div className="container" id="conteudoPrincipal-cadastro">
                  <h2 className="conteudoPrincipal-cadastro-titulo">
                    Cadastrar Tipo de Evento
                  </h2>
                  <form onSubmit = {this.cadastraTipoEvento}>
                    <div className="container">
                              {/* Atualiza o estado do nome de um objeto */}
                      <input type="text" value={this.state.nome} onChange={this.atualizaEstadoNome} id="nome-tipo-evento" placeholder="tipo do evento" />
                      <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">
                        Cadastrar
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            </main>
        
            <footer className="rodapePrincipal">
              <section className="rodapePrincipal-patrocinadores">
                <div className="container">
                  <p>Escola SENAI de Informática - 2019</p>
                </div>
              </section>
            </footer>
          </div>
        );
    }
} 

export default TiposEventos;