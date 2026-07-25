// js/animation.js

// 1. Animasi Fade Up saat di-scroll
export function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-fade-up');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Lepas pantauan setelah animasi selesai
            }
        });
    }, { 
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" // Trigger sedikit sebelum elemen benar-benar masuk
    });

    reveals.forEach(reveal => revealObserver.observe(reveal));
}

// 2. Animasi Progress Bar memanjang
export function initProgressBar() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ambil nilai target width dari data attribute
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressFills.forEach(fill => progressObserver.observe(fill));
}

// 3. Efek Ripple pada Button
export function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            // Hapus elemen ripple setelah animasi selesai
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}