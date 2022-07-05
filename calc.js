const but = [];
const num = ['AC', 'DEL', '/', 1, 2, 3, '*', 4, 5, 6, '+', 7, 8, 9, '-', '.', 0, '='];

class DigitButton {
    constructor(elem, label, sign) {
      this.elem = elem;
      this.label = label;
      elem.innerHTML = label;
      this.value = sign;
      elem.value = sign;
    }
    toString(){
      return this.elem
    }
}

  let body = document.querySelector('body');
  let calc = document.createElement('div'); // общий блок всего калькулятора
  calc.className = 'calc';
  body.append(calc);

  let display = document.createElement('div'); // блок display для ввода цифр и ввыода результата
  display.className = 'display';
  display.innerHTML = '0';
  calc.append(display);

  let buttons = document.createElement('div');
  buttons.className = 'buttons';
  calc.append(buttons);

  // цикл для формирования массива кнопок калькулятора
  for (let i=0; i < 18; i++){
    let button = document.createElement('button');
    button.className = 'button';
    if (i == 0 || i == 1 || i == 17) {
      but[i] = new DigitButton(button, num[i], 'matLogic');
    }
    else {but[i] = new DigitButton(button, num[i], 'matSymbol');}
    buttons.append(but[i].toString());
  }
    
  //проверка какой какая кнопка нажата
  let button = document.getElementsByTagName('button');
    body.addEventListener('click', elem => { 
      if (elem.target.value == 'matSymbol') {
        if (elem.target.innerHTML == '0') check('0');
        if (elem.target.innerHTML == '1') check('1');
        if (elem.target.innerHTML == '2') check('2');
        if (elem.target.innerHTML == '3') check('3');
        if (elem.target.innerHTML == '4') check('4');
        if (elem.target.innerHTML == '5') check('5');
        if (elem.target.innerHTML == '6') check('6');
        if (elem.target.innerHTML == '7') check('7');
        if (elem.target.innerHTML == '8') check('8');
        if (elem.target.innerHTML == '9') check('9');
        if (elem.target.innerHTML == '.') check('.');
        if (elem.target.innerHTML == '+') check('+');
        if (elem.target.innerHTML == '/') check('/');
        if (elem.target.innerHTML == '*') check('*');
        if (elem.target.innerHTML == '-') check('-');
      } 
      else { 
        if (elem.target.innerHTML == '=') strDisplay = result (strDisplay);
        if (elem.target.innerHTML == 'AC') clearAll('AC');
        if (elem.target.innerHTML == 'DEL') deleteLastDigit('DEL');
      }
    });
  
  let strDisplay = ''; // строка для записи аргуметнов для дальнейшего их вычисления

  // функция для записис всех введенных аргументов в strDisplay
  function check(symbol) {
    //проверяем хватает ли длины дисплея (на дисплее помещается 14 символов)
    if (strDisplay.length < 14) {
        strDisplay += symbol;
        display.innerHTML = strDisplay;
    }
    if (strDisplay.length >= 14) {
      strDisplay = '';
      display.innerHTML = 'Ошибка ввода';
    }
  }

  // функция очистки экрана и обнуление значения переменной strDisplay
  function clearAll(symbol) {
    strDisplay = '';
    symbol = '';
    display.innerHTML = '0';
  }

  //функция удаления последний цифры
  function deleteLastDigit(symbol) {
    if (strDisplay != ''){
      strDisplay = strDisplay.slice(0, -1);
      display.innerHTML = strDisplay;
      if (strDisplay == '') display.innerHTML = '0';
    }
  }

  // функция для итогового расчета результата
  function result (strDisplay) {
    if (strDisplay[0] == '/' || strDisplay[0] == '*') strDisplay = '0';
    if (strDisplay != ''){
      if (eval(strDisplay) % 1 == 0) strDisplay = eval(strDisplay).toFixed(0);
      else strDisplay = eval(strDisplay).toFixed(2);
    }
    display.innerHTML = strDisplay;
    console.log(strDisplay);
    return strDisplay;
  }
