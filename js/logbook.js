document.addEventListener('DOMContentLoaded', () => {
    const logbookContainer = document.getElementById('logbook-container');
    if (!logbookContainer) return;

    let allData = []; // Simpan data asli untuk keperluan filter

    // 1. Ambil Data dari JSON
    fetch('../data/logbook.json')
        .then(response => response.json())
        .then(data => {
            allData = data;
            renderLogbook(allData); // Render saat pertama kali dimuat
        })
        .catch(error => console.error('Error fetching logbook data:', error));

    // 2. Fungsi Render Tampilan (Desain Asli yang Cantik)
    function renderLogbook(logs) {
        logbookContainer.innerHTML = ''; 

        if (logs.length === 0) {
            logbookContainer.innerHTML = '<p style="text-align:center; padding: 40px; color: #666;">Tidak ada catatan kegiatan untuk kategori ini.</p>';
            return;
        }

        logs.forEach((log, index) => {
            let galleryHTML = '';
            if (log.gallery && log.gallery.length > 0) {
                const images = log.gallery.map(img => `<img src="${img}" alt="Dokumentasi">`).join('');
                galleryHTML = `<div class="mini-gallery">${images}</div>`;
            }

            const tagsHTML = log.tags ? log.tags.map((tag, i) => 
                `<span class="${i === 0 ? 'tag-primary' : 'tag-secondary'}">${tag}</span>`
            ).join('') : '';

            const avatarsHTML = log.attendance ? log.attendance.map(name => 
                `<div class="avatar" title="${name}">${name}</div>`
            ).join('') : '';
            
            const moreAvatar = log.moreAttendance > 0 ? `<div class="avatar-more">+${log.moreAttendance}</div>` : '';

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
                            <!-- Sudah diperbaiki menjadi log.id -->
                            <a href="detail-logbook.html?id=${log.id}" class="btn btn-outline btn-sm" style="text-decoration: none; text-align: center; display: inline-block;">Lihat Selengkapnya</a>
                        </div>
                    </div>
                </div>
            `;

            logbookContainer.innerHTML += logHTML;
        });

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // 3. Fungsi Filter Kategori
    const btnFilter = document.getElementById('btn-apply-filter');
    if (btnFilter) {
        btnFilter.addEventListener('click', () => {
            const dropdown = document.getElementById('filter-kategori');
            if (!dropdown) return;

            const kategoriPilihan = dropdown.value;
            
            if (kategoriPilihan === "Semua" || kategoriPilihan === "Semua Kategori") {
                renderLogbook(allData);
            } else {
                const filteredData = allData.filter(log => log.tags && log.tags.includes(kategoriPilihan));
                renderLogbook(filteredData);
            }
        });
    }
});