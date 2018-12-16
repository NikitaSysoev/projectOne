class api {
  static hello() {
    return fetch('http://localhost:8080/api/hello')
      .then(res => res.json())
      .then(data => data.message);
  }

  static getUsers() {
    return fetch('http://localhost:8080/api/users')
      .then(res => res.json());
  }
}

export default api;
