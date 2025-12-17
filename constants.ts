
import { LevelConfig, LevelType, Question, Character, Difficulty } from './types';

export const CHARACTERS: Character[] = [
  {
    id: 'c1',
    name: 'MUJAHID',
    role: 'Ahli Strategi',
    image: 'https://cdn-icons-png.flaticon.com/512/3408/3408455.png', 
    perk: 'Fokus Tinggi'
  },
  {
    id: 'c2',
    name: 'HAFIZ',
    role: 'Penjaga Arsip',
    image: 'https://cdn-icons-png.flaticon.com/512/3408/3408472.png',
    perk: 'Ingatan Kuat'
  },
  {
    id: 'c3',
    name: 'FAQIH',
    role: 'Diplomat',
    image: 'https://cdn-icons-png.flaticon.com/512/3408/3408466.png',
    perk: 'Negosiasi'
  },
  {
    id: 'c4',
    name: 'MUBALLIGH',
    role: 'Intelektual',
    image: 'https://cdn-icons-png.flaticon.com/512/3408/3408485.png',
    perk: 'Wawasan Luas'
  }
];

// BACKGROUNDS SESUAI TEMA BANI ABBASIYAH
const BG_LEVEL_1 = "https://images.unsplash.com/photo-1548685913-fe6678b427dd?q=80&w=2070&auto=format&fit=crop"; // Gerbang/Pendirian
const BG_LEVEL_2 = "https://images.unsplash.com/photo-1599940824399-b87987ced72a?q=80&w=2070&auto=format&fit=crop"; // Istana/Keemasan
const BG_LEVEL_3 = "https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=2070&auto=format&fit=crop"; // Buku/Baitul Hikmah
const BG_LEVEL_4 = "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop"; // Sains/Lab
const BG_LEVEL_5 = "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2070&auto=format&fit=crop"; // Kota/Peradaban
const BG_LEVEL_6 = "https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=1974&auto=format&fit=crop"; // Api/Keruntuhan
const BG_LEVEL_7 = "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2074&auto=format&fit=crop"; // Warisan

export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    id: 1,
    title: "PENDIRIAN DINASTI",
    subtitle: "Revolusi Abbasiyah",
    type: LevelType.RAPID_FIRE,
    description: "Identifikasi tokoh pendiri dan ibu kota awal pemerintahan Bani Abbasiyah.",
    maxScore: 1000,
    image: BG_LEVEL_1 
  },
  {
    id: 2,
    title: "MASA KEEMASAN",
    subtitle: "The Golden Age",
    type: LevelType.RAPID_FIRE,
    description: "Jelajahi pencapaian Harun Ar-Rashid dan kemakmuran Baghdad.",
    maxScore: 1000,
    image: BG_LEVEL_2 
  },
  {
    id: 3,
    title: "BAITUL HIKMAH",
    subtitle: "Rumah Kebijaksanaan",
    type: LevelType.RAPID_FIRE,
    description: "Pusat penerjemahan dan perpustakaan terbesar di dunia abad pertengahan.",
    maxScore: 1000,
    image: BG_LEVEL_3 
  },
  {
    id: 4,
    title: "PARA ILMUWAN",
    subtitle: "Bintang Pengetahuan",
    type: LevelType.RAPID_FIRE,
    description: "Kenali tokoh-tokoh besar seperti Al-Khawarizmi, Ibnu Sina, dan penemuan mereka.",
    maxScore: 1000,
    image: BG_LEVEL_4 
  },
  {
    id: 5,
    title: "KOTA PERADABAN",
    subtitle: "Metropolis Dunia",
    type: LevelType.RAPID_FIRE,
    description: "Tata kota Baghdad, sistem air, rumah sakit, dan kemajuan sosial.",
    maxScore: 1000,
    image: BG_LEVEL_5 
  },
  {
    id: 6,
    title: "KERUNTUHAN",
    subtitle: "Serangan Mongol",
    type: LevelType.RAPID_FIRE,
    description: "Peristiwa tragis 1258 M, serangan Hulagu Khan, dan faktor internal.",
    maxScore: 1000,
    image: BG_LEVEL_6 
  },
  {
    id: 7,
    title: "WARISAN ABADI",
    subtitle: "Legacy to World",
    type: LevelType.RAPID_FIRE,
    description: "Pengaruh Abbasiyah terhadap Renaisans Eropa dan dunia modern.",
    maxScore: 1000,
    image: BG_LEVEL_7 
  }
];

