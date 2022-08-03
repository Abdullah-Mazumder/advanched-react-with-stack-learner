import React, { Component } from "react";
import shortid from "shortid";

import { newsCategory } from "../news/index";

export class Header extends Component {
  state = {
    searchTerm: "",
  };

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleKeyPress = () => {};

  render() {
    const { category } = this.props;
    return (
      <div className="my-4">
        <h1 className="mb-4" style={{ fontWeight: "300" }}>
          Block Bluster Headlines
        </h1>
        <input
          type="search"
          value={this.state.searchTerm}
          className="form-control"
          placeholder="Type anything and press enter to search"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <div className="my-4">
          {newsCategory &&
            Object.keys(newsCategory).map((item) => {
              if (category === newsCategory[item]) {
                return (
                  <button
                    onClick={() =>
                      this.props.changeCategory(newsCategory[item])
                    }
                    className="btn btn-sm  btn-warning mr-2 mb-2"
                    key={shortid.generate()}
                  >
                    {`#${newsCategory[item]}`}
                  </button>
                );
              }
              return (
                <button
                  onClick={() => this.props.changeCategory(newsCategory[item])}
                  key={shortid.generate()}
                  className="btn btn-sm  btn-light mr-2 mb-2"
                >
                  {`#${newsCategory[item]}`}
                </button>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Header;
