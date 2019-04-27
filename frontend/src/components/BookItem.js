import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

export default class BookItem extends Component {
  state = {
    imageUrl: "",
    author: "",
    isLoaded: false
  };

  static propTypes = {
    book: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { featured_media, author } = this.props.book;
    const getImageUrl = axios.get(
      `http://localhost:8000/wp-json/wp/v2/media/${featured_media}`
    );
    const getAuthor = axios.get(
      `http://localhost:8000/wp-json/wp/v2/users/${author}`
    );

    Promise.all([getImageUrl, getAuthor]).then(res => {
      this.setState({
        imageUrl: res[0].data.media_details.sizes.full.source_url,
        author: res[1].data.name,
        isLoaded: true
      });
    });
  }

  render() {
    const { id, title, excerpt } = this.props.book;
    const { author, imageUrl, isLoaded } = this.state;

    if (isLoaded) {
      return (
        <div>
          <h2 style={{ marginBottom: "0" }}>{title.rendered}</h2>
          <small>
            review by: <strong>{author}</strong>
          </small>
          <img style={{ width: "50%" }} src={imageUrl} alt={title.rendered} />
          <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }} />
          <Link to={`/book/${id}`}>Read Review</Link>
          <hr />
        </div>
      );
    }
    return null;
  }
}
