import React, { Component } from "react";
import SpxVolreset from "./charts/spxVolreset";
import Loader from "./loader.js";
import SpxVolresetBig from "./charts/spxVolresetBig";

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Contact from "./contact";

const realTime1 = "http://104.211.19.171/serverout/realtime1";

export default class Section1 extends Component {
  state = {
    data: null,
    isBigScreen: false,
  };
  

  interval = () => {
    let counter = 0;

    const x = setInterval(() => {
      fetch(realTime1)
        .then(response => response.json())
        .then(json => {
          this.setState({ data: json }, () => console.log("zapytanie"));
        });
      counter++;
      if (counter === 100) clearInterval(x);
    }, 1000);
  };

  componentDidMount() {
    this.interval();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

 
  render()  
  
  {
    const sectionView = this.state.data ?  <SpxVolreset data={this.state.data} /> : <Loader />
   
  
    return  (
     
      <div className="sectionWrapper">   

        {sectionView}

      </div>

    
    ) 
  }
}
