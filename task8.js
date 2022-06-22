// Задача8.
// Используя функцию из задания 7 напишите функцию union, которая возвращает массив
// состоящий только из уникальных элементов из каждого массива.
// const array1 = [5, 2, 1, -10, 8];
// const array2 = [5, 2, 1, -9, 3, 7];
// const union = function(array1, array2) {
// ваш код

const array1 = [5, 2, 1, -10, 8];
const array2 = [5, 2, 1, -9, 3, 7];

let union = function (array1, array2) {
    const arr = array1.concat(array2);
    return removeDuplicates(arr); //используем функция из задания №7
};

let divTask8 = document.getElementById('task8');
let p = document.createElement('p');
p.textContent = union(array1, array2);
divTask8.append('Результат : ', p);