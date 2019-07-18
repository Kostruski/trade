import React, { Component } from "react";

import {
  VictoryZoomContainer,
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  createContainer,
  VictoryTooltip,
} from "victory";

export default class Chart3 extends Component {
  render() {
    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

    if (this.props.isBig) {
      return (
        <div className="chartBoxBigWrapper">
          <div className="chartBox">
            <h1>Chart 3</h1>

            <VictoryChart
            domain={{x: [0, 80], y: [0, 100]}}
              containerComponent={
                <VictoryZoomVoronoiContainer 
                 />
              }>
             
              <VictoryLine 
              data={this.props.data}
              x="date"
              y="open"
              labels={(d) => `open: ${d.open}`}
              labelComponent={<VictoryTooltip   flyoutStyle={{ fill: "black" }}/>}
              size={(datum, active) => active ? 5 : 3}
              style={{data: {stroke: "cyan", strokeWidth: 3, fillOpacity: 0.4} }}    
              />
            </VictoryChart>
          </div>
           <div className="moreTextBigChart">
             <h1>Dodatkowy opis</h1>
             <h3>Powiększony slajd może mieć kompletnie inny wygląd od małego, </h3>
             <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, reprehenderit doloribus itaque necessitatibus facilis excepturi culpa fuga sapiente cupiditate corrupti molestiae quasi nobis magnam praesentium molestias provident, sed a aspernatur.</p>
           </div>
         </div>
      )
    } else {
      return (
        <div className="chartBox">
          <h1>Chart 3</h1>

          <VictoryChart
           domain={{x: [0, 80], y: [0, 100]}}
            containerComponent={
              <VictoryZoomVoronoiContainer  />
            }
          >
            <VictoryLine 
            data={this.props.data}
            x="date"
            y="open"
            labels={(d) => `open: ${d.open}`}
            labelComponent={<VictoryTooltip   flyoutStyle={{ fill: "black" }}/>}
            size={(datum, active) => active ? 5 : 3}
            style={{data: {stroke: "cyan", strokeWidth: 3, fillOpacity: 0.4} }}    
            />
          </VictoryChart>
        </div>
      );
    }
  }
}
