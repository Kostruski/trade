import Chart from "./charts/chart.js";
import React, { Component } from "react";
import Chart3 from "./charts/chart3.js";
import BarChart from "./charts/barChart.js"

export default class Section4 extends Component {
  render() {
    return (
      <div className="sectionWrapper">
        <BarChart data={this.props.data.data2[1]} />

        <Chart data={this.props.data.data2[2]} />

        <Chart data={this.props.data.data2[0]} />

        <Chart data={this.props.data.data2[4]} />

        <BarChart data={this.props.data.data2[3]} />

        <Chart3 data={this.props.data.data1} />
      </div>
    );
  }
}
