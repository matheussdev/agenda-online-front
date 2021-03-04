import React from "react";
import CardService from "../../components/CardService";
import NavBar from "../../components/NavBar";
import NavBarTop from "../../components/NavBarTop";
import api from "../../services/api";
import "./style.css";

import { Button, Form, Modal, InputGroup, FormControl } from "react-bootstrap";

export interface ServicesProps {}

export interface ServicesState {}

class Services extends React.Component<ServicesProps, ServicesState> {
  state = {
    show: false,
  };
  services: [];
  title: any;
  serviceModal: any;
  serviceTitle: any;
  priceService: any;
  durationH: any;
  descricaoService: any;
  durationM: any;
  id: any;
  /**
   *
   */
  constructor(props: ServicesProps | Readonly<ServicesProps>) {
    super(props);
    this.services = [];
    this.listar();
    this.serviceModal = {
      service: {
        title: "",
        price: 0,
        description: "",
      },
    };
  }

  listar() {
    api.defaults.headers.authorization = `Bearer ${localStorage.getItem(
      "token"
    )}`;
    api
      .get("/myservices")
      .then((response) => {
        const service = response.data;
        console.log(service);
        this.services = service;
        this.setState({ service });
        return service;
      })
      .catch((err) => {
        console.error(err);
        return window.location.replace("/login");
      });
  }

  handleClose() {
    this.setState({ show: false });
  }
  modalUpdate(id: any) {
    this.id=id
    api.defaults.headers.authorization = `Bearer ${localStorage.getItem(
      "token"
    )}`;
    api
      .get("/services/list/" + id)
      .then((response) => {
        const service: any = response.data;
        this.serviceModal = service;
        // console.log(this.serviceModal.service.title);
        this.setState({ show: true });
        // this.services = service;
        // this.setState({ service });
        // return service;
      })
      .catch((err) => {
        return err;
      });
  }
  modalDelete(id: any) {
    this.id=id
    if(window.confirm('você tem certeza que deseja excluir este serviço?')){
      api.defaults.headers.authorization = `Bearer ${localStorage.getItem(
        "token"
      )}`;
      api
        .delete("/delete/service/" + id)
        .then((response) => {
          // console.log(this.serviceModal.service.title);
          this.listar()
          // this.services = service;
          // this.setState({ service });
          // return service;
        })
        .catch((err) => {
          return err;
        });
    }
  }
  _addTitle(evento: any) {
    this.serviceModal.service.title = evento.target.value;
  }
  _addPrice(evento: any) {
    this.serviceModal.service.price = evento.target.value;
  }
  _addhous(evento: any) {
    this.durationH = (Number(evento.target.value) * 3600000);
  }
  _addminutes(evento: any) {
    this.durationM = (Number(evento.target.value) * 60000);
  }
  _addDescription(evento: any) {
    this.serviceModal.service.description = evento.target.value;
  }
  async _addService() {
    this.serviceModal.service.duration = this.durationH + this.durationM
    const newService:any = this.serviceModal.service
    api.defaults.headers.authorization = `Bearer ${localStorage.getItem(
      "token"
    )}`;
    // alert(this.serviceTitle+ this.priceService+ this.descricaoService + " "+ this.duration );
    await api
      .put(`/update/service/${this.id}`, newService )
      .then((res) => {
        this.listar()
        this.setState({show:false})
      }).catch(err=>console.log(err))


  }

  render() {
    return (
      <div>
        <NavBarTop></NavBarTop>
        <section className="screen-full">
          <NavBar></NavBar>
          <div className="viseble-section">
            <h1>Meus Serviços</h1>

            <ol id="list-all-services">
              {this.services.map((services: any, index: any) => (
                // eslint-disable-next-line
                <li key={index}>
                  {}
                  <CardService
                    titulo={services.title}
                    preco={services.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                    duracao={`${
                      String(services.duration / 3600000).split(".")[0]
                    }H${(services.duration / 60000) % 60}Min`}
                    // duracao={services.duration}
                    descricao={services.description}
                    status={services.status ? "Ativo" : "Inativo"}
                    id={services._id}
                    modalUpdate={this.modalUpdate.bind(this)}
                    modalDelete={this.modalDelete.bind(this)}

                  />
                </li>
              ))}
            </ol>
            <p className="copyright">powered by Matheus Souza</p>
          </div>
          <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Serviço</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Label>Título</Form.Label>
                <InputGroup>
                  <FormControl
                    onChange={this._addTitle.bind(this)}
                    type="text"
                    placeholder="Titulo do serviço"
                    defaultValue={this.serviceModal.service.title}
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
                    defaultValue={this.serviceModal.service.price}
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
                    defaultValue={Number(
                      String(
                        this.serviceModal.service.duration / 3600000
                      ).split(".")[0]
                    )}
                  />
                  <span className="mr-3">Minutos:</span>
                  <FormControl
                    className="mr-5"
                    id="minutosInpt"
                    type="number"
                    placeholder="0"
                    onChange={this._addminutes.bind(this)}
                    defaultValue={(this.serviceModal.service.duration / 60000) % 60}
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
                    defaultValue={this.serviceModal.service.description}
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
              Salvar
            </Button>
            </Modal.Footer>
          </Modal>
        </section>
      </div>
    );
  }
}

export default Services;
