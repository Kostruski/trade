import React, { Component } from "react";
import { chartsArr, wykres3line } from "./jsonFileTest.js";
import ChartBig3 from "./components/charts/chartBig3.js";
import ChartBig from "./components/charts/chartBig.js";
import BarChartBig from "./components/charts/barChartBig.js";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./App.scss";
import Header from "./components/header";
import Section1 from "./components/section1.js";
import Section2 from "./components/section2.js";
import Section3 from "./components/section3.js";
import Section4 from "./components/section4.js";
import LoginPage from "./components/loginPage.js";
import Contact from "./components/contact.js";

const macrofixURL = 'http://104.211.19.171/serverout/macrofx.json' 
const spxvixURL = 'http://104.211.19.171/serverout/spxvix.json' 



export default class App extends Component {
  state = {
    data1: wykres3line,
    data2: chartsArr,
    isLoggedIn: true,
    isNewUser: false,
    spxvix: null,
    loading: false
  };

  componentDidMount(){
   this.setState({loading: true}) 
   fetch(spxvixURL)
   .then(response => response.json())
   .then(json => {this.setState({spxvix : json, loading: false})})
  }


  changeNewUser = () => this.setState({ isNewUser: false });

  signUp = () => this.setState({ isNewUser: true });

  toggleLogin = () => {
    this.setState(prev => ({ isLoggedIn: !prev.isLoggedIn }));
  };

  render() {
    const ProtectedRoute = ({ isAllowed, ...props }) =>
      isAllowed ? <Route {...props} /> : <Redirect to="/" />;
   
  

    return (
     
        <div className="appWrapper">
        <div className="sideAndMain">
          <div className="main">
            <Header
              toggleLogin={this.toggleLogin}
              isLoggedIn={this.state.isLoggedIn}            
            />
            <Router>
              <>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <LoginPage
                        changeNewUser={this.changeNewUser}
                        isNewUser={this.state.isNewUser}
                        toggleLogin={this.toggleLogin}
                        isLoggedIn={this.state.isLoggedIn}
                        signUp={this.signUp}
                      />
                    )}
                  />
                  <Route exact path="/contact" render={() => <Contact />} />
                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path="/section1"
                    component={() => (
                      <Section1
                        data={this.state}
                        handleClick={this.handleClick}
                      />
                    )}
                  />

                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path="/section2"
                    render={() => (
                      this.state.loading ?
                      <h1>Wgrywa się</h1> :
                      <Section2
                        data={this.state.spxvix}
                        handleClick={this.handleClick}
                      />
                    )}
                  />

                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path="/section3"
                    render={() => (
                      <Section3
                        data={this.state}
                        handleClick={this.handleClick}
                      />
                    )}
                  />

                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path="/section4"
                    render={() => (
                      <Section4
                        data={this.state}
                        handleClick={this.handleClick}
                      />
                    )}
                  />

                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path={`/${this.state.data1.id}`}
                    render={() => <ChartBig3 data={this.state.data1} />}
                  />
                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path={`/${this.state.data2[0].id}`}
                    render={() => <ChartBig data={this.state.data2[0]} />}
                  />
                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path={`/${this.state.data2[1].id}`}
                    render={() => <BarChartBig data={this.state.data2[1]} />}
                  />
                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path={`/${this.state.data2[2].id}`}
                    render={() => <ChartBig data={this.state.data2[2]} />}
                  />
                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path={`/${this.state.data2[3].id}`}
                    render={() => <BarChartBig data={this.state.data2[3]} />}
                  />
                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path={`/${this.state.data2[4].id}`}
                    render={() => <ChartBig data={this.state.data2[4]} />}
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








