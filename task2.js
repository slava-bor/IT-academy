// Задача2.
// Составьте массив дней недели. С помощью цикла for выведите все дни недели, а
// выходные дни выведите жирным.

let weekOne = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
];
let dayOne = new Date();
let divText = document.getElementById('task2');

for (let i = 0; i < weekOne.length; i++){
    let p = document.createElement('p');
    if (weekOne[i] == 'Суббота' || weekOne[i] == 'Воскресенье'){
        p.classList.add('bold');
        p.textContent = weekOne[i];
    } 
    else {p.textContent = weekOne[i]};
    divText.append(p);
}