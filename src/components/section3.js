
import React, { Component } from "react";
import Macro_Fx from "./charts/macro_Fx.js"


export default class Section3 extends Component {
  render() {
    return (
      <div className="sectionWrapper">
       <Macro_Fx data={this.props.data} />
      </div>
    );
  }
}
