// js/script.js

// Data TPT Indonesia berdasarkan sumber BPS
const tptData = {
  labels: [
    "2019 Feb",
    "2019 Ags",
    "2020 Feb",
    "2020 Ags",
    "2021 Feb",
    "2021 Ags",
    "2023 Feb",
    "2023 Ags",
    "2024 Feb",
    "2024 Ags",
  ],
  datasets: [
    {
      label: "Tingkat Pengangguran Terbuka (%)",
      data: [5.01, 5.28, 4.99, 7.07, 6.26, 6.49, 5.45, 5.32, 4.82, 4.91],
      backgroundColor: "rgba(52, 152, 219, 0.2)",
      borderColor: "rgba(52, 152, 219, 1)",
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "rgba(231, 76, 60, 1)",
      pointBorderColor: "rgba(231, 76, 60, 1)",
      pointBorderWidth: 2,
      pointRadius: 6,
    },
  ],
};

// Konfigurasi chart
const chartConfig = {
  type: "line",
  data: tptData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Tren Tingkat Pengangguran Terbuka Indonesia (2019-2024)",
        font: {
          size: 16,
          weight: "bold",
        },
        color: "#2c3e50",
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#2c3e50",
          font: {
            size: 12,
            weight: "600",
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 4,
        max: 8,
        title: {
          display: true,
          text: "TPT (%)",
          color: "#2c3e50",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "#2c3e50",
          font: {
            size: 12,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Periode",
          color: "#2c3e50",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "#2c3e50",
          font: {
            size: 11,
          },
          maxRotation: 45,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    elements: {
      point: {
        hoverRadius: 8,
      },
    },
  },
};

let myChart; // Variabel global untuk menyimpan instance chart

// Fungsi untuk menampilkan section
function showSection(sectionId) {
  // Sembunyikan semua section
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  // Hapus class active dari semua button
  const buttons = document.querySelectorAll(".nav-btn");
  buttons.forEach((button) => {
    button.classList.remove("active");
  });

  // Tampilkan section yang dipilih
  document.getElementById(sectionId).classList.add("active");

  // Tambahkan class active ke button yang diklik
  const activeButton = document.querySelector(
    `.nav-btn[data-section="${sectionId}"]`
  );
  if (activeButton) {
    activeButton.classList.add("active");
  }

  // Inisialisasi atau update chart jika section visualisasi dibuka
  if (sectionId === "visualisasi") {
    setTimeout(() => {
      const ctx = document.getElementById("tptChart").getContext("2d");
      // Hancurkan chart yang ada jika ada
      if (myChart) {
        myChart.destroy();
      }
      // Buat chart baru
      myChart = new Chart(ctx, chartConfig);
    }, 100); // Sedikit delay untuk memastikan canvas sudah dirender
  }
}

// Inisialisasi saat DOM fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Tambahkan event listener ke semua tombol navigasi
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionId = this.dataset.section; // Ambil nilai dari data-section
      showSection(sectionId);

      // Scroll ke atas halaman
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });

  // Inisialisasi chart saat halaman dimuat jika section visualisasi adalah default aktif
  if (document.getElementById("visualisasi").classList.contains("active")) {
    const ctx = document.getElementById("tptChart").getContext("2d");
    myChart = new Chart(ctx, chartConfig);
  } else {
    // Pastikan chart dibuat saat halaman pertama kali dimuat jika 'home' adalah default aktif,
    // dan pengguna nantinya navigasi ke 'visualisasi'
    // Cukup panggil showSection('home') untuk menginisialisasi tampilan awal
    showSection("home");
  }
});
