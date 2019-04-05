import React, { Component} from 'react'

class Titulo extends Component{
    //Propriedades para usar o meu componente e passar diferentes valores para ele 
    constructor(props){
        super(props);
    }
    render(){
        return (<h1 className="conteudoPrincipal-cadastro-titulo">{this.props.titulo}</h1>);
    }
}

//Exportando component de titulo
export default Titulo;