import Chart from "./charts/chart.js";
import React, { Component } from "react";
import { HashRouter as Router, NavLink, Switch, Route } from "react-router-dom";
import Chart3 from "./charts/chart3.js";

export default class Section4 extends Component {
  render() {
    return (
      <div className="sectionWrapper">
        <Chart data={this.props.data.data2[1]} />

        <Chart data={this.props.data.data2[2]} />

        <Chart data={this.props.data.data2[0]} />

        <Chart data={this.props.data.data2[4]} />

        <Chart data={this.props.data.data2[3]} />

        <Chart3 data={this.props.data.data1} />
      </div>
    );
  }
}
