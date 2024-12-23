import './style.css'
import { createCalculator } from "./Calculator.js";
import { handleButtonClick, handleKeyboardEvent } from './Events.js';

export const displayElement = document.getElementById('calculator-display');
export const resultElement = document.querySelector('.result')
const allButtons = document.querySelectorAll('.buttons button')

const calculator = createCalculator();

allButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleButtonClick(calculator, displayElement, resultElement, button)
    });

});

document.addEventListener('keydown', (event) => {
    for (let i = 0; i < allButtons.length; i++) {
        const button = allButtons[i]
        if (button.getAttribute('data-key') === event.key) {
            button.classList.add('clicked');
        }
    }

    handleKeyboardEvent(calculator, displayElement, resultElement, event);

})
document.addEventListener('keyup', (event) => {
    for (let i = 0; i < allButtons.length; i++) {
        const button = allButtons[i]
        if (button.getAttribute('data-key') === event.key) {
            button.classList.remove('clicked');
        }
    }
})

