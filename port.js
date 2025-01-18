document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for animation when elements come into view
    if ('IntersectionObserver' in window) {
        const boxes = document.querySelectorAll('.lecture-box');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        boxes.forEach(box => {
            observer.observe(box);
        });
    } else {
        // Fallback for older browsers: Make all elements visible
        const boxes = document.querySelectorAll('.lecture-box');
        boxes.forEach(box => box.classList.add('visible'));
    }

    // Intersection Observer to add 'visible' class to images when they enter the viewport
const images = document.querySelectorAll('.container2 img');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Add the 'visible' class when in view
            observer.unobserve(entry.target); // Stop observing after the element becomes visible
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of the image is in view

// Observe each image in the container
images.forEach(image => {
    observer.observe(image);
});

    // Scrollable announcements functionality
    const scrollUpButton = document.querySelector('.scroll-up');
    const scrollDownButton = document.querySelector('.scroll-down');
    const announcementListContainer = document.querySelector('.announcement-list-container');

    const scrollAmount = 50; // Adjust scroll amount

    if (scrollUpButton && scrollDownButton && announcementListContainer) {
        scrollUpButton.addEventListener('click', () => {
            announcementListContainer.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
        });

        scrollDownButton.addEventListener('click', () => {
            announcementListContainer.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        });

        // Add touch support for mobile
        let startY;
        announcementListContainer.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        announcementListContainer.addEventListener('touchmove', (e) => {
            const endY = e.touches[0].clientY;
            const delta = startY - endY;
            announcementListContainer.scrollBy({ top: delta, behavior: 'smooth' });
            startY = endY;
        });
    }

    // Hover effect for announcement list items
    const announcementItems = document.querySelectorAll('.announcement-list li');
    announcementItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            if (window.matchMedia('(hover: hover)').matches) {
                item.style.backgroundColor = '#3283d9';
                item.style.transform = 'translateY(-3px)';
            }
        });
        item.addEventListener('mouseout', () => {
            if (window.matchMedia('(hover: hover)').matches) {
                item.style.backgroundColor = '';
                item.style.transform = '';
            }
        });
    });

    // Photo slider functionality
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const slidesContainer = document.querySelector('.slides');
    const slideInterval = 5000;

    if (slides.length > 0 && slidesContainer) {
        function showSlide(index) {
            currentIndex = (index + slides.length) % slides.length; // Wrap around slides
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function moveSlide(step) {
            showSlide(currentIndex + step);
        }

        let autoSlideInterval = setInterval(() => moveSlide(1), slideInterval);

        const prevButton = document.querySelector('.prev-slide');
        const nextButton = document.querySelector('.next-slide');

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                clearInterval(autoSlideInterval);
                moveSlide(-1);
                startAutoSlide();
            });

            nextButton.addEventListener('click', () => {
                clearInterval(autoSlideInterval);
                moveSlide(1);
                startAutoSlide();
            });
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => moveSlide(1), slideInterval);
        }

        showSlide(currentIndex);
    }

    // Search notes functionality
    const searchInput = document.getElementById('searchNotes');
    const notesList = document.getElementById('notesList');

    if (searchInput && notesList) {
        const notes = notesList.getElementsByTagName('li');

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            for (let note of notes) {
                note.style.display = note.textContent.toLowerCase().includes(query) ? '' : 'none';
            }
        });
    }
});
