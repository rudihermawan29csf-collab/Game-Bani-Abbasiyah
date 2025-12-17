
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

// BACKGROUNDS TEMA ISLAMI / AL-QURAN
const BG_LEVEL_1 = "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=2070&auto=format&fit=crop"; // Quran Open
const BG_LEVEL_2 = "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2070&auto=format&fit=crop"; // Mosque Interior
const BG_LEVEL_3 = "https://images.unsplash.com/photo-1597935266355-19d5c190283e?q=80&w=2070&auto=format&fit=crop"; // Calligraphy
const BG_LEVEL_4 = "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=2070&auto=format&fit=crop"; // Study
const BG_LEVEL_5 = "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2070&auto=format&fit=crop"; // Architecture
const BG_LEVEL_6 = "https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=1974&auto=format&fit=crop"; // Night
const BG_LEVEL_7 = "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2074&auto=format&fit=crop"; // Light

export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    id: 1,
    title: "SUSUNAN AYAT",
    subtitle: "Melengkapi Potongan",
    type: LevelType.RAPID_FIRE,
    description: "Lengkapi potongan ayat Q.S. Al-Mujadilah [58]: 11 dengan urutan yang benar.",
    maxScore: 1000,
    image: BG_LEVEL_1 
  },
  {
    id: 2,
    title: "KOSA KATA (1)",
    subtitle: "Arti Per Kata",
    type: LevelType.RAPID_FIRE,
    description: "Pahami makna perkata (Mufradat) bagian awal ayat.",
    maxScore: 1000,
    image: BG_LEVEL_2 
  },
  {
    id: 3,
    title: "KOSA KATA (2)",
    subtitle: "Arti Per Kata Lanjutan",
    type: LevelType.RAPID_FIRE,
    description: "Pahami makna perkata (Mufradat) bagian inti tentang derajat ilmu.",
    maxScore: 1000,
    image: BG_LEVEL_3 
  },
  {
    id: 4,
    title: "HUKUM BACAAN",
    subtitle: "Analisis Tajwid",
    type: LevelType.RAPID_FIRE,
    description: "Identifikasi hukum bacaan (Tajwid) yang terdapat dalam ayat.",
    maxScore: 1000,
    image: BG_LEVEL_4 
  },
  {
    id: 5,
    title: "TERJEMAHAN",
    subtitle: "Makna Utuh",
    type: LevelType.RAPID_FIRE,
    description: "Memahami terjemahan lengkap Q.S. Al-Mujadilah ayat 11.",
    maxScore: 1000,
    image: BG_LEVEL_5 
  },
  {
    id: 6,
    title: "KANDUNGAN AYAT",
    subtitle: "Isi & Makna",
    type: LevelType.RAPID_FIRE,
    description: "Memahami pesan pokok dan kandungan Q.S. Al-Mujadilah ayat 11.",
    maxScore: 1000,
    image: BG_LEVEL_6 
  },
  {
    id: 7,
    title: "PENERAPAN",
    subtitle: "Perilaku Mulia",
    type: LevelType.RAPID_FIRE,
    description: "Contoh perilaku yang mencerminkan pengamalan ayat dalam kehidupan sehari-hari.",
    maxScore: 1000,
    image: BG_LEVEL_7 
  }
];

// --- GAME DATA BY DIFFICULTY ---

type GameData = Record<Difficulty, Record<number, Question[]>>;

