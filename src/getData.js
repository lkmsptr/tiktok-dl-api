const axios = require("axios");

const getData = async (url) => {
  try {
    const axios = require("axios");
    let data = JSON.stringify({
      url: url,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://downloader.bot/api/tiktok/info",
      headers: {
        "Content-Type": "application/json",
        Cookie: "uid=cfbf944bf160f93f78bcdcfc537cd6da",
      },
      data: data,
    };

    const response = await axios.request(config);
    const result = response.data;
    const links = {
      thumbnail: result.data.video_img,
      mp4: result.data.mp4,
      mp3: result.data.mp3,
    };
    return {
      success: true,
      message: "Berhasil mengambil data",
      nick: result.data.nick,
      judul: result.data.video_info,
      links: links,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = getData;
