import React, { Component } from "react";

import {
  createContainer,
  VictoryChart,
  VictoryTooltip,
  VictoryCandlestick
} from "victory";

export default class Chart5 extends Component {
  render() {
    console.log("chart 5", this.props.data);

    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
    if (this.props.isBig) {
      return (
        <div className="chartBoxBigWrapper">
          <div className="chartBox">
            <h1>Chart 5</h1>

            <VictoryChart
              domain={{ x: [0, 80], y: [35, 60] }}
              containerComponent={<VictoryZoomVoronoiContainer />}
            >
              <VictoryCandlestick
                candleWidth={7}
                data={this.props.data}
                candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
                labels={d => `open: ${d.open}, close: ${d.close}, high: ${d.high}, low: ${d.low}`}
                labelComponent={
                  <VictoryTooltip flyoutStyle={{ fill: "black" }} />
                }
                size={(datum, active) => (active ? 5 : 3)}
                style={{
                  data: { stroke: "cyan", strokeWidth: 0.5, fillOpacity: 0.4 }
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
          <h1>Chart 5</h1>

          <VictoryChart
            domain={{ x: [0, 80], y: [35, 60] }}
            containerComponent={<VictoryZoomVoronoiContainer />}
          >
            <VictoryCandlestick
              candleWidth={7}
              data={this.props.data}
              candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
              labels={d => `open: ${d.open}, close: ${d.close}, high: ${d.high}, low: ${d.low}`}
              labelComponent={
                <VictoryTooltip flyoutStyle={{ fill: "black" }} />
              }
              size={(datum, active) => (active ? 5 : 3)}
              style={{
                data: { stroke: "cyan", strokeWidth: 0.5, fillOpacity: 1 }
              }}
            />
          </VictoryChart>
        </div>
      );
    }
  }
}
