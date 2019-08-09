import React, { Component } from "react";
import Tools from "../tools.js"
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

export default class ChartBig3 extends Component {
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
      chartWidth: 450, 
      chartHeight: 300
    };

   }



  changeChartDimmensions = () => {
    const tempWidth = window.innerWidth
    const tempHeight = window.innerHeight-100
    if(Math.abs(this.state.chartWidth-tempWidth ) || Math.abs(this.state.chartHeight-tempHeight ) >10 )  this.setState({chartWidth: tempWidth, chartHeight: tempHeight})     
    }

  componentWillMount() {
    this.changeChartDimmensions();
    window.addEventListener("resize", () => this.changeChartDimmensions());  
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.changeChartDimmensions());
  }

 
  zoomMinus = () => {    
    const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));
    if (leftIndex === 0) return;
    this.setState({ zoomValue: 1 }, () => {
      this.updateRange();
    });
  };

  zoomPlus = () => {
    if (this.state.currZoom.length < 30) return;
    this.setState({ zoomValue: -1 }, () => {
      this.updateRange();
    });
  };

  resetChart = () => {
    if(this.state.currZoom !== this.state.initZoom) this.setState({currZoom: this.state.initZoom})
  }

  panLeft = () => {
    const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));
    const rightIndex = this.state.data.indexOf(_.last(this.state.currZoom));
    const length = this.state.currZoom.length;
    if (leftIndex < 60 && length < 60) return;
    const zoomed = this.state.data.filter(
      (el, i) =>
        i >= leftIndex - Math.round(length / 10) &&
        i <= rightIndex - Math.round(length / 10)
    );
    this.setState({ currZoom: zoomed });
  };

  panRight = () => {
    const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));
    const rightIndex = this.state.data.indexOf(_.last(this.state.currZoom));
    const length = this.state.currZoom.length;
    if (rightIndex > this.state.data.length - 2 && length < 60) return;
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
      <div className="chartBoxBigWrapper">
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
          <Tools resetChart={this.resetChart} id={this.props.data.id} zoomPlus={this.zoomPlus} zoomMinus={this.zoomMinus} panLeft={this.panLeft} panRight={this.panRight}/>
        </div>

        <VictoryChart containerComponent={<VictoryVoronoiContainer />}
        width={this.state.chartWidth}
        height={this.state.chartHeight}
        >
          <VictoryAxis
            scale="time"
            orientation="bottom"
            // tickCount={14}
            fixLabelOverlap={true}
            offsetY={50}
            style={{
              tickLabels: { fontSize: 20, padding: 5 }
            }}
          />

          <VictoryAxis
            orientation="right"
            dependentAxis
            tickFormat={x => `${(x * spxMax).toFixed(2)}`}
            // tickCount={10}
            fixLabelOverlap={true}
            style={{
              tickLabels: { fontSize: 20, padding: 5 }
            }}
            crossAxis={false}
          />

          <VictoryLine
            data={this.state.currZoom}
            x={"x"}
            y={"SPX"}
            labels={d => `spx: ${d["SPX"] * spxMax.toFixed(2)} date: ${d.x}`}
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{ fill: "black", fillOpacity: 0.4 }}
              />
            }
            style={{
              data: {
                stroke: `${this.props.data.color}`,
                strokeWidth: 1
              },
              labels: { fontSize: 20 }
            }}
          />

          <VictoryAxis
            dependentAxis
            orientation="left"
            tickFormat={z => `${(z * midMax).toFixed(2)}`}
            // tickCount={10}
            fixLabelOverlap={true}
            style={{
              tickLabels: { fontSize: 20, padding: 5 }
            }}
            crossAxis={false}
          />

          <VictoryLine
            data={this.state.currZoom}
            x={"x"}
            y={"Long Term"}
            labels={d =>
              `Long term: ${(d["Long Term"] * midMax).toFixed(2)} date: ${d.x}`
            }
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{ fill: "black", fillOpacity: 0.4 }}
              />
            }
            style={{
              data: { stroke: "pink", strokeWidth: 1 },
              labels: { fontSize: 20 }
            }}
          />

          <VictoryLine
            data={this.state.currZoom}
            x={"x"}
            y={"Mid Term"}
            labels={d =>
              `Mid term: ${(d["Mid Term"] * midMax).toFixed(2)} date: ${d.x}`
            }
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{ fill: "black", fillOpacity: 0.4 }}
              />
            }
            style={{
              data: { stroke: "yellow", strokeWidth: 1 },
              labels: { fontSize: 20 }
            }}
          />
        </VictoryChart>
      </div>
      </div>
    );
  }
}
