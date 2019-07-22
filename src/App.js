import React, { Component } from "react";
import { dataSource1, dataSource2, chartData1Style } from "./jsonFileTest.js";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import Header from "./components/header";
import Section1 from "./components/section1.js";
import Section2 from "./components/section2.js";
import Section3 from "./components/section3.js";
import Section4 from "./components/section4.js";
import StartPage from "./components/startPage.js";
import Side from "./components/side.js"
import Footer from "./components/footer.js";
import Contact from "./components/contact.js";
import Chart from "./components/charts/chart.js";


export default class App extends Component {
  state = {
    data1: dataSource1,
    data2: dataSource2,
    chartData1Style: chartData1Style,
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
                path="/chart1"
                render={() => <Chart data={this.state.data1} style={this.state.chartData1Style} isBig={true} />}
              />
              <Route
                path="/chart2"
                render={() => <Chart data={this.state.data1} style={this.state.chartData1Style} isBig={true} />}
              />
              <Route
                path="/chart3"
                render={() => <Chart data={this.state.data1} style={this.state.chartData1Style} isBig={true} />}
              />
              <Route
                path="/chart4"
                render={() => <Chart data={this.state.data1} style={this.state.chartData1Style} isBig={true} />}
              />
              <Route
                path="/chart5"
                render={() => <Chart data={this.state.data1} style={this.state.chartData1Style} isBig={true} />}
              />
              <Route
                path="/chart6"
                render={() => <Chart data={this.state.data1} style={this.state.chartData1Style} isBig={true} />}
              />
            </Switch>
          </>
        </Router>
        <Footer />
        </div>
        </div>


     
        
     
      </div>
    );
  }
}



