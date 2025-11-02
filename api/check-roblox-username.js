// File: /pages/api/check-roblox-username.js
export default async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== "POST") {
    res.status(405).json({ error: "Only POST allowed" });
    return;
  }

  const { username } = req.body;

  if (!username) {
    res.status(400).json({ error: "Username is required" });
    return;
  }

  try {
    // Panggil API Roblox untuk mendapatkan ID user
    const robloxRes = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usernames: [username],
        excludeBannedUsers: false,
      }),
    });

    const robloxData = await robloxRes.json();

    if (!robloxData?.data?.length || !robloxData.data[0]?.id) {
      res.status(404).json({ exists: false, message: "Username not found" });
      return;
    }

    const user = robloxData.data[0];
    const userId = user.id;
    const displayName = user.name;

    // Ambil avatar user Roblox
    const thumbRes = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=false`
    );
    const thumbData = await thumbRes.json();
    const avatarUrl = thumbData?.data?.[0]?.imageUrl || null;

    res.status(200).json({
      exists: true,
      user: {
        id: userId,
        username: displayName,
        avatar: avatarUrl,
      },
    });
  } catch (error) {
    console.error("Error checking Roblox username:", error);
    res.status(500).json({ error: "Failed to check username" });
  }
}
