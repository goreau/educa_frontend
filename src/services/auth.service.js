import axios from "@/services/api.js";
import authHeader from './auth.header.js';

class AuthService {
    login(user) {
       return axios.post("/login", user)
        .then(response => {
          if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
          } 
    
          return response.data;
        },
        (error) => {
          throw new Error(error.data.msg);
       })
    }

    logout() {
      localStorage.removeItem('user');
    }

    register(data) {
      return axios.post("/user", data)
      .then(response => {
        return response;
      },
      (error) => {
        throw new Error(error.data.msg);
      });
    }

    list(id) {
     /* var headers = authHeader();
      headers['Content-Type'] = "application/json";
      var header = { headers: headers };*/

      return axios.get(`/users/${id}`)
      .then(response => {
        return response.data;
      })
    }

    update(data) {
      return axios.put("/user", data)
      .then(response => {
        return response.data;
      },
      (error) => {
        throw new Error(error.data.msg);
      });
    }

    firstAccess(data) {
      return axios.put("/firstaccess", data)
      .then(response => {
        return response.data;
      },
      (error) => {
        throw new Error(error.data.msg);
      });
    }

    edit(data) {
      return axios.put('/editUser', data)
      .then(response => {
        return response.data;
      },
      (error) => {
        return error.response.data;
      })
    }

    delete(id) {
      return axios.delete(`/user/${id}`)
      .then(response => {
        return response;
      },
      (error) => {
        return error.response.data;
      })
    }
  

    getUserData(id) {
      return axios.get(`/user/${id}` )
      .then(response => {
        return response;
      })
    }  
    
}

export default new AuthService();