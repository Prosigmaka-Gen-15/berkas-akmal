/*==============fungsi tombol tambah dan kurang jumlah pesanan==============*/
function kurang() {
  var input = document.getElementById('jumlah');
  var value = parseInt(input.value);

  if (value > 1) {
    value--;
    input.value = value;
  }
}

function tambah() {
  var input = document.getElementById('jumlah');
  var value = parseInt(input.value);

  value++;
  input.value = value;
}

/*==============Fungsi Image switch==============*/
// Dapatkan semua elemen dengan class miniImg
const miniImgs = document.querySelectorAll('.miniImg');

// Loop through each miniImg
miniImgs.forEach((img) => {
  // Tambahkan event listener click
  img.addEventListener('click', function () {
    // Dapatkan src gambar mini yang diklik
    const src = this.getAttribute('src');

    // Dapatkan elemen mainImg
    const mainImg = document.querySelector('.mainImg');
    mainImg.style.opacity = 0;
    // Ganti src mainImg dengan src gambar mini
    setTimeout(() => {
      mainImg.setAttribute('src', src);
      mainImg.style.opacity = 1; // gambar menjadi jelas
    }, 500); // tambahkan timer
  });
});

let sizeDef = document.getElementsByClassName('sizeList');
sizeDef[0].classList.add('activeButton');
/*==============Fungsi button size==============*/
function detailSize(number) {
  // list deskripsi ukuran sepatu
  let sizeMapping = {
    0: '38 = 24 cm | 39 = 25 cm | 40 = 25,5 cm | 41 = 26 cm | 42 = 27 cm | 43 = 28 cm',
    1: '38 = 24 cm',
    2: '39 = 25 cm',
    3: '40 = 25,5 cm',
    4: '41 = 26 cm',
    5: '42 = 27 cm',
    6: '43 = 28 cm',
  };
  // simpan nilai sesuai dengan input number
  let newSizeDesc = sizeMapping[number];
  // panggil properti berdasarkan id dan simpan pada variable
  let size = document.getElementById('sizeDesc');
  // ubah isi text yang ada pada properti
  size.textContent = newSizeDesc;

  /*=========Mengaktifkan style activeButton ketika di klik=================*/
  const sizeLists = document.querySelectorAll('.sizeList');
  sizeLists[number].classList.add('activeButton');
  // Looping semua elemen
  sizeLists.forEach((list, index) => {
    // Jika index tidak sama dengan 3
    if (index !== number) {
      // Remove class active
      list.classList.remove('activeButton');
    }
  });

  /*=========Disabled Button ketika sudah di pilih===========*/
  const buttons = document.querySelectorAll('.sizeProperty');
  // Inisiasi tombol aktif saat ini
  const activeButton = null;
  // Add event listener pada setiap tombol
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      // Jika ini adalah tombol aktif saat ini
      if (activeButton === this) {
        // Nonaktifkan button dengan atribut disabled
        this.disabled = true;
        // Reset active button
        activeButton = null;
      } else {
        // Jika ada tombol aktif lain, aktifkan lagi
        if (activeButton) {
          activeButton.disabled = false;
        }
        // Nonaktifkan tombol ini
        this.disabled = true;
        // Set sebagai tombol aktif saat ini
        activeButton = this;
      }
    });
  });
}
