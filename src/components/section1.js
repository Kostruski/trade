
import Chart from "./charts/chart.js";
import React, { Component } from "react";
import { HashRouter as Router, NavLink } from "react-router-dom";

export default class Section1 extends Component {
  render() {
    return (
      <div className="sectionWrapper">
        <Router>
          <NavLink to="/chart1">
            <Chart data={this.props.data.data1} style={this.props.data.chartData1Style} />
          </NavLink>
          <NavLink to="/chart2">
            <Chart data={this.props.data.data1} style={this.props.data.chartData1Style}/>
          </NavLink>
          <NavLink to="/chart3">
            <Chart data={this.props.data.data1} style={this.props.data.chartData1Style}/>
          </NavLink>
          <NavLink to="/chart4">
            <Chart data={this.props.data.data2} style={this.props.data.chartData1Style}/>
          </NavLink>
          <NavLink to="/chart5">
            <Chart data={this.props.data.data1}style={this.props.data.chartData1Style} />
          </NavLink>
          <NavLink to="/chart6">
            <Chart data={this.props.data.data2} style={this.props.data.chartData1Style}/>
          </NavLink>
        </Router>
      </div>
    );
  }
}
