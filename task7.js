// Задача7.
// Напишите функцию removeDuplicates(arr), которая возвращает массив, в котором
// удалены повторяющиеся элементы из массива arr (игнорируйте чувствительность к
// регистру).
// const arr = ["php", "php", "css", "css",
// "script", "script", "html", "html", "java"
// ];
// function removeDuplicates(arr) {
// Ваш код
// }
// document.writeln(result); // [php,css,script,html,java]

const arr = ['php', 'Php', 'css', 'cSs', 'script', 'scRipt', 'html', 'HtmL', 'java'];
let array = [];
arr.forEach((element, index) => {
    array[index] = arr[index].toLowerCase();
});

let result = removeDuplicates(array);
document.getElementById('temp_task7').textContent = result;

function removeDuplicates(arr) {
    let arrChange = Array.from(new Set(arr));
    return arrChange;
}