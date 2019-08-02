import React, { Component } from 'react';
import _ from 'lodash';
import {

  VictoryChart,
  VictoryLine,
  createContainer,
  VictoryTooltip,
  VictoryAxis,
} from "victory";

const spxMax = 3013.00
const longMax = 0.92
const midMax = 2.31

export default class ChartBig extends Component {
  constructor(props) {
      super();
      this.entireDomain = this.getEntireDomain(props);
      this.state = {
        zoomedXDomain:   this.entireDomain.x,
        spx: props.data.values[0],
        longTerm: props.data.values[1],
        midTerm: props.data.values[2],
      };
    }



    onDomainChange(domain) {
      this.setState({
        zoomedXDomain: domain.x,
      });
    }

    preventScroll = () => {
      document.querySelector('body').style.overflow = "hidden";
     }

    enableScroll = () => {
      document.querySelector('body').style.overflow = "scroll";
    }

    getData(dataArr) {
      const maxPoints = 150;
      const { zoomedXDomain } = this.state;
      const  data  = dataArr;
      const filtered = data.filter(
        (d) => (d.x >= zoomedXDomain[0] && d.x <= zoomedXDomain[1]));

        if (filtered.length > maxPoints ) {
          const k = Math.ceil(filtered.length / maxPoints);
          return filtered.filter(
            (d, i) => ((i % k) === 0)
          );
        }
        return filtered;
    }

    getEntireDomain(props) {
     const  data  = props.data.values[1];
      const temp = {
        y: [(_.minBy(data, d => d.y).y)*1.1, (_.maxBy(data, d => d.y).y)*1.1],
        x: [ data[0].x, _.last(data).x ]
      };


      return temp
    }







    render()    
    
 
    
    {
        const data = this.props.data.values; 
        const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
        return (
          <div className="chartBoxBigWrapper">
            <div className="chartBox" 
            // onMouseOut={() => this.enableScroll()}
            // onMouseOver={() => this.preventScroll()}
            >
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
              </div>

              <VictoryChart
               domain={this.entireDomain}
                containerComponent={
                  <VictoryZoomVoronoiContainer
                    zoomDimension="x"
                    minimumZoom={{ x: 30 }}
                    // zoomDomain={{ x: [this.entireDomain.x[1] - 100, this.entireDomain.x[1]]  }}
                    onZoomDomainChange={this.onDomainChange.bind(this)}                    
                  />
                }
              >
                <VictoryAxis
                  scale="time"
                  orientation="bottom"
                  tickCount={10}
                  offsetY={50}
                  style={{
                    tickLabels: { fontSize: 5, padding: 5 }
                  }}
                />

                <VictoryAxis            
                  orientation="right"
                  dependentAxis
                  tickFormat={x => `${(x * spxMax).toFixed(2)}`}
                  tickCount={10}
                  style={{
                    tickLabels: { fontSize: 5, padding: 5 }
                  }}
                  crossAxis={false}
                />

                <VictoryLine                
                  data={ this.getData(data[0]) }
                  labels={d =>
                    `spx: ${d.y * spxMax.toFixed(2)} date: ${d.x}`
                  }
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
                    labels: { fontSize: 5 }
                  }}
                />

                  <VictoryAxis                  
                    dependentAxis
                    orientation="left"
                    tickFormat={z => `${(z * longMax).toFixed(2)}`}
                    tickCount={10}
                    style={{
                      tickLabels: { fontSize: 5, padding: 5 }
                    }}
                    crossAxis={false}
                  />
           
                <VictoryLine                 
                 data={ this.getData(data[1]) }
                  labels={d =>
                    `Long term: ${(d.y * longMax).toFixed(2)} date: ${
                      d.x
                    }`
                  }
                  labelComponent={
                    <VictoryTooltip
                      flyoutStyle={{ fill: "black", fillOpacity: 0.4 }}
                    />
                  }
                  style={{
                    data: { stroke: "pink", strokeWidth: 1 },
                    labels: { fontSize: 5 }
                  }}
                />

                <VictoryLine
                 
                     data={ this.getData(data[2]) }
                  labels={d =>
                    `Mid term: ${(d.y * longMax).toFixed(2)} date: ${
                      d.x
                    }`
                  }
                  labelComponent={
                    <VictoryTooltip
                      flyoutStyle={{ fill: "black", fillOpacity: 0.4 }}
                    />
                  }
                  style={{
                    data: { stroke: "yellow", strokeWidth: 1 },
                    labels: { fontSize: 5 }
                  }}
                />
            
              </VictoryChart>
            </div>
          
          </div>
        );
    }
}
