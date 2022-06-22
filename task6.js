// Задача6.
// Составьте массив дней недели. С помощью foreach выведите все дни недели, а
// текущий день выведите курсивом.
// Текущей день недели должен быть получен с помощью JS класса Date

let weekTwo = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
];
let divTask6 = document.getElementById('task6');

let dayTwo = new Date();
let dayCurrent = dayTwo.getDay() - 1;
if (dayCurrent < 0) dayCurrent = 6;

weekTwo.forEach( function (item,index){
    let p = document.createElement('p');
    if (index == dayCurrent) {
        p.style.fontStyle = 'italic'; // еще один способ присвоить стиль
        p.textContent = weekTwo[index];
    }
    else {p.textContent = weekTwo[index]};
    divTask6.append(p);
});