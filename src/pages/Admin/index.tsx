import React from "react";
import { Button, Form, Modal, InputGroup, FormControl } from "react-bootstrap";
import NavBar from "../../components/NavBar";
import api from "../../services/api";
import "./style.css";
export interface AdminProps {}

export interface AdminState {
  show: Boolean;
  user: Object;
}

class Admin extends React.Component<AdminProps, AdminState> {
  company_name: any;
  // user:Object;

  user: any;
  serviceTitle: any;
  priceService: any;
  durationServiceH: any;
  durationminutesS: any;
  descricaoService: any;
  duration: number;
  constructor(props: AdminProps | Readonly<AdminProps>) {
    super(props);
    this.company_name = "";
    this.state = {
      user: {},
      show: false,
    };
    this.serviceTitle = "";
    this.priceService = "";
    this.descricaoService = "";
    this.duration = 0

    this.verifyToken();
  }

  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }

  async verifyToken() {
    api.defaults.headers.authorization = `Bearer ${localStorage.getItem(
      "token"
    )}`;
    await api
      .get(`/admin/app`)
      .then((res) => {
        const user: any = res.data;
        const novouser: any = { ...this.state.user, ...user };
        const newstate = { ...novouser, ...this.state.show };
        this.company_name = user.company_name;
        this.setState(newstate); // const newState = { user: resuser };
        // this.setState(newState);
        // this.setState((state) => ({ user: {...state.user, company_name:user.company_name} }));
      })
      .catch((err) => {
        console.log("não autorizado" + err);
        return window.location.replace("/login");
      });
  }

  atualizarfront() {
    //  this.setState(this.state)
  }
  async _addService() {
    const title = this.serviceTitle;
    const description = this.descricaoService;
    const price = this.priceService;
    const duration = this.duration;
    api.defaults.headers.authorization = `Bearer ${localStorage.getItem(
      "token"
    )}`;
    alert(this.serviceTitle+ this.priceService+ this.descricaoService + " "+ this.duration );
    await api
      .post(`/register/service`, { title, description, price, duration})
      .then((res) => {
        console.log(res.data)
      }).catch(err=>console.log(err))


  }
  _addTitle(evento: any) {
    this.serviceTitle = evento.target.value;
  }
  _addPrice(evento: any) {
    this.priceService = evento.target.value;
  }
  _addhous(evento: any) {
    this.duration += (evento.target.value * 3600000);
  }
  _addminutes(evento: any) {
    this.duration += (evento.target.value * 60000);
  }
  _addDescription(evento: any) {
    this.descricaoService = evento.target.value;
  }

  render() {
    return (
      <section className="screen-full">
        <NavBar></NavBar>
        <div className="viseble-section">
          <h1>{this.company_name}</h1>
          <div className="cards-menu-top">
            <div className="card-menu">hello</div>
            <div className="card-menu">hello</div>
          </div>
          <div className="cards-menu-down">
            <div className="card-menu">Sua Agenda Hoje</div>
            <div className="card-menu">Agendamentos</div>
            <div className="card-menu">
              <h3>Serviços</h3>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                onClick={this.handleShow.bind(this)}
              >
                Launch demo modal
              </button>
            </div>
          </div>
          <p className="copyright">powered by Matheus Souza</p>
        </div>
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
      </section>
    );
  }
}

export default Admin;
