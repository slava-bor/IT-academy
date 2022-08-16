ymaps.ready(init);
function init() {
    // let myGeocoder = ymaps.geocode(`${document.querySelector('.cityChange').value}`);
    let myGeocoder = ymaps.geocode(`${city}`);
    myGeocoder.then(
        function (res) {
            new ymaps.Map("map", {
            center: res.geoObjects.get(0).geometry.getCoordinates(),
            zoom: 10
        });
    });
}