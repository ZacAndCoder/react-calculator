const isMultiplication = /\-*\d+\.*\d*×\-*\d+\.*\d*/,
      isDivision = /\-*\d+\.*\d*÷\-*\d+\.*\d*/,
      isAddition = /\-*\d+\.*\d*\+\-*\d+\.*\d*/,
      isSubtraction = /\-*\d+\.*\d*–\-*\d+\.*\d*/,
      endsWithNegativeSign = /\-$/,
      endsWithOperator = /[+÷×–]$/,
      endsWithNumber = /\d$/,
      hasDecimal = /\d*\.\d*$/;

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: [],
      result: 0,
      hasBeenEvaluated: 0
    };
    this.handleClear = this.handleClear.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }
  handleClear() {
    this.setState({
      input: [],
      result: 0,
      hasBeenEvaluated: 0
    });
  }
  handleInput(event) {
    if (this.state.input.length == 0) {
      if (event.target.value == ".") {
        this.setState({
          input: this.state.input.concat("0", event.target.value)
        });
      } else {
        this.setState({
          input: this.state.input.concat(event.target.value)
        });
      }
    } else if (this.state.input.length > 0 && this.state.input.length < 60) {
      if (this.state.hasBeenEvaluated > 0 && document.querySelector("#display").innerHTML.match(/[^+÷×–]/g) && this.state.result == 0) {
        if (event.target.value == ".") {
          this.setState({
            input: ["0"].concat(event.target.value),
            result: this.state.result + 1
          });
        } else {
          this.setState({
            input: event.target.value,
            result: this.state.result + 1
          });
        }
      } else if (event.target.value == "-") {
        if (this.state.input.join("").match(endsWithOperator)) {
          this.setState({
            input: this.state.input.concat(event.target.value)
          });
        }
      } else if (event.target.value == ".") {
        if (!document.querySelector("#display").innerHTML.match(hasDecimal)) {
          if (document.querySelector("#display").innerHTML.match(endsWithOperator) || document.querySelector("#display").innerHTML.match(endsWithNegativeSign)) {
            this.setState({
              input: this.state.input.concat("0", event.target.value)
            });
          } else {
            this.setState({
              input: this.state.input.concat(event.target.value)
            });
          }
        }
      } else {
        this.setState({
          input: this.state.input.concat(event.target.value)
        });
      }
    } else { //If input is too long, alert user and clear input//
      alert("This operation is too long.");
      this.setState({
        input: [],
        result: 0,
        hasBeenEvaluated: 0
      });
    }
  }
  handleOperator(event) {
    if (this.state.hasBeenEvaluated > 0 && document.querySelector("#display").innerHTML.match(endsWithNumber)) {
      this.setState({
        result: this.state.result + 1,
        input: document.querySelector("#display")
        .innerHTML
        .concat(event.target.value)
        .split("")
      });
    } else if (this.state.input.length == 0 || this.state.input.join("").match(endsWithNegativeSign)) {
      return;
    } else if (this.state.input.join("").match(endsWithOperator)) {
      this.setState({
        input: this.state.input
        .join("")
        .replace(endsWithOperator, event.target.value)
        .split("")   
      });
    } else {
      this.setState({
        input: this.state.input.concat(event.target.value)
      });
    }
  }
  handleEnter() {
    var answer = function() {
      var expression = document.querySelector("#display").innerHTML;
      var firstMatch;
      if (expression.indexOf("×") > 0 || expression.indexOf("÷") > 0) {
        var productsAndQuotients = expression.match(/×|÷/g);
        for (let i = 0; i < productsAndQuotients.length; i++) {
          if (productsAndQuotients[i] == "×") {
            firstMatch = expression.match(isMultiplication);
            expression = expression.replace(firstMatch.toString(), firstMatch
            .toString()
            .split("×")[0] * firstMatch
            .toString()
            .split("×")[1]);
          } else if (productsAndQuotients[i] == "÷") {
            firstMatch = expression.match(isDivision);
            expression = expression.replace(firstMatch.toString(), firstMatch
            .toString()
            .split("÷")[0] / firstMatch
            .toString()
            .split("÷")[1]);
          }
        }
      } 
      if (expression.indexOf("+") > 0 || expression.indexOf("–") > 0) {
        var sumsAndDifferences = expression.match(/\+|–/g);
        for (let i = 0; i < sumsAndDifferences.length; i++) {
          if (sumsAndDifferences[i] == "+") {
            firstMatch = expression.match(isAddition);
            expression = expression.replace(firstMatch.toString(), parseFloat(firstMatch
            .toString()
            .split("+")[0]) + parseFloat(firstMatch
            .toString()
            .split("+")[1]));
          } else if (sumsAndDifferences[i] == "–") {
            firstMatch = expression.match(isSubtraction);
            expression = expression.replace(firstMatch.toString(), firstMatch
            .toString()
            .split("–")[0] - firstMatch
            .toString()
            .split("–")[1]);
          }
        }
      }
      return expression;
    }
    this.setState({
      input: answer(),
      result: 0,
      hasBeenEvaluated: this.state.hasBeenEvaluated + 1
    });
  }
  render() {
    return (
      <div id="container">
        <div id="display">{this.state.input}</div> 
        <button onClick={this.handleClear} class="wide-button">CLEAR</button>
        <button onClick={this.handleInput} value="-">(-)</button>
        <button onClick={this.handleOperator} value="+">+</button>
        <button onClick={this.handleInput} value="7">7</button>
        <button onClick={this.handleInput} value="8">8</button>
        <button onClick={this.handleInput} value="9">9</button>
        <button onClick={this.handleOperator} value="–">–</button>
        <button onClick={this.handleInput} value="4">4</button>
        <button onClick={this.handleInput} value="5">5</button>
        <button onClick={this.handleInput} value="6">6</button>
        <button onClick={this.handleOperator} value="÷">÷</button>
        <button onClick={this.handleInput} value="1">1</button>
        <button onClick={this.handleInput} value="2">2</button>
        <button onClick={this.handleInput} value="3">3</button>
        <button onClick={this.handleOperator} value="×">×</button>
        <button onClick={this.handleInput} value=".">.</button>
        <button onClick={this.handleInput} value="0">0</button>
        <button onClick={this.handleEnter} class="wide-button">ENTER</button>
      </div>    
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("calculator"));
