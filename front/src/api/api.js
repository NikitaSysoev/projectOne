import axios from 'axios';

class api {
  static hello() {
    return axios('http://localhost:8080/api/hello')
      .then(res => res.data)
      .then(data => data.message);
  }

  static async getUsers() {
    const res = await axios('http://localhost:8080/api/users');
    const { data } = await res;
    return data;
  }

  static async getUserById(id) {
    const res = await axios(`http://localhost:8080/api/users/${id}`);
    const { data } = await res;
    return data;
  }

  static async addUser(id, name) {
    await axios.post('http://localhost:8080/api/users', {
      _id: id,
      name,
    });
    return true;
  }
}

export default api;
