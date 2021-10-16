
# React Calculator

## Description

To view this project, click [here](https://zacandcoder.github.io/react-calculator/).

Primarily using React, I built a calculator without utilizing the **eval** function. While a calculator may not be the most impressive creation, I wanted to show that I could put something together in React, which is undeniably a popular library.  

The calculator allows for addition, subtraction, multiplication, and division. Buttons only affect the calculator's input if the operation is logical (e.g., selecting the plus sign will not do anything unless the input already contains a number). If there is an operator at the end of the input, pressing a different operator button will replace the previous operator.

After the **ENTER** button is clicked, the expression is evaluated. If users then click an operator button, the previous answer will remain in the input so that it can be used in the new operation. However, if users press a number, negative sign, or decimal, the previous answer will be cleared and replaced by the new symbol.

## GIF

![Calculator-GIF](https://user-images.githubusercontent.com/91081344/136443159-68350177-b409-4503-bb25-e7c3305dc779.gif)

## Example Code

```
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
          //Use parseFloat here to add rather than concatenate the subarrays//
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
```

This function is executed when the **ENTER** button is pressed. It performs math operations and displays an answer. I chose to explain this function in particular because it gave me the most trouble. React did not allow me to use **setState** multiple times within the same function, as only one set of changes would properly render. Therefore, I had to create a workaround by calculating the answer in a plain JavaScript function, then calling this function in React with the state **input**. This way, the state only needs to be set once. 

Starting from the beginning of the function, the **expression** variable saves the input, while the **firstMatch** variable is initialized so that it can be used in multiple loops. Then, if either a multiplication sign *or* a division sign is found in the **expression**, the array **productsAndQuotients** saves all such signs. These signs are identified before addition and subtraction signs to ensure the correct order of operations is performed. 

For as many times as there are items in the aforementioned array, a loop runs. This means that an expression with one multiplication sign will only loop once. Within the loop, an "if-else" statement determines which symbol the current array item is. If it is a multiplication sign, for example, the **firstMatch** variable identifies the first instance of multiplication in the expression. Next, the **firstMatch** is replaced by the product of said multiplication. Since **eval** is not used, this is manually done by splitting the **firstMatch** string at the multiplication sign, thereby erasing it, and then multiplying the two resulting subarrays. This process is repeated for division, addition, and subtraction.

The **answer** function returns the updated **expression**. Finally, when the state **input** calls this function, the answer is displayed. The **hasBeenEvaluated** variable updates so that another React function of mine, **handleOperators**, knows to treat the answer as the start of a new expression if an operator button is clicked. 

## Contributing

Since this is a personal project intended to showcase my own skills and limitations, I will not be accepting any contributions at this time.

## License

This project uses the MIT License.
