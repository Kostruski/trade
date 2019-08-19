import Chart from "./charts/chart.js";
import React, { Component } from "react";
import Chart3 from "./charts/chart3.js";
import BarChart from "./charts/barChart.js";
import Spx_vix from "./charts/spx_vix.js";

export default class Section2 extends Component {
  render() {
    return this.props.data ? (
      <div className="sectionWrapper">
        <Spx_vix data={this.props.data} />
      </div>
    ) : null;
  }
}
