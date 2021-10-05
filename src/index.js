(() => {
    const handleLinkClick = (e) => {
        const { hash } = e.target;

        if (!hash) return;

        e.preventDefault();

        const el = document.querySelector(hash);

        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    Array.from(document.querySelectorAll('a')).forEach((link) => {
        link.addEventListener('click', handleLinkClick);
    });
})();
