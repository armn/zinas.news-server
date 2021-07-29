const express = require("express");
const cors = require("cors");
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
const LSM_RSS_URL = `https://lsm.lv/rss/`;
const IR_RSS_URL = `https://ir.lv/feed/`;

async function getNews() {
    const apollo = await parser.parseURL(APOLLO_RSS_URL);
    const tvnet = await parser.parseURL(TVNET_RSS_URL);
    const delfi = await parser.parseURL(DELFI_RSS_URL);
    const lsm = await parser.parseURL(LSM_RSS_URL);
    // const ir = await parser.parseURL(IR_RSS_URL);

    return { apollo, tvnet, delfi, lsm};
}

app.get("/", async (req, res) => {
  const news = await getNews();
  res.send(news);
});

app.listen(8080, () => {
  console.log("App's running on port 8080");
});
