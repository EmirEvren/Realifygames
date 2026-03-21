const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// 1. ADIM: Statik dosyaları KLASÖR KLASÖR tanımlıyoruz (En Garanti Yol)
app.use(express.static(__dirname)); 
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/main', express.static(path.join(__dirname, 'main'))); // <-- main.js için yolu tanıttık!

// 2. ADIM: Oyun Verileri
const games = [
  {
    id: 1,
    name: "Oceanarium Fishing",
    tagline: "Co-op Underwater Adventure",
    description: "Team up with friends in this immersive co-op fishing simulator.",
    image: "/images/oceanariumfishing.png", 
    steamLink: "https://store.steampowered.com/app/4241310/Oceanarium_Fishing/"
  },
  {
    id: 2,
    name: "Idle Slot Machine",
    tagline: "Casino Empire Builder",
    description: "Test your luck and build a gambling dynasty.",
    image: "/images/idleslotmachine.png",
    steamLink: "https://store.steampowered.com/app/4511810/Idle_Slot_Machine/"
  },
  {
    id: 3,
    name: "DragonFire Defense",
    tagline: "Epic Tower Defense",
    description: "Defend your kingdom against relentless waves of mythical beasts.",
    image: "/images/dragonfiredefense.png",
    steamLink: "https://store.steampowered.com/app/4162090/DragonFire_Defense/"
  },
  {
    id: 4,
    name: "King Charles: Rise of the Alpha",
    tagline: "Roguelike Action",
    description: "A fast-paced 'Megabonk' style roguelike adventure.",
    image: "/images/kingcharles.png",
    steamLink: "https://store.steampowered.com/app/3817640/King_Charles_Rise_of_the_Alpha/"
  },
  {
    id: 5,
    name: "Chasing Her Light",
    tagline: "Atmospheric Survival",
    description: "A survival-adventure journey about a man and his dog.",
    image: "/images/chasingherlight.png",
    steamLink: "https://store.steampowered.com/app/3694270/Chasing_Her_Light/"
  },
  {
    id: 6,
    name: "Teddy Horses",
    tagline: "Cute Racing Simulator",
    description: "Breed, raise, and race adorable horses on a whimsical farm.",
    image: "/images/teddyhorses.png",
    steamLink: "https://store.steampowered.com/app/3957780/Teddy_Horses/"
  }
];

// 3. ADIM: API
app.get("/api/games", (req, res) => {
  res.json(games);
});

// 4. ADIM: Ana Sayfa
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`✅ Server is running: http://localhost:${PORT}`);
});