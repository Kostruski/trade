import React from 'react'
import {currencyColors} from "../style/chartsStyle"

export default function LegendItem(props) {
    return (
        
            <div className="legendItemBox">
              <span
                style={{
                  display: "block",
                  width: "8px",
                  backgroundColor: `${currencyColors[props.index]}`,
                  height: "8px",
                  }}
              />
              <div>{props.name}</div>
            </div>
           
        
    )
}
