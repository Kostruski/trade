import React, { Component } from "react";

import {
  VictoryZoomContainer,
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  createContainer,
  VictoryTooltip,
} from "victory";

export default class Chart extends Component {
  render() {
    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
  
    if (this.props.isBig) {
      return (
        <div className="chartBoxBigWrapper">
          <div className="chartBox">
            <div className="legend">
           <div className="colorBox"><span style={{backgroundColor: `${this.props.style.color}`}}></span><div>{`${this.props.style.labelText}`}</div></div>
            </div>

            <VictoryChart
            domain={{x: [this.props.style.domain.x[0], this.props.style.domain.x[1]], y: [this.props.style.domain.y[0], this.props.style.domain.y[1]]}}
              containerComponent={
                <VictoryZoomVoronoiContainer 
                 />
              }>
             <VictoryLine 
              data={this.props.data}
              labels={(d) => `open: ${d.y}`}
              labelComponent={<VictoryTooltip   flyoutStyle={{ fill: "black", fillOpacity: 0.4  }}/>}
              style={{data: {stroke: `${this.props.style.color}`, strokeWidth: 3} }}    
              />
            </VictoryChart>
          </div>
           <div className="moreTextBigChart">
             <h1>{`${this.props.style.bigTextH1}`}</h1>
             <h3>Powiększony slajd może mieć kompletnie inny wygląd od małego, </h3>
             <p>{`${this.props.style.bigTextP}`}</p>
           </div>
         </div>
      )
    } else {
      return (
       <div className="chartBox">
         <div className="legend">
        <div className="colorBox"><span style={{backgroundColor: `${this.props.style.color}`}}></span><div>{`${this.props.style.labelText}`}</div></div>
         </div>

         <VictoryChart
         domain={{x: [this.props.style.domain.x[0], this.props.style.domain.x[1]], y: [this.props.style.domain.y[0], this.props.style.domain.y[1]]}}
           containerComponent={
             <VictoryZoomVoronoiContainer 
              />
           }>
          <VictoryLine 
           data={this.props.data}
           labels={(d) => `open: ${d.y}`}
           labelComponent={<VictoryTooltip   flyoutStyle={{ fill: "black", fillOpacity: 0.4  }}/>}
           style={{data: {stroke: `${this.props.style.color}`, strokeWidth: 3} }}    
           />
         </VictoryChart>
       </div>
      );
    }
  }
}
