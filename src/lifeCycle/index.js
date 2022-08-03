import React from "react";

class LifeCycle extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
    console.log("constructor called");
    this.divRef = React.createRef();
  }

  componentDidMount = () => {
    console.log("componentDidMount called");
  };

  componentDidUpdate = () => {
    console.log("componentDidUpdate called");
  };

  getSnapshotBeforeUpdate = () => {};

  render() {
    console.log("render called");
    return (
      <div ref={this.divRef}>
        <h3>React lifecycle methods</h3>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increement
        </button>
      </div>
    );
  }
}

export default LifeCycle;
