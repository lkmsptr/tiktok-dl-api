const axios = require("axios");
const CoreApi = require("./Core");

class Downloader extends CoreApi {
  getTaskId = async (url) => {
    const response = await axios.post(
      this.targetAddr,
      this.requestOptions(url),
      this.headers
    );
    return response.data;
  };

  task = async (taskId) => {
    const response = await axios.get(`${this.targetAddr}/${taskId}`, {
      headers: this.headers,
    });
    console.log(response.data);
  };
}

module.exports = Downloader;
