// js/scroll.js

export function initSmoothScroll() {
    // Ambil semua tag <a> yang memiliki href diawali dengan "#"
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Abaikan jika hanya "#"
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}