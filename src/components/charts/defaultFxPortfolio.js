import React, { Component } from 'react'
import FullScreen from "../fullScreen.js";
import _ from "lodash";
import LegendItem from "../legendItem.js"
import CurrSingleChart from "./currSingleChart.js"
import { VictoryLine, VictoryBar, VictoryAxis, VictoryArea, VictoryChart, VictoryLabel, VictoryScatter } from "victory";
import {
  fontSizeSmall,
  paddingSmall,
  timeAsixOffsetSmall
} from "../../style/chartsStyle.js";







export default class DefaultFxPortfolio extends Component {
  
    constructor(props) {
        
        const data1 = _.reverse(_.toPairsIn(props.data[0]))
        const data = data1.map(el => ({x: el[0], y: el[1]}))
        const max =  _.max(_.values(props.data[0]));
        const min =  _.min(_.values(props.data[0]));
       
        
          
        super(props) 
        this.state = {
            data:data,
            currMax: max,
            currMin: min           
        }
    }



   render() {  

    console.log(this.state.data)
 
     return (
       <div className="chartBox currenciesChart">         
         <h4>Default Fx Portfolio</h4> 
         <div className="legend">  
         <FullScreen id={"chartDefaultFxPortfolio"}/>  
         </div>    
          <div className="chartContainer">        
         <VictoryChart
            standalone={true}
            padding={paddingSmall} 
            horizontal={true}   
               
         >
             <VictoryAxis
               tickValues={this.state.data.map(el => el.y)}
               domain={{y:[this.state.currMin-2, this.state.currMax+2]}}              
               standalone={false}              
               orientation="bottom"
               offsetY={timeAsixOffsetSmall}
               fixLabelOverlap={true}
               crossAxis={false}   
               dependentAxis  
               style={{
                tickLabels: { fontSize: fontSizeSmall, padding: 5 },
               }}         
             />

             <VictoryAxis
               orientation="left"
               standalone={false}
               tickLabelComponent={<VictoryLabel dx={-150}/>}
               tickValues={this.state.data.map(el => el.x)}
               tickCount={this.state.data.length}
               style={{
                 tickLabels: { fontSize: fontSizeSmall, padding: 5 },
                 grid: { strokeWidth: 0 }
               }}
               crossAxis={false}
              />

            <VictoryBar
               domain={{x:[this.state.currMin, this.state.currMax]}}    
               data={this.state.data}
               x={"x"}
               standalone={false}
               style={{
                 data: { stroke: "brown", fill:"brown", strokeWidth: 1 }
               }}
             />        
        </VictoryChart>
       
        </div>
       </div>
     );
   }
}
