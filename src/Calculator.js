import { resultElement, } from "./main";
import { displayNewExpression, displayOnEnter } from "./UI";

export const createCalculator = () => {
    const operators = ['+', '-', '*', '/', '%']
    let currentExpression = '0';
    let result = 0
    let finalResult = false;
    const maxLength = 12;

    const clear = () => {
        currentExpression = '0';
        resultElement.textContent = ''
        displayNewExpression();
    };

    const del = () => {
        if (finalResult) return;
        currentExpression = currentExpression.slice(0, -1)
        evaluate()
    };

    const appendToExpression = (input) => {
        evaluate();
        if (currentExpression === '0') {
            if (input === '%') {
                return
            } else if (operators.includes(input)) {
                currentExpression += input;
                evaluate();
                return;
            }
            currentExpression = ''
        }

        if (currentExpression.length <= maxLength) {
            if (finalResult) {
                finalResult = false;
                if (input === '%') {
                    currentExpression = parseFloat(result / 100).toString();
                } else if (operators.includes(input)) {
                    currentExpression = result + input;
                } else {
                    currentExpression = input;
                    resultElement.textContent = '= ' + currentExpression
                }
            } else {
                // Avoid consecutive operators
                const lastChar = currentExpression[currentExpression.length - 1]
                // Prevent starting with operator
                if (operators.includes(input) && currentExpression === '') {
                    return;
                } else if (operators.includes(lastChar) && operators.includes(input)) {
                    if (input === '%') {
                        return;
                    } else {
                        del();
                        currentExpression += input;
                        return;
                    }
                } else
                    // hanlde percentage
                    if (input === '%') {
                        currentExpression = handlePercentageInput
                            (currentExpression);
                        evaluate()
                        return;
                    }
                currentExpression += input;
                evaluate();
            }
        } else {
            resultElement.textContent = 'Max Limit'
        }
    };

    const evaluate = () => {
        try {
            displayNewExpression()
            if (currentExpression !== '') {
                if (currentExpression === '0/0') {
                    result = 'undefined';
                    resultElement.textContent = '= ' + result;
                    return;
                }
                result = Function(`return ${currentExpression}`)();
                if (result % 1 !== 0) {
                    result = parseFloat(result.toFixed(5)).toString();
                }
                resultElement.classList.remove('hidden')
                resultElement.textContent = "= " + result;
                return
            } else {
                resultElement.classList.add('hidden')
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                return;
            } else {
                resultElement.textContent = `${error}`
            }

        }
    }


    const extractLastNumber = (expression) => {

        let lastOperatorIndex = -1;
        let numberPart;
        for (let i = expression.length - 1; i >= 0; i--) {
            if (operators.includes(expression[i])) {
                lastOperatorIndex = i;
                break;
            }
        }
        // If no operator is found, return null
        if (lastOperatorIndex === -1) {
            return null;
        } else {
            // Extract the substring after the last operator
            numberPart = expression.slice(lastOperatorIndex + 1);
        }
        return numberPart
    }

    const handlePercentageInput = (expression) => {
        const lastNumber = extractLastNumber(expression);
        if (lastNumber !== null) {
            expression = expression.replace(
                new RegExp(`${lastNumber}%?$`), parseFloat(lastNumber / 100)
            )
        } else {
            expression = parseFloat(result / 100).toString();
        }
        return expression;
    }

    const onEnter = () => {
        if (currentExpression !== '0') {
            displayOnEnter();
            finalResult = true;
        }
    }
    const icons = {
        '+': 'fa-plus',
        '-': 'fa-minus',
        '*': 'fa-xmark',
        '/': 'fa-divide',
    };

    const getCurrentExpression = () => {
        try {
            const display = currentExpression.replace(/[\+\-\*\/%]/g, (match) => `<i class="fa-solid ${icons[match]}"></i>`);
            return display;
        } catch (error) {
            console.log(error);
            return currentExpression;
        }
    }
    return {
        clear,
        del,
        appendToExpression,
        execute: onEnter,
        getCurrentExpression,
    }
}