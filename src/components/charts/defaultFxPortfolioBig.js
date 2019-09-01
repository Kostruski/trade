import React, { Component } from "react";
import FullScreen from "../fullScreen.js";
import _ from "lodash";
import {

  VictoryBar,
  VictoryAxis,
  VictoryArea,
  VictoryChart,
  VictoryLabel,
  VictoryScatter
} from "victory";
import {
  fontSizeBig,
  padding,
  timeAsixOffsetSmall
} from "../../style/chartsStyle.js";

export default class DefaultFxPortfolioBig extends Component {
  constructor(props) {
    const data1 = _.reverse(_.toPairsIn(props.data[0]));
    const data = data1.map(el => ({ x: el[0], y: el[1] }));
    const max = _.max(_.values(props.data[0]));
    const min = _.min(_.values(props.data[0]));

    super(props);
    this.state = {
      data: data,
      currMax: max,
      currMin: min,
      chartWidth: 450,
      chartHeight: 300
    };
  }

  changeChartDimmensions = () => {
    const tempWidth = window.innerWidth - 50;
    const tempHeight = window.innerHeight -120;
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

  render() {
 

    return (
      <div className="chartBoxBigWrapper">
        <div className="chartBox">
          <div className="legend">
            <FullScreen id={"chartDefaultFxPortfolio"} />
          </div>
          <h4>Default Fx Portfolio</h4>
          <div className="chartContainer">
            <VictoryChart
              standalone={true}
              padding={padding}
              horizontal={true}
              width={this.state.chartWidth}
              height={this.state.chartHeight}
            >
              <VictoryAxis
                tickValues={this.state.data.map(el => el.y)}
                domain={{ y: [this.state.currMin - 2, this.state.currMax + 2] }}
                standalone={false}
                padding={padding}
                orientation="bottom"
                fixLabelOverlap={true}
                crossAxis={false}
                offsetY={timeAsixOffsetSmall}
                dependentAxis
                style={{
                  tickLabels: { fontSize: fontSizeBig, padding: 5 }
                }}
              />

              <VictoryAxis
                orientation="left"
                padding={padding}
                standalone={false}
                tickLabelComponent={
                  <VictoryLabel dx={`${(-1 * this.state.chartWidth) / 4}`} />
                }
                tickValues={this.state.data.map(el => el.x)}
                tickCount={this.state.data.length}
                style={{
                  tickLabels: { fontSize: fontSizeBig, padding: 5 },
                  grid: { strokeWidth: 0 }
                }}
                crossAxis={false}
              />

              <VictoryBar
                domain={{ x: [this.state.currMin, this.state.currMax] }}
                data={this.state.data}
                padding={padding}
                x={"x"}
                standalone={false}
                style={{
                  data: { stroke: "brown", fill: "brown", strokeWidth: 1 }
                }}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    );
  }
}
