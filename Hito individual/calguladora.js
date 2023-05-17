document.addEventListener('DOMContentLoaded', function() {
  const display = document.querySelector('.calculator__display');
  const keys = document.querySelector('.calculator__keys');

  let firstValue = 0;
  let operator = null;
  let awaitingNextValue = false;

  function calculate(firstValue, operator, secondValue) {
    const value1 = parseFloat(firstValue);
    const value2 = parseFloat(secondValue);

    if (operator === 'add') {
      return value1 + value2;
    } else if (operator === 'subtract') {
      return value1 - value2;
    } else if (operator === 'multiply') {
      return value1 * value2;
    } else if (operator === 'divide') {
      return value1 / value2;
    } else if (operator === 'sqrt') {
      return Math.sqrt(value2);
    } else if (operator === 'percentage') {
      return value1 * (value2 / 100);
    } else if (operator === 'square') {
      return value2 * value2;
    }

    return value2;
  }

  keys.addEventListener('click', function(e) {
    if (e.target.matches('button')) {
      const key = e.target;
      const action = key.dataset.action;
      const keyContent = key.textContent;
      const displayedNum = display.textContent;

      if (!action) {
        if (displayedNum === '0' || awaitingNextValue) {
          display.textContent = keyContent;
          awaitingNextValue = false;
        } else {
          display.textContent = displayedNum + keyContent;
        }
      } else if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        const secondValue = displayedNum;

        if (firstValue && operator && !awaitingNextValue) {
          const result = calculate(firstValue, operator, secondValue);
          display.textContent = result;
          firstValue = result;
        } else {
          firstValue = displayedNum;
        }

        operator = action;
        awaitingNextValue = true;
      } else if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
          display.textContent = displayedNum + '.';
        }
      } else if (action === 'clear') {
        display.textContent = '0';
        firstValue = 0;
        operator = null;
        awaitingNextValue = false;
      } else if (action === 'calculate') {
        const secondValue = displayedNum;
        const result = calculate(firstValue, operator, secondValue);
        display.textContent = result;
        firstValue = result;
        awaitingNextValue = true;
      } else if (action === 'sqrt') {
        const result = Math.sqrt(parseFloat(displayedNum));
        display.textContent = result;
        firstValue = result;
      } else if (action === 'percentage') {
        const result = (parseFloat(firstValue) * parseFloat(displayedNum)) / 100;
        display.textContent = result;
        firstValue = result;
      } else if (action === 'square') {
        const result = parseFloat(displayedNum) ** 2;
        display.textContent = result;
        firstValue = result;
      }
    }
  });
});

