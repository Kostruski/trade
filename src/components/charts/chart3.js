import React, { Component } from "react";
import Tools from "../tools.js";
import _ from "lodash";
import {
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryAxis
} from "victory";

const spxMax = 3013.0;
const longMax = 0.92;
const midMax = 2.31;

export default class Chart3 extends Component {
  constructor(props) {
    const initZoom = props.data.values.filter(
      (el, i) => i > props.data.values.length * 0.9
    );
    super(props);
    this.state = {
      data: props.data.values,
      initZoom: initZoom,
      currZoom: initZoom,
      zoomValue: 0,
      zoomMinusActive: true,
      zoomPlusActive: true,
      panLeftActive: true,
      panRightActive: true
    };
  }

  zoomMinus = () => {
    if (!this.setState.zoomPlusActive) this.setState({ zoomPlusActive: true });
    const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));
    if (leftIndex === 0) {
      this.setState({ zoomMinusActive: false });
      return;
    }
    this.setState({ zoomValue: 1 }, () => {
      this.updateRange();
    });
  };

  zoomPlus = () => {
    if (!this.setState.zoomMinusActive)
      this.setState({ zoomMinusActive: true });
    if (this.state.currZoom.length < 30) {
      this.setState({ zoomPlusActive: false });
      return;
    }
    this.setState({ zoomValue: -1 }, () => {
      this.updateRange();
    });
  };

  resetChart = () => {
    if (this.state.currZoom !== this.state.initZoom)
      this.setState({
        currZoom: this.state.initZoom,
        zoomPlusActive: true,
        zoomMinusActive: true,
        panLeftActive: true,
        panRightActive: true
      });
  };

  panLeft = () => {
    if (!this.setState.panRightActive) this.setState({ panRightActive: true });
    const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));
    const rightIndex = this.state.data.indexOf(_.last(this.state.currZoom));
    const length = this.state.currZoom.length;
    if (leftIndex < 60 && length < 60) {
      this.setState({ panLeftActive: false });
      return;
    }
    const zoomed = this.state.data.filter(
      (el, i) =>
        i >= leftIndex - Math.round(length / 10) &&
        i <= rightIndex - Math.round(length / 10)
    );
    this.setState({ currZoom: zoomed });
  };

  panRight = () => {
    if (!this.setState.panLeftActive) this.setState({ panLeftActive: true });
    const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));
    const rightIndex = this.state.data.indexOf(_.last(this.state.currZoom));
    const length = this.state.currZoom.length;
    if (rightIndex > this.state.data.length - 2 && length < 60) {
      this.setState({ panRightActive: false });
      return;
    }
    const zoomed = this.state.data.filter(
      (el, i) =>
        i >= leftIndex + Math.round(length / 10) &&
        i <= rightIndex + Math.round(length / 10)
    );
    this.setState({ currZoom: zoomed });
  };

  updateRange = () => {
    const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));
    const rightIndex = this.state.data.indexOf(_.last(this.state.currZoom));
    let length = this.state.data.length;
    const zoomed = this.state.data.filter(
      (el, i) =>
        i >=
          leftIndex - (this.state.currZoom.length / 5) * this.state.zoomValue &&
        i <= rightIndex
    );
    this.setState({ currZoom: zoomed });
  };

  render() {
    const data = this.state.data;

    return (
      <div className="chartBox">
        <div className="legend">
          <div className="colorBox">
            <span
              style={{
                backgroundColor: `${this.props.data.color}`
              }}
            />
            <div>SPX</div>
          </div>
          <div className="colorBox">
            <span
              style={{
                backgroundColor: "pink"
              }}
            />
            <div>Long term</div>
          </div>
          <div className="colorBox">
            <span
              style={{
                backgroundColor: "yellow"
              }}
            />
            <div>Mid term</div>
          </div>
          <Tools
            resetChart={this.resetChart}
            id={this.props.data.id}
            zoomPlus={this.zoomPlus}
            zoomMinus={this.zoomMinus}
            panLeft={this.panLeft}
            panRight={this.panRight}
            zoomMinusActive={this.state.zoomMinusActive}
            zoomPlusActive={this.state.zoomPlusActive}
            panLeftActive={this.state.panLeftActive}
            panRightActive={this.state.panRightActive}
          />
        </div>

        <VictoryChart>
          <VictoryAxis
            scale="time"
            orientation="bottom"
            fixLabelOverlap={true}
            offsetY={50}
            style={{
              tickLabels: { fontSize: 10, padding: 5 }
            }}
          />

          <VictoryAxis
            orientation="right"
            dependentAxis
            tickFormat={x => `${(x * spxMax).toFixed(2)}`}
            fixLabelOverlap={true}
            style={{
              tickLabels: { fontSize: 10, padding: 5 }
            }}
            crossAxis={false}
          />

          <VictoryLine
            data={this.state.currZoom}
            x={"x"}
            y={"SPX"}
            labels={d => `spx: ${d["SPX"] * spxMax.toFixed(2)} 
            date: ${d.x}`}
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{ fill: "black"}}
                horizontal={true}
              />
            }
            style={{
              data: {
                stroke: `${this.props.data.color}`,
                strokeWidth: 1
              },
              labels: { fontSize: 7 }
            }}
          />

          <VictoryAxis
            dependentAxis
            orientation="left"
            tickFormat={z => `${(z * midMax).toFixed(2)}`}
            fixLabelOverlap={true}
            style={{
              tickLabels: { fontSize: 10, padding: 5 }
            }}
            crossAxis={false}
          />

          <VictoryLine
            data={this.state.currZoom}
            x={"x"}
            y={"Long Term"}
            labels={d =>
              `Long term: ${(d["Long Term"] * midMax).toFixed(2)} 
              date: ${d.x}`
            }
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{ fill: "black" }}
                horizontal={true}
              />
            }
            style={{
              data: { stroke: "pink", strokeWidth: 1 },
              labels: { fontSize: 7 }
            }}
          />

          <VictoryLine
            data={this.state.currZoom}
            x={"x"}
            y={"Mid Term"}
            labels={d =>
              `Mid term: ${(d["Mid Term"] * midMax).toFixed(2)} 
              date: ${d.x}`
            }
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{ fill: "black" }}
                horizontal={true}
              />
            }
            style={{
              data: { stroke: "yellow", strokeWidth: 1 },
              labels: { fontSize: 7 }
            }}
          />
        </VictoryChart>
      </div>
    );
  }
}