// --- GAME DATA BY DIFFICULTY ---

type GameData = Record<Difficulty, Record<number, Question[]>>;

export const GAME_DATA: GameData = {
  [Difficulty.EASY]: {
    1: [
      { id: 'e1-1', text: "Siapakah pendiri pertama Daulah Bani Abbasiyah?", options: ["Harun Ar-Rashid", "Abdullah as-Saffah", "Muawiyah", "Abu Jafar"], correctIndex: 1 },
      { id: 'e1-2', text: "Kota yang menjadi pusat pemerintahan Abbasiyah yang termasyhur adalah...", options: ["Damaskus", "Kairo", "Baghdad", "Mekkah"], correctIndex: 2 },
      { id: 'e1-3', text: "Bani Abbasiyah mengambil nama dari paman Nabi Muhammad SAW, yaitu...", options: ["Hamzah", "Abu Thalib", "Abbas bin Abdul Muthalib", "Abu Lahab"], correctIndex: 2 }
    ],
    2: [
      { id: 'e2-1', text: "Khalifah yang terkenal dalam kisah 1001 Malam adalah...", options: ["Al-Mansur", "Harun Ar-Rashid", "Al-Amin", "Al-Makmun"], correctIndex: 1 },
      { id: 'e2-2', text: "Pada masa keemasan, Baghdad dijuluki sebagai...", options: ["Kota Mati", "Kota Seribu Satu Malam", "Kota Pelajar", "Kota Perang"], correctIndex: 1 },
      { id: 'e2-3', text: "Salah satu tanda kemajuan masa ini adalah berkembangnya...", options: ["Ilmu Pengetahuan", "Perjudian", "Kemiskinan", "Kebodohan"], correctIndex: 0 }
    ],
    3: [
      { id: 'e3-1', text: "Apa nama perpustakaan besar yang didirikan di Baghdad?", options: ["Darul Ulum", "Baitul Hikmah", "Taj Mahal", "Al-Azhar"], correctIndex: 1 },
      { id: 'e3-2', text: "Kegiatan utama di Baitul Hikmah adalah...", options: ["Perang", "Penerjemahan buku", "Berdagang", "Latihan militer"], correctIndex: 1 },
      { id: 'e3-3', text: "Baitul Hikmah mencapai puncak kejayaan pada masa Khalifah...", options: ["As-Saffah", "Al-Makmun", "Al-Mutawakkil", "Hulagu"], correctIndex: 1 }
    ],
    4: [
      { id: 'e4-1', text: "Bapak Aljabar (Matematika) dari masa Abbasiyah adalah...", options: ["Ibnu Sina", "Al-Khawarizmi", "Al-Farabi", "Ibnu Rusyd"], correctIndex: 1 },
      { id: 'e4-2', text: "Ilmuwan yang ahli dalam bidang Kedokteran dan menulis Qanun fi Thib adalah...", options: ["Al-Ghazali", "Ibnu Sina (Avicenna)", "Al-Kindi", "Jabir bin Hayyan"], correctIndex: 1 },
      { id: 'e4-3', text: "Tokoh yang dikenal sebagai ahli kimia (Father of Chemistry) adalah...", options: ["Jabir bin Hayyan", "Al-Battani", "Ibnu Batutah", "Al-Razi"], correctIndex: 0 }
    ],
    5: [
      { id: 'e5-1', text: "Bentuk kota Baghdad yang dibangun Al-Mansur berbentuk...", options: ["Segitiga", "Bundar (Lingkaran)", "Kotak", "Tidak beraturan"], correctIndex: 1 },
      { id: 'e5-2', text: "Fasilitas kesehatan gratis pertama kali banyak didirikan di...", options: ["Baghdad", "Eropa", "Amerika", "Afrika"], correctIndex: 0 },
      { id: 'e5-3', text: "Sungai yang membelah kota Baghdad adalah...", options: ["Sungai Nil", "Sungai Tigris", "Sungai Eufrat", "Sungai Amazon"], correctIndex: 1 }
    ],
    6: [
      { id: 'e6-1', text: "Siapakah pemimpin Mongol yang menghancurkan Baghdad?", options: ["Genghis Khan", "Hulagu Khan", "Kubilai Khan", "Timur Lenk"], correctIndex: 1 },
      { id: 'e6-2', text: "Pada tahun berapakah Baghdad jatuh ke tangan Mongol?", options: ["1258 M", "1453 M", "1945 M", "750 M"], correctIndex: 0 },
      { id: 'e6-3', text: "Apa yang terjadi pada buku-buku di Baitul Hikmah saat penyerangan?", options: ["Disimpan", "Dibuang ke Sungai Tigris", "Dijual", "Dibaca"], correctIndex: 1 }
    ],
    7: [
      { id: 'e7-1', text: "Ilmu dari Abbasiyah menyebar ke Eropa dan memicu zaman...", options: ["Kegelapan", "Renaisans (Pencerahan)", "Batu", "Es"], correctIndex: 1 },
      { id: 'e7-2', text: "Sistem angka yang kita pakai sekarang (1,2,3) berasal dari angka...", options: ["Romawi", "Arab", "Cina", "Mesir"], correctIndex: 1 },
      { id: 'e7-3', text: "Salah satu warisan medis Ibnu Sina dipakai di universitas Eropa selama...", options: ["1 tahun", "Ratusan tahun", "1 minggu", "Tidak pernah"], correctIndex: 1 }
    ]
  },
  [Difficulty.MEDIUM]: {
    1: [
      { id: 'm1-1', text: "Revolusi Abbasiyah dimulai dari gerakan bawah tanah di wilayah...", options: ["Khurasan", "Andalusia", "Yaman", "Turki"], correctIndex: 0 },
      { id: 'm1-2', text: "Tokoh militer yang sangat berjasa membantu As-Saffah adalah...", options: ["Abu Muslim Al-Khurasani", "Khalid bin Walid", "Salahuddin", "Tariq bin Ziyad"], correctIndex: 0 },
      { id: 'm1-3', text: "Al-Mansur memindahkan ibu kota ke Baghdad karena alasan...", options: ["Keindahan", "Strategis militer & ekonomi", "Perintah mimpi", "Menghindari banjir"], correctIndex: 1 }
    ],
    2: [
      { id: 'm2-1', text: "Keluarga Barmak (The Barmakids) adalah keluarga wazir yang berpengaruh pada masa...", options: ["Al-Mahdi & Harun Ar-Rashid", "As-Saffah", "Al-Mustashim", "Al-Mutawakkil"], correctIndex: 0 },
      { id: 'm2-2', text: "Hubungan diplomatik Harun Ar-Rashid terjalin baik dengan raja Eropa...", options: ["Charlemagne", "Richard Lionheart", "Napoleon", "Alexander"], correctIndex: 0 },
      { id: 'm2-3', text: "Era ini disebut 'The Golden Age of Islam' karena...", options: ["Banyak emas", "Supremasi ilmu & peradaban", "Wilayah terluas", "Pasukan terkuat"], correctIndex: 1 }
    ],
    3: [
      { id: 'm3-1', text: "Gerakan penerjemahan besar-besaran di Baitul Hikmah meliputi karya dari...", options: ["Yunani, Persia, India", "Jepang, Korea", "Amerika, Inggris", "Rusia"], correctIndex: 0 },
      { id: 'm3-2', text: "Selain perpustakaan, Baitul Hikmah juga berfungsi sebagai...", options: ["Observatorium Astronomi", "Pasar", "Penjara", "Barak Militer"], correctIndex: 0 },
      { id: 'm3-3', text: "Hunayn bin Ishaq dikenal sebagai...", options: ["Jenderal", "Penerjemah ulung", "Pedagang", "Arsitek"], correctIndex: 1 }
    ],
    4: [
      { id: 'm4-1', text: "Karya Al-Khawarizmi 'Al-Jabar wal Muqabalah' menjadi dasar ilmu...", options: ["Biologi", "Aljabar (Algoritma)", "Sejarah", "Seni"], correctIndex: 1 },
      { id: 'm4-2', text: "Al-Razi (Rhazes) adalah orang pertama yang membedakan penyakit...", options: ["Cacar & Campak", "Flu & Batuk", "Jantung & Paru", "Demam & Pusing"], correctIndex: 0 },
      { id: 'm4-3', text: "Buku 'Al-Hawi' adalah ensiklopedia kedokteran karya...", options: ["Al-Razi", "Ibnu Sina", "Al-Zahrawi", "Ibnu Nafis"], correctIndex: 0 }
    ],
    5: [
      { id: 'm5-1', text: "Kota Samarra dibangun sebagai ibu kota baru pada masa...", options: ["Al-Mu'tasim", "Al-Mansur", "Harun Ar-Rashid", "Al-Saffah"], correctIndex: 0 },
      { id: 'm5-2', text: "Sistem pemerintahan Abbasiyah banyak mengadopsi sistem administrasi...", options: ["Persia (Sasanian)", "Romawi", "Mongol", "Turki"], correctIndex: 0 },
      { id: 'm5-3', text: "Rumah sakit (Bimaristan) di Baghdad terkenal karena...", options: ["Memisahkan bangsal penyakit menular", "Hanya untuk orang kaya", "Tidak ada dokter", "Menggunakan dukun"], correctIndex: 0 }
    ],
    6: [
      { id: 'm6-1', text: "Salah satu faktor internal kemunduran Abbasiyah adalah...", options: ["Dominasi tentara Turki/Buwaihi", "Kurangnya musuh", "Terlalu banyak uang", "Wilayah terlalu kecil"], correctIndex: 0 },
      { id: 'm6-2', text: "Khalifah terakhir Bani Abbasiyah yang dibunuh Mongol adalah...", options: ["Al-Musta'shim", "Al-Mansur", "Al-Wathiq", "Al-Qadir"], correctIndex: 0 },
      { id: 'm6-3', text: "Cara pasukan Mongol menghancurkan semangat Baghdad adalah dengan...", options: ["Membakar perpustakaan", "Mengadakan pesta", "Membangun jembatan", "Memberi hadiah"], correctIndex: 0 }
    ],
    7: [
      { id: 'm7-1', text: "Karya Ibnu Rusyd (Averroes) sangat mempengaruhi filsafat...", options: ["Barat/Eropa", "Cina", "India", "Afrika"], correctIndex: 0 },
      { id: 'm7-2', text: "Istilah 'Algorithm' berasal dari nama...", options: ["Al-Khawarizmi", "Al-Kindi", "Al-Biruni", "Al-Battani"], correctIndex: 0 },
      { id: 'm7-3', text: "Kamera obscura (prinsip kamera) pertama kali dijelaskan oleh...", options: ["Ibnu Al-Haytham", "Newton", "Einstein", "Edison"], correctIndex: 0 }
    ]
  },
  [Difficulty.HARD]: {
    1: [
      { id: 'h1-1', text: "Propaganda Abbasiyah menggunakan slogan 'Ar-Ridha min Aali Muhammad', yang berarti...", options: ["Keridhaan dari Keluarga Nabi", "Kekuasaan untuk rakyat", "Perang sampai mati", "Kekayaan untuk semua"], correctIndex: 0 },
      { id: 'h1-2', text: "Peristiwa pembantaian Bani Umayyah oleh Abbasiyah dikenal dengan sebutan...", options: ["Tragedi Zab", "Perang Siffin", "Perang Jamal", "Fathu Makkah"], correctIndex: 0 },
      { id: 'h1-3', text: "Arsitek utama pembangunan Kota Bundar Baghdad adalah...", options: ["Naubakht & Mashallah", "Sinan", "Imhotep", "Michelangelo"], correctIndex: 0 }
    ],
    2: [
      { id: 'h2-1', text: "Masa Al-Makmun diwarnai oleh paham teologi rasionalis yang disebut...", options: ["Muktazilah", "Jabariyah", "Khawarij", "Syi'ah"], correctIndex: 0 },
      { id: 'h2-2', text: "Hadiah jam air (water clock) dari Harun Ar-Rashid kepada Charlemagne menunjukkan...", options: ["Keunggulan teknologi mekanik Islam", "Kelebihan air", "Mainan anak-anak", "Alat penyiksa"], correctIndex: 0 },
      { id: 'h2-3', text: "Peran Zubaidah binti Ja'far (Istri Harun) yang terkenal adalah...", options: ["Membangun saluran air (Zubaidah Canal) untuk haji", "Memimpin perang", "Menulis puisi", "Menjadi hakim"], correctIndex: 0 }
    ],
    3: [
      { id: 'h3-1', text: "Metode ilmiah (observasi & eksperimen) yang dikembangkan di Baitul Hikmah mendahului...", options: ["Francis Bacon", "Aristoteles", "Plato", "Socrates"], correctIndex: 0 },
      { id: 'h3-2', text: "Buku 'Al-Majesti' karya Ptolemeus diterjemahkan dan dikoreksi oleh astronom muslim menjadi...", options: ["Lebih akurat dalam perhitungan orbit", "Novel fiksi", "Buku masak", "Peta harta karun"], correctIndex: 0 },
      { id: 'h3-3', text: "Yuhanna bin Masawayh di Baitul Hikmah terkenal karena...", options: ["Melakukan diseksi anatomi (bedah) pada kera", "Membuat robot", "Menulis lagu", "Melukis"], correctIndex: 0 }
    ],
    4: [
      { id: 'h4-1', text: "Kontribusi Al-Battani dalam trigonometri adalah menyempurnakan penggunaan...", options: ["Sinus & Cotangen", "Logaritma", "Matriks", "Kalkulus"], correctIndex: 0 },
      { id: 'h4-2', text: "Buku 'Kitab al-Manazir' (Book of Optics) karya Ibnu Haytham membantah teori...", options: ["Emisi mata (mata mengeluarkan cahaya)", "Bumi datar", "Gravitasi", "Evolusi"], correctIndex: 0 },
      { id: 'h4-3', text: "Bani Musa bersaudara dikenal karena menciptakan...", options: ["Alat-alat mekanik otomatis (Automata)", "Senjata nuklir", "Pesawat terbang", "Kapal selam"], correctIndex: 0 }
    ],
    5: [
      { id: 'h5-1', text: "Dalam sistem ekonomi, Abbasiyah memperkenalkan 'Check' (Cek) yang disebut...", options: ["Saqq", "Dinar", "Dirham", "Fulus"], correctIndex: 0 },
      { id: 'h5-2', text: "Pemberontakan budak Zanj yang mengguncang ekonomi Abbasiyah terjadi di...", options: ["Basra (Irak Selatan)", "Mesir", "Suriah", "Persia"], correctIndex: 0 },
      { id: 'h5-3', text: "Ikhwanus Safa (Brethren of Purity) adalah kelompok rahasia yang berfokus pada...", options: ["Ensiklopedia filsafat & sains", "Terorisme", "Perdagangan", "Seni tari"], correctIndex: 0 }
    ],
    6: [
      { id: 'h6-1', text: "Pengkhianatan wazir Al-Alkami diduga mempermudah masuknya Mongol karena...", options: ["Mengurangi jumlah pasukan pertahanan", "Membuka gerbang", "Memberi peta palsu", "Meracuni air"], correctIndex: 0 },
      { id: 'h6-2', text: "Setelah Baghdad hancur, kekhalifahan Abbasiyah 'bayangan' diteruskan di...", options: ["Kairo (Mamluk)", "Istanbul", "Cordoba", "Delhi"], correctIndex: 0 },
      { id: 'h6-3', text: "Dampak jangka panjang kehancuran irigasi Tigris-Eufrat oleh Mongol adalah...", options: ["Salinisasi tanah & kemunduran pertanian Irak", "Banjir bandang", "Kekeringan total", "Tanah menjadi emas"], correctIndex: 0 }
    ],
    7: [
      { id: 'h7-1', text: "Roger Bacon, filsuf Inggris, sering mengutip karya-karya...", options: ["Al-Kindi & Ibnu Sina", "Plato", "Socrates", "Homer"], correctIndex: 0 },
      { id: 'h7-2', text: "Konsep rumah sakit jiwa modern pertama kali diterapkan di...", options: ["Baghdad", "London", "Paris", "Roma"], correctIndex: 0 },
      { id: 'h7-3', text: "Pengaruh sastra 'Maqamat' Al-Hariri terlihat pada karya sastra Eropa...", options: ["Picaresque novel", "Haiku", "Sonata", "Epos"], correctIndex: 0 }
    ]
  }
};
