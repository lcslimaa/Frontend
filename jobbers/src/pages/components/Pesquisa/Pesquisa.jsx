import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../css/pesquisa.css";
import axios from "axios";
import UsuarioPesquisado from "../UsuarioPesquisado/UsuarioPesquisado";
export default class Pesquisa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      servico: "",
      prestadores: [],
      data: [],
      teste: ''
    };
  }

  handleChange = event => {
    let state = Object.assign({}, this.state);
    let field = event.target.id;
    state[field] = event.target.value;
    this.setState(state);
  };

  apagarPrestadores = () => {
    let state = Object.assign({}, this.state);
    state.prestadores = [];
    this.setState(state);
  }

  pesquisar = async e => {
    e.preventDefault()
    this.apagarPrestadores()
    let url = "http://localhost:8080/prestador/servico/" + this.state.servico;

    axios
      .get(url)
      .then(res => {
        let state = Object.assign({}, this.state);
        for (let i = 0; i < res.data.length; i++) {
          state.prestadores.push(
            <UsuarioPesquisado
              change={this.props.change}
              id={res.data[i].id}
              nome={res.data[i].nome}
              servico={res.data[i].tipo_servico}
              cidade={res.data[i].cidade}
              estado={res.data[i].estado}
            />
          );
        }
        this.setState(state);
        console.log(this.state.prestadores)
        e.preventDefault();
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="p-3 mt-3 divPesquisa display-4">
          <div className="display-4 divPosicion">
            <form
              onSubmit={e => {
                this.pesquisar(e);
              }}
            >
              <input
                type="texto"
                className="inputPesquisa"
                id="servico"
                onChange={e => this.handleChange(e)}
              ></input>
              <button className="pesquisar">
                <span>Pesquisar</span>
              </button>
            </form>
          </div>
        </div>
        <div className="mt-10 mb-4">
          {this.state.prestadores}
        </div>
      </React.Fragment>
    );
  }
}
