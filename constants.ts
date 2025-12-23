
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

// Menggunakan Pollinations.ai untuk generate gambar sesuai konteks sejarah
const getAIImage = (prompt: string) => `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + ", photorealistic, cinematic lighting, ancient islamic golden age, 8k, highly detailed, masterpiece, historical accuracy")}?width=1024&height=768&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Kota Bundar Baghdad',
    category: 'Arsitektur',
    image: getAIImage('Aerial view of the Round City of Baghdad 8th century, circular walls, golden palace in center, tigris river, ancient architecture'),
    description: 'Baghdad dibangun oleh Khalifah Al-Mansyur dengan desain bundar revolusioner. Dikelilingi tembok berlapis dan parit, di tengahnya berdiri istana emas dan masjid agung, melambangkan pusat dunia yang tertata sempurna.'
  },
  {
    id: 'g2',
    title: 'Bayt al-Hikmah',
    category: 'Pusat Ilmu',
    image: getAIImage('Interior of Bayt al-Hikmah library Baghdad, scholars translating scrolls, warm candle lighting, shelves full of ancient books, islamic architecture'),
    description: 'Rumah Kebijaksanaan adalah perpustakaan legendaris. Di sinilah karya Yunani, Persia, dan India diterjemahkan, memicu ledakan ilmu pengetahuan yang menerangi dunia saat Eropa masih dalam kegelapan.'
  },
  {
    id: 'g3',
    title: 'Al-Khawarizmi',
    category: 'Matematika',
    image: getAIImage('Al-Khawarizmi persian mathematician working on algebra manuscript, ancient study room, sunlight beaming through window, wearing turban'),
    description: 'Bapak Aljabar dan Algoritma. Karyanya "Al-Kitab al-Mukhtasar" menjadi dasar matematika modern. Tanpa penemuannya, teknologi komputer dan digital hari ini tidak akan pernah ada.'
  },
  {
    id: 'g4',
    title: 'Observatorium Shammasiya',
    category: 'Astronomi',
    image: getAIImage('Ancient Islamic astronomers using astrolabe at night observatory in desert, starry sky, milky way, looking through large brass instruments'),
    description: 'Bani Abbasiyah membangun observatorium canggih. Mereka mengukur keliling bumi dengan akurasi tinggi dan memetakan bintang untuk navigasi serta penentuan waktu ibadah yang presisi.'
  },
  {
    id: 'g5',
    title: 'Khalifah Harun Al-Rashid',
    category: 'Kepemimpinan',
    image: getAIImage('Caliph Harun Al-Rashid sitting on ornate throne in Baghdad palace, receiving diplomatic gifts, luxurious silk robes, golden age atmosphere'),
    description: 'Simbol masa keemasan. Pemerintahannya diwarnai kemakmuran dan hubungan diplomatik luas. Ia pernah mengirim hadiah jam air mekanik berupa gajah kepada Raja Charlemagne di Eropa.'
  },
  {
    id: 'g6',
    title: 'Ibnu Sina (Avicenna)',
    category: 'Kedokteran',
    image: getAIImage('Ibn Sina examining a patient in ancient islamic hospital, holding medicine book, jars of herbs in background, scholarly look'),
    description: 'Pangeran Para Dokter. Bukunya "Al-Qanun fi al-Tibb" menjadi rujukan utama kedokteran dunia selama berabad-abad. Ia menekankan observasi klinis, karantina, dan eksperimen.'
  },
  {
    id: 'g7',
    title: 'Robotika Al-Jazari',
    category: 'Teknologi',
    image: getAIImage('Al-Jazari elephant clock mechanical invention, detailed gears and water mechanism, ancient engineering blueprint style real life'),
    description: 'Insinyur jenius yang menciptakan mesin otomat, jam gajah, dan pompa air mekanis. Karyanya dalam kitab "Pengetahuan Ilmu Mekanik" meletakkan dasar bagi robotika modern.'
  },
  {
    id: 'g8',
    title: 'Revolusi Kertas',
    category: 'Industri',
    image: getAIImage('Ancient paper mill in Baghdad, workers processing pulp, drying paper sheets, water wheel river background, industrial activity'),
    description: 'Mengadopsi teknologi Tiongkok, Abbasiyah mendirikan pabrik kertas pertama. Kertas murah memicu revolusi literasi, membuat buku terjangkau dan ilmu menyebar cepat ke seluruh lapisan masyarakat.'
  },
  {
    id: 'g9',
    title: 'Sistem Irigasi Tigris',
    category: 'Pertanian',
    image: getAIImage('Lush agricultural gardens in ancient Iraq, complex water channels irrigation system from Tigris river, farmers working, green landscape'),
    description: 'Pertanian maju pesat berkat teknik irigasi canggih. Kanal-kanal raksasa mengubah gurun menjadi kebun subur yang menghasilkan kurma, kapas, dan buah-buahan untuk diekspor.'
  },
  {
    id: 'g10',
    title: 'Bimaristan (Rumah Sakit)',
    category: 'Kesehatan',
    image: getAIImage('Courtyard of Bimaristan ancient hospital, fountain in center, patients resting, doctors walking, peaceful healing environment islamic architecture'),
    description: 'Rumah sakit modern pertama yang gratis. Pasien dirawat berdasarkan penyakit, bukan kekayaan. Terdapat bangsal khusus penyakit jiwa yang diterapi dengan musik dan suara air.'
  },
  {
    id: 'g11',
    title: 'Jabir bin Hayyan',
    category: 'Kimia',
    image: getAIImage('Jabir ibn Hayyan alchemy laboratory, glass flasks, distillation apparatus, colored liquids, ancient chemistry experiment, smoke'),
    description: 'Bapak Kimia modern. Ia mengubah alkimia mistis menjadi sains eksperimental. Menemukan asam sulfat, klorida, dan teknik distilasi kristalisasi yang dipakai di laboratorium hingga kini.'
  },
  {
    id: 'g12',
    title: 'Pasar Dunia Baghdad',
    category: 'Ekonomi',
    image: getAIImage('Bustling ancient Baghdad bazaar market, traders with camels, spices, silk fabrics, diverse people, vibrant colors, sunset'),
    description: 'Pusat perdagangan global. Sutra Cina, rempah India, dan bulu Rusia bertemu di sini. Pedagang menggunakan sistem cek (sakk) untuk transaksi aman tanpa membawa emas berat.'
  },
  {
    id: 'g13',
    title: 'Seni Kaligrafi',
    category: 'Kesenian',
    image: getAIImage('Master calligrapher writing Arabic script with bamboo pen and gold ink, close up on parchment, geometric precision, spiritual atmosphere'),
    description: 'Seni menulis indah mencapai puncaknya. Ibnu Muqlah merumuskan aturan geometris kaligrafi, menjadikan tulisan bukan sekadar alat komunikasi, tapi ekspresi spiritual yang memukau.'
  },
  {
    id: 'g14',
    title: 'Harmoni & Toleransi',
    category: 'Sosial',
    image: getAIImage('Diverse group of scholars muslim christian jewish discussing in Baghdad garden, peaceful coexistence, ancient clothes, interfaith harmony'),
    description: 'Masyarakat Baghdad sangat majemuk. Muslim, Kristen, Yahudi, dan Zoroaster hidup berdampingan. Banyak ilmuwan non-Muslim memegang posisi penting di istana dan lembaga riset.'
  },
  {
    id: 'g15',
    title: 'Jalur Sutra & Diplomasi',
    category: 'Politik',
    image: getAIImage('Caravan traveling on Silk Road desert, ancient map background, diplomatic envoys exchanging scrolls, sunset horizon'),
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

export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    id: 1,
    title: "SEMANGAT LITERASI",
    subtitle: "Pewaris Bayt al-Hikmah",
    type: LevelType.RAPID_FIRE,
    description: "Terapkan semangat cinta ilmu para ilmuwan Baghdad dalam kebiasaan belajarmu.",
    maxScore: 1000,
    image: BG_ABBASSID 
  },
  {
    id: 2,
    title: "ADAB MENUNTUT ILMU",
    subtitle: "Etika Pelajar Mulia",
    type: LevelType.RAPID_FIRE,
    description: "Bagaimana sikapmu terhadap guru dan teman sebagai bentuk penghormatan pada ilmu?",
    maxScore: 1000,
    image: BG_ABBASSID 
  },
  {
    id: 3,
    title: "INTEGRITAS SAINS",
    subtitle: "Kejujuran Intelektual",
    type: LevelType.RAPID_FIRE,
    description: "Meneladani kejujuran Al-Khawarizmi dan Ibnu Sina dalam mengerjakan tugas sekolah.",
    maxScore: 1000,
    image: BG_ABBASSID 
  },
  {
    id: 4,
    title: "KEPEMIMPINAN ADIL",
    subtitle: "Jiwa Sang Khalifah",
    type: LevelType.RAPID_FIRE,
    description: "Terapkan sikap tanggung jawab dan keadilan dalam organisasi atau kelompok kelas.",
    maxScore: 1000,
    image: BG_ABBASSID 
  },
  {
    id: 5,
    title: "TOLERANSI SOSIAL",
    subtitle: "Harmoni Baghdad",
    type: LevelType.RAPID_FIRE,
    description: "Menghargai perbedaan pendapat dan latar belakang teman seperti masyarakat Baghdad.",
    maxScore: 1000,
    image: BG_ABBASSID 
  },
  {
    id: 6,
    title: "GIGIH BERKARYA",
    subtitle: "Inovasi Tanpa Batas",
    type: LevelType.RAPID_FIRE,
    description: "Sikap pantang menyerah saat menghadapi kesulitan belajar yang kompleks.",
    maxScore: 1000,
    image: BG_ABBASSID 
  },
  {
    id: 7,
    title: "CAHAYA PERADABAN",
    subtitle: "Visi Masa Depan",
    type: LevelType.RAPID_FIRE,
    description: "Komitmen menjadi generasi yang membawa manfaat bagi lingkungan sekitar.",
    maxScore: 1000,
    image: BG_ABBASSID 
  }
];

type GameData = Record<Difficulty, Record<number, Question[]>>;

export const GAME_DATA: GameData = {
  [Difficulty.EASY]: {
    1: [
      { id: 'e1-1', text: "Siapa pendiri utama Daulah Abbasiyah?", options: ["Abul Abbas As-Saffah", "Harun al-Rashid", "Al-Ma'mun", "Al-Mansur"], correctIndex: 0 },
      { id: 'e1-2', text: "Daulah Abbasiyah menggantikan kekuasaan Daulah...", options: ["Umayyah", "Fatimiyah", "Mamluk", "Ayyubiyah"], correctIndex: 0 },
      { id: 'e1-3', text: "Pusat gerakan awal Abbasiyah berada di wilayah...", options: ["Khurasan", "Kairo", "Cordoba", "Damaskus"], correctIndex: 0 },
      { id: 'e1-4', text: "Revolusi Abbasiyah memuncak pada tahun...", options: ["750 M", "650 M", "850 M", "950 M"], correctIndex: 0 },
      { id: 'e1-5', text: "Nama belakang dinasti ini merujuk pada paman Nabi SAW yaitu...", options: ["Al-Abbas", "Abu Thalib", "Hamzah", "Abu Lahab"], correctIndex: 0 }
    ],
    2: [
      { id: 'e2-1', text: "Kota manakah yang dibangun sebagai ibu kota Abbasiyah?", options: ["Baghdad", "Kairo", "Damaskus", "Cordoba"], correctIndex: 0 },
      { id: 'e2-2', text: "Siapa khalifah yang membangun kota Baghdad?", options: ["Abu Ja'far Al-Mansur", "Harun al-Rashid", "Al-Ma'mun", "Al-Amin"], correctIndex: 0 },
      { id: 'e2-3', text: "Baghdad terletak di pinggir sungai...", options: ["Tigris", "Nil", "Eufrat", "Indus"], correctIndex: 0 },
      { id: 'e2-4', text: "Apa julukan kota Baghdad karena bentuknya?", options: ["Kota Bundar", "Kota Persegi", "Kota Bintang", "Kota Segitiga"], correctIndex: 0 },
      { id: 'e2-5', text: "Nama resmi Baghdad pada masa awal adalah...", options: ["Madinat al-Salam", "Al-Qahira", "Fustat", "Kufah"], correctIndex: 0 }
    ],
    3: [
      { id: 'e3-1', text: "Apa nama lembaga ilmu pengetahuan yang terkenal di Baghdad?", options: ["Bayt al-Hikmah", "Darul Ulum", "Al-Azhar", "Nizhamiyah"], correctIndex: 0 },
      { id: 'e3-2', text: "Bayt al-Hikmah berfungsi sebagai...", options: ["Perpustakaan & Pusat Riset", "Pasar Tradisional", "Benteng Militer", "Pelabuhan"], correctIndex: 0 },
      { id: 'e3-3', text: "Siapa khalifah yang memprakarsai Bayt al-Hikmah?", options: ["Harun al-Rashid", "Al-Mansur", "Al-Musta'shim", "Al-Amin"], correctIndex: 0 },
      { id: 'e3-4', text: "Di kota manakah Bayt al-Hikmah berada?", options: ["Baghdad", "Basra", "Kufah", "Samarra"], correctIndex: 0 },
      { id: 'e3-5', text: "Bahasa utama dalam penulisan ilmu di lembaga ini adalah...", options: ["Arab", "Latin", "Inggris", "Cina"], correctIndex: 0 }
    ],
    4: [
      { id: 'e4-1', text: "Khalifah yang terkenal dalam kisah 1001 malam adalah...", options: ["Harun al-Rashid", "Al-Mu'tashim", "Al-Wathiq", "Al-Mutawakkil"], correctIndex: 0 },
      { id: 'e4-2', text: "Masa keemasan Abbasiyah terjadi pada abad ke...", options: ["8 - 9 M", "12 - 13 M", "6 - 7 M", "15 - 16 M"], correctIndex: 0 },
      { id: 'e4-3', text: "Istri Harun al-Rashid yang dermawan bernama...", options: ["Zubaidah", "Aisyah", "Fathimah", "Khadijah"], correctIndex: 0 },
      { id: 'e4-4', text: "Masa kekuasaan Harun al-Rashid dianggap sebagai...", options: ["Zaman Keemasan", "Zaman Kegelapan", "Zaman Es", "Zaman Perang"], correctIndex: 0 },
      { id: 'e4-5', text: "Harun al-Rashid sering berkeliling kota secara rahasia untuk...", options: ["Mendengar Rakyat", "Berburu", "Mencari Musuh", "Berlibur"], correctIndex: 0 }
    ],
    5: [
      { id: 'e5-1', text: "Khalifah yang sangat mendukung gerakan penerjemahan adalah...", options: ["Al-Ma'mun", "Al-Hadi", "Al-Mahdi", "Al-Mansur"], correctIndex: 0 },
      { id: 'e5-2', text: "Buku dari bangsa mana yang paling banyak diterjemahkan?", options: ["Yunani", "Inggris", "Prancis", "Jerman"], correctIndex: 0 },
      { id: 'e5-3', text: "Penerjemah Kristen terkenal di Baghdad adalah...", options: ["Hunayn bin Ishaq", "Ibnu Sina", "Al-Kindi", "Al-Razi"], correctIndex: 0 },
      { id: 'e5-4', text: "Apa imbalan bagi penerjemah buku saat itu?", options: ["Emas seberat buku", "Sertifikat", "Tanah", "Gelar Raja"], correctIndex: 0 },
      { id: 'e5-5', text: "Gerakan penerjemahan ini terjadi di pusat riset...", options: ["Bayt al-Hikmah", "Pasar Baghdad", "Masjid Raya", "Istana Emas"], correctIndex: 0 }
    ],
    6: [
      { id: 'e6-1', text: "Siapa penemu angka nol dan bapak Aljabar?", options: ["Al-Khawarizmi", "Ibnu Sina", "Al-Razi", "Al-Kindi"], correctIndex: 0 },
      { id: 'e6-2', text: "Ibnu Sina ahli dalam bidang...", options: ["Kedokteran", "Astronomi", "Seni Lukis", "Musik"], correctIndex: 0 },
      { id: 'e6-3', text: "Jabir bin Hayyan dikenal sebagai bapak...", options: ["Kimia", "Fisika", "Biologi", "Geografi"], correctIndex: 0 },
      { id: 'e6-4', text: "Al-Razi menemukan cara membedakan penyakit...", options: ["Cacar & Campak", "Flu & Batuk", "Pusing", "Sakit Gigi"], correctIndex: 0 },
      { id: 'e6-5', text: "Ilmuwan Abbasiyah banyak menggunakan metode...", options: ["Eksperimen", "Menebak", "Mitos", "Sihir"], correctIndex: 0 }
    ],
    7: [
      { id: 'e7-1', text: "Bangsa mana yang menghancurkan Baghdad tahun 1258 M?", options: ["Mongol", "Romawi", "Persia", "Salib"], correctIndex: 0 },
      { id: 'e7-2', text: "Siapa pemimpin pasukan Mongol yang menyerang Baghdad?", options: ["Hulagu Khan", "Genghis Khan", "Kubilai Khan", "Timur Lenk"], correctIndex: 0 },
      { id: 'e7-3', text: "Apa penyebab eksternal runtuhnya Abbasiyah?", options: ["Serangan Mongol", "Gempa Bumi", "Wabah Penyakit", "Kekeringan"], correctIndex: 0 },
      { id: 'e7-4', text: "Berapa lama dinasti Abbasiyah berkuasa (kira-kira)?", options: ["5 Abad", "1 Abad", "10 Abad", "2 Abad"], correctIndex: 0 },
      { id: 'e7-5', text: "Warisan terpenting Abbasiyah bagi dunia saat ini adalah...", options: ["Ilmu Pengetahuan", "Harta Karun", "Peta Dunia Lama", "Sistem Perang"], correctIndex: 0 }
    ]
  },
  [Difficulty.MEDIUM]: {
    1: [
      { id: 'm1-1', text: "Di mana pusat gerakan perlawanan awal Abbasiyah?", options: ["Khurasan", "Mekkah", "Madinah", "Kufah"], correctIndex: 0 },
      { id: 'm1-2', text: "Siapa tokoh propaganda yang menyebarkan ideologi Abbasiyah?", options: ["Muhammad bin Ali", "Abu Bakar", "Umar bin Khattab", "Ali bin Abi Thalib"], correctIndex: 0 },
      { id: 'm1-3', text: "Apa warna bendera Daulah Abbasiyah?", options: ["Hitam", "Putih", "Hijau", "Kuning"], correctIndex: 0 },
      { id: 'm1-4', text: "Mengapa Khurasan dipilih sebagai pusat gerakan?", options: ["Jauh dari Umayyah", "Dekat Laut", "Tanahnya Subur", "Kota Suci"], correctIndex: 0 },
      { id: 'm1-5', text: "Pemberontakan Abbasiyah berhasil karena dukungan dari kaum...", options: ["Mawali (Non-Arab)", "Bani Israil", "Romawi", "Viking"], correctIndex: 0 }
    ],
    2: [
      { id: 'm2-1', text: "Julukan kota Baghdad karena bentuknya yang unik adalah...", options: ["Kota Bundar", "Kota Cahaya", "Kota Emas", "Kota Seribu Menara"], correctIndex: 0 },
      { id: 'm2-2', text: "Pembangunan Baghdad membutuhkan waktu sekitar...", options: ["4 Tahun", "10 Tahun", "1 Tahun", "20 Tahun"], correctIndex: 0 },
      { id: 'm2-3', text: "Nama asli kota Baghdad adalah...", options: ["Madinatussalam", "Al-Qahirah", "Fustath", "Samarra"], correctIndex: 0 },
      { id: 'm2-4', text: "Arsitek Baghdad mengadopsi gaya kota dari peradaban...", options: ["Persia", "Mesir", "Yunani", "Tiongkok"], correctIndex: 0 },
      { id: 'm2-5', text: "Pusat dari kota bundar Baghdad adalah...", options: ["Istana & Masjid", "Pasar Utama", "Gerbang Kota", "Perpustakaan"], correctIndex: 0 }
    ],
    3: [
      { id: 'm3-1', text: "Tugas utama Bayt al-Hikmah selain perpustakaan adalah...", options: ["Penerjemahan", "Latihan Militer", "Pasar Seni", "Pusat Pajak"], correctIndex: 0 },
      { id: 'm3-2', text: "Naskah dari peradaban mana yang diterjemahkan ke bahasa Arab?", options: ["Yunani & India", "Maya & Aztek", "Viking", "Jepang Kuno"], correctIndex: 0 },
      { id: 'm3-3', text: "Bayt al-Hikmah mencapai puncak aktivitasnya pada masa...", options: ["Al-Ma'mun", "Al-Mahdi", "Al-Mansur", "Al-Amin"], correctIndex: 0 },
      { id: 'm3-4', text: "Bayt al-Hikmah juga berfungsi sebagai pusat observasi...", options: ["Astronomi", "Biologi", "Kelautan", "Pertambangan"], correctIndex: 0 },
      { id: 'm3-5', text: "Siapa penerjemah yang dibayar emas seberat naskahnya?", options: ["Hunayn bin Ishaq", "Al-Farabi", "Al-Razi", "Al-Jahiz"], correctIndex: 0 }
    ],
    4: [
      { id: 'm4-1', text: "Harun al-Rashid menjalin hubungan diplomatik dengan raja Eropa...", options: ["Charlemagne", "Richard Lionheart", "Louis XIV", "Napoleon"], correctIndex: 0 },
      { id: 'm4-2', text: "Apa hadiah terkenal Harun al-Rashid untuk Raja Charlemagne?", options: ["Jam Air & Gajah", "Pedang Emas", "Kuda Arab", "Sutra Tiongkok"], correctIndex: 0 },
      { id: 'm4-3', text: "Sistem irigasi yang diperbaiki masa Harun bertujuan untuk...", options: ["Pertanian", "Transportasi Air", "Pertahanan", "Kecantikan"], correctIndex: 0 },
      { id: 'm4-4', text: "Kota Baghdad di era Harun menjadi pusat perdagangan antara...", options: ["Cina & Eropa", "Jepang & Amerika", "Afrika & Kutub", "Australia & India"], correctIndex: 0 },
      { id: 'm4-5', text: "Salah satu kisah terkenal dalam 1001 Malam adalah...", options: ["Aladdin", "Maling Kundang", "Timun Mas", "Cinderella"], correctIndex: 0 }
    ],
    5: [
      { id: 'm5-1', text: "Khalifah Al-Ma'mun mendirikan observatorium di...", options: ["Shammasiya", "Kairo", "Mekkah", "Andalusia"], correctIndex: 0 },
      { id: 'm5-2', text: "Proyek besar Al-Ma'mun dalam bidang geografi adalah...", options: ["Peta Dunia", "Peta Harta Karun", "Jalan Raya", "Terowongan"], correctIndex: 0 },
      { id: 'm5-3', text: "Paham teologi yang didukung Al-Ma'mun dan memicu kontroversi...", options: ["Mu'tazilah", "Qadariyah", "Jabariyah", "Khawarij"], correctIndex: 0 },
      { id: 'm5-4', text: "Al-Ma'mun sangat menghargai ilmuwan yang ahli dalam...", options: ["Logika & Filsafat", "Sihir & Mistik", "Perang & Pedang", "Masak & Tari"], correctIndex: 0 },
      { id: 'm5-5', text: "Masa Al-Ma'mun disebut sebagai puncak...", options: ["Intelektual Islam", "Kekuatan Militer", "Perluasan Wilayah", "Kekayaan Raja"], correctIndex: 0 }
    ],
    6: [
      { id: 'm6-1', text: "Karya monumental Ibnu Sina dalam kedokteran berjudul...", options: ["Al-Qanun fi al-Tibb", "Al-Jabr", "Ihya Ulumuddin", "Tafsir Jalalain"], correctIndex: 0 },
      { id: 'm6-2', text: "Al-Kindi dikenal sebagai...", options: ["Filosof Arab Pertama", "Dokter Bedah", "Ahli Tafsir", "Sejarawan"], correctIndex: 0 },
      { id: 'm6-3', text: "Siapa ilmuwan yang mengukur keliling bumi di masa Abbasiyah?", options: ["Al-Biruni", "Ibnu Batuta", "Ibnu Khaldun", "Al-Ghazali"], correctIndex: 0 },
      { id: 'm6-4', text: "Teknologi pembuatan kertas diadopsi Abbasiyah dari bangsa...", options: ["Tiongkok", "Mesir", "Romawi", "India"], correctIndex: 0 },
      { id: 'm6-5', text: "Rumah sakit pertama (Bimaristan) didirikan di...", options: ["Baghdad", "Madinah", "Damaskus", "Kairo"], correctIndex: 0 }
    ],
    7: [
      { id: 'm7-1', text: "Peristiwa hancurnya Baghdad oleh Mongol disebut...", options: ["Malapetaka Besar", "Perang Salib", "Revolusi Arab", "Fathu Makkah"], correctIndex: 0 },
      { id: 'm7-2', text: "Sungai Tigris berubah warna menjadi merah dan hitam karena...", options: ["Darah & Tinta Buku", "Minyak Tumpah", "Lumpur Banjir", "Cat Perang"], correctIndex: 0 },
      { id: 'm7-3', text: "Khalifah terakhir Abbasiyah yang dibunuh Mongol adalah...", options: ["Al-Musta'shim", "Al-Mutawakkil", "Al-Mu'tazz", "Al-Wathiq"], correctIndex: 0 },
      { id: 'm7-4', text: "Faktor internal kemunduran Abbasiyah adalah...", options: ["Perebutan Kekuasaan", "Wabah Penyakit", "Gempa Bumi", "Kurang Makanan"], correctIndex: 0 },
      { id: 'm7-5', text: "Setelah Baghdad runtuh, kekhalifahan simbolis pindah ke...", options: ["Kairo", "Istanbul", "Cordoba", "Delhi"], correctIndex: 0 }
    ]
  },
  [Difficulty.HARD]: {
    1: [
      { id: 'h1-1', text: "Siapa jenderal Persia yang sangat berjasa dalam revolusi Abbasiyah?", options: ["Abu Muslim al-Khurasani", "Tariq bin Ziyad", "Khalid bin Walid", "Salahuddin"], correctIndex: 0 },
      { id: 'h1-2', text: "Pertempuran penentuan antara Abbasiyah dan Umayyah terjadi di sungai...", options: ["Zab Hulu", "Tigris", "Nil", "Eufrat"], correctIndex: 0 },
      { id: 'h1-3', text: "Apa nama gerakan bawah tanah Abbasiyah sebelum berkuasa?", options: ["Hashimiyah", "Fatimiyah", "Khawarij", "Zaidiyah"], correctIndex: 0 },
      { id: 'h1-4', text: "Siapa khalifah Umayyah terakhir yang dikalahkan?", options: ["Marwan II", "Walid II", "Yazid III", "Hisham"], correctIndex: 0 },
      { id: 'h1-5', text: "Strategi Abbasiyah menggabungkan kekuatan Arab dan...", options: ["Mawali Persia", "Turki Seljuk", "Berber", "Romawi Timur"], correctIndex: 0 }
    ],
    2: [
      { id: 'h2-1', text: "Desain kota bundar Baghdad terinspirasi dari kota Persia yaitu...", options: ["Firuzabad", "Persepolis", "Isfahan", "Tehran"], correctIndex: 0 },
      { id: 'h2-2', text: "Berapa jumlah gerbang utama di kota bundar Baghdad?", options: ["4 Gerbang", "8 Gerbang", "12 Gerbang", "2 Gerbang"], correctIndex: 0 },
      { id: 'h2-3', text: "Apa nama istana khalifah yang terletak di tengah kota bundar?", options: ["Istana Gerbang Emas", "Istana Al-Hamra", "Istana Topkapi", "Istana Maimun"], correctIndex: 0 },
      { id: 'h2-4', text: "Siapa perencana tata kota Baghdad yang ditunjuk Al-Mansur?", options: ["Nawbakht & Masha'allah", "Al-Kindi & Al-Razi", "Sinan & Imhotep", "Ziryab & Farabi"], correctIndex: 0 },
      { id: 'h2-5', text: "Sistem pertahanan Baghdad dikelilingi oleh...", options: ["Parit Ganda", "Tembok Api", "Hutan Lebat", "Pegunungan"], correctIndex: 0 }
    ],
    3: [
      { id: 'h3-1', text: "Siapa direktur Bayt al-Hikmah yang paling terkenal?", options: ["Hunayn bin Ishaq", "Thabit bin Qurra", "Al-Khawarizmi", "Al-Battani"], correctIndex: 0 },
      { id: 'h3-2', text: "Buku 'Al-Majesti' karya Ptolemeus diterjemahkan ke bidang...", options: ["Astronomi", "Kedokteran", "Geografi", "Sastra"], correctIndex: 0 },
      { id: 'h3-3', text: "Keluarga Barmakid berperan penting dalam...", options: ["Mendukung Sains", "Perang Salib", "Menghancurkan Baghdad", "Melawan Mongol"], correctIndex: 0 },
      { id: 'h3-4', text: "Selain menerjemahkan, ilmuwan Bayt al-Hikmah juga melakukan...", options: ["Koreksi & Kritik", "Pembakaran Buku", "Pemalsuan", "Penyalinan Buta"], correctIndex: 0 },
      { id: 'h3-5', text: "Metode ilmiah 'Observasi & Eksperimen' dipopulerkan oleh...", options: ["Al-Hasan ibn al-Haytham", "Ibnu Rushd", "Al-Ghazali", "Ibnu Taimiyah"], correctIndex: 0 }
    ],
    4: [
      { id: 'h4-1', text: "Pemberontakan besar yang terjadi masa Harun al-Rashid adalah...", options: ["Khawarij", "Zanj", "Qaramithah", "Mamluk"], correctIndex: 0 },
      { id: 'h4-2', text: "Tragedi jatuhnya keluarga Barmakid disebut peristiwa...", options: ["Nakbah Barmakid", "Fitnah Kubra", "Mihnah", "Perang Saudara"], correctIndex: 0 },
      { id: 'h4-3', text: "Siapa nama ibu Harun al-Rashid yang berpengaruh?", options: ["Al-Khayzuran", "Zubaidah", "Buran", "Shajar al-Durr"], correctIndex: 0 },
      { id: 'h4-4', text: "Harun al-Rashid membagi kekaisaran kepada dua putranya yaitu...", options: ["Al-Amin & Al-Ma'mun", "Hadi & Mahdi", "Wathiq & Mutawakkil", "Mansur & Mahdi"], correctIndex: 0 },
      { id: 'h4-5', text: "Ekspedisi militer musim panas ke Romawi disebut...", options: ["Sha'ifah", "Ghazwah", "Sariyyah", "Futuhat"], correctIndex: 0 }
    ],
    5: [
      { id: 'h5-1', text: "Perang saudara antara Al-Amin dan Al-Ma'mun disebut...", options: ["Perang Saudara Keempat", "Perang Jamal", "Perang Siffin", "Perang Riddah"], correctIndex: 0 },
      { id: 'h5-2', text: "Al-Ma'mun mengukur derajat meridian bumi di padang pasir...", options: ["Sinjar", "Sahara", "Gobi", "Arabia"], correctIndex: 0 },
      { id: 'h5-3', text: "Ujian teologi yang diberlakukan Al-Ma'mun kepada ulama disebut...", options: ["Mihnah", "Fitnah", "Hiwar", "Debat"], correctIndex: 0 },
      { id: 'h5-4', text: "Tokoh ulama yang dipenjara karena menolak paham Mu'tazilah adalah...", options: ["Ahmad bin Hanbal", "Imam Syafi'i", "Imam Malik", "Abu Hanifah"], correctIndex: 0 },
      { id: 'h5-5', text: "Mimpi Al-Ma'mun bertemu tokoh Yunani memicu penerjemahan. Siapa tokoh itu?", options: ["Aristoteles", "Plato", "Socrates", "Pythagoras"], correctIndex: 0 }
    ],
    6: [
      { id: 'h6-1', text: "Karya Al-Jazari tentang mekanika berjudul...", options: ["Fi Ma'rifat al-Hiyal", "Al-Qanun", "Al-Shifa", "Al-Hawi"], correctIndex: 0 },
      { id: 'h6-2', text: "Bani Musa bersaudara dikenal ahli dalam bidang...", options: ["Mekanika & Geometri", "Sastra & Puisi", "Hukum & Fiqih", "Sejarah"], correctIndex: 0 },
      { id: 'h6-3', text: "Siapa penemu kamera obscura (prinsip optik)?", options: ["Ibnu al-Haytham", "Ibnu Sina", "Al-Biruni", "Al-Khawarizmi"], correctIndex: 0 },
      { id: 'h6-4', text: "Rumah sakit di Baghdad memiliki bangsal khusus untuk...", options: ["Penyakit Jiwa", "Bangsawan", "Tentara Saja", "Hewan"], correctIndex: 0 },
      { id: 'h6-5', text: "Inovasi pertanian 'Revolusi Hijau' Abbasiyah memperkenalkan...", options: ["Rotasi Tanaman", "Traktor Uap", "Pupuk Kimia", "Bibit Unggul"], correctIndex: 0 }
    ],
    7: [
      { id: 'h7-1', text: "Siapa wazir yang dituduh berkhianat membantu Mongol?", options: ["Ibnu al-Alqami", "Nizam al-Mulk", "Jafar Barmakid", "Fadhl bin Sahl"], correctIndex: 0 },
      { id: 'h7-2', text: "Setelah Baghdad hancur, ilmu pengetahuan Islam berpindah ke...", options: ["Kairo & Cordoba", "Mekkah & Madinah", "Istanbul & Delhi", "Paris & London"], correctIndex: 0 },
      { id: 'h7-3', text: "Keturunan Abbasiyah yang selamat mendirikan kekhalifahan bayangan di...", options: ["Mesir (Mamluk)", "Turki (Utsmani)", "India (Mughal)", "Persia (Safawi)"], correctIndex: 0 },
      { id: 'h7-4', text: "Dinasti kecil yang memisahkan diri dari Abbasiyah disebut...", options: ["Disintegrasi", "Revolusi", "Reformasi", "Globalisasi"], correctIndex: 0 },
      { id: 'h7-5', text: "Serangan Mongol berakhir di pertempuran Ain Jalut melawan...", options: ["Mamluk", "Ayyubiyah", "Seljuk", "Fatimid"], correctIndex: 0 }
    ]
  },
  [Difficulty.ETHICS]: {
    1: [
      { id: 'eth1-1', text: "Dalam Q.S. Al-Mujadilah: 11, Allah akan meninggikan derajat orang yang...", options: ["Beriman & Berilmu", "Kaya & Kuat", "Tampan & Populer", "Berkuasa & Ditakuti"], correctIndex: 0 },
      { id: 'eth1-2', text: "Sikap 'melapangkan majelis' dalam ayat tersebut mengajarkan...", options: ["Kepedulian Sosial", "Egoisme", "Kompetisi", "Kekuasaan"], correctIndex: 0 },
      { id: 'eth1-3', text: "Ilmuwan Abbasiyah belajar siang malam. Nilai yang diambil adalah...", options: ["Kerja Keras", "Santai", "Pasrah", "Tidur"], correctIndex: 0 },
      { id: 'eth1-4', text: "Menghormati guru seperti Imam Malik kepada gurunya adalah cermin...", options: ["Adab Penuntut Ilmu", "Pencitraan", "Ketakutan", "Kelemahan"], correctIndex: 0 },
      { id: 'eth1-5', text: "Ilmu tanpa iman menurut karakter Abbasiyah akan menjadi...", options: ["Bencana", "Kekuatan", "Harta", "Kebanggaan"], correctIndex: 0 }
    ],
    2: [
      { id: 'eth2-1', text: "Khalifah Harun al-Rashid sering menangis mendengar nasehat ulama. Ini menunjukkan...", options: ["Kelembutan Hati", "Kelemahan Mental", "Sandiwara", "Ketakutan"], correctIndex: 0 },
      { id: 'eth2-2', text: "Bayt al-Hikmah menerima buku dari berbagai bangsa. Sikap ini adalah...", options: ["Terbuka & Inklusif", "Meniru Buta", "Menjajah", "Mencuri"], correctIndex: 0 },
      { id: 'eth2-3', text: "Penerjemah Kristen dihormati di istana. Ini bukti nilai...", options: ["Toleransi", "Sinkretisme", "Kelemahan Iman", "Politik Uang"], correctIndex: 0 },
      { id: 'eth2-4', text: "Para ilmuwan menulis ribuan buku. Sikap produktif ini disebut...", options: ["Etos Kerja Tinggi", "Buang Waktu", "Cari Muka", "Ambisius"], correctIndex: 0 },
      { id: 'eth2-5', text: "Ibnu Sina merawat orang miskin secara gratis. Ini adalah nilai...", options: ["Kemanusiaan", "Bisnis", "Iklan", "Politik"], correctIndex: 0 }
    ],
    3: [
      { id: 'eth3-1', text: "Jika temanmu kesulitan memahami pelajaran, sikap sesuai Al-Mujadilah 11 adalah...", options: ["Membantunya Belajar", "Mengejeknya", "Membiarkannya", "Pamer Nilai"], correctIndex: 0 },
      { id: 'eth3-2', text: "Menyela pembicaraan guru saat menjelaskan adalah sikap...", options: ["Suul Adab (Buruk)", "Kritis", "Pintar", "Berani"], correctIndex: 0 },
      { id: 'eth3-3', text: "Menggunakan ilmu untuk menipu orang lain bertentangan dengan...", options: ["Integritas Ilmu", "Kecerdasan", "Strategi", "Keuntungan"], correctIndex: 0 },
      { id: 'eth3-4', text: "Mencintai buku dan perpustakaan adalah ciri meneladani...", options: ["Ulama Abbasiyah", "Tentara Mongol", "Raja Romawi", "Pedagang Kafir"], correctIndex: 0 },
      { id: 'eth3-5', text: "Belajar sejarah Islam bertujuan untuk...", options: ["Mengambil Hikmah", "Hafalan Saja", "Berdebat", "Masa Lalu"], correctIndex: 0 }
    ],
    4: [
      { id: 'eth4-1', text: "Sikap tawadhu' (rendah hati) para ilmuwan besar terlihat dari...", options: ["Mengakui Sumber Ilmu", "Sombong", "Meremehkan Orang", "Menyembunyikan Ilmu"], correctIndex: 0 },
      { id: 'eth4-2', text: "Ketika berbeda pendapat, ulama Abbasiyah mengedepankan...", options: ["Dialog Ilmiah", "Perkelahian", "Hinaan", "Fitnah"], correctIndex: 0 },
      { id: 'eth4-3', text: "Disiplin waktu sholat di tengah kesibukan riset adalah cermin...", options: ["Keseimbangan Hidup", "Fanatisme", "Kemalasan", "Paksaan"], correctIndex: 0 },
      { id: 'eth4-4', text: "Menjaga kebersihan buku dan alat tulis termasuk...", options: ["Memuliakan Ilmu", "Boros", "Ribet", "Pamer"], correctIndex: 0 },
      { id: 'eth4-5', text: "Motivasi utama ilmuwan Muslim berkarya adalah...", options: ["Mencari Ridho Allah", "Mencari Uang", "Mencari Pujian", "Mencari Jabatan"], correctIndex: 0 }
    ],
    5: [
      { id: 'eth5-1', text: "Masyarakat Baghdad hidup damai dalam perbedaan. Kita bisa menirunya dengan...", options: ["Rukun Tetangga", "Memusuhi Beda Agama", "Eksklusif", "Curiga"], correctIndex: 0 },
      { id: 'eth5-2', text: "Al-Jazari membuat mesin untuk memudahkan pekerjaan manusia. Ini niat...", options: ["Memberi Manfaat", "Merusak Alam", "Menjadi Tuhan", "Main-main"], correctIndex: 0 },
      { id: 'eth5-3', text: "Kejujuran pedagang Baghdad menggunakan cek (sakk) mencerminkan...", options: ["Amanah", "Kelicikan", "Kebodohan", "Kerugian"], correctIndex: 0 },
      { id: 'eth5-4', text: "Rumah sakit melayani tanpa melihat status sosial. Ini adalah...", options: ["Keadilan Sosial", "Diskriminasi", "Pencitraan", "Bisnis"], correctIndex: 0 },
      { id: 'eth5-5', text: "Runtuhnya Baghdad karena pengkhianatan mengajarkan bahaya...", options: ["Hilangnya Amanah", "Kurang Senjata", "Musuh Kuat", "Takdir"], correctIndex: 0 }
    ],
    6: [
      { id: 'eth6-1', text: "Imam Syafi'i membagi waktu malamnya untuk ibadah dan ilmu. Ini manajemen...", options: ["Waktu", "Uang", "Konflik", "Stress"], correctIndex: 0 },
      { id: 'eth6-2', text: "Menyontek saat ujian adalah pengkhianatan terhadap...", options: ["Ilmu & Diri Sendiri", "Guru Saja", "Teman", "Sekolah"], correctIndex: 0 },
      { id: 'eth6-3', text: "Jika berjanji harus ditepati. Ini karakter...", options: ["Ksatria Muslim", "Munafik", "Pengecut", "Politikus"], correctIndex: 0 },
      { id: 'eth6-4', text: "Berani mengakui kesalahan saat salah menjawab adalah sikap...", options: ["Jujur & Sportif", "Bodoh", "Malu", "Hina"], correctIndex: 0 },
      { id: 'eth6-5', text: "Ilmu yang bermanfaat adalah ilmu yang...", options: ["Diamalkan", "Disimpan", "Dihafal", "Diperdebatkan"], correctIndex: 0 }
    ],
    7: [
      { id: 'eth7-1', text: "Cita-cita membangun peradaban Islam kembali dimulai dari...", options: ["Diri Sendiri", "Menunggu Pemimpin", "Protes", "Mimpi"], correctIndex: 0 },
      { id: 'eth7-2', text: "Teknologi AI (Kecerdasan Buatan) harus digunakan untuk...", options: ["Kebaikan Umat", "Kejahatan", "Malas Berpikir", "Menipu"], correctIndex: 0 },
      { id: 'eth7-3', text: "Menjaga lingkungan sekolah tetap bersih adalah bagian dari...", options: ["Iman", "Hukuman", "Paksaan Guru", "Pencitraan"], correctIndex: 0 },
      { id: 'eth7-4', text: "Generasi emas Islam masa depan adalah generasi yang...", options: ["Berilmu & Beradab", "Kaya Raya", "Santai", "Viral"], correctIndex: 0 },
      { id: 'eth7-5', text: "Pesan akhir dari sejarah Abbasiyah adalah...", options: ["Ilmu Mengangkat Derajat", "Perang Itu Keren", "Harta Segalanya", "Kekuasaan Abadi"], correctIndex: 0 }
    ]
  }
};
