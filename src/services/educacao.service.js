import axios from "@/services/api.js";

class EducacaoService {
  create(data) {
    return axios.post("/educacao", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  getEducacao(id) {
    return axios.get(`/educacao/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  update(data) {
    return axios.put("/educacao", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  delete(id) {
    return axios.delete(`/educacao/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }  

  getEducacaos(prop){
    return axios.get(`/educacaos/${prop}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  //******************** */

  getDets(ed){
    return axios.get(`/educacao_dets/${ed}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  createDet(data) {
    return axios.post("/educacao_det", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  getDet(id) {
    return axios.get(`/educacao_det/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  updateDet(data) {
    return axios.put("/educacao_det", data)
    .then(response => {
      return response;

       
    },
    (error) => {
      return error.response.data;
    })
  }

  deleteDet(id) {
    return axios.delete(`/educacao_det/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }  

  /**************** */

  postFotos(data) {
    return axios.post("/fotos", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })   
  }

  getFoto(foto) {
    return axios.get(`/foto/${foto}`,{ responseType: "blob" })
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  delFoto(foto, id) {
    return axios.delete(`/foto/${foto}/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

}

export default new EducacaoService();