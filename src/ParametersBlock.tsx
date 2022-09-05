import React from "react";
import DatapointBlock from "./DatapointBlock";

/**
 * these are the properties that the object will have
 */
interface ParametersBlock {
  key: string;
  state: {
    datapoints: JSX.Element[];
  };
}

class ParametersBlock extends React.Component {
  /**
   * this object controls the datapoints the user would like to have in
   * their schedule
   */
  constructor() {
    super({});

    this.key = (Math.random() * 65535).toFixed();

    this.state = {
      datapoints: [],
    };

    /// binding functions for react

    this.renderDatapoints.bind(this);
    this.addDatapoint.bind(this);
  }

  /**
   * this function updates the object's internal state
   */
  renderDatapoints() {
    const { datapoints } = this.state;
    if (!datapoints) return null;
    return datapoints;
  }

  /**
   * this function appends new DatapointBlock objects to the object's state
   */
  addDatapoint() {
    // creating a new datapoint, but we need to add fields to it first
    const datapoint = (
      <DatapointBlock
        {...{ id: "datapoint_" + this.state.datapoints.length.toString() }}
      />
    );

    // optimization
    let newDatapoints: JSX.Element[];
    if (this.state.datapoints.length === 0) {
      newDatapoints = [datapoint];
    } else {
      newDatapoints = [...this.state.datapoints, datapoint];
    }

    this.setState({ datapoints: newDatapoints });
  }

  /**
   * this function renders the HTML contents of the ParametersBlock
   */
  render() {
    return (
      <>
        <button
          onClick={() => {
            // this has to be an arrow function
            this.addDatapoint();
          }}
        >
          Add a datapoint
        </button>
        <div id={"anchor" + this.key.toString()}>
          <table>
            <thead></thead>
            <tbody>{this.renderDatapoints()}</tbody>
          </table>
        </div>
      </>
    );
  }
}

export default ParametersBlock;
