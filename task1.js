// Задача1.
// Дан объект obj с ключами 'Минск', 'Москва', 'Киев' с элементами 'Беларусь', 'Россия',
// 'Украина'. С помощью цикла for-in выведите на экран строки такого формата: 'Минск -
// это Беларусь.'.

let obj = {
    'Minsk': 'Belarus',
    'Moskwa': 'Rossia',
    'Kiew': 'Ukrain'
};

let btn = document.querySelector('button');
let divTask1 = document.getElementById('temp_task1');
btn.addEventListener('click', () => {
    divTask1.style.display = (divTask1.style.display == 'inline') ? 'none' : 'inline'});

document.querySelector('.button').addEventListener('click', () => {
    document.getElementById('temp_task1').innerHTML = '';
    let divFirst = document.getElementById('temp_task1');
    for (let key in obj) {
        let p = document.createElement('p');
        p.textContent = key + ' - ' + obj[key];
        divFirst.append(p);
    }
});