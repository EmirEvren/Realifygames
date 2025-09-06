// main.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("games-container");

  if (!container) {
    console.warn("⚠️ 'games-container' bulunamadı. Bu sayfada oyun listesi gösterilmeyecek.");
    return;
  }

  fetch("/api/games")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Hatası: ${response.status}`);
      }
      return response.json();
    })
    .then(games => {
      if (!Array.isArray(games) || games.length === 0) {
        container.innerHTML = `<p style="color:#ddd; text-align:center;">Henüz oyun bulunmamaktadır.</p>`;
        return;
      }

      games.forEach(game => {
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        gameCard.innerHTML = `
          <img src="${game.image}" alt="${game.name}">
          <h3>${game.name}</h3>
          <p>${game.description}</p>
          <a href="${game.steamLink}" target="_blank">View on Steam</a>
        `;

        container.appendChild(gameCard);
      });
    })
    .catch(error => {
      console.error("API hatası:", error);
      container.innerHTML = `<p style="color:#f88; text-align:center;">Oyunlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>`;
    });
});
