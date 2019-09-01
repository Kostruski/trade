import React, { Component } from 'react'
import {connect} from "react-redux"

const macrofixURL = "http://104.211.19.171/serverout/macrofx";
const spxvixURL = "http://104.211.19.171/serverout/spxvix";
const realTime1 = "http://104.211.19.171/serverout/realtime1";
const portfolio =    "http://104.211.19.171/serverout/portfoliofx"; 

class FetchData extends Component {

    state = {
      isLoggedIn: true,
      isNewUser: false,
      spxvix: null,
      macrofix: null,
      realTime1: null,
      protfolio: null
    };

    interval = () => {
      let counter = 0;
      const x = setInterval(() => {
        fetch(realTime1)
          .then(response => response.json())
          .then(json => {
            this.setState({ realTime1: json });
          });
        console.log(counter)
        counter++;
        if (counter === 10) clearInterval(x);

      }, 1000);
    };

    componentDidMount() {
      fetch(spxvixURL)
        .then(response => response.json())
        .then(json => {
          this.setState({ ...this.state, spxvix: json });
        });

      fetch(macrofixURL)
        .then(response => response.json())
        .then(json => {
          this.setState({ ...this.state, macrofix: json });
        });


        fetch(portfolio)
        .then(response => response.json())
        .then(json => {
          this.setState({...this.state, portfolio: json });
        });

        fetch(realTime1)
        .then(response => response.json())
        .then(json => {
          this.setState({...this.state, realTime1: json });
        });



      this.interval();
    }

    




    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {

  return {
    spxvix: (value) => dispatch({type: 'SPXVIX', value: value}),
    macrofix: (value) => dispatch({type: 'MACROFIX', value: value}),
    realTime1: (value) => dispatch({type: 'REALTIME1', value: value}),
    portfolio: (value) => dispatch({type: 'PORTFOLIO', value: value}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchData)
