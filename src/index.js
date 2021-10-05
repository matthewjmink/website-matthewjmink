(($) => {
    // Navigation
    (function navigation() {
        const handleLinkClick = (e) => {
            const { hash } = e.target;

            if (!hash) return;

            e.preventDefault();

            const el = document.querySelector(hash);

            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }

        $('a').forEach((link) => {
            link.addEventListener('click', handleLinkClick);
        });
    })();

    // Testimonial Carousel
    (function testimonials() {
        const [prevBtn, nextBtn] = $('.testimonials-controls button');
        const wrapper = document.querySelector('.testimonials-container');
        const totalSlides = $('.testimonial').length;
        let currentSlide = 1;

        const goTo = (slideNumber) => {
            if (slideNumber < 1 || slideNumber > totalSlides) return;

            const newSlideIndex = slideNumber - 1;

            wrapper.style.transform = `translateX(-${newSlideIndex * 100}vw)`;

            currentSlide = slideNumber;

            if (currentSlide === 1) {
                prevBtn.disabled = true;
                nextBtn.disabled = false;
            } else if (currentSlide === totalSlides) {
                prevBtn.disabled = false;
                nextBtn.disabled = true;
            } else {
                prevBtn.disabled = false;
                nextBtn.disabled = false;
            }
        };

        prevBtn.addEventListener('click', () => goTo(currentSlide - 1))
        nextBtn.addEventListener('click', () => goTo(currentSlide + 1));
    })();
})(selector => Array.from(document.querySelectorAll(selector)));
