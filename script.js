// Fungsi untuk membuka tab
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Validasi Form
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Validasi nama
    var namaInput = document.getElementById("nama").value;
    if (namaInput.length < 10) {
        alert("Nama harus minimal 10 karakter.");
        return;
    }

    // Validasi umur
    var umurInput = document.getElementById("umur").value;
    if (umurInput < 25) {
        alert("Umur harus minimal 25 tahun.");
        return;
    }

    // Validasi uang sangu
    var uangInput = document.getElementById("uang").value;
    if (uangInput < 100000 || uangInput > 1000000) {
        alert("Uang sangu harus antara 100 ribu dan 1 juta.");
        return;
    }

    // Jika semua validasi berhasil, tambahkan data ke tabel
    var table = document.getElementById("pendaftarTable").getElementsByTagName('tbody')[0];
    var row = table.insertRow(-1);
    var namaCell = row.insertCell(0);
    var umurCell = row.insertCell(1);
    var uangCell = row.insertCell(2);
    namaCell.innerHTML = namaInput;
    umurCell.innerHTML = umurInput;
    uangCell.innerHTML = uangInput;

    // Reset form
    document.getElementById("registrationForm").reset();

    // Tampilkan tabel di tab "List Pendaftar" jika belum ditampilkan
    document.getElementById("pendaftarTable").style.display = "table";
    // Hitung rata-rata setelah menambahkan data
    hitungRataRata();
});

// Hitung rata-rata umur dan uang sangu
function hitungRataRata() {
    var table = document.getElementById("pendaftarTable").getElementsByTagName('tbody')[0];
    var umurTotal = 0;
    var uangTotal = 0;
    var rowCount = table.rows.length;

    for (var i = 0; i < rowCount; i++) {
        var row = table.rows[i];
        var umur = parseInt(row.cells[1].textContent);
        var uang = parseInt(row.cells[2].textContent);
        umurTotal += umur;
        uangTotal += uang;
    }

    if (rowCount > 0) {
        var umurRataRata = umurTotal / rowCount;
        var uangRataRata = uangTotal / rowCount;
        document.getElementById("resume").innerHTML = "Rata-rata pendaftar memiliki uang sangu sebesar " + uangRataRata.toFixed(2) + " dengan rata-rata umur " + umurRataRata.toFixed(2);
    } 
    else {
        document.getElementById("resume").innerHTML = "Tidak ada pendaftar.";
    }
}

// Panggil fungsi hitungRataRata saat halaman pertama kali dimuat
hitungRataRata();
