import { displayElement, resultElement } from "./main";


export const updateDisplay = (content) => {
    displayElement.innerHTML = content;
}

export const displayOnEnter = () => {
    resultElement.classList.remove('f-sm')
    resultElement.classList.add('f-lg');
    displayElement.classList.remove('f-lg')
    displayElement.classList.add('f-sm')
}

export const displayNewExpression = () => {
    displayElement.classList.add('f-lg')
    displayElement.classList.remove('f-sm')
    resultElement.classList.remove('f-lg')
    resultElement.classList.remove('hidden')
    resultElement.classList.add('f-sm')
}

