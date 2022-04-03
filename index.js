import dotenv from "dotenv";
import { TwitterClient } from "twitter-api-client";
import accounting from "accounting-js";

import getMarketCap from "./getmarketcap.js";

dotenv.config();

const twitterClient = new TwitterClient({
  apiKey: process.env.CONSUMER_KEY,
  apiSecret: process.env.CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const res = await getMarketCap();
const tweet =
  "$xUSD Market Cap is " +
  accounting.formatMoney(Number(res.data.XUSD, "$", 0)).slice(0, -3);

console.log(tweet);

twitterClient.tweets
  .statusesUpdate({
    status: tweet,
  })
  .then((response) => {
    console.log("Tweeted!", response);
  })
  .catch((err) => {
    console.error(err);
  });
