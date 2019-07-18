import React, { Component } from "react";

import {
  VictoryZoomContainer,
  VictoryChart,
  VictoryAxis,
  VictoryArea,
  createContainer,
  VictoryTooltip,
} from "victory";

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

export default class Chart2 extends Component {
  render() {
    if (this.props.isBig) {
      return (
        <div className="chartBoxBigWrapper">
          <div className="chartBox">
            <h1>Chart 2</h1>
           <VictoryChart
            domain={{x: [0, 80], y: [0, 100]}}
             containerComponent={
               <VictoryZoomVoronoiContainer  />
             }
           >
             <VictoryArea 
             data={this.props.data}
              x="date"
              y="open"
              labels={(d) => `open: ${d.open}`}
              labelComponent={<VictoryTooltip   flyoutStyle={{ fill: "black" }}/>}
              size={(datum, active) => active ? 5 : 3}
              style={{data: {fill: "cyan", strokeWidth: 1, fillOpacity: 0.4} }}           
             />
            </VictoryChart>
          </div>
          <div className="moreTextBigChart">
            <h1>Dodatkowy opis</h1>
            <h3>
              Powiększony slajd może mieć kompletnie inny wygląd od małego,{" "}
            </h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perspiciatis, reprehenderit doloribus itaque necessitatibus
              facilis excepturi culpa fuga sapiente cupiditate corrupti
              molestiae quasi nobis magnam praesentium molestias provident, sed
              a aspernatur.
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="chartBox">
          <h1>Chart 2</h1>
          <VictoryChart containerComponent={<VictoryZoomVoronoiContainer />}>
             <VictoryArea 
             data={this.props.data}
              x="date"
              y="open"
              labels={(d) => `open: ${d.open}`}
              labelComponent={<VictoryTooltip   flyoutStyle={{ fill: "black" }}/>}
              size={(datum, active) => active ? 5 : 3}
              style={{data: {fill: "cyan", strokeWidth: 1, fillOpacity: 0.4} }}           
             />
            </VictoryChart>
        </div>
      );
    }
  }
}
