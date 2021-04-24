import React, { Component } from "react";
import axios from "axios";
export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: "",
    };
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
    };
    axios
      .post("http://127.0.0.1:8080/user/add", user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        if (err) {
          const username = document.getElementById("username");
          username.style.border = "2px solid red";
        }
      });
    this.setState({ username: "" });
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="username">UserName:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group"></div>
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </form>
      </div>
    );
  }
}
