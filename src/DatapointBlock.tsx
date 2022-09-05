import React from "react";
import { createRandomId } from "./utils";

/**
 * these are the properties that the object will have
 */
interface DatapointBlock {
  key: string;
  state: {
    type?: DatapointTypes;
    end?: number;
  };
}

/**
 * these are the types of functions the peapod can use to control its environment
 */
enum DatapointTypes {
  PIECEWISE = "piecewise",
  PERIODIC = "periodic",
}

/**
 * these are the expected props that can be passed into the object
 */
interface DatapointBlockProps {
  type?: DatapointTypes;
  end?: number;
  id: string;
}

class DatapointBlock extends React.Component {
  /**
   * this object is meant to plan out how some datapoint will be controlled
   * @param props the props to be used in the object
   */
  constructor(props: DatapointBlockProps) {
    super(props);

    this.key = props.id;

    this.state = {
      type: props.type,
      end: props.end,
    };

    /// binding functions for react
    this.createType.bind(this);
    this.createOptions.bind(this);
    this.updateType.bind(this);
  }

  /**
   * this function updated the internal state of the object
   * @param event this is the option the user selected
   */
  updateType(event: any) {
    console.log(
      `changed the state from ${this.state.type} to ${event.target.value}`
    );
    this.setState({ type: event.target.value });
  }

  /**
   * this is a helper function to turn all the
   * available function types into <option> tags
   */
  createOptions() {
    return Object.keys(DatapointTypes).map((type) => {
      return <option value={type}>{type.toLowerCase()}</option>;
    });
  }

  /**
   * this function builds a <select> object with options the user can
   * choose. these options dictate how the datapoint will change
   */
  createType() {
    // creating some random ids
    let labelId = createRandomId();
    let selectId = createRandomId();

    // returning the newly made label
    return (
      <>
        <label htmlFor={"select" + labelId}>Type:</label>
        <select
          onSelect={this.updateType}
          name={"select" + labelId}
          id={selectId}
        >
          {this.createOptions()}
        </select>
      </>
    );
  }

  createEnd() {
    return <p>some text</p>;
  }

  createValues() {}

  /**
   * this function renders the HTML contents of the DatapointBlock
   */
  render() {
    return (
      <tr key={this.key}>
        <td>{this.createType()}</td>
        <td>{this.createEnd()}</td>
      </tr>
    );
  }
}

export default DatapointBlock;
