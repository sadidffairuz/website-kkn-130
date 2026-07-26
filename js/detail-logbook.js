document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const logId = urlParams.get('id');

    if (!logId) {
        document.getElementById('detail-title').innerText = "Data tidak ditemukan!";
        document.getElementById('detail-desc').innerText = "Silakan kembali ke halaman Logbook.";
        return;
    }

    fetch('../data/logbook.json')
        .then(response => response.json())
        .then(data => {
            const item = data.find(log => log.id == logId);

            if (item) {
                // Info Dasar
                document.getElementById('detail-title').innerText = item.title;
                document.getElementById('detail-date').innerHTML = `<i data-lucide="clock" style="width:18px; height:18px;"></i> ${item.date.day} ${item.date.month} - ${item.date.time}`;
                document.getElementById('detail-location').innerHTML = `<i data-lucide="map-pin" style="width:18px; height:18px;"></i> ${item.location}`;
                document.getElementById('detail-desc').innerText = item.description;

                // Kehadiran
                const avatarsHTML = item.attendance ? item.attendance.map(name => `<div class="avatar" title="${name}">${name}</div>`).join('') : '';
                const moreAvatar = item.moreAttendance > 0 ? `<div class="avatar-more">+${item.moreAttendance}</div>` : '';
                document.getElementById('detail-attendance').innerHTML = `<div class="avatar-group">${avatarsHTML}${moreAvatar}</div>`;

                // Tags
                const tagsHTML = item.tags ? item.tags.map((tag, i) => `<span class="${i === 0 ? 'tag-primary' : 'tag-secondary'}">${tag}</span>`).join('') : '';
                document.getElementById('detail-tags').innerHTML = tagsHTML;

                // --- FITUR BARU: NOTULENSI ---
                if (item.notulensi) {
                    document.getElementById('detail-notes-container').style.display = 'block';
                    document.getElementById('detail-notulensi').innerText = item.notulensi;
                }

                // --- FITUR BARU: DOKUMENTASI MEDIA ---
                let hasMedia = false;

                // 1. Cek Video (Misal link embed YouTube/Drive)
                if (item.video) {
                    hasMedia = true;
                    // Membuat iframe responsive
                    document.getElementById('detail-video').innerHTML = `
                        <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                            <iframe src="${item.video}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
                        </div>
                    `;
                }

                // 2. Cek Galeri Foto
                if (item.gallery && item.gallery.length > 0) {
                    hasMedia = true;
                    const galleryHTML = item.gallery.map(img => `
                        <img src="${img}" alt="Dokumentasi" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; border: 1px solid #eee;">
                    `).join('');
                    document.getElementById('detail-gallery').innerHTML = galleryHTML;
                }

                // Tampilkan container media jika ada isinya
                if (hasMedia) {
                    document.getElementById('detail-media-container').style.display = 'block';
                }

                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            } else {
                document.getElementById('detail-title').innerText = "Kegiatan tidak ditemukan!";
            }
        })
        .catch(error => console.error("Gagal memuat data:", error));
});