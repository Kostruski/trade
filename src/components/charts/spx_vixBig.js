import React, { Component } from "react";
import Tools from "../tools.js";
import _ from "lodash";
import {padding, fontSizeBig, tooltipFontSize} from "../../style/chartsStyle.js"
import {
  VictoryLine,
  VictoryTooltip,
  VictoryAxis,
  VictoryBar,
  VictoryScatter,
  VictoryArea
} from "victory";



export default class Spx_vixBig extends Component {
  constructor(props) {
    const data = props.data.map(el => ({
      x: el["Date"].slice(2, 10),
      SPX: el["SPX"],
      MCI: el["Master Composite Index"]
    }));

    const initZoom = data.filter((el, i) => i > data.length - 120);

    super(props);
    this.state = {
      data: data,
      initZoom: initZoom,
      currZoom: initZoom,
      zoomValue: 0,
      zoomMinusActive: true,
      zoomPlusActive: true,
      panLeftActive: true,
      panRightActive: true,
      chartWidth: 450,
      chartHeight: 300
    };
  }

  changeChartDimmensions = () => {
    const tempWidth = window.innerWidth - 60;
    const tempHeight = window.innerHeight - 100;
    if (
      Math.abs(this.state.chartWidth - tempWidth) ||
      Math.abs(this.state.chartHeight - tempHeight) > 10
    )
      this.setState({ chartWidth: tempWidth, chartHeight: tempHeight });
  };

