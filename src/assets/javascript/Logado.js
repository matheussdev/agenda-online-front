import api from "../../services/api";

class Logado{
  static listServices() {

  }

  listServices(){
    api.get('/myservices').then((response)=>{
      const service = response.data;
      console.log(service)
      return service
    }).catch((err)=>{
      return err
    })
  }
}

export default Logado;