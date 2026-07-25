// js/main.js

import { initNavbar } from './navbar.js';
import { initSmoothScroll } from './scroll.js';
import { initCounter } from './counter.js';
import { initScrollReveal, initProgressBar, initRippleEffect } from './animation.js';

// Pastikan HTML sudah termuat seluruhnya sebelum menjalankan JS
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi semua fitur interaktif
    initNavbar();
    initSmoothScroll();
    initCounter();
    initScrollReveal();
    initProgressBar();
    initRippleEffect();
    
    console.log("Dashboard KKN Berdampak 2026 - Initialized Successfully");
});