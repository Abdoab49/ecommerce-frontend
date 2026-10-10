// src/Data/moroccoCities.js

export const moroccoCities = {
  "Casablanca": [
    "Ain Sebaa",
    "Ain Chock",
    "Anfa",
    "Bernoussi",
    "Bourgogne",
    "Bouskoura",
    "CIL",
    "Dar Bouazza",
    "Derb Sultan",
    "Gauthier",
    "Hay Hassani",
    "Hay Mohammadi",
    "Lissasfa",
    "Maarif",
    "Medina",
    "Mers Sultan",
    "Oulfa",
    "Racine",
    "Sidi Bernoussi",
    "Sidi Moumen",
    "Sidi Othmane"
  ],
  "Rabat": [
    "Agdal",
    "Hassan",
    "Hay Riad",
    "Médina",
    "Océan",
    "Souissi",
    "Takaddoum",
    "Yacoub El Mansour"
  ],
  "Marrakech": [
    "Annakhil",
    "Daoudiate",
    "Gueliz",
    "Hivernage",
    "Kasbah",
    "Massira",
    "Médina",
    "Mhamid",
    "Semlalia",
    "Sidi Youssef Ben Ali"
  ],
  "Fès": [
    "Agdal",
    "Atlas",
    "Bensouda",
    "Dokkarat",
    "El Mariniyine",
    "Médina",
    "Narjiss",
    "Saiss",
    "Sidi Brahim",
    "Zouagha"
  ],
  "Tanger": [
    "Beni Makada",
    "Boukhalef",
    "Charf",
    "Dradeb",
    "Iberia",
    "Médina",
    "Marchan",
    "Mghogha",
    "Val Fleuri"
  ],
  "Agadir": [
    "Anza",
    "Bensergao",
    "Dakhla",
    "Founty",
    "Hay Mohammadi",
    "Inezgane",
    "Médina",
    "Salam",
    "Talborjt"
  ],
  "Meknès": [
    "Agdal",
    "Bassatine",
    "Hamria",
    "Marjane",
    "Médina",
    "Ouislane",
    "Toulal",
    "Zitoune"
  ],
  "Oujda": [
    "Al Qods",
    "Angad",
    "Hay Al Andalous",
    "Hay Zitoune",
    "Médina",
    "Sidi Yahya"
  ],
  "Kénitra": [
    "Bir Rami",
    "Khabazat",
    "Maamora",
    "Médina",
    "Oulad Oujih",
    "Saknia"
  ],
  "Tétouan": [
    "Ain Ktiout",
    "Dersa",
    "Médina",
    "Sania Ramel",
    "Sidi Mandri",
    "Touabel"
  ],
  "Salé": [
    "Bettana",
    "Hssaine",
    "Layayda",
    "Médina",
    "Sala Al Jadida",
    "Tabriquet"
  ],
  "Safi": [
    "Biada",
    "Hamria",
    "Kourdan",
    "Médina",
    "Saada",
    "Sidi Bouzid"
  ],
  "El Jadida": [
    "Azib Elhraychi",
    "Centre Ville",
    "Chiheb",
    "Médina",
    "Salam"
  ],
  "Nador": [
    "Al Aroui",
    "Beni Ansar",
    "Centre Ville",
    "Hay Al Matar",
    "Médina"
  ],
  "Béni Mellal": [
    "Al Massira",
    "Centre Ville",
    "Hay Al Wafa",
    "Médina",
    "Oulad Hamdane"
  ],
  "Mohammedia": [
    "Al Alia",
    "Centre Ville",
    "Hay Al Wafa",
    "Kasbah",
    "Médina"
  ],
  "Khouribga": [
    "Centre Ville",
    "Hay Al Massira",
    "Hay Ennasr",
    "Médina",
    "Oued Zem"
  ],
  "Essaouira": [
    "Centre Ville",
    "Ghazoua",
    "Médina",
    "Sidi Kaouki"
  ],
  "Laâyoune": [
    "Al Massira",
    "Centre Ville",
    "Hay Al Qods",
    "Médina"
  ],
  "Dakhla": [
    "Al Argoub",
    "Centre Ville",
    "Hay Al Massira",
    "Médina"
  ]
};

// ✅ Lista dyal modon
export const cities = Object.keys(moroccoCities);

// ✅ Manate9 dyal chi mdina
export const getRegionsByCity = (city) => {
  return moroccoCities[city] || [];
};