(() => {
    const $ = selector => document.querySelector(selector);
    const $$ = selector => Array.from(document.querySelectorAll(selector));

    // Navigation
    (function navigation() {
        const handleLinkClick = (e) => {
            const { hash } = e.target;

            if (!hash) return;

            e.preventDefault();

            const el = $(hash);

            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }

        $$('a').forEach((link) => {
            link.addEventListener('click', handleLinkClick);
        });
    })();

    // Testimonial Carousel
    (function testimonials() {
        const [prevBtn, nextBtn] = $$('.testimonials-controls button');
        const wrapper = $('.testimonials-container');
        const totalSlides = $$('.testimonial').length;
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

    // Contact Form
    (function contactMatt() {
        const form = $('#contactForm');
        const button = form.querySelector('button').parentElement;
        const alert = document.createElement('div');

        const showAlert = (type, message) => {
            alert.className = `alert alert-${type}`;
            alert.innerText = message;
            form.insertBefore(alert, button);
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const formData = new FormData(form);

            alert.remove();

            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
                .then(({ status, statusText }) => {
                    if (status >= 400) throw new Error(statusText);
                    showAlert('success', 'Thank you for reaching out! I\'ll get back to you as soon as I can');
                })
                .catch((error) => {
                    showAlert('error', 'Something seems to have gone wrong while sending the message. Please try again, or give me a call instead.')
                });
        });
    })();

    // Get Contact Info
    (function getContactInfo() {
        const phoneForm = $('#phoneForm');
        const phone = $('#phone');
        const phoneParts = $$('#phone span');
        const spamTest = $('#spamTest');

        phoneForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (spamTest.value.trim().toLowerCase() !== 'mink') return;

            String.fromCharCode(...'51565256495752534955'.match(/\d{1,2}/g).reverse())
                .match(/(\d{3})(\d{3})(\d{4})/)
                .slice(1)
                .forEach((part, i) => {
                    phoneParts[i].innerText = part;
                });
            phone.classList.remove('obfuscate');
            phoneForm.remove();
        });
    })();
})();