export const GAME_DATA: GameData = {
  [Difficulty.EASY]: {
    1: [
      { id: 'e1-1', text: "Lengkapi ayat: 'Yaa ayyuhalladzina ... idza qiila lakum'", options: ["Aamanu", "Kafaru", "Aslamu", "Jahadu"], correctIndex: 0 },
      { id: 'e1-2', text: "Lanjutan ayat: 'Tafassahu fii ...'", options: ["Al-Majaalis", "Al-Buyut", "Al-Masajid", "Al-Madaris"], correctIndex: 0 },
      { id: 'e1-3', text: "Lanjutan ayat: 'Yarfa'illahulladzina aamanu minkum walladzina utul ...'", options: ["Maala", "Ilma", "Quwwata", "Sulthana"], correctIndex: 1 }
    ],
    2: [
      { id: 'e2-1', text: "Apa arti dari kata 'Aamanu' (آمَنُوا)?", options: ["Orang-orang kafir", "Orang-orang beriman", "Orang-orang munafik", "Orang-orang musyrik"], correctIndex: 1 },
      { id: 'e2-2', text: "Kata 'Idza qiila' (إِذَا قِيلَ) artinya adalah...", options: ["Apabila dikatakan", "Apabila dilihat", "Apabila didengar", "Apabila ditulis"], correctIndex: 0 },
      { id: 'e2-3', text: "'Lakum' (لَكُمْ) dalam ayat ini berarti...", options: ["Bagi mereka", "Bagi kami", "Bagi kamu (kalian)", "Bagi dia"], correctIndex: 2 }
    ],
    3: [
      { id: 'e3-1', text: "Arti kata 'Yarfa'i' (يَرْفَعِ) adalah...", options: ["Menjatuhkan", "Meninggikan/Mengangkat", "Menghinakan", "Membiarkan"], correctIndex: 1 },
      { id: 'e3-2', text: "'Darojat' (دَرَجَاتٍ) artinya...", options: ["Satu derajat", "Beberapa derajat", "Tangga", "Pangkat dunia"], correctIndex: 1 },
      { id: 'e3-3', text: "Kata 'Al-Ilma' (الْعِلْمَ) berarti...", options: ["Harta", "Kekuasaan", "Ilmu Pengetahuan", "Kesehatan"], correctIndex: 2 }
    ],
    4: [
      { id: 'e4-1', text: "Hukum bacaan pada kata 'Minkum' (مِنْكُمْ) adalah...", options: ["Idgham Bighunnah", "Ikhfa' Haqiqi", "Izhar Halqi", "Iqlab"], correctIndex: 1 },
      { id: 'e4-2', text: "Pada kata 'Alladzina' (الَّذِينَ) terdapat bacaan...", options: ["Al Syamsiyah", "Al Qamariyah", "Mad Wajib", "Qalqalah"], correctIndex: 0 },
      { id: 'e4-3', text: "Kata 'Khabir' (خَبِيرٌ) di akhir ayat dibaca dengan hukum...", options: ["Mad Arid Lissukun", "Mad Thabi'i", "Mad Iwad", "Mad Jaiz"], correctIndex: 0 }
    ],
    5: [
      { id: 'e5-1', text: "Terjemahan 'Tafassahu fil majalis' adalah...", options: ["Berlapang-lapanglah dalam majelis", "Berdiri dalam majelis", "Diam dalam majelis", "Tidur dalam majelis"], correctIndex: 0 },
      { id: 'e5-2', text: "Allah akan meninggikan orang-orang yang beriman dan...", options: ["Orang yang kaya", "Orang yang berilmu", "Orang yang kuat", "Orang yang tampan"], correctIndex: 1 },
      { id: 'e5-3', text: "'Wallahu bimaa ta'maluna khabir' artinya Allah Maha ... terhadap apa yang kamu kerjakan.", options: ["Melihat", "Mendengar", "Teliti/Mengetahui", "Pengasih"], correctIndex: 2 }
    ],
    6: [
      { id: 'e6-1', text: "Isi kandungan utama ayat ini adalah tentang keutamaan...", options: ["Berperang", "Menuntut Ilmu & Berlapang dada", "Berdagang", "Berhaji"], correctIndex: 1 },
      { id: 'e6-2', text: "Sikap yang diperintahkan saat berada di majelis ilmu adalah...", options: ["Berdesak-desakan", "Memberi kelapangan/tempat", "Berisik", "Makan dan minum"], correctIndex: 1 },
      { id: 'e6-3', text: "Derajat yang tinggi diberikan Allah kepada...", options: ["Hanya orang berilmu", "Orang beriman & berilmu", "Hanya orang beriman", "Para pejabat"], correctIndex: 1 }
    ],
    7: [
      { id: 'e7-1', text: "Contoh pengamalan ayat ini di sekolah adalah...", options: ["Memonopoli tempat duduk", "Memberi kesempatan teman duduk", "Membolos", "Tidur di kelas"], correctIndex: 1 },
      { id: 'e7-2', text: "Jika guru meminta kita berdiri atau pindah demi kebaikan, sikap kita...", options: ["Menolak", "Marah", "Mentaati dengan ikhlas", "Pura-pura tidak dengar"], correctIndex: 2 },
      { id: 'e7-3', text: "Semangat menuntut ilmu merupakan bentuk pengamalan ayat ini karena...", options: ["Mendapat uang", "Menaikkan derajat di sisi Allah", "Supaya dipuji", "Takut dimarahi"], correctIndex: 1 }
    ]
  },
  [Difficulty.MEDIUM]: {
    1: [
      { id: 'm1-1', text: "Potongan yang tepat: '... fafsahuu yafsahillahu lakum'", options: ["Idza qiila lakum", "Fanshuzu", "Tafassahu", "Yarfaillah"], correctIndex: 2 },
      { id: 'm1-2', text: "Lengkapi: 'Wa idza qiila ... fanshuzu'", options: ["Unzhuru", "Isma'u", "Inshuzu", "Iqra'u"], correctIndex: 2 },
      { id: 'm1-3', text: "Akhir ayat berbunyi: 'Wallahu bimaa ta'maluna ...'", options: ["Bashiir", "Khabir", "Sami'", "Alim"], correctIndex: 1 }
    ],
    2: [
      { id: 'm2-1', text: "Makna kata 'Fanshuzu' (فَانْشُزُوا) adalah...", options: ["Maka duduklah", "Maka berdirilah/bangkitlah", "Maka diamlah", "Maka pergilah"], correctIndex: 1 },
      { id: 'm2-2', text: "Kata 'Yafsahillahu' (يَفْسَحِ اللَّهُ) bermakna...", options: ["Allah akan menyempitkan", "Allah akan melapangkan", "Allah akan melihat", "Allah akan mengunci"], correctIndex: 1 },
      { id: 'm2-3', text: "'Alladzina uutul 'ilma' (الَّذِينَ أُوتُوا الْعِلْمَ) artinya...", options: ["Orang yang mencari ilmu", "Orang yang diberi ilmu", "Orang yang mengajarkan ilmu", "Orang yang menyembunyikan ilmu"], correctIndex: 1 }
    ],
    3: [
      { id: 'm3-1', text: "Akar kata 'Yarfa'' adalah R-F-A yang berarti...", options: ["Turun", "Tinggi/Angkat", "Jauh", "Dekat"], correctIndex: 1 },
      { id: 'm3-2', text: "Kata 'Majalis' adalah bentuk jamak dari...", options: ["Julus", "Majlis", "Jalis", "Ijlas"], correctIndex: 1 },
      { id: 'm3-3', text: "Perbedaan 'Aamanu' dan 'Utul ilma' dalam ayat ini menunjukkan...", options: ["Iman dan Ilmu terpisah", "Iman dan Ilmu saling melengkapi", "Ilmu lebih penting dari Iman", "Iman tidak butuh Ilmu"], correctIndex: 1 }
    ],
    4: [
      { id: 'm4-1', text: "Hukum bacaan 'Lam Jalalah' pada 'Yafsahillahu' dibaca...", options: ["Tafkhim (Tebal)", "Tarqiq (Tipis)", "Qalqalah", "Ghunnah"], correctIndex: 1 },
      { id: 'm4-2', text: "Pada lafaz 'Darojat', huruf Jim memiliki sifat...", options: ["Hams", "Jahr & Qalqalah", "Istila'", "Sofir"], correctIndex: 1 },
      { id: 'm4-3', text: "Tanwin bertemu huruf Wau pada 'Darojatiw-Wallahu' (jika washal) adalah hukum...", options: ["Idgham Bighunnah", "Idgham Bilaghunnah", "Ikhfa", "Izhar"], correctIndex: 0 }
    ],
    5: [
      { id: 'm5-1', text: "Mengapa ayat ini memerintahkan berlapang-lapang dalam majelis?", options: ["Agar majelis terlihat sepi", "Untuk memuliakan sesama & kenyamanan", "Agar bisa tidur", "Supaya guru senang"], correctIndex: 1 },
      { id: 'm5-2', text: "Janji Allah bagi orang yang melapangkan majelis adalah...", options: ["Diberi uang", "Dilapangkan kehidupannya oleh Allah", "Diberi makanan", "Dihormati orang"], correctIndex: 1 },
      { id: 'm5-3', text: "Perintah 'Fanshuzu' (berdirilah) menyiratkan sikap...", options: ["Malas", "Sigap & Taat", "Sombong", "Ragu-ragu"], correctIndex: 1 }
    ],
    6: [
      { id: 'm6-1', text: "Asbabun Nuzul ayat ini berkaitan dengan sahabat yang...", options: ["Datang terlambat ke majelis Nabi", "Berperang di jalan Allah", "Bersedekah", "Membangun masjid"], correctIndex: 0 },
      { id: 'm6-2', text: "Ayat ini mengajarkan adab sopan santun dalam...", options: ["Jual beli", "Majelis Ilmu/Pertemuan", "Peperangan", "Berpakaian"], correctIndex: 1 },
      { id: 'm6-3', text: "Ilmu tanpa iman akan membuat seseorang...", options: ["Mulia", "Sombong/Tersesat", "Bahagia", "Kaya"], correctIndex: 1 }
    ],
    7: [
      { id: 'm7-1', text: "Tindakan berikut yang TIDAK mencerminkan ayat ini adalah...", options: ["Mempersilakan orang tua duduk", "Menggeser duduk untuk teman", "Menaruh tas di kursi kosong agar tidak diduduki orang", "Berdiri saat diminta guru"], correctIndex: 2 },
      { id: 'm7-2', text: "Rajin belajar dan berdoa adalah upaya menyeimbangkan...", options: ["Dunia dan Akhirat", "Iman dan Ilmu", "Siang dan Malam", "Kaya dan Miskin"], correctIndex: 1 },
      { id: 'm7-3', text: "Jika kita berilmu, kita harus...", options: ["Merendahkan orang bodoh", "Mengamalkan dan mengajarkannya", "Menyimpannya sendiri", "Menjualnya dengan mahal"], correctIndex: 1 }
    ]
  },
  [Difficulty.HARD]: {
    1: [
      { id: 'h1-1', text: "Susunan yang benar: (1) Yarfaillah (2) Minkum (3) Aamanu (4) Alladzina", options: ["1-4-3-2", "4-3-2-1", "1-2-3-4", "4-1-3-2"], correctIndex: 0 },
      { id: 'h1-2', text: "Potongan akhir yang benar secara tajwid...", options: ["Wallahu bima ta'maluna khabir", "Wallahu bima ta'maluna bashiir", "Wallahu bima ta'maluna 'aliim", "Wallahu 'ala kulli syaiin qadir"], correctIndex: 0 },
      { id: 'h1-3', text: "Kata sebelum 'Yafsahillahu lakum' adalah...", options: ["Fafsahuu", "Fanshuzu", "Qiila", "Aamanu"], correctIndex: 0 }
    ],
    2: [
      { id: 'h2-1', text: "Secara bahasa, 'Mujadilah' (nama surah) berarti...", options: ["Wanita yang menggugat/membantah", "Wanita yang sholehah", "Peperangan", "Perselisihan"], correctIndex: 0 },
      { id: 'h2-2', text: "Bentuk fi'il amr (kata perintah) dalam ayat ini adalah...", options: ["Aamanu & Utu", "Fafsahuu & Fanshuzu", "Qiila & Yafsah", "Yarfa' & Ta'malun"], correctIndex: 1 },
      { id: 'h2-3', text: "Lawan kata (Antonim) dari 'Yarfa' (Meninggikan) adalah...", options: ["Yakhfidu (Merendahkan)", "Yazidu (Menambah)", "Yanqusu (Mengurangi)", "Yakburu (Membesar)"], correctIndex: 0 }
    ],
    3: [
      { id: 'h3-1', text: "Penggunaan 'Idza qiila' (Pasif) menunjukkan bahwa perintah melapangkan...", options: ["Bisa datang dari siapa saja (Allah, Rasul, atau pemimpin)", "Hanya dari Allah", "Tidak penting", "Hanya saran"], correctIndex: 0 },
      { id: 'h3-2', text: "Kata 'Khabir' menyiratkan pengetahuan Allah yang...", options: ["Sangat mendalam/teliti sampai ke batin", "Hanya luaran", "Terbatas waktu", "Sekilas"], correctIndex: 0 },
      { id: 'h3-3', text: "Hubungan 'Fafsahuu' dan 'Yafsahillahu' adalah bentuk...", options: ["Sebab-Akibat (Jaza')", "Pertanyaan", "Sumpah", "Larangan"], correctIndex: 0 }
    ],
    4: [
      { id: 'h4-1', text: "Analisis tajwid: 'Fafsahuu yafsahillahu'. Huruf Ha (ح) adalah huruf...", options: ["Halqi (Tenggorokan)", "Syafawi (Bibir)", "Lisan (Lidah)", "Khaisyum (Hidung)"], correctIndex: 0 },
      { id: 'h4-2', text: "Pada 'Ta'maluuna', mad yang terjadi adalah...", options: ["Mad Thabi'i", "Mad Badal", "Mad Silah", "Mad Lazim"], correctIndex: 0 },
      { id: 'h4-3', text: "Wakaf yang tepat di akhir ayat ini adalah...", options: ["Wakaf Jaiz", "Wakaf Lazim", "Wakaf Mamnu'", "Wakaf Saktah"], correctIndex: 0 }
    ],
    5: [
      { id: 'h5-1', text: "Korelasi antara 'Melapangkan majelis' dan 'Diangkat derajat' adalah...", options: ["Sikap tawadhu (rendah hati) mengangkat derajat seseorang", "Fisik yang kuat", "Kekayaan", "Kepintaran berdebat"], correctIndex: 0 },
      { id: 'h5-2', text: "Mengapa 'Alladzina utul ilma' disebut setelah 'Alladzina aamanu'?", options: ["Karena ilmu adalah sifat khusus setelah sifat umum (iman)", "Ilmu tidak penting", "Iman tidak penting", "Hanya pelengkap"], correctIndex: 0 },
      { id: 'h5-3', text: "Ayat ini turun berkenaan dengan para sahabat ahli Badar yang...", options: ["Tidak mendapat tempat duduk", "Minta makanan", "Ingin pulang", "Tertidur"], correctIndex: 0 }
    ],
    6: [
      { id: 'h6-1', text: "Nilai demokratis dalam ayat ini terlihat dari...", options: ["Penghormatan hak orang lain dalam majelis", "Pemilihan pemimpin", "Pembagian harta", "Kebebasan bicara"], correctIndex: 0 },
      { id: 'h6-2', text: "Implikasi 'Yafsahillahu lakum' (Allah melapangkan bagimu) meliputi...", options: ["Kelapangan hati, rezeki, dan kubur", "Hanya rezeki uang", "Hanya rumah luas", "Hanya umur panjang"], correctIndex: 0 },
      { id: 'h6-3', text: "Syarat utama diangkat derajat menurut ayat ini adalah...", options: ["Iman dan Ilmu yang terintegrasi", "Harta yang banyak", "Jabatan tinggi", "Keturunan bangsawan"], correctIndex: 0 }
    ],
    7: [
      { id: 'h7-1', text: "Sikap 'Altruisme' (mementingkan orang lain) dalam ayat ini adalah...", options: ["Memberi tempat duduk pada orang lain", "Mengambil hak orang", "Masa bodoh", "Duduk sendiri"], correctIndex: 0 },
      { id: 'h7-2', text: "Dalam konteks modern, 'Tafassahu fil majalis' bisa diterapkan dalam...", options: ["Memberi kesempatan bicara dalam rapat/diskusi", "Mematikan mik orang lain", "Keluar dari grup WA", "Spam chat"], correctIndex: 0 },
      { id: 'h7-3', text: "Seorang ilmuwan yang beriman akan menggunakan ilmunya untuk...", options: ["Kemaslahatan umat dan mendekatkan diri pada Allah", "Membuat kerusakan", "Menipu orang", "Mencari kekayaan pribadi semata"], correctIndex: 0 }
    ]
  }
};
