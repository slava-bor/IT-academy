const images = document.querySelectorAll('.item')

function showDots() {
    let dotscontaioner = document.querySelector('.dots');
    dotscontaioner.innerHTML = '';
    for (let i = 0; i < images.length; i++) {
        dotscontaioner.innerHTML += `<span class="dots_item" onclick="dotsClick(${i})"></span>`
    }
}
showDots()

let slideIndex = 0;
showSlide(undefined, slideIndex);

function next() {
    showSlide(slideIndex, slideIndex += 1);
}

function prev() {
    showSlide(slideIndex, slideIndex -= 1); 
}

function dotsClick(clickElement) {
    showSlide(slideIndex, clickElement)
    slideIndex = clickElement;
}

function showSlide(prevElement, nextElement) {
    if(prevElement != undefined) {
        images[prevElement].classList.remove('active');
    }
    if(nextElement > images.length - 1) {
        images[0].classList.add('active')
        slideIndex = 0;
        dotsControl(slideIndex);
        return;
    }
    if(nextElement < 0) {
        images[images.length - 1].classList.add('active')
        slideIndex = images.length - 1;
        dotsControl(slideIndex);
        return;
    }
    images[nextElement].classList.add('active');
    dotsControl(nextElement);
}

function dotsControl(slideIndex) {
    let dots = document.querySelectorAll('.dots_item');
    for(let i = 0; i < dots.length; i++) {
        dots[i].id = '';
    }
    dots[slideIndex].id = 'active';
}