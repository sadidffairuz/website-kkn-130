// js/logbook.js

document.addEventListener('DOMContentLoaded', () => {
    const logbookContainer = document.getElementById('logbook-container');
    if (!logbookContainer) return;

    // Ambil data dari JSON
    fetch('../data/logbook.json')
        .then(response => response.json())
        .then(data => {
            renderLogbook(data);
        })
        .catch(error => console.error('Error fetching logbook data:', error));

    function renderLogbook(logs) {
        logbookContainer.innerHTML = ''; // Bersihkan kontainer

        logs.forEach((log, index) => {
            // Logika untuk menampilkan gambar jika ada
            let galleryHTML = '';
            if (log.gallery.length > 0) {
                const images = log.gallery.map(img => `<img src="${img}" alt="Dokumentasi">`).join('');
                galleryHTML = `<div class="mini-gallery">${images}</div>`;
            }

            // Logika untuk tags
            const tagsHTML = log.tags.map((tag, i) => 
                `<span class="${i === 0 ? 'tag-primary' : 'tag-secondary'}">${tag}</span>`
            ).join('');

            // Logika untuk avatar (peserta)
            const avatarsHTML = log.attendance.map(name => 
                `<div class="avatar" title="${name}">${name}</div>`
            ).join('');
            
            const moreAvatar = log.moreAttendance > 0 ? `<div class="avatar-more">+${log.moreAttendance}</div>` : '';

            // Rakit HTML-nya
            const logHTML = `
                <div class="logbook-item reveal-fade-up active">
                    <div class="logbook-time">
                        <span class="day">${log.date.day}</span>
                        <span class="month">${log.date.month}</span>
                        <span class="hour">${log.date.time}</span>
                    </div>

                    <div class="logbook-indicator">
                        <div class="dot"></div>
                        <div class="line"></div>
                    </div>

                    <div class="logbook-content-card">
                        <div class="card-header">
                            <div class="tags">${tagsHTML}</div>
                            <div class="location"><i data-lucide="map-pin"></i> ${log.location}</div>
                        </div>
                        
                        <h3 class="logbook-title">${log.title}</h3>
                        <p class="logbook-desc">${log.description}</p>
                        
                        <div class="attendance">
                            <span class="attendance-label">Hadir:</span>
                            <div class="avatar-group">
                                ${avatarsHTML}
                                ${moreAvatar}
                            </div>
                        </div>

                        ${galleryHTML}

                        <div class="card-footer">
                            <button class="btn btn-outline btn-sm">Lihat Selengkapnya</button>
                        </div>
                    </div>
                </div>
            `;

            logbookContainer.innerHTML += logHTML;
        });

        // Re-inisialisasi ikon Lucide untuk elemen yang baru dirender
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
});