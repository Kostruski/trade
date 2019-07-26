
import Chart from "./charts/chart.js";
import React, { Component } from "react";
import { HashRouter as Router, NavLink, Switch, Route } from "react-router-dom";
import Chart3 from "./charts/chart3.js";

export default class Section1 extends Component {
  render() {
    return (
      <div className="sectionWrapper">
        <Router>
          <NavLink to={`/${this.props.data.data1.id}`}>
            <Chart3 data={this.props.data.data1}  />
          </NavLink>
          <NavLink to={`/${this.props.data.data2[0].id}`}>
            <Chart data={this.props.data.data2[0]} />
          </NavLink>
          <NavLink to={`/${this.props.data.data2[1].id}`}>
            <Chart data={this.props.data.data2[1]} />
          </NavLink>
          <NavLink to={`/${this.props.data.data2[2].id}`}>
            <Chart data={this.props.data.data2[2]} />
          </NavLink>
          <NavLink to={`/${this.props.data.data2[3].id}`}>
            <Chart data={this.props.data.data2[3]} />
          </NavLink>
          <NavLink to={`/${this.props.data.data2[4].id}`}>
            <Chart data={this.props.data.data2[4]} />
          </NavLink>  
                        
        </Router>
      </div>
    );
  }
}
