ymaps.ready(init);

var myMap;

let citi = 'Гомель';

async function init() {
    let center = await ymaps.geocode(`${citi}`)
        .then(res => res.geoObjects.get(0).geometry.getCoordinates())
        myMap = new ymaps.Map('map', {
            center: center,
            zoom: 10
        });
}

document.querySelector('#button').addEventListener('click', function () {
    citi = document.querySelector('.cityChange').value;
    setCenter();
})

function setCenter() {
    let myGeocoder = ymaps.geocode(`${citi}`);
    myGeocoder.then(
        function (res) {
            myMap.setCenter(res.geoObjects.get(0).geometry.getCoordinates())
        });
}