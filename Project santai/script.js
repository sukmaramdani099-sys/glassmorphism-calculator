// 1. menangkap elemen dari html 
// kita ambil layar kalkulator dan semua tombolnya 
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');

// 2. membuat "ingatan" (state) kalkulator 
 let currentInpunt = '0' ; // angka yang sedang diketik
 let previousInput = '' ;
 let operator = null;

//  3 fungsi untuk memperbaharui layar 
function updateDisplay(value){
    display.innerText = value;
}

// 4. memberikan perintah klik pada semua tombol
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        if (button.classList.contains('clear')) {
            currentInpunt = '0';
            previousInput = '';
            operator = null;
            updateDisplay(currentInpunt)

        } else if (button.classList.contains('operator')){
            if (currentInpunt === '') return;

            if (previousInput !== ''){
                calculate();
            }

            operator = value;
            previousInput = currentInpunt
            currentInpunt = '';
        } else if (button.classList.contains('equal')) {
            calculate();
        } else {
            if (value === "." && currentInpunt.includes('.')) return;

            if (currentInpunt === '0' && value !== '.'){
                currentInpunt = value;
            } else {
                currentInpunt += value;
            }
            updateDisplay(currentInpunt)
        }
    });
});

// 5. Fungsi logika matematika (manghitung hasil)
function calculate(){
    let result;
    // Ubah teks angka menjadi tipe data number (Float) agar bisa dihitung
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInpunt);

    // jika salah satunya bukan angka, batalkan perhitungan
    if (isNaN(prev) || isNaN(current)) return;

    // Lakukan perhitungan berdasarkan oprator yang disimpam
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case 'x':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        default:
            return;
    }

    // Tampilkan hasil, simpan sebagai angka saaat ini, dan bersihkan sisa ingatan 
    currentInpunt = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay(currentInpunt);
}