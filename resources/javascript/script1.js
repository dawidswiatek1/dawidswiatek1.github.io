const images = [
  'images1.jpg',
  'images2.jpg',
  'images3.jpg',
  'images4.jpg',
  'images5.jpg',
  'images6.jpg',
  // Dodaj pozostałe obrazy z folderu
];
let currentSlideIndex = 0;

    function showSlide(index) {
        const imageUrl = `../resources/images/${images[index]}`;
        document.body.style.backgroundImage = `url('${imageUrl}')`;
        currentSlideIndex = index;
        updateSlideDots();
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % images.length;
        showSlide(currentSlideIndex);
    }

    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + images.length) % images.length;
        showSlide(currentSlideIndex);
    }

    function updateSlideDots() {
        const slideDotsContainer = document.getElementById('slideDots');
        slideDotsContainer.innerHTML = '';

        for (let i = 0; i < images.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'slide-dot';
            if (i === currentSlideIndex) {
                dot.classList.add('active-dot');
            }
            slideDotsContainer.appendChild(dot);
        }
    }

    // Pokaż pierwszy slajd po załadowaniu strony
    showSlide(currentSlideIndex);

    // Obsługa przesuwania na urządzeniach mobilnych
    let touchStartX = 0;
    let touchEndX = 0;

    document.body.addEventListener('touchstart', function(event) {
        touchStartX = event.touches[0].clientX;
    });

    document.body.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // Minimalna odległość przesunięcia, aby uznać to za przesunięcie

        if (touchStartX - touchEndX > swipeThreshold) {
            nextSlide(); // Swipe w lewo - przejdź do następnego slajdu
        } else if (touchEndX - touchStartX > swipeThreshold) {
            prevSlide(); // Swipe w prawo - przejdź do poprzedniego slajdu
        }
    }
