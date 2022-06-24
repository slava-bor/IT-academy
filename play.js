//JS - игра Крестики-Нолики
//playfield - Игровое поле
//playsquare - Игровой квадрат
//playerMove - Количество ходов
// resultWinner - Массив с возможными вариантами выиграша
// winner - Переменная с данными о Победителе: 0 - Нолики, 1 - Плюсики, 2 - Ничья
// draw - переменная, чтобы определить на последнем ходу, был ли Победитель, либо закончены ходы, а Победителя так и нет

let playfield = document.getElementById('play_field');
let playsquare = document.getElementsByClassName('play_square');

const resultWinner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let playerMove = 0;

playfield.addEventListener ('click', event => {
    if (event.target.ClassName = 'play_square') 
    {
        if (playerMove % 2 == 0) {
            if (event.target.value != 0 && event.target.value != 1){ // если игровой квадрат пустой, присваиваем 0
                event.target.value = 0;
                event.target.innerHTML  = `O`;
                playerMove += 1;
            } 
        }
        else {
            if (event.target.value != 0 && event.target.value != 1){ // если игровой квадрат пустой, присваиваем +
                event.target.value = 1;
                event.target.innerHTML  = `X`;
                playerMove += 1;
            }
        }
        //проверка количество ходов игроков и выявление Победителя после каждого шага
        let draw = resultСheck(playsquare);
        if (playerMove == 9 && draw != 1) stopgame(2); //если количество ходов игроков закончилось и не выявлен Победитель, 
                                                       // заканчиваем игру со слвами "Ничья"
    }
});

// Проверка текущих результатов игры
function resultСheck(playsquare) {
    for (let i = 0; i < 8; i++) {
        if (playsquare[resultWinner[i][0]].value == 0 && playsquare[resultWinner[i][1]].value == 0 && playsquare[resultWinner[i][2]].value == 0) {
            stopgame(0);
            return 1;
        }
    }
    for (let i = 0; i < 8; i++) {
        if (playsquare[resultWinner[i][0]].value == 1 && playsquare[resultWinner[i][1]].value == 1 && playsquare[resultWinner[i][2]].value == 1) {
            stopgame(1);
            return 1;
        }
    }
};

// Стоп игра и вывод Победителя
function stopgame(winner) {
    switch(winner) {
        case 0:  
            document.querySelector('#result').innerHTML = `Победили нолики`;
            break;
        case 1:
            document.querySelector('#result').innerHTML = `Победили крестики`;
            break;
        default:
            document.querySelector('#result').innerHTML = `Ничья`;
    }
    document.querySelector('#game_over').style.display = 'block'; //наложили прозрачный div поверх игрового поля
    document.querySelector('#win').style.display = 'block'; //активируем div#win для вывода победителя
};
