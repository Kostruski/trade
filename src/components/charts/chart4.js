import React, { Component } from "react";

import {
  createContainer,
  VictoryChart,
  VictoryArea,
  VictoryTooltip,
  VictoryBar
} from "victory";

export default class Chart4 extends Component {
  render() {
    

    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
    if (this.props.isBig) {
      return (
        <div className="chartBoxBigWrapper">
          <div className="chartBox">
            <h1>Chart 4</h1>

            <VictoryChart
              domain={{ x: [0, 80], y: [0, 100] }}
              containerComponent={<VictoryZoomVoronoiContainer />}
            >
              <VictoryArea
                data={this.props.data}
                x="date"
                y="high"
                labels={d => `high: ${d.high} spread: ${d.high-d.low}`}
                labelComponent={
                  <VictoryTooltip flyoutStyle={{ fill: "black" }} />
                }
               
                style={{
                  data: { stroke: "cyan", strokeWidth: 0.5, fillOpacity: 1 }
                }}
              />

              <VictoryArea
                data={this.props.data}
                x="date"
                y="low"
                labels={d => `low: ${d.low} `}
                labelComponent={
                  <VictoryTooltip flyoutStyle={{ fill: "black" }} />
                }
               
                style={{
                  data: { stroke: "dodgerblue", strokeWidth: 0.5, fill: "black" }
                }}
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
          <h1>Chart 4</h1>

         <VictoryChart
           domain={{ x: [0, 80], y: [0, 100] }}
           containerComponent={<VictoryZoomVoronoiContainer />}
         >
           <VictoryArea
             data={this.props.data}
             x="date"
             y="high"
             labels={d => `high: ${d.high} spread: ${d.high-d.low}`}
             labelComponent={
               <VictoryTooltip flyoutStyle={{ fill: "black" }} />
             }

             style={{
               data: { stroke: "cyan", strokeWidth: 0.5, fillOpacity: 1 }
             }}
           />

           <VictoryArea
             data={this.props.data}
             x="date"
             y="low"
             labels={d => `low: ${d.low} `}
             labelComponent={
               <VictoryTooltip flyoutStyle={{ fill: "black" }} />
             }

             style={{
               data: { stroke: "dodgerblue", strokeWidth: 0.5, fill: "black" }
             }}
           />
         </VictoryChart>
        </div>
      );
    }
  }
}
