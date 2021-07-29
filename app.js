const express = require("express");
const cors = require("cors");
const Parser = require('rss-parser');
const parser = new Parser({
  timeout: 5000,
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

async function getNews() {
    let apollo, tvnet, delfi, lsm;

    try {
      apollo = await parser.parseURL(APOLLO_RSS_URL);
    } catch (e) { 
      console.log(`apollo:`, e);
    }

    try {
      tvnet = await parser.parseURL(TVNET_RSS_URL);
    } catch (e) { 
      console.log(`tvnet`, e);
    }

    try {
      delfi = await parser.parseURL(DELFI_RSS_URL);
    } catch (e) { 
      console.log(`delfi`, e);
    }

    try {
      lsm = await parser.parseURL(LSM_RSS_URL);
    } catch (e) { 
      console.log(`lsm`, e);
    }
    
    return { apollo, tvnet, delfi, lsm};
}

app.get("/", async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log('Request from', ip);
  const news = await getNews();
  res.send(news);
});

app.listen(8080, () => {
  console.log("App's running on port 8080");
});
