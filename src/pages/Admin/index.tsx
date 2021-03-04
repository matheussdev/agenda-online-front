import React from "react";
import NavBar from "../../components/NavBar";
import NavBarTop from "../../components/NavBarTop";
import ServiceMenu from "../../components/ServiceMenu";
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
    this.duration = 0;

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

  render() {
    return (
      <div>
        <NavBarTop></NavBarTop>
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
                <ServiceMenu />
              </div>
            </div>
            <p className="copyright">powered by Matheus Souza</p>
          </div>
        </section>
      </div>
    );
  }
}

export default Admin;
