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

  static TestLogin(login) {
    if (/^[a-zA-Z1-9]+$/.test(login) === false) {
      return {
        message: 'В логине должны быть только латинские буквы',
        status: false,
      };
    }
    if (login.length < 4 || login.length > 20) {
      return {
        message: 'В логине должен быть от 4 до 20 символов',
        status: false,
      };
    }
    if (parseInt(login.substr(0, 1))) {
      return {
        message: 'Логин должен начинаться с буквы',
        status: false,
      };
    }
    return { status: true };
  }

  static PasswordTest(password) {
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    const mediumRegex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );
    if (strongRegex.test(password)) {
      return {
        message: 'Надежный пароль',
        status: true,
        color: 'green',
      };
    }
    if (mediumRegex.test(password)) {
      return {
        message: 'Средний пароль',
        status: true,
        color: 'orange',
      };
    }
    return {
      message: 'Слабый пароль',
      status: false,
    };
  }
}
