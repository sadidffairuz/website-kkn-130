document.addEventListener('DOMContentLoaded', () => {
    const logbookContainer = document.getElementById('logbook-container');
    if (!logbookContainer) return;

    fetch('../data/logbook.json')
        .then(response => response.json())
        .then(data => {
            renderLogbook(data);
        })
        .catch(error => console.error('Error fetching logbook data:', error));

    function renderLogbook(logs) {
        logbookContainer.innerHTML = ''; 

        logs.forEach((log, index) => {
            let galleryHTML = '';
            if (log.gallery.length > 0) {
                const images = log.gallery.map(img => `<img src="${img}" alt="Dokumentasi">`).join('');
                galleryHTML = `<div class="mini-gallery">${images}</div>`;
            }

            const tagsHTML = log.tags.map((tag, i) => 
                `<span class="${i === 0 ? 'tag-primary' : 'tag-secondary'}">${tag}</span>`
            ).join('');

            const avatarsHTML = log.attendance.map(name => 
                `<div class="avatar" title="${name}">${name}</div>`
            ).join('');
            
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
                            <a href="detail-logbook.html?id=${item.id}" class="btn btn-outline btn-sm" style="text-decoration: none; text-align: center; display: inline-block;">Lihat Selengkapnya</a>
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
});