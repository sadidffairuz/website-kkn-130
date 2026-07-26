// js/detail-logbook.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tangkap ID dari URL (contoh: detail-logbook.html?id=2)
    const urlParams = new URLSearchParams(window.location.search);
    const logId = urlParams.get('id');

    if (!logId) {
        document.getElementById('detail-title').innerText = "Data tidak ditemukan!";
        document.getElementById('detail-desc').innerText = "Silakan kembali ke halaman Logbook.";
        return; // Hentikan proses jika tidak ada ID
    }

    // 2. Ambil data dari JSON
    fetch('../data/logbook.json')
        .then(response => response.json())
        .then(data => {
            // 3. Cari data yang ID-nya cocok dengan logId di URL
            const item = data.find(log => log.id == logId);

            if (item) {
                // 4. Masukkan data ke dalam HTML
                document.getElementById('detail-title').innerText = item.title;
                document.getElementById('detail-date').innerText = `🕒 ${item.date.day} ${item.date.month} - ${item.date.time}`;
                document.getElementById('detail-location').innerText = `📍 ${item.location}`;
                document.getElementById('detail-desc').innerText = item.description;
                
                // Urusan Kehadiran
                const hadir = item.attendance.join(', ');
                const tambahan = item.moreAttendance > 0 ? ` (+${item.moreAttendance} orang lainnya)` : '';
                document.getElementById('detail-attendance').innerText = `${hadir}${tambahan}`;

                // Urusan Tags (Label)
                const tagsContainer = document.getElementById('detail-tags');
                tagsContainer.innerHTML = ''; // Bersihkan dulu
                item.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.innerText = tag;
                    span.style.background = '#e0f2e9'; // Warna hijau muda
                    span.style.color = '#155d3a';
                    span.style.padding = '4px 12px';
                    span.style.borderRadius = '20px';
                    span.style.fontSize = '0.85rem';
                    tagsContainer.appendChild(span);
                });
            } else {
                document.getElementById('detail-title').innerText = "Kegiatan tidak ditemukan!";
            }
        })
        .catch(error => {
            console.error("Gagal memuat data:", error);
            document.getElementById('detail-title').innerText = "Terjadi kesalahan sistem.";
        });
});