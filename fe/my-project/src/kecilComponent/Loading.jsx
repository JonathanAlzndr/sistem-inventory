import React from "react";

// Komponen ini tidak perlu tahu APA yang sedang loading,
// ia hanya perlu tahu KAPAN harus tampil.
const Loading = ({ isLoading }) => {
  // Jika tidak loading, jangan tampilkan apa-apa
  if (!isLoading) {
    return null;
  }

  return (
    <div
      className="
        fixed            /* Tetap di layar, bahkan saat di-scroll */
        inset-0          /* Penuhi seluruh layar (top/left/right/bottom = 0) */
        bg-black/50         /* Latar belakang hitam... */
        bg-opacity-50    /* ...dengan transparansi 50% */
        flex             /* Gunakan flexbox... */
        justify-center   /* ...untuk menengahkan secara horizontal */
        items-center     /* ...dan vertikal */
        z-50             /* Pastikan tampil di atas segalanya */
      "
    >
      {/* Ini adalah spinner-nya */}
      <div
        className="
          w-16             /* Ukuran spinner */
          h-16
          border-4         /* Tebal garis lingkaran */
          border-gray-200  /* Warna lingkaran dasar */
          border-t-blue-500 /* Warna garis atas (yang berputar) */
          rounded-full     /* Membuatnya jadi lingkaran */
          animate-spin     /* Animasi berputar dari Tailwind */
        "
      ></div>
    </div>
  );
};

export default Loading;