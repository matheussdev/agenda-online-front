import React from "react";

import { Button, Form, Modal, InputGroup, FormControl } from "react-bootstrap";
import api from "../../services/api";


export interface ServiceMenuProps {}

export interface ServiceMenuState {
  show:Boolean;
  user:Object;
}

class ServiceMenu extends React.Component<ServiceMenuProps, ServiceMenuState> {
  user: any;
  serviceTitle: any;
  priceService: any;
  descricaoService: any;
  duration: number;
  durationH: number ;
  durationM: number ;
  constructor(props: ServiceMenuProps | Readonly<ServiceMenuProps>) {
    super(props);
    this.state = {
      user: {},
      show: false,
    };
    this.serviceTitle = "";
    this.priceService = "";
    this.descricaoService = "";
    this.duration = 0
    this.durationH = 0;
    this.durationM = 0;
  }

  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }

  async _addService() {
    const title = this.serviceTitle;
    const description = this.descricaoService;
    const price = this.priceService;
    const duration = this.durationH + this.durationM;
    api.defaults.headers.authorization = `Bearer ${localStorage.getItem(
      "token"
    )}`;
    await api
      .post(`/register/service`, { title, description, price, duration})
      .then((res) => {
        this.setState({show:false})
      }).catch(err=>console.log(err))


  }
  _addTitle(evento: any) {
    this.serviceTitle = evento.target.value;
  }
  _addPrice(evento: any) {
    this.priceService = evento.target.value;
  }
  _addhous(evento: any) {
    this.durationH = (Number(evento.target.value) * 3600000);
  }
  _addminutes(evento: any) {
    this.durationM = (Number(evento.target.value) * 60000);
  }
  _addDescription(evento: any) {
    this.descricaoService = evento.target.value;
  }

  render() {
    return (
      <>
        <h3>Serviços</h3>
        <div id="list-service">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          onClick={this.handleShow.bind(this)}
        >
          Adicionar novo Serviço
        </button>
        <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Serviço</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Label>Título</Form.Label>
              <InputGroup>
                <FormControl
                  onChange={this._addTitle.bind(this)}
                  type="text"
                  placeholder="Titulo do serviço"
                />
              </InputGroup>
              <Form.Text className="text-muted mb-4">
                Informe um Título para este serviço
              </Form.Text>
              <Form.Label>Preço</Form.Label>
              <InputGroup>
                <FormControl
                  id="price-service"
                  onChange={this._addPrice.bind(this)}
                  type="text"
                  placeholder="R$ 00,00"
                />
              </InputGroup>
              <Form.Text className="text-muted mb-4">
                Informa um preço em R$ para se realizar este serviço
              </Form.Text>
              <Form.Label>Duração</Form.Label>
              <InputGroup>
                <span className="mr-3">Horas: </span>
                <FormControl
                  className="mr-5"
                  id="horasInpt"
                  onChange={this._addhous.bind(this)}
                  type="number"
                  placeholder="0"
                />
                <span className="mr-3">Minutos:</span>
                <FormControl
                  className="mr-5"
                  id="minutosInpt"
                  type="number"
                  placeholder="0"
                  onChange={this._addminutes.bind(this)}
                />
              </InputGroup>
              <Form.Text className="text-muted mb-4">
                Informe o tempo em horas e minutos para concluir este serviço
              </Form.Text>
              <Form.Label>Descrição</Form.Label>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Descrição"
                  onChange={this._addDescription.bind(this)}
                />
              </InputGroup>
              <Form.Text className="text-muted">
                Detalhe seu serviço nesta descrição
              </Form.Text>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose.bind(this)}>
              voltar
            </Button>
            <Button variant="success" onClick={this._addService.bind(this)}>
              Adicionar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ServiceMenu;
