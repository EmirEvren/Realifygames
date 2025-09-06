const express = require("express");
const path = require("path");

const app = express();

// PORT Vercel ortam değişkeni ile uyumlu
const PORT = process.env.PORT || 3000;

// Statik dosyalar (html, css, js, images)
app.use(express.static(path.join(__dirname)));

// Oyun verileri (API endpoint)
const games = [
  {
    id: 1,
    name: "Chasing Her Light",
    description: "Duygusal bir hikaye, ışığın peşinden gidin.",
    image: "/images/oyun1.jpg",
    steamLink: "https://store.steampowered.com/app/3694270/Chasing_Her_Light/"
  },
  {
    id: 2,
    name: "Teddy Horses",
    description: "Sevimli atlarla dolu eğlenceli bir dünyayı keşfedin.",
    image: "/images/oyun2.jpg",
    steamLink: "https://store.steampowered.com/app/3957780/Teddy_Horses/"
  },
  {
    id: 3,
    name: "King Charles: Rise of the Alpha",
    description: "Krallığınızı yönetin ve Alfa hükümdar olduğunuzu kanıtlayın.",
    image: "/images/oyun3.jpg",
    steamLink: "https://store.steampowered.com/app/3817640/King_Charles_Rise_of_the_Alpha/"
  }
];

// API endpoint → https://yourdomain.com/api/games
app.get("/api/games", (req, res) => {
  res.json(games);
});

// Ana sayfa ve diğer HTML sayfaları
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Sunucuyu başlat (yerel test için)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅ Server çalışıyor: http://localhost:${PORT}`);
  });
}

// Vercel deployment için
module.exports = app;
