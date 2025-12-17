
import { LevelConfig, LevelType, Question, Character, Difficulty } from './types';

export const CHARACTERS: Character[] = [
  {
    id: 'c1',
    name: 'THOLIB',
    role: 'Pencari Ilmu',
    image: 'https://cdn-icons-png.flaticon.com/512/3408/3408455.png', 
    perk: 'Semangat Tinggi'
  },
  {
    id: 'c2',
    name: 'HAFIZ',
    role: 'Penghafal',
    image: 'https://cdn-icons-png.flaticon.com/512/3408/3408472.png',
    perk: 'Ingatan Kuat'
  },
  {
    id: 'c3',
    name: 'USTADZ',
    role: 'Pengajar',
    image: 'https://cdn-icons-png.flaticon.com/512/3408/3408466.png',
    perk: 'Pemahaman Dalam'
  },
  {
    id: 'c4',
    name: 'QARI',
    role: 'Pembaca',
    image: 'https://cdn-icons-png.flaticon.com/512/3408/3408485.png',
    perk: 'Tajwid Sempurna'
  }
];

// BACKGROUNDS TEMA SEJARAH / TIMUR TENGAH
const BG_LEVEL_1 = "https://images.unsplash.com/photo-1565552629477-59e332363b69?q=80&w=2070"; // Desert/Beginning
const BG_LEVEL_2 = "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1776"; // Architecture/Baghdad
const BG_LEVEL_3 = "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=2070"; // Palace/Gold
const BG_LEVEL_4 = "https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=2070"; // Library/Books
const BG_LEVEL_5 = "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070"; // Science/Astro
const BG_LEVEL_6 = "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2070"; // Mosque/Samarra
const BG_LEVEL_7 = "https://images.unsplash.com/photo-1518557984649-7b16d9e66b9e?q=80&w=2070"; // Ruins/Dark

export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    id: 1,
    title: "REVOLUSI ABBAS",
    subtitle: "Awal Kebangkitan",
    type: LevelType.RAPID_FIRE,
    description: "Selidiki asal-usul berdirinya Dinasti Bani Abbasiyah dan tokoh-tokoh kuncinya.",
    maxScore: 1000,
    image: BG_LEVEL_1 
  },
  {
    id: 2,
    title: "KOTA BUNDAR",
    subtitle: "Membangun Baghdad",
    type: LevelType.RAPID_FIRE,
    description: "Pelajari sejarah pembangunan kota Baghdad sebagai pusat peradaban dunia.",
    maxScore: 1000,
    image: BG_LEVEL_2 
  },
  {
    id: 3,
    title: "MASA KEEMASAN",
    subtitle: "Puncak Kejayaan",
    type: LevelType.RAPID_FIRE,
    description: "Era Harun Ar-Rasyid dan kemakmuran ekonomi serta sosial.",
    maxScore: 1000,
    image: BG_LEVEL_3 
  },
  {
    id: 4,
    title: "BAITUL HIKMAH",
    subtitle: "Pusat Ilmu",
    type: LevelType.RAPID_FIRE,
    description: "Perpustakaan legendaris dan gerakan penerjemahan besar-besaran.",
    maxScore: 1000,
    image: BG_LEVEL_4 
  },
  {
    id: 5,
    title: "PARA ILMUWAN",
    subtitle: "Tokoh Intelektual",
    type: LevelType.RAPID_FIRE,
    description: "Kenali tokoh-tokoh besar seperti Al-Khawarizmi, Ibn Sina, dan Al-Razi.",
    maxScore: 1000,
    image: BG_LEVEL_5 
  },
  {
    id: 6,
    title: "SENI & BUDAYA",
    subtitle: "Keindahan Peradaban",
    type: LevelType.RAPID_FIRE,
    description: "Perkembangan arsitektur, sastra, dan seni kaligrafi.",
    maxScore: 1000,
    image: BG_LEVEL_6 
  },
  {
    id: 7,
    title: "KERUNTUHAN",
    subtitle: "Akhir Sebuah Era",
    type: LevelType.RAPID_FIRE,
    description: "Faktor-faktor penyebab kemunduran dan serangan Bangsa Mongol.",
    maxScore: 1000,
    image: BG_LEVEL_7 
  }
];