  componentWillMount() {
    this.changeChartDimmensions();
    window.addEventListener("resize", () => this.changeChartDimmensions());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.changeChartDimmensions());
  }

 zoomMinus = () => {
   if (!this.state.zoomPlusActive) this.setState({ zoomPlusActive: true });
   if (this.state.currZoom.length===this.state.data.length) {
     this.setState({ zoomMinusActive: false });
     return;
   }
   this.setState({ zoomValue: 1 }, () => {
     this.updateRange();
   });
 };

 zoomPlus = () => {
   if (!this.state.zoomMinusActive)
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
   if (!this.state.panRightActive) this.setState({ panRightActive: true });
   const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));
   const rightIndex = this.state.data.indexOf(_.last(this.state.currZoom));
   const length = this.state.currZoom.length;
   if (leftIndex === 0 ) {
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
   if (!this.state.panLeftActive) this.setState({ panLeftActive: true });
   const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));
   const rightIndex = this.state.data.indexOf(_.last(this.state.currZoom));
   const length = this.state.currZoom.length;
   if (rightIndex === this.state.data.length - 1 ) {
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
   let zoomed = []

   if(this.state.currZoom.includes(_.last(this.state.data))) {
      zoomed = this.state.data.filter(
       (el, i) =>
         i >=
           leftIndex - (this.state.currZoom.length / 5) * this.state.zoomValue &&
         i <= rightIndex
     );
   }
   else if (this.state.currZoom.includes(_.head(this.state.data))) {
     zoomed = this.state.data.filter(
       (el, i) =>
         i >=
           leftIndex  &&
         i <= rightIndex + (this.state.currZoom.length / 5) * this.state.zoomValue
     );
   }

   else {
     zoomed = this.state.data.filter(
       (el, i) =>
         i >=
           leftIndex - (this.state.currZoom.length / 10) * this.state.zoomValue  &&
         i <= rightIndex + (this.state.currZoom.length / 10) * this.state.zoomValue
     );

   }

   this.setState({ currZoom: zoomed });
 };

  render() {
    const spxMax = _.maxBy(this.state.data, "SPX")["SPX"];
    const mciMax = _.maxBy(this.state.data, "MCI")["MCI"];
    const spxMin = _.minBy(this.state.data, "SPX")["SPX"];
    const mciMin = _.minBy(this.state.data, "MCI")["MCI"];
 

    return (
      <div className="chartBoxBigWrapper">
        <div className="chartBox">
        <Tools
            resetChart={this.resetChart}
            id="chartSpx_Vix"
            zoomPlus={this.zoomPlus}
            zoomMinus={this.zoomMinus}
            panLeft={this.panLeft}
            panRight={this.panRight}
            zoomMinusActive={this.state.zoomMinusActive}
            zoomPlusActive={this.state.zoomPlusActive}
            panLeftActive={this.state.panLeftActive}
            panRightActive={this.state.panRightActive}
          />
        <h4>Master Composite Index</h4>
          <div className="legend">
            <div className="colorBox">
              <span
                style={{
                  backgroundColor: "whitesmoke"
                }}
              />
              <div>SPX</div>
            </div>
            <div className="colorBox">
              <span
                style={{
                  backgroundColor: "navy"
                }}
              />
              <div>Master Composite Index</div>
            </div>

           
          </div>

          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${this.state.chartWidth} ${this.state.chartHeight}`}
          >
            <g >
              <VictoryAxis
                padding={padding}
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                scale="time"
                standalone={false}
                tickValues={this.state.currZoom.map(el => el["x"])}
                orientation="bottom"
                fixLabelOverlap={true}
                // offsetY={50}
                style={{
                  tickLabels: { fontSize: fontSizeBig, padding: 5 }
                }}
              />

              <VictoryAxis
               padding={padding}
                dependentAxis
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                orientation="right"
                standalone={false}
                domain={[mciMin * 1.2, mciMax * 1.2]}
                dependentAxis
                tickFormat={x => `${x.toFixed(0)}`}
                fixLabelOverlap={true}
                style={{
                  tickLabels: { fontSize: fontSizeBig, padding: 5 }
                }}
                crossAxis={false}
              />

              <VictoryArea
                padding={padding}
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                interpolation={"step"}
                barWidth={12}
                data={this.state.currZoom}
                x={"x"}
                y={"MCI"}
                standalone={false}
                domain={{
                  y: [mciMin * 1.2, mciMax * 1.2]
                }}
                scale={{ x: "time", y: "linear" }}
                style={{
                  data: {
                    stroke: `blue`,
                    fill: "dodgerblue",
                    strokeWidth: 3
                  }
                }}
              />

              <VictoryAxis
                padding={padding}
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                dependentAxis
                orientation="left"
                standalone={false}
                domain={[spxMin, spxMax]}
                tickFormat={z => `${z.toFixed(0)}`}
                fixLabelOverlap={true}
                style={{
                  tickLabels: { fontSize: fontSizeBig, padding: 5 },
                  grid: { strokeWidth: 0 }
                }}
                crossAxis={false}
              />

              <VictoryLine
                padding={padding}
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                data={this.state.currZoom}
                x={"x"}
                y={"SPX"}
                standalone={false}
                domain={{
                  y: [spxMin, spxMax]
                }}
                
                style={{
                  data: { stroke: "whitesmoke", strokeWidth: 3 },
               
                }}
              />

              <VictoryScatter
                padding={padding}
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                data={this.state.currZoom}
                x={"x"}
                y={"MCI"}
                size={20}
                standalone={false}
                domain={{
                  y: [mciMin * 1.2, mciMax * 1.2]
                }}
                scale={{ x: "time", y: "linear" }}
                labels={d => `MCI: ${d["MCI"].toFixed(2)}, date: ${d.x}`}
                labelComponent={
                  <VictoryTooltip
                    flyoutStyle={{ fill: "black" }}
                    orientation={d => (d["MCI"] > 0 ? "top" : "bottom")}
                    pointerWidth={0}
                  />
                }
                style={{
                  data: {
                    stroke: "rgba(255, 255, 255, 0)",
                    fill: "rgba(255, 255, 255, 0)",
                    strokeWidth: 0
                  },
                  labels: { fontSize: tooltipFontSize }
                }}
              />

              <VictoryScatter
                padding={padding}
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                data={this.state.currZoom}
                x={"x"}
                y={"SPX"}
                size={20}
                standalone={false}
                domain={{
                  y: [spxMin, spxMax]
                }}
                scale={{ x: "time", y: "linear" }}
                labels={d => `SPX: ${d["SPX"]}, date: ${d.x}`}
                labelComponent={
                  <VictoryTooltip
                    flyoutStyle={{ fill: "black" }}
                    orientation={"bottom"}
                    pointerWidth={0}
                  />
                }
                style={{
                  data: {
                    stroke: "rgba(255, 255, 255, 0)",
                    fill: "rgba(255, 255, 255, 0)",
                    strokeWidth: 0
                  },
                  labels: { fontSize: tooltipFontSize }
                }}
              />
            </g>
          </svg>
        </div>
      </div>
    );
  }
}
