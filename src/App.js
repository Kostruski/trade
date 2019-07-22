import React, { Component } from "react";
import { dataSource1, dataSource2, dataSource3, dataSource4 } from "./jsonFileTest.js";
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
import Chart1 from "./components/charts/chart1.js";
import Chart2 from "./components/charts/chart2.js";
import Chart3 from "./components/charts/chart3.js";
import Chart4 from "./components/charts/chart4.js";
import Chart5 from "./components/charts/chart5.js";
import Chart6 from "./components/charts/chart6.js";

export default class App extends Component {
  state = {
    data1: dataSource1,
    data2: dataSource2,
    data3: dataSource3,
    data4: dataSource4,
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
                render={() => <Chart1 data={this.state.data1} isBig={true} />}
              />
              <Route
                path="/chart2"
                render={() => <Chart2 data={this.state.data2} isBig={true} />}
              />
              <Route
                path="/chart3"
                render={() => <Chart3 data={this.state.data1} isBig={true} />}
              />
              <Route
                path="/chart4"
                render={() => <Chart4 data={this.state.data3} isBig={true} />}
              />
              <Route
                path="/chart5"
                render={() => <Chart5 data={this.state.data4} isBig={true} />}
              />
              <Route
                path="/chart6"
                render={() => <Chart6 data={this.state.data2} isBig={true} />}
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