// --- GAME DATA BY DIFFICULTY ---

type GameData = Record<Difficulty, Record<number, Question[]>>;

export const GAME_DATA: GameData = {
  [Difficulty.EASY]: {
    1: [
      { id: 'e1-1', text: "Siapakah pendiri Daulah Bani Abbasiyah?", options: ["Abu al-Abbas as-Saffah", "Muawiyah bin Abu Sufyan", "Harun Ar-Rasyid", "Umar bin Abdul Aziz"], correctIndex: 0 },
      { id: 'e1-2', text: "Daulah Abbasiyah berdiri setelah runtuhnya Daulah...", options: ["Umayyah", "Fatimiyah", "Ustmaniyah", "Ayyubiyah"], correctIndex: 0 },
      { id: 'e1-3', text: "Tahun berapakah Bani Abbasiyah resmi berdiri?", options: ["750 M", "632 M", "1453 M", "1924 M"], correctIndex: 0 }
    ],
    2: [
      { id: 'e2-1', text: "Kota yang dibangun oleh Khalifah Al-Mansur adalah...", options: ["Baghdad", "Damaskus", "Kairo", "Madinah"], correctIndex: 0 },
      { id: 'e2-2', text: "Julukan kota Baghdad adalah...", options: ["Kota Seribu Satu Malam", "Kota Pelajar", "Kota Wali", "Kota Terlarang"], correctIndex: 0 },
      { id: 'e2-3', text: "Bentuk desain awal kota Baghdad adalah...", options: ["Bundar (Lingkaran)", "Kotak", "Segitiga", "Tidak beraturan"], correctIndex: 0 }
    ],
    3: [
      { id: 'e3-1', text: "Khalifah yang terkenal pada masa keemasan Abbasiyah adalah...", options: ["Harun Ar-Rasyid", "Yazid bin Muawiyah", "Al-Walid", "Marwan II"], correctIndex: 0 },
      { id: 'e3-2', text: "Kisah sastra terkenal dari masa ini berjudul...", options: ["1001 Malam", "Mahabharata", "Romeo Juliet", "Harry Potter"], correctIndex: 0 },
      { id: 'e3-3', text: "Masa keemasan Islam sering disebut dengan istilah...", options: ["The Golden Age", "Dark Ages", "Renaissance", "Industrial Revolution"], correctIndex: 0 }
    ],
    4: [
      { id: 'e4-1', text: "Apa nama perpustakaan besar di Baghdad?", options: ["Baitul Hikmah", "Taj Mahal", "Al-Azhar", "Hagia Sophia"], correctIndex: 0 },
      { id: 'e4-2', text: "Khalifah yang sangat mencintai ilmu pengetahuan adalah...", options: ["Al-Ma'mun", "Al-Mutawakkil", "As-Saffah", "Al-Amin"], correctIndex: 0 },
      { id: 'e4-3', text: "Kegiatan utama di Baitul Hikmah adalah...", options: ["Penerjemahan buku", "Latihan perang", "Berdagang", "Pertanian"], correctIndex: 0 }
    ],
    5: [
      { id: 'e5-1', text: "Bapak Aljabar (Matematika) adalah...", options: ["Al-Khawarizmi", "Al-Farabi", "Ibn Sina", "Ibn Batutah"], correctIndex: 0 },
      { id: 'e5-2', text: "Ilmuwan muslim ahli kedokteran yang menulis Qanun Fi Thib adalah...", options: ["Ibn Sina (Avicenna)", "Al-Kindi", "Al-Ghazali", "Ibn Rusyd"], correctIndex: 0 },
      { id: 'e5-3', text: "Al-Razi adalah ahli di bidang...", options: ["Kedokteran & Kimia", "Astronomi", "Geografi", "Sejarah"], correctIndex: 0 }
    ],
    6: [
      { id: 'e6-1', text: "Kota Samarra terkenal dengan menaranya yang berbentuk...", options: ["Spiral (Malwiya)", "Kotak", "Lurus", "Piramida"], correctIndex: 0 },
      { id: 'e6-2', text: "Seni tulisan indah arab disebut...", options: ["Kaligrafi (Khat)", "Grafiti", "Lukisan", "Ukir"], correctIndex: 0 },
      { id: 'e6-3', text: "Istana khalifah biasanya dihiasi dengan...", options: ["Taman dan air mancur", "Patung hewan", "Gambar manusia", "Sampah"], correctIndex: 0 }
    ],
    7: [
      { id: 'e7-1', text: "Bani Abbasiyah runtuh akibat serangan bangsa...", options: ["Mongol", "Romawi", "Persia", "Turki"], correctIndex: 0 },
      { id: 'e7-2', text: "Pemimpin pasukan Mongol yang menghancurkan Baghdad adalah...", options: ["Hulagu Khan", "Genghis Khan", "Kubilai Khan", "Attila"], correctIndex: 0 },
      { id: 'e7-3', text: "Tahun runtuhnya Baghdad adalah...", options: ["1258 M", "1492 M", "1945 M", "1000 M"], correctIndex: 0 }
    ]
  },
  [Difficulty.MEDIUM]: {
    1: [
      { id: 'm1-1', text: "Gerakan propaganda Abbasiyah berpusat di kota...", options: ["Khurasan", "Mekkah", "Madinah", "Yaman"], correctIndex: 0 },
      { id: 'm1-2', text: "Tokoh militer yang sangat berjasa dalam revolusi Abbasiyah adalah...", options: ["Abu Muslim Al-Khurasani", "Khalid bin Walid", "Salahuddin Al-Ayubi", "Thariq bin Ziyad"], correctIndex: 0 },
      { id: 'm1-3', text: "Pertempuran penentuan antara Umayyah dan Abbasiyah terjadi di...", options: ["Sungai Zab", "Yarmuk", "Badar", "Uhud"], correctIndex: 0 }
    ],
    2: [
      { id: 'm2-1', text: "Nama lain kota Baghdad adalah Madinat as-Salam, yang artinya...", options: ["Kota Perdamaian", "Kota Kemenangan", "Kota Cahaya", "Kota Pelabuhan"], correctIndex: 0 },
      { id: 'm2-2', text: "Arsitek yang merancang kota Baghdad bernama...", options: ["Hajjaj bin Arthah", "Sinan", "Imhotep", "Michelangelo"], correctIndex: 0 },
      { id: 'm2-3', text: "Berapa gerbang utama yang dimiliki Kota Bundar Baghdad?", options: ["4 Gerbang", "2 Gerbang", "7 Gerbang", "12 Gerbang"], correctIndex: 0 }
    ],
    3: [
      { id: 'm3-1', text: "Keluarga Barmaki dikenal sebagai keluarga...", options: ["Wazir (Menteri) yang berpengaruh", "Pedagang kaya", "Pemberontak", "Petani"], correctIndex: 0 },
      { id: 'm3-2', text: "Harun Ar-Rasyid menjalin hubungan diplomatik dengan raja Eropa bernama...", options: ["Charlemagne", "Napoleon", "Alexander", "Caesar"], correctIndex: 0 },
      { id: 'm3-3', text: "Istri Harun Ar-Rasyid yang terkenal bernama...", options: ["Zubaidah", "Aisyah", "Khadijah", "Fatimah"], correctIndex: 0 }
    ],
    4: [
      { id: 'm4-1', text: "Penerjemah Kristen Nestorian yang terkenal di Baitul Hikmah adalah...", options: ["Hunain bin Ishaq", "Tsabit bin Qurra", "Al-Kindi", "Al-Battani"], correctIndex: 0 },
      { id: 'm4-2', text: "Buku-buku Yunani kuno banyak diterjemahkan, terutama karya...", options: ["Aristoteles & Plato", "Shakespeare", "Confucius", "Newton"], correctIndex: 0 },
      { id: 'm4-3', text: "Selain perpustakaan, Baitul Hikmah juga berfungsi sebagai...", options: ["Observatorium Astronomi", "Pasar", "Barak Militer", "Penjara"], correctIndex: 0 }
    ],
    5: [
      { id: 'm5-1', text: "Karya Al-Khawarizmi yang memperkenalkan angka nol adalah...", options: ["Al-Jabar wal Muqabalah", "Al-Qanun", "Ihya Ulumuddin", "Al-Umm"], correctIndex: 0 },
      { id: 'm5-2', text: "Bapak Optik Modern yang menulis Kitab Al-Manazir adalah...", options: ["Ibn al-Haytham", "Ibn Batutah", "Al-Biruni", "Al-Zahrawi"], correctIndex: 0 },
      { id: 'm5-3', text: "Tokoh sufi wanita terkenal pada masa ini adalah...", options: ["Rabiah Al-Adawiyah", "Siti Hajar", "Cut Nyak Dien", "Kartini"], correctIndex: 0 }
    ],
    6: [
      { id: 'm6-1', text: "Kota Samarra dibangun sebagai ibu kota baru oleh Khalifah...", options: ["Al-Mu'tashim", "Al-Mansur", "Al-Mahdi", "Al-Hadi"], correctIndex: 0 },
      { id: 'm6-2', text: "Corak seni Abbasiyah banyak dipengaruhi oleh budaya...", options: ["Persia (Sassanid)", "Romawi", "India", "Cina"], correctIndex: 0 },
      { id: 'm6-3', text: "Jenis kaligrafi yang populer dan tegas bentuknya disebut...", options: ["Khat Kufi", "Khat Naskhi", "Khat Riq'ah", "Khat Diwani"], correctIndex: 0 }
    ],
    7: [
      { id: 'm7-1', text: "Salah satu faktor internal kemunduran Abbasiyah adalah...", options: ["Perebutan kekuasaan & kemewahan", "Kurang makanan", "Terlalu banyak ilmu", "Gempa bumi"], correctIndex: 0 },
      { id: 'm7-2', text: "Dinasti-dinasti kecil yang memisahkan diri disebut...", options: ["Dinasti Kecil (Muluk Ath-Thawaif)", "Dinasti Besar", "Negara Bagian", "Provinsi"], correctIndex: 0 },
      { id: 'm7-3', text: "Buku-buku perpustakaan Baghdad dibuang Mongol ke sungai...", options: ["Tigris", "Nil", "Eufrat", "Amazon"], correctIndex: 0 }
    ]
  },
  [Difficulty.HARD]: {
    1: [
      { id: 'h1-1', text: "Siapakah paman Nabi yang menjadi nisbat nama Bani Abbasiyah?", options: ["Abbas bin Abdul Muthalib", "Abu Thalib", "Hamzah", "Abu Lahab"], correctIndex: 0 },
      { id: 'h1-2', text: "Sistem pemerintahan Abbasiyah berubah dari Arab-sentris menjadi lebih...", options: ["Kosmopolitan (Internasional)", "Suku-sentris", "Feodal Eropa", "Demokratis modern"], correctIndex: 0 },
      { id: 'h1-3', text: "Khalifah pertama As-Saffah memerintah selama...", options: ["4 Tahun", "10 Tahun", "20 Tahun", "1 Tahun"], correctIndex: 0 }
    ],
    2: [
      { id: 'h2-1', text: "Biaya pembangunan Baghdad konon mencapai...", options: ["4.883.000 Dirham", "1 Juta Dinar", "100 Emas", "Tak terhingga"], correctIndex: 0 },
      { id: 'h2-2', text: "Istana Al-Mansur di tengah kota Baghdad bernama...", options: ["Qasr al-Dzahab (Istana Emas)", "Istana Merdeka", "Alhambra", "Topkapi"], correctIndex: 0 },
      { id: 'h2-3', text: "Sistem pos dan intelijen yang dikembangkan Al-Mansur disebut...", options: ["Barid", "Diwan", "Syurthah", "Qadhi"], correctIndex: 0 }
    ],
    3: [
      { id: 'h3-1', text: "Peristiwa tragis jatuhnya keluarga Barmaki disebut...", options: ["Tragedi Barmak", "Perang Saudara", "Revolusi Zanj", "Fitnah Kubra"], correctIndex: 0 },
      { id: 'h3-2', text: "Era Harun Ar-Rasyid juga diwarnai pemberontakan kaum...", options: ["Khawarij", "Salibis", "Zionis", "Komunis"], correctIndex: 0 },
      { id: 'h3-3', text: "Perang saudara antara Al-Amin dan Al-Ma'mun memperebutkan tahta disebut...", options: ["Perang Saudara Abbasiyah Keempat", "Perang Salib", "Perang Uhud", "Perang Riddah"], correctIndex: 0 }
    ],
    4: [
      { id: 'h4-1', text: "Aliran teologi rasionalis yang didukung Al-Ma'mun adalah...", options: ["Mu'tazilah", "Asy'ariyah", "Jabariyah", "Qadariyah"], correctIndex: 0 },
      { id: 'h4-2', text: "Ujian akidah (inkuisisi) yang diterapkan Al-Ma'mun disebut...", options: ["Mihnah", "Fitnah", "Hijrah", "Jihad"], correctIndex: 0 },
      { id: 'h4-3', text: "Pengukur keliling bumi yang ditugaskan Al-Ma'mun berhasil menghitungnya di padang...", options: ["Sinjar", "Arafah", "Sahara", "Gobi"], correctIndex: 0 }
    ],
    5: [
      { id: 'h5-1', text: "Karya Al-Biruni yang membahas tentang India berjudul...", options: ["Tahqiq ma li al-Hind", "Al-Hind", "Indica", "Sejarah India"], correctIndex: 0 },
      { id: 'h5-2', text: "Penemu asam sulfat dan alkohol dalam dunia kimia Islam adalah...", options: ["Jabir ibn Hayyan", "Al-Razi", "Ibn Sina", "Al-Farabi"], correctIndex: 0 },
      { id: 'h5-3', text: "Filsuf yang dijuluki 'Guru Kedua' (Al-Mu'allim Ats-Tsani) setelah Aristoteles adalah...", options: ["Al-Farabi", "Al-Kindi", "Ibn Rusyd", "Al-Ghazali"], correctIndex: 0 }
    ],
    6: [
      { id: 'h6-1', text: "Masjid Agung Samarra memiliki menara spiral yang terinspirasi dari bangunan...", options: ["Ziggurat Mesopotamia", "Piramida Mesir", "Kuil Yunani", "Stupa India"], correctIndex: 0 },
      { id: 'h6-2', text: "Seni keramik Abbasiyah menemukan teknik glasir logam yang disebut...", options: ["Lustreware", "Earthenware", "Stoneware", "Porcelain"], correctIndex: 0 },
      { id: 'h6-3', text: "Penyair terkenal yang hidup hedonis di masa ini adalah...", options: ["Abu Nuwas", "Al-Mutanabbi", "Jalaludin Rumi", "Hafiz"], correctIndex: 0 }
    ],
    7: [
      { id: 'h7-1', text: "Khalifah terakhir yang terbunuh saat penyerbuan Mongol adalah...", options: ["Al-Musta'shim", "Al-Mustansir", "Al-Muqtadir", "Al-Mutawakkil"], correctIndex: 0 },
      { id: 'h7-2', text: "Kelemahan militer Abbasiyah disebabkan ketergantungan pada tentara bayaran bangsa...", options: ["Turki", "Persia", "Berber", "Slavia"], correctIndex: 0 },
      { id: 'h7-3', text: "Setelah Baghdad jatuh, kekhalifahan bayangan Abbasiyah diteruskan di...", options: ["Kairo (Mamluk)", "Damaskus", "Cordoba", "Istanbul"], correctIndex: 0 }
    ]
  }
};
