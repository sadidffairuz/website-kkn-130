// js/detail-logbook.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tangkap ID dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const logId = urlParams.get('id');

    if (!logId) {
        document.getElementById('detail-title').innerText = "Data tidak ditemukan!";
        document.getElementById('detail-desc').innerText = "Silakan kembali ke halaman Logbook.";
        return;
    }

    // 2. Ambil data dari JSON
    fetch('../data/logbook.json')
        .then(response => response.json())
        .then(data => {
            // 3. Cari data yang ID-nya cocok
            const item = data.find(log => log.id == logId);

            if (item) {
                // 4. Masukkan data ke dalam HTML dengan desain yang disamakan
                document.getElementById('detail-title').innerText = item.title;
                
                // Pasang Ikon Lucide untuk Waktu & Lokasi
                document.getElementById('detail-date').innerHTML = `<i data-lucide="clock" style="width:18px; height:18px;"></i> ${item.date.day} ${item.date.month} - ${item.date.time}`;
                document.getElementById('detail-location').innerHTML = `<i data-lucide="map-pin" style="width:18px; height:18px;"></i> ${item.location}`;
                
                document.getElementById('detail-desc').innerText = item.description;

                // Urusan Kehadiran (Diubah menjadi Avatar Group melingkar)
                const avatarsHTML = item.attendance ? item.attendance.map(name => 
                    `<div class="avatar" title="${name}">${name}</div>`
                ).join('') : '';
                const moreAvatar = item.moreAttendance > 0 ? `<div class="avatar-more">+${item.moreAttendance}</div>` : '';
                
                document.getElementById('detail-attendance').innerHTML = `
                    <div class="avatar-group">
                        ${avatarsHTML}
                        ${moreAvatar}
                    </div>
                `;

                // Urusan Tags (Diubah menggunakan class tag-primary & tag-secondary)
                const tagsHTML = item.tags ? item.tags.map((tag, i) => 
                    `<span class="${i === 0 ? 'tag-primary' : 'tag-secondary'}">${tag}</span>`
                ).join('') : '';
                document.getElementById('detail-tags').innerHTML = tagsHTML;

                // 5. Wajib panggil ulang Lucide agar ikon yang baru di-inject via JS bisa muncul!
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }

            } else {
                document.getElementById('detail-title').innerText = "Kegiatan tidak ditemukan!";
            }
        })
        .catch(error => {
            console.error("Gagal memuat data:", error);
            document.getElementById('detail-title').innerText = "Terjadi kesalahan sistem.";
        });
});