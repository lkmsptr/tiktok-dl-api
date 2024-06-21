const express = require("express");
const Api = require("./src/getData");
const BatosApi = require("./src/Downloader");
const cors = require("cors");
const app = express();
const api = new Api();
const batosApi = new BatosApi();

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
    const { url, ftype } = req.body;

    if (!url) {
      return res.status(400).json({ error: "url is required" });
    }

    if (!ftype) {
      return res.status(400).json({ error: "format type is required" });
    }

    // Panggil fungsi getData untuk mendapatkan data video TikTok
    const data = await api.y2mate2(url, ftype);

    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/youtube/task", async (req, res) => {
  try {
    if (!req.body.taskId) {
      return res.status(400).json({ error: "key or vid is required" });
    }

    // Panggil fungsi getData untuk mendapatkan data video TikTok
    const data = await api.task(req.body.taskId);

    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/youtube/get-hash", async (req, res) => {
  try {
    const jwt = req.body.jwt;
    const hash = req.body.hash;
    if (!jwt) {
      return res.status(400).json({ error: "jwt is required" });
    }

    if (!hash) {
      return res.status(400).json({ error: "hash vid is required" });
    }

    // Panggil fungsi getData untuk mendapatkan data video TikTok
    const data = await api.getHash(jwt, hash);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/all", async (req, res) => {
  try {
    const url = req.body.url;

    if (!url) {
      return res.status(400).json({ error: "url is required" });
    }

    // Panggil fungsi getData untuk mendapatkan data video TikTok
    const data = await batosApi.getTaskId(url);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/all/task", async (req, res) => {
  try {
    const taskId = req.body.taskId;

    if (!taskId) {
      return res.status(400).json({ error: "taskId is required" });
    }

    // Panggil fungsi getData untuk mendapatkan data video TikTok
    const data = await batosApi.task(taskId);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
