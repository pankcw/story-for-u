CERITA UNTUK DESI
=================

ISI FOLDER
- index.html            halaman utama
- assets/css/style.css  tampilan
- assets/js/script.js   logika (halaman, progres, backsound)
- assets/music/         taruh backsound.mp3 di sini

1) MENGGANTI / MENAMBAH BACKSOUND
- Siapkan file audio yang memang boleh kamu pakai.
- Ubah namanya menjadi: backsound.mp3
- Taruh di folder assets/music/ (file TARUH_BACKSOUND_MP3_DI_SINI.txt boleh dihapus).
- Musik tidak akan menyala otomatis; Desi harus menekan tombol play.
- Jika file belum ada, tombol musik otomatis nonaktif dan website tetap berjalan normal.
- Disarankan ukuran file kecil (di bawah ~5 MB) supaya cepat dimuat di HP.

2) MENJALANKAN SECARA LOKAL
- Cukup klik dua kali index.html, atau buka dengan browser.
- (Opsional) server lokal: buka terminal di folder ini, jalankan
  python -m http.server 8000
  lalu buka http://localhost:8000

3) DEPLOY KE GITHUB PAGES
- Buat repository baru di GitHub (misal: cerita-untuk-desi).
- Upload SEMUA isi folder ini (index.html harus ada di root repository), termasuk assets/music/backsound.mp3.
- Buka Settings > Pages.
- Source: "Deploy from a branch", Branch: main, Folder: / (root). Klik Save.
- Tunggu 1-2 menit. Alamatnya: https://USERNAME.github.io/NAMA-REPOSITORY/
- Semua path aset sudah relatif, jadi aman untuk GitHub Pages.
- Tips: jika tidak ingin gampang ditemukan orang lain, beri nama repository yang netral.

CATATAN
- Progres membaca hanya disimpan selama tab masih terbuka (sessionStorage). Tidak ada data yang dikirim ke server.
- Font memakai Google Fonts; jika tidak tersedia, otomatis memakai font sistem.
