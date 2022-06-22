// Задача3.
// Напишите функцию copyArr(arr), которая копирует массив не изменяя оригинал.
// vegetables = ['Капуста', 'Репа', 'Редиска', 'Морковка'];
// function arrayClone(arr) {
// Ваш код
// }

let vegetables = ['Капуста', 'Репа', 'Редиска', 'Морковка'];
let clonvegetables = arrayClone(vegetables);
let divTask3 = document.getElementById('task3');

let pVeg = document.createElement('p');
pVeg.textContent = vegetables;
divTask3.append('Массив оригинал:', pVeg);

let pClon = document.createElement('p');
pClon.textContent = clonvegetables;
divTask3.append('Массив клон:', pClon);

function arrayClone(arr){
    let arrClone = Array.from(arr);
    return arrClone;
}