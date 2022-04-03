import axios from "axios";

export default async function getMarketCap() {
  try {
    const res = await axios.get(
      "https://explorer.havenprotocol.org/api/supply"
    );
    return res;
  } catch (err) {
    console.error(err);
  }
}
