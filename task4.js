// Задача4.
// Напишите функцию, которая преобразовывает и объединяет все элементы массива
// (numbers + strings) в одно строковое значение. Элементы массива будут разделены
// запятой. Получите результат двумя разными методами (с использованием цикла и без
// него)
// Функция должна принимать массив а возвращать строку.

let arr1 = [1, 'Hello', 22, 'world'];
let arr2 = ['IT', 23, 'Epam', 33];

let div = document.getElementById('temp_task4');

// первый вариант с использованием цикла
For.onclick = () => {
    let txtVar = 'Использовали For';
    let strarr1 = arr1[0] + ',';
    let strarr2 = arr2[0] + ',';
    for (let i = 1; i < arr1.length; i++){ 
        if  (i < arr1.length) { strarr1 += arr1[i] + ',' }
            else { strarr1 += arr1[i] }
     };
    for (let i = 1; i < arr2.length; i++){ 
        strarr2 += arr2[i]; 
        if  (i < arr2.length - 1) strarr2 += ',';
    };
    let string = strarr1 + strarr2; 
    showResult(arr1, arr2, string, txtVar);
}

// второй вариант без использованием цикла
Join.onclick = () => {
    let txtVar = 'Использовали Join';
    let string1 = arr1.join(','); //склеивание элментов массива c запятой
    let string2 = arr2.join(','); //склеивание элментов массива c запятой
    let string = string1 + ',' +  string2; 
    showResult(arr1, arr2, string, txtVar);
}

function showResult (arr1, arr2, string, txtVar){
    div.innerHTML = '';
    let arrays = [arr1, arr2, string];
    for (let i = 0; i < arrays.length; i++){
        let p = document.createElement('p');
        p.textContent = arrays[i];
        let text = i <= 1 ? 'Массив' : txtVar;
        div.append(text, p);
    };
}