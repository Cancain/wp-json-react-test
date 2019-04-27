import React, { Component } from "react";
import axios from "axios";

export class Books extends Component {
  state = {
    books: [],
    isLoaded: false
  };

  componentDidMount() {
    axios
      .get("http://localhost:8000/wp-json/wp/v2/books")
      .then(res =>
        this.setState({
          books: res.data,
          isLoaded: true
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state);
    return <div />;
  }
}

export default Books;
