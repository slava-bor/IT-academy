//JS - игра Крестики-Нолики
//playfield - Игровое поле
//playsquare - Игровой квадрат
//playerMove - Количество ходов
// resultWinner - Массив с возможными вариантами выиграша
// winner - Переменная с данными о Победителе: 0 - Нолики, 1 - Плюсики, 2 - Ничья
// draw - переменная, чтобы определить на последнем ходу, был ли Победитель, либо закончены ходы, а Победителя так и нет

let playfield = document.getElementById('play_field');
let m; //количество строк
let n; //количество столбцов

function myClick() {
    let input = document.querySelectorAll('input');
    m = +input[0].value;
    n = +input[1].value;
    let wth = m * 76 + 'px';
    let hth = n * 76 + 'px';
    playfield.style.width = wth; // подстариваем ширину поля игрока под количество квадратов
    playfield.style.height = hth; // подстариваем высоту поля игрока под количество квадратов
 
    for (var i = 0; i < (m * n); i++) {
        let div = document.createElement('div');
        div.className = 'play_square';
        div.dataset.index = i;
        document.getElementById('play_field').append(div);
      }

    let arr = [];
    for (let i = 0; i < m; i++) {
        let arrsr = [];
        for (var j = 0; j < n; j++) {
            arrsr[j] = 2;
        }
        arr[i] = arrsr; // собрали двухмерный массив по размеру поля игрока и количеству квадратов
    }

    let playerMove = 0;
    playfield.addEventListener ('click', event => {
        if (event.target.className == 'play_square') 
        {
            let value = event.target.value;
            if (playerMove % 2 == 0) {
                if (value != 0 && value != 1){ // если игровой квадрат пустой, присваиваем 0
                    event.target.value = 0;
                    event.target.innerHTML  = `O`;
                    playerMove += 1;
                    let dataindex = event.target.dataset.index;
                    let i = Math.floor(dataindex / m);
                    let j = dataindex - i * n;
                    arr[i][j] = 0;
                    let draw = resultСheck(arr, i, j, 0); //проверка количество ходов игроков и выявление Победителя после каждого шага
                    if (playerMove == 25 && draw != 1) stopgame(2);
                } 
            }
            else {
                if (value != 0 && value != 1){ // если игровой квадрат пустой, присваиваем X
                    event.target.value = 1;
                    event.target.innerHTML  = `Х`;
                    playerMove += 1;
                    let dataindex = event.target.dataset.index;
                    let i = Math.floor(dataindex / m);
                    let j = dataindex - i * n;
                    arr[i][j] = 1;
                    let draw = resultСheck(arr, i, j, 1); //проверка количество ходов игроков и выявление Победителя после каждого шага
                    if (playerMove == 25 && draw != 1) stopgame(2);
                }
            }
            if (playerMove == 25 && draw != 1) stopgame(2); //если количество ходов игроков закончилось и не выявлен Победитель, 
                                                        // заканчиваем игру со слвами "Ничья"
        }
    })
}

//Проверка текущих результатов игры
function resultСheck(arr, sr, st, winner) {
    // вправо
    if (st+1 <= n) {
        if (arr[sr][st] == arr[sr][st+1]) {
            if (st+2 <= n) {
                if (arr[sr][st] == arr[sr][st+2]) stopgame(winner);}
            else if (st-1 >= 0) {if (arr[sr][st] == arr[sr][st-1]) stopgame(winner);}
        }
    }
    // вправо вниз
    if (sr+1 <= m && st+1 <= n) {
        if (arr[sr][st] == arr[sr+1][st+1]) {
            if (sr+2 <= m && st+2 <= n){
                if (arr[sr][st] == arr[sr+2][st+2]) stopgame(winner);}
            else if (sr-1 >= 0 && st-1 >= 0) {if (arr[sr][st] == arr[sr-1][st-1]) stopgame(winner);}
        }
    }
    // вниз
    if (sr+1 <= m) {
        if (arr[sr][st] == arr[sr+1][st]) {
            if (sr+2 <= m) {
                if (arr[sr][st] == arr[sr+2][st]) stopgame(winner);}
            else if (sr-1 >=0) {if (arr[sr][st] == arr[sr-1][st]) stopgame(winner);}
        }
    }
    // влево вниз
    if (sr+1 <= m && st-1 >= 0) {
        if (arr[sr][st] == arr[sr+1][st-1]) {
            if (sr+2 <= m && st-2 >= 0) {
                if (arr[sr][st] == arr[sr+2][st-2]) stopgame(winner);}
            else if (sr-1 >= 0 && st+1 <= n) {if (arr[sr][st] == arr[sr-1][st+1]) stopgame(winner);}
        }
    }
    // влево
    if (st-1 >= 0) {
        if (arr[sr][st] == arr[sr][st-1]) {
            if (st-2 >= 0) {
                if (arr[sr][st] == arr[sr][st-2]) stopgame(winner);}
            else if (st+1 <= n) {if (arr[sr][st] == arr[sr][st+1]) stopgame(winner);}
        }
    }
    // влево вверх
    if (sr-1 >= 0 && st-1 >= 0) {
        if (arr[sr][st] == arr[sr-1][st-1]) {
            if (sr-2 >= 0 && st-2 >=0) {
                if (arr[sr][st] == arr[sr-2][st-2]) stopgame(winner);}
            else if (sr+1 <= m && st+1 <= n) {if (arr[sr][st] == arr[sr+1][st+1]) stopgame(winner);}
        }
    }
    // вверх
    if (sr-1 >= 0) {
    if (arr[sr][st] == arr[sr-1][st]) {
        if (sr-2 >= 0) {
            if (arr[sr][st] == arr[sr-2][st]) stopgame(winner);}
        else if (sr+1 <= m) {if (arr[sr][st] == arr[sr+1][st]) stopgame(winner);}
        }
    }
    // вверх вправо
    if (sr-1 >= 0 && st+1 <= n) {
        if (arr[sr][st] == arr[sr-1][st+1]) {
            if (sr-2 >= 0 && st+2 <= n) {
                if (arr[sr][st] == arr[sr-2][st+2]) stopgame(winner);}
                else if (sr+1 <= m && st-1 >= 0) {if (arr[sr][st] == arr[sr+1][st-1]) stopgame(winner);}
        }
    }
    return 1; 
}

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
    let gameOver = document.querySelector('#game_over')
    gameOver.style.display = 'block'; //наложили прозрачный div поверх игрового поля
    console.log ('Размеры m, n по окончанию игры', m, n);
    gameOver.style.width = m * 76 + 'px';
    gameOver.style.height = n * 76 +'px';
    document.querySelector('#win').style.display = 'block'; //активируем div#win для вывода победителя
}

