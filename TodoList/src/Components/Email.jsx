import React, { Component } from "react";
import "../assets/styleinput.scss";

export class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailUser: "",
    };
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.onEmailSubmit(this.state.emailUser);
  };
  handleChange = (e) => {
    this.setState({
      emailUser: e.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="email"
          type="email"
          placeholder="Vui lòng nhập email để tiếp tục"
          value={this.state.emailUser}
          onChange={this.handleChange}
        />
        <div className="action">
          <button className="cancel">Hủy</button>

          <button className="ok" type="submit">
            Gửi
          </button>
        </div>
        <div> Email Demo: Minhpham0322@gmail.com</div>
      </form>
    );
  }
}

export default Email;
