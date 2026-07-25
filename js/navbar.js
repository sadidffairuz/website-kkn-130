// js/navbar.js

export function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    // Fungsi untuk mengecek posisi scroll
    const checkScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // Jalankan saat pertama kali dimuat
    checkScroll();

    // Dengarkan event scroll
    window.addEventListener('scroll', checkScroll);
}