const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const Parser = require('rss-parser');
const parser = new Parser();

const app = express();
app.use(cors());

const APOLLO_RSS_URL = `https://apollo.lv/rss`;
const TVNET_RSS_URL = `https://tvnet.lv/rss`;
const DELFI_RSS_URL = `https://delfi.lv/rss/?channel=delfi`;


async function getNews() {
    const apollo = await parser.parseURL(APOLLO_RSS_URL);
    const tvnet = await parser.parseURL(TVNET_RSS_URL);
    const delfi = await parser.parseURL(DELFI_RSS_URL);

    return { apollo, tvnet, delfi };
}

app.get("/", async (req, res) => {
  const news = await getNews();
  res.send(news);
});

app.listen(8080, () => {
  console.log("App's running on port 80");
});
