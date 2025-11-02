async function cekUsername() {
  const username = document.getElementById('username').value.trim();
  const hasil = document.getElementById('hasil');
  const error = document.getElementById('error');
  hasil.innerHTML = '';
  error.textContent = '';

  if (!username) {
    error.textContent = '⚠️ Silakan masukkan username terlebih dahulu.';
    return;
  }

  try {
    const response = await fetch(`https://api.roblox.com/users/get-by-username?username=${username}`);
    const data = await response.json();

    if (data && data.Id) {
      const userId = data.Id;
      const avatarUrl = `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`;

      hasil.innerHTML = `
        <h3>${data.Username}</h3>
        <img src="${avatarUrl}" alt="Avatar Roblox ${data.Username}">
      `;
    } else {
      error.textContent = '❌ Username tidak ditemukan.';
    }
  } catch (err) {
    error.textContent = '⚠️ Gagal memeriksa (cek koneksi internet).';
  }
}

// Hubungkan tombol ke fungsi
document.getElementById('searchBtn').addEventListener('click', cekUsername);
