import Chart1 from "./charts/chart1.js";
import Chart2 from "./charts/chart2.js";
import Chart3 from "./charts/chart3.js";
import Chart4 from "./charts/chart4.js";
import Chart5 from "./charts/chart5.js";
import Chart6 from "./charts/chart6.js";
import React, { Component } from "react";
import { HashRouter as Router, NavLink } from "react-router-dom";

export default class Section1 extends Component {
  render() {
    return (
      <div className="sectionWrapper">
        <Router>
          <NavLink to="/chart1">
            <Chart1 data={this.props.data.data1} />
          </NavLink>
          <NavLink to="/chart2">
            <Chart2 data={this.props.data.data2} />
          </NavLink>
          <NavLink to="/chart3">
            <Chart3 data={this.props.data.data1} />
          </NavLink>
          <NavLink to="/chart4">
            <Chart4 data={this.props.data.data3} />
          </NavLink>
          <NavLink to="/chart5">
            <Chart5 data={this.props.data.data1} />
          </NavLink>
          <NavLink to="/chart6">
            <Chart6 data={this.props.data.data2} />
          </NavLink>
        </Router>
      </div>
    );
  }
}
