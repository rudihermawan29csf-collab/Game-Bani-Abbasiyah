
import { LevelConfig, LevelType, Question, Character, Difficulty, GalleryItem } from './types';

export const CHARACTERS: Character[] = [
  {
    id: 'c1',
    name: 'MUJAHID',
    role: 'Pejuang Ilmu',
    image: 'https://cdn-icons-png.flaticon.com/512/3408/3408455.png', 
    perk: 'Fokus Tinggi'
  },
  {
    id: 'c2',
    name: 'THOLIB',
    role: 'Pencari Hikmah',
    image: 'https://cdn-icons-png.flaticon.com/512/3408/3408472.png',
    perk: 'Analisis Cepat'
  },
  {
    id: 'c3',
    name: 'HAKIM',
    role: 'Strategist',
    image: 'https://cdn-icons-png.flaticon.com/512/3408/3408460.png',
    perk: 'Akurasi Ekstrem'
  },
  {
    id: 'c4',
    name: 'WAZIR',
    role: 'Administrator',
    image: 'https://cdn-icons-png.flaticon.com/512/3408/3408447.png',
    perk: 'Bonus Waktu'
  }
];

// Menggunakan Pollinations.ai dengan SEED STATIS agar gambar dicache browser dan muncul instan
const getAIImage = (prompt: string, seedId: string) => `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + ", photorealistic, cinematic lighting, ancient islamic golden age, 8k, highly detailed, masterpiece, historical accuracy")}?width=1024&height=768&nologo=true&seed=${seedId}`;

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Kota Bundar Baghdad',
    category: 'Arsitektur',
    image: getAIImage('Aerial view of the Round City of Baghdad 8th century, circular walls, golden palace in center, tigris river, ancient architecture', '101'),
    description: 'Baghdad dibangun oleh Khalifah Al-Mansyur dengan desain bundar revolusioner. Dikelilingi tembok berlapis dan parit, di tengahnya berdiri istana emas dan masjid agung, melambangkan pusat dunia yang tertata sempurna.'
  },
  {
    id: 'g2',
    title: 'Bayt al-Hikmah',
    category: 'Pusat Ilmu',
    image: getAIImage('Interior of Bayt al-Hikmah library Baghdad, scholars translating scrolls, warm candle lighting, shelves full of ancient books, islamic architecture', '102'),
    description: 'Rumah Kebijaksanaan adalah perpustakaan legendaris. Di sinilah karya Yunani, Persia, dan India diterjemahkan, memicu ledakan ilmu pengetahuan yang menerangi dunia saat Eropa masih dalam kegelapan.'
  },
  {
    id: 'g3',
    title: 'Al-Khawarizmi',
    category: 'Matematika',
    image: getAIImage('Al-Khawarizmi persian mathematician working on algebra manuscript, ancient study room, sunlight beaming through window, wearing turban', '103'),
    description: 'Bapak Aljabar dan Algoritma. Karyanya "Al-Kitab al-Mukhtasar" menjadi dasar matematika modern. Tanpa penemuannya, teknologi komputer dan digital hari ini tidak akan pernah ada.'
  },
  {
    id: 'g4',
    title: 'Observatorium Shammasiya',
    category: 'Astronomi',
    image: getAIImage('Ancient Islamic astronomers using astrolabe at night observatory in desert, starry sky, milky way, looking through large brass instruments', '104'),
    description: 'Bani Abbasiyah membangun observatorium canggih. Mereka mengukur keliling bumi dengan akurasi tinggi dan memetakan bintang untuk navigasi serta penentuan waktu ibadah yang presisi.'
  },
  {
    id: 'g5',
    title: 'Khalifah Harun Al-Rashid',
    category: 'Kepemimpinan',
    image: getAIImage('Caliph Harun Al-Rashid sitting on ornate throne in Baghdad palace, receiving diplomatic gifts, luxurious silk robes, golden age atmosphere', '105'),
    description: 'Simbol masa keemasan. Pemerintahannya diwarnai kemakmuran dan hubungan diplomatik luas. Ia pernah mengirim hadiah jam air mekanik berupa gajah kepada Raja Charlemagne di Eropa.'
  },
  {
    id: 'g6',
    title: 'Ibnu Sina (Avicenna)',
    category: 'Kedokteran',
    image: getAIImage('Ibn Sina examining a patient in ancient islamic hospital, holding medicine book, jars of herbs in background, scholarly look', '106'),
    description: 'Pangeran Para Dokter. Bukunya "Al-Qanun fi al-Tibb" menjadi rujukan utama kedokteran dunia selama berabad-abad. Ia menekankan observasi klinis, karantina, dan eksperimen.'
  },
  {
    id: 'g7',
    title: 'Robotika Al-Jazari',
    category: 'Teknologi',
    image: getAIImage('Al-Jazari elephant clock mechanical invention, detailed gears and water mechanism, ancient engineering blueprint style real life', '107'),
    description: 'Insinyur jenius yang menciptakan mesin otomat, jam gajah, dan pompa air mekanis. Karyanya dalam kitab "Pengetahuan Ilmu Mekanik" meletakkan dasar bagi robotika modern.'
  },
  {
    id: 'g8',
    title: 'Revolusi Kertas',
    category: 'Industri',
    image: getAIImage('Ancient paper mill in Baghdad, workers processing pulp, drying paper sheets, water wheel river background, industrial activity', '108'),
    description: 'Mengadopsi teknologi Tiongkok, Abbasiyah mendirikan pabrik kertas pertama. Kertas murah memicu revolusi literasi, membuat buku terjangkau dan ilmu menyebar cepat ke seluruh lapisan masyarakat.'
  },
  {
    id: 'g9',
    title: 'Sistem Irigasi Tigris',
    category: 'Pertanian',
    image: getAIImage('Lush agricultural gardens in ancient Iraq, complex water channels irrigation system from Tigris river, farmers working, green landscape', '109'),
    description: 'Pertanian maju pesat berkat teknik irigasi canggih. Kanal-kanal raksasa mengubah gurun menjadi kebun subur yang menghasilkan kurma, kapas, dan buah-buahan untuk diekspor.'
  },
  {
    id: 'g10',
    title: 'Bimaristan (Rumah Sakit)',
    category: 'Kesehatan',
    image: getAIImage('Courtyard of Bimaristan ancient hospital, fountain in center, patients resting, doctors walking, peaceful healing environment islamic architecture', '110'),
    description: 'Rumah sakit modern pertama yang gratis. Pasien dirawat berdasarkan penyakit, bukan kekayaan. Terdapat bangsal khusus penyakit jiwa yang diterapi dengan musik dan suara air.'
  },
  {
    id: 'g11',
    title: 'Jabir bin Hayyan',
    category: 'Kimia',
    image: getAIImage('Jabir ibn Hayyan alchemy laboratory, glass flasks, distillation apparatus, colored liquids, ancient chemistry experiment, smoke', '111'),
    description: 'Bapak Kimia modern. Ia mengubah alkimia mistis menjadi sains eksperimental. Menemukan asam sulfat, klorida, dan teknik distilasi kristalisasi yang dipakai di laboratorium hingga kini.'
  },
  {
    id: 'g12',
    title: 'Pasar Dunia Baghdad',
    category: 'Ekonomi',
    image: getAIImage('Bustling ancient Baghdad bazaar market, traders with camels, spices, silk fabrics, diverse people, vibrant colors, sunset', '112'),
    description: 'Pusat perdagangan global. Sutra Cina, rempah India, dan bulu Rusia bertemu di sini. Pedagang menggunakan sistem cek (sakk) untuk transaksi aman tanpa membawa emas berat.'
  },
  {
    id: 'g13',
    title: 'Seni Kaligrafi',
    category: 'Kesenian',
    image: getAIImage('Master calligrapher writing Arabic script with bamboo pen and gold ink, close up on parchment, geometric precision, spiritual atmosphere', '113'),
    description: 'Seni menulis indah mencapai puncaknya. Ibnu Muqlah merumuskan aturan geometris kaligrafi, menjadikan tulisan bukan sekadar alat komunikasi, tapi ekspresi spiritual yang memukau.'
  },
  {
    id: 'g14',
    title: 'Harmoni & Toleransi',
    category: 'Sosial',
    image: getAIImage('Diverse group of scholars muslim christian jewish discussing in Baghdad garden, peaceful coexistence, ancient clothes, interfaith harmony', '114'),
    description: 'Masyarakat Baghdad sangat majemuk. Muslim, Kristen, Yahudi, dan Zoroaster hidup berdampingan. Banyak ilmuwan non-Muslim memegang posisi penting di istana dan lembaga riset.'
  },
  {
    id: 'g15',
    title: 'Jalur Sutra & Diplomasi',
    category: 'Politik',
    image: getAIImage('Caravan traveling on Silk Road desert, ancient map background, diplomatic envoys exchanging scrolls, sunset horizon', '115'),
    description: 'Abbasiyah menjamin keamanan Jalur Sutra, menghubungkan Timur dan Barat. Pertukaran budaya dan teknologi mengalir deras, menjadikan Islam sebagai jembatan peradaban dunia.'
  }
];

