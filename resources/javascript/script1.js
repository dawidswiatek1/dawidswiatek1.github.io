const slides = document.querySelectorAll('.slideshow img');
const slideDotsContainer = document.getElementById('slideDots');
let currentSlideIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
    currentSlideIndex = index;
    updateSlideDots();
}

function updateSlideDots() {
    slideDotsContainer.innerHTML = '';

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'slide-dot';
        if (i === currentSlideIndex) {
            dot.classList.add('active-dot');
        }
        dot.addEventListener('click', function() {
            showSlide(i);
        });
        slideDotsContainer.appendChild(dot);
    }
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
}

setInterval(nextSlide, 3000);

showSlide(currentSlideIndex);