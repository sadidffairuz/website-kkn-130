// js/main.js

import { initNavbar } from './navbar.js';
import { initSmoothScroll } from './scroll.js';
import { initCounter } from './counter.js';
import { initScrollReveal, initProgressBar, initRippleEffect } from './animation.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil elemen tombol dan menunya
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navbarMenu = document.getElementById('navbar-menu');

    // 2. Berikan logika klik
    if (mobileBtn && navbarMenu) {
        mobileBtn.addEventListener('click', () => {
            // Toggle (tambah/hapus) class 'active'
            navbarMenu.classList.toggle('active');
            
            // Opsional: Ubah ikon garis tiga menjadi ikon silang (X)
            const icon = mobileBtn.querySelector('i');
            if (navbarMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons(); // Render ulang ikon
        });
    }
});