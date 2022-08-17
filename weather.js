let days = [
    { day: 'Вc', icon: '', temp_max: '', temp_min: '' },
    { day: 'Пн', icon: '', temp_max: '', temp_min: '' },
    { day: 'Вт', icon: '', temp_max: '', temp_min: '' },
    { day: 'Ср', icon: '', temp_max: '', temp_min: '' },
    { day: 'Чт', icon: '', temp_max: '', temp_min: '' },
    { day: 'Пт', icon: '', temp_max: '', temp_min: '' },
    { day: 'Сб', icon: '', temp_max: '', temp_min: '' },
];

const button = document.querySelector('#button');
const input = document.querySelector('.cityChange');
button.disabled = true;


let city = "Гомель";
getAllData(city);

button.addEventListener('click', function (e) {
    e.preventDefault();
    city = document.querySelector('.cityChange').value;
    getAllData(document.querySelector('.cityChange').value);
});

input.addEventListener('input', function() {
    if(input.value.length == 0) {
        button.disabled = true;
    }
    else {
        button.disabled = false;
    }
});

let date = new Date();
let numDay = date.getDay();
let hours = date.getHours();
let minutes = date.getMinutes();

for (i = 0; i < (numDay); ++i) {
    let temporary = days[0];
    for (j = 0; j < days.length - 1; ++j) {
        days[j] = days[j + 1];
    }
    days[days.length - 1] = temporary;
}

async function getAllData(city) {
    const URL_ONEDAY = 'https://api.openweathermap.org/data/2.5/weather?q=' + `${city}` + '&lang=ru&appid=4327315d2aa575a859c09ebd92d027bc';
    const URL_FIVEDAYS = 'https://api.openweathermap.org/data/2.5/forecast?q=' + `${city}` + '&lang=ru&appid=4327315d2aa575a859c09ebd92d027bc';
    let count = 1;
    await getOneDay(city, URL_ONEDAY);
    await getFiveDays(count, URL_FIVEDAYS);
}

async function getOneDay(city, url) {
    fetch(url)
        .then(function (resp) { return resp.json() })
        .then(function (data) {

            let sunrise = data.sys.sunrise;
            let sunriseHour = parseInt((sunrise % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let sunriseMinut = parseInt((sunrise % (1000 * 60 * 60)) / (1000 * 60));
            let sunset = data.sys.sunset;
            let sunsetHour = parseInt((sunset % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + 12);
            let sunsetMinut = parseInt((sunset % (1000 * 60 * 60)) / (1000 * 60));

            document.querySelector('.city').innerHTML = `Город : ${city}`;
            document.querySelector('.feel').innerHTML = `Чуствуется как ` + Math.round(data.main.feels_like - 273) + `&deg; C`;
            document.querySelector('.vision').innerHTML = `Видимость ` + Math.round(data.visibility / 100) + ` м`;
            document.querySelector('.pressure').innerHTML = `Давление ` + Math.round(data.main.pressure / 1000) + ` МПа`;
            document.querySelector('.humidity').innerHTML = `Влажность ` + Math.round(data.main.humidity) + `%`;
            document.querySelector('.wind').innerHTML = `Ветер ${data.wind.speed} км.ч`;
            document.querySelector('.oblachnost').innerHTML = data.weather[0][`description`];
            document.querySelector('.sunrise').innerHTML = "Восход в: " + sunriseHour + ':' + sunriseMinut;
            document.querySelector('.sunset').innerText = "Закат в: " + + sunsetHour + ':' + sunsetMinut;
            document.querySelector('.kartinka').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
            document.querySelector('.temp-current').innerHTML = Math.round(data.main.temp - 273) + `&deg; C`;
            document.querySelector('.update-time').innerHTML = 'Обновлен в : ' + hours + ':' + minutes;
            days[0].temp_min = data.main.temp_min;
            days[0].temp_max = data.main.temp_max;
            days[0].icon = data.weather[0].icon;
        });
}

async function getFiveDays(count, url) {
    fetch(url)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            for (i = 0; i <= 39; ++i) {
                let dateTime = data.list[i].dt_txt.split(' ');
                let time = dateTime[1];
                if (time == '00:00:00' && i < 36) {
                    days[count].temp_min = data.list[i].main.temp;
                    days[count].temp_max = data.list[i + 4].main.temp;
                    days[count].icon = data.list[i + 4].weather[0]['icon'];
                    ++count;
                }
            }
            for (i = 0; i < 5; ++i) {
                document.querySelector(`.day${i + 1}`).innerHTML = days[i].day;
                document.querySelector(`.img${i + 1}`).innerHTML = `<img src="https://openweathermap.org/img/wn/${days[i].icon}.png">`;
                document.querySelector(`.temp-max${i + 1}`).innerHTML = Math.round(days[i].temp_max - 273) + `&deg; C`;
                document.querySelector(`.temp-min${i + 1}`).innerHTML = Math.round(days[i].temp_min - 273) + `&deg; C`;
            }
        });
}

// фраза дня
function parseQuote(response) {
    document.querySelector('.quote').innerHTML = response.quoteText;
}