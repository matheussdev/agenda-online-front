import { faExternalLinkAlt, faSave, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import NavBar from "../../components/NavBar";
import NavBarTop from "../../components/NavBarTop";
import api from "../../services/api";
import "./style.css";
export interface ProfileProps {}

export interface ProfileState {}

class Profile extends React.Component<ProfileProps, ProfileState> {
  user: {
    company_name: string;
    username: string;
    email:string;
    whatsapp:string;
    company_link:string;
    adress:string;
    CEP:string;
    bio:string
  };
  constructor(props: ProfileProps | Readonly<ProfileProps>) {
    super(props);
    this.user = {
      company_name: "",
      username: "",
      email:'',
      whatsapp:"",
      company_link:"",
      adress:"",
      CEP:"",
      bio:''
    };
    this.listar();
  }

  listar() {
    api.defaults.headers.authorization = `Bearer ${localStorage.getItem(
      "token"
    )}`;
    api
      .get(`/admin/app`)
      .then((response) => {
        const user: any = response.data;
        this.user = user;
        console.log(this.user);
        this.setState({ user });
        return user;
      })
      .catch((err) => {
        console.error(err);
        return window.location.replace("/login");
      });
  }

  edit(){
    let x = window.confirm('tem certeza que deseja alterar seu perfil');
    if(x){
    api.defaults.headers.authorization = `Bearer ${localStorage.getItem(
      "token"
    )}`;
    api
      .put(`/update`, this.user)
      .then((response) => {
        window.location.reload()
      })
      .catch((err) => {
        console.error(err);
        return window.location.replace("/login");
      });}
  }

  changeCompName(evento:any){
    this.user.company_name = evento.target.value;
  }
  changeUserame(evento:any){
    this.user.username = evento.target.value;
  }
  changeEmail(evento:any){
    this.user.email = evento.target.value;
  }
  changeWhatsapp(evento:any){
    this.user.whatsapp = evento.target.value;
  }
  changeCompLink(evento:any){
    let novaString:string=""
    for(let i of evento.target.value){
      if(i == " "){
        i="-"
      }
      novaString += i
      // evento.target.value[i]="0"
    }
    // if(evento.target.value.length)
    // console.log(evento.target.value.length)
    // console.log(novaString)
    // evento.taget.value=novaString
    this.user.company_link = evento.target.value;
  }

  render() {
    return (
      <div>
        <NavBarTop></NavBarTop>
        <section className="screen-full">
          <NavBar></NavBar>
          <div className="viseble-section">
            <h1>Meu Perfil</h1>
            <div id="field-profile">
              <div className="profile-left">
                <h1 className="image-company">🏬</h1>
                <h1 className="company-name">{this.user.company_name}</h1>
              </div>
              <div className="profile-right">
                <div className="profile-form">
                  <Form>
                    <div className="group-two">
                      <div className="group-two2">
                        <Form.Label>Nome da compania</Form.Label>
                        <InputGroup>
                          <FormControl
                            // onChange={this._addTitle.bind(this)}
                            type="text"
                            placeholder=""
                            defaultValue={this.user.company_name}
                            onChange={this.changeCompName.bind(this)}
                          />
                        </InputGroup>
                      </div>
                      <div className="group-two2">
                        <Form.Label>Username</Form.Label>
                        <InputGroup>
                          <FormControl
                            // onChange={this._addTitle.bind(this)}
                            type="text"
                            placeholder=""
                            defaultValue={this.user.username}
                            onChange={this.changeUserame.bind(this)}

                          />
                        </InputGroup>
                      </div>
                    </div>
                    <div className="group-two">
                      <div className="group-two2">
                        <Form.Label>E-mail</Form.Label>
                        <InputGroup>
                          <FormControl
                            // onChange={this._addTitle.bind(this)}
                            type="text"
                            placeholder=""
                            defaultValue={this.user.email}
                            onChange={this.changeEmail.bind(this)}

                          />
                        </InputGroup>
                      </div>
                      <div className="group-two2">
                        <Form.Label>WhatsApp</Form.Label>
                        <InputGroup>
                          <FormControl
                            // onChange={this._addTitle.bind(this)}
                            type="tel"
                            placeholder=""
                            defaultValue={this.user.whatsapp}
                            onChange={this.changeWhatsapp.bind(this)}
                          />
                        </InputGroup>
                      </div>
                    </div>
                    <div className="link-two">
                      <Form.Label>Link da sua página</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon3">
                            https://agendaonline.com/
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          id="basic-url"
                          aria-describedby="basic-addon3"
                          defaultValue={this.user.company_link}
                          onChange={this.changeCompLink.bind(this)}
                        />
                      </InputGroup>
                    </div>
                    <div className="group-two">
                      <div className="group-two2">
                        <Form.Label>Endereço</Form.Label>
                        <InputGroup>
                          <FormControl
                            // onChange={this._addTitle.bind(this)}
                            type="text"
                            placeholder=""
                            defaultValue={this.user.adress}
                          />
                        </InputGroup>
                      </div>
                      <div className="group-two2">
                        <Form.Label>CEP</Form.Label>
                        <InputGroup>
                          <FormControl
                            // onChange={this._addTitle.bind(this)}
                            type="text"
                            placeholder=""
                            defaultValue={this.user.CEP}
                          />
                        </InputGroup>
                      </div>
                    </div>
                    <div className="group-two">
                      <div className="group-two2">
                        <Form.Label>Horário de Abertura</Form.Label>
                        <InputGroup>
                          <FormControl
                            // onChange={this._addTitle.bind(this)}
                            type="time"
                            placeholder=""
                            // defaultValue={this.serviceModal.service.title}
                          />
                        </InputGroup>
                      </div>
                      <div className="group-two2">
                        <Form.Label>Horário de encerramento</Form.Label>
                        <InputGroup>
                          <FormControl
                            // onChange={this._addTitle.bind(this)}
                            type="time"
                            placeholder=""
                            // defaultValue={this.serviceModal.service.title}
                          />
                        </InputGroup>
                      </div>
                    </div>
                    <Form.Label>Biografia</Form.Label>
                    <InputGroup>
                      <FormControl
                        as="textarea"
                        aria-label="With textarea"
                        rows={7}
                        defaultValue={this.user.bio}

                      />
                    </InputGroup>
                  </Form>
                </div>
                <div className="profile-buttons">
                  <button className="btn btn-outline-danger btn-lg"><FontAwesomeIcon icon={faUserSlash} /> Desativar Meu perfil</button>
                  <button className="btn btn-primary btn-lg">Ver Página <FontAwesomeIcon icon={faExternalLinkAlt} /></button>
                  <button className="btn btn-success btn-lg" onClick={this.edit.bind(this)}>Salvar <FontAwesomeIcon icon={faSave} /></button>
                </div>
              </div>
            </div>
            <p className="copyright">powered by Matheus Souza</p>
          </div>
        </section>
      </div>
    );
  }
}

export default Profile;
