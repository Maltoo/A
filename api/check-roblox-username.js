const resp = await fetch("https://users.roblox.com/v1/usernames/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ usernames: [username] })
});
const d = await resp.json();
if (d.data && d.data.length > 0 && d.data[0].id) {
  validUser = true;
  userId = d.data[0].id;
  userName = d.data[0].name;
  displayNameEl.textContent = userName;

  // GANTI BAGIAN INI:
  // avatarPreviewEl.src = `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=150&height=150&format=png`;

  // PAKAI AVATAR BARU:
  const thumbResp = await fetch(
    `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=false`
  );
  const thumbData = await thumbResp.json();
  if (thumbData.data && thumbData.data.length > 0) {
    avatarPreviewEl.src = thumbData.data[0].imageUrl;
  } else {
    avatarPreviewEl.src = "";
  }

  avatarSectionEl.classList.remove("hidden");
  userStatusEl.textContent = `✅ Username valid: ${userName} (ID: ${userId})`;
} else {
  userStatusEl.textContent = "❌ Username tidak ditemukan!";
}
