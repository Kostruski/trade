
import React, { Component } from "react";
import SpxVolreset from "./charts/spxVolreset"


export default class Section1 extends Component {
  render() {
    return (
      <div className="sectionWrapper">
            <SpxVolreset data={this.props.data} />
      </div>
    );
  }
}
