class CoreApi {
  constructor() {
    this.targetAddr = "https://api.v01.savethevideo.com/tasks";
    this.headers = {
      headers: {
        authority: "api.v01.savethevideo.com",
        accept: "application/json",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        origin: "https://www.savethevideo.com",
        referer: "https://www.savethevideo.com/",
        "sec-ch-ua":
          '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
      },
    };

    this.requestOptions = (url, type = "info") => {
      return {
        type,
        url,
      };
    };
  }
}

module.exports = CoreApi;
