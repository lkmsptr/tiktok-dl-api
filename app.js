const express = require("express");
const Api = require("./src/getData");
const cors = require("cors");
const app = express();
const api = new Api();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

// Endpoint untuk permintaan GET
app.get("/", async (req, res) => {
  res.send("Tidak ada apa-apa disini '_' ");
});

// Endpoint untuk permintaan POST Tiktok
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

// Endpoint untuk permintaan POST Youtube
app.post("/api/youtube", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "url is required" });
    }

    // Panggil fungsi getData untuk mendapatkan data video TikTok
    const data = await api.y2mate(url);
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/youtube/convert", async (req, res) => {
  try {
    const { key, vid } = req.body;
    console.log(key);
    console.log(vid);
    if (!vid) {
      return res.status(400).json({ error: "key or vid is required" });
    }

    if (!key) {
      return res.status(400).json({ error: "key or vid is required" });
    }

    // Panggil fungsi getData untuk mendapatkan data video TikTok
    const data = await api.y2mateConvert(vid, key);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
