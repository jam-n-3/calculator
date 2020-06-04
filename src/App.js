import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: "0",
      display: "0",
      num: ""
    }
    this.setSum = this.setSum.bind(this);
    this.clearSum = this.clearSum.bind(this);
    this.sumSum = this.sumSum.bind(this);
  }

  setSum = (e) => {
    let s = this.state.sum;
    let t = e.target.value;
    let n = this.state.num;
    let rN = /[0-9]/;
    let rD = /[.]/;
    let rS = /[-]/;
    
    if (rN.test(t)) {
      if (s == "0") {
        this.setState({num: t});
        this.setState({sum: t});
        this.setState({display: t});
      }
      else {  
        this.setState({num: this.state.num + t});
        this.setState({sum: this.state.sum + t});
        this.setState({display: this.state.display + t});
      }  
    }

    else if (rD.test(t)) {
      if (s !== "0" && !rD.test(n)) {
        this.setState({num: this.state.num + t});
        this.setState({sum: this.state.sum + t});
        this.setState({display: this.state.display + t});
      }
    }

    else if (rS.test(t) && n == "") {
      if (s == "0") {
        this.setState({num: ""});
        this.setState({sum: "0-"});
        this.setState({display: "-"});
      }
      else {  
        this.setState({num: ""});
        this.setState({sum: this.state.sum + "0-"});
        this.setState({display: this.state.display + "-"});
      }  
    }
    
    else {
      if (s !== "0" && n !== "") {
        this.setState({num: ""});
        this.setState({sum: this.state.sum + t});
        this.setState({display: this.state.display + t});    
      } 
      else if (n === "") {
        if (this.state.sum.substring(this.state.sum.length-2, this.state.sum.length) === "0-") {
          this.setState({sum: this.state.sum.substring(0, this.state.sum.length-3)+t});
          this.setState({display: this.state.display.substring(0, this.state.display.length-2)+t});
        }
        else {
          this.setState({sum: this.state.sum.substring(0, this.state.sum.length-1)+t});
          this.setState({display: this.state.display.substring(0, this.state.display.length-1)+t});
        }     
      }
    }
  }

  sumSum = () => {
    let s = this.state.sum;
    let rO = /[+]|[-]|[/]|[*]/g
    let ns = s.split(rO);
    let os = s.match(rO);

    if (ns.indexOf("0")!==-1) {
      if (ns.indexOf("0") == os.indexOf("-")) {
        console.log(os);
        console.log(ns);
        let i = ns.indexOf("0");
        ns.splice(i, 2, "-"+ns[i+1]);
        os.splice(i, 1);
        console.log(os);
        console.log(ns);
      }
    }
    
    while (os.indexOf("*")!==-1 && os.indexOf("/")!==-1) {
      if (os.indexOf("*") < os.indexOf("/")) {
        let i = os.indexOf("*");
        ns.splice(i, 2, ((parseInt(ns[i]*10)*parseInt(ns[i+1]*10))/100).toString());
        os.splice(i, 1);
      }
      else {
        let i = os.indexOf("/");
        ns.splice(i, 2, (parseInt(ns[i]*10)/parseInt(ns[i+1]*10)).toString());
        os.splice(i, 1);
      }
    }

    while (os.indexOf("*")!==-1 || os.indexOf("/")!==-1) {
      if (os.indexOf("*") !==-1) {
        let i = os.indexOf("*");
        ns.splice(i, 2, ((parseInt(ns[i]*10)*parseInt(ns[i+1]*10))/100).toString());
        os.splice(i, 1);
      }
      else {
        let i = os.indexOf("/");
        ns.splice(i, 2, (parseInt(ns[i]*10)/parseInt(ns[i+1]*10)).toString());
        os.splice(i, 1);
      }
    }

    while (os.indexOf("+")!==-1 && os.indexOf("-")!==-1) {
      if (os.indexOf("+") < os.indexOf("-")) {
        let i = os.indexOf("+");
        ns.splice(i, 2, ((parseInt(ns[i]*10)+parseInt(ns[i+1]*10))/10).toString());
        os.splice(i, 1);
      }
      else {
        let i = os.indexOf("-");
        ns.splice(i, 2, ((parseInt(ns[i]*10)-parseInt(ns[i+1]*10))/10).toString());
        os.splice(i, 1);
      }     
    }

    while (os.indexOf("+")!==-1 || os.indexOf("-")!==-1) {
      if (os.indexOf("+") !==-1) {
        let i = os.indexOf("+");
        ns.splice(i, 2, ((parseInt(ns[i]*10)+parseInt(ns[i+1]*10))/10).toString());
        os.splice(i, 1);
      }
      else {
        let i = os.indexOf("-");
        ns.splice(i, 2, ((parseInt(ns[i]*10)-parseInt(ns[i+1]*10))/10).toString());
        os.splice(i, 1);
      }
    }

    this.setState({sum: ns});
    this.setState({display: ns});
  }

  clearSum = () => {
    this.setState({sum: "0"})
    this.setState({display: "0"})
  }

  render() {
    return (
      <div className="App">
        <div id="calculator">
          <p id="display">{this.state.display}</p>
          <button id="clear" onClick={this.clearSum}>Clear</button>
          <button id="seven" onClick={this.setSum} value="7">7</button>
          <button id="eight" onClick={this.setSum} value="8">8</button>
          <button id="nine" onClick={this.setSum} value="9">9</button>
          <button id="add" onClick={this.setSum} value="+">+</button>
          <button id="four" onClick={this.setSum} value="4">4</button>
          <button id="five" onClick={this.setSum} value="5">5</button>
          <button id="six" onClick={this.setSum} value="6">6</button>
          <button id="subtract" onClick={this.setSum} value="-">-</button>
          <button id="one" onClick={this.setSum} value="1">1</button>
          <button id="two" onClick={this.setSum} value="2">2</button>
          <button id="three" onClick={this.setSum} value="3">3</button>
          <button id="multiply" onClick={this.setSum} value="*">x</button> 
          <button id="zero" onClick={this.setSum} value="0">0</button>
          <button id="decimal" onClick={this.setSum} value=".">.</button>       
          <button id="divide" onClick={this.setSum} value="/">÷</button>                  
          <button id="equals" onClick={this.sumSum}>=</button>
        </div>
      </div>
    );
  }  
}

export default App;
