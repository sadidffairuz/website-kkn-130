// js/logbook.js

document.addEventListener('DOMContentLoaded', () => {
    const logbookContainer = document.getElementById('logbook-container');
    if (!logbookContainer) return;

    let allLogs = []; // Tempat menyimpan data asli dari JSON

    // 1. Ambil data dari JSON
    fetch('../data/logbook.json')
        .then(response => response.json())
        .then(data => {
            allLogs = data;
            renderLogbook(allLogs); // Render semua data saat pertama buka
        })
        .catch(error => console.error('Error fetching logbook data:', error));

    // 2. Fungsi Utama Render Kartu (Sesuai Desain Asli Kamu)
    function renderLogbook(logs) {
        logbookContainer.innerHTML = ''; // Bersihkan kontainer

        if (logs.length === 0) {
            logbookContainer.innerHTML = '<p style="text-align:center; padding: 40px; color: #666;">Tidak ada catatan kegiatan untuk kategori ini.</p>';
            return;
        }

        logs.forEach((log) => {
            // Logika Mini Gallery
            let galleryHTML = '';
            if (log.gallery && log.gallery.length > 0) {
                const images = log.gallery.map(img => `<img src="${img}" alt="Dokumentasi">`).join('');
                galleryHTML = `<div class="mini-gallery">${images}</div>`;
            }

            // Logika Tags (Primary & Secondary)
            const tagsHTML = log.tags ? log.tags.map((tag, i) =>
                `<span class="${i === 0 ? 'tag-primary' : 'tag-secondary'}">${tag}</span>`
            ).join('') : '';

            // Logika Avatars (Peserta)
            const avatarsHTML = log.attendance ? log.attendance.map(name =>
                `<div class="avatar" title="${name}">${name}</div>`
            ).join('') : '';

            const moreAvatar = log.moreAttendance > 0 ? `<div class="avatar-more">+${log.moreAttendance}</div>` : '';

            // Rakit HTML Asli (Lengkap dengan Garis & Tanggal)
            const logHTML = `
                <div class="logbook-item reveal-fade-up active">
                    <div class="logbook-time">
                        <div class="date-badge">
                            <span class="day">${log.date.day}</span>
                            <span class="month">${log.date.month}</span>
                            <span class="time">${log.date.time}</span>
                        </div>
                        <div class="timeline-line">
                            <div class="timeline-dot"></div>
                        </div>
                    </div>
                    
                    <div class="logbook-card">
                        <div class="card-header">
                            <div class="card-tags">
                                ${tagsHTML}
                            </div>
                            <div class="card-location">
                                <i data-lucide="map-pin"></i>
                                <span>${log.location}</span>
                            </div>
                        </div>

                        <h3 class="card-title">${log.title}</h3>
                        <p class="card-description">${log.description}</p>
                        
                        ${galleryHTML}

                        <div class="card-footer">
                            <div class="attendance-list">
                                <span class="attendance-label">Hadir:</span>
                                <div class="avatar-group">
                                    ${avatarsHTML}
                                    ${moreAvatar}
                                </div>
                            </div>
                            <!-- LINK DETAIL (SUDAH DIPERBAIKI) -->
                            <a href="detail-logbook.html?id=${log.id}" class="btn btn-outline btn-sm" style="text-decoration: none; display: inline-block;">Lihat Selengkapnya</a>
                        </div>
                    </div>
                </div>
            `;

            logbookContainer.innerHTML += logHTML;
        });

        // Re-inisialisasi ikon Lucide
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // 3. Logika Filter Kategori
    const btnFilter = document.getElementById('btn-apply-filter');
    if (btnFilter) {
        btnFilter.addEventListener('click', () => {
            const dropdown = document.getElementById('filter-kategori');
            if (!dropdown) return;

            const kategoriPilihan = dropdown.value;

            if (kategoriPilihan === "Semua" || kategoriPilihan === "Semua Kategori") {
                renderLogbook(allLogs);
            } else {
                const filtered = allLogs.filter(log => log.tags && log.tags.includes(kategoriPilihan));
                renderLogbook(filtered);
            }
        });
    }
});