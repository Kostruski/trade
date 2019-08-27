import React from 'react'
import {VictoryScatter, VictoryTooltip, VictoryLine } from "victory";
import {paddingSmall} from "../../style/chartsStyle.js";
import _ from "lodash";
import {currencyColors} from "../../style/chartsStyle.js"

export default function CurrSingleChart(props) {
    const data = props.data.map(el => _.pick(el, ["Date", props.name]))
    
    return (
       
         <VictoryLine
          padding={paddingSmall}  
          width={props.width}   
          height={props.height}   
          standalone={false}
          data={data}
          x={"Date"}
          y={props.name} 
          size={2}
          domain={{y:[props.min, props.max]}}
          labels={d => `${props.name}: ${d[props.name].toFixed(0)}, date: ${d["Date"].slice(2, 10)}`}
          labelComponent={
            <VictoryTooltip
              flyoutStyle={{ fill: "black" }}
              orientation={"bottom"}
              pointerLength={0}
          /> }              
          style={{
            data: {stroke: currencyColors[props.index] }
          }}
        /> 
        
    )
}
