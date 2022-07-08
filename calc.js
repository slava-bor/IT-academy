const but = [];
const num = ['AC', 'DEL', '/', 1, 2, 3, '*', 4, 5, 6, '+', 7, 8, 9, '-', '.', 0, '='];

class DigitButton {
    constructor(label) {
      this.elem = document.createElement('button');
      this.elem.className = 'button';
      this.label = label;
      this.elem.innerHTML = label;
      this.setClass(label);
    }
    setClass(label) {
      switch (typeof label) {
        case ('number'): 
          this.elem.value = 'matSymbol';
        break;
        default:
          this.elem.value = 'matLogic';
      }
    }
}

let calc = document.createElement('div'); // общий блок всего калькулятора
calc.className = 'calc';
document.body.append(calc);

let display = document.createElement('div'); // блок display для ввода цифр и ввыода результата
display.className = 'display';
display.innerHTML = '0';
calc.append(display);

let buttons = document.createElement('div');
buttons.className = 'buttons';
calc.append(buttons);

// цикл для формирования массива кнопок калькулятора
for (let i=0; i < 18; i++){
  but[i] = new DigitButton(num[i]);
  buttons.append(but[i].elem);
}
    
let strDisplay = ''; // строка для записи всего арифметического выражения

//проверка какая кнопка нажата
document.body.addEventListener('click', elem => { 
  let val = elem.target.value;
  let znak = elem.target.innerHTML;
  but.forEach(element => {
    if (znak == element.label && znak != '=' && znak != 'AC' && znak != 'DEL') check(element.label, val);
  });
  if (znak == '=') strDisplay = result(strDisplay);
  if (znak == 'AC') clearAll();
  if (znak == 'DEL') deleteLastDigit();
});

  // функция для записи всех введенных аргументов в strDisplay
function check(symbol, val) {
  if (val == 'matLogic') {
    let previousSymbol = strDisplay.slice(-1);
    if (symbol == '-') strDisplay[strDisplay.length - 1] = '-';
    if (previousSymbol != '*' && previousSymbol != '/' && previousSymbol != '+' && previousSymbol != '-') {
      strDisplay += symbol;
      display.innerHTML = strDisplay;
    }
  } else {
    if (strDisplay.length < 14) {
      strDisplay += symbol;
      display.innerHTML = strDisplay;
    } else {
      clearAll();
      display.innerHTML = 'Ошибка ввода';
    }
  }
  //не позволяет начать строку со знаков * / +
  if (strDisplay[0] == '*' || strDisplay[0] == '/' || strDisplay[0] == '+') {
    strDisplay = ''; 
    display.innerHTML = strDisplay;
  }
}

// функция очистки экрана и обнуление значения переменной strDisplay
function clearAll() {
  strDisplay = '';
  symbol = '';
  display.innerHTML = '0';
}

//функция удаления последний цифры
function deleteLastDigit() {
  if (strDisplay != '') {
    strDisplay = strDisplay.slice(0, -1);
    display.innerHTML = strDisplay;
    if (strDisplay == '') display.innerHTML = '0';
  }
}

// функция для итогового расчета результата
function result (strDisplay) {
  if (strDisplay[0] == '/' || strDisplay[0] == '*') strDisplay = '0';
  if (strDisplay != '') {
    if (eval(strDisplay) % 1 == 0) strDisplay = eval(strDisplay).toFixed(0);
    else strDisplay = eval(strDisplay).toFixed(2);
  }
  if (eval(strDisplay) == 'Infinity') strDisplay = 'Error';
  display.innerHTML = strDisplay;
  if (strDisplay == 'Error') return '0';
  else return strDisplay;
}