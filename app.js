const express = require("express");
const cors = require("cors");
//const fetch = require("node-fetch");
const axios = require('axios').default;
const Parser = require('rss-parser');
const parser = new Parser({
  customFields: {
  item: ['media:content']
  }
});

const app = express();
app.use(cors());

const APOLLO_RSS_URL = `https://apollo.lv/rss`;
const TVNET_RSS_URL = `https://tvnet.lv/rss`;
const DELFI_RSS_URL = `https://delfi.lv/rss/?channel=delfi`;
const LSM_RSS_URL = `https://www.lsm.lv/rss`;
const IR_RSS_URL = `https://ir.lv/feed/`;

async function getNews() {
    //const apollo = await parser.parseURL(APOLLO_RSS_URL);

    const apollo = await axios.get(APOLLO_RSS_URL);
    const tvnet = await axios.get(TVNET_RSS_URL);
    const delfi = await axios.get(DELFI_RSS_URL);
    const lsm = await axios.get(LSM_RSS_URL);
    // const ir = await parser.parseURL(IR_RSS_URL);

    // const apollo_text = await apollo.text();
    // const tvnet_text = await tvnet.text();
    // const delfi_text = await delfi.text();
    // const lsm_text = await lsm.text();

    const apollo_result = await parser.parseString(apollo.data);
    const tvnet_result = await parser.parseString(tvnet.data);
    const delfi_result = await parser.parseString(delfi.data);
    const lsm_result = await parser.parseString(lsm.data);
  
    return { apollo: apollo_result, tvnet: tvnet_result, delfi: delfi_result, lsm: lsm_result };
}

app.get("/", async (req, res) => {
  const news = await getNews();
  res.send(news);
});

app.listen(8080, () => {
  console.log("App's running on port 8080");
});
