// js/main.js

import { initNavbar } from './navbar.js';
import { initSmoothScroll } from './scroll.js';
import { initCounter } from './counter.js';
import { initScrollReveal, initProgressBar, initRippleEffect } from './animation.js';

// Pastikan HTML sudah termuat seluruhnya sebelum menjalankan JS
document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. INISIALISASI FITUR UTAMA (JANGAN DIHAPUS)
    // ==========================================
    initNavbar();
    initSmoothScroll();
    initCounter();       // Ini yang memunculkan angka proker, pengabdian, dll!
    initScrollReveal();  // Ini yang memunculkan card anggota!
    initProgressBar();
    initRippleEffect();
    
    console.log("Dashboard KKN Berdampak 2026 - Initialized Successfully");

    // ==========================================
    // 2. LOGIKA HAMBURGER MENU (MOBILE)
    // ==========================================
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navbarMenu = document.getElementById('navbar-menu');

    if (mobileBtn && navbarMenu) {
        mobileBtn.addEventListener('click', () => {
            // Toggle (tambah/hapus) class 'active' untuk memunculkan menu
            navbarMenu.classList.toggle('active');
            
            // Ubah ikon garis tiga menjadi ikon silang (X)
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                if (navbarMenu.classList.contains('active')) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                
                // Pastikan lucide ada sebelum merender ulang ikon (mencegah error)
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        });
    }
});