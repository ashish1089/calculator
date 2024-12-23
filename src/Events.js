import { updateDisplay } from "./UI";

const operators = ['+', '-', '*', '/'];
export const handleButtonClick = (calculator, displayElement, resultElement, button) => {
    const value = button.getAttribute('data-key');

    if (!isNaN(value) || value === '.' || value === '%') {
        calculator.appendToExpression(value);
    } else if (operators.includes(value)) {
        calculator.appendToExpression(value)
    } else if (value === 'Enter') {
        calculator.execute();
    } else if (value === 'Escape') {
        calculator.clear();
    } else if (value === 'Backspace') {
        calculator.del();
    } else {
    }
    updateDisplay(calculator.getCurrentExpression());
}

export const handleKeyboardEvent = (calculator, displayElement, resultElement, event) => {
    const key = event.key;
    if (!isNaN(key) || key === '.' || key === '%') {
        calculator.appendToExpression(key);
    } else if (operators.includes(key)) {
        calculator.appendToExpression(key);
    } else if (key === 'Enter') {
        calculator.execute();
    } else if (key === 'Backspace') {
        calculator.del();
    } else if (key === 'Escape') {
        calculator.clear();
    }
    updateDisplay(calculator.getCurrentExpression())

}
