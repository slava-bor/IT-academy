// Задача5.
// Пользователь вводит многозначное число через promt. Напишите функцию
// colonOdd(num), которая принимает число num в качестве аргумента и вставляет
// двоеточие (:) между двумя нечетными числами. Например, если вводится число
// 55639217, то на выход должно быть 5:563:921:7.
// Материал для изучения: https://learn.javascript.ru/alert-prompt-confirm

enter.onclick = function colonOdd(){
let num = prompt('Введите число','');

let divTask5 = document.getElementById('temp_task5');
let p = document.createElement("p");
document.getElementById('temp_task5').innerHTML = '';
let str = '';

if (num !== null && num != '') {
    let arr = num.split('');
    let arrLgh = arr.length;
    for (let i = 0; i < arrLgh; i++){
        if ((arr[i] % 2 !== 0) && (arr[i + 1] % 2 !== 0) && (i != (arrLgh - 1))){    
            str += arr[i] + ':';
        }
        else str += arr[i];
        }
    }
    else if (num === '') str = 'Вы ничего не ввели';
    p.textContent = str;
    divTask5.append(p);
}