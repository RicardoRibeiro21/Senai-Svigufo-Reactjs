import React, {Component} from "react"
import '../../assets/css/flexbox.css';
import '../../assets/css/reset.css';
import '../../assets/css/login.css';
import '../../assets/css/style.css';
import Rodape from "../../Components/Rodape/Rodape";

import Titulo from '../../Components/Titulo'


class TiposEventos extends Component{
  //Fazendo chamada na Api
  constructor(){
    super();
    //Estado do nosso componente, definimos nossos objetos dentro deste método
    this.state = {
      lista: [],
      nome: "",
      tituloPagina : "Lista Tipos de Eventos"
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
    event.preventDefault();
    
    fetch('http://localhost:5000/api/tiposeventos',
        {
          method: 'POST',
          body : JSON.stringify({ nome : this.state.nome }),
          headers: {
            "Content-Type" : "application/json"
          }
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
                <Titulo titulo = {this.state.tituloPagina}/>
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
                        this.state.lista.map(function(tipoevento){
                          return (
                            <tr key={tipoevento.id}>
                              <td>{tipoevento.id}</td>
                              <td>{tipoevento.nome}</td>
                            </tr>
                          );
                        })                      
                      }
                    </tbody>
                  </table>
                </div>
        
                <div className="container" id="conteudoPrincipal-cadastro">
                  {/* <h2 className="conteudoPrincipal-cadastro-titulo">
                    Cadastrar Tipo de Evento
                  </h2> */}
                  
                  <Titulo titulo="Cadastrar Tipo de Evento" />
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
              <Rodape />
              </div>
        
        );
    }
} 

export default TiposEventos;