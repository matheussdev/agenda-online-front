import React from "react";
import "./style.css";

export interface CardServiceProps {
  titulo: string;
  preco: string;
  duracao: string;
  descricao: string;
  status: string;
  id: string;
  modalUpdate:any
  modalDelete:any
}

export interface CardServiceState {
  show: Boolean;
}

class CardService extends React.Component<CardServiceProps, CardServiceState> {
  user: any;
  serviceTitle: any;
  priceService: any;
  descricaoService: any;
  duration: number;
  durationH: number;
  durationM: number;
  constructor(props: CardServiceProps | Readonly<CardServiceProps>) {
    super(props);
    this.state = { show: false };
    this.serviceTitle = "";
    this.priceService = "";
    this.descricaoService = "";
    this.duration = 0;
    this.durationH = 0;
    this.durationM = 0;
  }

  handleShow() {
    this.setState({ show: true });
  }
  _addTitle(evento: any) {
    this.serviceTitle = evento.target.value;
  }
  _addPrice(evento: any) {
    this.priceService = evento.target.value;
  }
  _addhous(evento: any) {
    this.durationH = Number(evento.target.value) * 3600000;
  }
  _addminutes(evento: any) {
    this.durationM = Number(evento.target.value) * 60000;
  }
  _addDescription(evento: any) {
    this.descricaoService = evento.target.value;
  }
  _abrirUpdate(evento:any){
    evento.stopPropagation()
    this.props.modalUpdate(evento.target.id)
  }
  _abrirDelete(evento:any){
    evento.stopPropagation()
    this.props.modalDelete(evento.target.id)
  }
  render() {
    return (
      <div className="divadjust">

        <div className="info-service">
          <h3>
            Titulo:<span className="resp">{this.props.titulo}</span>
          </h3>
          <h3>
            Preço:<span className="resp">{this.props.preco}</span>
          </h3>
          <h3>
            Duração:<span className="resp">{this.props.duracao}</span>
          </h3>
          <h3>
            Descrição:<span className="resp">{this.props.descricao}</span>
          </h3>
          <h3>
            Status:<span className="resp">{this.props.status}</span>
          </h3>
        </div>
        <div className="control-card-service">
          <button id={this.props.id} className="primary" onClick={this._abrirUpdate.bind(this)}>Editar</button>
          <button id={this.props.id} className="danger" onClick={this._abrirDelete.bind(this)}>Excluir</button>
        </div>

        
      </div>
    );
  }
}

export default CardService;
