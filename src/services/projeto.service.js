import axios from "@/services/api.js";

class ProjetoService {
  create(data) {
    return axios.post("/projeto", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  getProjeto(id) {
    return axios.get(`/projeto/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  update(data) {
    return axios.put("/projeto", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  delete(id) {
    return axios.delete(`/projeto/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }  

  getProjetos(filter){
    return axios.get(`/projetos/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  getProjetosCombo(mun){
    return axios.get(`/projetoscombo/${mun}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  //******************** */

  getFases(proj){
    return axios.get(`/fases/${proj}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  createFase(data) {
    return axios.post("/fase", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  getFase(id) {
    return axios.get(`/fase/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  updateFase(data) {
    return axios.put("/fase", data)
    .then(response => {
      return response;

       
    },
    (error) => {
      return error.response.data;
    })
  }

  deleteFase(id) {
    return axios.delete(`/fase/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }  

  getFasesCombo(proj){
    return axios.get(`/fasescombo/${proj}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }
  
}

export default new ProjetoService();