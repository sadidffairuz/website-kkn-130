// js/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. BAR CHART: Progres per Program Kerja
    // ==========================================
    const progressCanvas = document.getElementById('progressChart');
    if (progressCanvas) {
        const ctxProgress = progressCanvas.getContext('2d');
        
        new Chart(ctxProgress, {
            type: 'bar',
            data: {
                labels: ['Bank Bibit', 'Pupuk Kompos', 'Lahan Pekarangan', 'UMKM Pangan'],
                datasets: [{
                    label: 'Persentase Selesai (%)',
                    data: [85, 60, 45, 90], // Data progres (0-100)
                    backgroundColor: '#16A34A', // Warna hijau tema KKN
                    borderRadius: 6, // Membuat ujung bar melengkung (modern)
                    barThickness: 32 // Ketebalan bar
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100, // Maksimal 100%
                        grid: {
                            color: '#F3F4F6',
                            borderDash: [5, 5] // Garis putus-putus
                        }
                    },
                    x: {
                        grid: {
                            display: false // Hilangkan garis vertikal
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // Sembunyikan legenda atas karena sudah jelas
                    },
                    tooltip: {
                        backgroundColor: '#1F2937',
                        padding: 12,
                        titleFont: { family: 'Poppins', size: 13 },
                        bodyFont: { family: 'Poppins', size: 14 }
                    }
                }
            }
        });
    }

    // ==========================================
    // 2. DOUGHNUT CHART: Sebaran Kategori Kegiatan
    // ==========================================
    const categoryCanvas = document.getElementById('categoryChart');
    if (categoryCanvas) {
        const ctxCategory = categoryCanvas.getContext('2d');
        
        new Chart(ctxCategory, {
            type: 'doughnut',
            data: {
                labels: ['Proker Utama', 'Proker Pendukung', 'Sosialisasi', 'Lainnya'],
                datasets: [{
                    data: [40, 25, 20, 15], // Proporsi sebaran
                    backgroundColor: [
                        '#16A34A', // Hijau
                        '#0284C7', // Biru
                        '#CA8A04', // Kuning
                        '#9CA3AF'  // Abu-abu
                    ],
                    borderWidth: 0,
                    hoverOffset: 8 // Efek membesar saat di-hover
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%', // Membuat lubang donat lebih besar ala modern UI
                plugins: {
                    legend: {
                        position: 'bottom', // Pindahkan legenda ke bawah
                        labels: {
                            padding: 20,
                            usePointStyle: true, // Ubah kotak legenda jadi lingkaran
                            font: { family: 'Poppins', size: 12 }
                        }
                    }
                }
            }
        });
    }

});