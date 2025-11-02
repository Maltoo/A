// File: /pages/api/check-roblox-username.js
export default async function handler(req, res) {
  // Hanya izinkan POST
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
    // Panggil API Roblox v1
    const robloxRes = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usernames: [username],
        excludeBannedUsers: false,
      }),
    });

    const data = await robloxRes.json();

    if (data?.data?.length > 0 && data.data[0].requestedUsername) {
      // Jika username ditemukan
      res.status(200).json({
        exists: true,
        user: data.data[0],
      });
    } else {
      // Jika tidak ditemukan
      res.status(404).json({
        exists: false,
        message: "Username not found",
      });
    }
  } catch (error) {
    console.error("Error checking Roblox username:", error);
    res.status(500).json({ error: "Failed to check username" });
  }
}
