import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercises extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangedescription = this.onChangedescription.bind(this);
    this.onChangeduration = this.onChangeduration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.userInput = null;

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };

    this.setuserInputRef = (ele) => {
      this.userInput = ele;
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/exercise/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:8080/user/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangedescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeduration(e) {
    this.setState({
      duration: e.target.value,
    });
  }
  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(this.props);
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
    axios
      .put(
        "http://localhost:8080/exercise/update/" + this.props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data));
    console.log(exercise);
    window.location = "/";
  }
  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="username">UserName:</label>
            <select
              ref={this.setuserInputRef}
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              className="form-control"
              required
              value={this.state.description}
              onChange={this.onChangedescription}
            />
          </div>
          <div className="form-group">
            <label htmlFor="duretion">Duretion(in minutes):</label>
            <input
              type="text"
              className="form-control"
              required
              value={this.state.duration}
              onChange={this.onChangeduration}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group"></div>
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </form>
      </div>
    );
  }
}
