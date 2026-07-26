document.addEventListener('DOMContentLoaded', () => {
    const logbookContainer = document.getElementById('logbook-container'); // Pastikan ID ini ada di HTML Anda
    const btnFilter = document.getElementById('btn-apply-filter'); // Pastikan ID tombol filter sesuai di HTML
    let allData = [];

    fetch('../data/logbook.json')
        .then(response => response.json())
        .then(data => {
            allData = data;
            renderLogbook(allData); 
        })
        .catch(error => console.error("Gagal memuat data logbook:", error));

    function renderLogbook(dataToRender) {
        if (!logbookContainer) return; 
        logbookContainer.innerHTML = '';

        if (dataToRender.length === 0) {
            logbookContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Tidak ada kegiatan untuk filter ini.</p>';
            return;
        }

        dataToRender.forEach(item => {
            const tagsHTML = item.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            
            const cardHTML = `
                <div class="logbook-card" style="margin-bottom: 24px; padding: 20px; border: 1px solid #eee; border-radius: 12px; background: #fff;">
                    <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <div class="tags">${tagsHTML}</div>
                        <div class="location" style="color: #666; font-size: 0.9rem;">📍 ${item.location}</div>
                    </div>
                    
                    <h3 style="margin-bottom: 12px; color: #2c3e50;">${item.title}</h3>
                    <p style="color: #555; margin-bottom: 16px; line-height: 1.5;">${item.description}</p>
                    
                    <div class="card-footer">
                        <!-- INI TOMBOL YANG SUDAH DIPERBAIKI -->
                        <a href="detail-logbook.html?id=${item.id}" class="btn btn-outline btn-sm" style="text-decoration: none; display: inline-block;">Lihat Selengkapnya</a>
                    </div>
                </div>
            `;
            logbookContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    if (btnFilter) {
        btnFilter.addEventListener('click', () => {
            const kategoriPilihan = document.getElementById('filter-kategori').value; 
            
            if (kategoriPilihan === "Semua" || kategoriPilihan === "Semua Kategori") {
                renderLogbook(allData);
            } else {
                const filteredData = allData.filter(item => item.tags.includes(kategoriPilihan));
                renderLogbook(filteredData);
            }
        });
    }
});