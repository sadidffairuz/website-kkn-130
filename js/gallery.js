// js/gallery.js

document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let allGalleryData = [];

    if (!galleryContainer) return;

    // 1. Ambil data dari JSON
    fetch('../data/gallery.json')
        .then(response => response.json())
        .then(data => {
            allGalleryData = data;
            renderGallery(data); // Tampilkan semua foto pertama kali
        })
        .catch(error => console.error('Error fetching gallery:', error));

    // 2. Fungsi untuk merender HTML foto
    function renderGallery(items) {
        galleryContainer.innerHTML = ''; // Bersihkan kontainer
        
        if (items.length === 0) {
            galleryContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted);">Tidak ada foto di kategori ini.</p>';
            return;
        }

        items.forEach(item => {
            const card = `
                <div class="gallery-card reveal-fade-up active">
                    <img src="${item.image}" alt="${item.title}" onerror="this.src='../assets/images/placeholder.jpg'">
                    <div class="gallery-overlay-card">
                        <span class="gallery-date">${item.date}</span>
                        <h3 class="gallery-title">${item.title}</h3>
                    </div>
                </div>
            `;
            galleryContainer.innerHTML += card;
        });
    }

    // 3. Logika Filter Tombol
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hapus class 'active' dari semua tombol, berikan ke tombol yang diklik
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedCategory = button.textContent.trim();

            // Saring data berdasarkan kategori
            if (selectedCategory === 'Semua') {
                renderGallery(allGalleryData);
            } else {
                const filteredData = allGalleryData.filter(item => item.category === selectedCategory);
                renderGallery(filteredData);
            }
        });
    });
});