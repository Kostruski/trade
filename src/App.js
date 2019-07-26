import React, { Component } from "react";
import { wykres1 } from "./jsonFileTest.js";
import ChartBig from "./components/charts/chartBig.js"
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import Header from "./components/header";
import Section1 from "./components/section1.js";
import Section2 from "./components/section2.js";
import Section3 from "./components/section3.js";
import Section4 from "./components/section4.js";
import StartPage from "./components/startPage.js";
import Side from "./components/side.js"
import Contact from "./components/contact.js";
import Chart from "./components/charts/chart.js";


export default class App extends Component {
  state = {
    data1: wykres1,
    mobileSideOn: false,
    sideVisible: true
  };

  toggleMobileSideOn = () => {
    this.setState((prev) => ({
      mobileSideOn: !prev.mobileSideOn,
      sideVisible: true

    }))
  }

  toggleSide = () => {
      this.setState((prev) => ({sideVisible: !prev.sideVisible}))
  }

  // componentDidMount() {
  //   fetch('http://104.211.19.171/serverout/master_spx_1.json')
  //   .then(response => response.json())
  //   .then(data => { console.log(data)});
  // }


  render() {
    return (
      <div className="appWrapper">       
        <div className="sideAndMain">
       
        <Side mobileSideOn={this.state.mobileSideOn} sideVisible={this.state.sideVisible} toggleSide={this.toggleSide}  />
           <div className="main"  >
              <Header toggleMobileSideOn={this.toggleMobileSideOn} /> 
        <Router>
          <>
            <Switch>
              <Route exact path="/" render={() => <StartPage />} />
              <Route exact path="/contact" render={() => <Contact />} />
              <Route
                path="/section1"
                render={() => (
                  <Section1
                    data={this.state}
                    handleClick={this.handleClick}
                  />
                )}
              />

              <Route
                path="/section2"
                render={() => (
                  <Section2
                    data={this.state}
                    handleClick={this.handleClick}
                  />
                )}
              />

              <Route
                path="/section3"
                render={() => (
                  <Section3
                    data={this.state}
                    handleClick={this.handleClick}
                  />
                )}
              />

              <Route
                path="/section4"
                render={() => (
                  <Section4
                    data={this.state}
                    handleClick={this.handleClick}
                  />
                )}
              />

              <Route
                path={`/${this.state.data1.id}`}
                render={() => <ChartBig data={this.state.data1} />}
              />
              <Route
                path="/chart2"
                render={() => <ChartBig data={this.state.data1} />}
              />
              <Route
                path="/chart3"
                render={() => <ChartBig data={this.state.data1} />}
              />
              <Route
                path="/chart4"
                render={() => <ChartBig data={this.state.data1} />}
              />
              <Route
                path="/chart5"
                render={() => <ChartBig data={this.state.data1} />}
              />
              <Route
                path="/chart6"
                render={() => <Chart data={this.state.data1} />}
              />
            </Switch>
          </>
        </Router>
      
        </div>
        </div>


     
        
     
      </div>
    );
  }
}



