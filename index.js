import dotenv from "dotenv";
import accounting from "accounting-js";
import { TwitterClient } from "twitter-api-client";
import axios from "axios";

dotenv.config();
const twitterClient = new TwitterClient({
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

axios
  .get("https://explorer.havenprotocol.org/api/supply")
  .then((response) => {
    const data = response.data ? response.data : {};
    if (data) {
      let tweet =
        "$xUSD Market Cap is $" +
        accounting.formatMoney(Number(data.XUSD, "$", 0)).slice(0, -3);

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
    } else {
      console.log("API returning empty data");
    }
  })
  .catch((err) => {
    console.error(err);
  });
