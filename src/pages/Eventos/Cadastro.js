import React, { Component } from "react";
import Rodape from '../../Components/Rodape/Rodape';
import logo from '../../assets/img/icon-login.png';
import Axios from "axios";

class Cadastro extends Component{
    constructor(){
        //Chamar a classe que está herdando
        super();

        this.state = {
            titulo: '',
            acessoLivre:'',
            tipoEventoId: '',
            descricao:'',
            data:'',
            listaTiposEventos: []
        }
    }

    atualizaEstadoTitulo (event){
        this.setState({titulo: event.target.value});
    }

    atualizaEstadoDescricao(event){
        this.setState({descricao: event.target.value});
    }

    atualizaEstadoData(event){
        this.setState({data: event.target.value});
    }

    atualizaEstadoTipoEventoId(event){
        this.setState({tipoEventoId: event.target.value});
    }
    atualizaEstadoAcessoLivre(event){
       
            this.setState({acessoLivre: event.target.value});
        
    }

    
    componentDidMount(){
        this.carregarTipoEvento();
    }

    cadastraEvento(event){
        event.preventDefault();
            
        Axios.post('http://localhost:5000/api/eventos', {
            titulo: this.state.titulo,
                descricao: this.state.descricao,
                tipoEventoId:this.state.tipoEventoId,
                dataEvento: this.state.data,
                instituicaoId: 19,
                acessoLivre: this.state.acessoLivre
        })
        .then( data => { if(data.status ===200){
    console.log(data + "Evento cadastrado com sucesso!");
        }  else{
            alert("Dados preenchidos incorretamente")
        }})
        .catch(erro => console.log(erro))
       
    }
  
        carregarTipoEvento(){
                    fetch('http://localhost:5000/api/tiposeventos')
                    .then(resposta => resposta.json())
                    //Setar o estado, atualizar o valor por isso setState e pega a lista e coloca a data
                    .then(data => this.setState({listaTiposEventos : data}))
                    .catch(erro => console.log(erro))
        }
    render(){
        return(
          
          <div>  <header className="cabecalhoPrincipal">
          <div className="container">
            <img src={logo} />
      
            <nav className="cabecalhoPrincipal-nav">
              Administrador
            </nav>
          </div>
        </header>

  <main className="conteudoPrincipal">
    <section className="conteudoPrincipal-cadastro">
      <h1 className="conteudoPrincipal-cadastro-titulo">Eventos</h1>
      <div className="container" id="conteudoPrincipal-lista">

        <table id="tabela-lista">
          <thead>
            <tr>
              <th>#</th>
              <th>Evento</th>
              <th>Data</th>
              <th>Acesso Livre</th>
              <th>Tipo do Evento</th>
            </tr>
          </thead>

          <tbody id="tabela-lista-corpo"></tbody>
        </table>

      </div>
            <form onSubmit={this.cadastraEvento.bind(this)}>
                
      <div className="container" id="conteudoPrincipal-cadastro">
        <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>
        <div className="container">

          <input type="text" id="evento__titulo" value={this.state.titulo} onChange={this.atualizaEstadoTitulo.bind(this)} placeholder="título do evento" />
          <input type="date" id="evento__data" value={this.state.data}  onChange={this.atualizaEstadoData.bind(this)} placeholder="dd/MM/yyyy" />
          <select id="option__acessolivre" value={this.state.acessoLivre} onChange={this.atualizaEstadoAcessoLivre.bind(this)}>
            <option value="1">Livre</option>
            <option value="0">Restrito</option>
          </select>
          <select id="option__tipoevento" value={this.state.tipoEventoId}  onChange={this.atualizaEstadoTipoEventoId.bind(this)}>
            <option value="0" disabled>Selecione:</option> 
            {
                // retornando os tipos de eventos armazenados na array                
                    this.state.listaTiposEventos.map((element) => {
                    return <option key={element.id} value={element.id}>{element.nome}</option>
                })
            }
          </select>
          <textarea rows="3" cols="50" placeholder="descrição do evento" value={this.state.descricao}  onChange={this.atualizaEstadoDescricao.bind(this) }id="evento__descricao"></textarea>

        </div>
        <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
         >Cadastrar</button>
      </div>
            </form>
    </section>
  </main>
  <Rodape />
  </div>


        );
    }
}

export default Cadastro;