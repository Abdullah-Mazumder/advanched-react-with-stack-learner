import React, { Component } from "react";

class Pagination extends Component {
  state = {
    isEditable: false,
    value: 1
  };

  handleChange = value => {
    this.setState({value: value})
  }

  componentDidMount = () => {
    this.setState({
      value: this.props.currentPage
    })
  }

  render() {
    const {
      currentPage,
      totalPage,
      next,
      prev,
      isPrev,
      isNext,
      setCurentPage,
    } = this.props;
    return (
      <div className="d-flex my-5 align-items-center">
        <button
          disabled={!isPrev}
          className="btn btn-warning"
          onClick={() => {
            prev();
          }}
        >
          Previous
        </button>
        <div className="flex-grow-1 text-center">
          {this.state.isEditable ? (
            <input
              type="number"
              value={this.state.value}
              onChange={e => {
                this.handleChange(e.target.value)
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  this.setState({ isEditable: false });
                  setCurentPage(e.target.value);
                }
              }}
            />
          ) : (
            <p
              style={{ userSelect: "none", lineHeight: "1.1" }}
              title="Double Tap to Jump Page"
              onDoubleClick={() => {
                this.setState({ isEditable: !this.state.isEditable });
              }}
            >
              {currentPage} of {totalPage}
              <br />
              <small>Double Tap to Edit</small>
            </p>
          )}
        </div>
        <button
          disabled={!isNext}
          className="btn btn-warning"
          style={{ marginLeft: "auto" }}
          onClick={() => {
            next();
          }}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Pagination;