export const RANDOM_BACKGROUNDS = [
  "https://iili.io/fEyyOpp.jpg",
  "https://iili.io/fG924kJ.jpg",
  "https://iili.io/fG9FPiN.jpg",
  "https://iili.io/fG9fzTG.jpg",
  "https://iili.io/fG9qFwb.jpg",
  "https://iili.io/fG9BWdP.jpg",
  "https://iili.io/fG9CgMx.jpg",
  "https://iili.io/fG9ntJS.jpg",
  "https://iili.io/fG9NClf.jpg",
  "https://iili.io/fG9O01s.jpg",
  "https://iili.io/fG9elwB.jpg",
  "https://iili.io/fG9k0Jf.jpg"
];

const BG_ABBASSID = "https://iili.io/fcTZCa2.jpg";

// Konfigurasi Level: FULL SEJARAH ABBASIYAH
// UPDATED: Using specific AI generated images for each level context
export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    id: 1,
    title: "REVOLUSI ABBASIYAH",
    subtitle: "Awal Kebangkitan",
    type: LevelType.RAPID_FIRE,
    description: "Operasi mengidentifikasi sejarah awal berdirinya Bani Abbasiyah dan keruntuhan Umayyah.",
    maxScore: 100,
    image: getAIImage('Abbasid revolution black flags khurasan army desert battle sword fight historical', '201')
  },
  {
    id: 2,
    title: "ARSITEKTUR BAGHDAD",
    subtitle: "Kota Bundar",
    type: LevelType.RAPID_FIRE,
    description: "Menganalisis tata kota Baghdad sebagai pusat peradaban dan ibu kota baru.",
    maxScore: 100,
    image: GALLERY_DATA[0].image // Round City
  },
  {
    id: 3,
    title: "MASA KEEMASAN",
    subtitle: "The Golden Age",
    type: LevelType.RAPID_FIRE,
    description: "Era kejayaan di bawah pimpinan Khalifah Harun Al-Rashid dan Al-Ma'mun.",
    maxScore: 100,
    image: GALLERY_DATA[4].image // Harun Al Rashid
  },
  {
    id: 4,
    title: "PUSAT ILMU",
    subtitle: "Bayt al-Hikmah",
    type: LevelType.RAPID_FIRE,
    description: "Eksplorasi perpustakaan legendaris dan gerakan penerjemahan besar-besaran.",
    maxScore: 100,
    image: GALLERY_DATA[1].image // Bayt al Hikmah
  },
  {
    id: 5,
    title: "TOKOH CENDEKIAWAN",
    subtitle: "Ilmuwan Muslim",
    type: LevelType.RAPID_FIRE,
    description: "Mengenal para penemu hebat seperti Al-Khawarizmi, Ibnu Sina, dan Al-Jazari.",
    maxScore: 100,
    image: GALLERY_DATA[5].image // Ibn Sina (Index 5 is item g6)
  },
  {
    id: 6,
    title: "KEMAJUAN SAINS",
    subtitle: "Inovasi Global",
    type: LevelType.RAPID_FIRE,
    description: "Menelusuri penemuan di bidang kedokteran, matematika, dan astronomi.",
    maxScore: 100,
    image: GALLERY_DATA[3].image // Observatory
  },
  {
    id: 7,
    title: "AKHIR DINASTI",
    subtitle: "Jatuhnya Baghdad",
    type: LevelType.RAPID_FIRE,
    description: "Analisis peristiwa serangan Mongol dan faktor runtuhnya kekhalifahan.",
    maxScore: 100,
    image: getAIImage('Siege of Baghdad 1258 mongol invasion fire smoke destruction burning city tigris river', '207')
  }
];

