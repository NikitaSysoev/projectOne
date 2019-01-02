import axios from 'axios';

export default class api {
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

  static async addUser(name) {
    const _id = await this.getRandomInt(100, 1000);
    await axios.post('http://localhost:8080/api/users', {
      _id,
      name,
    });
    return _id;
  }

  static updateUser(id, name) {
    return axios.put(`http://localhost:8080/api/users/${id}`, {
      name,
    });
  }

  static deleteUser(id) {
    return axios.delete(`http://localhost:8080/api/users/${id}`);
  }

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
