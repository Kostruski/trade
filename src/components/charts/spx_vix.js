import React, { Component } from "react";
import Tools from "../tools.js";
import _ from "lodash";
import {
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryAxis,
  VictoryBar,
  VictoryArea
} from "victory";



export default class Spx_vix extends Component {
  constructor(props) {
    
    
    const data = props.data.map(el => ({
      x: el["Date"].slice(2, 10),
      SPX: el["SPX"],
      MCI: el["Master Composite Index"]
    }));

    const initZoom = data.filter((el, i) => i > data.length * 0.9);
    // const tickValues = initZoom.map(el => el["x"])


    super(props);
    this.state = {
      data: data,
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
   
   
    // const spxMax = _.maxBy(this.state.currZoom, "SPX")["SPX"] tu jest maksymalny zakres widoku 
    // const mciMax = _.maxBy(this.state.currZoom, "MCI")["MCI"]
    // const spxMin =  _.minBy(this.state.currZoom, "SPX")["SPX"]
    // const mciMin = _.minBy(this.state.currZoom, "MCI")["MCI"]

    const spxMax = _.maxBy(this.state.data, "SPX")["SPX"]
    const mciMax = _.maxBy(this.state.data, "MCI")["MCI"]
    const spxMin =  _.minBy(this.state.data, "SPX")["SPX"]
    const mciMin = _.minBy(this.state.data, "MCI")["MCI"]
   
    console.log(this.state.currZoom, spxMax, mciMax, spxMin, mciMin)

    return (
      <div className="chartBox">
        <div className="legend">
          <div className="colorBox">
            <span
              style={{
                backgroundColor: "navy"
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
            <div>Master Composite Index</div>
          </div>

          <Tools
            resetChart={this.resetChart}
            id="chartspx_vix"
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

        <svg viewBox="0 0 450 350">
          <g>
          <VictoryAxis
            scale="time"
            standalone={false}
            tickValues={this.state.currZoom.map(el => el["x"])}
            orientation="bottom"
            fixLabelOverlap={true}           
            offsetY={50}
            style={{
              tickLabels: { fontSize: 10, padding: 5 }
            }}
          />

          <VictoryAxis dependentAxis
            orientation="right"
            standalone={false}
            domain={ [mciMin*1.2, mciMax*1.2] }
            dependentAxis
            tickFormat={x => `${(x.toFixed(0))}`}
            fixLabelOverlap={true}
            style={{
              tickLabels: { fontSize: 10, padding: 5 }
            }}
            crossAxis={false}
          />

          <VictoryArea
            data={this.state.currZoom}
            x={"x"}
            y={"MCI"}
            standalone={false}
            domain={{
                 y: [mciMin*1.2, mciMax*1.2]
            }}
            scale={{x: "time", y: "linear"}}           
            labels={d => `MCI: ${d["MCI"] * mciMax} 
            date: ${d.x}`}
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{ fill: "black" }}
                horizontal={true}
              />
            }
            style={{
              data: {
                stroke: `blue`,
                fill: "dodgerblue",
                strokeWidth: 1
              },
              labels: { fontSize: 7 }
            }}
          />

          <VictoryAxis
            dependentAxis
            orientation="left"
            standalone={false}
            domain={ [spxMin, spxMax] }
            tickFormat={z => `${z.toFixed(0)}`}
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
            standalone={false}
            domain={{
                 y: [spxMin, spxMax]
            }}
            labels={d =>
              `SPX: ${(d["SPX"] )} 
              date: ${d.x}`
            }
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{ fill: "black" }}
                horizontal={true}
              />
            }
            style={{
              data: { stroke: "whitesmoke", strokeWidth: 1 },
              labels: { fontSize: 7 }
            }}
          />

        </g>
        </svg>
      </div>
    );
  }
}