type GameData = Record<Difficulty, Record<number, Question[]>>;

export const GAME_DATA: GameData = {
  [Difficulty.EASY]: {
    1: [
      { id: 'e1-1', text: "Siapa pendiri pertama Daulah Abbasiyah?", options: ["Abul Abbas As-Saffah", "Harun al-Rashid", "Al-Ma'mun", "Al-Mansur"], correctIndex: 0 },
      { id: 'e1-2', text: "Daulah Abbasiyah menggantikan kekuasaan Daulah...", options: ["Umayyah", "Fatimiyah", "Mamluk", "Ayyubiyah"], correctIndex: 0 },
      { id: 'e1-3', text: "Pusat gerakan awal Abbasiyah berada di wilayah...", options: ["Khurasan", "Kairo", "Cordoba", "Damaskus"], correctIndex: 0 },
      { id: 'e1-4', text: "Tahun berapakah Bani Abbasiyah resmi berdiri?", options: ["750 M", "650 M", "850 M", "950 M"], correctIndex: 0 },
      { id: 'e1-5', text: "Nama dinasti ini diambil dari nama paman Nabi SAW yaitu...", options: ["Al-Abbas", "Abu Thalib", "Hamzah", "Abu Lahab"], correctIndex: 0 }
    ],
    2: [
      { id: 'e2-1', text: "Kota yang menjadi ibu kota legendaris Abbasiyah adalah...", options: ["Baghdad", "Kairo", "Damaskus", "Mekkah"], correctIndex: 0 },
      { id: 'e2-2', text: "Siapa khalifah yang membangun kota Baghdad?", options: ["Abu Ja'far Al-Mansur", "Harun al-Rashid", "Al-Ma'mun", "Al-Amin"], correctIndex: 0 },
      { id: 'e2-3', text: "Baghdad dibangun di tepi sungai...", options: ["Tigris", "Nil", "Eufrat", "Amazon"], correctIndex: 0 },
      { id: 'e2-4', text: "Bentuk desain awal kota Baghdad adalah...", options: ["Bundar", "Kotak", "Segitiga", "Tak Beraturan"], correctIndex: 0 },
      { id: 'e2-5', text: "Nama lain kota Baghdad adalah Madinat al-...", options: ["Salam", "Munawwarah", "Zahra", "Quds"], correctIndex: 0 }
    ],
    3: [
      { id: 'e3-1', text: "Masa keemasan (The Golden Age) Islam terjadi pada masa khalifah...", options: ["Harun Al-Rashid", "Al-Saffah", "Al-Mutawakkil", "Al-Musta'shim"], correctIndex: 0 },
      { id: 'e3-2', text: "Pada masa emas, Baghdad dikenal sebagai pusat...", options: ["Ilmu Pengetahuan", "Perang", "Pertanian", "Perikanan"], correctIndex: 0 },
      { id: 'e3-3', text: "Khalifah Al-Ma'mun sangat mencintai...", options: ["Sains & Filsafat", "Harta Benda", "Perluasan Wilayah", "Bangunan Mewah"], correctIndex: 0 },
      { id: 'e3-4', text: "Kisah 1001 Malam berlatar belakang masa kekhalifahan...", options: ["Abbasiyah", "Umayyah", "Utsmaniyah", "Mughal"], correctIndex: 0 },
      { id: 'e3-5', text: "Hubungan diplomatik Abbasiyah mencapai kerajaan...", options: ["Charlemagne (Eropa)", "Inca", "Maya", "Aztek"], correctIndex: 0 }
    ],
    4: [
      { id: 'e4-1', text: "Apa nama lembaga riset terbesar di Baghdad?", options: ["Bayt al-Hikmah", "Taj Mahal", "Al-Azhar", "Topkapi"], correctIndex: 0 },
      { id: 'e4-2', text: "Bayt al-Hikmah berfungsi sebagai...", options: ["Perpustakaan", "Penjara", "Pasar", "Stadion"], correctIndex: 0 },
      { id: 'e4-3', text: "Buku-buku asing diterjemahkan ke dalam bahasa...", options: ["Arab", "Latin", "Inggris", "Perancis"], correctIndex: 0 },
      { id: 'e4-4', text: "Penerjemah dibayar dengan...", options: ["Emas", "Gandum", "Kain", "Air"], correctIndex: 0 },
      { id: 'e4-5', text: "Ilmuwan Yunani kuno yang bukunya banyak diterjemahkan adalah...", options: ["Aristoteles", "Newton", "Einstein", "Darwin"], correctIndex: 0 }
    ],
    5: [
      { id: 'e5-1', text: "Bapak Aljabar (Matematika) adalah...", options: ["Al-Khawarizmi", "Ibnu Sina", "Al-Razi", "Al-Farabi"], correctIndex: 0 },
      { id: 'e5-2', text: "Ibnu Sina (Avicenna) ahli di bidang...", options: ["Kedokteran", "Kelautan", "Militer", "Seni Tari"], correctIndex: 0 },
      { id: 'e5-3', text: "Bapak Kimia modern adalah...", options: ["Jabir bin Hayyan", "Al-Kindi", "Ibnu Batuta", "Ibnu Khaldun"], correctIndex: 0 },
      { id: 'e5-4', text: "Siapa penemu benang bedah dari usus hewan?", options: ["Al-Zahrawi", "Al-Battani", "Ibnu Rusyd", "Al-Ghazali"], correctIndex: 0 },
      { id: 'e5-5', text: "Ilmuwan Muslim banyak melakukan penelitian dengan metode...", options: ["Eksperimen", "Menebak", "Mimpi", "Perkiraan"], correctIndex: 0 }
    ],
    6: [
      { id: 'e6-1', text: "Angka Nol (0) diperkenalkan ke dunia oleh ilmuwan...", options: ["Muslim", "Romawi", "Viking", "Mesir Kuno"], correctIndex: 0 },
      { id: 'e6-2', text: "Rumah sakit pertama dalam sejarah didirikan di...", options: ["Baghdad", "London", "Paris", "New York"], correctIndex: 0 },
      { id: 'e6-3', text: "Alat Astrolabe digunakan untuk keperluan...", options: ["Astronomi", "Memasak", "Menjahit", "Melukis"], correctIndex: 0 },
      { id: 'e6-4', text: "Industri apa yang membuat buku menjadi murah?", options: ["Kertas", "Kulit", "Batu", "Kayu"], correctIndex: 0 },
      { id: 'e6-5', text: "Buku 'Al-Qanun fi al-Tibb' membahas tentang...", options: ["Obat-obatan", "Hukum Pidana", "Tata Bahasa", "Sejarah Perang"], correctIndex: 0 }
    ],
    7: [
      { id: 'e7-1', text: "Baghdad hancur pada tahun 1258 M akibat serangan bangsa...", options: ["Mongol", "Romawi", "Persia", "Indian"], correctIndex: 0 },
      { id: 'e7-2', text: "Siapa pemimpin pasukan Mongol yang menghancurkan Baghdad?", options: ["Hulagu Khan", "Genghis Khan", "Kubilai Khan", "Timur Lenk"], correctIndex: 0 },
      { id: 'e7-3', text: "Sungai Tigris berubah warna menjadi hitam karena...", options: ["Tinta Buku", "Minyak", "Lumpur", "Limbah"], correctIndex: 0 },
      { id: 'e7-4', text: "Khalifah terakhir Abbasiyah di Baghdad adalah...", options: ["Al-Musta'shim", "Al-Mutawakkil", "Al-Wathiq", "Al-Hadi"], correctIndex: 0 },
      { id: 'e7-5', text: "Salah satu penyebab runtuhnya Abbasiyah adalah...", options: ["Pengkhianatan", "Bencana Alam", "Wabah", "Kekeringan"], correctIndex: 0 }
    ]
  },
  [Difficulty.MEDIUM]: {
    1: [
      { id: 'm1-1', text: "Gerakan revolusi Abbasiyah dimulai dari wilayah...", options: ["Khurasan", "Hijaz", "Yaman", "Andalusia"], correctIndex: 0 },
      { id: 'm1-2', text: "Tokoh propaganda utama yang menggalang dukungan adalah...", options: ["Abu Muslim Al-Khurasani", "Abu Ja'far", "Abu Hanifah", "Imam Malik"], correctIndex: 0 },
      { id: 'm1-3', text: "Apa warna bendera ciri khas Bani Abbasiyah?", options: ["Hitam", "Putih", "Hijau", "Merah"], correctIndex: 0 },
      { id: 'm1-4', text: "Khalifah Umayyah terakhir yang dikalahkan di sungai Zab adalah...", options: ["Marwan bin Muhammad", "Walid bin Yazid", "Hisham bin Abdul Malik", "Umar bin Abdul Aziz"], correctIndex: 0 },
      { id: 'm1-5', text: "Dukungan terbesar revolusi datang dari kaum...", options: ["Mawali (Non-Arab)", "Bani Umayyah", "Quraisy", "Badui"], correctIndex: 0 }
    ],
    2: [
      { id: 'm2-1', text: "Gerbang kota Baghdad yang mengarah ke Persia disebut gerbang...", options: ["Khurasan", "Kufah", "Syam", "Basra"], correctIndex: 0 },
      { id: 'm2-2', text: "Berapa lama proses pembangunan awal kota Baghdad?", options: ["4 Tahun", "10 Tahun", "20 Tahun", "1 Tahun"], correctIndex: 0 },
      { id: 'm2-3', text: "Arsitek Yahudi yang membantu perencanaan Baghdad bernama...", options: ["Masha'allah", "Nawbakht", "Sinan", "Imhotep"], correctIndex: 0 },
      { id: 'm2-4', text: "Istana khalifah yang terletak tepat di tengah kota bundar bernama...", options: ["Qasr al-Dhahab", "Al-Hamra", "Topkapi", "Taj Mahal"], correctIndex: 0 },
      { id: 'm2-5', text: "Sistem pertahanan Baghdad dilindungi oleh...", options: ["Dua lapis tembok & parit", "Pegunungan", "Laut", "Hutan"], correctIndex: 0 }
    ],
    3: [
      { id: 'm3-1', text: "Khalifah Harun Al-Rashid dikenal dermawan dan sering...", options: ["Haji & Perang bergantian", "Berburu", "Tidur", "Pesta"], correctIndex: 0 },
      { id: 'm3-2', text: "Keluarga wazir yang sangat berpengaruh pada masa Harun Al-Rashid adalah...", options: ["Barmakid", "Buwaihi", "Seljuk", "Ayyubi"], correctIndex: 0 },
      { id: 'm3-3', text: "Khalifah Al-Ma'mun mendirikan observatorium di...", options: ["Shammasiya", "Mekkah", "Madinah", "Kufah"], correctIndex: 0 },
      { id: 'm3-4', text: "Pada masa ini, Baghdad menjadi kota...", options: ["Terbesar di dunia", "Terkecil", "Termiskin", "Tersepi"], correctIndex: 0 },
      { id: 'm3-5', text: "Al-Ma'mun mengadopsi paham teologi...", options: ["Mu'tazilah", "Asy'ariyah", "Maturidiyah", "Jabariyah"], correctIndex: 0 }
    ],
    4: [
      { id: 'm4-1', text: "Penerjemah Kristen Nestorian yang terkenal di Bayt al-Hikmah adalah...", options: ["Hunayn bin Ishaq", "Thabit bin Qurra", "Al-Battani", "Al-Kindi"], correctIndex: 0 },
      { id: 'm4-2', text: "Bidang ilmu yang paling banyak diterjemahkan dari Yunani adalah...", options: ["Filsafat & Kedokteran", "Puisi", "Sejarah", "Agama"], correctIndex: 0 },
      { id: 'm4-3', text: "Selain menerjemahkan, para ilmuwan juga melakukan...", options: ["Koreksi & Komentar", "Pembakaran", "Pemalsuan", "Penyalinan buta"], correctIndex: 0 },
      { id: 'm4-4', text: "Kertas masuk ke dunia Islam setelah pertempuran...", options: ["Talas", "Yarmuk", "Qadisiyah", "Badar"], correctIndex: 0 },
      { id: 'm4-5', text: "Bayt al-Hikmah hancur total pada saat...", options: ["Serangan Mongol", "Perang Salib", "Kebakaran Besar", "Gempa Bumi"], correctIndex: 0 }
    ],
    5: [
      { id: 'm5-1', text: "Karya Al-Khawarizmi 'Al-Jabr' menjadi dasar ilmu...", options: ["Aljabar", "Geometri", "Kalkulus", "Statistika"], correctIndex: 0 },
      { id: 'm5-2', text: "Ibnu Sina dikenal di dunia Barat dengan nama...", options: ["Avicenna", "Averroes", "Geber", "Rhazes"], correctIndex: 0 },
      { id: 'm5-3', text: "Al-Razi adalah dokter pertama yang membedakan penyakit...", options: ["Cacar & Campak", "Flu & Batuk", "Demam & Pusing", "Luka & Infeksi"], correctIndex: 0 },
      { id: 'm5-4', text: "Al-Kindi dikenal sebagai...", options: ["Filosof Arab Pertama", "Sejarawan", "Ahli Fiqih", "Ahli Hadits"], correctIndex: 0 },
      { id: 'm5-5', text: "Penemu teknik distilasi dan kristalisasi adalah...", options: ["Jabir bin Hayyan", "Al-Biruni", "Ibnu Haitham", "Al-Jahiz"], correctIndex: 0 }
    ],
    6: [
      { id: 'm6-1', text: "Bapak Optik yang menjelaskan cara kerja mata adalah...", options: ["Ibnu al-Haytham", "Ibnu Sina", "Al-Kindi", "Al-Farabi"], correctIndex: 0 },
      { id: 'm6-2', text: "Bani Musa bersaudara terkenal dengan karya tentang...", options: ["Perangkat Mekanik", "Musik", "Puisi", "Seni Lukis"], correctIndex: 0 },
      { id: 'm6-3', text: "Al-Jazari menciptakan jam air yang terkenal berbentuk...", options: ["Gajah", "Kuda", "Unta", "Burung"], correctIndex: 0 },
      { id: 'm6-4', text: "Rumah sakit (Bimaristan) juga merawat pasien...", options: ["Gangguan Jiwa", "Hewan Ternak", "Tanaman", "Kendaraan"], correctIndex: 0 },
      { id: 'm6-5', text: "Sistem irigasi bawah tanah yang dikembangkan disebut...", options: ["Qanat", "Dam", "Waduk", "Pipa"], correctIndex: 0 }
    ],
    7: [
      { id: 'm7-1', text: "Wazir yang dituduh berkhianat membuka gerbang bagi Mongol adalah...", options: ["Ibnu al-Alqami", "Nizam al-Mulk", "Fadhl bin Barmak", "Rasyiduddin"], correctIndex: 0 },
      { id: 'm7-2', text: "Setelah Baghdad hancur, pusat peradaban Islam pindah ke...", options: ["Kairo (Mamluk)", "Madinah", "Mekkah", "Yaman"], correctIndex: 0 },
      { id: 'm7-3', text: "Dinasti Abbasiyah di Kairo hanya berfungsi sebagai...", options: ["Simbol Keagamaan", "Penguasa Mutlak", "Jenderal Perang", "Pedagang"], correctIndex: 0 },
      { id: 'm7-4', text: "Pasukan Mongol akhirnya berhasil dikalahkan oleh Mamluk di perang...", options: ["Ain Jalut", "Hattin", "Manzikert", "Uhud"], correctIndex: 0 },
      { id: 'm7-5', text: "Disintegrasi Abbasiyah ditandai dengan munculnya dinasti kecil seperti...", options: ["Thahiriyah & Samaniyah", "Umayyah & Rasyidin", "Utsmani & Mughal", "Safawi & Qajar"], correctIndex: 0 }
    ]
  },
  [Difficulty.HARD]: {
    1: [
      { id: 'h1-1', text: "Kota Anbar sempat menjadi ibu kota sementara sebelum Baghdad. Siapa yang menetapkannya?", options: ["As-Saffah", "Al-Mansur", "Al-Mahdi", "Al-Hadi"], correctIndex: 0 },
      { id: 'h1-2', text: "Peristiwa pembantaian keluarga Umayyah dikenal sebagai...", options: ["Tragedi Sungai Zab", "Revolusi Abbasiyah", "Pesta Berdarah", "Hari Pembalasan"], correctIndex: 0 },
      { id: 'h1-3', text: "Satu-satunya pangeran Umayyah yang lolos ke Andalusia adalah...", options: ["Abdurrahman Ad-Dakhil", "Marwan II", "Hisham", "Yazid"], correctIndex: 0 },
      { id: 'h1-4', text: "Doktrin 'Al-Ridha min Ali Muhammad' digunakan untuk...", options: ["Menarik simpati Syiah", "Melawan Romawi", "Membangun Masjid", "Berdagang"], correctIndex: 0 },
      { id: 'h1-5', text: "Pemberontakan Abdullah bin Ali (Paman Khalifah) terjadi pada masa...", options: ["Al-Mansur", "As-Saffah", "Al-Mahdi", "Harun Al-Rashid"], correctIndex: 0 }
    ],
    2: [
      { id: 'h2-1', text: "Material utama pembangunan kota Baghdad adalah...", options: ["Batu Bata Lumpur", "Batu Granit", "Kayu Jati", "Marmer"], correctIndex: 0 },
      { id: 'h2-2', text: "Masjid Mansur di tengah kota Baghdad memiliki menara setinggi...", options: ["Sangat Tinggi", "Rendah", "Sedang", "Tidak ada menara"], correctIndex: 0 },
      { id: 'h2-3', text: "Kota Samarra menjadi ibu kota pengganti pada masa khalifah...", options: ["Al-Mu'tashim", "Al-Wathiq", "Al-Mutawakkil", "Al-Muntasir"], correctIndex: 0 },
      { id: 'h2-4', text: "Gaya arsitektur Samarra terkenal dengan menara masjidnya yang...", options: ["Spiral (Malwiya)", "Kotak", "Lurus", "Segitiga"], correctIndex: 0 },
      { id: 'h2-5', text: "Fubungan Baghdad dengan kota sekitarnya dihubungkan oleh kanal...", options: ["Sarat & Isa", "Suez", "Panama", "Volga"], correctIndex: 0 }
    ],
    3: [
      { id: 'h3-1', text: "Istri Harun Al-Rashid yang terkenal dermawan dan membangun saluran air Mekkah adalah...", options: ["Zubaidah", "Khadijah", "Aisyah", "Fatimah"], correctIndex: 0 },
      { id: 'h3-2', text: "Konflik saudara antara Al-Amin dan Al-Ma'mun disebut...", options: ["Perang Saudara Keempat", "Perang Riddah", "Perang Jamal", "Perang Siffin"], correctIndex: 0 },
      { id: 'h3-3', text: "Mihnah (Inkuisisi) terjadi akibat pemaksaan paham...", options: ["Al-Qur'an Makhluk", "Qadariyah", "Jabariyah", "Murji'ah"], correctIndex: 0 },
      { id: 'h3-4', text: "Ulama besar yang dipenjara karena menolak paham Mu'tazilah adalah...", options: ["Imam Ahmad bin Hanbal", "Imam Malik", "Imam Syafi'i", "Imam Abu Hanifah"], correctIndex: 0 },
      { id: 'h3-5', text: "Ziryab adalah seniman Baghdad yang membawa tren mode ke...", options: ["Cordoba (Andalusia)", "Kairo", "Istanbul", "Delhi"], correctIndex: 0 }
    ],
    4: [
      { id: 'h4-1', text: "Karya 'Al-Majesti' (Ptolemeus) yang diterjemahkan membahas...", options: ["Astronomi", "Geografi", "Musik", "Biologi"], correctIndex: 0 },
      { id: 'h4-2', text: "Kelompok penerjemah Tubba' (Harran) menyembah...", options: ["Bintang", "Api", "Berhala", "Matahari"], correctIndex: 0 },
      { id: 'h4-3', text: "Thabit bin Qurra adalah ahli matematika yang merevisi terjemahan...", options: ["Euclid", "Plato", "Socrates", "Homer"], correctIndex: 0 },
      { id: 'h4-4', text: "Gerakan penerjemahan berakhir pada masa...", options: ["Al-Mutawakkil", "Harun Al-Rashid", "Al-Ma'mun", "Al-Hadi"], correctIndex: 0 },
      { id: 'h4-5', text: "Buku 'Kalila wa Dimna' diterjemahkan dari bahasa...", options: ["Sansekerta (Pahlavi)", "Yunani", "Latin", "Koptik"], correctIndex: 0 }
    ],
    5: [
      { id: 'h5-1', text: "Algoritma berasal dari nama Al-Khawarizmi, yang berarti...", options: ["Prosedur hitung", "Angka ajaib", "Ilmu bintang", "Tabel"], correctIndex: 0 },
      { id: 'h5-2', text: "Ensiklopedia kedokteran 'Al-Hawi' ditulis oleh...", options: ["Al-Razi", "Ibnu Sina", "Al-Zahrawi", "Ibnu Zuhr"], correctIndex: 0 },
      { id: 'h5-3', text: "Al-Farabi dijuluki sebagai 'Guru Kedua' setelah...", options: ["Aristoteles", "Plato", "Socrates", "Pythagoras"], correctIndex: 0 },
      { id: 'h5-4', text: "Observasi gerhana bulan di Raqqa dilakukan oleh...", options: ["Al-Battani", "Al-Sufi", "Al-Biruni", "Al-Khujandi"], correctIndex: 0 },
      { id: 'h5-5', text: "Siapa ilmuwan yang menulis tentang sosiologi dan sejarah (Muqaddimah)?", options: ["Ibnu Khaldun", "Ibnu Batuta", "Al-Mas'udi", "Al-Tabari"], correctIndex: 0 }
    ],
    6: [
      { id: 'h6-1', text: "Kamera Obscura (Al-Qamara) dijelaskan dalam kitab...", options: ["Kitab al-Manazir", "Kitab al-Shifa", "Kitab al-Hiyal", "Kitab al-Najat"], correctIndex: 0 },
      { id: 'h6-2', text: "Pemisahan alkohol murni pertama kali dilakukan oleh...", options: ["Al-Razi / Jabir", "Ibnu Sina", "Al-Kindi", "Al-Farabi"], correctIndex: 0 },
      { id: 'h6-3', text: "Teori peredaran darah kecil ditemukan oleh...", options: ["Ibnu al-Nafis", "Harvey", "Galen", "Vesalius"], correctIndex: 0 },
      { id: 'h6-4', text: "Peta dunia yang paling akurat di abad pertengahan dibuat oleh...", options: ["Al-Idrisi", "Piri Reis", "Al-Mas'udi", "Yaqut"], correctIndex: 0 },
      { id: 'h6-5', text: "Mekanisme engkol (crankshaft) dijelaskan oleh...", options: ["Al-Jazari", "Bani Musa", "Al-Muradi", "Taqi al-Din"], correctIndex: 0 }
    ],
    7: [
      { id: 'h7-1', text: "Surat ultimatum Hulagu Khan kepada Khalifah berisi...", options: ["Menyerah atau Hancur", "Minta Upeti", "Ajak Dagang", "Minta Bantuan"], correctIndex: 0 },
      { id: 'h7-2', text: "Berapa hari kota Baghdad dijarah dan dibakar oleh Mongol?", options: ["40 Hari", "7 Hari", "1 Tahun", "1 Hari"], correctIndex: 0 },
      { id: 'h7-3', text: "Khalifah dibunuh dengan cara...", options: ["Digulung karpet & diinjak", "Dipenggal", "Digantung", "Diracun"], correctIndex: 0 },
      { id: 'h7-4', text: "Perpustakaan Bayt al-Hikmah dihancurkan, buku-bukunya...", options: ["Dibuang ke sungai", "Dibakar", "Dicuri", "Dikubur"], correctIndex: 0 },
      { id: 'h7-5', text: "Sultan Mamluk yang mengalahkan Mongol di Ain Jalut adalah...", options: ["Qutuz & Baibars", "Salahuddin", "Nuruddin", "Zengi"], correctIndex: 0 }
    ]
  },
  [Difficulty.ETHICS]: {
    1: [
      { id: 'eth1-1', text: "Sikap ketekunan Al-Khawarizmi dalam meneliti angka mengajarkan kita...", options: ["Pantang Menyerah", "Cepat Puas", "Malas", "Curang"], correctIndex: 0 },
      { id: 'eth1-2', text: "Khalifah Harun Al-Rashid sering berjalan malam melihat rakyat. Ini sikap...", options: ["Peduli", "Pamer", "Iseng", "Takut"], correctIndex: 0 },
      { id: 'eth1-3', text: "Para penerjemah bekerja keras tanpa membedakan asal ilmu. Ini wujud...", options: ["Objektif & Terbuka", "Fanatik", "Sempit", "Benci"], correctIndex: 0 },
      { id: 'eth1-4', text: "Imam Ahmad rela dipenjara demi mempertahankan aqidah. Ini sikap...", options: ["Teguh Pendirian", "Keras Kepala", "Nekat", "Sombong"], correctIndex: 0 },
      { id: 'eth1-5', text: "Kehancuran Baghdad akibat pengkhianatan mengajarkan bahaya sifat...", options: ["Khianat & Munafik", "Jujur", "Setia", "Berani"], correctIndex: 0 }
    ],
    2: [
      { id: 'eth2-1', text: "Membangun kota Baghdad dengan perencanaan matang adalah contoh...", options: ["Visi Jangka Panjang", "Asal-asalan", "Boros", "Gengsi"], correctIndex: 0 },
      { id: 'eth2-2', text: "Rumah sakit gratis bukti bahwa Islam sangat menghargai...", options: ["Nyawa Manusia", "Uang", "Kekuasaan", "Status"], correctIndex: 0 },
      { id: 'eth2-3', text: "Toleransi beragama di Baghdad masa lalu mengajarkan...", options: ["Kerukunan", "Perpecahan", "Kebencian", "Perang"], correctIndex: 0 },
      { id: 'eth2-4', text: "Menulis ribuan buku dengan tangan menunjukkan...", options: ["Dedikasi Tinggi", "Kurang Kerjaaan", "Buang Waktu", "Paksaan"], correctIndex: 0 },
      { id: 'eth2-5', text: "Mencintai ilmu pengetahuan adalah warisan...", options: ["Peradaban Islam", "Bangsa Eropa", "Bangsa Mongol", "Masa Kini"], correctIndex: 0 }
    ],
    3: [
      { id: 'eth3-1', text: "Al-Ma'mun memberi emas seberat buku terjemahan. Ini bukti...", options: ["Penghargaan Ilmu", "Pamer Kekayaan", "Suap", "Investasi Bodong"], correctIndex: 0 },
      { id: 'eth3-2', text: "Zubaidah membangun saluran air untuk jamaah haji. Ini amal...", options: ["Jariyah", "Riya", "Sia-sia", "Politik"], correctIndex: 0 },
      { id: 'eth3-3', text: "Perbedaan pendapat antar mazhab di masa itu disikapi dengan...", options: ["Debat Ilmiah", "Saling Bunuh", "Maki-maki", "Diam"], correctIndex: 0 },
      { id: 'eth3-4', text: "Kejujuran Ibnu Sina mengakui jika tidak bisa mengobati adalah...", options: ["Integritas Profesi", "Kelemahan", "Kebodohan", "Aib"], correctIndex: 0 },
      { id: 'eth3-5', text: "Belajar dari sejarah keruntuhan agar tidak...", options: ["Mengulangi Kesalahan", "Menyesal", "Sedih", "Marah"], correctIndex: 0 }
    ],
    4: [
      { id: 'eth4-1', text: "Semangat iqra' (membaca) menjadi fondasi...", options: ["Kejayaan Abbasiyah", "Kehancuran", "Kemiskinan", "Kebodohan"], correctIndex: 0 },
      { id: 'eth4-2', text: "Meniru semangat Al-Biruni yang meneliti sampai tua...", options: ["Belajar Sepanjang Hayat", "Pensiun Dini", "Malas", "Bosan"], correctIndex: 0 },
      { id: 'eth4-3', text: "Menggunakan teknologi (seperti Al-Jazari) untuk kebaikan adalah...", options: ["Manfaat Ilmu", "Eksploitasi", "Pamer", "Mainan"], correctIndex: 0 },
      { id: 'eth4-4', text: "Kebersihan kota Baghdad diatur ketat. Ini sesuai prinsip...", options: ["Kebersihan Sebagian Iman", "Aturan Pemerintah", "Denda", "Takut Penyakit"], correctIndex: 0 },
      { id: 'eth4-5', text: "Kita meneladani Bani Abbasiyah bukan dalam kemewahannya, tapi...", options: ["Semangat Ilmunya", "istananya", "Emasnya", "Perangnya"], correctIndex: 0 }
    ],
    5: [
      { id: 'eth5-1', text: "Jika menjadi pemimpin, teladanilah Harun Al-Rashid dalam hal...", options: ["Tanggung Jawab", "Kemewahan", "Banyak Istri", "Pesta"], correctIndex: 0 },
      { id: 'eth5-2', text: "Ibnu Haitham berani mengoreksi teori Yunani yang salah. Ini sikap...", options: ["Kritis & Berani", "Sombong", "Kurang Ajar", "Cari Perhatian"], correctIndex: 0 },
      { id: 'eth5-3', text: "Perpustakaan adalah jantung kota. Sikap kita terhadap perpus sekolah...", options: ["Sering Mengunjungi", "Merusak Buku", "Mencoret Meja", "Tidur"], correctIndex: 0 },
      { id: 'eth5-4', text: "Karya ulama terdahulu masih dibaca sampai kini. Ini bukti...", options: ["Ilmu Bermanfaat Abadi", "Kertas Kuat", "Tinta Bagus", "Kebetulan"], correctIndex: 0 },
      { id: 'eth5-5', text: "Sejarah adalah guru kehidupan. Maksudnya...", options: ["Ambil Pelajaran", "Hafal Tanggal", "Tahu Nama", "Lulus Ujian"], correctIndex: 0 }
    ],
    6: [
      { id: 'eth6-1', text: "Disiplin Ibnu Nafis mencatat hasil bedah adalah...", options: ["Ketelitian Ilmiah", "Kurang Kerjaan", "Iseng", "Hobi"], correctIndex: 0 },
      { id: 'eth6-2', text: "Kerjasama ilmuwan muslim, kristen, yahudi di Baghdad bukti...", options: ["Kolaborasi Ilmu", "Pengkhianatan", "Kelemahan", "Campur Aduk"], correctIndex: 0 },
      { id: 'eth6-3', text: "Menghormati guru seperti murid-murid Imam Syafi'i adalah...", options: ["Adab Penuntut Ilmu", "Menjilat", "Takut Nilai", "Pura-pura"], correctIndex: 0 },
      { id: 'eth6-4', text: "Tidak putus asa saat eksperimen gagal (seperti Jabir) adalah...", options: ["Ketangguhan", "Kebodohan", "Sia-sia", "Nasib"], correctIndex: 0 },
      { id: 'eth6-5', text: "Tujuan akhir menuntut ilmu dalam Islam adalah...", options: ["Mendekat pada Allah", "Cari Kerja", "Gelar", "Status Sosial"], correctIndex: 0 }
    ],
    7: [
      { id: 'eth7-1', text: "Kehancuran total bisa bangkit lagi (Mamluk). Ini mengajarkan...", options: ["Harapan Selalu Ada", "Pasrah", "Putus Asa", "Menyerah"], correctIndex: 0 },
      { id: 'eth7-2', text: "Menjaga persatuan umat agar tidak runtuh seperti Abbasiyah adalah...", options: ["Kewajiban Bersama", "Tugas Presiden", "Tugas Tentara", "Bukan Urusanku"], correctIndex: 0 },
      { id: 'eth7-3', text: "Mewarisi semangat 'Golden Age' di era digital dengan cara...", options: ["Kuasai Teknologi", "Main Game Terus", "Hujat di Medsos", "Tidur"], correctIndex: 0 },
      { id: 'eth7-4', text: "Menjadi siswa berprestasi adalah cara kita...", options: ["Mengharumkan Islam", "Sombong", "Cari Hadiah", "Bebas Tugas"], correctIndex: 0 },
      { id: 'eth7-5', text: "Inti dari pelajaran Bani Abbasiyah adalah...", options: ["Ilmu & Adab Kunci Kejayaan", "Perang Kunci Kekuasaan", "Uang Kunci Kebahagiaan", "Jabatan Kunci Sukses"], correctIndex: 0 }
    ]
  }
};
