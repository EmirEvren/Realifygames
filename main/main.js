// main/main.js - Realify Games Dynamic Content Loader

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("games-container");

    // Eğer bulunduğumuz sayfada oyun konteyneri yoksa (About, Contact vb.) işlemi durdur
    if (!container) {
        return;
    }

    console.log("🚀 Oyunlar sunucudan çekiliyor...");

    // API'den oyun verilerini çek (server.js içindeki /api/games endpoint'i)
    fetch("/api/games")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Sunucu Hatası: ${response.status}`);
            }
            return response.json();
        })
        .then(games => {
            console.log("📦 Oyunlar başarıyla yüklendi:", games);
            
            // "Fetching amazing worlds..." yükleme mesajını temizle
            container.innerHTML = "";

            // Eğer oyun listesi boş gelirse
            if (!Array.isArray(games) || games.length === 0) {
                container.innerHTML = `<p class="empty-msg" style="text-align:center; width:100%; color: var(--text-dim); grid-column: 1/-1;">No games found at the moment. Stay tuned!</p>`;
                return;
            }

            // Her oyun için HTML kartını oluştur ve ekrana bas
            games.forEach(game => {
                const gameCard = document.createElement("div");
                gameCard.classList.add("game-card");

                // Kart İçeriği: CSS ile tam uyumlu ve resim hatasına karşı korumalı (onerror)
                gameCard.innerHTML = `
                    <div class="card-image-wrapper">
                        <img src="${game.image}" alt="${game.name}" onerror="this.src='/images/logo.png'" loading="lazy">
                    </div>
                    <div class="card-info">
                        <span class="game-tagline">${game.tagline || 'Indie Adventure'}</span>
                        <h3>${game.name}</h3>
                        <p>${game.description}</p>
                        <div class="card-footer">
                            <a href="${game.steamLink}" target="_blank" class="steam-btn">
                                VIEW ON STEAM
                            </a>
                        </div>
                    </div>
                `;

                container.appendChild(gameCard);
            });
            
            // Eğer slider (index.html) sayfasındaysak başlangıç konumuna sıfırla
            container.scrollLeft = 0;
        })
        .catch(error => {
            console.error("❌ API Error:", error);
            container.innerHTML = `
                <div class="error-msg" style="text-align:center; width:100%; padding:40px; color: #ff3333; grid-column: 1/-1;">
                    <p>❌ Failed to load games. Please make sure the server is running.</p>
                </div>
            `;
        });
});