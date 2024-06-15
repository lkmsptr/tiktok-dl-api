const axios = require("axios");
const cheerio = require("cheerio");

class Scraper {
  downloaderBot = async (url) => {
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
  sstik = async (url) => {
    const response = await axios.post(
      "https://ssstik.io/abc",
      new URLSearchParams({
        id: url,
        locale: "id",
        tt: "dnhDdm01",
      }),
      {
        params: {
          url: "dl",
        },
        headers: {
          authority: "ssstik.io",
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          cookie:
            "_ga=GA1.1.1788389650.1717242026; __gads=ID=706eedeae4e95a3f:T=1717242026:RT=1718425683:S=ALNI_Mb79QjrVPKmGpH2j-jSUH-BMDO7KA; __gpi=UID=00000e3acc1966ec:T=1717242026:RT=1718425683:S=ALNI_MZjAVr0meWSuJCcFyx56O0yZJe5UA; __eoi=ID=2e38e0e8f49e7a91:T=1717242026:RT=1718425683:S=AA-AfjZR6OBS_zsiHkectNO9L7nT; FCNEC=%5B%5B%22AKsRol8KTVFRG4Tc4IyZ9BS6cahqOtAfEHkPXYmQ-y0KmvZpqCKpyikC4T3wJ90zdX9MIRqqppjPVW5yOeTTooeRxzJfbH7Qro35ar4uY5i3nQLBkn-kUuVPha3EU8t84aIn9O1Xps8bw1sddVNksdc1w48rjl1jNw%3D%3D%22%5D%5D; _ga_ZSF3D6YSLC=GS1.1.1718425680.6.0.1718425690.0.0.0",
          "hx-current-url": "https://ssstik.io/id",
          "hx-request": "true",
          "hx-target": "target",
          "hx-trigger": "_gcaptcha_pt",
          origin: "https://ssstik.io",
          referer: "https://ssstik.io/id",
          "sec-ch-ua":
            '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        },
      }
    );
    const $ = cheerio.load(response.data);

    const backgroundImage = $("#mainpicture .result_overlay").css(
      "background-image"
    );
    const thumbnail = backgroundImage ? backgroundImage.slice(5, -2) : null;

    const result = {
      success: true,
      message: "Berhasil mengambil data",
      nick: "weebro_", // Ganti sesuai kebutuhan
      judul:
        $("div#avatarAndTextUsual h2").text().trim() +
        " " +
        $("div#avatarAndTextUsual p.maintext").text().trim(),
      links: {
        thumbnail: thumbnail,
        mp4: $('a.download_link[href*="tikcdn.io/ssstik/"]').attr("href"),
        mp3: $("a.download_link.music").attr("href"),
      },
    };
    return result;
  };
}

module.exports = Scraper;
