import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { q },
    method,
  } = req;

  console.log(q, method);

  if (method === "GET") {
    // fetch access token
    var tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
          ).toString("base64"),
        Accept: "application/json",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }).toString(),
    });
    const token = (await tokenResponse.json())?.access_token;

    var searchResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${q}&type=track&limit=5`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    );

    const tracks = (await searchResponse.json()).tracks?.items;

    res.status(200).json({ tracks });
  }
}
