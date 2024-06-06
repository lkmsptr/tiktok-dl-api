const axios = require("axios");
const cheerio = require("cheerio");
const FormData = require("form-data");
let data = new FormData();

const getData = async (url) => {
  try {
    data.append("prefix", "dtGslxrcdcG9raW8uY29t");
    data.append("vid", url);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://tiktokio.com/api/v1/tk-htmx",
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };
    const results = [];
    const res = await axios.request(config);
    const $ = cheerio.load(res.data);
    const title = $("h2").text();
    if (!title) {
      return {
        success: false,
        message: "Gagal mengambil data periksa url anda!",
      };
    }
    const img = $("img").attr("src");
    $("a").each((index, element) => {
      const link = $(element).attr("href");
      const text = $(element).text();
      if (link.includes("https://dl.tiktokio.com")) {
        results.push({ text, link });
      }
    });
    return {
      success: true,
      message: "Berhasil mengambil data",
      judul: title,
      thumbnail: img,
      link: results,
    };
  } catch (error) {
    console.log(error);
  }
};
module.exports = getData;
