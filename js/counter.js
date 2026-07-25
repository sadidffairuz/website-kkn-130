// js/counter.js

export function initCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 100; // Kecepatan animasi (semakin kecil, semakin cepat)

    // Fungsi menghitung angka
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const currentCount = +counter.innerText;
        const increment = target / speed;

        if (currentCount < target) {
            counter.innerText = Math.ceil(currentCount + increment);
            setTimeout(() => animateCounter(counter), 20);
        } else {
            counter.innerText = target; // Pastikan berhenti di angka yang tepat
        }
    };

    // Gunakan Intersection Observer agar jalan hanya saat elemen terlihat
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Animasi cukup dijalankan sekali
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}