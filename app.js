const express = require("express");
const Api = require("./src/getData");
const cors = require("cors");
const app = express();
const api = new Api();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

// Endpoint untuk permintaan POST
app.post("/api/tiktok", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "url is required" });
    }

    // Panggil fungsi getData untuk mendapatkan data video TikTok
    const data = await api.sstik(url);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
