class api {
  static hello() {
    return fetch('http://localhost:8080/hello')
      .then(res => res.json())
      .then(data => data.message);
  }
}

export default api;
